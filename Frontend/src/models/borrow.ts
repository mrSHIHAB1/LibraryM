import type { Book } from "./book";

export interface Borrow {
  _id: string;
  book: Book | string;    // can be Book object or just book ID string
  quantity: number;
  dueDate: string;        // ISO date string
  createdAt: string;
  updatedAt: string;
}

// src/models/borrow.ts

export interface BorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}
