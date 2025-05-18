import React, { useState, useRef } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import CourseHoverPanel from "./CourseHoverPanel/CourseHoverPanel";

const CourseCard = ({ course }) => {
    const { currency, calculateRating } = useAppContext();
    const cardRef = useRef();
    const [showLeft, setShowLeft] = useState(false);

    const handleMouseEnter = () => {
        const rect = cardRef.current.getBoundingClientRect();
        const panelWidth = 384; // = Tailwind w-96

        if (rect.right + panelWidth > window.innerWidth) {
            setShowLeft(true);
        } else {
            setShowLeft(false);
        }
    };

    return (
        <div
            className="relative group cursor-pointer"
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
        >
            <Link
                to={"/course/" + course._id}
                onClick={() => {
                    scrollTo(0, 0);
                }}
                className="block border border-gray-300 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 bg-white"
            >
                <img
                    src={course.courseThumbnail}
                    alt="course thumbnail"
                    className="w-full"
                />
                <div className="p-3 text-left">
                    <h3 className="text-base font-semibold">
                        {course.courseTitle}
                    </h3>
                    <p className="text-gray-500">monsieur kuma</p>
                    <div className="flex items-center space-x-2">
                        <p>{calculateRating(course)}</p>
                        <div className="flex">
                            {[...Array(5)].map((_, index) => (
                                <img
                                    key={index}
                                    src={
                                        index <
                                        Math.floor(calculateRating(course))
                                            ? assets.star
                                            : assets.star_blank
                                    }
                                    alt="start icon"
                                    className="w-3.5 h-3.5"
                                />
                            ))}
                        </div>
                        <p className="text-gray-500">
                            {course.courseRatings.length}
                        </p>
                    </div>
                    <p className="text-base font-semibold text-gray-800">
                        {currency}
                        {(
                            course.coursePrice -
                            (course.discount * course.coursePrice) / 100
                        ).toFixed(2)}
                    </p>
                </div>
            </Link>
            {/* Hover overlay panel */}
            <CourseHoverPanel course={course} showLeft={showLeft} />
        </div>
    );
};

export default CourseCard;
