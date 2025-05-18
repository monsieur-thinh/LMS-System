import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterSection = ({ title, children, isOpen, onToggle }) => (
    <div className="border-b pb-4 mb-4">
        <div
            className="flex justify-between items-center cursor-pointer mb-2"
            onClick={onToggle}
        >
            <h2 className="font-semibold text-gray-800">{title}</h2>
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {isOpen && <div className="pl-1 space-y-2">{children}</div>}
    </div>
);

const CourseFilterSidebar = ({ selectedFilters, onChange, filterCounts }) => {
    const [openSections, setOpenSections] = useState({
        category: true,
        tools: true,
        rating: true,
        level: true,
        price: true,
        duration: true,
    });

    const toggleSection = (key) => {
        setOpenSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleCheckboxChange = (category, value) => {
        onChange(category, value);
    };

    return (
        <div className="w-full pr-2">
            {/* LEVEL */}
            <FilterSection
                title="Course Level"
                isOpen={openSections.level}
                onToggle={() => toggleSection("level")}
            >
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <label
                        key={level}
                        className="flex justify-between items-center text-sm text-gray-700"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedFilters.level.includes(level)}
                                onChange={() =>
                                    handleCheckboxChange("level", level)
                                }
                            />
                            {level}
                        </div>
                        <span className="text-gray-400">
                            ({filterCounts?.level?.[level] || 0})
                        </span>
                    </label>
                ))}
            </FilterSection>

            {/* PRICE */}
            <FilterSection
                title="Price"
                isOpen={openSections.price}
                onToggle={() => toggleSection("price")}
            >
                {["free", "paid"].map((type) => (
                    <label
                        key={type}
                        className="flex justify-between items-center text-sm text-gray-700"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedFilters.price.includes(type)}
                                onChange={() =>
                                    handleCheckboxChange("price", type)
                                }
                            />
                            {type === "free" ? "Free" : "Paid"}
                        </div>
                        <span className="text-gray-400">
                            ({filterCounts?.price?.[type] || 0})
                        </span>
                    </label>
                ))}
            </FilterSection>

            {/* DURATION */}
            <FilterSection
                title="Duration"
                isOpen={openSections.duration}
                onToggle={() => toggleSection("duration")}
            >
                {[
                    { label: "Less than 2 hours", key: "0-2" },
                    { label: "2 to 10 hours", key: "2-10" },
                    { label: "More than 10 hours", key: "10+" },
                ].map(({ label, key }) => (
                    <label
                        key={key}
                        className="flex justify-between items-center text-sm text-gray-700"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedFilters.duration.includes(key)}
                                onChange={() =>
                                    handleCheckboxChange("duration", key)
                                }
                            />
                            {label}
                        </div>
                        <span className="text-gray-400">
                            ({filterCounts?.duration?.[key] || 0})
                        </span>
                    </label>
                ))}
            </FilterSection>

            {/* RATING */}
            <FilterSection
                title="Rating"
                isOpen={openSections.rating}
                onToggle={() => toggleSection("rating")}
            >
                {[4, 3, 2].map((rating) => (
                    <label
                        key={rating}
                        className="flex justify-between items-center text-sm text-gray-700"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedFilters.rating.includes(
                                    rating
                                )}
                                onChange={() =>
                                    handleCheckboxChange("rating", rating)
                                }
                            />
                            {rating} stars & up
                        </div>
                        <span className="text-gray-400">
                            ({filterCounts?.rating?.[rating] || 0})
                        </span>
                    </label>
                ))}
            </FilterSection>
        </div>
    );
};

export default CourseFilterSidebar;
