'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var mdAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/users' });

api.get('/pruebas-del-controlador', mdAuth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);
api.put('/update-user/:id', mdAuth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [mdAuth.ensureAuth, mdUpload], UserController.uploadImage);
api.get('/get-image-file/:imageFile', UserController.getImageFile);
api.get('/keepers', UserController.getKeepers);

module.exports = api;