"use client";

import { useState } from "react";
import Link from "next/link";
import {
	TbDotsVertical,
	TbEye,
	TbMessageReport,
	TbEdit,
	TbTrash,
	TbPhotoOff,
} from "react-icons/tb";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuPositioner,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Idea } from "@/services/ideas";

export function MyIdeasTable({ ideas }: { ideas: Idea[] }) {
	const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
	const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

	const openFeedbackModal = (feedback: string) => {
		setSelectedFeedback(feedback);
		setIsFeedbackModalOpen(true);
	};

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow className="bg-zinc-900/50 border-zinc-800 hover:bg-transparent">
						<TableHead className="w-100">Idea</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="w-12 text-right"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{ideas.map((idea) => (
						<TableRow key={idea.id}>
							<TableCell className="font-medium">
								<div className="flex items-center gap-3">
									{idea.thumbnail ? (
										<img
											src={idea.thumbnail}
											alt={idea.title}
											className="size-12 rounded-sm object-cover"
										/>
									) : (
										<div className="size-12 flex items-center justify-center rounded-sm bg-zinc-800/75">
											<TbPhotoOff className="size-6 text-zinc-500" />
										</div>
									)}
									<span
										className="truncate max-w-75"
										title={idea.title}
									>
										{idea.title}
									</span>
								</div>
							</TableCell>

							<TableCell className="text-zinc-300">
								{idea.category.name}
							</TableCell>

							<TableCell>
								{idea.isPaid ? (
									<span className="font-medium text-yellow-500">
										${idea.price}
									</span>
								) : (
									<span className="font-medium text-primary">Free</span>
								)}
							</TableCell>

							<TableCell>
								<span
									className={`px-2 py-1 rounded-sm text-xs font-medium border ${
										idea.status === "APPROVED"
											? "bg-lime-500/10 text-lime-400 border-lime-500/20"
											: idea.status === "REJECTED"
												? "bg-red-500/10 text-red-400 border-red-500/20"
												: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
									}`}
								>
									{idea.status}
								</span>
							</TableCell>

							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger className="size-8 flex items-center justify-center rounded-sm text-zinc-300 hover:text-foreground hover:bg-zinc-800 transition-colors">
										<span className="sr-only">Open Menu</span>
										<TbDotsVertical className="size-5" />
									</DropdownMenuTrigger>
									<DropdownMenuPositioner align="end">
										<DropdownMenuContent className="bg-zinc-950 border-zinc-800">
											{idea.status === "APPROVED" && (
												<DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer">
													<Link
														href={`/ideas/${idea.id}`}
														className="flex items-center"
													>
														<TbEye className="mr-2 size-4" />
														View Details
													</Link>
												</DropdownMenuItem>
											)}

											{idea.status === "REJECTED" &&
												idea.rejectionFeedback && (
													<DropdownMenuItem
														onClick={() =>
															openFeedbackModal(
																idea.rejectionFeedback!,
															)
														}
														className="hover:bg-zinc-900 cursor-pointer"
													>
														<TbMessageReport className="mr-2 size-4" />
														View Feedback
													</DropdownMenuItem>
												)}

											{idea.status !== "APPROVED" && (
												<>
													<DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer">
														<TbEdit className="mr-2 size-4" />
														Edit
													</DropdownMenuItem>
													<DropdownMenuItem className="hover:bg-destructive/10 cursor-pointer text-destructive">
														<TbTrash className="mr-2 size-4" />
														Delete
													</DropdownMenuItem>
												</>
											)}
										</DropdownMenuContent>
									</DropdownMenuPositioner>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Dialog
				open={isFeedbackModalOpen}
				onOpenChange={setIsFeedbackModalOpen}
			>
				<DialogContent className="bg-zinc-950 border-zinc-800 sm:max-w-106">
					<DialogHeader>
						<DialogTitle className="text-destructive flex items-center gap-2">
							<TbMessageReport className="size-5" />
							Rejection Feedback
						</DialogTitle>
						<DialogDescription className="text-zinc-400 pt-2">
							The reviewer left the following notes regarding your idea. You can
							use this feedback to improve your submission.
						</DialogDescription>
					</DialogHeader>
					<div className="mt-4 rounded-md bg-destructive/5 border border-destructive/10 p-4 text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
						{selectedFeedback}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
