
export interface Product {
    category: {id: number, name: string, image: string, creationAt: string, updatedAt: string};
    creationAt: string;
    description: string;
    id: number;
    images: string[];
    price: number;
    title: string;
    updatedAt: string;
}

export interface ProductItemCart {
    product: Product;
    quantity: number;
}