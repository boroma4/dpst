import {ExampleTemplate} from "../types/types";

export const Fibonacci: ExampleTemplate = {
    'javascript':{
        params: [{name:'n', value: '5'}],
        body: ` 
  if(n < 2) return n;
        
  return fn(n-1) + fn(n-2);     
`
    },
    'python':{
        params: [{name:'n', value: '5'}],
        body: ` 
  if n < 2: 
    return n
        
  return fn(n-1) + fn(n-2)     
`
    }
};
