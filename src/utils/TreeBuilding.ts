import {TreeNode} from "../containers/VisualizerPage/Types/TreeNode";

export const buildRecursionTree = (parentsObject: any, id: number = 0) => {
    const node: TreeNode = {name: parentsObject[id].nodeValue, pathProps:'', children:[]};
    let currentChildren = findChildrenIds(parentsObject, id);

    for (let childId of currentChildren){
        const childNode = buildRecursionTree(parentsObject, childId);
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
