import React from 'react';
import { useParams } from 'react-router-dom';
import ProductsComponent from '../components/ProductListing';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsData } from '../services/api';
import { RootState } from '../store/reducers';
import ProductDetails from '../components/ProductDetails';

const Products: React.FC = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state: RootState) => state.data);
    
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
                <ProductsComponent data={data} loading={loading} error={error} />}
        </div>
    );
};

export default Products;