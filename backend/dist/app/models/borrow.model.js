"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            return ret;
        },
    },
});
borrowSchema.pre('save', function (next) {
    console.log(`Borrowing book: ${this.book}`);
    next();
});
borrowSchema.post('save', function (doc) {
    console.log(`Book borrowed successfully:Book ID: ${doc.book},Quantity: ${doc.quantity}`);
});
exports.Borrow = (0, mongoose_1.model)('Borrow', borrowSchema);
