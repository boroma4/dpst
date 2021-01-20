import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.default,
        // marginTop: theme.spacing(8),
        padding: theme.spacing(2, 0),
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '2vh',
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    {'DPST'}
                    {new Date().getFullYear()}
                    {' • '}
                    <a style={{color:'gray'}} href={'https://github.com/boroma4/dpst'}>Github</a>
                </Typography>
            </Container>
        </footer>
    );
}
