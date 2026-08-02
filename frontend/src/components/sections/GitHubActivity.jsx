import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { githubAPI } from '../../utils/api'

const gold = '#c9a84c'
const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true

// Inline SVG Icons for premium looks
const GitCommitIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const RepoIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-4 h-4 text-amber-500 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const ForkIcon = () => (
  <svg className="w-4 h-4 text-emerald-500 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
)

const RefreshIcon = ({ className }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
  </svg>
)

export default function GitHubActivity() {
  const { ref, visible } = useScrollReveal()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [syncing, setSyncing] = useState(false)

  const fetchData = async (force = false) => {
    try {
      if (force) setSyncing(true);
      else setLoading(true);
      
      const res = force ? await githubAPI.sync() : await githubAPI.get();
      if (res.data && res.data.success) {
        setData(res.data.data);
      } else {
        setError('Could not retrieve active data.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch GitHub activity.');
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Format date helper
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // Relative time helper
  const getRelativeTime = (dateStr) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const elapsed = new Date(dateStr) - new Date();
    const seconds = Math.round(elapsed / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (Math.abs(days) > 0) return rtf.format(days, 'day');
    if (Math.abs(hours) > 0) return rtf.format(hours, 'hour');
    if (Math.abs(minutes) > 0) return rtf.format(minutes, 'minute');
    return 'Just now';
  }

  // Get color for contribution heatmap level
  const getContributionColor = (level) => {
    switch (level) {
      case 0: return 'var(--surface2)';
      case 1: return 'rgba(201, 168, 76, 0.2)';
      case 2: return 'rgba(201, 168, 76, 0.45)';
      case 3: return 'rgba(201, 168, 76, 0.75)';
      case 4: return 'rgba(201, 168, 76, 1)';
      default: return 'var(--surface2)';
    }
  }

  return (
    <section id="github" style={{ padding: '120px 0', background: 'var(--obsidian)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity .7s, transform .7s', marginBottom: 64 }}>
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 28, height: 1, background: gold }} />
                <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 11, color: gold, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Activity</span>
              </div>
              <h2 style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)' }}>
                GitHub <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontWeight: 400, color: gold }}>Dashboard</em>
              </h2>
            </div>

            {/* Sync button */}
            {!loading && !error && (
              <button
                onClick={() => fetchData(true)}
                disabled={syncing}
                className="btn-gold font-mono"
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontSize: 12,
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text)',
                  cursor: syncing ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.3s ease',
                  opacity: syncing ? 0.7 : 1
                }}
              >
                <RefreshIcon className={syncing ? 'animate-spin' : ''} />
                {syncing ? 'Syncing...' : 'Sync Live'}
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            // Premium Loading Skeleton
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6"
            >
              {/* Profile Card & Stats Grid Skeleton */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 h-64 animate-pulse flex flex-col justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[var(--surface2)]" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-[var(--surface2)] rounded w-3/4" />
                      <div className="h-3 bg-[var(--surface2)] rounded w-1/2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-[var(--surface2)] rounded w-full" />
                    <div className="h-3 bg-[var(--surface2)] rounded w-5/6" />
                  </div>
                  <div className="flex gap-4">
                    <div className="h-4 bg-[var(--surface2)] rounded w-12" />
                    <div className="h-4 bg-[var(--surface2)] rounded w-12" />
                  </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(idx => (
                    <div key={idx} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 h-28 animate-pulse flex flex-col justify-between">
                      <div className="h-3 bg-[var(--surface2)] rounded w-1/2" />
                      <div className="h-8 bg-[var(--surface2)] rounded w-1/3" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap Skeleton */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 h-48 animate-pulse flex flex-col justify-between">
                <div className="h-4 bg-[var(--surface2)] rounded w-1/4" />
                <div className="h-24 bg-[var(--surface2)] rounded w-full" />
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                padding: '40px',
                borderRadius: 20,
                border: '1px solid rgba(239, 68, 68, 0.2)',
                background: 'rgba(239, 68, 68, 0.03)',
                textAlign: 'center',
                color: 'var(--text)'
              }}
            >
              <p className="font-mono text-sm text-red-500 mb-4">⚠ {error}</p>
              <button
                onClick={() => fetchData()}
                className="btn-gold font-mono"
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontSize: 12,
                  border: '1px solid var(--border)',
                  background: 'var(--surface)'
                }}
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            // Full Premium Interactive Dashboard
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid gap-6"
            >
              {/* Profile Card & Stats Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div
                  className="glass p-6 flex flex-col justify-between relative overflow-hidden"
                  style={{
                    borderRadius: 20,
                    boxShadow: 'var(--card-shadow)',
                    minHeight: '260px'
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 40% at 0% 0%, rgba(201,168,76,0.03), transparent 60%)`, pointerEvents: 'none' }} />
                  
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={data.profile.avatar}
                        alt={data.profile.name}
                        className="w-16 h-16 rounded-full border-2"
                        style={{ borderColor: gold }}
                      />
                      <div>
                        <h3 className="font-clash text-lg font-semibold text-[var(--text)]">{data.profile.name}</h3>
                        <a
                          href={`https://github.com/${data.profile.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono"
                          style={{ color: gold }}
                        >
                          @{data.profile.username}
                        </a>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--text2)] leading-relaxed mb-4">{data.profile.bio}</p>
                  </div>

                  <div className="flex gap-6 border-t border-[var(--border)] pt-4">
                    <div>
                      <div className="text-sm font-clash font-semibold text-[var(--text)]">{data.profile.followers}</div>
                      <div className="text-[10px] font-mono text-[var(--text3)] uppercase tracking-wider">Followers</div>
                    </div>
                    <div>
                      <div className="text-sm font-clash font-semibold text-[var(--text)]">{data.profile.following}</div>
                      <div className="text-[10px] font-mono text-[var(--text3)] uppercase tracking-wider">Following</div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                  {[
                    { label: 'Total Contributions', val: data.stats.totalContributions, suffix: 'last year', color: gold },
                    { label: 'Current Streak', val: `${data.stats.currentStreak} Days`, suffix: 'consecutive active', color: '#61DAFB' },
                    { label: 'Longest Streak', val: `${data.stats.longestStreak} Days`, suffix: 'historical record', color: '#00E5A0' },
                    { label: 'Total Repositories', val: data.stats.totalRepos, suffix: 'public repos', color: '#ffb800' }
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="glass p-5 flex flex-col justify-between relative overflow-hidden"
                      style={{
                        borderRadius: 20,
                        boxShadow: 'var(--card-shadow)'
                      }}
                    >
                      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 40% 40% at 100% 100%, ${stat.color}05, transparent 60%)`, pointerEvents: 'none' }} />
                      <div className="text-[10px] font-mono text-[var(--text3)] uppercase tracking-wider">{stat.label}</div>
                      <div className="my-2">
                        <div className="text-2xl md:text-3xl font-clash font-semibold text-[var(--text)]" style={{ color: stat.color }}>
                          {stat.val}
                        </div>
                        <div className="text-[10px] text-[var(--text3)] italic mt-0.5">{stat.suffix}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap Section */}
              {data.contributionCalendar && data.contributionCalendar.length > 0 && (
                <div
                  className="glass p-6"
                  style={{
                    borderRadius: 20,
                    boxShadow: 'var(--card-shadow)'
                  }}
                >
                  <h4 className="font-clash text-sm font-medium text-[var(--text)] mb-4 flex items-center justify-between">
                    <span>Contribution Grid</span>
                    <span className="text-[10px] font-mono text-[var(--text3)]">Last 365 Days</span>
                  </h4>
                  
                  {/* Heatmap grid scroll wrapper */}
                  <div className="overflow-x-auto pb-2 scrollbar-thin">
                    <div className="grid grid-flow-col gap-1" style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))', width: 'max-content' }}>
                      {data.contributionCalendar.map((day, idx) => (
                        <div
                          key={idx}
                          title={`${day.count || 0} contributions on ${formatDate(day.date)}`}
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 2,
                            background: getContributionColor(day.level || 0),
                            transition: 'background 0.3s ease'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Heatmap Legend */}
                  <div className="flex justify-between items-center mt-4 text-[10px] font-mono text-[var(--text3)]">
                    <div>* Pushes reflect commits and other platform updates</div>
                    <div className="flex items-center gap-1">
                      <span>Less</span>
                      {[0, 1, 2, 3, 4].map(lvl => (
                        <div
                          key={lvl}
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 1,
                            background: getContributionColor(lvl)
                          }}
                        />
                      ))}
                      <span>More</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Languages & Commits & Repos */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Most Used Languages */}
                <div className="glass p-6 flex flex-col justify-between" style={{ borderRadius: 20, boxShadow: 'var(--card-shadow)' }}>
                  <div>
                    <h4 className="font-clash text-sm font-medium text-[var(--text)] mb-4">Most Used Languages</h4>
                    <div className="space-y-4">
                      {data.languages.map((lang, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-[11px] font-mono text-[var(--text2)] mb-1">
                            <span>{lang.name}</span>
                            <span>{lang.percentage}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[var(--surface2)] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${lang.percentage}%` }}
                              transition={{ duration: 0.8, delay: idx * 0.1 }}
                              className="h-full rounded-full"
                              style={{ background: gold }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Commits Timeline */}
                <div className="glass p-6 md:col-span-2" style={{ borderRadius: 20, boxShadow: 'var(--card-shadow)' }}>
                  <h4 className="font-clash text-sm font-medium text-[var(--text)] mb-4">Recent Push Activity</h4>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                    {data.recentCommits && data.recentCommits.length > 0 ? (
                      data.recentCommits.map((commit, idx) => (
                        <div
                          key={idx}
                          className="flex gap-4 items-start relative group"
                        >
                          {/* Timeline Line */}
                          {idx !== data.recentCommits.length - 1 && (
                            <div className="absolute left-[9px] top-[24px] bottom-[-20px] w-[1px] bg-[var(--border)]" />
                          )}
                          
                          <div
                            className="w-5 h-5 rounded-full bg-[var(--surface2)] flex items-center justify-center flex-shrink-0 text-xs border border-[var(--border)]"
                            style={{ color: gold }}
                          >
                            ⚡
                          </div>

                          <div className="flex-1 bg-[var(--void)] border border-[var(--border)] p-3 rounded-xl transition-all group-hover:border-gold2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] font-mono text-gray-500 font-semibold uppercase">{commit.repo}</span>
                              <span className="text-[9px] font-mono text-gray-500">{getRelativeTime(commit.date)}</span>
                            </div>
                            <p className="text-[11px] text-[var(--text2)] font-mono line-clamp-1">{commit.message}</p>
                            <div className="mt-1 flex justify-between items-center">
                              <span className="text-[9px] font-mono text-[var(--text3)]">SHA: {commit.sha}</span>
                              <a
                                href={commit.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[9px] font-mono hover:underline"
                                style={{ color: gold }}
                              >
                                View Commit →
                              </a>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-[var(--text3)] italic">No recent push events discovered.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Latest Repositories */}
              <div className="glass p-6" style={{ borderRadius: 20, boxShadow: 'var(--card-shadow)' }}>
                <h4 className="font-clash text-sm font-medium text-[var(--text)] mb-4">Latest Repositories</h4>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.latestRepos.map((repo, idx) => (
                    <a
                      key={idx}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-[var(--void)] border border-[var(--border)] p-5 rounded-2xl transition-all duration-300 hover:border-gold2 flex flex-col justify-between"
                      style={{
                        minHeight: '150px'
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-clash text-sm font-semibold text-[var(--text)] group-hover:text-gold2 transition-colors">
                            {repo.name}
                          </h5>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[var(--surface2)] text-[var(--text2)]">
                            {repo.language || 'Plain'}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text2)] line-clamp-2 leading-relaxed mb-4">
                          {repo.description}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-[var(--border)] text-[10px] font-mono text-[var(--text3)]">
                        <div className="flex gap-3">
                          <span>
                            <StarIcon />
                            {repo.stars}
                          </span>
                          <span>
                            <ForkIcon />
                            {repo.forks}
                          </span>
                        </div>
                        <span>Updated {new Date(repo.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
