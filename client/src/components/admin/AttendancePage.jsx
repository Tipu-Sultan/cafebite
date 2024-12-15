import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import useUserData from "../../hooks/useAuthData";
import { formatIndianTime, isSessionOut } from "../../utils/formatIndianTime";
import AdminLayout from "./AdminLayout";
import withAuth from "./WithAuth";

const AttendancePage = () => {
    const { adminId } = useParams();
    const { storedUser } = useUserData()
    const [admin, setAdmin] = useState(null); // Single admin
    const [attendanceStatus, setAttendanceStatus] = useState(null); // Single admin
    const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
    const [issueReason, setIssueReason] = useState("");
    const dailySalary = 616; // Salary per day
    const attendanceStartTime = "09:00";
    const attendanceEndTime = "09:10";

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = adminId
                    ? await api.get(`/admin/attendance/admins?adminId=${adminId}`)
                    : await api.get("/admin/attendance/admins");
                setAdmin(response.data.user);
            } catch (error) {
                console.error("Error fetching attendance:", error);
            }
        };

        fetchAttendance();
    }, [adminId]);

    const calculateSalary = (attendanceRecords) => {
        let totalSalary = 0;

        attendanceRecords.forEach((record) => {
            if (record.status === "present") {
                totalSalary += dailySalary;
            } else if (record.status === "issue") {
                totalSalary += dailySalary / 2;
            }
        });

        return totalSalary;
    };

    const handleAttendanceUpdate = async (attendanceId, newStatus) => {
        try {
            await api.patch("/admin/attendance/update", {
                adminId: admin._id,
                attendanceId,
                status: newStatus || attendanceStatus,
            });

            setIsIssueModalOpen(false);
            setIssueReason("");
            alert("Attendance updated successfully!");

            // Refresh admin details
            const response = await api.get(`/admin/attendance/admins?adminId=${adminId}`);
            setAdmin(response.data.user);
        } catch (error) {
            console.error("Error updating attendance:", error);
        }
    };

    const isWithinAttendanceTimeframe = () => {
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);
        return currentTime >= attendanceStartTime && currentTime <= attendanceEndTime;
    };

    const handleAttendanceToggle = async (attendanceId, currentStatus) => {
        if (isWithinAttendanceTimeframe()) {
            try {
                const newStatus =
                    currentStatus === "present"
                        ? "absent"
                        : currentStatus === "absent"
                            ? "issue"
                            : "present";

                await api.patch(`/admin/attendance/update`, {
                    adminId: admin._id,
                    attendanceId,
                    status: newStatus,
                });
            } catch (error) {
                console.error("Error updating attendance:", error);
            }
        } else {
            setIsIssueModalOpen(true);
        }
    };

    const handleRaiseIssue = async () => {
        if (!issueReason) {
            alert("Please provide a reason for raising an issue.");
            return;
        }

        try {
            const res = await api.post("/admin/attendance/raise-issue", {
                adminId: admin._id,
                reason: issueReason,
            });

            setIsIssueModalOpen(false);
            setIssueReason("");
            alert(res.data.message);
            const response = await api.get(`/admin/attendance/admins`);
            setAdmin(response.data.user);
        } catch (error) {
            console.error("Error raising issue:", error);
        }
    };



    return (
        <AdminLayout>
            <div className="p-4 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold text-center mb-6">
                    {admin?.userRole === "owner" ? "Manage Attendance for Admins" : "Admin Attendance and Salary"}
                </h1>

                <>
                    <div className="mb-6 bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-bold mb-2">Admin Details</h2>
                        <p><strong>Name:</strong> {admin?.name}</p>
                        <p><strong>Email:</strong> {admin?.email}</p>
                        <p><strong>Role:</strong> {admin?.userRole}</p>
                        <p><strong>Monthly Salary:</strong> ₹{calculateSalary(admin?.attendance)}</p>
                        {
                            storedUser?.userRole === "admin" &&
                            <p className="bg-yellow-100 text-yellow-800 border-l-4 rounded border-yellow-600 p-4 mt-4">
                                <strong>Warning:</strong> Please ensure that you mark your attendance between 9:00 AM and 9:10 AM.
                                After that, you can raise an issue until 12:20 PM. Attendance will not be accepted after the specified time frame.
                                If you miss the window, please contact the admin immediately.
                            </p>
                        }
                        {
                            storedUser?.userRole === "admin" && !isSessionOut() &&
                            <>
                                <p><strong>Mark Attendance:</strong></p>
                                <input
                                    type="checkbox"
                                    onChange={() =>
                                        handleAttendanceToggle()
                                    }
                                    className="cursor-pointer"
                                />

                            </>
                        }
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border border-gray-300 bg-white shadow-md rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 border">Status</th>
                                    <th className="px-4 py-2 border">Reason</th>
                                    <th className="px-4 py-2 border">Create At</th>
                                    <th className="px-4 py-2 border">Updated At</th>
                                    {storedUser?.userRole === "owner" && <th className="px-4 py-2 border">Update Status</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {admin?.attendance?.map((record) => (
                                    <tr key={record._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border">
                                            {new Date(record?.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {record?.status.charAt(0).toUpperCase() + record?.status?.slice(1)}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {record?.raiseIssue || "N/A"}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {formatIndianTime(record?.createdAt) || "N/A"}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {formatIndianTime(record?.updatedAt) || "N/A"}
                                        </td>
                                        {storedUser?.userRole === "owner" && (
                                            <td className="px-4 py-2 border text-center">
                                                <select
                                                    className="border rounded p-1"
                                                    value={attendanceStatus || record?.status}
                                                    onChange={(e) => {
                                                        setAttendanceStatus(e.target.value || record?.status)
                                                        handleAttendanceUpdate(record?._id, e.target.value);
                                                    }}
                                                >
                                                    <option value="present">Present</option>
                                                    <option value="absent">Absent</option>
                                                    <option value="issue">Issue</option>
                                                </select>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>


                {isIssueModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-4 w-1/3">
                            <h2 className="text-xl font-bold mb-4">Provide a Reason for Issue</h2>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows="4"
                                placeholder="Provide a reason for the issue"
                                value={issueReason}
                                onChange={(e) => setIssueReason(e.target.value)}
                            ></textarea>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => setIsIssueModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleRaiseIssue()}
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default withAuth(AttendancePage, ["admin", "owner"]);

