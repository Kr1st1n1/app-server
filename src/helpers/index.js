let currentId = 2;
const createId = () => ++currentId;

const isValidProductData = ({ question, punchline }) => question !== undefined && typeof question === 'string' && question !== ''
  && punchline !== undefined && typeof punchline === 'string' && punchline !== '';

const createCmpById = (productIdStr) => ({ id }) => id === Number(productIdStr);

const removeEmptyProps = (obj) => Object.entries(obj).reduce((prevResult, [key, value]) => {
  if (value !== undefined && value !== null) {
    prevResult[key] = value;
  }

  return prevResult;
}, {});

module.exports = {
  createId,
  isValidProductData,
  createCmpById,
  removeEmptyProps,
};
