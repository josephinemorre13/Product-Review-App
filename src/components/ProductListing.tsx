import Grid from '@mui/material/Grid';
import { Box, Typography, Skeleton, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { ProductInteface } from '../store/types';

const columns = 4;

interface ProductListingProps {
    calculateAverageRating: any
}

const ProductListing: React.FC<ProductListingProps> = (props) => {
    const { calculateAverageRating } = props;
    const { products, loading, error } = useSelector((state: RootState) => state.data);
    const navigate = useNavigate();

    const handleProductClick = (productId: string) => {
        navigate('/product/' + productId);
    };

    return (
        <Box sx={{ overflow: 'hidden' }} style={{ margin: 20 }}>
            <Grid container spacing={2}>
                {error && <p style={{ margin: '50px' }}>Error: {error}</p>}
                {!error && !loading && products && products.length === 0 && <p style={{ margin: '50px' }}>No products found.</p>}
                {((loading || products === null) ? Array.from(new Array(columns * 2)) : products).map((item: ProductInteface, index: number) => (
                    <Grid item key={index}>
                        <Box key={index} sx={{ width: 420, marginBottom: 2, flex: 1 / columns }} onClick={() => handleProductClick(item.id)}>
                            {item ? (
                                <img style={{ width: 420, height: 236 }} alt={item.name} src={item.image} />
                            ) : (
                                <Skeleton variant="rectangular" width="100%" height={236} />
                            )}
                            {item ? (
                                <Box sx={{ pr: 2 }}>
                                    <Typography gutterBottom variant="body1">
                                        {item.name}
                                    </Typography>
                                    <Typography display="block" variant="caption" color="text.secondary">
                                        Category: {item.category}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Rating
                                            name="read-only"
                                            value={item.reviews.length === 0 ? 0 : calculateAverageRating(item.reviews)}
                                            precision={0.2}
                                            readOnly
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        <Box sx={{ marginLeft: 1 }}>{item.reviews.length === 0 ? 'No reviews yet' : item.reviews.length + ' reviews'}</Box>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{ pt: 0.5 }}>
                                    <Skeleton />
                                    <Skeleton width="60%" />
                                </Box>
                            )}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ProductListing;