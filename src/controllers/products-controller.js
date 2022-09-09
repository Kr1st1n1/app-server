const {
  createId,
  isValidProductData,
  createCmpById,
  removeEmptyProps,
} = require('../helpers');

const database = {
  products: [{
    id: 1,
    title: 'Koks megstamiausias Bethoveno vaisius?',
    description: 'Ba-Na-Na-NA... Ba-na-na-na',
  }, {
    id: 2,
    title: 'Kokioje šalyje daugiausiai veganų?',
    description: 'cu-Kinijoj',
  }],
};

const fetchAll = (req, res) => {
  res.status(200).json(database.products);
};

const fetch = (req, res) => {
  const productId = req.params.id;

  try {
    const foundProduct = database.products.find(createCmpById(productId));
    if (foundProduct === undefined) {
      throw ({
        message: 'Serveris nepagavo bajerio',
        status: 404,
      });
    }

    res.status(200).json(foundProduct);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const create = (req, res) => {
  const newProductData = req.body;

  try {
    if (!isValidProductData(newProductData)) {
      throw ({
        message: 'Prastas humoro jausmas',
        status: 400,
      });
    }

    const newProduct = {
      id: createId(),
      ...newProductData,
    };

    database.products.push(newProduct);

    res.status(201).json(newProduct);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const replace = (req, res) => {
  const productId = req.params.id;
  const { question, punchline } = req.body;
  const newProductData = { question, punchline };

  try {
    if (!isValidProductData(newProductData)) {
      throw ({
        message: 'Serveris neranda info',
        status: 400,
      });
    }

    const foundProductIndex = database.products.findIndex(createCmpById(productId));
    if (foundProductIndex === -1) {
      throw ({
        message: 'Serveris neranda info',
        status: 404,
      });
    }
    const updateProductData = {
      id: database.products[foundProductIndex].id,
      ...newProductData,
    };

    database.products[foundProductIndex] = updateProductData;

    res.status(200).json(updateProductData);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const update = (req, res) => {
  const productId = req.params.id;
  const { question, punchline } = req.body;
  const newProductData = removeEmptyProps({ question, punchline });

  try {
    const foundProductIndex = database.products.findIndex(createCmpById(productId));
    if (foundProductIndex === -1) {
      throw ({
        message: 'Serveris neranda info',
        status: 404,
      });
    }

    const updateProductData = {
      ...database.products[foundProductIndex],
      ...newProductData,
    };

    database.products[foundProductIndex] = updateProductData;

    res.status(200).json(updateProductData);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const remove = (req, res) => {
  const productId = req.params.id;

  try {
    const foundProductIndex = database.products.findIndex(createCmpById(productId));
    if (foundProductIndex === -1) {
      throw ({
        message: 'Serveris neranda info',
        status: 404,
      });
    }

    const [deletedDadJoke] = database.products.splice(foundProductIndex, 1);

    res.status(200).json(deletedDadJoke);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
