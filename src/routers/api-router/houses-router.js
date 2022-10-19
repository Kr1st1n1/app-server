const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
  getPriceRange,
} = require('../../controllers/houses-controller');

const housesRouter = Router();

housesRouter.get('/', fetchAll);

housesRouter.get('/price-range', getPriceRange);

housesRouter.get('/:id', fetch);

housesRouter.post('/', create);

housesRouter.put('/:id', replace);

housesRouter.patch('/:id', update);

housesRouter.delete('/:id', remove);

module.exports = housesRouter;
