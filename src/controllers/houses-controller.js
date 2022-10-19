const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const HouseModel = require('../models/house-model');
const createhousePopulatedViewModel = require('../view-models/create-house-populated-view-model')
const createhouseViewModel = require('../view-models/create-house-view-model')

const createhouseNotFoundError = (houseId) => createNotFoundError(`house with id '${houseId}' was not found`)


const fetchAll = async (req, res) => {
  const {
    joinBy, id, price_lte, price_gte, categoryId,
  } = req.query;
  const joinedDocuments = joinBy === 'categoryId';
  const filter = {};

  if (id) filter._id = id instanceof Array ? { $in: id } : id;
  if (categoryId) {
    filter.categoryId = categoryId instanceof Array
      ? { $in: categoryId }
      : categoryId;
  }
  // Query by price range
  if (price_lte || price_gte) {
    filter.price = {};
    if (price_lte) filter.price.$lte = price_lte;
    if (price_gte) filter.price.$gte = price_gte;
  }

  try {
    const houseDocs = joinedDocuments
      ? await HouseModel.find(filter).populate('categoryId')
      : await HouseModel.find(filter);

    res.status(200).json(joinedDocuments
      ? houseDocs.map(createhousePopulatedViewModel)
      : houseDocs.map(createhouseViewModel));
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const houseId = req.params.id;
  const { joinBy } = req.query;
  const joinedDocument = joinBy === 'categoryId';

  try {
    const foundHouseDoc = joinedDocument
      ? await HouseModel.findById(houseId).populate('categoryId')
      : await HouseModel.findById(houseId);
    if (foundHouseDoc === null) throw createhouseNotFoundError(houseId);

    res.status(200).json(joinedDocument
      ? createhousePopulatedViewModel(foundHouseDoc)
      : createhouseViewModel(foundHouseDoc));
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newHouseData = req.body;

  try {
    await HouseModel.validateData(newHouseData);

    const newHouseDoc = await HouseModel.create(newHouseData);

    res.status(201).json(createhouseViewModel(newHouseDoc));

  } catch (err) {
    sendErrorResponse(err, res);
  }
};

const replace = async (req, res) => {
  const houseId = req.params.id;
  const { title, description, categoryId, images, price } = req.body;
  const newhouseData = { title, description, categoryId, images, price };

  try {
    await HouseModel.validateData(newhouseData);

    const updatedhouseDoc = await HouseModel.findByIdAndUpdate(
      houseId,
      newhouseData,
      { new: true, runValidators: true }
    );

    if (updatedhouseDoc === null) throw createhouseNotFoundError(houseId);

    res.status(201).json(createhouseViewModel(updatedhouseDoc));
    
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

const update = async (req, res) => {
  const houseId = req.params.id;
  const { title, description, categoryId, images, price } = req.body;
  const newHouseData = removeEmptyProps({ title, description, categoryId, images, price });

  try {
    await HouseModel.validateUpdateData(newHouseData);

    const updatedHouseDoc = await HouseModel.findByIdAndUpdate(
      houseId,
      newHouseData,
      { new: true }
    );

    if (updatedHouseDoc === null) throw createhouseNotFoundError(houseId);

    res.status(200).json(createhouseViewModel(updatedHouseDoc))
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

const remove = async (req, res) => {
  const houseId = req.params.id;

  try {
    const deletedHouseDoc = await HouseModel.findByIdAndDelete(houseId);
    if (deletedHouseDoc === null ) createhouseNotFoundError(houseId);

    res.status(200).json(createhouseViewModel(deletedHouseDoc));
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

const getPriceRange = async (req, res) => {
  const [priceRange] = await HouseModel.aggregate(
    [
      {
        $group:
        {
          _id: {},
          min: { $min: '$price' },
          max: { $max: '$price' },
        },
      },
    ],
  );

  res.status(200).json([priceRange.min, priceRange.max]);
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
  getPriceRange,
};
