import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';

export const bookroutes = express.Router();
export const borrowroutes = express.Router();

bookroutes.post('/', async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);

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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      error,
    });
  }
});



bookroutes.get('/', async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;

    const filterObj: any = {};
    if (filter && typeof filter === 'string') {
      filterObj.genre = filter.toUpperCase();
    }

    const sortOrder = sort === 'desc' ? -1 : 1;

    const books = await Book.find(filterObj)
      .sort({ [sortBy as string]: sortOrder })
      .limit(parseInt(limit as string));

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch books',
      error,
    });
  }
});

bookroutes.get('/:bookId', async (req: Request, res: Response) => {

  const bookId = req.params.bookId
  const book = await Book.findById(bookId);

  res.status(200).json({
    success: true,
    message: 'Book retrieved successfully',
    data: book,
  });


});

bookroutes.delete('/:bookId', async (req: Request, res: Response) => {

  const bookId = req.params.bookId
  const book = await Book.findByIdAndDelete(bookId);

  res.status(200).json({
    success: true,
    message: 'Book deleted successfully',
    data: null,
  });

});


bookroutes.put('/:bookId', async (req: Request, res: Response) => {

  const bookId = req.params.bookId;
  const updateData = req.body;

  const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
    new: true,
    runValidators: true,
  });



  res.status(200).json({
    success: true,
    message: 'Book updated successfully',
    data: updatedBook,
  });

});
