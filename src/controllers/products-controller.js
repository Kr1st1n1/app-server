const { removeEmptyProps } = require('../helpers');
const ProductModel = require('../models/product-model');

const isValidProductData = ({ title, description, categoryId, img, price }) => 
title !== undefined && typeof title === 'string' && title !== ''&&
description !== undefined && typeof description === 'string' && description !== ''  &&
categoryId !== undefined && typeof categoryId === 'string' && categoryId !== ''  &&
img !== undefined && typeof img=== 'string' && img !== ''  &&
price !== undefined && typeof price === 'number' && price > 0;

const createProductNotFoundError = (productId) => ({
  message: `Product with id '${productId}' was not found`,
  status: 404
});

const createProductBadDataError = (dataObj) => ({
  message: `Product data is invalid:\n${JSON.stringify(dataObj, null, 4)}`,
  status: 400
});

const fetchAll = async (req, res) => {
  const productDocuments = await ProductModel.find();

  res.status(200).json(productDocuments);
};

const fetch = async (req, res) => {
  const productId = req.params.id;

  try {
    const foundProduct = await ProductModel.findById(productId);
    if (foundProduct === undefined)  throw createProductNotFoundError(productId)

    res.status(200).json(foundProduct);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const create = async (req, res) => {
  const newProductData = req.body;

  try {
    if (!isValidProductData(newProductData)) throw createProductBadDataError (newProductData)

    const newProduct = await ProductModel.create(newProductData)

    res.status(201).json(newProduct);

  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const replace = async (req, res) => {
  const productId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newProductData = { title, description, categoryId, img, price };

  try {
    if (!isValidProductData(newProductData)) throw createProductBadDataError (newProductData)

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      newProductData,
      { new: true, runValidators: true }
    );

    if (updatedProduct === null) throw createProductNotFoundError(productId);

    res.status(200).json(updatedProduct)
    
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const update = async (req, res) => {
  const productId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newProductData = removeEmptyProps({ title, description, categoryId, img, price });

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      newProductData,
      { new: true }
    );

    if (updatedProduct === null) throw createProductNotFoundError(productId);

    res.status(200).json(updatedProduct)
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const remove = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (deletedProduct === null ) createProductNotFoundError(productId);

    res.status(200).json(deletedProduct);
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

