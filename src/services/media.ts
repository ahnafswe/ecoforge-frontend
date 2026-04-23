import { apiClient } from "@/lib/apiClient";

export const uploadAvatar = async (file: File): Promise<string> => {
	const formData = new FormData();
	formData.append("image", file);

	const { data } = await apiClient.post("/media/avatar", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data.imageUrl;
};
