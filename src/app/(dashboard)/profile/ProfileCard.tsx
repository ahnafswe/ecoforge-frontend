"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TbEdit, TbCheck, TbX, TbCamera, TbLoader2 } from "react-icons/tb";
import { uploadAvatar } from "@/services/media";
import { authClient } from "@/lib/authClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface ProfileFormValues {
	name: string;
}

export function ProfileCard({
	user,
}: {
	user: {
		id: string;
		name: string;
		email: string;
		image?: string;
		role: string;
	};
}) {
	const router = useRouter();
	const [isEditing, setIsEditing] = useState(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<ProfileFormValues>({
		defaultValues: {
			name: user.name || "",
		},
	});

	const updateProfileMutation = useMutation({
		mutationFn: async (data: ProfileFormValues) => {
			let avatarUrl: string | undefined = undefined;

			if (imageFile) {
				avatarUrl = await uploadAvatar(imageFile);
			}

			const { data: updatedUser, error } = await authClient.updateUser({
				name: data.name,
				image: avatarUrl ? avatarUrl : user.image,
			});

			if (error) {
				throw new Error();
			}

			return updatedUser;
		},
		onSuccess: () => {
			setIsEditing(false);
			setImageFile(null);
			toast.success("Ta-da! It worked.");
			router.refresh();
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

	const triggerImageSelect = () => {
		if (isEditing && fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const onSubmit = (data: ProfileFormValues) => {
		updateProfileMutation.mutate(data);
	};

	const cancelEdit = () => {
		setIsEditing(false);
		setImagePreview(null);
		setImageFile(null);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-md bg-zinc-900/25 border border-zinc-800/75 rounded-2xl mx-auto px-6 py-8"
		>
			<div className="flex items-center justify-center gap-6 mb-8">
				<input
					type="file"
					accept="image/*"
					className="hidden"
					ref={fileInputRef}
					onChange={handleImageChange}
				/>

				<div
					onClick={triggerImageSelect}
					className={`relative size-24 rounded-full border-2 border-zinc-800 shrink-0 overflow-hidden ${
						isEditing ? "cursor-pointer group ring-2 ring-primary/50" : ""
					}`}
				>
					{imagePreview || user.image ? (
						<img
							src={imagePreview || user.image}
							alt={user.name}
							className="size-full object-cover"
						/>
					) : (
						<div className="size-full bg-zinc-900 flex items-center justify-center">
							<span className="text-3xl font-bold text-zinc-400">
								{user.name?.charAt(0).toUpperCase()}
							</span>
						</div>
					)}

					{isEditing && (
						<div className="absolute inset-0 bg-black/55 flex items-center justify-center group-hover:bg-black/65 transition-colors">
							<TbCamera className="size-8 text-white/80" />
						</div>
					)}
				</div>

				<div>
					<h2 className="text-2xl font-semibold">{user.name}</h2>
					<p className="text-zinc-400">{user.email}</p>
					<div className="mt-1 inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-primary/10 text-primary border border-primary/25">
						{user.role}
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<div>
					<label className="text-sm font-medium text-zinc-400">Full Name</label>
					<Input
						disabled={!isEditing || isSubmitting}
						{...register("name", { required: "Name is required" })}
						className={`mt-1 h-10 bg-zinc-900/50 ${!isEditing ? "border-transparent" : "border-zinc-800/75"}`}
					/>
				</div>
			</div>

			<div className="mt-8 flex gap-4">
				{isEditing ? (
					<>
						<Button
							type="button"
							variant="outline"
							disabled={isSubmitting}
							onClick={cancelEdit}
							className="font-semibold rounded-sm gap-1"
						>
							<TbX className="size-4.5" />
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isSubmitting}
							className="font-semibold rounded-sm gap-1"
						>
							{isSubmitting ? (
								<TbLoader2 className="size-4.5 animate-spin" />
							) : (
								<TbCheck className="size-4.5" />
							)}
							Save
						</Button>
					</>
				) : (
					<Button
						type="button"
						onClick={() => setIsEditing(true)}
						className="font-semibold rounded-sm gap-1.5"
					>
						<TbEdit className="size-4.5" />
						Edit Profile
					</Button>
				)}
			</div>
		</form>
	);
}
