import mongoose, { Schema, model } from 'mongoose';
import { IBorrow } from '../interfaces/borrow.interface';


const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

borrowSchema.pre('save', function (next) {
  console.log(`Borrowing book: ${this.book}`);
  next();
});


borrowSchema.post('save', function (doc) {
  console.log(`Book borrowed successfully:Book ID: ${doc.book},Quantity: ${doc.quantity}`);
});

export const Borrow = model<IBorrow>('Borrow', borrowSchema);
