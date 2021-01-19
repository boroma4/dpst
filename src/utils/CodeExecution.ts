import {FunctionData} from "../types/types";
import {buildRecursionTree} from "./TreeBuilding";

export function executeJsFunction(this:any, fnData: FunctionData, useMemo: boolean, highlightOverlaps: boolean): any{

    // pure magic
    var fn: Function, _: Function;
    // eslint-disable-next-line
    const userFn: Function = eval(parseFunction(fnData));
    const self = this;
    const callStack: number[] = [];
    const parents: any = {};
    const memo: any = {};
    let nodes = 0;

    function run(...args: any[]): any{
        const currentKey = JSON.stringify(args);
        parents[nodes] = {
            parent: callStack.length > 0 ? callStack[callStack.length - 1] : undefined,
            nodeValue: currentKey
        };

        if(useMemo && memo[currentKey]){
            for (let key of Object.keys(parents)){
                let node = parents[key];
                if(node.nodeValue === currentKey){
                    node.nodeValue += `=>${memo[currentKey]}`
                }
            }
            return memo[currentKey]
        }

        callStack.push(nodes++);
        const result = userFn.apply(self, args);

        for (let key of Object.keys(parents)){
            let node = parents[key];
            if(node.nodeValue === currentKey){
                node.nodeValue += `=>${result}`
            }
        }

        if(useMemo){
            memo[currentKey] = result;
        }

        callStack.pop();
        return result;
    }

    fn = run;
    let result = NaN;
    // eslint-disable-next-line
    const paramsValues = fnData.params.map((param) => eval(param.value));
    if (paramsValues.length > 0) result = fn(...paramsValues);

    return buildRecursionTree(parents, highlightOverlaps);
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

