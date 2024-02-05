export interface ProductInteface {
    id: string;
    categoryId: string;
    createdAt: Date;
    name: string;
    image: string;
    price: string;
    currency: string;
    details: string;
    category?: string;
    reviews: ReviewInteface[];
}

export interface CategoryInteface {
    id: string;
    name: string;
    createdAt: Date;
    products: ProductInteface[]
}

export interface ReviewInteface {
    id: string;
    name: string;
    createdAt: Date;
    avatar: string;
    email: string,
    title: string;
    content: string;
    verified: boolean;
    productId: string;
    likes: number;
    rating: number | string;
}