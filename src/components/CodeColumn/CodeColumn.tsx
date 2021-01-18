import React, {useState} from "react";
import FunctionTextInput from "../FunctionTextInput/FunctionTextInput";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {lang} from "../../types/types";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop:'5px'
        },
    }),
);


export default function () {
    const classes = useStyles();
    const [language, setLanguage] = useState<lang>('javascript');

    return(
        <div className={classes.root}>
            <FunctionTextInput language={language}/>
        </div>
    )
}
