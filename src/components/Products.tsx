import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import StarIcon from '@mui/icons-material/Star';

interface ApiResponse {
    // Define the structure of your API response
    data: any;
    // Add other relevant properties as needed
}

interface MediaProps {
    loading?: boolean;
}

const columns = 4;

function Media(props: MediaProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [productsData, setProductsData] = useState<ApiResponse | any>([]);

    console.log("%c Media -> productsData ", "font-size:16px;background-color:#dbf4b4;color:black;", productsData)

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const result = await fetchProducts();
                setProductsData(result);
                setLoading(false)
            } catch (error) {
                // Handle error
            }
        };

        fetchDataAsync();
    }, []);

    return (
        <Grid container spacing={2}>
            {(loading ? Array.from(new Array(columns)) : productsData).map((item: any, index: any) => (
                <Grid item key={index}>
                    <Box key={index} sx={{ width: 420, marginBottom: 2, flex: 1 / columns }}>
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
    );
}

export default function Products() {
    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Media loading />
            <Media />
        </Box>
    );
}