import { cookies } from "next/headers";
import { cache } from "react";
import { apiClient } from "@/lib/apiClient";

export const getServerSession = cache(async () => {
	const cookieStore = await cookies();

	const sessionToken =
		cookieStore.get("session_token")?.value || cookieStore.get("__Secure-session_token");

	if (!sessionToken) return null;

	try {
		const response = await apiClient.get("/better-auth/get-session", {
			headers: {
				Cookie: `session_token=${sessionToken}`,
			},
		});

		return response.data;
	} catch (error) {
		return null;
	}
});
