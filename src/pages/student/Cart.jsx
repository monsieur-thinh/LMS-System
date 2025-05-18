import React from "react";
import { Trash2 } from "lucide-react";

const CartPage = ({ cartItems, onRemove, onCheckout }) => {
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + (item.coursePrice - item.discount || 0),
        0
    );

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-12">
                    Your cart is currently empty.
                </p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Course List */}
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map((course) => (
                            <div
                                key={course._id}
                                className="flex gap-4 p-4 border rounded-lg shadow-sm"
                            >
                                <img
                                    src={course.courseThumbnail}
                                    alt={course.courseTitle}
                                    className="w-28 h-20 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h2 className="font-semibold text-gray-800">
                                        {course.courseTitle}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {course.level}
                                    </p>
                                    <p className="text-sm font-medium mt-1">
                                        $
                                        {(
                                            course.coursePrice - course.discount
                                        ).toFixed(2)}
                                    </p>
                                </div>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => onRemove(course._id)}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="border rounded-lg p-4 shadow-md h-fit">
                        <h3 className="font-semibold text-lg mb-4">Summary</h3>
                        <div className="flex justify-between mb-2">
                            <span>Total Courses</span>
                            <span>{cartItems.length}</span>
                        </div>
                        <div className="flex justify-between font-medium text-lg">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button
                            className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            onClick={onCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
