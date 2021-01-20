import {FunctionData} from "../types/types";
import {buildRecursionTree} from "./TreeBuilding";
import {TreeNode} from "../containers/VisualizerPage/Types/TreeNode";

const MAX_RECURSION_CALLS = 200;

export function executeAndGetTree(this:any, fnData: FunctionData, useMemo: boolean, highlightOverlaps: boolean): TreeNode{

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

        if(nodes > MAX_RECURSION_CALLS){
            throw new Error('Recursion tree too big!');
        }

        const currentKey = JSON.stringify(args);
        parents[nodes] = {
            parent: callStack.length > 0 ? callStack[callStack.length - 1] : undefined,
            nodeValue: currentKey
        };

        callStack.push(nodes++);

        let result;

        if(useMemo && memo[currentKey] === undefined){
            memo[currentKey] = userFn.apply(self, args);
        }

        if(useMemo){
            result = memo[currentKey];
        }else{
            result = userFn.apply(self, args);
        }

        for (let key of Object.keys(parents)){
            let node = parents[key];
            if(node.nodeValue === currentKey){
                node.nodeValue += `=>${result}`
            }
        }

        callStack.pop();
        return result;
    }

    fn = run;
    // eslint-disable-next-line
    const paramsValues = fnData.params.map((param) => eval(param.value));
    fn(...paramsValues);

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

