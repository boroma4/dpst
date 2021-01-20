import {ExampleTemplate} from "../types/types";

export const LCS: ExampleTemplate = {
    'javascript':{
        variables: [{name:'str1', value: '\"dab\"'},{name:'str2', value: '\"ab\"'}],
        params: [{name:'i', value: '3'},{name:'j', value: '2'},{name:'count',value:'0'}],
        body: ` 
\t\tif (i <= 0 || j <= 0)
\t\t\treturn count;
\t\t
\t\tlet count1=count;
\t\tif (str1[i - 1] === str2[j - 1])
\t\t\tcount1 = fn(i - 1, j - 1, count + 1);

\t\tconst count2 = fn(i, j - 1, 0);
\t\tconst count3 = fn(i - 1, j, 0);

\t\treturn Math.max(count1, Math.max(count2, count3));
`
    },
    'python':{
        variables: [{name:'str1', value: '\"dab\"'},{name:'str2', value: '\"ab\"'}],
        params: [{name:'i', value: '3'},{name:'j', value: '2'},{name:'count',value:'0'}],
        body: ` 
\t\tif i <= 0 or j <= 0:
\t\t\treturn count
\t\t
\t\tcount1=count
\t\tif str1[i - 1] == str2[j - 1] :
\t\t\tcount1 = fn(i - 1, j - 1, count + 1)

\t\tcount2 = fn(i, j - 1, 0)
\t\tcount3 = fn(i - 1, j, 0)

\t\treturn max([count1, count2, count3])
`
    }
};
