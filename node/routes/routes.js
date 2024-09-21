const express = require('express');

const app = express();

const routes = express.Router();

routes.route('/').get(getHome);
routes.route('users').get(getUsers);
routes.route('users').post(postUsers);

module.exports = routes;