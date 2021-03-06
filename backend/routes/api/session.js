// backend/routes/api/session.js
const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator'); // this and the handleValidationErrors will validate the body of the request.
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid email or username')
    .notEmpty()
    .withMessage('Please provide a valid email or username.')
    .isLength({ min: 3 })
    .withMessage(`Please provided a valid email or username with a minimum of 3 characters`),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];


// Log in
router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user as JSON under the key of user
// if no session, return a JSON with an empty obj
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

// guest user
// router.post(
//   '/',
//   validateLogin,
//   asyncHandler(async (req, res, next) => {

//     const password = "guestUser1!";
//     const hashedPassword = await bcrypt.hash(password, 10);

//     let guest = await User.findAll({
//         where: {
//             username: 'guest'
//         }
//     })

//     if (!guest) {
//         loginUser(req, res, guest[0]);
//         return res.json();
//     } else {


//         await db.User.create({
//             username: 'guest',
//             firstName: 'Guest',
//             lastName: 'User',
//             emailAddress: 'guest@user.com',
//             hashedPassword: hashedPassword
//         })

//         guest = await db.User.findAll({
//             where: {
//                 username: 'guest'
//             }
//         })
//         loginUser(req, res, guest[0]);
//         return res.redirect('/');
//     }

// }));


module.exports = router;