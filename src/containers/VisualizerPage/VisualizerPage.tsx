import React, {FunctionComponent, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CodeColumn from "../../components/CodeColumn/CodeColumn";
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import './VisualizerPage.css';
import {TreeNode} from "./Types/TreeNode";
import {useWindowSize} from "../../hooks/useWindowSize";

interface Props {
    tree:TreeNode
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        codeCol: {
            overflowY:'auto',
            height:'85vh',
        },
    }),
);


const VisualizerPage:FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();
    const windowSize = useWindowSize();
    const [data, setData] = useState<TreeNode|undefined>(props.tree);

    const generateTree = () =>{
        return(
            <Tree
                data={data}
                height={windowSize.height * 0.85}
                width={windowSize.width * 0.7}
                textProps={{dy:20}}
                nodeProps={{r:10}}
                keyProp={'w'} // hack
                animated
            />
        )
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={5} md={3} className={classes.codeCol}>
                    <CodeColumn setRecursionTree={setData}/>
                </Grid>
                <Grid item xs={7} md={3}>
                    {generateTree()}
                </Grid>
            </Grid>
        </div>
    )
};

export default VisualizerPage;
