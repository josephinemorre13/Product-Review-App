import Grid from '@mui/material/Grid';
import { Box, Typography, Skeleton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";

interface ProductListingProps {
    data: any;
    loading: boolean;
    error: any
}

const columns = 4;

const ProductListing: React.FC<ProductListingProps> = (props) => {
    const { data, loading, error } = props;
    const navigate = useNavigate();

    const handleProductClick = (productId: number) => {
        navigate('/product/' + productId);
    };

    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Grid container spacing={2}>
                {error && <p>Error: {error}</p>}
                {((loading || data === null) ? Array.from(new Array(columns * 2)) : data).map((item: any, index: any) => (
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
                                    <Typography variant="caption" color="text.secondary">
                                        <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                                    </Typography>
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