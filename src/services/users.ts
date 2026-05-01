import { apiClient } from "@/lib/apiClient";

export interface User {
	id: string;
	email: string;
	name: string;
	image: string | null;
	emailVerified: boolean;
	role: "MEMBER" | "ADMIN";
	isBanned: boolean;
	banReason: string | null;
	isDeleted: boolean;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
	_count: {
		comments: number;
		ideas: number;
		votes: number;
		payments: number;
	};
}

export const getMembers = async (): Promise<User[]> => {
	const { data } = await apiClient.get("/users/members");

	return data.data;
};

export const promoteMember = async (id: string): Promise<User> => {
	const { data } = await apiClient.patch(`/users/${id}/role`);

	return data.data;
};

export const updateMemberStatus = async (id: string, banReason?: string): Promise<User> => {
	const { data } = await apiClient.patch(`/users/${id}/status`, { banReason });

	return data.data;
};
