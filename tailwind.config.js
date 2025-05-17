/** @type {import('tailwindcss').Config} */
import lineClamp from "@tailwindcss/line-clamp";
import animate from "tailwindcss-animate";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontSize: {
                "course-details-heading-small": ["26px", "36px"],
                "course-details-heading-large": ["36px", "44px"],
                "home-heading-small": ["28px", "34px"],
                "home-heading-large": ["48px", "56px"],
                default: ["15px", "21px"],
            },
            gridTemplateColumns: {
                auto: "repeat(auto-fit, minmax(200px, 1fr))",
            },
            spacing: {
                "section-height": "500px",
            },
            maxWidth: {
                "course-card": "424px",
            },
            boxShadow: {
                "custom-card": "0px 4px 15px 2px rgba(0, 0 , 0 ,0.1)",
            },
            // ✅ Thêm keyframes và animation
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "slide-in-left": {
                    "0%": { opacity: "0", transform: "translateX(-50px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
            },
            animation: {
                "fade-in": "fade-in 0.5s ease-out both",
                "slide-in-left": "slide-in-left 0.6s ease-out both",
            },
        },
    },
    plugins: [lineClamp, animate],
};
