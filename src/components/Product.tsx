import { Box, Container, Divider, Skeleton } from "@mui/material";
import Details from "./Details";
import Image from "./Image";
import { RootState } from "../store/reducers";
import { useSelector } from 'react-redux';
import Reviews from "./Reviews";

interface ProductProps {
    id: string;
    calculateAverageRating: any;
    mapRatings: any;
}

const Product: React.FC<ProductProps> = (props) => {
    const { id, calculateAverageRating, mapRatings } = props;
    const { products, loading, error } = useSelector((state: RootState) => state.data);

    const product = products && products.length ? products.find((v: any) => v.id === id) : null;

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
                <Details product={product} calculateAverageRating={calculateAverageRating} />
            </section>
            <Divider variant="middle" />
            <Reviews calculateAverageRating={calculateAverageRating} reviews={product.reviews} mapRatings={mapRatings} />
        </Container>
    );
}

export default Product;