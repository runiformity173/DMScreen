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






$npc class
barbarian {7,stat block:[berserker,low:[dex|wis|int|cha],high:[str|con]]}
bard {7,stat block:[performer],low:[str|con|wis|int],high:[str|dex|int|cha]}
cleric {15,stat block:[priest],low:[str|dex|con|int|cha],high:[str|con|wis]}
druid {7,stat block:[druid],low:[str|dex|con|int|cha],high:[con|wis|int]}
fighter {16,stat block:[warrior veteran],low:[str|dex|con|wis|int|cha],high:[str|dex|con|wis|int|cha]}
monk {6,stat block:[bandit captain (modified)],low:[int|cha],high:[dex|con|wis]}
paladin {6,stat block:[knight],low:[dex|wis|int],high:[str|con|cha]}
ranger {6,stat block:[scout captain],low:[str|dex|con|int|cha],high:[dex|con|wis]}
rogue {14,stat block:[spy|scout captain],low:[str|con|wis|int|cha],high:[dex|int|cha]}
sorcerer {5,stat block:[mage apprentice],low:[str|dex|con|wis|int],high:[con|cha]}
warlock {5,stat block:[cultist fanatic],low:[str|dex|con|wis|int],high:[dex|con|cha]}
wizard {6,stat block:[mage apprentice],low:[str|dex|con|wis|cha],high:[dex|wis|int]}

$npc occupation
academic {5,stat block:[commoner|commoner|spy],low:[str|dex|con|wis|cha],high:[str|dex|con|wis|int|cha]}
adventurer ([npc class,#class]) {5,stat block:[#class,?stat block],low:[#class,?low],high:[#class,?high]}
aristocrat {1,stat block:[noble],low:[str|dex|con|wis|int|cha],high:[str|dex|con|wis|int|cha]}
[artisan|guild member] {15,stat block:[commoner|commoner|tough],low:[con|wis|cha],high:[str|dex|con|wis|int|cha]}
criminal {5,stat block:[spy|bandit|scout|tough|bandit|bandit captain|pirate],low:[str|dex|con|wis|int|cha],high:[str|dex|con]}
entertainer {5,stat block:[performer],low:[str|dex|con|wis|int],high:[dex|int|cha]}
[exile|hermit|refugee] {2,stat block:[commoner|scout|commoner],low:[str|dex|con|wis|int|cha],high:[str|dex|con|wis|int|cha]}
[explorer|wanderer] {5,stat block:[scout],low:[str|dex|con|wis|int|cha],high:[str|dex|con|wis|int]}
[farmer|herder] {12,stat block:[commoner],low:[str|dex|con|wis|int|cha],high:[str|dex|con|wis|int|cha]}
[hunter|trapper] {5,stat block:[scout],low:[con|int|cha],high:[str|dex|con|wis|int|cha]}
laborer {15,stat block:[commoner|commoner|warrior infantry],low:[dex|con|wis|int|cha],high:[str|dex|con|wis|cha]}
merchant {5,stat block:[commoner|noble],low:[str|dex|con|wis|int|cha],high:[str|dex|con|wis|int|cha]}
[politician|bureaucrat] {5,stat block:[noble|commoner],low:[str|dex|con|wis|int],high:[cha|wis|int|cha]}
priest {5,stat block:[priest|priest acolyte|priest acolyte],low:[str|dex|con|int|cha],high:[int|wis|cha]}
sailor {5,stat block:[pirate|scout|commoner|tough],low:[dex|wis|int|cha],high:[str|dex|con|wis|int|cha]}
soldier {5,stat block:[guard|tough],low:[dex|wis|int|cha],high:[str|dex|con|wis|int|cha|str|con]}

$npc race
human {40,extra:[]}
dwarf {10,extra:[]}
elf {10,extra:[wood|high|dark] }
halfling {10,extra:[]}
dragonborn {5,extra:[green|red|white|black|blue|brass|bronze|silver|gold|copper] }
gnome {5,extra:[forest|rock] }
goliath {5,extra:[fire|hill|storm|stone|cloud|frost] }
orc {5,extra:[]}
tiefling {5,extra:[abyssal|cthonic|infernal] }
aasimar {extra:[]}
half-elf {extra:[wood|high|dark] }
tibaxi {extra:[],0}
genasi {extra:[fire|water|earth|air] }

$npc alignment
chaotic evil {0.5}
chaotic good {0.5}
chaotic neutral {1}
lawful evil {9}
neutral evil {46}
neutral {104}
neutral good {46}
lawful good {4.5}
lawful neutral {4.5}

$npc chaotic evil ideal
[npc chaotic ideal] {2}
[npc evil ideal] {2}
[npc any ideal]

$npc chaotic neutral ideal
[npc chaotic ideal] {3}
[npc neutral ideal]
[npc any ideal]

$npc chaotic good ideal
[npc chaotic ideal] {2}
[npc good ideal] {2}
[npc any ideal]

$npc neutral evil ideal
[npc neutral ideal]
[npc evil ideal] {3}
[npc any ideal]

$npc neutral good ideal
[npc neutral ideal]
[npc good ideal] {3}
[npc any ideal]

$npc lawful evil ideal
[npc lawful ideal] {2}
[npc evil ideal] {2}
[npc any ideal]

$npc lawful neutral ideal
[npc lawful ideal] {3}
[npc neutral ideal]
[npc any ideal]

$npc lawful good ideal
[npc lawful ideal] {2}
[npc good ideal] {2}
[npc any ideal]

$npc lawful ideal
community
fairness
honor
logic
responsibility
tradition

$npc chaotic ideal
creativity
change
no limits
whimsy
freedom
independence

$npc good ideal
charity
greater good
life
beauty
respect
self-sacrifice

$npc evil ideal
greed
domination
might
retribution
slaughter
pain

$npc neutral ideal
knowledge
"live and let live"
people
balance
moderation
neutrality

$npc any ideal
aspiration
discovery
glory
nation
redemption
self-knowledge

$npc name
[a|be|de|el|fa|jo|ki|la|ma|na|o|pa|re|se|si|ta||||][bar|ched|dell|far|gran|hal|jen|kel|lim|mor|net|penn|quil|rond|sark|shen|tur|vash|yor|zen][|a|ac|ai|al|am|an|ar|ea|el|er|ess|ett|ic|id|il|in|is|or|us]

$npc gender
male {possessive:his,subject:he,object:him}
female {possessive:her,subject:she,object:her}

$npc common first name
[adrik|alvyn|aurora|eldeth|eldon|farris|kathra|kellen|lily|nissa|xinli|zorra]
$npc common last name
[brightsun|dundragon|frostbeard|garrick|goodbarrel|greycastle|ironfist|jaerin|merryweather|redthorn|stormriver|wren]
$npc lyrical first name
[arannis|damaia|darsis|dweomer|evabeth|jhessail|keyleth|netheria|orianna|sorcyl|umarion|velissa]
$npc lyrical last name
[arvannis|brawnanvil|daardendrian|drachedandion|endryss|meliamne|mishann|silverfrond|snowmantle|summerbreeze|thunderfoot|zashir]
$npc guttural first name
[abzug|bajok|bharash|grovis|gruuna|hokrun|mardred|rhogar|skuldark|thokk|urzul|varka]
$npc guttural last name
[burska|gruuthok|hrondl|jarzzok|kraltus|shamog|skrangval|ungart|uuthrakt|vrakir|yuldra|zulrax]
$npc monosyllabic first name
[chen|creel|dain|dorn|flint|glim|henk|krusk|nox|nyx|rukh|shan]
$npc monosyllabic last name
[dench|drog|dusk|holg|horn|imsh|jask|keth|ku|kung|mott|quaal]
$npc sinister first name
[arachne|axyss|carrion|grinnus|melkhis|morthos|nadir|scandal|skellendyre|thaltus|valkora|vexander]
$npc sinister last name
[doomwhisper|dreadfield|gallows|hellstryke|killraven|nightblade|norixius|shadowfang|valtar|winterspell|xandros|zarkynzorn]
$npc whimsical first name
[cricket|daisy|dimble|ellywick|erky|fiddlestyx|fonkin|golly|mimsy|pumpkin|quarrel|sybilwick]
$npc whimsical last name
[borogove|goldjoy|hoddypeak|huddle|jollywind|oneshoe|scramblewise|sunnyhill|tallgrass|timbers|underbough|wimbly]
$npc family elf name
[aloro|amakiir|amastacia|ariessus|arnuanna|berevan|caerdonel|caphaxath|casilltenirra|cithreth|dalanthan|eathalena|erenaeth|ethanasath|fasharash|firahel|floshem|galanodel|goltorah|hanali|holimion|horineth|iathrana|ilphelkiir|iranapha|koehlanna|lathalas|liadon|meliamne|mellerelel|mystralath|naïlo|netyoive|ofandrus|ostoroth|othronus|qualanthri|raethran|rothenel|selevarun|siannodel|suithrasas|sylvaranth|teinithra|tiltathana|wasanthi|withrethin|xiloscient|xistsrith|yaeldrin]
$npc female elf name
[adrie|ahinar|althaea|anastrianna|andraste|antinua|arara|baelitae|bethrynna|birel|caelynn|chaedi|claira|dara|drusilia|elama|enna|faral|felosial|hatae|ielenia|ilanis|irann|jarsali|jelenneth|keyleth|leshanna|lia|maiathah|malquis|meriele|mialee|myathethil|naivara|quelenna|quillathe|ridaro|sariel|shanairla|shava|silaqui|sumnes|theirastra|thiala|tiaathque|traulam|vadania|valanthe|valna|xanaphia] [npc family elf name]
$npc male elf name
[adran|aelar|aerdeth|ahvain|aramil|arannis|aust|azaki|beiro|berrian|caeldrim|carric|dayereth|dreali|efferil|eiravel|enialis|erdan|erevan|fivin|galinndan|gennal|hadarai|halimath|heian|himo|immeral|ivellios|korfel|lamlis|laucian|lucan|mindartis|naal|nutae|paelias|peren|quarion|riardon|rolen|soveliss|suhnae|thamior|tharivol|theren|theriatis|thervan|uthemar|vanuath|varis] [npc family elf name]
$npc clan dwarf name
[aranore|balderk|battlehammer|bigtoe|bloodkith|bofdann|brawnanvil|brazzik|broodfist|burrowfound|caebrek|daerdahk|dankil|daraln|deepdelver|durthane|eversharp|fallack|fireforge|foamtankard|frostbeard|glanhig|goblinbane|goldfinder|gorunn|graybeard|hammerstone|helcral|holderhek|ironfist|loderr|lutgehr|morigak|orcfoe|rakankrak|ruby-eye|rumnaheim|silveraxe|silverstone|steelfist|stoutale|strakeln|strongheart|thrahak|torevir|torunn|trollbleeder|trueanvil|trueblood|ungart]
$npc male dwarf name
[adrik|alberich|baern|barendd|beloril|brottor|dain|dalgal|darrak|delg|duergath|dworic|eberk|einkil|elaim|erias|fallond|fargrim|gardain|gilthur|gimgen|gimurt|harbek|kildrak|kilvar|morgran|morkral|nalral|nordak|nuraval|oloric|olunt|orsik|oskar|rangrim|reirak|rurik|taklinn|thoradin|thorin|thradal|tordek|traubon|travok|ulfgar|uraim|veit|vonbin|vondal|whurbin] [npc clan dwarf name]
$npc female dwarf name
[anbera|artin|audhild|balifra|barbena|bardryn|bolhild|dagnal|dariff|delre|diesa|eldeth|eridred|falkrunn|fallthra|finellen|gillydd|gunnloda|gurdis|helgret|helja|hlin|ilde|jarana|kathra|kilia|kristryd|liftrasa|marastyr|mardred|morana|nalaed|nora|nurkara|oriff|ovina|riswynn|sannl|therlin|thodris|torbera|tordrid|torgga|urshar|valida|vistra|vonana|werydd|whurdred|yurgunn] [npc clan dwarf name]
$npc clan halfling name
[appleblossom|bigheart|brightmoon|brushgather|cherrycheeks|copperkettle|deephollow|elderberry|fastfoot|fatrabbit|glenfellow|goldfound|goodbarrel|goodearth|greenbottle|greenleaf|high-hill|hilltopple|hogcollar|honeypot|jamjar|kettlewhistle|leagallow|littlefoot|nimblefingers|porridgepot|quickstep|reedfellow|shadowquick|silvereyes|smoothhands|stonebridge|stoutbridge|stoutman|strongbones|sunmeadow|swiftwhistle|tallfellow|tealeaf|tenpenny|thistletop|thorngage|tosscobble|underbough|underfoot|warmwater|whispermouse|wildcloak|wildheart|wiseacre]
$npc male halfling name
[alton|ander|bernie|bobbin|cade|callus|corrin|dannad|danniel|eddie|egart|eldon|errich|fildo|finnan|franklin|garret|garth|gilbert|gob|harol|igor|jasper|keith|kevin|lazam|lerry|lindal|lyle|merric|mican|milo|morrin|nebin|nevil|osborn|ostran|oswalt|perrin|poppy|reed|roscoe|sam|shardon|tye|ulmo|wellby|wendel|wenner|wes] [npc clan halfling name]
$npc female halfling name
[alain|andry|anne|bella|blossom|bree|callie|chenna|cora|dee|dell|eida|eran|euphemia|georgina|gynnie|harriet|jasmine|jillian|jo|kithri|lavinia|lidda|maegan|marigold|merla|myria|nedda|nikki|nora|olivia|paela|pearl|pennie|philomena|portia|robbie|rose|saral|seraphina|shaena|stacee|tawna|thea|trym|tyna|vani|verna|wella|willow] [npc clan halfling name]
$npc clan gnome name
[albaratie|bafflestone|beren|boondiggles|cobblelob|daergel|dunben|fabblestabble|fapplestamp|fiddlefen|folkor|garrick|gimlen|glittergem|gobblefirn|gummen|horcusporcus|humplebumple|ironhide|leffery|lingenhall|loofollue|maekkelferce|miggledy|munggen|murnig|musgraben|nackle|ningel|nopenstallen|nucklestamp|offund|oomtrowl|pilwicken|pingun|quillsharpener|raulnor|reese|rofferton|scheppen|shadowcloak|silverthread|sympony|tarkelby|timbers|turen|umbodoben|waggletop|welber|wildwander]
$npc male gnome name
[alston|alvyn|anverth|arumawann|bilbron|boddynock|brocc|burgell|cockaby|crampernap|dabbledob|delebean|dimble|eberdeb|eldon|erky|fablen|fibblestib|fonkin|frouse|frug|gerbo|gimble|glim|igden|jabble|jebeddo|kellen|kipper|namfoodle|oppleby|orryn|paggen|pallabar|pog|qualen|ribbles|rimple|roondar|sapply|seebo|senteq|sindri|umpen|warryn|wiggens|wobbles|wrenn|zaffrab|zook] [npc clan gnome name]
$npc female gnome name
[abalaba|bimpnottin|breena|buvvie|callybon|caramip|carlin|cumpen|dalaba|donella|duvamil|ella|ellyjoybell|ellywick|enidda|lilli|loopmottin|lorilla|luthra|mardnab|meena|menny|mumpena|nissa|numba|nyx|oda|oppah|orla|panana|pyntle|quilla|ranala|reddlepop|roywyn|salanop|shamil|siffress|symma|tana|tenena|tervaround|tippletoe|ulla|unvera|veloptima|virra|waywocket|yebe|zanna] [npc clan gnome name]
$npc clan dragonborn name
[akambherylliax|argenthrixus|baharoosh|beryntolthropal|bhenkumbyrznaax|caavylteradyn|chumbyxirinnish|clethtinthiallor|daardendrian|delmirev|dhyrktelonis|ebynichtomonis|esstyrlynn|fharngnarthnost|ghaallixirn|grrrmmballhyst|gygazzylyshrift|hashphronyxadyn|hshhsstoroth|imbixtellrhyst|jerynomonis|jharthraxyn|kerrhylon|kimbatuul|lhamboldennish|linxakasendalor|mohradyllion|mystan|nemmonis|norixius|ophinshtalajiir|orexijandilin|pfaphnyrennish|phrahdrandon|pyraxtallinost|qyxpahrgh|raghthroknaar|shestendeliath|skaarzborroosh|sumnarghthrysh|tiammanthyllish|turnuroth|umbyrphrael|vangdondalor|verthisathurgiesh|wivvyrholdalphiax|wystongjiir|xephyrbahnor|yarjerit|zzzxaaxthroth]
$npc male dragonborn name
[adrex|arjhan|azzakh|balasar|baradad|bharash|bidreked|dadalan|dazzazn|direcris|donaar|fax|gargax|ghesh|gorbundus|greethen|heskan|hirrathak|ildrex|kaladan|kerkad|kiirith|kriv|maagog|medrash|mehen|mozikth|mreksh|mugrunden|nadarr|nithther|norkruuth|nykkan|pandjed|patrin|pijjirik|quarethon|rathkran|rhogar|rivaan|sethrekar|shamash|shedinn|srorthen|tarhun|torinn|trynnicus|valorean|vrondiss|zedaar] [npc clan dragonborn name]
$npc female dragonborn name
[akra|aasathra|antrara|arava|biri|blendaeth|burana|chassath|daar|dentratha|doudra|driindar|eggren|farideh|findex|furrele|gesrethe|gilkass|harann|havilar|hethress|hillanot|jaxi|jezean|jheri|kadana|kava|korinn|megren|mijira|mishann|nala|nuthra|perra|pogranix|pyxrin|quespa|raiann|rezena|ruloth|saphara|savaran|sora|surina|synthrin|tatyan|thava|uadjit|vezera|zykroff] [npc clan dragonborn name]
[abad|ahrim|akmen|amnon|andram|astar|balam|barakas|bathin|caim|chem|cimer|cressel|damakos|ekemon|euron|fenriz|forcas|habor|iados|kairon|leucis|mamnen|mantus|marbas|melech|merihim|modean|mordai|mormo|morthos|nicor|nirgel|oriax|paymon|pelaios|purson|qemuel|raam|rimmon|sammal|skamos|tethren|thamuz|therai|valafar|vassago|xappan|zepar|zephan]
$npc virtue tiefling name
[ambition|art|carrion|chant|creed|death|debauchery|despair|doom|doubt|dread|ecstasy|ennui|entropy|excellence|fear|glory|gluttony|grief|hate|hope|horror|ideal|ignominy|laughter|love|lust|mayhem|mockery|murder|muse|music|mystery|nowhere|open|pain|passion|poetry|quest|random|reverence|revulsion|sorrow|temerity|torment|tragedy|vice|virtue|weary|wit]
$npc male tiefling name
[abad|ahrim|akmen|amnon|andram|astar|balam|barakas|bathin|caim|chem|cimer|cressel|damakos|ekemon|euron|fenriz|forcas|habor|iados|kairon|leucis|mamnen|mantus|marbas|melech|merihim|modean|mordai|mormo|morthos|nicor|nirgel|oriax|paymon|pelaios|purson|qemuel|raam|rimmon|sammal|skamos|tethren|thamuz|therai|valafar|vassago|xappan|zepar|zephan]
[npc virtue tiefling name]
$npc female tiefling name
[akta|anakis|armara|astaro|aym|azza|beleth|bryseis|bune|criella|damaia|decarabia|ea|gadreel|gomory|hecat|ishte|jezebeth|kali|kallista|kasdeya|lerissa|lilith|makaria|manea|markosian|mastema|naamah|nemeia|nija|orianna|osah|phelaia|prosperine|purah|pyra|rieta|ronobe|ronwe|seddit|seere|sekhmet|semyaza|shava|shax|sorath|uzza|vapula|vepar|verin]
[npc virtue tiefling name]
$npc male orc name
[argran|braak|brug|cagak|dench|dorn|dren|druuk|feng|gell|gnarsh|grumbar|gubrash|hagren|henk|hogar|holg|imsh|karash|karg|keth|korag|krusk|lubash|megged|mhurren|mord|morg|nil|nybarg|odorr|ohr|rendar|resh|ront|rrath|sark|scrag|sheggen|shump|tanglar|tarak|thar|thokk|trag|ugarth|varg|vilberg|yurk|zed]
$npc female orc name
[arha|baggi|bendoo|bilga|brakka|creega|drenna|ekk|emen|engong|fistula|gaaki|gorga|grai|greeba|grigi|gynk|hrathy|huru|ilga|kabbarg|kansif|lagazi|lezre|murgen|murook|myev|nagrette|neega|nella|nogu|oolah|ootah|ovak|ownka|puyet|reeza|shautha|silgre|sutha|tagga|tawar|tomph|ubada|vanchu|vola|volen|vorka|yevelda|zagga]
$npc male human name
[npc common first name] [npc common last name] {6}
[npc monosyllabic first name] [npc common last name] {2}
[npc common first name] [npc monosyllabic last name] {2}
[npc sinister first name] [npc common last name]
[npc common first name] [npc sinister last name]
[npc lyrical first name] [npc common last name]
[npc common first name] [npc lyrical last name]
[npc whimsical first name] [npc common last name]
[npc common first name] [npc whimsical last name]
[npc guttural first name] [npc common last name]
[npc common first name] [npc guttural last name]
$npc female human name
[npc male human name]
$npc male half-elf name
[npc male human name]
[npc male elf name]
$npc female half-elf name
[npc femal human name]
[npc female elf name]
$npc male aasimar name
[npc male human name]
$npc female aasimar name
[npc female human name]
$npc male genasi name
[npc common first name] [npc common last name] {2}
[npc monosyllabic first name] [npc common last name] {2}
[npc common first name] [npc monosyllabic last name] {2}
[npc lyrical first name] [npc common last name]
[npc common first name] [npc lyrical last name]
[npc guttural first name] [npc common last name] {2}
[npc common first name] [npc guttural last name] {2}
$npc female genasi name
[npc male genasi name]
$npc male goliath name
[npc common first name] [npc common last name]
[npc monosyllabic first name] [npc common last name]
[npc common first name] [npc monosyllabic last name]
[npc monosyllabic first name] [npc monosyllabic last name]
[npc guttural first name] [npc common last name] {2}
[npc common first name] [npc guttural last name] {2}
[npc guttural first name] [npc guttural last name] {3}
$npc female goliath name
[npc male goliath name]
$npc high str
[muscular|sinewy|protective|direct]
$npc low str
[weak|self-conscious|indirect|slight]
$npc high dex
[lithe|dynamic|fidgety|poised]
$npc low dex
[jittery|clumsy|hesitant|unsteady]
$npc high con
[energetic|vigorous|hearty|stable]
$npc low con
[frail|squeamish|lethargic|fragile]
$npc high wis
[serene|considerate|attentive|wary]
$npc low wis
[rash|distracted|oblivious|naive]
$npc high int
[decisive|logical|informative|curious]
$npc low int
[artless|illogical|uninformed|frivolous]
$npc high cha
[charming|commanding|hilarious|inspiring]
$npc low cha
[pedantic|humorless|reserved|tactless]
$npc ability score
[str|dex|con|wis|int|cha]

$npc appearance
[wears distinctive jewelry|wears [flamboyant|outlandish|formal|ragged] clothes|uses [an] [elegant|simple] [wheeled chair|brace|cane]|has a pronounced scar|has [an unusual eye color|heterochromia]|has [many tattoos|many piercings|a prominent tattoo|a prominent piercing]|has a birthmark|has an unusual hair color|[is bald|has [a braided beard|braided hair]]|has a distinctive, [large|bulbous|angular|tiny] nose|has distinctively [stooped|rigid] posture|is exceptionally [beautiful|ugly]]

$npc secret
[is in disguise, concealing [[#gender,?possessive] identity|some aspect of [#gender,?possessive] appearance].|is currently [planning|executing|covering up] a crime.|has been threatened with harm to [[#gender,?object]self|[#gender,?possessive] family] unless [#gender,?subject] does something.|is under a magical compulsion (perhaps a geas spell or some kind of curse) to behave in a certain way.|is [seriously ill|in terrible pain].|feels responsible for someone's [death|ill fortune].|is on the brink of financial ruin.|is [desperately lonely|harboring an unrequited passion].|nurses a powerful ambition.|is deeply [dissatisfied|unhappy].|[doubts [#gender,?object]self often|has frequent worries].|knows a [compromising|condemning] secret about someone important.|envies another creature's [station|possessions].|is prone to [foolhardy bravery|arrogance|greed].]

$npc
[npc race,#race,hidden][npc gender,#gender,hidden][npc occupation,#occupation,hidden][Npc [#gender] [#race] name,title] is [an] [#gender] [#race,?extra][#race] ([npc alignment,#alignment]). [#gender,?subject,cap] is [npc high [#occupation,?high,!as]] but [npc low [#occupation,?low,!as]], and [npc appearance]. [#gender,?subject,cap] [works as|is|is] [an] [#occupation] who [lives for|lives for] [npc [#alignment] ideal], but [#gender,?subject] [npc secret]<br><br>Use the [#occupation,?stat block,title] stat block.
`.replaceAll(/((?<=[,{])\n\s{4})|(\n(?=}))/g,"");

function tableToOr(table) {
    let trueFinal = []
    for (let j = 1;j<table.rows[0].length;j++) {
        let final = [];
        const counts = new Set();
        for (const e of table.rows) {
            const a = e[0];
            const b = e[j];
            if (a.replaceAll(/\d/g,"").length == 0) {
                final.push(b);
                counts.add(1);
            }
            else {
                const [c,d] = a.replaceAll("00","100").split(/[^\d]/g);
                for (let i = Number(c);i<=Number(d);i++) final.push(b);
                counts.add(Number(d)-Number(c)+1);
            }
        }
        if (counts.size == 1) {
            final = []
            for (const e of table.rows) final.push(e[j]);
        }
        trueFinal.push("["+final.join("|").toLowerCase()+"]");
    }
    return trueFinal.join(" ");
}