import { apiClient } from "@/lib/apiClient";

export interface Category {
	id: string;
	icon: string;
	name: string;
	description: string;
}

export const getCategories = async (): Promise<Category[]> => {
	const { data } = await apiClient.get("/categories");

	return data.data.categories;
};
