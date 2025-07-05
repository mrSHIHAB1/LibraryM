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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowroutes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
exports.borrowroutes = express_1.default.Router();
exports.borrowroutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        if (!book || !quantity || quantity <= 0) {
            res.status(400).json({
                success: false,
                message: 'Invalid input',
            });
            return;
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(book)) {
            res.status(400).json({
                success: false,
                message: 'Invalid book ID',
            });
            return;
        }
        const foundBook = yield book_model_1.Book.findById(book);
        if (!foundBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
            return;
        }
        if (foundBook.copies < quantity) {
            res.status(400).json({
                success: false,
                message: `Only ${foundBook.copies} copies available`,
            });
            return;
        }
        yield foundBook.reduceCopies(quantity);
        const borrow = yield borrow_model_1.Borrow.create({
            book,
            quantity,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            borrowedAt: new Date(),
        });
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: {
                _id: borrow._id,
                book: borrow.book,
                quantity: borrow.quantity,
                dueDate: borrow.dueDate,
                createdAt: borrow.createdAt,
                updatedAt: borrow.updatedAt,
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
}));
exports.borrowroutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookDetails',
                },
            },
            { $unwind: '$bookDetails' },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookDetails.title',
                        isbn: '$bookDetails.isbn',
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
}));
