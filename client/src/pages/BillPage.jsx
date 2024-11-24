import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../redux/slices/orderSlice";
import useGetQuery from "../hooks/useGetQuery";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Header from "../components/bill/Header";
import OrderDetails from "../components/bill/OrderDetails";
import ItemList from "../components/bill/ItemList";
import BillingSummary from "../components/bill/BillingSummary";
import Footer from "../components/bill/Footer";
import Layout from "../components/Layout/Layout";


const BillPage = () => {
  const billRef = useRef();
  const { orderDetails } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const getQueryParam = useGetQuery();
  const orderId = getQueryParam('orderId');

  useEffect(() => {
    if (orderId && Object.keys(orderDetails).length === 0) {
      dispatch(fetchOrderDetails(orderId))
    }
  }, [dispatch, orderDetails, orderId]);

  if (!orderDetails) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg font-semibold">No bill details available.</p>
      </div>
    );
  }

  const exportPDF = async () => {
    const element = billRef.current;

    // Convert HTML to canvas
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // Initialize jsPDF
    const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, A4 size

    // Add the image to the PDF
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save(`Order_Bill_${orderId}.pdf`);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 border border-gray-300 shadow-lg rounded-lg bg-white">
        <div ref={billRef}>
          <Header />
          <OrderDetails orderDetails={orderDetails} />
          <ItemList orderDetails={orderDetails} />
          <BillingSummary orderDetails={orderDetails} />
          <Footer orderDetails={orderDetails} />
        </div>

        <button
          onClick={exportPDF}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow"
        >
          Download as PDF
        </button>
      </div>
    </Layout>
  );
};

export default BillPage;
