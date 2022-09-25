const UserModel = require('../models/user-model');
const {
  createBadDataError,
  createNotFoundError,
  sendErrorResponse,
} = require('../helpers/errors');

const findProduct = (cartItems, id) => cartItems.find((item) => item.productId.toString() === id);

const fetchAll = (req, res) => {
  res.status(200).json(req.authUser.cartItems)
}

const create = async (req, res) => {
  const data = req.body;

  try {
    await UserModel.validateCartItem(data);

    const foundProduct = findProduct(req.authUser.cartItems, data.productId);
    if (foundProduct) throw createBadDataError('Product already exist in cart');

    const newCartItem = {
      productId: data.productId,
      amount: data.amount,
    }

    req.authUser.cartItems.push(newCartItem);

    await req.authUser.save()

    res.status(200).json(newCartItem)
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

const update = async (req, res) => {
  const data = {
    productId: req.params.id,
    amount: req.body.amount,
  }

  try {
    await UserModel.validateCartItem(data);

    const foundProduct = findProduct(req.authUser.cartItems, data.productId);
    if (!foundProduct) throw createNotFoundError('Product does not exist in cart');

    foundProduct.amount = data.amount;

    await req.authUser.save();

    res.status(200).json(foundProduct)
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

const remove = async (req, res) => {
  const productId = req.params.id;

  try {
    const foundProduct = findProduct(req.authUser.cartItems, productId);
    if (!foundProduct) throw createNotFoundError('Product does not exist in cart');

    req.authUser.cartItems = req.authUser.cartItems.filter(x => x.productId.toString() !== productId);

    await req.authUser.save();

    res.status(200).json(foundProduct);
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

module.exports = {
  fetchAll,
  create,
  update,
  remove,
};
