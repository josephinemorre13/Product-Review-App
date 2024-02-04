import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsListing from '../components/ProductListing';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsData } from '../services/api';
import { RootState } from '../store/reducers';
import ProductDetails from '../components/ProductDetails';
import SearchBar from '../components/SearchBar';
import CategoriesDropdown from '../components/CategoriesDropdown';

const Products: React.FC = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state: RootState) => state.data);

    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchParams, setSearchParams] = useState<string>('');

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
    }
    
    const handleSearchParamsChange = (params: string) => {
        setSearchParams(params)
    }

    const filteredProducts = selectedCategory === 'All' ?
        (searchParams === '' ? data : data.filter((v: any) => v.name === searchParams)) :
        (searchParams === '' ? data.filter((v: any) => v.category === selectedCategory) : data.filter((v: any) => v.category === selectedCategory && v.name === searchParams))

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                dispatch({ type: 'FETCH_DATA_REQUEST' });
                const result = await fetchProductsData();
                dispatch({ type: 'FETCH_DATA_SUCCESS', payload: result.data });
            } catch (error: any) {
                dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
            }
        };

        fetchDataAsync();
    }, [dispatch]);

    return (
        <div>
            {id ?
                <ProductDetails id={id} data={data} loading={loading} error={error} /> :
                <>
                    <SearchBar products={data} searchParams={searchParams} handleSearchParamsChange={handleSearchParamsChange} />
                    <CategoriesDropdown products={data} handleCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
                    <ProductsListing data={filteredProducts} loading={loading} error={error} />
                </>}
        </div>
    );
};

export default Products;