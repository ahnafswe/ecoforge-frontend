"use client";

import { AuthGuard } from "@/components/shared/AuthGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/authClient";
import { addComment, Comment, getComments } from "@/services/comments";
import { getIdeaById, Idea } from "@/services/ideas";
import { vote } from "@/services/votes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as TbIcons from "react-icons/tb";

export function IdeaDetails({ id }: { id: string }) {
	const queryClient = useQueryClient();
	const { data: sessionData } = authClient.useSession();

	const [isURLCopied, setIsURLCopied] = useState(false);

	const { register, handleSubmit, reset } = useForm({
		defaultValues: { content: "" },
	});

	const { data: comments, isLoading: isCommentsLoading } = useQuery<Comment[]>({
		queryKey: ["comment", id],
		queryFn: () => getComments(id),
	});

	const {
		data: idea,
		isLoading,
		isError,
	} = useQuery<Idea>({
		queryKey: ["idea", id],
		queryFn: () => getIdeaById(id),
	});

	const voteMutation = useMutation({
		mutationFn: vote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["idea", id] });
		},
	});

	const commentMutation = useMutation({
		mutationFn: addComment,
		onSuccess: () => {
			reset();
			queryClient.invalidateQueries({ queryKey: ["comment", id] });
		},
	});

	const handleShare = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setIsURLCopied(true);
			setTimeout(() => setIsURLCopied(false), 2000);
		} catch (err) {
			console.error(err);
		}
	};

	const onSubmitComment = (data: { content: string }) => {
		commentMutation.mutate({ ideaId: id, content: data.content });
	};

	if (isLoading || isCommentsLoading) {
		return (
			<div className="flex min-h-96 w-full items-center justify-center">
				<TbIcons.TbLoader2 className="size-12 animate-spin text-primary" />
			</div>
		);
	}

	if (isError || !idea) {
		return (
			<div className="flex min-h-96 w-full items-center justify-center text-foreground/60">
				<p className="text-2xl font-medium">Idea not found</p>
			</div>
		);
	}

	const IconComponent =
		TbIcons[idea.category.icon as keyof typeof TbIcons] || TbIcons.TbQuestionMark;

	return (
		<div className="container mx-auto max-w-3xl max-lg:px-4 py-8">
			<section className="mb-8 flex flex-col gap-5">
				{idea.thumbnail ? (
					<div className="relative aspect-2/1 w-full overflow-hidden rounded-3xl bg-zinc-900/75 group">
						<img
							src={idea.thumbnail}
							alt={idea.title}
							className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
						/>
						{idea.isPaid && (
							<div className="absolute right-4 top-4 rounded-sm bg-yellow-500 px-3 py-1 text-sm font-bold text-background">
								${idea.price}
							</div>
						)}
					</div>
				) : (
					<div className="relative flex aspect-2/1 w-full items-center justify-center rounded-3xl bg-zinc-900/75">
						<TbIcons.TbPhotoOff className="size-20 text-foreground/30" />
						{idea.isPaid && (
							<div className="absolute right-4 top-4 rounded-sm bg-yellow-500 px-3 py-1 text-sm font-bold text-background">
								${idea.price}
							</div>
						)}
					</div>
				)}

				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-3">
						<span className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary flex items-center gap-x-1.5">
							<IconComponent className="size-4.5" />
							{idea.category.name}
						</span>
						<span className="flex items-center gap-x-1.5 text-sm font-medium text-foreground/50">
							<TbIcons.TbCalendar className="size-4.5" />
							{new Date(idea.publishedAt!).toLocaleDateString(undefined, {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</span>
					</div>

					<h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
						{idea.title}
					</h1>

					<div className="flex items-center gap-3">
						{idea.author.image ? (
							<img
								src={idea.author.image}
								alt={idea.author.name}
								className="size-11 rounded-full object-cover"
							/>
						) : (
							<div className="size-11 rounded-full bg-zinc-900/75" />
						)}
						<div className="flex flex-col">
							<span className="font-medium text-foreground/90">
								{idea.author.name}
							</span>
							<span className="-mt-0.5 text-sm text-foreground/60">
								{idea.author.email}
							</span>
						</div>
					</div>
				</div>
			</section>

			<div className="h-px w-full bg-zinc-800/75" />

			<section className="my-8 flex flex-col gap-6">
				<div className="flex flex-col gap-3">
					<h2 className="text-xl font-semibold">The Problem</h2>
					<div className="rounded-xl border border-destructive/20 bg-destructive/5 px-5 py-4 text-foreground/80">
						{idea.problem}
					</div>
				</div>

				<div className="flex flex-col gap-3">
					<h2 className="text-xl font-semibold">The Solution</h2>
					<div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-foreground/80">
						{idea.solution}
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-semibold">Brief Description</h2>
					<div className="text-foreground/80">{idea.description}</div>
				</div>
			</section>

			<div className="h-px w-full bg-zinc-800/75" />

			<section className="mt-8 flex flex-col gap-8">
				<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
					{sessionData?.user ? (
						<div className="flex items-center gap-3 rounded-md border border-zinc-800/75 bg-zinc-900/50 px-3 py-1.5 text-foreground/70">
							<div className="flex items-center gap-1">
								<button
									onClick={() =>
										voteMutation.mutate({ ideaId: id, type: "UPVOTE" })
									}
									disabled={voteMutation.isPending}
								>
									<TbIcons.TbArrowBigUp
										className={`size-6 transition-colors hover:text-primary/75 ${idea.userVote === "UPVOTE" && "text-primary"}`}
									/>
								</button>
								<span className="text-center text-lg font-medium">
									{idea.upvoteCount}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<button
									onClick={() =>
										voteMutation.mutate({ ideaId: id, type: "DOWNVOTE" })
									}
									disabled={voteMutation.isPending}
								>
									<TbIcons.TbArrowBigDown
										className={`size-6 transition-colors hover:text-primary/75 ${idea.userVote === "DOWNVOTE" && "text-primary"}`}
									/>
								</button>
								<span className="text-center text-lg font-medium">
									{idea.downvoteCount}
								</span>
							</div>
						</div>
					) : null}

					<Button
						onClick={handleShare}
						variant="outline"
						size="lg"
						className="font-medium shadow-sm text-base gap-x-3"
					>
						{isURLCopied ? (
							<>
								<TbIcons.TbCheck className="size-5 text-primary" />
								Link Copied
							</>
						) : (
							<>
								<TbIcons.TbShare className="size-5" />
								Share
							</>
						)}
					</Button>
				</div>

				<div className="flex flex-col gap-4">
					<div className="flex items-end justify-between gap-4">
						<h3 className="text-xl font-bold tracking-tight">Discussion</h3>
						<h4 className="font-medium text-foreground/60">
							{comments?.length || "No"} comments
						</h4>
					</div>

					<form
						onSubmit={handleSubmit(onSubmitComment)}
						className="relative flex items-center"
					>
						<Input
							{...register("content", { required: true })}
							placeholder="Add your feedback..."
							className="h-10 bg-zinc-900/25"
						/>
						<Button
							type="submit"
							variant="ghost"
							className="size-9 font-bold bg-[#0d0d0f] hover:bg-zinc-900 absolute right-2 rounded-sm"
							disabled={commentMutation.isPending}
						>
							<TbIcons.TbSend className="size-5 text-foreground/50" />
						</Button>
					</form>

					<div className="mt-4 flex flex-col gap-4">
						{comments?.map((comment: Comment) => (
							<div
								key={comment.id}
								className="flex gap-3"
							>
								{comment.user.image ? (
									<img
										src={comment.user.image}
										alt={comment.user.name}
										className="size-10 rounded-full object-cover"
									/>
								) : (
									<div className="size-10 rounded-full bg-white/10" />
								)}
								<div>
									<p className="text-sm font-semibold text-foreground">
										{comment.user.name}
									</p>
									<p className="mt-0.5 text-xs font-medium text-foreground/50">
										{new Date(comment.createdAt).toLocaleString(undefined, {
											year: "numeric",
											month: "short",
											day: "numeric",
											hour12: true,
											hour: "numeric",
											minute: "2-digit",
										})}
									</p>
									<p className="mt-1 text-sm text-foreground/80">
										{comment.content}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
