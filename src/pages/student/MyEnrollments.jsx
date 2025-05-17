import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";

const MyEnrollments = () => {
    const { enrolledCourses, calculateCourseDuration, navigate } =
        useContext(AppContext);

    const [progressArray] = useState([
        { letureCompleted: 2, totalLectures: 4 },
        { letureCompleted: 1, totalLectures: 5 },
        { letureCompleted: 4, totalLectures: 6 },
        { letureCompleted: 0, totalLectures: 4 },
        { letureCompleted: 3, totalLectures: 3 },
        { letureCompleted: 6, totalLectures: 7 },
        { letureCompleted: 2, totalLectures: 8 },
        { letureCompleted: 4, totalLectures: 6 },
        { letureCompleted: 3, totalLectures: 15 },
        { letureCompleted: 7, totalLectures: 7 },
    ]);

    return (
        <>
            <div className="md:px-36 px-4 pt-10 pb-20 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    My Enrollments
                </h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-blue-100 text-blue-900 text-sm font-semibold">
                            <tr>
                                <th className="px-6 py-4 text-left">Course</th>
                                <th className="px-6 py-4 text-left">
                                    Duration
                                </th>
                                <th className="px-6 py-4 text-left">
                                    Completed
                                </th>
                                <th className="px-6 py-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {enrolledCourses.map((course, index) => {
                                const progress = progressArray[index] || {
                                    letureCompleted: 0,
                                    totalLectures: 1,
                                };
                                const percent =
                                    (progress.letureCompleted * 100) /
                                    progress.totalLectures;
                                const isCompleted =
                                    progress.letureCompleted ===
                                    progress.totalLectures;

                                return (
                                    <tr key={index} className="border-t">
                                        <td className="px-6 py-4 flex items-center space-x-4">
                                            <img
                                                src={course.courseThumbnail}
                                                alt="Course"
                                                className="w-20 h-14 object-cover rounded-md shadow-sm"
                                            />
                                            <div>
                                                <p className="font-medium text-base mb-1">
                                                    {course.courseTitle}
                                                </p>
                                                <Line
                                                    percent={percent}
                                                    strokeWidth={4}
                                                    strokeColor={
                                                        isCompleted
                                                            ? "#22c55e"
                                                            : "#3b82f6"
                                                    }
                                                    trailColor="#e5e7eb"
                                                    className="rounded-full"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {calculateCourseDuration(course)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {`${progress.letureCompleted} / ${progress.totalLectures}`}{" "}
                                            <span className="text-gray-500">
                                                Lectures
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        "/player/" + course._id
                                                    )
                                                }
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                                                    isCompleted
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                }`}
                                            >
                                                {isCompleted
                                                    ? "Completed"
                                                    : "On Going"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyEnrollments;
