"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectPositioner,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getCategories } from "@/services/categories";
import { createIdea, CreateIdeaPayload } from "@/services/ideas";
import { uploadIdeaThumbnail } from "@/services/media";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as TbIcons from "react-icons/tb";
import { toast } from "sonner";

export function IdeaFormDialog() {
	const queryClient = useQueryClient();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const { data: categories, isLoading: isLoadingCategories } = useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
	});

	const {
		register,
		handleSubmit,
		control,
		watch,
		reset,
		formState: { errors },
	} = useForm<CreateIdeaPayload>({
		defaultValues: {
			categoryId: "",
			title: "",
			problem: "",
			solution: "",
			description: "",
			isPaid: false,
		},
	});

	const isPaid = watch("isPaid");

	const createMutation = useMutation({
		mutationFn: async (data: CreateIdeaPayload) => {
			let thumbnailUrl: string | undefined = undefined;

			if (imageFile) {
				thumbnailUrl = await uploadIdeaThumbnail(imageFile);
			}

			const payload: CreateIdeaPayload = {
				...data,
				price: data.isPaid ? data.price : undefined,
				thumbnail: thumbnailUrl,
			};

			return createIdea(payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["my-ideas"] });
			toast.success("Ta-da! It worked.");
			setIsOpen(false);
			reset();
			setImageFile(null);
			setImagePreview(null);
		},
		onError: () => {
			toast.error("That was embarrassing. Try again?");
		},
	});

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			if (file.size > 3 * 1024 * 1024) {
				toast.error("That image is a heavy lifter. Keep it under 3MB!");
				return;
			}
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const onSubmit = (data: CreateIdeaPayload) => {
		createMutation.mutate(data);
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				setIsOpen(open);
				if (!open) {
					reset();
					setImageFile(null);
					setImagePreview(null);
				}
			}}
		>
			<DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold transition-all bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3">
				Post Idea
			</DialogTrigger>

			<DialogContent className="sm:max-w-2xl bg-background/60 backdrop-blur-sm border-zinc-800/75 max-h-[80vh] overflow-y-auto rounded-3xl">
				<DialogHeader>
					<DialogTitle className="text-xl">Submit a New Idea</DialogTitle>

					<DialogDescription className="text-zinc-400">
						Detail your idea below. Submissions are reviewed by an admin before
						becoming public.
					</DialogDescription>
				</DialogHeader>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-3 mt-4"
				>
					<div>
						<label
							htmlFor="thumbnail-upload"
							className={`relative w-full aspect-video sm:aspect-3/1 rounded-xl border border-zinc-800 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-colors ${
								!imagePreview && "bg-zinc-900/25 hover:bg-zinc-900/50"
							}`}
						>
							{imagePreview ? (
								<>
									<img
										src={imagePreview}
										alt="Preview"
										className="w-full h-full object-cover opacity-75"
									/>
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="bg-background/80 backdrop-blur-sm text-zinc-300 px-4 py-2 rounded-md font-medium text-sm flex items-center hover:bg-background transition-colors">
											<TbIcons.TbPhotoEdit className="mr-2 size-5" />{" "}
											Change Thumbnail
										</div>
									</div>
								</>
							) : (
								<>
									<TbIcons.TbPhotoPlus className="size-10 text-zinc-500 mb-2" />
									<span className="text-sm font-medium text-zinc-400">
										Click to upload thumbnail
									</span>
								</>
							)}
						</label>
						<input
							type="file"
							id="thumbnail-upload"
							accept="image/*"
							className="hidden"
							onChange={handleImageChange}
						/>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div>
							<label className="text-sm font-medium text-zinc-300">
								Idea Title
							</label>
							<Input
								{...register("title", {
									required: true,
									minLength: 5,
									maxLength: 100,
								})}
								placeholder="What do you call your idea by?"
								className="mt-1 bg-zinc-900/50 border-zinc-800"
							/>
							{errors.title && (
								<p className="text-xs text-destructive">
									Title must be between 5-100 characters.
								</p>
							)}
						</div>

						<div>
							<label className="text-sm font-medium text-zinc-300">
								Category
							</label>
							<Controller
								name="categoryId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={isLoadingCategories}
									>
										<SelectTrigger className="mt-1 w-full bg-zinc-900/50 border-zinc-800">
											<SelectValue
												placeholder={
													isLoadingCategories
														? "Loading..."
														: "Select a category"
												}
											/>
										</SelectTrigger>
										<SelectPositioner align="start">
											<SelectContent className="bg-zinc-950 border-zinc-800">
												{categories?.map((category: any) => {
													const Icon =
														TbIcons[
															category.icon as keyof typeof TbIcons
														] || TbIcons.TbQuestionMark;

													return (
														<SelectItem
															key={category.id}
															value={category.id}
															className="cursor-pointer hover:bg-zinc-900"
														>
															<div className="flex items-center gap-2">
																<Icon className="size-4 text-zinc-400" />
																{category.name}
															</div>
														</SelectItem>
													);
												})}
											</SelectContent>
										</SelectPositioner>
									</Select>
								)}
							/>
						</div>
					</div>

					<div>
						<label className="text-sm font-medium text-zinc-300">The Problem</label>
						<Textarea
							{...register("problem", {
								required: true,
								minLength: 32,
								maxLength: 1000,
							})}
							placeholder="What problem are you solving?"
							className="mt-1 rounded-lg bg-zinc-900/50 border-zinc-800 resize-none h-24"
						/>
					</div>

					<div>
						<label className="text-sm font-medium text-zinc-300">
							The Solution
						</label>
						<Textarea
							{...register("solution", {
								required: true,
								minLength: 32,
								maxLength: 1000,
							})}
							placeholder="How does your idea solve it?"
							className="mt-1 rounded-lg bg-zinc-900/50 border-zinc-800 resize-none h-24"
						/>
					</div>

					<div>
						<label className="text-sm font-medium text-zinc-300">
							Detailed Description
						</label>
						<Textarea
							{...register("description", {
								required: true,
								minLength: 96,
								maxLength: 4096,
							})}
							placeholder="A comprehensive breakdown of your idea..."
							className="mt-1 rounded-xl bg-zinc-900/50 border-zinc-800 resize-y min-h-40"
						/>
					</div>

					<div className="space-y-3">
						<div className="flex items-center gap-3">
							<Controller
								name="isPaid"
								control={control}
								render={({ field }) => (
									<Checkbox
										id="isPaid"
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								)}
							/>
							<div>
								<label
									htmlFor="isPaid"
									className="text-sm cursor-pointer"
								>
									This is a premium idea
								</label>
								<p className="text-[13px] text-zinc-400">
									Check this if you want to lock the detailed description
									behind a paywall.
								</p>
							</div>
						</div>

						{isPaid && (
							<div className="max-w-40">
								<label className="text-sm font-medium text-zinc-300">
									Price
								</label>
								<div className="mt-1 relative">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
										$
									</span>
									<Input
										type="number"
										step="0.01"
										{...register("price", {
											required: isPaid,
											min: 1.0,
											max: 99999.99,
										})}
										className="bg-zinc-900/50 border-zinc-800 pl-7"
										placeholder="0.00"
									/>
								</div>
								{errors.price && (
									<p className="text-xs text-red-400">Invalid price range.</p>
								)}
							</div>
						)}
					</div>

					<div className="flex justify-end gap-3 pt-3 border-t border-zinc-900">
						<Button
							type="button"
							variant="outline"
							onClick={() => setIsOpen(false)}
							className="px-5 h-10"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={createMutation.isPending}
							className="px-5! h-10 font-semibold"
						>
							{createMutation.isPending ? (
								<TbIcons.TbLoader2 className="size-4 animate-spin" />
							) : (
								<TbIcons.TbSend className="size-4" />
							)}
							Submit for Review
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
