import React, {FunctionComponent, useState} from "react";
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import './VisualizerPage.css';
import {TreeNode} from "./Types/TreeNode";

interface Props {
    tree:TreeNode
}

const VisualizerPage:FunctionComponent<Props> = (props) => {
    const [data, setData] = useState<TreeNode>(props.tree);

    return(
            <Tree
                data={data}
                height={700}
                width={1000}
                textProps={{dy:20}}
                nodeProps={{r:10}}
            />
    )
};

export default VisualizerPage;

