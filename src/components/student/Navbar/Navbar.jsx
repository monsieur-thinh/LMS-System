import { assets } from "../../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useAppContext } from "../../../context/AppContext";
import "./Navbar.scss";

const Navbar = () => {
    const { navigate, isEducator } = useAppContext();

    const isCourseListPage = location.pathname.includes("/course-list");
    const { openSignIn } = useClerk();
    const { user } = useUser();

    return (
        <div
            className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
                isCourseListPage ? "bg-white" : "bg-cyan-100/70"
            }`}
        >
            <img
                onClick={() => navigate("/")}
                src={assets.logo}
                alt="Logo"
                className="w-28 lg:w-32 cursor-pointer"
            />
            <div className="hidden md:flex items-center gap-5 text-gray-500">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-5 navbar-action-change">
                        {user && (
                            <>
                                <button
                                    className="btn"
                                    onClick={() => navigate("/educator")}
                                >
                                    {isEducator
                                        ? "educator dashboard"
                                        : "Become Educator"}
                                </button>
                                <Link to="/my-enrollments">
                                    <button className="btn">
                                        My Enrollments
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="navbar-heart-icon btn">
                            <Link to="/wishlist">
                                <img
                                    src={assets.heart_icon}
                                    alt="heart icon"
                                    className="w-5 h-5 btn"
                                />
                            </Link>
                        </div>
                        <div className="navbar-cart-icon btn">
                            <Link to="/cart">
                                <img
                                    className="w-5 h-5 btn"
                                    src={assets.shopping_cart}
                                    alt="cart icon"
                                />
                            </Link>
                            {/* <div
                                className={
                                    getTotalCartAmount() === 0 ? "" : "dot"
                                }
                            ></div> */}
                        </div>
                    </div>
                </div>
                {user ? (
                    <UserButton />
                ) : (
                    <button
                        onClick={() => openSignIn()}
                        className="bg-blue-600 text-white px-5 py-2 rounded-full"
                    >
                        Create account
                    </button>
                )}
            </div>
            {/* For phone screen */}
            <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
                <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
                    {user && (
                        <>
                            <button onClick={() => navigate("/educator")}>
                                {isEducator
                                    ? "educator dashboard"
                                    : "Become Educator"}
                            </button>{" "}
                            | <Link to="/my-enrollments">My Enrollments</Link>
                        </>
                    )}
                </div>
                {user ? (
                    <UserButton />
                ) : (
                    <button onClick={() => openSignIn()}>
                        <img src={assets.user_icon} alt="" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
