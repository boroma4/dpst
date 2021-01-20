import {ExampleTemplate} from "../types/types";

export const Knapsack: ExampleTemplate = {
    'javascript':{
        variables: [{name: 'values', value: '[60, 100, 120]'}, {name: 'weights', value: '[10, 20, 30]'}],
        params: [{name:'i', value: '0'}, {name:'freeSpace', value: '45'}],
        body: ` 
  if (freeSpace < 0) return -Infinity;
  if (i === values.length) return 0;
  
  return Math.max(
    fn(i+1, freeSpace),
    values[i] + fn(i+1, freeSpace - weights[i])
  )
`
    },
    'python':{
        variables: [{name: 'values', value: '[60, 100, 120]'}, {name: 'weights', value: '[10, 20, 30]'}],
        params: [{name:'i', value: '0'}, {name:'freeSpace', value: '45'}],
        body: ` 
  if freeSpace < 0:
    return -float('inf')
    
  if i == len(values):
    return 0
  
  return max(
    fn(i+1, freeSpace),
    values[i] + fn(i+1, freeSpace - weights[i])
  )
`
    }
};
