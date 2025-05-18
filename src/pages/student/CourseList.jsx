import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";
import ReactPaginate from "react-paginate";
import CourseFilterSidebar from "../../components/student/CourseFilterSidebar";
import { generateFilterCounts } from "../../utils/GenerateFilterCounts";

const CourseList = () => {
    const { navigate, allCourses } = useContext(AppContext);
    const { input } = useParams();

    const [filterCourse, setFilterCourse] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;

    const filterCounts = generateFilterCounts(allCourses);

    // ⚙️ Các filter được chọn
    const [selectedFilters, setSelectedFilters] = useState({
        level: [],
        price: [],
        duration: [],
        rating: [],
    });

    // 🧠 Xử lý khi thay đổi filter checkbox
    const handleFilterChange = (category, value) => {
        setSelectedFilters((prev) => {
            const current = prev[category];
            const updated = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value];
            return { ...prev, [category]: updated };
        });
    };

    //Lọc dữ liệu khi course hoặc filter thay đổi
    useEffect(() => {
        if (!allCourses || allCourses.length === 0) return;

        let filtered = [...allCourses];

        //Lọc theo input từ URL
        if (input) {
            filtered = filtered.filter((course) =>
                course.courseTitle.toLowerCase().includes(input.toLowerCase())
            );
        }

        //Lọc theo từng filter
        filtered = filtered.filter((course) => {
            // LEVEL
            if (
                selectedFilters.level.length > 0 &&
                !selectedFilters.level.includes(course.level)
            )
                return false;

            // PRICE
            if (
                selectedFilters.price.length > 0 &&
                !selectedFilters.price.includes(
                    course.price === 0 ? "free" : "paid"
                )
            )
                return false;

            // DURATION
            if (selectedFilters.duration.length > 0) {
                const hours = course.duration;
                const durationMatch = selectedFilters.duration.some((range) => {
                    if (range === "0-2") return hours < 2;
                    if (range === "2-10") return hours >= 2 && hours <= 10;
                    if (range === "10+") return hours > 10;
                    return false;
                });
                if (!durationMatch) return false;
            }

            // RATING
            if (
                selectedFilters.rating.length > 0 &&
                !selectedFilters.rating.some((r) => course.rating >= r)
            )
                return false;

            return true;
        });

        setFilterCourse(filtered);
        setCurrentPage(0); // reset page khi filter thay đổi
    }, [allCourses, input, selectedFilters]);

    const offset = currentPage * itemsPerPage;
    const paginatedCourses = filterCourse.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filterCourse.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
            <div className="relative md:px-36 px-8 pt-20 text-left">
                <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
                    <div>
                        <h1 className="text-4xl font-semibold text-gray-800">
                            Course List
                        </h1>
                        <p className="text-gray-500">
                            <span
                                onClick={() => navigate("/")}
                                className="text-blue-600 cursor-pointer"
                            >
                                Home
                            </span>{" "}
                            / <span>Course List</span>
                        </p>
                    </div>
                    <SearchBar data={input} />
                </div>

                {input && (
                    <div className="inline-flex items-center gap-4 px-4 py-2 border my-8 text-gray-600">
                        <p>{input}</p>
                        <img
                            src={assets.cross_icon}
                            alt="Clear"
                            className="cursor-pointer"
                            onClick={() => navigate("/course-list")}
                        />
                    </div>
                )}

                <div className="flex gap-8 mt-10">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/4">
                        <CourseFilterSidebar
                            selectedFilters={selectedFilters}
                            onChange={handleFilterChange}
                            courses={allCourses}
                            filterCounts={filterCounts}
                        />
                    </div>

                    {/* Course Grid */}
                    <div className="w-full md:w-3/4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {paginatedCourses.map((course, index) => (
                                <CourseCard course={course} key={index} />
                            ))}
                        </div>

                        {pageCount > 1 && (
                            <div className="flex justify-center my-10">
                                <ReactPaginate
                                    previousLabel={"← Prev"}
                                    nextLabel={"Next →"}
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                    containerClassName={"flex gap-2"}
                                    pageClassName={
                                        "border px-3 py-1 rounded text-gray-700 hover:bg-blue-100"
                                    }
                                    activeClassName={"bg-blue-600 text-white"}
                                    previousClassName={
                                        "border px-3 py-1 rounded text-gray-700"
                                    }
                                    nextClassName={
                                        "border px-3 py-1 rounded text-gray-700"
                                    }
                                    disabledClassName={
                                        "opacity-50 cursor-not-allowed"
                                    }
                                    breakLabel={"..."}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default CourseList;
