const testTables = `
$vowel
a
e
i
o
u
y {50%}

$greeting
a {first: H%1llo, second: W%1rld!,50%}
b {first: h%1llo, second: w%1rld!,0.5}

$sayHi
[greeting,#g,hidden][#g,?first,%[vowel,#v]] [#g, ?second,%[#v]]

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
                const extraData = element.split("{")[1].slice(0,-1).split(/,\s*/g);
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
        if (r < i+j.weight) return structuredClone(j);
        i += j.weight;
    }
    return "ERROR";
}
function argSplit(str) {
    let depth = 0;
    let found = -1;
    let ind = 0;
    for (const i of str) {
        ind++;
        if (i == "[") depth++;
        else if (i == "]") depth--;
        else if (i == "," && depth == 0) found = ind-1;
        else if (i != " " && found != -1) {
            const r = argSplit(str.slice(ind-1))
            r.unshift(str.slice(0,found));
            return r;
        }
    }
    return [str];
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
    } else if (inner.includes(",")) {
        const args = argSplit(inner);
        console.log(args,inner)
        const choice = args[0][0] == "#" ? identifiers[args[0].slice(1)] : tableChoose(args[0]);
        args.shift();
        let formatCounter = 1;
        let prop;
        let hidden = false;
        final = choice.value;
        for (const i of args) {
            if (i[0] == "%") {
                if (prop) {
                    choice.data[prop] = choice.data[prop].replaceAll("%"+(formatCounter++),evaluate(i.slice(1),identifiers));
                    final = choice.data[prop];
                } else {
                    choice.value = choice.value.replaceAll("%"+(formatCounter++),evaluate(i.slice(1),identifiers));
                    final = choice.value;
                }
            }
            if (i[0] == "?") {
                prop = evaluate(i.slice(1),identifiers);
                final = choice.data[prop];
            }
            if (i[0] == "#") identifiers[i.slice(1)] = structuredClone(choice);
            if (i == "hidden") final = "";
        }
    } else if (inner in generatorTables || inner[0] == "#" && inner.slice(1) in identifiers) {
        final = inner[0] == "#" ? identifiers[inner.slice(1)].value : tableChoose(inner).value;
    } else {
        final = inner;
    }
    return str.slice(0,startingIndex) + evaluate(final,identifiers) + evaluate(str.slice(endingIndex+1),identifiers);
}
loadTables(testTables);
console.log(generatorTables);
console.log(evaluate("[sayHi]"))