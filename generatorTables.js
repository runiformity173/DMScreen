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
quiet[[comma] low-key ||||] bar {5,description:[the barkeep knows everyone's faces and orders, but not their names|people come here for idle chatter or a late meal|everyone in here seems like they casually know each other],food:[cheap and passable|cheap and delicious|moderately priced and delicious|moderately priced and exceptional],reputation:[beloved|out of favor]}
raucous dive {4,description:[the patrons ignore the spilled drink on the floor|a fight at the bar is not uncommon|both the folk in here and their smell take some getting used to],food:[cheap|moderately priced] [but unpleasant|and passable|and delicious],reputation:[[quite |]popular|well known]}
thieves' guild hangout {description:[it's safest for common folk to steer clear|people say to enter with no more than the money you plan to spend[comma] for your pockets will end up empty one way or the other],food:[cheap and surprisingly good|cheap and tasteless|pricey and delicious],reputation:[sketchy|suspicious]}
gathering place for a secret society {description:[it is empty most of the time|the tavern is suspiciously closed one night every week|sometimes[comma] a group of huddled figures glares daggers at servers who interrup them],food:[cheap and surprisingly good|cheap and tasteless|pricey and exotic],reputation:[suspicious|otherwise normal]}
upper-class dining club {2,description:[those without proper dress are turned away at the door|the patrons and servers are prone to snobbishness|this is a prized destination for a night out],food:[exotic and pricey|fancy and expensive],reputation:[exclusive|esteemed]}
gambling den {2,description:[the house always wins[comma] causing scowls but somehow maintaining customers|the desperate are seen being tossed out of the doorway],food:[supplemented with copious alcohol|not the main attraction] [but is quite good|and is unnoteworthy],reputation:[seedy|sketchy|filthy]}
hotspot for a particular guild {2,description:[tools and symbols of the guild are displayed throughout|non-members are ignored until they prove themselves],food:[cheap and passable|cheap and delicious|moderately priced and delicious|moderately priced and exceptional],reputation:[exclusive|specialized]}
members-only club {description:[those without a [signet ring|membership card] are turned away at the door|everyone within has business connections with each other|many an important business arrangement have been negotiated here],food:[free with membership|pricey and delicious],reputation:[exclusive|esteemed]}
music venue {2,description:[local musicians and traveling bards provide near-constant entertainment|performing here is the dream of many local musicians],food:[cheap|moderately priced] [but unpleasant|and passable|and delicious],reputation:[beloved|[quite |]popular]}

$tavern description intro
[an] {3}
known by locals as [an]
known as [an]


$tavern description
This [#type,?reputation] tavern is [tavern description intro] [#type]. [#type,?description,cap]. The food is [#type,?food].
[Tavern description intro] [#type], this tavern is [#type,?reputation]. [#type,?description,cap]. The food is [#type,?food].

$tavern
[tavern type,#type,hidden]<b>[tavern name,title]</b><br>[tavern description]
`.replaceAll(/((?<=[,{])\n\s{4})|(\n(?=}))/g,"");