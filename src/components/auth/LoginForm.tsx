"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/authClient";
import { toast } from "sonner";

export function LoginForm() {
	const router = useRouter();

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
			const { data, error } = await authClient.signIn.email({
				email: formData.email,
				password: formData.password,
				callbackURL: `${window.location.origin}/ideas`,
			});

			if (error) {
				throw new Error();
			}

			return data;
		},
		onSuccess: () => {
			toast.success("Ta-da! It worked.");
			router.replace("/ideas");
		},
		onError: () => {
			toast.error("That was embarrassing. Try again?");
		},
	});

	const onSubmit = (data: any) => {
		loginMutation.mutate(data);
	};

	return (
		<div className="w-full">
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
