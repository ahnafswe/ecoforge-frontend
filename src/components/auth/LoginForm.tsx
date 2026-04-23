"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/authClient";
import { TbAlertCircle } from "react-icons/tb";

export function LoginForm() {
	const router = useRouter();
	const [globalError, setGlobalError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const loginMutation = useMutation({
		mutationFn: async (formData: any) => {
			const { data, error: authError } = await authClient.signIn.email({
				email: formData.email,
				password: formData.password,
				callbackURL: `${window.location.origin}/ideas`,
			});

			if (authError) {
				throw new Error(authError.message || "Invalid email or password.");
			}

			return data;
		},
		onSuccess: () => {
			router.push("/ideas");
			router.refresh();
		},
		onError: (error: any) => {
			setGlobalError(error.message || "An unexpected error occurred.");
		},
	});

	const onSubmit = (data: any) => {
		setGlobalError(null);
		loginMutation.mutate(data);
	};

	return (
		<div className="w-full">
			{globalError && (
				<div className="mb-4 -mt-2 flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive">
					<TbAlertCircle className="size-4 shrink-0" />
					<p>{globalError}</p>
				</div>
			)}

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-2"
			>
				<div className="flex flex-col gap-1.5">
					<label className="text-sm font-semibold text-foreground/80">Email</label>
					<Input
						{...register("email", {
							required: "Email is required",
							pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
						})}
						type="email"
						placeholder="tobi.mey@gmail.com"
					/>
					{errors.email && (
						<span className="text-xs text-destructive">
							{errors.email.message?.toString()}
						</span>
					)}
				</div>

				<div className="flex flex-col gap-1.5">
					<label className="text-sm font-semibold text-foreground/80">Password</label>
					<Input
						{...register("password", {
							required: "Password is required",
						})}
						type="password"
						placeholder="••••••••"
					/>
					{errors.password && (
						<span className="text-xs text-destructive">
							{errors.password.message?.toString()}
						</span>
					)}
				</div>

				<Button
					type="submit"
					size="lg"
					className="mt-2 font-bold"
					disabled={loginMutation.isPending}
				>
					{loginMutation.isPending ? "Logging in..." : "Login"}
				</Button>
			</form>
		</div>
	);
}
