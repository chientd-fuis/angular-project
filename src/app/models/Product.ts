export interface Product {
    id: number;
    name: string;
    price: number;
    url: string;
    description: string
}

export interface ProductCart extends Product {
    quantity: number;
}
