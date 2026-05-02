"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { IdeasByCategoryData } from "@/services/ideas";

const COLORS = ["#10b981", "#0ea5e9", "#8b5cf6", "#f59e0b", "#f43f5e", "#64748b"];

export function AdminDashboardIdeasByCategory({ ideas }: { ideas: IdeasByCategoryData[] }) {
	return (
		<div className="h-75 w-full flex flex-col items-center justify-center">
			<ResponsiveContainer
				width="100%"
				height="100%"
			>
				<PieChart>
					<Tooltip
						cursor={{ fill: "transparent" }}
						contentStyle={{
							backgroundColor: "#101012",
							borderColor: "#27272a",
							borderRadius: "12px",
							color: "#e4e4e7",
							paddingInline: "12px",
							paddingBlock: "6px",
						}}
						itemStyle={{ color: "#e4e4e7", fontWeight: 500 }}
						formatter={(value: any, name: any) => [`${value} Ideas`, name]}
					/>
					<Pie
						data={ideas}
						cx="50%"
						cy="50%"
						outerRadius={120}
						dataKey="value"
						stroke="none"
					>
						{ideas.map((_, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
								className="transition-all duration-300 hover:opacity-80 outline-none"
							/>
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
