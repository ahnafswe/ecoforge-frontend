import { cookies } from "next/headers";
import { cache } from "react";
import { apiClient } from "@/lib/apiClient";

export const getServerSession = cache(async () => {
	const cookieStore = await cookies();

	const sessionCookie =
		cookieStore.get("session_token") || cookieStore.get("__Secure-session_token");
	const sessionToken = sessionCookie?.value;

	console.log("Session Token:", sessionToken);

	if (!sessionToken) return null;

	try {
		const response = await apiClient.get("/better-auth/get-session", {
			headers: {
				Cookie: `${sessionCookie.name}=${sessionToken}`,
			},
		});

		return response.data;
	} catch (error) {
		return null;
	}
});
