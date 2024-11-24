// src/pages/Admin/AddItem.js
import React from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import useItemForm from '../../hooks/useItemForm';
import FormInput from './components/FormInput';
import withAuth from './WithAuth';


const AddItem = () => {
  const { id } = useParams();
  const { formData, handleChange, handleSubmit } = useItemForm(id);

  const { 
    name,
    description,
    price,
    inventoryCount,
    quality,
    discount,
    itemImage,
    foodType,
    category,
    foodSizeOrWeight,
  } = formData;

  return (
    <AdminLayout>
      <div className="bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">{id ? "Update Item" : "Add New Item"}</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
          <FormInput label="Item Name" name="name" value={name} onChange={handleChange} />
          <FormInput label="Description" name="description" type="textarea" value={description} onChange={handleChange} />
          <FormInput label="Price" name="price" type="number" value={price} onChange={handleChange} />
          <FormInput label="Inventory Count" name="inventoryCount" type="number" value={inventoryCount} onChange={handleChange} />
          
          <FormInput 
            label="Quality" 
            name="quality" 
            type="select" 
            value={quality} 
            onChange={handleChange} 
            options={['Low', 'Medium', 'High']} 
          />
          
          <FormInput label="Discount (%)" name="discount" type="number" value={discount} onChange={handleChange} />
          <FormInput label="Item Image URL" name="itemImage" value={itemImage} onChange={handleChange} />
          <FormInput label="Food Type" name="foodType" value={foodType} onChange={handleChange} />
          <FormInput label="Category" name="category" value={category} onChange={handleChange} />
          <FormInput label="Food Size or Weight" name="foodSizeOrWeight" value={foodSizeOrWeight} onChange={handleChange} />
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {id ? "Update Item" : "Add Item"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default withAuth(AddItem);

