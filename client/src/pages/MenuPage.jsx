import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenu } from '../features/menuSlice';
import MenuItemCard from '../components/MenuItemCard';

const MenuPage = () => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu);

  useEffect(() => {
    if (menu.status === 'idle') {
      dispatch(fetchMenu());
    }
  }, [dispatch, menu.status]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-3 gap-4">
        {menu.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
