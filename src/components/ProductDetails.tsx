import { Box, Skeleton } from "@mui/material";

interface ProductDetailsProps {
    id: string;
    data: any;
    loading: boolean;
    error: any
}

const ProductDetails: React.FC<ProductDetailsProps> = (props) => {
    const { id, data, loading, error } = props;

    const product = data && data.length ? data.find((v: any) => v.id === id) : null;
    console.log("🚀 ~ product:", product)

    if (error) return <p>Error: {error}</p>

    if (loading || !product) {
        return (
            <div>
                <Skeleton variant="rectangular" height={400} width={500} />
                <Skeleton height={100} width={500} />
                <Skeleton height={200} width={500} />
            </div>
        );
    }

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.details}</p>
            <p>{product.createdAt}</p>
        </div>
    );
}

export default ProductDetails;