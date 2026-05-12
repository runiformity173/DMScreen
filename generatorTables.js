const magicItemTables = `
$rarity
common {4}
uncommon {6}
rare {5}
very rare {2}
legendary {1}

$vibrant color
red
orange
yellow
green
blue
purple
amber {50%}
vermilion {50%}
magenta {50%}
violet {50%}
turquoise {50%}
chartreuse {50%}



$aspect
necrotic {
    hard material:[bone|dark steel],
    leathery material:[leather|cured flesh],
    cloak material:[black cloth|tattered cloth],
    energy material:[dark energy|tangible darkness],
    wood:[blackened|warped|corrupted] wood,
    damage type:necrotic
}
celestial {
    hard material:[mithral|rose gold],
    leathery material:[leather|unicorn hide],
    cloak material:[silk|[vibrant color] cloth|feathers],
    energy material:[radiant energy|tangible light],
    wood:[hallowed|blessed] wood,
    damage type:radiant
}

$melee weapon feature
Damage Type {description:this [#item] deals [#aspect,?damage type] damage instead of its normal type}

$ranged weapon feature
Damage Type {description:this [#item] deals [#aspect,?damage type] damage instead of its normal type}

$armor feature
Damage Resistance {description:while wearing this [#item][comma] you have resistance to [#aspect,?damage type] damage}

$cloak feature
Damage Resistance {description:while wearing this [#item][comma] you have resistance to [#aspect,?damage type] damage}

$melee weapon
longsword {material:hard material}
shortsword {material:hard material}
club {material:wood}
whip {material:[leathery material|energy material]}

$ranged weapon
longbow {material:wood}
shortbow {material:wood}

$armor
breastplate {material:hard material}
plate {material:hard material}
leather armor {material:leathery material}
studded leather {material:leathery material}

$cloak
robe {material:cloak material}
cloak {material:cloak material}

$item type
melee weapon {extra table:melee weapon feature}
ranged weapon {extra table:ranged weapon feature}
armor {extra table:armor feature}
cloak {extra table:cloak feature}

$item feature
[[#item type,?extra table],#feat]

$display order
It is made of [#aspect,?[#item,?material]].<br>[item feature,unique]: [#feat,?description]

$magic item
[rarity,#rarity,hidden][item type,#item type,hidden][[#item type],#item,hidden][aspect,#aspect,hidden][#Rarity] magic [#item]. [display order]
`.replaceAll(/((?<=[,{])\n\s{4})|(\n(?=}))/g,"");