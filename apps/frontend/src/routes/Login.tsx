import { Link } from "react-router-dom";
//import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import hospitalHero from "/src/images/hospital-hero.jpg";
//import { useToast } from "@/components/ui/use-toast";

export default function Login() {
    const { loginWithRedirect, logout, isAuthenticated, isLoading } =
        useAuth0();

    const handleLogin = () => {
        loginWithRedirect();
    };

    const handleLogout = () => {
        logout();
    };

    if (isLoading) {
        return <div>Loading...</div>;
        //     should be toast but not working for some reason
    }

    if (isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-white p-4 rounded shadow">
                    <h2>Welcome, !</h2>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex items-center justify-center h-screen">
            <div
                className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-center"
                style={{
                    backgroundImage: `url(${hospitalHero})`,
                    opacity: 0.25,
                }}
            ></div>
            <div className="space-y-8 z-10 w-full content-center">
                <section
                    className="p-6 bg-white bg-opacity-90 rounded shadow-md content-center text-center relative"
                    style={{
                        backgroundImage: `url(${hospitalHero})`,
                        backgroundSize: "cover",
                        minHeight: "400px",
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <h1 className="text-3xl font-bold text-white">
                        Need Directions?
                    </h1>
                    <p className="text-xl text-gray-200">
                        Find your way with our easy-to-use pathfinder located in
                        the nearest kiosk!
                    </p>
                    <Link
                        to="/map"
                        className="mt-4 inline-block bg-accent text-white font-bold py-2 px-4 rounded hover:bg-indigo-700"
                    >
                        Get Started
                    </Link>
                </section>
                <div className="z-10 w-full flex flex-col items-center justify-center">
                    <section className="p-6 bg-background rounded shadow-md content-center max-w-md">
                        <button
                            onClick={handleLogin}
                            className="w-full bg-accent hover:bg-gray-600 rounded p-3 text-white font-bold"
                        >
                            Login / Register
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}
