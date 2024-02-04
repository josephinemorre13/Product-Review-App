import { Box, Container, Skeleton } from "@mui/material";
import Details from "./Details";
import Image from "./Image";

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
        <Container component="section" maxWidth={"lg"}>
            <section className="core">
                <Image imgSrc={product.image} />
                <Details product={product} />
            </section>
        </Container>
    );
}

export default ProductDetails;