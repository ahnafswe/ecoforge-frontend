"use client";

import { useState } from "react";
import {
	TbCancel,
	TbDotsVertical,
	TbMessageReport,
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
import { toast } from "sonner";
import { promoteMember, updateMemberStatus, User } from "@/services/users";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function MembersTable({ members }: { members: User[] }) {
	const queryClient = useQueryClient();

	const [isBanReasonModalOpen, setIsBanReasonModalOpen] = useState(false);
	const [selectedBanReason, setSelectedBanReason] = useState<string | null>(null);
	const [isBanModalOpen, setIsBanModalOpen] = useState(false);
	const [memberToBan, setMemberToBan] = useState<User | null>(null);
	const [banReasonInput, setBanReasonInput] = useState<string>("");

	const openBanReasonModal = (banReason: string) => {
		setSelectedBanReason(banReason);
		setIsBanReasonModalOpen(true);
	};

	const openBanModal = (member: User) => {
		setMemberToBan(member);
		setBanReasonInput("");
		setIsBanModalOpen(true);
	};

	const confirmBan = () => {
		if (memberToBan) {
			updateStatusMutation.mutate({ id: memberToBan.id, reason: banReasonInput });
		}
	};

	const promoteMutation = useMutation({
		mutationFn: (id: string) => promoteMember(id),
		onSuccess: () => {
			toast.success("Ta-da! It worked.");
			queryClient.invalidateQueries({ queryKey: ["members"] });
		},
		onError: () => {
			toast.error("That was embarrassing. Try again?");
		},
	});

	const updateStatusMutation = useMutation({
		mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
			updateMemberStatus(id, reason),
		onSuccess: () => {
			toast.success("Ta-da! It worked.");
			queryClient.invalidateQueries({ queryKey: ["members"] });
			setIsBanModalOpen(false);
			setMemberToBan(null);
		},
		onError: () => {
			toast.error("That was embarrassing. Try again?");
		},
	});

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow className="bg-zinc-900/50 border-zinc-800 hover:bg-transparent">
						<TableHead className="w-100">Member</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Joined on</TableHead>
						<TableHead className="w-12 text-right"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{members.map((member) => (
						<TableRow key={member.id}>
							<TableCell className="font-medium">
								<div className="flex items-center gap-3">
									{member.image ? (
										<img
											src={member.image}
											alt={member.name}
											className="size-10 rounded-full object-cover"
										/>
									) : (
										<div className="size-10 flex items-center justify-center rounded-sm bg-zinc-800/75">
											<TbUser className="size-5 text-zinc-500" />
										</div>
									)}
									<span
										className="truncate max-w-75"
										title={member.name}
									>
										{member.name}
									</span>
								</div>
							</TableCell>

							<TableCell className="text-zinc-300">{member.email}</TableCell>

							<TableCell>
								<span
									className={`px-2 py-1 rounded-sm text-[13px] font-medium border ${
										member.isBanned
											? "bg-red-500/10 text-red-400 border-red-500/20"
											: "bg-lime-500/10 text-lime-400 border-lime-500/20"
									}`}
								>
									{member.isBanned ? "Banned" : "Active"}
								</span>
							</TableCell>

							<TableCell className="text-zinc-300">
								{new Date(member.createdAt).toLocaleDateString(undefined, {
									year: "numeric",
									month: "2-digit",
									day: "2-digit",
								})}
							</TableCell>

							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger className="size-8 flex items-center justify-center rounded-sm text-zinc-300 hover:text-foreground hover:bg-zinc-800 transition-colors">
										<span className="sr-only">Open Menu</span>
										<TbDotsVertical className="size-5" />
									</DropdownMenuTrigger>
									<DropdownMenuPositioner align="end">
										<DropdownMenuContent className="bg-zinc-950 border-zinc-800">
											{member.isBanned && member.banReason && (
												<DropdownMenuItem
													onClick={() =>
														openBanReasonModal(member.banReason!)
													}
													className="hover:bg-zinc-900 cursor-pointer"
												>
													<TbMessageReport className="mr-1 size-4" />
													View Ban Reason
												</DropdownMenuItem>
											)}

											<DropdownMenuItem
												onClick={() =>
													promoteMutation.mutate(member.id)
												}
												className="hover:bg-zinc-900 cursor-pointer"
											>
												<TbUserUp className="mr-1 size-4" />
												Promote to Admin
											</DropdownMenuItem>

											{member.isBanned ? (
												<DropdownMenuItem
													onClick={() =>
														updateStatusMutation.mutate({
															id: member.id,
														})
													}
													className="hover:bg-zinc-900 cursor-pointer"
												>
													<TbRestore className="mr-1 size-4" />
													Unban
												</DropdownMenuItem>
											) : (
												<DropdownMenuItem
													onClick={() => openBanModal(member)}
													className="hover:bg-destructive/10 cursor-pointer text-destructive"
												>
													<TbCancel className="mr-1 size-4 text-destructive" />
													Ban
												</DropdownMenuItem>
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
			</Dialog>

			<Dialog
				open={isBanModalOpen}
				onOpenChange={setIsBanModalOpen}
			>
				<DialogContent className="rounded-2xl bg-zinc-950 border-zinc-800 sm:max-w-md">
					<DialogHeader>
						<DialogTitle className="text-destructive flex items-center gap-2">
							<TbCancel className="size-5" />
							Confirm Account Suspension
						</DialogTitle>
						<DialogDescription className="text-zinc-400 pt-2">
							You are about to ban{" "}
							<span className="font-medium text-zinc-300">
								{memberToBan?.name}
							</span>
							. They will lose access to all member features.
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-3">
						<label className="text-sm font-medium text-zinc-300">
							Ban Reason (Optional)
						</label>
						<Textarea
							placeholder="E.g., Usage of bad words"
							className="bg-zinc-900/50 resize-none h-24 border-zinc-800 focus:ring-destructive/50"
							value={banReasonInput}
							onChange={(e) => setBanReasonInput(e.target.value)}
						/>
					</div>

					<div className="flex justify-end gap-3 mt-4 border-t border-zinc-800 pt-4">
						<Button
							variant="outline"
							onClick={() => setIsBanModalOpen(false)}
						>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={confirmBan}
							disabled={updateStatusMutation.isPending}
							className="font-semibold"
						>
							{updateStatusMutation.isPending ? "Banning..." : "Confirm Ban"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
