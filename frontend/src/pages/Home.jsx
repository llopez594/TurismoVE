import HeroBanner from "../components/home/HeroBanner";
import CategoryGrid from "../components/home/CategoryGrid";
import RecommendedPlaces from "../components/home/RecommendedPlaces";
import RecommendedExperiences from "../components/home/RecommendedExperiences";
import HostCTA from "../components/home/HostCTA";

export default function Home() {
    return (
        <>
            <HeroBanner />
            <div className="container">
                <CategoryGrid />
            </div>
            <div className="container">
                <RecommendedPlaces />
            </div>
            <div className="container">
                <RecommendedExperiences />
            </div>
            <HostCTA />
        </>
    );
}
