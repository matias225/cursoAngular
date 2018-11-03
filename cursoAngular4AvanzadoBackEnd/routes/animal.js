'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();
var mdAuth = require('../middlewares/authenticated');
var mdAdmin = require('../middlewares/is_admin');

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/animals' });

api.get('/pruebas-animales', mdAuth.ensureAuth, AnimalController.pruebas);
api.post('/animal', [mdAuth.ensureAuth, mdAdmin.isAdmin], AnimalController.saveAnimal);
api.get('/animals', AnimalController.getAnimals);
api.get('/animal/:id', AnimalController.getAnimal);
api.put('/animal/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], AnimalController.updateAnimal);
api.post('/upload-image-animal/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin, mdUpload], AnimalController.uploadImage);
api.get('/get-image-animal/:imageFile', AnimalController.getImageFile);
api.delete('/animal/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], AnimalController.deleteAnimal);

module.exports = api;