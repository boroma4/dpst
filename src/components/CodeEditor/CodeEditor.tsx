import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import {LangName} from "../../types/types";
import {useWindowSize} from "../../hooks/useWindowSize";



interface Props{
    language: LangName;
    input: string;
    setInput: (value: string, event?: any) => void;
}

export default function ({language, input, setInput}: Props) {

    return(
        <>
            <AceEditor
                style={{width:'auto', height: '45vh'}}
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
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}/>
        </>
    )
}

