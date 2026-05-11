const testTables = `
$adverb
extremely
very
rather
exceptionally
impressively
somewhat

$exceptional
incredible
amazing
exceptional
impressive
mind-boggling
record-breaking

$land biome
on the seashore
in swamps
[in forests|in tropical forests|in boreal forests]
in mountains
in the desert
in [plains|grasslands|the prairie|the savannah|steppes]
in the [tundra|taiga]
in [arid|frozen] wastelands
on an [archipelago|island]
[in caves|in damp caves]

$sea biome
in shallow water
in rivers
in freshwater
in the ocean
on the ocean floor
in the deep sea
in the abyss
in warm waters
in icy waters
in coral reefs
in oceanic caves
around an [archipelago|island]

$underground biome
under the sand on the seashore
inside holes found in swamps
in burrows in [forests|tropical forests|boreal forests]
in tunnels in mountains
in holes in the desert
in tunnels in [plains|grasslands|the prairie|the savannah|steppes]
in holes in the [tundra|taiga]
in holes in [arid|frozen] wastelands
[in caves|in damp caves]
in tunnels on an [archipelago|island]
deep under the earth's crust

$habitat
land {biome:[land biome],food:[small animals|large animals|fish|insects|rotten meat|grass|leaves|fruits|tree sap|mushrooms|worms],locomotion:[land locomotion,#ll],activity:[climb trees|collect branches],limbs:[#ll,?limbs],mind:[#ll,?mind]}
sea {biome:[sea biome],food:[fish|rotten fish|algae|worms|coral|jellyfish|plankton],locomotion:[sea locomotion,#sl],activity:[dredge up the sand|burrow into the sea floor|assist in swimming],limbs:[#sl,?limbs],mind:[#sl,?mind]}
air {biome:[land biome],40%,food:[small animals|fish|insects|rotten meat|grass|leaves|fruits|tree sap|mushrooms|worms],locomotion:[air locomotion,#al],activity:[collect branches|assist in flight],limbs:[#al,?limbs],mind:[#al,?mind]}
underground {biome:[underground biome],10%,food:[small animals|insects|rotten meat|mushrooms|worms],locomotion:[underground locomotion,#ul],activity:[burrow into the ground|dig through the soil],limbs:[#ul,?limbs],mind:[#ul,?mind]}

$land locomotion
walking {limbs:[legs],mind:[it is slow, but steady|it is [adverb] slow|it can run at [exceptional] speeds|it is one of the fastest animals in the world|its legs make it one of the fastest creatures in the world]}
crawling {limbs:[[legs]|[no legs]],mind:[it can skitter off at [exceptional] speeds when threatened|it crawls [adverb] slowly|when threatened, it forms itself into a wheel and tumbles down slopes],50%}
slithering {limbs:[no legs],mind:[it can slither at [exceptional] speeds when threatened|it slithers [adverb] slowly|it slithers by producing slime below its body|when threatened, it forms itself into a wheel and tumbles down slopes],50%}
hopping {limbs:[[one leg]|[legs]],mind:[it can hop at [exceptional] heights|it can deliver [a|[an] [adverb]] powerful kick|its hopping produces an audible sound],50%}
striding {limbs:[legs],mind:[it is slow, but steady|it takes [adverb] large steps|it is one of the fastest animals in the world],50%}
climbing {limbs:[legs],mind:[it often spends its entire life in trees, without ever touching the ground|it is capable of adhering to any surface],50%}

$sea locomotion
swimming {limbs:[fins],mind:[it can swim at [exceptional] speeds|it is a slow swimmer|it is a clumsy swimmer]}
crawling {limbs:[[legs]|[no legs]],mind:[it can skitter off at [exceptional] speeds when threatened|it often hides itself completely in the sand],50%}
slithering {limbs:[no legs],mind:[it can slither at [exceptional] speeds when threatened|it often hides itself completely in the sand],50%}
floating {limbs:[[fins]|[no legs]],mind:[it is often seen basking in the sunlight|while capable of autonomous propulsion, it often drifts along the currents],50%}

$air locomotion
flying {limbs:[[wings] and [legs]|[wings]],mind:[it can fly at [exceptional] speeds|it is [an] [adverb] clumsy flier|it flies by flapping its wings several hundreds times per minute]}
gliding {limbs:[[wings] and [legs]|[wings]],mind:[it can cover great distances just by gliding|while commonly mistaken as capable of flight, it can only glide from branch to branch],30%}

$underground locomotion
burrowing {limbs:[[legs]|[no legs]],mind:[it can dig [adverb] long tunnels|it often digs elaborate burrows|its burrows are renowned for their [exceptional] scale]}

$color
black
white
pale
dark
ivory {40%}
dark
gray
flesh-colored
brown
yellow
orange
blue
dark blue
bright blue
green
lime {30%}
teal
pink
red
crimson {40%}
purple
mauve
translucent {20%}
bioluminescent {10%}
rainbow-colored {5%}
tan

$head
it has [an] [[slender|elongated|large|wide|twisted|thin|huge|heavy|complicated|misshapen] |][[color] |][[hairy|furry|scaly|fleshy|bald|rough|smooth|wrinkled] |][head|face][facial features] [on|hanging from|stretching above|resting on|protruding from|embedded in|connected to]
[it has no [head|face], only|lacking a face, it consists only of] {5%}

$facial features
[ ]with no apparent features
[ ]with [eyes]
[ ]with [mouth]
[ ]with [head decor]
[ ]with [eyes] and [mouth]
[ ]with [eyes] and [head decor]
[ ]with [mouth] and [head decor]
[ ]with [eyes], [mouth] and [head decor]

$eyes
[beady|glassy|large|small|huge|tiny|empty|sunken|slanted|many|a large number of|bulging|protruding|crazy|tired|wise|cheerful|curious] [[color] |]eyes
[[color] |][compound eyes|antennae|glowing eyes|sensory organs] {40%}
[one large|one tiny|one gigantic|one|one single] [[color]|] eye {20%}

$mouth
[a large gaping mouth|a teethy smile|a peaceful smile|a mouth full of teeth|a wide grin|a thin mouth|thick lips|an elongated snout|a short snout|a protruding mouth|a trumpet-like mouth|mandibles|a mouth full of long sharp teeth|a mouth with several rows of teeth|a twisted smile|a perpetual frown|a vertical mouth|a slit for a mouth|multiple mouths|a complicated mouth|complicated mouth parts|chelicerae|a proboscis|a long beak|a large beak|a massive beak with teeth|a small beak|a porous membrane for a mouth|no apparent mouth]
$head decor
[horns|many horns|a horn|long ears|[adverb] long ears|large ears|floppy ears|protrusions|bulbous protrusions|thorns|spikes|two thin nostrils|a blowhole|an interesting nose|a large nose|thick eyebrows|a tall forehead|a strong jaw|[an] [adverb] long tongue|a split tongue|wispy tendrils|a split jaw|crystalline protrusions|a hard keratin layer|complex facial features]

$body
[an] [[long, |short, |curvy, ]|][sturdy|bulky|muscular|thin|skinny|sickly|skeletal|segmented|stretched|twisted|misshapen] [[#color][ ]|[#color][ ]|[#color] and [color][ ]|]body

$limb descriptor
[little|tiny|thin|large|articulated|segmented|skinny|thick|short|stubby|long|[adverb] long|[adverb] short|slimy|slender] {50%}
$limbs
[#habitat,?limbs]
$leg number
two
four
[two|three|four|five|six|seven|eight|ten|a myriad of|several]
$no legs
no legs
$one leg
one [limb descriptor] [leg|claw|tentacle]
$legs
[leg number] [limb descriptor] [legs|claws|tentacles]
$fins
[leg number] [limb descriptor] [fins|flippers]
$wings
[leg number] [limb descriptor] [wings|bat wings|wings of stretched skin|insect wings|butterfly wings]

$hands
and [hand number] [hand] it uses to [[#habitat,?activity]|catch its food|collect its sustenance|harvest its sustenance|rip its food to pieces|remove parasites|craft simple tools|burrow its food|fight off predators|defend itself]
$hand number
two
[two|three|four|five|six|seven|eight|ten|a myriad of|several] {30%}
$hand
[limb descriptor] [hands|claws|paws|pincers|tentacles|graspers|compound graspers]

$skin color
[#color]
[#color] with [color] [spots|swirls|stripes|dots|stains|marks|patterns|lines|areas|hints|accents] {30%}

$skin
its skin is [skin color]
its skin is [skin color] and [covered in [[color] ||]fur|covered in short [[color] ||]hair|covered in coarse [[color] ||]hair|covered in [[color] ||]feathers|covered in thick [[color] ||]down|covered in thorny protrusions|fuzzy|scaly|oily|slimy|smooth|wrinkly|thick|[adverb] thick|[adverb] thin|leathery|covered in plates|covered in chitin|padded|metallic|rubbery|reflective|covered in holes|porous|covered with slime|[adverb] grainy|[adverb] rough|[adverb] fragile|[adverb] tough]

$diet
[it eats|it feeds on|its diet consists [mainly|mostly|entirely|almost entirely|exclusively] of] [#habitat,?food,unique]
[it eats|it feeds on|its diet consists [mainly |mostly |entirely |almost entirely ||]of] [#habitat,?food,unique] and [#habitat,?food,unique]
[it eats|it feeds on|its diet consists [mainly |mostly |almost entirely ||]of] [#habitat,?food,unique], [#habitat,?food,unique], and [occasionally|every once in a while|when available|sometimes|whenever possible], [#habitat,?food,unique]
[it metabolizes sunlight into nutrients|it absorbs ambient nutrients through its skin|it doesn't need to eat] {2%}

$mind
[mind type,unique]
[mind type,unique] and [mind type,unique]
[mind type,unique]; [mind type,unique], and [mind type,unique] {60%}
[mind type,unique]. [Mind Type,unique], and [mind type,unique]. [Mind Type,unique] {30%}

$pack
[pack|herd|group|swarm|flock|tribe|gathering|colony]

$mind type
[it prefers to live alone|it is relatively social|it lives in small [pack][s]|it lives in [pack][s]|it lives in large [pack][s]|it lives in organized tribes|[an] [pack] of [#name][s] is usually composed of [three|four|five|six|seven|eight|ten|a dozen|about twenty|about thirty|about forty|about fifty|a hundred] individuals]
[it can be [adverb] [aggressive|dangerous|territorial]|it can be dangerous|it is mostly peaceful|it is [adverb] placid|it is [adverb] friendly]
[#habitat,?mind]
[it does not bond well with people|it sometimes lets people approach it|it seldom attacks people|it enjoys the company of people|it can be taught many tricks]
[it is [adverb] territorial|it is [adverb] protective of its offspring|it spends its entire life in the same place|it travels often|it migrates [once a year|twice a year|every two years]]
it [has|possesses|displays] [an] [adverb] [complex|confusing|unique|strange|peculiar|unusual] [communication system|biology|metabolism|mating ritual|life cycle|caste system]
[it is known to hibernate in the cold season|it can go for several [weeks|months|years] without eating]
it [sheds|molts|grows a new skin|regrows its limbs] [often|regularly|every few [days|weeks|months|years]]
[it can produce a toxic slime|it can release ink to escape predators|it can expel its internal organs to confuse attackers]
[its [sting|bite|venom][ is harmless, albeit painful|, albeit painful, is harmless| is highly deadly| is [adverb] potent| has been known to kill a [name] in [an] [exceptional] time]|it is [adverb] [venomous|poisonous]]
[it has been known to eat its offspring|it is known for taking good care of its offspring|it mates for life]
[it has very few predators|its natural predator is the [name]|its predators include the [name], the [name] and the [name]|it has a symbiotic relationship with the [name]|few creatures enjoy eating [#name][s] quite like [name][s]]
[it is exclusively nocturnal|it only comes out during the day|it prefers dark places]
it emits a pungent [smell|odor|gas] [to attract mates|to deter predators|to mark its territory]
[its larval stage is [adverb] long, but it only lives [an] [day|week|couple days|couple weeks|month] as an adult|it can live for over [an] [decade|century]]
[it can emit light|it glows in the dark|it is bioluminescent|it can be seen from a distance at night thanks to its bioluminescent organs]
[in some countries, it is a delicacy|it is part of many traditional recipes|[people used to hunt|some people hunt|poachers often kill] [#name][s] for [their skin|their bones|their blood|their organs][|, which can fetch [a|[an] [adverb]] high price| (said to have therapeutic properties)]]
[it constantly emits [an] [droning|buzzing|humming|snarling|growling|strange] sound|it has [an] [adverb] high-pitched scream|it is renowned for its intimidating [growl|scream]]
[#rareness,?mind]
its young are called [[#name][lets|lings]|[pups|chicks|calves|cubs]]
it [lives|spends most of its life|resides|nests] in [elaborate|complex|simple] [burrows|shelters|holes|nests|hives|dens|tunnels]

$name
[name start][name end] {50%}
[name vowel][name link][name end] {20%}
[name start][name vowel][name link][name end]
[name vowel][name link][name vowel][name link][name end] {20%}
[name start][name vowel][name link][name vowel][name link][name end]
[name vowel][name link][name vowel][name link][name vowel][name link][name end] {20%}
[name start][name vowel][name link][name vowel][name link][name vowel][name link][name end] {20%}
$name start
[b|c|d|f|g|h|j|k|l|m|n|p|r|s|t|v|w|x|z]
[b|c|ch|d|f|g|k|p|ph|s|t|v|z][r|l] {30%}
[ch|st|th|ct|ph|qu|squ|sh] {40%}
$name link
[b|c|d|f|g|h|j|k|l|m|n|p|r|s|t|v|w|x|z]
[b|c|ch|d|f|g|k|p|ph|r|s|t|v|z][r|l|n] {40%}
[ch|rt|rl|rs|rp|rb|rm|st|th|ct|ph|qu|tt|bb|nn|mm|gg|cc|dd|ff|pp|rr|ll|vv|ww|ck|squ|lm|sh|wm|wb|wt|lb|rg] {40%}
$name vowel
[a|e|i|o|u]
[ao|ae|ai|au|ay|eo|ea|ei|ey|io|ia|iu|oa|oe|oi|ou|oy|ui|uo|uy|ee|oo] {15%}
y {2%}
$name end
[id|ant|on|ion|an|in|at|ate|us|oid|aid|al|ark|ork|irk|as|os|e|o|a|y|or|ore|es|ot|at|ape|ope|el|er|ex|ox|ax|ie|eep|ap|op|oop|aut|ond|ont|oth]

$rareness
common {mind:[it is a common sight [#habitat,?biome]|it is [adverb] [common|widespread]|it is considered a pest|it is a common herd animal|[#name][s] are popular as pets]}
unusual {mind:[it is [an] [adverb] unusual sight [#habitat,?biome]|it is [adverb] [uncommon|unusual]|it is often seen in zoos]}
[[adverb] rare|rare] {mind:[it is [an] [adverb] rare sight [#habitat,?biome]|it is [adverb] rare|it is said that spotting [an] [#name] is a sign of [good|bad] luck]}
endangered {mind:[[it is an endangered species|it is [adverb] endangered] and [eating|hunting|selling|keeping them as pets] is [regulated|forbidden|frowned upon]|the populations of [#name][s] have been dwindling in recent years|it is highly sought after by collectors],15%}
cryptic {mind:[its existence is [still up for debate|unconfirmed|unrecognized by the scientific community|rather enigmatic|a mystery]|whether it actually exists is still a mystery|there lacks a concrete proof of its existence|sightings of [#name][s] have increased over the years|many legends surround its existence],5%}

$creature adj
[tiny, parasitic|tiny|[adverb] small|small|large|huge|massive]
[[adverb] ||||][beautiful|hideous|strange|bizarre|peculiar|unusual|majestic|cute]
[#rareness] {10%}
[plant-like|insect-like|alien-looking|vaguely humanoid] {10%}

$creature
[name,#name,hidden][habitat,#habitat,hidden][#habitat,?locomotion,#locomotion,hidden][rareness,#rareness,hidden][color,#color,hidden]<h1>The [#name,Abc]</h1><p>[The <b>[#name]</b> is [an]|[An]|This creature is [an]] [creature adj] [#locomotion] animal that lives [#habitat,?biome]. [Diet]. [Head] [body] with [limbs]. [Skin].<br>[Mind].</p>

$vowel
a
e
i
o
u
y {0.5}

$test
[vowel,unique][vowel,unique][vowel,unique][vowel,unique][vowel,unique][vowel,unique]
`

const generatorTables = {}
function loadTables(data) {
    for (const match of data.matchAll(/\$[^$]+/g)) {
        const lines = match[0].slice(1).split("\n");
        let name = lines[0];
        let tableData = [];
        lines.shift();
        if (name[0] == "+") {
            name = name.slice(1);
            tableData = generatorTables[name];
        }
        for (const element of lines) {
            if (element.match(/^\s*$/g)) continue;
            const elData = {value:element.split(" {")[0],data:{},weight:1};
            if (element.match(/[^\{]+\s*\{/g)) {
                const extraData = argSplit(element.split("{")[1].slice(0,-1));
                for (const ext of extraData) {
                    if (ext.includes(":")) {
                        const [key,val] = ext.split(/:\s*/g);
                        elData.data[key] = val;
                    } else if (ext.includes("%")){
                        elData.weight = Number(ext.slice(0,-1))/100;
                    } else {
                        elData.weight = Number(ext);
                    }
                }
            }
            tableData.push(elData)
        }
        generatorTables[name] = tableData;
    }
}
function tableChoose(table,passedData) {
    const t = generatorTables[table.toLowerCase()];
    const totalWeight = t.reduce((a,b)=>{return {weight:a.weight+b.weight}}).weight;
    const r = Math.random()*totalWeight;
    let i = 0;
    let final = "ERROR";
    for (const j of t) {
        if (r < i+j.weight && r >= i) final = structuredClone(j);
        i += j.weight;
    }
    final.value = evaluate(final.value,passedData);
    return final;
}
function capitalizeString(str,scheme) {
    if (!str) return str;
    if (scheme == "default") return str;
    if (scheme == "upper") return str.toUpperCase();
    if (scheme == "lower") return str.toLowerCase();
    if (scheme == "cap") return str[0].toUpperCase() + str.slice(1).toLowerCase();
    if (scheme == "title") {
        let final = [];
        let i = 0;
        const l = str.split(" ").length;
        for (const word of str.split(" ")) {
            if (["a","an","the","of"].includes(word.toLowerCase()) && i != 0 && i < l-1) final.push(word.toLowerCase());
            else final.push(word[0].toUpperCase()+word.slice(1).toLowerCase());
            i++;
        }
        return final.join(" ");
    }
    return str;
}
function argSplit(str,delim=",") {
    let depth = 0;
    let found = -1;
    let ind = 0;
    for (const i of str) {
        ind++;
        if (found != -1) {
            const r = argSplit(str.slice(ind-1),delim)
            r.unshift(str.slice(0,found));
            return r;
        } else if (i == "[") depth++;
        else if (i == "]") depth--;
        else if (i == delim && depth == 0) found = ind-1;
    }
    if (found > -1) return [str.slice(0,-1),""];
    return [str];
}
function evaluate(str,passedData={identifiers:{},uniqueSets:{}}) {
    const startingIndex = str.indexOf("[");
    if (startingIndex < 0) return str;
    let endingIndex = startingIndex;
    let depth = 1;
    while (endingIndex < str.length && depth > 0) {
        endingIndex++;
        if (str[endingIndex] == "[") depth++;
        else if (str[endingIndex] == "]") depth--;
    }
    const inner = str.slice(startingIndex+1,endingIndex);
    if (!(inner in passedData.uniqueSets)) passedData.uniqueSets[inner] = new Set();
    let final;
    let isAnAn = false;
    let unique = false;
    let capitalization = "default";
    if (inner == "an") {
        isAnAn = true;
        final = "a";
    } else if (inner.includes("|")) {
        const options = argSplit(inner,"|");
        final = options[Math.floor(Math.random()*options.length)];
    } else if (inner.includes(",")) {
        const args = argSplit(inner);
        if (args[0].replace("#","")[0] == args[0].replace("#","")[0].toUpperCase()) {
            if (args[0] == args[0].toUpperCase()) capitalization = "upper";
            else capitalization = "cap";
        }
        const choice = (args[0][0] == "#") ? passedData.identifiers[args[0].slice(1).toLowerCase()] : tableChoose(args[0].toLowerCase(),passedData);
        args.shift();
        let formatCounter = 1;
        let prop;
        let hidden = false;
        final = choice.value;
        for (const i of args) {
            if (i[0] == "%") {
                if (prop) {
                    choice.data[prop] = choice.data[prop].replaceAll("%"+(formatCounter++),evaluate(i.slice(1),passedData));
                    final = choice.data[prop];
                } else {
                    choice.value = choice.value.replaceAll("%"+(formatCounter++),evaluate(i.slice(1),passedData));
                    final = choice.value;
                }
            }
            else if (i[0] == "?") {
                prop = evaluate(i.slice(1),passedData);
                final = choice.data[prop];
            }
            else if (i[0] == "#") passedData.identifiers[i.slice(1).toLowerCase()] = prop?choice.data[prop]:structuredClone(choice);
            else if (i == "hidden") final = "";
            else if (i == "unique") unique = true;
            else {
                if (i[0] == i[0].toUpperCase()) {
                    if (i == i.toUpperCase()) capitalization = "upper";
                    else capitalization = "title";
                } else {
                    capitalization = "lower";
                }
            }
        }
    } else if (inner.toLowerCase() in generatorTables || inner[0] == "#" && inner.slice(1).toLowerCase() in passedData.identifiers) {
        if (inner.replace("#","")[0] == inner.replace("#","")[0].toUpperCase()) {
            if (inner == inner.toUpperCase()) capitalization = "upper";
            else capitalization = "cap";
        }
        final = (inner[0] == "#") ? (passedData.identifiers[inner.slice(1).toLowerCase()].value||passedData.identifiers[inner.slice(1).toLowerCase()]) : tableChoose(inner.toLowerCase(),passedData).value;
    } else {
        final = inner;
    }
    let currentSpan = capitalizeString(evaluate(final,passedData),capitalization);
    if (unique && passedData.uniqueSets[inner].has(currentSpan)) {
        currentSpan = evaluate("["+inner+"]",passedData);
    }
    passedData.uniqueSets[inner].add(currentSpan);
    const rest = evaluate(str.slice(endingIndex+1),passedData);
    if (isAnAn && rest.length > 0 && ("aeiou".includes(rest[0].toLowerCase()) || rest[0] == " " && rest.length > 1 && "aeiou".includes(rest[1].toLowerCase()))) {
        final += "n";
        currentSpan = capitalizeString(final,capitalization);
    }
    return str.slice(0,startingIndex) + currentSpan + rest;
}
loadTables(testTables);
console.log(evaluate("[creature]"));