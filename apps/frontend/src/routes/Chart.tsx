import React from "react";
import {
    PieChart,
    Pie,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

interface ChartData {
    [key: string]: string | number | null;
}

interface DataSource {
    displayName: string;
    dataKey: string;
}
function getRandCol() {
    const colors = [
        "#EF4444",
        "#F6BD38",
        "#FFDB80",
        "#FFE9BF",
        "#A4D4FE",
        "#6D9FCD",
        "#6D9FCD",
        "#003365",
    ];
    const randCol = Math.floor(Math.random() * colors.length);
    return colors[randCol];
}

export function Chart({
    yMeasure,
    sources,
    data,
    dataKey,
}: {
    yMeasure: string;
    sources: DataSource[];
    data: ChartData[];
    dataKey: string;
}) {
    return (
        <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 5, right: 10, left: 15, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                        label={{
                            value: yMeasure,
                            angle: -90,
                            position: "insideLeft",
                        }}
                    />
                    <Tooltip />
                    {sources.map((source, index) => (
                        <Bar
                            key={index}
                            dataKey={dataKey}
                            fill={getRandCol()}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
export function PiChart({
    data,
    dataKey,
}: {
    data: ChartData[];
    dataKey: string;
}) {
    return (
        <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey={dataKey}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={150}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getRandCol()} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
