import { Categories } from "@/components/home/Categories";
import { Hero } from "@/components/home/Hero";
import ImpactMetrics from "@/components/home/ImpactMetrics";
import Newsletter from "@/components/home/Newsletter";
import { TrendingIdeas } from "@/components/home/TrendingIdeas";

export default function HomePage() {
	return (
		<main>
			<Hero />
			<ImpactMetrics />
			<Categories />
			<TrendingIdeas />
			<Newsletter />
		</main>
	);
}
