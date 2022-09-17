const { Router } = require('express');
const categoriesRouter = require('./categories-router');
const productsRouter = require('./products-router');

const apiRouter = Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/categories', categoriesRouter);

module.exports = apiRouter;