import React from "react";
import { useAppContext } from "../../../context/AppContext";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./WishList.scss";

const WishList = () => {
    const {
        favorites,
        calculateRating,
        isFavorite,
        currency,
        removeFromFavorites,
        addToFavorites,
    } = useAppContext();

    function onFavoriteClick(e, course) {
        e.preventDefault();
        if (isFavorite(course._id)) {
            removeFromFavorites(course._id);
        } else {
            addToFavorites(course);
        }
    }

    if (!favorites || favorites.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-8 text-center animate-fade-in">
                <h2 className="text-xl font-semibold">
                    No favorite courses yet
                </h2>
                <p className="text-gray-600 mt-2">
                    Start adding courses to your wishlist and they will appear
                    here!
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-cyan-100/70 animate-fade-in">
            <div className="max-w-5xl mx-auto p-4">
                <h2 className="text-2xl font-semibold mb-4">
                    Wishlist ({favorites.length})
                </h2>
                <div className="border rounded-md overflow-hidden shadow-sm">
                    <div className="grid grid-cols-12 bg-gray-50 font-semibold text-sm px-4 py-2">
                        <div className="col-span-6">COURSE</div>
                        <div className="col-span-3">PRICES</div>
                        <div className="col-span-3">ACTION</div>
                    </div>

                    {favorites.map((item) => (
                        <Link
                            to={"/course/" + item._id}
                            onClick={() => {
                                scrollTo(0, 0);
                            }}
                            key={item._id}
                            className="grid grid-cols-12 items-center px-4 py-4 border-t hover:bg-white transition duration-300 ease-in-out"
                        >
                            {/* Course Info */}
                            <div className="col-span-6 flex items-center gap-4">
                                <img
                                    src={item.courseThumbnail}
                                    alt={item.title}
                                    className="w-24 h-20 object-cover rounded-md shadow-md transition-transform duration-300 hover:scale-105"
                                />
                                <div>
                                    <div className="flex items-center gap-2 text-orange-500 text-sm font-medium">
                                        <span>
                                            ⭐{" "}
                                            {calculateRating(item).toFixed(1)}
                                        </span>
                                        <span className="text-gray-500">
                                            (
                                            {item.reviews?.toLocaleString() ||
                                                0}{" "}
                                            Review)
                                        </span>
                                    </div>
                                    <h3 className="font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Course by:{" "}
                                        {item.authors?.join(" • ") ||
                                            "Unknown Author"}
                                    </p>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="col-span-2 text-lg font-semibold text-red-600">
                                <span>
                                    {currency}
                                    {(
                                        item.coursePrice -
                                        (item.discount * item.coursePrice) / 100
                                    ).toFixed(2)}
                                </span>
                                {item.discount > 0 && (
                                    <span className="text-gray-400 line-through text-sm ml-2">
                                        {currency}
                                        {item.coursePrice.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Action */}
                            <div className="col-span-4 flex items-center gap-2 btn-group">
                                <button className="px-5 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-all duration-200">
                                    Buy Now
                                </button>
                                <button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-200">
                                    Add To Cart
                                </button>
                                <button
                                    onClick={(e) => onFavoriteClick(e, item)}
                                    className="p-2 rounded-full hover:bg-red-100 transition-all duration-200"
                                >
                                    <FaRegHeart
                                        className={`text-xl transition-transform duration-200 ${
                                            isFavorite(item._id)
                                                ? "text-red-500 scale-110"
                                                : "text-gray-500"
                                        } hover:scale-125`}
                                    />
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WishList;
