import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const AppLayout = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    );
};
