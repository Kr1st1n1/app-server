const createHouseViewModel = (houseDoc) => ({
  id: houseDoc._id.toString(),
  title: houseDoc.title,
  description: houseDoc.description,
  categoryId: houseDoc.categoryId.toString(),
  images: houseDoc.images,
  price: houseDoc.price,
  createdAt: houseDoc.createdAt,
  updatedAt: houseDoc.updatedAt,
});

module.exports = createHouseViewModel;
