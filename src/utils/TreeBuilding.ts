import {TreeNode} from "../containers/VisualizerPage/Types/TreeNode";

export const buildRecursionTree = (parentsObject: any, highlightOverlaps:boolean, id: number = 0) => {
    const node: TreeNode = {
        name: parentsObject[id].nodeValue,
        pathProps:'',
        children:[],
        gProps: {
            className: highlightOverlaps && hasDuplicates(parentsObject, id) ? 'red-node' : '',
        }
    };
    let currentChildren = findChildrenIds(parentsObject, id);

    for (let childId of currentChildren){
        const childNode = buildRecursionTree(parentsObject, highlightOverlaps, childId);
        node.children.push(childNode)
    }
    return node;
};

const findChildrenIds = (parentsObject: any, parent: number): Array<number> =>{

    const res: number[] = [];
    for (const key of Object.keys(parentsObject)){
        if(parentsObject[key].parent === parent){
            res.push(Number(key))
        }
    }
    return res;
};

const hasDuplicates = (parentsObject: any, parent: number): boolean =>{

    let count = 0;
    for (const key of Object.keys(parentsObject)){
        if(parentsObject[key].nodeValue === parentsObject[parent].nodeValue){
            count++;
        }
    }
    return count > 1;
};
