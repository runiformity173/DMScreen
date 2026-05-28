/*

properties: weapon, melee, ranged, armor, shield, metal, leather, wood, wielded, worn, cloth

rarities: common, uncommon, rare, very rare, legendary

*/
const baseItems = {
	"longsword":["weapon","melee","metal","wielded"],
	"longbow":["weapon","ranged","wood","wielded","ammunition"],
	"leather armor":["armor","leather","worn"],
	"chain mail":["armor","metal","worn"],
	"shield":["shield","metal","wielded","armor"],
	"cloak":["cloth","worn"],
};

const enchantments = [
	{
		name: "bonus damage",
		description: "This weapon is imbued with the power of {@aspect}. It deals an extra {@damage} {@damageType} damage on a hit.",
		required: ["weapon","damage_type_aspect"],
		forbidden:[],
	},
	{
		name: "damage resistance",
		description: "This item grants resistance to {@damageType} damage.",
		required: ["damage_type_aspect"],
		forbidden: ["weapon"],
	},
	{
		name: "ashen",
		description: "This weapon is imbued with the power of fire. It deals an extra {@damage} fire damage on a hit.",
		required: ["weapon","wood","fire"],
		forbidden:[],
	},
	{
		name: "warming",
		description: "While wearing this {@item}, you have resistance to cold damage.",
		required: ["worn","fire"],
		forbidden:[],
	},
	{
		name: "heated",
		description: "Attackers that hit you with a melee attack take {@damage} fire damage.",
		required: ["armor","metal","fire"],
		forbidden:[],
	},
	{
		name: "chilling",
		description: "Whenever a creature is hit by this weapon, reduce its speed by 10 feet until the end of its next turn. This effect only applies to each creature once per turn.",
		required: ["weapon","ice"],
		forbidden:[],
	},
	{
		name: "cooling",
		description: "While wearing this {@item}, you have resistance to fire damage.",
		required: ["worn","ice"],
		forbidden:[],
	},
];

const aspects = {
	"fire": {
		damage: {
			uncommon: "1d4",
			rare: "1d6",
			veryRare: "2d6",
			legendary: "4d6"
		},
		extra: ["damage_type_aspect"],
		damageType: "fire",
	},
	"ice": {
		damage: {
			uncommon: "1d4",
			rare: "1d8",
			veryRare: "2d8",
			legendary: "3d8"
		},
		extra: ["damage_type_aspect"],
		damageType: "cold",
	},
}

function choice(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function getValidEnchantments(tags) {
	return enchantments.filter(enchantment => {
		return enchantment.required.every(requiredTag => tags.includes(requiredTag)) && !enchantment.forbidden.some(forbiddenTag => tags.includes(forbiddenTag));
	});
}
let results = {uncommon:{},rare:{},veryRare:{},legendary:{}};
function generateMagicItem(baseItem,rarity) {
	const aspect = choice(Object.keys(aspects));
	const tags = baseItems[baseItem].concat(aspects[aspect].extra || []);
	tags.push(aspect);
	const validEnchantments = getValidEnchantments(tags);
	if (validEnchantments.length === 0) {
		console.log("No valid enchantments for ", tags);
		return baseItem;
	}
	const enchantments = [];
	enchantments.push(choice(validEnchantments));
	for (const i of enchantments) {
		results[rarity][i.name] = (results[rarity][i.name] || 0) + 1;
	}
	let final = enchantments[0].name + " " + baseItem + " (" + rarity + ")\n" + enchantments.map(o=>o.description).join("\n");
	final = final
	.replaceAll("{@item}", baseItem)
	.replaceAll("{@damage}", aspects[aspect].damage[rarity])
	.replaceAll("{@aspect}", aspect)
	.replaceAll("{@damageType}", aspects[aspect].damageType);
	return final;
}
function generateRandomMagicItem() {
	const item = Object.keys(baseItems)[Math.floor(Math.random() * Object.keys(baseItems).length)];
	const rarity = choice(["uncommon","rare","veryRare","legendary"]);
	return generateMagicItem(item,rarity);
}

function testEnchantments() {
	results = {uncommon:{},rare:{},veryRare:{},legendary:{}};
	for (let i = 0; i < 10000; i++) {
		generateRandomMagicItem();
	}
	console.log(results);
}
function getActionItem() {
	const allTags = ["weapon","melee","ranged","armor","shield","metal","leather","wood","wielded","worn","cloth","damage_type_aspect","fire","ice"];
	let valid = ["hi"];
	let tags = [];
	while (valid.length > 0 || tags[0] == tags[1]) {
		tags = [];
		tags.push(choice(allTags));
		tags.push(choice(allTags));
		valid = getValidEnchantments(tags);
	}
	console.log(tags[0],"+",tags[1]);
}
console.log(generateRandomMagicItem());	