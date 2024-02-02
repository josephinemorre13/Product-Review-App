interface ApiResponse {
    // Define the structure of your API response
    data: any;
    // Add other relevant properties as needed
}

const fetchProducts = async (): Promise<ApiResponse | any> => {
    try {
        // Fetch data from an API endpoint
        const response = await fetch(
            "https://5ffbed0e63ea2f0017bdb67d.mockapi.io/categories"
        );
        const data = await response.json();

        const products: any[] = [];
        data.map((categories: any) => {
            const category = categories.name;
            categories.products.forEach((product: any) => {
                product.category = category;
                products.push(product);
            });
        });
        products.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
        });

        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export { fetchProducts };
