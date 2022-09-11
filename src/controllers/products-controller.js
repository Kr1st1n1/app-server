const { removeEmptyProps } = require('../helpers');

const database = {
  products: [
    {
      id: "DCE10D7D-3987-EE3E-6E17-75FC38D23ECA",
      title: "adipiscing elit",
      description: "vel est tempor bibendum. Donec felis orci, adipiscing non, luctus",
      categoryId: "3",
      img: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZWFycmluZ3N8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
      price: 99.99
    },
    {
      id: "593CAD15-581D-514A-3956-565A5671272B",
      title: "non quam",
      description: "vitae, sodales at, velit. Pellentesque ultricies",
      categoryId: "5",
      img: "https://images.unsplash.com/photo-1605092043145-2d6d763ec771?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHB1cnNlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      price: 150.99
    },
    {
      id: "A3ADE977-67F9-7D43-DC1E-DA5F81202699",
      title: "ornare placerat",
      description: "nascetur ridiculus mus. Odio tristique pharetra",
      categoryId: "2",
      img: "https://images.unsplash.com/photo-1611824204322-24963b44d68b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHN1bmdsYXNzZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
      price: 110.89,
      category: 2
    },
    {
      id: "22574763-4E41-506D-7382-1713E578436A",
      title: "faucibus orci",
      description: "sem ut dolor dapibus gravida. Aliquam",
      categoryId: "1",
      img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
      price: 220.99
    },
    {
      id: "13A3DD4D-460D-C87C-A4F4-56B21C35E815",
      title: "Ut semper",
      description: "nascetur ridiculus mus. Odio tristique pharetra",
      categoryId: "2",
      img: "https://images.unsplash.com/photo-1552663714-7b25fe5439a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3VuZ2xhc3NlcyUyMG1lbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      price: 150.99
    },
    {
      id: "41F64B2A-F29E-C1F7-DD2A-2025A4B4D9D6",
      title: "pellentesque",
      description: "nascetur ridiculus mus. Odio tristique pharetra",
      categoryId: "5",
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmFnc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      price: 199.99
    },
    {
      id: "26575A26-B2FA-23B6-2E21-78C048B1B26C",
      title: "viverra. Donec",
      description: "diam at pretium aliquet, metus urna convallis",
      categoryId: "3",
      img: "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZWFycmluZ3N8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
      price: 250.99
    },
    {
      id: "B9E7DC9C-3155-E39B-8AD6-8B063609937E",
      title: "mus. Donec",
      description: "nascetur ridiculus mus. Odio tristique pharetra",
      categoryId: "2",
      img: "https://images.unsplash.com/photo-1585185590319-d68abacc7848?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBzdW5nbGFzc2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      price: 59.99
    },
    {
      id: "A006711C-6238-1D0E-172B-B0FE52074A7e",
      title: "vitae, orci",
      description: "nascetur ridiculus mus. Odio tristique pharetra.",
      categoryId: "2",
      img: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVuJTIwc3VuZ2xhc3Nlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      price: 200.59
    },
    {
      id: "22574763-4E41-506D-7382-1713E578436B",
      title: "faucibus orci",
      description: "sem ut dolor dapibus gravida. Aliquam",
      categoryId: "1",
      img: "https://images.unsplash.com/photo-1524738258074-f8125c6a7588?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwd2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
      price: 225.99
    },
    {
      id: "41F64B2A-F29E-C1F7-DD2A-2025A4B4D9D7",
      title: "pellentesque",
      description: "nascetur ridiculus mus. Odio tristique pharetra",
      categoryId: "5",
      img: "https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHB1cnNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      price: 249.99
    }
  ]
};

let counter = 1;
const createId = () => String(++counter);

const isValidProductData = ({ title, description, categoryId, img, price }) => 
title !== undefined && typeof title === 'string' && title !== ''&&
description !== undefined && typeof description === 'string' && description !== ''  &&
categoryId !== undefined && typeof categoryId === 'string' && categoryId !== ''  &&
img !== undefined && typeof img=== 'string' && img !== ''  &&
price !== undefined && typeof price === 'number' && price > 0;

const createCmpById = (productId) => ({ id }) => id === productId;

const createProductNotFoundError = (productId) => ({
  message: `Product with id '${productId}' was not found`,
  status: 404
});

const createProductBadDataError = (dataObj) => ({
  message: `Product data is invalid:\n${JSON.stringify(dataObj, null, 4)}`,
  status: 400
});

const fetchAll = (req, res) => {
  res.status(200).json(database.products);
};

const fetch = (req, res) => {
  const productId = req.params.id;

  try {
    const foundProduct = database.products.find(createCmpById(productId));
    if (foundProduct === undefined)  throw createProductNotFoundError(productId)

    res.status(200).json(foundProduct);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const create = (req, res) => {
  const newProductData = req.body;

  try {
    if (!isValidProductData(newProductData)) throw createProductBadDataError (newProductData)

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
  const { title, description, categoryId, img, price } = req.body;
  const newProductData = { title, description, categoryId, img, price };

  try {
    if (!isValidProductData(newProductData)) throw createProductBadDataError (newProductData)

    const foundProductIndex = database.products.findIndex(createCmpById(productId));
    if (foundProductIndex === -1) throw createProductNotFoundError(productId)

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
  const { title, description, categoryId, img, price } = req.body;
  const newProductData = removeEmptyProps({ title, description, categoryId, img, price });

  try {
    const foundProductIndex = database.products.findIndex(createCmpById(productId));
    if (foundProductIndex === -1)  throw createProductNotFoundError(productId)

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
    if (foundProductIndex === -1)  throw createProductNotFoundError(productId)

    const [deletedProduct] = database.products.splice(foundProductIndex, 1);

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
