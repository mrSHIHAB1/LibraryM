// src/models/book.ts

export interface Book {
  _id: string;          // MongoDB ObjectId as string
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: string;    // ISO date string
  updatedAt: string;    // ISO date string
}
