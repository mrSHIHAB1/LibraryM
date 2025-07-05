import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../models/book';

export const bookController = createApi({
  reducerPath: 'bookController',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Books'], // Tag defined

  endpoints: (builder) => ({
    getBooks: builder.query<{ data: Book[] }, void>({
      query: () => '/books',
      providesTags: ['Books'], 
    }),

    getBookById: builder.query<{ data: Book }, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Books', id }],  
    }),

    createBook: builder.mutation({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Books'], 
    }),

    updateBook: builder.mutation({
      query: ({ id, ...updatedBook }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: updatedBook,
      }),
      invalidatesTags: ['Books'], 
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'], 
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookController;
