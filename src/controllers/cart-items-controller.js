const UserModel = require('../models/user-model');
const createCartItemViewModel = require('../view-models/create-cart-item-view-model')
const {
  createBadDataError,
  createNotFoundError,
  sendErrorResponse,
} = require('../helpers/errors');

const findhouse = (cartItems, id) => cartItems.find((item) => item.houseId.toString() === id);

const fetchAll = (req, res) => {
  res.status(200).json(req.authUser.cartItems.map(createCartItemViewModel));
}

const create = async (req, res) => {
  const data = req.body;

  try {
    await UserModel.validateCartItem(data);

    const foundhouse = findhouse(req.authUser.cartItems, data.houseId);
    if (foundhouse) throw createBadDataError('house already exist in cart');

    const newCartItemDoc = {
      houseId: data.houseId,
      amount: data.amount,
    }

    req.authUser.cartItems.push(newCartItemDoc);

    await req.authUser.save()

    res.status(200).json(createCartItemViewModel(newCartItemDoc))
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

const update = async (req, res) => {
  const data = {
    houseId: req.params.id,
    amount: req.body.amount,
  }

  try {
    await UserModel.validateCartItem(data);

    const foundCartItemDoc = findhouse(req.authUser.cartItems, data.houseId);
    if (!foundCartItemDoc) throw createNotFoundError('house does not exist in cart');

    foundCartItemDoc.amount = data.amount;

    await req.authUser.save();

    res.status(200).json(createCartItemViewModel(foundCartItemDoc));
  } catch (error) {
    sendErrorResponse(error, res)
  }
}

const remove = async (req, res) => {
  const houseId = req.params.id;

  try {
    const foundCartItemDoc = findhouse(req.authUser.cartItems, houseId);
    if (!foundCartItemDoc) throw createNotFoundError('house does not exist in cart');

    req.authUser.cartItems = req.authUser.cartItems.filter(x => x.houseId.toString() !== houseId);

    await req.authUser.save();

    res.status(200).json(createCartItemViewModel(foundCartItemDoc));
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
