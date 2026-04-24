import { apiClient } from "@/lib/apiClient";

export interface Comment {
	id: string;
	userId: string;
	ideaId: string;
	content: string;
	isDeleted: boolean;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
	user: {
		id: string;
		name: string;
		image: string | null;
		email: string;
	};
}

export const addComment = async ({ ideaId, content }: { ideaId: string; content: string }) => {
	const { data } = await apiClient.post(`/comments/${ideaId}`, { content });

	return data.data;
};

export const getComments = async (ideaId: string): Promise<Comment[]> => {
	const { data } = await apiClient.get(`/comments/${ideaId}`);

	return data.data;
};
