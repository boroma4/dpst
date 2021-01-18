import {FunctionData, lang, Variable} from "../types/types";

export function compileInput(inputCode: string, inputCall: string, language: lang): FunctionData {

    let functionName = 'ewwwwwwwewaeaw';

    if(language === 'javascript'){
        functionName = inputCode.substring(inputCode.indexOf('function') + 'function'.length + 1, inputCode.indexOf('('));
        functionName = ` ${functionName}(`
    }

    while(inputCode.includes(functionName)){
        inputCode = inputCode.replace(functionName, ' fn(');
    }

    inputCall = inputCall.replace(functionName, ' fn(');

    // eslint-disable-next-line no-eval
    return group(inputCode, inputCall, []);
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

export const ungroup = (fnData: FunctionData) => {
    const { params, body, variables } = fnData;

    const paramsNames = params.map(({ name }) => name).join(',');
    const paramsValues = params.map(({ value }) => value).join(',');

    const var1 = variables && variables[0];
    const var2 = variables && variables[1];

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

