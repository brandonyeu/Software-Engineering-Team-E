import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0, User } from "@auth0/auth0-react";
import { ViewNodes } from "@/components";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chart, PiChart } from "./Chart.tsx";

function ProfilePage() {
    const { user } = useAuth0();
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [serviceRequests, setServiceRequests] = useState<[]>([]);
    const [employeeName, setEmployeeName] = useState("");
    const [activeTab, setActiveTab] = useState("serviceType");
    const [chartType, setChartType] = useState("bar");
    const [adminPerm, setAdminPerm] = useState(false);
    const [employeeData, setEmployeeData] = useState<[]>([]);

    useEffect(() => {
        if (user) {
            setUserInfo(user);
            if (user.name) {
                setEmployeeName(user.name);
            }
        }
        const fetchServiceRequests = async () => {
            try {
                console.log(employeeName);
                const response = await axios.get(
                    `/api/service-requests/${employeeName}`,
                );
                setServiceRequests(response.data);
            } catch (error) {
                console.error(error);
                console.log(userInfo);
            }
        };

        const fetchEmployees = async () => {
            try {
                const res = await axios.get("/api/employee");
                setEmployeeData(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const checkEmployeeAdmin = async () => {
            try {
                const response = await axios.get(
                    `/api/employee/${employeeName}/boolean`
                );
                if (response.data) {
                    const { name, booleanValue } = response.data;
                    console.log(`${name}'s boolean value is: ${booleanValue}`);
                    setAdminPerm(booleanValue);
                } else {
                    console.error("Failed to fetch employee data");
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        fetchServiceRequests();
        fetchEmployees();
        checkEmployeeAdmin();
    }, [userInfo, employeeName, user]);

    const aggregateData = (key) => {
        const counts = {};
        serviceRequests.forEach((item) => {
            const keyValue = item[key];
            counts[keyValue] = (counts[keyValue] || 0) + 1;
        });
        return Object.keys(counts).map((name) => ({
            name,
            count: counts[name],
        }));
    };

    const chartData = aggregateData(activeTab);

    const handleAdminToggle = async () => {
        try {
            const response = await axios.post(`/api/employee/${employeeName}/boolean/toggle`);
            if (response.data) {
                const { name, admin } = response.data;
                console.log(`${name}'s admin permission is now: ${admin}`);
                setAdminPerm(admin);
            } else {
                console.error("Failed to toggle admin permission");
            }
        } catch (error) {
            console.error("Error toggling admin permission:", error);
        }
    };

    if (userInfo && adminPerm)
    return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold mt-12 mb-4">Admin Profile</h1>
                <p className="text-foreground font-light text-lg">{employeeName}</p>
            </div>

            <div className="mb-8">
                <h1 className="text-xl font-bold mt-12 m-4">Employee Manager</h1>
                <ViewNodes data={employeeData}/>
            </div>

            <div className="mb-8">
                <h1 className="text-xl font-bold mt-12 m-4">Service Manager</h1>
                <ViewNodes data={serviceRequests}/>
            </div>

            <div className="mb-8">
                <h1 className="text-xl font-bold mt-12 mb-4">Service Chart Data</h1>
                <div className="flex flex-col md:flex-row items-start">
                    <div className="mr-8">
                        <Tabs defaultValue="location" onValueChange={setActiveTab}>
                            <TabsList>
                                <TabsTrigger value="location">Location</TabsTrigger>
                                <TabsTrigger value="status">Status</TabsTrigger>
                                <TabsTrigger value="priority">Priority</TabsTrigger>
                                <TabsTrigger value="serviceType">Service Type</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <div>
                        <Tabs defaultValue="bar" onValueChange={setChartType}>
                            <TabsList>
                                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                                <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
            </div>

            <h1 className="text-xl flex justify-center mt-12 mb-4">
                Services grouped by: {activeTab} in form: {chartType}
            </h1>

            <div className="mb-8">
                {chartType === "bar" ? (
                    <Chart
                        yMeasure="Count"
                        sources={[{displayName: activeTab, dataKey: "count"}]}
                        data={chartData}
                        dataKey="count"
                    />
                ) : (
                    <PiChart data={chartData} dataKey="count"/>
                )}
            </div>

            <button
                onClick={handleAdminToggle}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {adminPerm ? "Revoke Admin" : "Grant Admin"}
            </button>
        </div>
    );
    if (userInfo)
        return (
            <div className="container mx-auto p-4 rounded-full">
                <div className="mb-8">
                    <h1 className="text-xl font-bold mt-12 m-4">
                        User Profile
                    </h1>
                    <p className="text-gray-700 text-l"> {employeeName} </p>
                </div>
                <h1 className="text-xl  mt-12 m-4">Service Manager</h1>
                <ViewNodes data={serviceRequests}/>
                <div className="flex">
                    <div>
                        <h1 className="text-xl font-bold mt-12 m-4">
                            Service Chart Data
                        </h1>
                        <Tabs
                            defaultValue="location"
                            onValueChange={setActiveTab}
                        >
                            <TabsList>
                                <TabsTrigger value="location">
                                    Location
                                </TabsTrigger>
                                <TabsTrigger value="status">Status</TabsTrigger>
                                <TabsTrigger value="priority">
                                    Priority
                                </TabsTrigger>
                                <TabsTrigger value="serviceType">
                                    Service Type
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <Tabs defaultValue="bar" onValueChange={setChartType}>
                            <TabsList>
                                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                                <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
                <h1 className="flex justify-center text-l mt-12 m-4">
                    Services grouped by: {activeTab} in form: {chartType}
                </h1>
                {chartType === "bar" ? (
                    <Chart
                        yMeasure="Count"
                        sources={[{displayName: activeTab, dataKey: "count" }]}
                        data={chartData}
                        dataKey="count"
                    />
                ) : (
                    <PiChart data={chartData} dataKey="count" />
                )}
                <button onClick={handleAdminToggle}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {adminPerm ? "Revoke Admin" : "Grant Admin"}
                </button>
            </div>
        );
}

export default ProfilePage;
