import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsListing from '../components/ProductListing';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, fetchProductsWithSearchParamsAndByCategory } from '../services/api';
import Product from '../components/Product';
import SearchBar from '../components/SearchBar';
import CategoriesDropdown from '../components/CategoriesDropdown';

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

    const mapRatings = (reviews: any) => {
        return reviews.map((rate: any) => {
            const ratingValue = typeof rate.rating === 'string' ? parseInt(rate.rating, 10) : rate.rating;
            const firstDigit = Math.floor(Math.abs(ratingValue) / Math.pow(10, Math.floor(Math.log10(Math.abs(ratingValue)))));
            const mappedRating = (firstDigit >= 0 && firstDigit <= 5) ? 1 : 5;

            return {
                ...rate,
                mappedRating,
            };
        });
    }

    const calculateAverageRating = (reviews: any) => {
        const mappedRatings = mapRatings(reviews);
        const totalMappedRating = mappedRatings.reduce((accumulator: number, rate: any) => {
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
                        categories: result.categories
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
                    <SearchBar searchParams={searchParams} handleSearchParamsChange={handleSearchParamsChange} handleKeyPressInSearchBar={handleKeyPressInSearchBar} />
                    <CategoriesDropdown handleCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
                    <ProductsListing calculateAverageRating={calculateAverageRating} />
                </>}
        </div>
    );
};

export default Products;