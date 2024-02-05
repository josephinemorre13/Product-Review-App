import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsListing from '../components/ProductListing';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, fetchProductsWithSearchParamsAndByCategory } from '../services/api';
import Product from '../components/Product';
import SearchBar from '../components/SearchBar';
import CategoriesDropdown from '../components/CategoriesDropdown';
import { Box } from '@mui/material';
import { ReviewInteface } from '../store/types';

const Products: React.FC = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchParams, setSearchParams] = useState<string>('');

    const handleFetchDataByCategoryAndSerachParams = async (searchParams: string, selectedCategory: string) => {
        try {
            dispatch({ type: 'FETCH_DATA_REQUEST' });
            const result = await fetchProductsWithSearchParamsAndByCategory(searchParams, selectedCategory);
            dispatch({
                type: 'FETCH_DATA_SUCCESS', payload: {
                    products: result.products,
                    categories: result.categories
                }
            });
        } catch (error: any) {
            dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
        }
    }

    const handleCategoryChange = async (category: string) => {
        await handleFetchDataByCategoryAndSerachParams(searchParams, category)
        setSelectedCategory(category)
    }

    const handleSearchParamsChange = async (params: string) => {
        if (params === '') await handleFetchDataByCategoryAndSerachParams(params, selectedCategory)
        setSearchParams(params)
    }

    const handleKeyPressInSearchBar = async (key: string) => {
        if (key === 'Enter') {
            await handleFetchDataByCategoryAndSerachParams(searchParams, selectedCategory)
        }
    }

    const mapRatings = (reviews: ReviewInteface[]) => {
        return reviews.map((review: ReviewInteface) => {
            const ratingValue = typeof review.rating === 'string' ? parseInt(review.rating, 10) : review.rating;
            const firstDigit = Math.floor(Math.abs(ratingValue) / Math.pow(10, Math.floor(Math.log10(Math.abs(ratingValue)))));
            const mappedRating = (firstDigit >= 0 && firstDigit <= 5) ? 1 : 5;

            return {
                ...review,
                mappedRating,
            };
        });
    }

    const calculateAverageRating = (reviews: ReviewInteface[]) => {
        const mappedRatings = mapRatings(reviews);
        const totalMappedRating = mappedRatings.reduce((accumulator: number, rate: ReviewInteface | any) => {
            return accumulator + rate.mappedRating;
        }, 0);

        return parseFloat((totalMappedRating / reviews.length).toFixed(3));
    }

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                dispatch({ type: 'FETCH_DATA_REQUEST' });
                const result = await fetchData();
                dispatch({
                    type: 'FETCH_DATA_SUCCESS', payload: {
                        products: result.products,
                        categories: result.categories,
                        reviews: result.reviews
                    }
                });
            } catch (error: any) {
                dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
            }
        };

        fetchDataAsync();
    }, [dispatch]);

    return (
        <div>
            {id ?
                <Product id={id} calculateAverageRating={calculateAverageRating} mapRatings={mapRatings} /> :
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, width: '100%', marginLeft: 5 }}>
                        <Box sx={{ width: '500px', margin: 2 }}><SearchBar searchParams={searchParams} handleSearchParamsChange={handleSearchParamsChange} handleKeyPressInSearchBar={handleKeyPressInSearchBar} /></Box>
                        <Box sx={{ width: '500px', margin: 2}}><CategoriesDropdown handleCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} /></Box>
                    </Box>
                    <ProductsListing calculateAverageRating={calculateAverageRating} />
                </>}
        </div>
    );
};

export default Products;