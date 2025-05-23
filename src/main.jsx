import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppContextProvider from "./context/AppContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
// clerk
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router basename="/LMS-System">
            <ClerkProvider
                publishableKey={PUBLISHABLE_KEY}
                navigate={(to) => window.history.pushState(null, "", to)}
                afterSignOutUrl="/"
            >
                <AppContextProvider>
                    <App />
                </AppContextProvider>
            </ClerkProvider>
        </Router>
    </StrictMode>
);

{
    /* <StrictMode>
        <Router basename="/LMS-System">
            <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
                <AppContextProvider>
                    <App />
                </AppContextProvider>
            </ClerkProvider>
        </Router>
    </StrictMode> */
}
