/*
Syntax
DONE:
Tables are defined by "$listName"
[listName] recursively gets something from that list
[a|b|c] returns either a, b, c, etc.
$+listName to expand an existing list
element {0 < weight < 1} to add it with that weight
element {(0 < weight < 100)%} to add it with that weight
Properties: {a: b, c: d} after an element will allow properties.

TODO:
[listName,#identifier] stores the result. Use [#identifier] to retrieve it
Templating: "%1 %2", when returned as part of [listName,%a,%b] will read "a b"
Access properties with [listName,?a]
optional: $include to include other files

*/
const testTables = `
$greeting
Hello {corresponding: World!,10%}
hello {corresponding: world!,0.5}
$
$sayHi
[greeting]
$
`



const generatorTables = {}
function loadTables(data) {
    for (const match of data.matchAll(/\$[^$]+\$/g)) {
        const lines = match[0].slice(1,-1).split("\n");
        let name = lines[0];
        let tableData = [];
        lines.shift();
        if (name[0] == "+") {
            name = name.slice(1);
            tableData = generatorTables[name];
        }
        for (const element of lines) {
            if (element.match(/^\s*$/g)) continue;
            const elData = {value:element.split("{")[0],data:{},weight:1};
            if (element.match(/[^\{]+\s*\{/g)) {
                const extraData = element.split("{")[1].slice(0,-1).split(",");
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
function tableChoose(table) {
    const t = generatorTables[table];
    const totalWeight = t.reduce((a,b)=>{return {weight:a.weight+b.weight}}).weight;
    const r = Math.random()*totalWeight;
    let i = 0;
    for (const j of t) {
        if (r < i+j.weight) return j;
        i += j.weight;
    }
    return "ERROR";
}
function evaluate(str,identifiers={}) {
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
    let final;
    if (inner.includes("|")) {
        const options = inner.split("|");
        final = options[Math.floor(Math.random()*options.length)];
    } else if (inner in generatorTables) {
        final = tableChoose(inner).value;
    } else {
        final = inner;
    }
    return str.slice(0,startingIndex) + evaluate(final,identifiers) + evaluate(str.slice(endingIndex+1),identifiers);
}
loadTables(testTables);
console.log(generatorTables);
console.log(evaluate("[sayHi]"))