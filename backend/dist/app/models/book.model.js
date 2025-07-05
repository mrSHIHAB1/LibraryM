"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
        type: String,
        required: true,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
    },
    isbn: { type: String, required: true, unique: true },
    description: String,
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});
bookSchema.methods.reduceCopies = function (quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.copies < quantity) {
            throw new Error(`Only ${this.copies} copies available`);
        }
        this.copies -= quantity;
        if (this.copies === 0) {
            this.available = false;
        }
        yield this.save();
    });
};
bookSchema.post('save', function (doc) {
    console.log(`New Book Created: Title: ${doc.title},  ISBN: ${doc.isbn}`);
});
bookSchema.pre('find', function (next) {
    console.log('Book find operation ');
    next();
});
bookSchema.pre('findOneAndUpdate', function (next) {
    console.log('Book updating');
    next();
});
bookSchema.post('findOneAndUpdate', function (doc) {
    console.log(`Book updated: "${doc === null || doc === void 0 ? void 0 : doc.title}"`);
});
bookSchema.pre('findOneAndDelete', function (next) {
    console.log('Book deleting');
    next();
});
bookSchema.post('findOneAndDelete', function (doc) {
    console.log(`Deleted book: "${doc === null || doc === void 0 ? void 0 : doc.title}"`);
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
// export const Book = model<IBook>('Book', bookSchema);
