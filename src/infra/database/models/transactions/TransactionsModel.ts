import { Schema, model } from 'mongoose';

const transactionSchema = new Schema<any>({
  pixKey: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['CONFIRMED', 'SAVED', 'REJECTED', 'PROCESSING', 'LIQUIDED'],
    required: true,
  },
  qrcodeLocation: {
    type: String,
    required: true,
  },
  emv: {
    type: String,
    required: true,
  },
  transaction_uuid: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  clientID: { 
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  tags: {
    type: [String],
    default: undefined,
  },
  description: {
    type: String,
    default: undefined,
  },
});

export const TransactionModel = model('transactions', transactionSchema);
