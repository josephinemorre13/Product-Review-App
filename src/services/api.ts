import { CategoryInteface, ProductInteface, ReviewInteface } from "../store/types";

interface ApiResponse {
    // Define the structure of your API response
    data: any;
    // Add other relevant properties as needed
}

const fetchCategories = async (url: string): Promise<CategoryInteface[]> => {
    const response = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
    });
    return await response.json();
};

const fetchProducts = async (url: string): Promise<ProductInteface[]> => {
    const response = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
    });
    return await response.json();
};

const fetchReviews = async (): Promise<ReviewInteface[]> => {
    const response = await fetch(
        "https://5ffbed0e63ea2f0017bdb67d.mockapi.io/reviews",
        {
            method: "GET",
            headers: { "content-type": "application/json" },
        }
    );
    return await response.json();
};

const fetchData = async (): Promise<any> => {
    try {
        let products = await fetchProducts(
            "https://5ffbed0e63ea2f0017bdb67d.mockapi.io/products?sortBy=createdAt&order=desc"
        );
        const categories = await fetchCategories(
            "https://5ffbed0e63ea2f0017bdb67d.mockapi.io/categories?sortBy=name"
        );

        products = products.map((product: ProductInteface) => {
            const category = categories.find(
                (v: any) => v.id === product.categoryId
            );
            product.category = category ? category.name : "";
            return product;
        });

        return {
            products: products,
            categories: ["All", ...categories.map((v: CategoryInteface) => v.name)],
            reviews: (await fetchReviews())
                .slice()
                .sort((a: any, b: any) => b.id - a.id),
        };
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

const fetchProductsWithSearchParamsAndByCategory = async (
    searchParams: string,
    selectedCategory: string
): Promise<ApiResponse | any> => {
    try {
        const categories = await fetchCategories(
            "https://5ffbed0e63ea2f0017bdb67d.mockapi.io/categories?sortBy=name"
        );
        let products = await fetchProducts(
            `https://5ffbed0e63ea2f0017bdb67d.mockapi.io/products?search=${searchParams}&sortBy=createdAt&order=desc`
        );

        products = products.map((product: ProductInteface) => {
            const category = categories.find(
                (v: any) => v.id === product.categoryId
            );
            product.category = category ? category.name : "";
            return product;
        });

        return {
            categories: ["All", ...categories.map((v: CategoryInteface) => v.name)],
            products:
                selectedCategory === "All"
                    ? products
                    : products.filter(
                          (v: ProductInteface) => v.category === selectedCategory
                      ),
        };
    } catch (error) {
        console.error("Error fetching products with serach params:", error);
        throw error;
    }
};

const createReview = async (review: ReviewInteface): Promise<ReviewInteface> => {
    const response = await fetch(
        "https://5ffbed0e63ea2f0017bdb67d.mockapi.io/reviews",
        {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(review),
        }
    );
    return await response.json();
};

const updateReview = async (
    reviewId: string,
    updatedReview: ReviewInteface
): Promise<ReviewInteface> => {
    const response = await fetch(
        "https://5ffbed0e63ea2f0017bdb67d.mockapi.io/reviews/" + reviewId,
        {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedReview),
        }
    );
    return await response.json();
};

const deleteReview = async (reviewId: string): Promise<ReviewInteface> => {
    const response = await fetch(
        "https://5ffbed0e63ea2f0017bdb67d.mockapi.io/reviews/" + reviewId,
        {
            method: "DELETE",
        }
    );
    return await response.json();
};

export {
    fetchData,
    fetchProductsWithSearchParamsAndByCategory,
    createReview,
    updateReview,
    deleteReview,
};
