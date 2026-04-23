import { apiClient } from "@/lib/apiClient";

export interface Idea {
	id: string;
	authorId: string;
	categoryId: string;
	title: string;
	problem: string;
	solution: string;
	description: string;
	thumbnail: string | null;
	status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
	isPaid: boolean;
	price: any;
	rejectionFeedback: string | null;
	upvoteCount: number;
	downvoteCount: number;
	isDeleted: boolean;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
	publishedAt: Date | null;
	author: {
		createdAt: Date;
		email: string;
		name: string;
		image: string | null;
		role: "MEMBER" | "ADMIN";
		isBanned: boolean;
		isDeleted: boolean;
	};
	category: {
		createdAt: Date;
		name: string;
		isDeleted: boolean;
		description: string | null;
		icon: string;
	};
	payments: {
		id: string;
		createdAt: Date;
		userId: string;
		status: "PENDING" | "COMPLETED" | "FAILED";
		transactionId: string | null;
		amount: any;
	}[];
	_count: {
		comments: number;
		votes: number;
	};
}

export interface GetIdeasFilters {
	page?: number;
	limit?: number;
	search?: string;
	categoryId?: string;
	isPaid?: boolean;
	sortBy?: "recent" | "top_voted" | "most_commented";
	minVotes?: number;
}

export const getIdeas = async (filters: GetIdeasFilters): Promise<Idea[]> => {
	const { data } = await apiClient.get("/ideas", { params: filters });
	return data.data;
};

export const getTrendingIdeas = async (): Promise<Idea[]> => {
	const { data } = await apiClient.get("/ideas?sortBy=top_voted&limit=3");

	return data.data;
};
