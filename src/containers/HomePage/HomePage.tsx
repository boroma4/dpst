import React from "react";
import './HomePage.css'
import {Button, Typography} from "@material-ui/core";
import SubdirectoryArrowRightSharpIcon from '@material-ui/icons/SubdirectoryArrowRightSharp';
import {useHistory} from "react-router-dom";
import {MAIN_PATH} from "../../App";


export default function () {
    const history = useHistory();

    return(
            <Typography>
                <h1>
                    Welcome to self-study guide to Dynamic Programming!
                </h1>
                <h3>
                    Here we will teach you all about dynamic programming.
                </h3>
                <Button onClick={()=>history.push(MAIN_PATH + '/theory')} variant="contained" color="primary" size="large" style={{padding:20, marginBottom:'70px'}}>
                    <text>Click here to start with Theory</text><SubdirectoryArrowRightSharpIcon style={{margin:5}}/>
                </Button>
            </Typography>
    )
}

