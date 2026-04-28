import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getServerSession } from "@/lib/session";

interface AuthGuardProps {
	children: ReactNode;
	redirectTo?: string;
	allowedRoles?: string[];
}

export async function AuthGuard({ children, redirectTo, allowedRoles }: AuthGuardProps) {
	const sessionData = await getServerSession();

	if (!sessionData?.user) {
		if (redirectTo) redirect(redirectTo);
		return null;
	}

	if (allowedRoles && allowedRoles.length > 0) {
		const userRole = sessionData.user.role;

		if (!userRole || !allowedRoles.includes(userRole)) {
			if (redirectTo) redirect(redirectTo);
			return null;
		}
	}

	return <>{children}</>;
}
