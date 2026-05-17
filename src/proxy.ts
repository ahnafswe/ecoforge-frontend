import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "./lib/authSession";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function proxy(request: NextRequest) {
	const session = await getSessionFromRequest(request);

	console.log("Session:", session);

	// If no session exists, redirect unauthenticated users to /login
	if (!session) {
		const loginUrl = new URL("/login", request.url);

		// Optional: Pass the current path as a redirect parameter so they can return after logging in
		loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

		return NextResponse.redirect(loginUrl);
	}

	// If authenticated, let the request proceed normally
	return NextResponse.next();
}

export const config = {
	matcher: ["/profile/:path*", "/dashboard/:path*"],
};
