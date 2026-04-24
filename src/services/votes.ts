import { apiClient } from "@/lib/apiClient";

export const vote = async ({
	ideaId,
	type,
}: {
	ideaId: string;
	type: "UPVOTE" | "DOWNVOTE";
}) => {
	const { data } = await apiClient.post(`/vote/${ideaId}`, { type });

	return data.data;
};
