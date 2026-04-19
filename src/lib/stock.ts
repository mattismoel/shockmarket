import FastFashionVideo from "$lib/videos/FastFashion.webm"
import CigaretteVideo from "$lib/videos/Smoking.webm"
import DroneVideo from "$lib/videos/Drone.webm"
import PlaneVideo from "$lib/videos/Lockheed.webm"

export type Stock = {
	name: string;
	symbol: string;
	description: string;
	priceDelta: number;

	video?: string;

	impacts: Impact[];
}

export type Impact = {
	message: string;

	climate?: number;
	health?: number;
	rights?: number;

	sources?: string[];
}

const RATINGS: string[] = ["Extremely Unethical", "Very Unethical", "Poor", "Neutral", "Good", "Very Ethical", "Extremely Ethical"]

export const STOCKS: Stock[] = [
	{
		name: "Spotify Technology S.A",
		symbol: "SPOT",
		description: "The leading music streaming platform.",
		video: DroneVideo,
		priceDelta: 0.97,
		impacts: [
			{
				message: "Pays artists very little compared to the competition.",
				health: -0.5,
				rights: -0.85,
			},
			{
				message: "Invests in the AI weapon industry.",
				rights: -1.0,
				climate: -0.2,
				sources: [
					"https://www.business-humanrights.org/en/latest-news/spotify-faces-boycott-over-ceos-700m-investment-in-ai-military-defence-startup/",
					"https://www.latimes.com/entertainment-arts/music/story/2025-07-31/spotifys-ceo-owns-an-ai-weapons-company-some-musicians-say-its-time-to-leave"
				]
			},
		]
	},

	{
		name: "H & M Hennes & Mauritz AB",
		symbol: "HNNMY",
		description: "A Swedish clothing company, selling fast fashion at cheaper prices.",
		priceDelta: 1.56,
		video: FastFashionVideo,
		impacts: [
			{
				message: "Outsources work to sweatshops",
				health: -0.9,
				climate: -0.8,
				rights: -1.0,
				sources: [
					"https://environment.upenn.edu/news-events/news/fast-fashion",
					"https://cleanclothes.org/news/2021/hm-nike-and-primark-use-pandemic-to-squeeze-factory-workers-in-production-countries-even-more",
				]
			},
			{
				message: "Waste ends up in the ocean",
				climate: -1.0,
				health: -0.2,
				rights: -0.2,
				sources: [
					"https://www.europarl.europa.eu/topics/en/article/20201208STO93327/fast-fashion-eu-laws-for-sustainable-textile-consumption",
					"https://environment.upenn.edu/news-events/news/fast-fashion",
				]

			}
		],
	},
	{
		name: "Lockheed Martin Cooperation",
		video: PlaneVideo,
		symbol: "LMT",
		description: "The world's largest defense company and the U.S. government's biggest contractor. The company has become a leader in advanced fighter planes, high-tech missiles, and cutting-edge electronics.",
		priceDelta: -2.52,
		impacts: [
			{
				message: "The manufactured weapons are used to kill civilians around the world.",
				climate: -0.2,
				health: -1.0,
				rights: -1.0,
			},
		]
	},
	{
		name: "Meta Platforms, Inc.",
		symbol: "META",
		description: "Owner of multiple social media platforms, i.e. Facebook, Instagram and Snapchat.",
		priceDelta: 1.73,
		impacts: [
			{
				message: "Platforms increase risk of depression and isolation",
				health: -1.0,
				climate: -0.1,
				rights: 0.0,
				sources: [
					"https://pmc.ncbi.nlm.nih.gov/articles/PMC9817115/"
				]
			},
			{
				message: "Data Center infrastructure has huge impact on climate",
				climate: -1.0,
				health: -0.3,
				rights: -0.2,
				sources: [
					"https://edition.cnn.com/2026/03/30/climate/data-centers-are-having-an-underrported",
				]

			},
			{
				message: "Promotes unrealistic body images.",
				health: -1.0,
				rights: -0.4,
				sources: [
					"https://pmc.ncbi.nlm.nih.gov/articles/PMC10363994/",
				]

			}
		],
	},
	{
		name: "Philip Morris International Inc.",
		symbol: "PM",
		video: CigaretteVideo,
		description: "Tbacco company, with products sold in over 180 countries. Marlboro is PMI’s most recognized brand.",
		priceDelta: 2.6,
		impacts: [
			{
				message: "Highly increases risk of lung cancer.",
				climate: -0.2,
				health: -1.0,
				rights: 0.0,
			},
			{
				message: "Cigarette filters are a the single most littered item in the world.",
				climate: -0.8,
				health: -0.3,
			},
			{
				message: "Promotes addictive behaviour.",
				climate: 0.0,
				rights: -0.2,
				health: -0.9
			}
		]
	}
]

export const calculateEthicsRating = (stock: Stock) => {
	const impactRatings = stock.impacts.map(impact => calculateImpactRating(impact))

	let impactSum = 0.0

	impactRatings.forEach(rating => impactSum += rating)

	return impactSum / stock.impacts.length
}

export const calculateImpactRating = (impact: Impact): number => {
	const activeCount = (impact.climate ? 1 : 0) + (impact.health ? 1 : 0) + (impact.rights ? 1 : 0)
	if (activeCount === 0) return 0

	return ((impact.climate ?? 0) + (impact.health ?? 0) + (impact.rights ?? 0)) / activeCount
}

export const getEthicsText = (stock: Stock) => {
	const rating = calculateEthicsRating(stock)
	const normalisedRating = (rating * 0.5) + 0.5

	return RATINGS[Math.floor(normalisedRating * RATINGS.length)]
} 
