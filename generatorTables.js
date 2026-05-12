const generatorTablesString = `

$tavern object
mountain
star
rose

$tavern animal
hydra {special:[tangled|[two|three|seven]-headed]}
lamb {special:[slaughtered|lost]}
dog {special:[barking|whining]}
eel {special:[slippery|slithering|sneaky]}
[dolphin|porpoise] {special:[beached|swimming]}
dwarf {special:[angry|smiling]}
pegasus {special:[galloping|soaring|diving|gliding]}
pony {special:[trotting|pacing]}
[stag|elk] {special:[prancing|hunted]}
wolf {special:[sheep-clothed|lonely]}
[demon|devil] {special:[vanquished|friendly]}
goat {special:[slaughtered|one-horned]}
[spirit|ghost|spectre] {special:[hovering|banished]}
jester {special:[frowning|dejected]}
[eagle|hawk] {special:[screeching|perched]}
satyr {special:[reveling|somber]}
spider {special:[[six|seven|nine|five]-legged|skittering]}

$tavern object adjective
gleaming
silver
golden
gilded
lonely
black
brass

$tavern animal adjective
drunken
silver
golden
staggering
laughing
prancing
running
howling
leering
leaping
roaring
sleeping
lonely
wandering
black

$tavern adjective noun
[tavern animal,#animal,hidden][tavern animal adjective] [#animal] {2}
[tavern object,#object,hidden][tavern object adjective] [#object]
[tavern animal,#animal,hidden][#animal,?special] [#animal]

$tavern name
the [tavern adjective noun]
the [tavern adjective noun] [tavern|tavern|inn]

$tavern type
quiet[[comma] low-key ||||] bar {5}
raucous dive {4}
thieves' guild hangout
gathering place for a secret society
upper-class dining club {2}
gambling den {2}
hotsop for a particular guild {2}
members-only club
music venue {2}

$tavern description intro
[an] {3}
known by the locals as [an]
known as [an]
commonly known as [an]

$reputation
beloved
quite popular

$tavern description
This [reputation] tavern is [tavern description intro] [tavern type,#type].
[Tavern description intro] [tavern type,#type], this tavern is [reputation].

$tavern
<b>[tavern name,title]</b><br>[tavern description]
`.replaceAll(/((?<=[,{])\n\s{4})|(\n(?=}))/g,"");