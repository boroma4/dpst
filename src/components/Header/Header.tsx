import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from '../../icon.png'
import { useHistory } from "react-router-dom";
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        bar: {
            backgroundColor: 'azure',
            zIndex: theme.zIndex.drawer + 1

        },
        logo: {
            '&:hover': {
                cursor: 'pointer',
            }
        },
        option: {
            marginLeft: theme.spacing(4),
            transition: 'all 0.50s',
            '&:hover': {
                cursor: 'pointer',
                opacity: '.5'
            }
        },
    }),
);

export default function Header() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div
            className={classes.root}>
            <AppBar position="fixed" className={classes.bar}>
                <Toolbar variant="dense">
                    <img src={logo} height={50} width={50} alt={'logo'} className={classes.logo} onClick={()=>history.push('/')}/>
                    <Typography variant="h6" color="primary" className={classes.option} onClick={()=>history.push('/theory')}>
                        Theory
                    </Typography>
                    <Typography variant="h6" color="primary" className={classes.option} onClick={()=>history.push('/visualizer')}>
                        Visualizer
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
