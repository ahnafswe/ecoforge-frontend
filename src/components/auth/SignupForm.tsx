"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/authClient";
import { uploadAvatar } from "@/services/media";
import { TbUpload } from "react-icons/tb";
import { toast } from "sonner";

export function SignupForm() {
	const router = useRouter();
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const currentPassword = watch("password");

	const signupMutation = useMutation({
		mutationFn: async (formData: any) => {
			let avatarUrl: string | undefined = undefined;

			if (imageFile) {
				avatarUrl = await uploadAvatar(imageFile);
			}

			const { data, error } = await authClient.signUp.email({
				email: formData.email,
				password: formData.password,
				name: formData.name,
				image: avatarUrl,
				callbackURL: `${window.location.origin}/ideas`,
			});

			if (error) throw new Error();

			return data;
		},
		onSuccess: () => {
			toast.success("Ta-da! It worked.");
			router.push("/verify-email?status=pending");
		},
		onError: () => {
			toast.error("That was embarrassing. Try again?");
		},
	});

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file.size > 2 * 1024 * 1024) {
				toast.error("That image is a heavy lifter. Keep it under 2MB!");
				return;
			}
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const onSubmit = (data: any) => {
		signupMutation.mutate(data);
	};

	return (
		<div className="w-full">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-2"
			>
				<div className="flex flex-col items-center gap-3">
					<label
						htmlFor="avatar-upload"
						className="group relative flex size-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/15 bg-zinc-900/75 transition-colors hover:border-primary/75 hover:bg-primary/5"
					>
						{imagePreview ? (
							<img
								src={imagePreview}
								alt="Preview"
								className="h-full w-full object-cover"
							/>
						) : (
							<TbUpload className="size-6 text-foreground/50 transition-colors" />
						)}
					</label>
					<input
						id="avatar-upload"
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleImageChange}
					/>
				</div>

				<div className="flex flex-col gap-1.5">
					<label className="text-sm font-semibold text-foreground/80">
						Full Name
					</label>
					<Input
						{...register("name", { required: "Name is required" })}
						type="text"
						placeholder="Tobi Mey"
					/>
					{errors.name && (
						<span className="text-xs text-destructive">
							{errors.name.message?.toString()}
						</span>
					)}
				</div>

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
							minLength: { value: 8, message: "Must be at least 8 characters" },
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

				<div className="flex flex-col gap-1.5">
					<label className="text-sm font-semibold text-foreground/80">
						Confirm Password
					</label>
					<Input
						{...register("confirmPassword", {
							validate: (value) =>
								value === currentPassword || "Passwords do not match",
						})}
						type="password"
						placeholder="••••••••"
					/>
					{errors.confirmPassword && (
						<span className="text-xs text-destructive">
							{errors.confirmPassword.message?.toString()}
						</span>
					)}
				</div>

				<Button
					type="submit"
					size="lg"
					className="mt-2 font-bold"
					disabled={signupMutation.isPending}
				>
					{signupMutation.isPending ? "Creating Account..." : "Create Account"}
				</Button>
			</form>
		</div>
	);
}
