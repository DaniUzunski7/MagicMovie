import express from 'express';
import homeController from './controllers/homeController.js';
import createMovieController from './controllers/createMovieController.js'

const routes = express.Router();

routes.use(homeController);
routes.use(createMovieController)

routes.get('*', (req, res) => {
    res.render('404');
  })

export default routes;