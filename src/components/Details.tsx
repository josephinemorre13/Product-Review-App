import { Box, Divider, Rating, Typography } from "@mui/material";
import React from "react";
import StarIcon from '@mui/icons-material/Star';
import { ReviewInteface } from "../store/types";

type ProductDetails = {
    name: string;
    createdAt: Date;
    details: string;
    category: string;
    currency: string;
    price: string;
    reviews: ReviewInteface[]
}

interface DetailsProps {
    product: ProductDetails;
    calculateAverageRating: any;
}

const Details: React.FC<DetailsProps> = (props) => {
    const { product, calculateAverageRating } = props;
    const { name, createdAt, details, category, currency, price, reviews } = product;

    return (
        <section className="description">
            <Typography variant="h1" gutterBottom>
                {name}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50
                }}
            >
                <Rating
                    name="read-only"
                    value={reviews.length === 0 ? 0 : calculateAverageRating(reviews)}
                    precision={0.2}
                    readOnly
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <Box sx={{ marginLeft: 1 }}>{reviews.length === 0 ? 'No ratings yet' : calculateAverageRating(reviews) + ' ratings'}</Box>
            </Box>
            <Typography variant="subtitle2" gutterBottom>
                Category: {category ? category : 'No category'}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Date created: {new Date(createdAt).toLocaleDateString()}
            </Typography>
            <Divider variant="middle" />
            <Typography variant="h4" gutterBottom>
                Price: {currency} {price}
            </Typography>
            <Typography variant="body2" gutterBottom>
                {details}
            </Typography>
        </section>
    );
};

export default Details;