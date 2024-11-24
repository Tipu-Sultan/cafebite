import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Bill from './pages/BillPage';
import AdminLogin from './components/admin/Login';
import AdminDashboard from './components/admin/Dashboard';
import AddItem from './components/admin/AddItem';
import CheckoutPage from './pages/Checkout';
import AllItems from './components/admin/AllItems';
import Cart from './pages/Cart';
import IncomePage from './components/admin/IncomePage';
import ConfirmedOrder from './components/admin/ConfirmedOrder';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Register from './components/admin/Register';
import Unauthorized from './components/admin/components/Unauthorized';
import ProfilePage from './components/admin/ProfilePage';
import AttendancePage from './components/admin/AttendancePage';
import UserList from './components/admin/UserList';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/item/details/:itemId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<CheckoutPage />} />
        <Route path="/cart/checkout/bill" element={<Bill />} />

        <Route path="/not-authorized" element={<Unauthorized />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/owner/users" element={<UserList />} />
        <Route path="/admin/attendance" element={<AttendancePage />} />
        <Route path="/admin/attendance/:adminId" element={<AttendancePage />} />
        <Route path="/admin/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/all-items" element={<AllItems />} />
        <Route path="/admin/add-item" element={<AddItem />} />
        <Route path="/admin/all-items/update-item/:id" element={<AddItem />} />
        <Route path="/admin/income" element={<IncomePage />} />
        <Route path="/admin/orders" element={<ConfirmedOrder />} />
        {/* <Route path="/admin/take-order" element={<TakeOrder />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
