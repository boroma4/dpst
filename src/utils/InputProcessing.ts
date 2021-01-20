import {FunctionData, LangName, Variable} from "../types/types";
import {requestPythonToJs} from "./TranslationRequest";

const legalSymbols = [' ', '+', '-', '(', '*'];

export async function compileInput(inputCode: string, inputCall: string, inputVariables: Variable[], language: LangName): Promise<FunctionData> {

    if(language === 'javascript'){
        let functionName = inputCode.substring(inputCode.indexOf('function') + 'function'.length + 1, inputCode.indexOf('('));
        functionName = ` ${functionName}(`;
        inputCall = inputCall.replace(functionName, ' fn(');

        while(inputCode.includes(functionName) && functionName !== ' fn('){
            inputCode = inputCode.replace(functionName, ' fn(');
        }
    }else if(language === 'python'){
        let functionName = inputCode.substring(inputCode.indexOf('def') + 'def'.length + 1, inputCode.indexOf('('));
        functionName = ` ${functionName}(`;
        inputCall = inputCall.replace(functionName, ' fn(');

        while(inputCode.includes(functionName) && functionName !== ' fn('){
            inputCode = inputCode.replace(functionName, ' fn(');
        }
        const response = await requestPythonToJs(inputCode);
        inputCode = response.fn;

        for (const symbol of legalSymbols){
            inputCode = replaceMathFunctions(inputCode, `${symbol}min([`, `${symbol}Math.min(...[`);
            inputCode = replaceMathFunctions(inputCode, `${symbol}max([`, `${symbol}Math.max(...[`);
            inputCode = replaceMathFunctions(inputCode, `${symbol}min(`, `${symbol}Math.min(`);
            inputCode = replaceMathFunctions(inputCode, `${symbol}max(`, `${symbol}Math.max(`);
            inputCode = replaceMathFunctions(inputCode, `${symbol}float("inf")`, `${symbol}Infinity`);
            inputCode = replaceMathFunctions(inputCode, `${symbol}float('inf')`, `${symbol}Infinity`);
        }
        inputCode = fixVariables(inputCode);
    }

    return group(inputCode, inputCall, inputVariables);
}


export const group = (
    fnCode: string,
    fnCall: string,
    fnVars: Variable[]
): FunctionData => {
    const paramsNames = betweenParentesis(fnCode);
    const paramsValues = betweenParentesis(fnCall);

    if (paramsNames.length !== paramsValues.length)
        throw new Error('Incorrect params values');

    const params = paramsNames.map((paramName, i) => ({
        name: paramName,
        value: paramsValues[i],
    }));
    const body = fnCode.substring(
        fnCode.indexOf('{') + 1,
        fnCode.lastIndexOf('}')
    );
    const variables = fnVars.filter(
        ({ name, value }) => name !== '' && value !== ''
    );

    return { params, body, variables }
};

export const ungroup = (fnData: FunctionData, lang: LangName) => {
    const { params, body, variables } = fnData;

    const paramsNames = params.map(({ name }) => name).join(',');
    const paramsValues = params.map(({ value }) => value).join(',');

    const var1 = variables && variables[0];
    const var2 = variables && variables[1];

    if(lang === 'python'){
        return {
            fnCode: `def fn(${paramsNames}): \n${body}\n`,
            fnCall: `fn(${paramsValues})`,
            fnVars: [
                { name: var1?.name || '', value: var1?.value || '' },
                { name: var2?.name || '', value: var2?.value || '' },
            ],
        }
    }

    return {
        fnCode: `function fn(${paramsNames}) {\n${body}\n}`,
        fnCall: `fn(${paramsValues})`,
        fnVars: [
            { name: var1?.name || '', value: var1?.value || '' },
            { name: var2?.name || '', value: var2?.value || '' },
        ],
    }
};

const betweenParentesis = (s: string) => {
    const content = s.substring(s.indexOf('(') + 1, s.indexOf(')'));
    return content === '' ? [] : content.split(',')
};

const replaceMathFunctions = (code: string, wrong: string, correct: string) =>{
    while(code.includes(wrong)){
        code = code.replace(wrong, correct);
    }
    return code;
};

const fixVariables = (code: string): string =>{
    let words = code.split(" ");
    let res = [];
    for (const word of words){
        res.push(...word.split('\n'));
    }
    words = res;
    let registeredVars = new Set();

    for(let i = 0; i < words.length; i++){
        let word = words[i];
        word = word.replace(/[^a-zA-Z0-9]+/g, "").trim();
        if(word === 'var'){
            if(registeredVars.has(words[i+1])){
                words.splice(i, 1);
                i--;
            }
            registeredVars.add(words[i+1])
        }
    }
    return words.join(' ');
};
