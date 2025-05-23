import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";
// Student
import Home from "./pages/student/Home";
import CourseList from "./pages/student/CourseList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
// student-components
import Loading from "./components/student/Loading";
// Educator
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import Navbar from "./components/student/Navbar/Navbar";
import WishList from "./components/student/WishList/WishList";
import Cart from "./pages/student/Cart";
import CartPage from "./pages/student/Cart";

const App = () => {
    const isEducatorRoute = useMatch("/educator/*");

    return (
        <div className="text-default min-h-screen bg-white">
            {!isEducatorRoute && <Navbar />}
            <Routes>
                {/* student routes */}
                <Route path="/" element={<Home />} />
                <Route path="/course-list" element={<CourseList />} />
                <Route path="/course-list/:input" element={<CourseList />} />
                <Route path="/course/:id" element={<CourseDetails />} />
                <Route path="/my-enrollments" element={<MyEnrollments />} />
                <Route path="/player/:courseId" element={<Player />} />
                <Route path="/loading/:path" element={<Loading />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/cart" element={<CartPage />} />

                {/* Educator Routes */}
                <Route path="/educator" element={<Educator />}>
                    <Route path="educator" element={<Dashboard />} />
                    <Route path="add-course" element={<AddCourse />} />
                    <Route path="my-courses" element={<MyCourses />} />
                    <Route
                        path="student-enrolled"
                        element={<StudentsEnrolled />}
                    />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
