"use client";

import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { IdeasTrendData } from "@/services/ideas";

export function AdminDashboardIdeasTrend({ ideas }: { ideas: IdeasTrendData[] }) {
	return (
		<div className="h-75 w-full teal-">
			<ResponsiveContainer
				width="100%"
				height="100%"
			>
				<AreaChart
					data={ideas}
					margin={{ top: 5, right: 5, left: -40, bottom: 0 }}
				>
					<defs>
						<linearGradient
							id="colorIdeas"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="5%"
								stopColor="#00bba7"
								stopOpacity={0.1}
							/>
							<stop
								offset="95%"
								stopColor="#00bba7"
								stopOpacity={0.02}
							/>
						</linearGradient>
					</defs>
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="#242427"
						vertical={false}
					/>
					<XAxis
						dataKey="label"
						stroke="#d4d4d8"
						fontSize={12}
						tickLine={false}
						axisLine={false}
						dy={5}
					/>
					<YAxis
						stroke="#d4d4d8"
						fontSize={12}
						tickLine={false}
						axisLine={false}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "#101012",
							borderColor: "#27272a",
							borderRadius: "12px",
							color: "#e4e4e7",
							paddingInline: "12px",
							paddingBlock: "6px",
						}}
						itemStyle={{ color: "#009689" }}
						labelStyle={{ color: "#a1a1aa" }}
						labelFormatter={(label, payload) =>
							payload?.[0]?.payload?.date || label
						}
					/>
					<Area
						type="monotone"
						dataKey="Ideas"
						stroke="#009689"
						strokeWidth={2}
						fillOpacity={1}
						fill="url(#colorIdeas)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
