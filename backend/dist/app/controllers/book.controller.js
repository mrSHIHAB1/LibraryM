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
exports.borrowroutes = exports.bookroutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookroutes = express_1.default.Router();
exports.borrowroutes = express_1.default.Router();
exports.bookroutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: {
                _id: book._id,
                title: book.title,
                author: book.author,
                genre: book.genre,
                isbn: book.isbn,
                description: book.description,
                copies: book.copies,
                available: book.available,
                createdAt: book.createdAt,
                updatedAt: book.updatedAt,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            error,
        });
    }
}));
exports.bookroutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
        const filterObj = {};
        if (filter && typeof filter === 'string') {
            filterObj.genre = filter.toUpperCase();
        }
        const sortOrder = sort === 'desc' ? -1 : 1;
        const books = yield book_model_1.Book.find(filterObj)
            .sort({ [sortBy]: sortOrder })
            .limit(parseInt(limit));
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch books',
            error,
        });
    }
}));
exports.bookroutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield book_model_1.Book.findById(bookId);
    res.status(200).json({
        success: true,
        message: 'Book retrieved successfully',
        data: book,
    });
}));
exports.bookroutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield book_model_1.Book.findByIdAndDelete(bookId);
    res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
        data: null,
    });
}));
exports.bookroutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updateData = req.body;
    const updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, updateData, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        data: updatedBook,
    });
}));
