import {ExampleTemplate} from "../types/types";

export const Custom: ExampleTemplate = {
    'javascript':{
        params: [{name:'n', value: '5'}],
        body: ` 
  return n;     
`
    },
    'python':{
        params: [{name:'n', value: '5'}],
        body: ` 
  return n    
`
    }
};
