interface ApiResponse {
    // Define the structure of your API response
    data: any;
    // Add other relevant properties as needed
}

const fetchCategories = async (url: string): Promise<ApiResponse | any> => {
    const response = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
    });
    return await response.json();
};

const fetchProducts = async (url: string): Promise<ApiResponse | any> => {
    const response = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
    });
    return await response.json();
};

const fetchReviews = async (): Promise<ApiResponse | any> => {
    const response = await fetch(
        "https://5ffbed0e63ea2f0017bdb67d.mockapi.io/reviews",
        {
            method: "GET",
            headers: { "content-type": "application/json" },
        }
    );
    return await response.json();
};

const fetchData = async (): Promise<ApiResponse | any> => {
    try {
        let products = await fetchProducts(
            "https://5ffbed0e63ea2f0017bdb67d.mockapi.io/products?sortBy=createdAt&order=desc"
        );
        const categories = await fetchCategories(
            "https://5ffbed0e63ea2f0017bdb67d.mockapi.io/categories?sortBy=name"
        );

        products = products.map((product: any) => {
            const category = categories.find(
                (v: any) => v.id === product.categoryId
            );
            product.category = category ? category.name : "";
            return product;
        });

        return {
            products: products,
            categories: ["All", ...categories.map((v: any) => v.name)],
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

        products = products.map((product: any) => {
            const category = categories.find(
                (v: any) => v.id === product.categoryId
            );
            product.category = category ? category.name : "";
            return product;
        });

        return {
            categories: ["All", ...categories.map((v: any) => v.name)],
            products:
                selectedCategory === "All"
                    ? products
                    : products.filter(
                          (v: any) => v.category === selectedCategory
                      ),
        };
    } catch (error) {
        console.error("Error fetching products with serach params:", error);
        throw error;
    }
};

export { fetchData, fetchProductsWithSearchParamsAndByCategory };
