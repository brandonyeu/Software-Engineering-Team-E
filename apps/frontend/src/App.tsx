import "./index.css";
import Welcome from "./routes/Welcome.tsx";
import Services from "@/routes/Services";
import FlowerService from "@/routes/FlowerServiceRequest.tsx";
import InterpreterService from "@/routes/LanguageInterpreterRequest.tsx";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Hamburger from "./components/Hamburger.tsx";
import MapPage from "@/routes/MapPage.tsx";
import MapEditor from "@/routes/MapEditor.tsx";
import MapPage3d from "@/routes/MapPage3d.tsx";
import DataViewer from "@/routes/DataViewer.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { ModeToggle } from "./components/ModeToggle.tsx";
import DrugDelivery from "@/routes/MedicineDeliveryRequest.tsx";
import GiftServiceRequest from "@/routes/GiftServiceRequest.tsx";
import SecurityForm from "./routes/SecurityForm";
import SanitationService from "@/routes/SanitationServiceRequest.tsx";
import RoomScheduling from "@/routes/RoomServiceRequest.tsx";
import MedicalDeviceService from "@/routes/MedicalDeviceServiceRequest.tsx";
import { DBNode } from "common/src/types";
import axios from "axios";
import { Auth0Provider, User, useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { ProtectedRoute } from "@/routes/Authenticated.tsx";
import UserArea from "./components/UserArea.tsx";
import Profile from "@/routes/Profile.tsx";
import Settings from "@/routes/Settings.tsx";
import ThreeSixty from "./routes/360Image.tsx";
import BadRoutePage from "@/routes/404Page.tsx";
import AboutUs from "@/routes/AboutUs.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { ToastProvider } from "@radix-ui/react-toast";
import CreditPage from "@/routes/CreditPage.tsx";
import FormMaker from "@/routes/CustomForms";
// import Mobile from "./routes/Mobile";
import { LanguageToggle } from "@/components/ui/LanguageToggle.tsx";
import { LanguageProvider } from "@/components/LanguageProvider.tsx";
import GravityBallGamePage from "@/routes/GravityBallGamePage.tsx";

// import { useAxiosWithAuth } from "./hooks/useAxiosWithAuth0";

function AuthProviderWrapper({ nodes }: { nodes: DBNode[] }) {
    const navigate = useNavigate();

    // const axiosAuth = useAxiosWithAuth();
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;

    return (
        <Auth0Provider
            domain="dev-4m72lcr6jdjjoxgt.us.auth0.com"
            clientId="bIVglTpNNLUMySf32wyUYrVM17ISqXHz"
            onRedirectCallback={(appState) =>
                navigate(appState?.returnTo || window.location.pathname)
            }
            useRefreshTokens
            cacheLocation="localstorage"
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: "/api",
                scope: "openid profile email offline_access",
            }}
        >
            <InnerApp nodes={nodes} />
        </Auth0Provider>
    );
}

function InnerApp({ nodes }: { nodes: DBNode[] }) {
    const [userData, setUserData] = useState<User | null>(null);
    const { user } = useAuth0();

    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [user]);

    return (
        <ThemeProvider>
            <LanguageProvider>
                <div className="flex">
                    <div>
                        <Hamburger />
                    </div>
                    <div className="absolute right-0 top-0 z-50 pr-2 pt-2 flex">
                        <UserArea />
                    </div>
                </div>
                <Toaster />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Welcome nodes={nodes} setUser={setUserData} />
                        }
                    />
                    <Route path="/map" element={<MapPage nodes={nodes} />} />
                    <Route
                        path="/map3d"
                        element={<MapPage3d nodes={nodes} />}
                    />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="*" element={<BadRoutePage />} />
                    <Route path="/credit-page" element={<CreditPage />} />
                    <Route
                        path="/Gravity-Ball-Game-page"
                        element={<GravityBallGamePage />}
                    />
                    <Route path="/meettheteam" element={<ThreeSixty />} />
                    {/* <Route
                            path="/mobile/:start/:end/:algorithm"
                            element={<Mobile nodesIn={nodes} />}
                        /> */}
                    <Route
                        path="/services"
                        element={
                            <ProtectedRoute>
                                <Services />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/map-editor"
                        element={
                            <ProtectedRoute>
                                <MapEditor />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/flower-service"
                        element={
                            <ProtectedRoute>
                                {userData && userData.name ? (
                                    <FlowerService employee={userData.name} />
                                ) : (
                                    <BadRoutePage />
                                )}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/drug-service"
                        element={
                            <ProtectedRoute>
                                {userData && userData.name ? (
                                    <DrugDelivery employee={userData.name} />
                                ) : (
                                    <BadRoutePage />
                                )}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/language-service"
                        element={
                            <ProtectedRoute>
                                {userData && userData.name ? (
                                    <InterpreterService
                                        employee={userData.name}
                                    />
                                ) : (
                                    <BadRoutePage />
                                )}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/gift-service"
                        element={
                            <ProtectedRoute>
                                {userData && userData.name ? (
                                    <GiftServiceRequest
                                        employee={userData.name}
                                    />
                                ) : (
                                    <BadRoutePage />
                                )}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/sanitation"
                        element={
                            <ProtectedRoute>
                                {userData && userData.name ? (
                                    <SanitationService
                                        employee={userData.name}
                                    />
                                ) : (
                                    <BadRoutePage />
                                )}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/room-service"
                        element={
                            <ProtectedRoute>
                                {userData && userData.name ? (
                                    <RoomScheduling employee={userData.name} />
                                ) : (
                                    <BadRoutePage />
                                )}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/medical-device-service"
                        element={
                            <ProtectedRoute>
                                {userData && userData.name ? (
                                    <MedicalDeviceService
                                        employee={userData.name}
                                    />
                                ) : (
                                    <BadRoutePage />
                                )}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/data"
                        element={
                            <ProtectedRoute>
                                <DataViewer />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/security"
                        element={
                            <ProtectedRoute>
                                {userData && userData.name ? (
                                    <SecurityForm employee={userData.name} />
                                ) : (
                                    <BadRoutePage />
                                )}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/form-maker"
                        element={
                            <ProtectedRoute>
                                <FormMaker />
                            </ProtectedRoute>
                        }
                    />
                </Routes>

                <div className="fixed z-50 bottom-0 pb-2 pl-2">
                    <ModeToggle />
                </div>

                <div className="fixed z-50 bottom-12 pb-2 pl-2">
                    <LanguageToggle />
                </div>
            </LanguageProvider>
        </ThemeProvider>
    );
}

function App() {
    const [nodesIn, setNodes] = useState<DBNode[]>([]);

    useEffect(() => {
        async function fetchNodes() {
            try {
                const response = await axios.get("/api/nodes");
                setNodes(response.data);
            } catch (error) {
                console.error("Failed to fetch nodes:", error);
            }
        }
        fetchNodes();
    }, []);

    return (
        <BrowserRouter>
            <ToastProvider>
                <AuthProviderWrapper nodes={nodesIn} />
            </ToastProvider>
        </BrowserRouter>
    );
}

export default App;
