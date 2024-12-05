import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    //usuario
    user: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    products: [
      {
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
    //status de entrega
    status: {
      type: String,
      required: true,
    },
  },
  //atualização
  {
    timestamps: true,
  },
);

export default mongoose.model('Order.js', OrderSchema);
