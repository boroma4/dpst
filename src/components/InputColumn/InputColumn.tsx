import React, {useState} from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {LangName, TemplateName} from "../../types/types";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {compileInput, ungroup} from "../../utils/InputProcessing";
import {executeAndGetTree} from "../../utils/CodeExecution";
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
            textAlign:'left',
        },
        runForm: {
            marginTop: '10px',
            marginLeft: '5px',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        error: {
            color: 'red',
            fontSize: 'small'
        },
        warning: {
            color: '#ff9966',
            fontSize: 'small'
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
    const [error, setError] = useState<string>('');
    const [useMemo, setUseMemo] = useState<boolean>(false);
    const [highlightOverlaps, setHighlightOverlaps] = useState<boolean>(false);
    const [isRunning, setIsRunning] = useState<boolean>(false);

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
        if(isRunning) return;
        setIsRunning(true);

        compileInput(input, call, language)
            .then(func => executeAndGetTree(func, useMemo, highlightOverlaps))
            .then(tree => {
                setRecursionTree(tree);
                setError('');
                setIsRunning(false);
            })
            .catch(e => {
                console.log(e);
                setError('Execution failed!');
                setIsRunning(false);
                if(e.message.includes('deep')){
                    setError('Too many recursive calls!');
                }
                if(e.message.includes('not defined')){
                    setError('Unsupported syntax was used!');
                }
            });
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
                <FormControlLabel
                    control={<Switch checked={highlightOverlaps} onChange={()=>setHighlightOverlaps(!highlightOverlaps)} name="checkssedA" />}
                    label="Highlight overlapping calls"
                />
            </FormControl>
            <CodeEditor
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
                    error={Boolean(error)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>run()}
                                disabled={isRunning}
                                edge="end"
                            >
                                <PlayCircleFilledIcon/>
                            </IconButton>
                        </InputAdornment>
                    }
                    />
                <div className={classes.error}>{error}</div>
                {!error && <div className={classes.warning}>Don't run any suspicious code, it will be executed in your browser!</div>}
            </FormGroup>
        </div>
    )
}
