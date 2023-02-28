// Importing Modules
const express = require('express');
const router = express.Router();


//Controllers
const Signup = require('../Controllers/Signup');
const Login = require('../Controllers/Login');
const GetUser = require('../Controllers/GetUser');
const ProfileInfo = require('../Controllers/ProfileInfo');
const ChangePassword = require('../Controllers/ChangePassword');
const AddPost = require('../Controllers/AddPost');
const Explore = require('../Controllers/Explore');
const DeletePost = require('../Controllers/DeletePost');
const Logout = require('../Controllers/Logout');
const ExploreDetail = require('../Controllers/ExploreDetail');
const MyPost = require('../Controllers/MyPost');
const EditPost = require('../Controllers/EditPost');

//Middlewares
const {userRegisterValidator, userById, validatePost,validatePassword} = require('../Middlewares/UserMiddleware');
const {verifyToken} = require('../Middlewares/AuthenticationMiddleware');
const DeleteAccount = require('../Controllers/DeleteAccount');



// APIs Route
router.get('/', (_,res) => {res.send('Hey, Welcome to JOOGLE');});
router.post('/signup',userRegisterValidator, Signup);
router.post('/login', Login);
router.get('/getUser', verifyToken, userById, GetUser);
router.get('/profile/info', verifyToken, userById, ProfileInfo);
router.put('/changePassword',verifyToken,userById,validatePassword,ChangePassword);
router.post('/explore/addPost', verifyToken, validatePost, userById, AddPost);
router.put('/explore/editPost', verifyToken, validatePost, userById, EditPost);
router.get('/explore/myPost', verifyToken, userById, MyPost);
router.get('/explore', verifyToken, Explore);
router.get('/explore/:_id', verifyToken, ExploreDetail);
router.delete('/explore/deletePost/:postId', verifyToken,userById,DeletePost);
router.delete('/profile/deleteAccount', verifyToken,userById, DeleteAccount);
router.post('/logout', verifyToken, Logout);

module.exports = router;
