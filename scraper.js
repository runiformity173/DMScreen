async function getItem() {
	document.querySelector("body > main > div > div.container.mx-auto.max-w-6xl > section > div.relative.p-6.md\\:p-10 > div.grid.grid-cols-1.lg\\:grid-cols-3.gap-8 > div.lg\\:col-span-2.space-y-6 > div.sticky.top-24 > div > div.border-b.border-border\\/60.bg-white\\/70.px-5.py-4.md\\:px-6 > div > button:nth-child(3)").click();
	while (document.querySelector("body > main > div > div.container.mx-auto.max-w-6xl > section > div.relative.p-6.md\\:p-10 > div.grid.grid-cols-1.lg\\:grid-cols-3.gap-8 > div.lg\\:col-span-2.space-y-6 > div:nth-child(1) > div.p-6.pt-0.space-y-4 > button").textContent.includes("Generating")) {}
	const rarity = document.querySelector("body > main > div > div.container.mx-auto.max-w-6xl > section > div.relative.p-6.md\\:p-10 > div.grid.grid-cols-1.lg\\:grid-cols-3.gap-8 > div.lg\\:col-span-2.space-y-6 > div.sticky.top-24 > div > div.min-h-\\[320px\\].px-5.py-5.md\\:px-6 > div > div > h3:nth-child(1)").textContent;
	return rarity;
}