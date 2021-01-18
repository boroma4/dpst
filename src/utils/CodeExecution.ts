import {FunctionData} from "../types/types";

export function executeJsFunction(this:any, fnData: FunctionData): any{
    // wrapper code goes here

    var fn: Function, _: Function;
    // eslint-disable-next-line
    var userFn: Function = eval(parseFunction(fnData));
    const self = this;
    const calls: string[] = [];

    function run(...args: any[]){
        calls.push(JSON.stringify(args));
        return userFn.apply(self, args);
    }

    fn = run;
    let result = NaN;
    // eslint-disable-next-line
    const paramsValues = fnData.params.map((param) => eval(param.value));
    if (paramsValues.length > 0) result = fn(...paramsValues);
    console.log(calls);
    console.log(result);
}

const parseFunction = (fnData: FunctionData) => {
    const vars = fnData.variables
        ?.map((param) => `${param.name} = ${param.value}`)
        .join(', ');
    const varsDeclaration = (vars && `var ${vars};`) || '';

    const paramsNames = fnData.params.map((param) => param.name).join(', ');

    const fnDeclaration = `_ = function (${paramsNames}) {
    ${varsDeclaration}
    ${fnData.body}
  }`;

    return fnDeclaration
};

