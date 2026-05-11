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
loadTables(magicItemTables);
console.log(evaluate("[magic item]"));