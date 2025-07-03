export interface IBook {
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

// export interface UserInstanceMethods{
//   getquantity(quantity:number):Promise<void>;
// }
export interface BookInstanceMethods {
  reduceCopies(quantity: number): Promise<void>;
}
