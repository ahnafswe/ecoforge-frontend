import { Categories } from "@/components/home/Categories";
import { Hero } from "@/components/home/Hero";
import { TrendingIdeas } from "@/components/home/TrendingIdeas";

export default function HomePage() {
	return (
		<main>
			<Hero />
			<Categories />
			<TrendingIdeas />
		</main>
	);
}
