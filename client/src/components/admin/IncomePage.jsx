import React from 'react';
import AdminLayout from './AdminLayout';
import usePaymentInsights from '../../hooks/usePaymentInsights';
import { setFilters } from '../../redux/slices/adminSlice';
import { useDispatch } from 'react-redux';
import withAuth from './WithAuth';


const IncomePage = () => {
    const dispatch = useDispatch();
    const { insights,filters,chartType,handleChartTypeChange,renderChart } = usePaymentInsights()

    return (
        <AdminLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-semibold mb-4">Income Insights</h1>

                {/* Filters for date/month/year */}
                <div className="filters mb-4">
                    <input
                        type="date"
                        value={filters?.startDate}
                        onChange={(e) => dispatch(setFilters({ ...filters, startDate: e.target.value }))}
                        className="p-2 border rounded"
                    />
                    <input
                        type="date"
                        value={filters?.endDate}
                        onChange={(e) => dispatch(setFilters({ ...filters, endDate: e.target.value }))}
                        className="p-2 border rounded ml-2"
                    />
                    <input
                        type="number"
                        value={filters?.month}
                        onChange={(e) => dispatch(setFilters({ ...filters, month: e.target.value }))}
                        placeholder="Month"
                        className="p-2 border rounded ml-2"
                    />
                    <input
                        type="number"
                        value={filters?.year}
                        onChange={(e) => dispatch(setFilters({ ...filters, year: e.target.value }))}
                        placeholder="Year"
                        className="p-2 border rounded ml-2"
                    />
                </div>

                {/* Chart Type Dropdown */}
                <div className="mb-4">
                    <label htmlFor="chartType" className="mr-2">Select Chart Type:</label>
                    <select
                        id="chartType"
                        value={chartType}
                        onChange={handleChartTypeChange}
                        className="p-2 border rounded"
                    >
                        <option value="bar">Bar</option>
                        <option value="pie">Pie</option>
                        <option value="line">Line</option>
                        <option value="bubble">Bubble</option>
                        <option value="doughnut">Doughnut</option>
                    </select>
                </div>

                {/* Insights */}
                <div className="mb-6">
                    <p><strong>Total Revenue: </strong> ₹{insights?.totalRevenue?.toFixed(2)}</p>
                    <p><strong>Average Payment: </strong> ₹{insights?.averagePayment?.toFixed(2)}</p>
                    <p><strong>Successful Payments: </strong> {insights?.successfulPayments}</p>
                    <p><strong>Failed Payments: </strong> {insights?.failedPayments}</p>
                </div>

                {/* Chart */}
                <div className="chart-container max-w-3xl mx-auto">{renderChart&&renderChart()}</div>
            </div>
        </AdminLayout>
    );
};

export default withAuth(IncomePage,["owner"]);
