import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BorrowSummary } from '../models/borrow';


export const borrowController = createApi({
  reducerPath: 'borrowController',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Borrow', 'Books'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: '/borrow',
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Borrow', 'Books'],
    }),
  getBorrowSummary: builder.query<{ data: BorrowSummary[] }, void>({
  query: () => '/borrow',
  providesTags: ['Borrow'],
}),

  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowController;
