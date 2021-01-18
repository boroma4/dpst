import React, {FunctionComponent, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CodeColumn from "../../components/CodeColumn/CodeColumn";
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import './VisualizerPage.css';
import {TreeNode} from "./Types/TreeNode";

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
    }),
);


const VisualizerPage:FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();
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


    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <CodeColumn/>
                </Grid>
                <Grid item xs>
                    <Tree
                        data={data}
                        height={700}
                        width={1000}
                        textProps={{dy:20}}
                        nodeProps={{r:10}}
                    />
                </Grid>
            </Grid>
        </div>
    )
};

export default VisualizerPage;
