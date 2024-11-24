// hooks/usePaymentInsights.js
import { useState, useEffect } from 'react';
import { Bar, Bubble, Doughnut, Line, Pie } from 'react-chartjs-2';
import {  useSelector } from 'react-redux';

import {
    Chart as ChartJS,
    BarElement,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import useFetchData from './useFetchData';

ChartJS.register(
    BarElement,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend
);


const usePaymentInsights = () => {
    const {insights} = useFetchData();
    const {filters,loading, error } = useSelector((state) => state.admin); // Add loading and error to handle state

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Revenue by Payment Method',
                data: [],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',   // Color for first data point
                    'rgba(153, 102, 255, 0.2)',   // Color for second data point
                    'rgba(255, 159, 64, 0.2)',     // Color for third data point
                    'rgba(255, 99, 132, 0.2)',     // Color for fourth data point
                    'rgba(54, 162, 235, 0.2)',     // Color for fifth data point
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',    // Border color for first data point
                    'rgba(153, 102, 255, 1)',    // Border color for second data point
                    'rgba(255, 159, 64, 1)',      // Border color for third data point
                    'rgba(255, 99, 132, 1)',      // Border color for fourth data point
                    'rgba(54, 162, 235, 1)',      // Border color for fifth data point
                ],
                borderWidth: 1,
            },
        ],
    });

    const [chartType, setChartType] = useState('bar'); // Default chart type is Bar

    useEffect(() => {
        // Once insights are fetched and available, update chart data
        if (insights && insights.paymentMethodDistribution) {
            const paymentMethodDistribution = insights.paymentMethodDistribution;
            const labels = Object.keys(paymentMethodDistribution);
            const data = Object.values(paymentMethodDistribution);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Revenue by Payment Method',
                        data: data,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',   // Color for first data point
                            'rgba(153, 102, 255, 0.2)',   // Color for second data point
                            'rgba(255, 159, 64, 0.2)',     // Color for third data point
                            'rgba(255, 99, 132, 0.2)',     // Color for fourth data point
                            'rgba(54, 162, 235, 0.2)',     // Color for fifth data point
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',    // Border color for first data point
                            'rgba(153, 102, 255, 1)',    // Border color for second data point
                            'rgba(255, 159, 64, 1)',      // Border color for third data point
                            'rgba(255, 99, 132, 1)',      // Border color for fourth data point
                            'rgba(54, 162, 235, 1)',      // Border color for fifth data point
                        ],
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [insights]);

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value); // Update chart type when user selects a new one
    };

    if (loading) return <div>Loading...</div>; // Handle loading state
    if (error) return <div>Error: {error}</div>; // Handle error state

    // Render the appropriate chart based on the selected chart type
    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />;
            case 'pie':
                return <Pie data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />;
            case 'line':
                return <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />;
            case 'doughnut':
                return <Doughnut data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />;
            case 'bubble':
                return <Bubble data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />;
            default:
                return <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />;
        }
    };

    return {
        filters,
        insights,
        chartType,
        handleChartTypeChange,
        renderChart,
    };
};

export default usePaymentInsights;
