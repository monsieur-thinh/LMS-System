import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CourseCard = ({ course }) => {
    const { currency, calculateRating } = useContext(AppContext);
    const rating = calculateRating(course);

    return (
        <div className="relative group max-w-sm cursor-pointer">
            <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 bg-white">
                <div className="relative">
                    <img
                        src={course.courseThumbnail}
                        alt={`Thumbnail for ${course.courseTitle}`}
                        className="w-full h-44 object-cover"
                    />
                    {/* Badge */}
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md font-semibold shadow">
                        Bestseller
                    </div>
                </div>
                <div className="p-4 text-left">
                    <h3 className="text-base font-semibold leading-tight">
                        {course.courseTitle}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {course.instructorName || "Instructor"}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm">{rating.toFixed(1)}</p>
                        <div className="flex">
                            {[...Array(5)].map((_, index) => (
                                <img
                                    key={index}
                                    src={
                                        index < Math.floor(rating)
                                            ? assets.star
                                            : assets.star_blank
                                    }
                                    alt="star"
                                    className="w-4 h-4"
                                />
                            ))}
                        </div>
                        <p className="text-sm text-gray-500">
                            ({course.courseRatings.length})
                        </p>
                    </div>

                    {/* Price */}
                    <p className="text-base font-semibold text-gray-900 mt-2">
                        {currency}
                        {(
                            course.coursePrice -
                            (course.discount * course.coursePrice) / 100
                        ).toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Hover overlay panel */}
            <div className="absolute z-10 top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xl h-full">
                    <h4 className="font-semibold text-md mb-1">
                        {course.courseTitle}
                    </h4>
                    <div className="text-xs text-gray-500 mb-2 flex gap-2">
                        <span>30 total hours</span>
                        <span>•</span>
                        <span>54 lessons</span>
                        <span>•</span>
                        <span>Intermediate Level</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-5">
                        Master MERN Stack by building a Full Stack AI Text to
                        Image SaaS App using React js, MongoDB, Node js, Express
                        js and Stripe Payment.
                    </p>
                    <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1 mb-4">
                        <li>Lifetime access with free updates.</li>
                        <li>Step-by-step, hands-on project guidance.</li>
                        <li>Downloadable resources and source code.</li>
                    </ul>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition">
                            Add to cart
                        </button>
                        <button className="text-gray-500 hover:text-red-500 transition">
                            <FaRegHeart className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
