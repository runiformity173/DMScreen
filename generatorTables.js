const magicItemTables = `
$rarity
common {4}
uncommon {6}
rare {5}
very rare {2}
legendary {1}

$aspect
necrotic {hard material:[bone|dark steel],leathery material:[leather|cured flesh],damage type:necrotic}
celestial {hard material:[mithral|rose gold],leathery material:[leather|unicorn hide],damage type:radiant}

$item
sword {material:hard material}
plate armor {material:hard material}
leather armor {material:leathery material}

$magic item
[rarity,#rarity,hidden][item,#item,hidden][aspect,#aspect,hidden][#Rarity] magic [#item]. It is made of [#aspect,?[#item,?material]] and deals [#aspect,?damage type] damage.
`;