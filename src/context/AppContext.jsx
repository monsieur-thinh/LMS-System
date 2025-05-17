import { createContext, useContext, useEffect, useState } from "react";
import App from "../App";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

// export useContextApp = () => useContext(AppContext)

const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Fetch All Courses
    const fetchAllCourses = () => {
        setAllCourses(dummyCourses);
    };

    // calculate average rating of course
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) {
            return 0;
        }
        let totalRating = 0;
        course.courseRatings.forEach((rating) => {
            totalRating += rating.rating;
        });
        return totalRating / course.courseRatings.length;
    };

    // Function to calculate course chapter time
    const calculateChapterTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.map(
            (lecture) => (time += lecture.lectureDuration)
        );
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    };

    // Function to calculate course duration
    const calculateCourseDuration = (course) => {
        let time = 0;
        course.courseContent.map((chapter) =>
            chapter.chapterContent.map(
                (lecture) => (time += lecture.lectureDuration)
            )
        );
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    };

    // Function to calculate Number of lectures in course
    const calculateNumOfLecture = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach((chapter) => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length;
            }
        });
        return totalLectures;
    };

    // Fetch users Enrolled Courses
    const fetchUserEnrolledCourses = async () => {
        setEnrolledCourses(dummyCourses);
    };

    useEffect(() => {
        fetchAllCourses();
        fetchUserEnrolledCourses();
    }, []);

    // Favorites handle

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) {
            try {
                setFavorites(JSON.parse(storedFavs));
            } catch (e) {
                console.error("Failed to parse favorites from localStorage", e);
            }
        }
    }, []);

    // 2. Save mỗi khi thay đổi
    useEffect(() => {
        if (favorites.length > 0) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites]);
    // handle
    const addToFavorites = (course) => {
        setFavorites((prev) => [...prev, course]);
    };

    const removeFromFavorites = (courseID) => {
        setFavorites((prev) =>
            prev.filter((course) => course._id !== courseID)
        );
    };

    const isFavorite = (courseID) => {
        return favorites.some((course) => course._id === courseID);
    };

    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator,
        setIsEducator,
        calculateChapterTime,
        calculateCourseDuration,
        calculateNumOfLecture,
        enrolledCourses,
        fetchUserEnrolledCourses,
        // favorites
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    };
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
