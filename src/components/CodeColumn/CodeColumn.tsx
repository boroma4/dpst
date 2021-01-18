import React, {useState} from "react";
import FunctionTextInput from "../FunctionTextInput/FunctionTextInput";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {lang} from "../../types/types";

interface Props {
    setRecursionTree: Function;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop:'5px'
        },
    }),
);


export default function ({setRecursionTree}: Props) {
    const classes = useStyles();
    const [language, setLanguage] = useState<lang>('javascript');

    return(
        <div className={classes.root}>
            <FunctionTextInput language={language} setRecursionTree={setRecursionTree}/>
        </div>
    )
}
