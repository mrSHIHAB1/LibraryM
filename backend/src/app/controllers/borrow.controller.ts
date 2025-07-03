import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';

export const borrowroutes = express.Router();

borrowroutes.post('/', async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;


    if (!book || !quantity || quantity <= 0) {
      res.status(400).json({
        success: false,
        message: 'Invalid input',
      });
      return
    }


    if (!mongoose.Types.ObjectId.isValid(book)) {
      res.status(400).json({
        success: false,
        message: 'Invalid book ID',
      });
      return
    }


    const foundBook = await Book.findById(book);
    if (!foundBook) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
      return
    }


    if (foundBook.copies < quantity) {
      res.status(400).json({
        success: false,
        message: `Only ${foundBook.copies} copies available`,
      });
      return
    }


    await foundBook.reduceCopies(quantity);


    const borrow = await Borrow.create({
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

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
});

borrowroutes.get('/', async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
});
