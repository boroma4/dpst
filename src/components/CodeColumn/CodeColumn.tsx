import React, {useState} from "react";
import FunctionTextInput from "../FunctionTextInput/FunctionTextInput";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {LangName, TemplateName} from "../../types/types";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {compileInput, ungroup} from "../../utils/InputProcessing";
import {executeJsFunction} from "../../utils/CodeExecution";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {getKeyValue, Templates} from "../../templates/templates";

interface Props {
    setRecursionTree: Function;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin:'5px',
            textAlign:'left'
        },
        runForm: {
            marginTop: '10px',
            marginLeft: '5px'
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        }
    }),
);

const {fnCode, fnCall} = ungroup(Templates['Fibonacci']['javascript'], 'javascript');


export default function ({setRecursionTree}: Props) {
    const classes = useStyles();

    const [template, setTemplate] = useState<TemplateName>('Fibonacci');
    const [input, setInput] = useState<string>(fnCode);
    const [call, setCall] = useState<string>(fnCall);
    const [language, setLanguage] = useState<LangName>('javascript');
    const [useMemo, setUseMemo] = useState<boolean>(false);

    const updateTemplate = (e:React.ChangeEvent<{ value: unknown }>) =>{
      const templateName: TemplateName = e.target.value as TemplateName;
      const {fnCode, fnCall} = ungroup(getKeyValue(templateName)(Templates)[language], language);
      setInput(fnCode);
      setCall(fnCall);
      setTemplate(templateName);
    };

    const updateLanguage = (e:React.ChangeEvent<{ value: unknown }>) =>{
        const language: LangName = e.target.value as LangName;
        const {fnCode, fnCall} = ungroup(getKeyValue(template)(Templates)[language], language);
        setLanguage(language);
        setInput(fnCode);
        setCall(fnCall);
    };

    const run = () =>{
        try {
            const func = compileInput(input, call, language);
            const tree = executeJsFunction(func, useMemo);
            setRecursionTree(tree);
        }
        catch (e) {
            alert('broken function bro');
            console.log(e)
        }
    };

    return(
        <div className={classes.root}>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="ek">Language</InputLabel>
                <Select
                    value={language}
                    onChange={updateLanguage}
                >
                    <MenuItem value={'javascript'}>Javascript</MenuItem>
                    <MenuItem value={'python'}>Python</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="pk" style={{marginTop:'5px'}}>Template</InputLabel>
                <Select
                    value={template}
                    onChange={updateTemplate}
                >
                    <MenuItem value={'Fibonacci'}>Fibonacci</MenuItem>
                    <MenuItem value={'LCS'}>LCS</MenuItem>
                    <MenuItem value={'Custom'}>Custom</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="filled" className={classes.formControl}>
                <FormControlLabel
                    control={<Switch checked={useMemo} onChange={()=>setUseMemo(!useMemo)} name="checkedA" />}
                    label="Use Memoization"
                />
            </FormControl>
            <FunctionTextInput
                language={language}
                input={input}
                setInput={setInput}
            />
            <FormGroup row className={classes.runForm}>
                <InputLabel htmlFor="function-call">Function call</InputLabel>
                <OutlinedInput
                    id="function-call"
                    type={'text'}
                    value={call}
                    onChange={(e)=>setCall(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>run()}
                                edge="end"
                            >
                                <PlayCircleFilledIcon/>
                            </IconButton>
                        </InputAdornment>
                    }
                    />
            </FormGroup>
        </div>
    )
}
