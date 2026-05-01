"use client";

import { useState } from "react";
import {
	TbCancel,
	TbDotsVertical,
	TbMessageReport,
	TbPhotoOff,
	TbRestore,
	TbUser,
	TbUserUp,
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Idea } from "@/services/ideas";

export function PendingIdeasTable({ ideas }: { ideas: Idea[] }) {
	const queryClient = useQueryClient();

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow className="bg-zinc-900/50 border-zinc-800 hover:bg-transparent">
						<TableHead className="w-100">Idea</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Price</TableHead>
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

							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger className="size-8 flex items-center justify-center rounded-sm text-zinc-300 hover:text-foreground hover:bg-zinc-800 transition-colors">
										<span className="sr-only">Open Menu</span>
										<TbDotsVertical className="size-5" />
									</DropdownMenuTrigger>
									<DropdownMenuPositioner align="end">
										<DropdownMenuContent className="bg-zinc-950 border-zinc-800">
											{/* <DropdownMenuItem
													onClick={() =>
														deleteMutation.mutate(idea.id)
													}
													className="hover:bg-destructive/10 cursor-pointer text-destructive"
												>
													<TbTrash className="mr-1 size-4 text-destructive" />
													Delete
												</DropdownMenuItem> */}
										</DropdownMenuContent>
									</DropdownMenuPositioner>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* <Dialog
				open={isBanReasonModalOpen}
				onOpenChange={setIsBanReasonModalOpen}
			>
				<DialogContent className="rounded-xl bg-zinc-950 border-zinc-800 sm:max-w-106">
					<DialogHeader>
						<DialogTitle className="text-destructive flex items-center gap-2">
							<TbMessageReport className="size-5" />
							Ban Reason
						</DialogTitle>
						<DialogDescription className="text-zinc-400 pt-2">
							The administrator left the following notes regarding the reason for
							this account's suspension.
						</DialogDescription>
					</DialogHeader>
					<div className="rounded-md bg-destructive/5 border border-destructive/10 px-4 py-3 text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
						{selectedBanReason}
					</div>
				</DialogContent>
			</Dialog> */}
		</>
	);
}
