import React, { useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";

const CourseHoverPanel = ({ course, showLeft }) => {
    const { calculateNumOfLecture, calculateCourseDuration } =
        useContext(AppContext);

    return (
        <div
            className={`absolute -top-9 ${
                showLeft ? "right-full mr-4" : "left-full ml-4"
            } w-96 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-20`}
        >
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xl flex flex-col justify-between space-y-4">
                <div>
                    <h4 className="flex justify-center font-bold text-xl text-gray-900 mb-3">
                        {course.courseTitle}
                    </h4>

                    <div className="text-sm text-gray-500 mb-4 flex flex-wrap justify-center items-center gap-x-2">
                        <p>{calculateCourseDuration(course)}</p>
                        <span>•</span>
                        <p>{calculateNumOfLecture(course)} lessons</p>
                        <span>•</span>
                        <p>{course.level}</p>
                    </div>

                    <p
                        className="text-sm text-gray-700 mb-4 leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: course.courseDescription.slice(0, 200),
                        }}
                    ></p>

                    {/* Danh sách cải tiến */}
                    <ul className="pt-3 pr-4 text-sm md:text-base list-disc text-gray-600 space-y-1 text-right">
                        <li>Lifetime access with free updates coupon.</li>
                        <li>Step-by-step, hands-on project guidance.</li>
                        <li>Downloadable resources and source code.</li>
                    </ul>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <button className="bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-blue-700 transition shadow-sm">
                        Add to cart
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full hover:text-red-500 hover:border-red-500 transition">
                        <FaRegHeart className="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseHoverPanel;
