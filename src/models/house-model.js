const { Schema, Types, model } = require('mongoose');
const yup = require('yup');

const houseShema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

const houseValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('house.title must be a string')
    .required('house.title is required'),
  description: yup
    .string().typeError('house.description must be a string')
    .required('house.description is required'),
  categoryId: yup
  .string().typeError('house.categoryId must be a string')
  .test(
    'is-mongo-object-id',
    'house.categoryId must be valid MongoDB object Id',
    Types.ObjectId.isValid
  )
  .required('house.categoryId is required'),
  images: yup.array(yup.string().typeError('house.img must be a string')),
  price: yup
    .number().typeError('house.price must be a number')
    .required('house.price is required')
    .positive('house.price must be positive')
});

const houseUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('house.title must be a string'),
  description: yup.string().typeError('house.description must be a string'),
  categoryId: yup.string().typeError('house.categoryId must be a string'),
  images: yup.array(yup.string().typeError('house.img must be a string')),
  price: yup.number()
    .typeError('house.price must be a number')
    .positive('house.price must be positive'),
});

houseShema.statics.validateData = (houseData) => houseValidationSchema.validate(houseData)
houseShema.statics.validateUpdateData = (houseData) => houseUpdateValidationSchema.validate(houseData)

const HouseModel = model('house', houseShema);

module.exports = HouseModel;
