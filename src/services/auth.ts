import { apiClient } from "@/lib/apiClient";

export const getSession = async (
	sessionToken: string,
): Promise<{ session: Record<string, any>; user: Record<string, any> }> => {
	const { data } = await apiClient.get("/better-auth/get-session", {
		fetchOptions: {
			cache: "force-cache",
		},
	});

	return data;
};
