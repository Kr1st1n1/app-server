const createCategoryViewModel = require('./create-category-view-model');

const createHousePopulatedViewModel = (housePopulatedDoc) => ({
  id: housePopulatedDoc._id.toString(),
  title: housePopulatedDoc.title,
  description: housePopulatedDoc.description,
  category: createCategoryViewModel(housePopulatedDoc.categoryId),
  images: housePopulatedDoc.images,
  price: housePopulatedDoc.price,
  createdAt: housePopulatedDoc.createdAt,
  updatedAt: housePopulatedDoc.updatedAt,
});

module.exports = createHousePopulatedViewModel;
