import { AppProduct } from './app-product';
export interface AppCart {
    product: AppProduct;
    quantity: number;
    id: string;
}