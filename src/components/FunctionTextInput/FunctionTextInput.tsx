import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import {compileInput} from "../../utils/InputProcessing";
import {lang} from "../../types/types";
import {executeJsFunction} from "../../utils/CodeExecution";

const defFunc = `function fib(n) {
   if(n < 2) return n;
            
   return fib(n-1) + fib(n-2);
}
`;

const defCall = `fib(5);`;
interface Props{
    language: lang;
}

export default function ({language}: Props) {

    const [input, setInput] = useState<string>(defFunc);
    const [call, setCall] = useState<string>(defCall);
    const run = () =>{
        try {
            const func = compileInput(input, call, language);
            executeJsFunction(func);
        }
        catch (e) {
            alert('broken function bro');
            console.log(e)
        }
    };

    return(
        <>
            <AceEditor
                style={{width:'auto'}}
                placeholder="Write some code"
                mode={language}
                theme="monokai"
                onChange={setInput}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={input}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}/>
            <br/>
            {call}
            <Button onClick={()=>run()}>
                RUN
            </Button>
        </>
    )
}

