/*
Syntax
DONE:
Tables are defined by "$listName"
[listName] recursively gets something from that list
[a|b|c] returns either a, b, c, etc.
$+listName to expand an existing list

TODO:
element {0 < weight < 1} to add it with that weight
element {(0 < weight < 100)%} to add it with that weight
[listName,#identifier] stores the result. Use [#identifier] to retrieve it
Templating: "%1 %2", when returned as part of [listName,%a,%b] will read "a b"
Properties: {a: b, c: d} after an element will allow properties. Access them with [listName,as a]
optional: $include to include other files
Come up with syntax for weights? 3x as common?

*/
const testTables = `
$greeting
Hello
hello
$
$environment
world
World
$
$+greeting
HELLO
$
$sayHi
[greeting] [environment]
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
            const elData = {value:element.split("{")[0],data:{}};
            if (element.match(/[^\{]+\s*\{/g)) {
                const extraData
            }
            tableData.push(elData)
        }
        generatorTables[name] = tableData;
    }
}
function tableChoose(table) {
    const t = generatorTables[table];
    return t[Math.floor(Math.random()*t.length)];
}
function evaluate(str,identifiers={}) {
    console.log(str);
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