export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
}

export interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchQuery?: string;
}

export interface NewProduct {
  id?: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  stock: number;
}

export interface ProductState {
  selectedProduct: NewProduct | null;
}