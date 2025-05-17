import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { useAppContext } from "../../../context/AppContext";
import PropTypes from "prop-types";
import "./CourseHoverPanel.scss";

CourseHoverPanel.propTypes = {
    course: PropTypes.shape({
        courseTitle: PropTypes.string.isRequired,
    }).isRequired,
};

function CourseHoverPanel({ course, showLeft }) {
    const {
        calculateNumOfLecture,
        calculateCourseDuration,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    } = useAppContext();

    const favorite = isFavorite(course._id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(course._id);
        } else {
            addToFavorites(course);
        }
    }

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

                <div className="flex items-center justify-between mt-6 group-btn">
                    <button className="bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-blue-700 transition shadow-sm">
                        Add to cart
                    </button>
                    <button
                        onClick={onFavoriteClick}
                        className={`favorite-btn ${favorite ? "active" : ""}`}
                    >
                        <FaRegHeart className="heart-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CourseHoverPanel;
