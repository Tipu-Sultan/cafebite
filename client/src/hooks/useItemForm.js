// src/hooks/useItemForm.js
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewItem, updateItem, updateFormData, fetchItemDetails, clearFormData } from '../redux/slices/adminSlice';
import { useNavigate } from 'react-router-dom';

const useItemForm = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formData, items } = useSelector((state) => state.admin);


  useEffect(() => {
    // Ensure the item is fetched when the page is refreshed or when `id` changes
    if (id) {
      const existingItem = items.find(item => item._id === id);
      if (existingItem) {
        dispatch(updateFormData(existingItem));  // Populating formData in Redux
      } else{
        dispatch(fetchItemDetails(id));
      }
    }
  }, [id, items, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).every(value => value)) {
      try {
        if (id) {
          const response = await dispatch(updateItem({ id, formData: formData })).unwrap();
          alert(response.message);
          navigate('/admin/all-items');
        } else {
          const response = await dispatch(addNewItem(formData)).unwrap();
          alert(response.message);
          navigate('/admin/all-items');
        }
      } catch (error) {
        alert(`Error: ${error.message || error}`);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return { formData,handleChange, handleSubmit };
};

export default useItemForm;
