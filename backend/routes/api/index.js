// backend/routes/api/index.js
// most routes will live here
const router = require('express').Router();
// connect session and users
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const imagesRouter = require('./images.js');
const commentsRouter = require('./comments.js');
const albumsRouter = require('./albums.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/images', imagesRouter);
// router.use('/comments', commentsRouter);
router.use('/comments', commentsRouter);
router.use('/albums', albumsRouter);

// can now safely remove this test route
// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

module.exports = router;