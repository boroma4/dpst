import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CodeColumn from "../../components/CodeColumn/CodeColumn";
import Paper from "@material-ui/core/Paper";

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

export default function () {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <CodeColumn/>
                </Grid>
                <Grid item xs>
                    <Paper className={classes.paper}>Visualizer</Paper>
                </Grid>
            </Grid>
        </div>
    )
}
