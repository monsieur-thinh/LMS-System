import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
import ReactPaginate from "react-paginate";

const MyEnrollments = () => {
    const { enrolledCourses, calculateCourseDuration, navigate } =
        useContext(AppContext);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6; // Số item mỗi trang

    const offset = currentPage * itemsPerPage;
    const currentItems = enrolledCourses.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(enrolledCourses.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

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
                            {currentItems.map((course, index) => {
                                const progressIndex = offset + index;
                                const progress = progressArray[
                                    progressIndex
                                ] || {
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
                                    <tr
                                        key={course._id || index}
                                        className="border-t cursor-pointer hover:bg-blue-50 transition"
                                        onClick={() =>
                                            navigate("/player/" + course._id)
                                        }
                                    >
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
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                } // Ngăn không cho click button cũng navigate
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                                                    isCompleted
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-blue-100 text-blue-700"
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

                    {/* Pagination */}
                    {pageCount > 1 && (
                        <div className="flex justify-center mt-6">
                            <ReactPaginate
                                previousLabel={"←"}
                                nextLabel={"→"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={2}
                                onPageChange={handlePageClick}
                                containerClassName={
                                    "flex items-center space-x-2 text-sm"
                                }
                                pageClassName={
                                    "px-3 py-1 border rounded text-gray-700"
                                }
                                activeClassName={"bg-blue-500 text-white"}
                                previousClassName={"px-2 py-1 text-gray-600"}
                                nextClassName={"px-2 py-1 text-gray-600"}
                                breakClassName={"px-2 py-1 text-gray-500"}
                                forcePage={currentPage}
                            />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyEnrollments;
