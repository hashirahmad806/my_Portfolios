const express = require('express')
const router  = express.Router()
const ctrl    = require('../controllers/githubController')

router.get('/', ctrl.getGitHubData)
router.post('/sync', ctrl.syncGitHubData)
router.post('/webhook', ctrl.syncGitHubData) // Support direct webhook trigger on push

module.exports = router
