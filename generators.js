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
    if (scheme == "cap") return str[0].toUpperCase() + str.slice(1);
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
function evaluate(str,passedData={identifiers:{},uniqueSets:{},exclusionGroups:{}}) {
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
    let exclusionGroup = null;
    let capitalization = "default";
    const evaluatedInner = evaluate(inner,passedData);
    if (inner == "an") {
        isAnAn = true;
        final = "an9283751098234774839012";
    } else if (inner == "comma") {
        final = ","
    } else if (inner.includes("|")) {
        const options = argSplit(inner,"|");
        final = options[Math.floor(Math.random()*options.length)];
    } else if (inner.includes(",")) {
        const args = argSplit(inner);
        if (args[0].replace("#","")[0] == args[0].replace("#","")[0].toUpperCase()) {
            if (args[0] == args[0].toUpperCase()) capitalization = "upper";
            else capitalization = "cap";
        }
        const choice = (args[0][0] == "#") ? passedData.identifiers[args[0].slice(1).toLowerCase()] : tableChoose(evaluate(args[0].toLowerCase(),passedData),passedData);
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
            else if (i[0] == "!") exclusionGroup = evaluate(i.slice(1)).toLowerCase();
            else if (i == "hidden") final = "";
            else if (i == "unique") unique = true;
            else if (i == "title") capitalization = "title";
            else if (i == "cap") capitalization = "cap";
            else {
                if (i[0] == i[0].toUpperCase()) {
                    if (i == i.toUpperCase()) capitalization = "upper";
                    else capitalization = "title";
                } else {
                    capitalization = "lower";
                }
            }
        }
    } else if (evaluatedInner.toLowerCase() in generatorTables || evaluatedInner[0] == "#" && evaluatedInner.slice(1).toLowerCase() in passedData.identifiers) {
        if (evaluatedInner.replace("#","")[0] == evaluatedInner.replace("#","")[0].toUpperCase()) {
            if (inner == inner.toUpperCase()) capitalization = "upper";
            else capitalization = "cap";
        }
        final = (evaluatedInner[0] == "#") ? (passedData.identifiers[evaluatedInner.slice(1).toLowerCase()].value||passedData.identifiers[evaluatedInner.slice(1).toLowerCase()]) : tableChoose(evaluatedInner.toLowerCase(),passedData).value;
    } else {
        final = inner;
    }
    let currentSpan = capitalizeString(evaluate(final,passedData),capitalization);
    if (unique && passedData.uniqueSets[inner].has(currentSpan) || exclusionGroup in passedData.exclusionGroups && passedData.exclusionGroups[exclusionGroup].has(currentSpan)) {
        currentSpan = evaluate("["+inner+"]",passedData);
    }
    if (unique) passedData.uniqueSets[inner].add(currentSpan);
    if (exclusionGroup) {
        if (!(exclusionGroup in passedData.exclusionGroups)) passedData.exclusionGroups[exclusionGroup] = new Set();
        passedData.exclusionGroups[exclusionGroup].add(currentSpan);
    }
    const rest = evaluate(str.slice(endingIndex+1),passedData);
    return str.slice(0,startingIndex) + currentSpan + rest;
}
function loadGenerator(box,extraData) {
    box.querySelector(".generatorName").innerHTML = extraData.name;
    box.querySelector(".generatorContent").innerHTML = extraData.content || "";
}
function runGenerator(generator) {
    let result = evaluate("["+generator.toLowerCase()+"]");
    let a = result.matchAll(/[aA][nN]9283751098234774839012/g);
    while (true) {
        let found = false;
        for (const matches of a) {
            const match = matches[0];
            let out;
            out = "aeiou".includes(result[result.indexOf(match)+25]) ? "an" : "a";
            if (match[0] == "A") {
                if (match[1] == "N") {
                    out = out.toUpperCase();
                } else {
                    out = out[0].toUpperCase() + out.slice(1).toLowerCase();
                }
            } else {
                out = out.toLowerCase();
            }
            result = result.replace(match,out);
            found = true;
            break;
        }
        if (!found) break;
        a = result.matchAll(/[aA][nN]9283751098234774839012/g)
    }
    return result;
}
function testGenerator(generator,runs=10000) {
    for (let i = 0;i<runs;i++) runGenerator(generator);
}
function generate(box) {
    box.querySelector(".generatorContent").innerHTML = runGenerator(box.querySelector(".generatorName").innerHTML);
    save(box);
}
loadTables(generatorTablesString);