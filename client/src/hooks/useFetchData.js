// src/hooks/useItemForm.js
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, fetchPaymentInsights } from '../redux/slices/adminSlice';
import useUserData from './useAuthData';

const useFetchData = () => {
  const dispatch = useDispatch();
  const {storedUser} =  useUserData()
  const { items,insights,filters} = useSelector((state) => state.admin);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchItems());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    try {
        if ((insights.length === 0 || filters) && storedUser.userRole==='owner') {
            dispatch(fetchPaymentInsights(filters));
        }
    } catch (error) {
        console.error('Error fetching payment insights:', error);
    }

}, [dispatch, filters, insights.length, storedUser.userRole]);

  return {items,insights};
};

export default useFetchData;
