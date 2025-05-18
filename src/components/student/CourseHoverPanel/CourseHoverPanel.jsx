import React from "react";
import {
    FaRegHeart,
    FaHeart,
    FaUser,
    FaSignal,
    FaClock,
    FaStar,
} from "react-icons/fa";
import { useAppContext } from "../../../context/AppContext";
import PropTypes from "prop-types";
import "./CourseHoverPanel.scss";

CourseHoverPanel.propTypes = {
    course: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        courseTitle: PropTypes.string.isRequired,
        courseDescription: PropTypes.string,
        level: PropTypes.string,
        duration: PropTypes.string,
        rating: PropTypes.number,
        totalRating: PropTypes.number,
    }).isRequired,
    showLeft: PropTypes.bool,
};

function CourseHoverPanel({ course, showLeft }) {
    const {
        calculateCourseDuration,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        calculateRating,
        currency,
    } = useAppContext();

    const favorite = isFavorite(course._id);

    const onFavoriteClick = (e) => {
        e.preventDefault();
        favorite ? removeFromFavorites(course._id) : addToFavorites(course);
    };

    return (
        <div
            className={`absolute -top-14 ${
                showLeft ? "right-full mr-4" : "left-full ml-4"
            } w-96 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-20`}
        >
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xl flex flex-col justify-between space-y-4">
                {/* Title + Tag */}
                <div>
                    <span className="text-xs font-semibold text-indigo-600 uppercase">
                        Developments
                    </span>
                    <h4 className="font-bold text-xl text-gray-900 mt-1 mb-2">
                        {course.courseTitle}
                    </h4>

                    {/* Instructor + Meta Info */}
                    <p className="text-sm text-gray-600 mb-1">
                        Course by:{" "}
                        <span className="font-semibold">
                            {course.authors?.join(" • ") || "Unknown Author"}
                        </span>
                    </p>
                    <div className="text-sm text-gray-500 flex flex-wrap items-center gap-x-3">
                        <span className="flex items-center gap-1">
                            <FaUser /> {course.enrolledStudents.length}{" "}
                            {course.enrolledStudents.length > 1
                                ? "students"
                                : "student"}
                        </span>
                        <span className="flex items-center gap-1">
                            <FaSignal /> {course.level}
                        </span>
                        <span className="flex items-center gap-1">
                            <FaClock />{" "}
                            {course.duration || calculateCourseDuration(course)}
                        </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mt-2 text-sm text-gray-700 gap-1">
                        <FaStar className="text-orange-500" />
                        <span className="font-semibold">
                            {calculateRating(course)}
                        </span>
                        <span className="text-gray-500">
                            ({course.courseRatings.length}{" "}
                            {course.courseRatings.length > 1
                                ? "ratings"
                                : "rating"}
                            )
                        </span>
                    </div>

                    {/* Price + Wishlist */}
                    <div className="flex items-center justify-between mt-4">
                        <div>
                            <span className="text-2xl font-bold text-gray-900">
                                {currency}
                                {(
                                    course.coursePrice -
                                    (course.discount * course.coursePrice) / 100
                                ).toFixed(2)}
                            </span>
                            {course.coursePrice && (
                                <>
                                    <span className="text-sm text-gray-400 line-through ml-2">
                                        ${course.coursePrice.toFixed(2)}
                                    </span>
                                    <span className="ml-2 bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded">
                                        {course.discount}% OFF
                                    </span>
                                </>
                            )}
                        </div>
                        <button
                            onClick={onFavoriteClick}
                            className={`p-2 rounded-full border transition ${
                                favorite
                                    ? "bg-red-100 text-red-500 border-red-200"
                                    : "text-gray-500 hover:text-red-400 border-gray-200"
                            }`}
                            title="Add to wishlist"
                        >
                            {favorite ? <FaHeart /> : <FaRegHeart />}
                        </button>
                    </div>

                    {/* Description */}
                    <p
                        className="text-sm text-gray-700 mt-4 mb-3 leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: course.courseDescription?.slice(0, 200),
                        }}
                    ></p>

                    {/* What you’ll learn */}
                    <div className="border-t pt-3 mt-3">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                            WHAT YOU’LL LEARN
                        </p>
                        <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
                            <li>Lifetime access with free updates coupon.</li>
                            <li>Step-by-step, hands-on project guidance.</li>
                            <li>Downloadable resources and source code.</li>
                        </ul>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2 mt-6">
                    <button className="bg-blue-500 text-white text-sm font-semibold py-2 rounded hover:bg-blue-600 transition">
                        Add To Cart
                    </button>
                    <button className="text-blue-600 text-sm font-semibold border border-blue-500 py-2 rounded hover:bg-blue-50 transition">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CourseHoverPanel;
