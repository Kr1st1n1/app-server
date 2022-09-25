const { Router } = require('express');
const categoriesRouter = require('./categories-router');
const productsRouter = require('./products-router');
const usersRouter = require('./users-router');
const cartItemsRouter = require('./cart-items-router');

const apiRouter = Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/cart-items', cartItemsRouter);

module.exports = apiRouter;
