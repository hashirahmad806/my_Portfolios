const axios = require('axios');

// Simple in-memory cache
let cachedData = null;
let cacheExpiry = null;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes cache

// Helper to calculate commit streaks from parsed contribution days
function calculateStreaks(days) {
  if (!days || days.length === 0) return { currentStreak: 0, longestStreak: 0 };

  // Sort days by date ascending
  const sortedDays = [...days].sort((a, b) => new Date(a.date) - new Date(b.date));

  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;

  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  for (let i = 0; i < sortedDays.length; i++) {
    const day = sortedDays[i];
    const count = parseInt(day.count || 0) || (parseInt(day.level || 0) > 0 ? 1 : 0);

    if (count > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }

  // Calculate current streak (must include today or yesterday to be active)
  let activeStreak = 0;
  let foundActive = false;
  
  // Traverse backwards from the end to find the current active streak
  for (let i = sortedDays.length - 1; i >= 0; i--) {
    const day = sortedDays[i];
    const count = parseInt(day.count || 0) || (parseInt(day.level || 0) > 0 ? 1 : 0);
    const dateStr = day.date;

    if (count > 0) {
      if (dateStr === todayStr || dateStr === yesterdayStr || i === sortedDays.length - 1) {
        foundActive = true;
      }
      if (foundActive) {
        activeStreak++;
      } else {
        break;
      }
    } else {
      if (foundActive) {
        // If we were tracking active streak and hit a 0-contribution day, the active streak ends
        break;
      }
    }
  }
  currentStreak = activeStreak;

  return { currentStreak, longestStreak };
}

// Scrape public contributions page
async function scrapeContributions(username) {
  try {
    const response = await axios.get(`https://github.com/users/${username}/contributions`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });

    const html = response.data;
    
    // Parse contribution days
    // Formats:
    // <td ... data-date="YYYY-MM-DD" data-level="X" ...>
    const days = [];
    const dayRegex = /<td[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"/g;
    const altDayRegex = /<td[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"[^>]*class="[^"]*ContributionCalendar-day[^"]*"/g;
    
    let match;
    // Try first regex
    while ((match = dayRegex.exec(html)) !== null) {
      days.push({ date: match[1], level: parseInt(match[2]), count: parseInt(match[2]) > 0 ? parseInt(match[2]) : 0 });
    }
    
    // Try second regex if first failed
    if (days.length === 0) {
      while ((match = altDayRegex.exec(html)) !== null) {
        days.push({ date: match[1], level: parseInt(match[2]), count: parseInt(match[2]) > 0 ? parseInt(match[2]) : 0 });
      }
    }

    // Try a general parsing for any class and order
    if (days.length === 0) {
      const generalRegex = /<td([^>]+)>/g;
      while ((match = generalRegex.exec(html)) !== null) {
        const attrs = match[1];
        if (attrs.includes('ContributionCalendar-day')) {
          const dateMatch = /data-date="([^"]+)"/.exec(attrs);
          const levelMatch = /data-level="([^"]+)"/.exec(attrs);
          if (dateMatch && levelMatch) {
            days.push({
              date: dateMatch[1],
              level: parseInt(levelMatch[1]),
              count: parseInt(levelMatch[1]) > 0 ? parseInt(levelMatch[1]) : 0
            });
          }
        }
      }
    }

    // Parse total contributions
    // E.g., "326 contributions in the last year"
    let totalContributions = 0;
    const totalRegex = /(\d+[,.]?\d*)\s+contributions?\s+in\s+the\s+last\s+year/i;
    const totalMatch = totalRegex.exec(html);
    if (totalMatch) {
      totalContributions = parseInt(totalMatch[1].replace(/[,.]/g, ''));
    } else {
      // Fallback: sum levels
      totalContributions = days.reduce((acc, curr) => acc + curr.count, 0);
    }

    return { days, totalContributions };
  } catch (error) {
    console.error('Error scraping contributions:', error.message);
    return { days: [], totalContributions: 0 };
  }
}

// Fetch GitHub data
async function fetchGitHubData(username, token) {
  const headers = token ? { Authorization: `token ${token}` } : {};

  // 1. Fetch Profile Info
  const profileRes = await axios.get(`https://api.github.com/users/${username}`, { headers });
  const profile = {
    avatar: profileRes.data.avatar_url,
    username: profileRes.data.login,
    name: profileRes.data.name || profileRes.data.login,
    bio: profileRes.data.bio || 'MERN Stack Developer & Designer',
    followers: profileRes.data.followers,
    following: profileRes.data.following,
    publicRepos: profileRes.data.public_repos,
  };

  // 2. Fetch Repositories & Languages
  const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers });
  const repos = reposRes.data;

  // Calculate Languages
  const languagesMap = {};
  repos.forEach(repo => {
    if (repo.language) {
      languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
    }
  });

  const totalReposWithLang = Object.values(languagesMap).reduce((a, b) => a + b, 0);
  const languages = Object.entries(languagesMap)
    .map(([name, count]) => ({
      name,
      percentage: totalReposWithLang > 0 ? Math.round((count / totalReposWithLang) * 100) : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  // Latest Repositories
  const latestRepos = repos
    .slice(0, 6)
    .map(repo => ({
      name: repo.name,
      description: repo.description || 'No description provided.',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      url: repo.html_url,
      updatedAt: repo.updated_at,
    }));

  // 3. Fetch Recent Commits Timeline (via public events)
  const eventsRes = await axios.get(`https://api.github.com/users/${username}/events/public?per_page=30`, { headers });
  const commits = [];
  eventsRes.data.forEach(event => {
    if (event.type === 'PushEvent' && event.payload && event.payload.commits) {
      event.payload.commits.forEach(commit => {
        commits.push({
          repo: event.repo.name.replace(`${username}/`, ''),
          message: commit.message,
          sha: commit.sha.substring(0, 7),
          date: event.created_at,
          url: `https://github.com/${event.repo.name}/commit/${commit.sha}`
        });
      });
    }
  });

  const recentCommits = commits.slice(0, 6);

  // 4. Scrape contributions & calculate streaks
  const { days, totalContributions } = await scrapeContributions(username);
  const { currentStreak, longestStreak } = calculateStreaks(days);

  return {
    profile,
    stats: {
      totalContributions,
      currentStreak,
      longestStreak,
      totalRepos: profile.publicRepos,
    },
    languages,
    recentCommits,
    latestRepos,
    contributionCalendar: days,
  };
}

// Controller functions
exports.getGitHubData = async (req, res) => {
  const username = 'hashirahmad806';
  const token = process.env.GITHUB_TOKEN;

  try {
    // Return cached data if valid
    if (cachedData && cacheExpiry && Date.now() < cacheExpiry) {
      return res.json({ success: true, cached: true, data: cachedData });
    }

    const data = await fetchGitHubData(username, token);
    
    // Update cache
    cachedData = data;
    cacheExpiry = Date.now() + CACHE_DURATION;

    return res.json({ success: true, cached: false, data });
  } catch (error) {
    console.error('GitHub API fetch failed:', error.message);
    
    // If API fails, fall back to cache even if expired
    if (cachedData) {
      return res.json({
        success: true,
        cached: true,
        error: 'Failed to fetch fresh data. Serving cached version.',
        data: cachedData
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to load GitHub activity data.',
      error: error.message
    });
  }
};

// Webhook / Sync endpoint to invalidate cache
exports.syncGitHubData = async (req, res) => {
  const username = 'hashirahmad806';
  const token = process.env.GITHUB_TOKEN;

  try {
    console.log(`[GitHub Sync] Invalidation triggered. Fetching fresh data for ${username}...`);
    const data = await fetchGitHubData(username, token);
    
    cachedData = data;
    cacheExpiry = Date.now() + CACHE_DURATION;

    return res.json({
      success: true,
      message: 'GitHub activity cache updated successfully.',
      data
    });
  } catch (error) {
    console.error('[GitHub Sync] Sync failed:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to synchronize GitHub data.',
      error: error.message
    });
  }
};
