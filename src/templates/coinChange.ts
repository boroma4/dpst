import {ExampleTemplate} from "../types/types";

export const CoinChange: ExampleTemplate = {
    'javascript':{
        variables: [{name:'coins', value: '[1,4,5]'}],
        params: [{name:'s', value: '8'}],
        body: ` 
  // remaining s cents
  
  if (s === 0) return 0;
  if (s < 0) return Infinity;
  
  let ans = Infinity;
  for (const coin of coins)
    ans = Math.min(
      ans,
      1 + fn(s - coin)
    );
  return ans;   
`
    },
    'python':{
        variables: [{name:'coins', value: '[1,4,5]'}],
        params: [{name:'s', value: '8'}],
        body: ` 
  # remaining s cents
  
  if s == 0:
    return 0
    
  if s < 0:
    return float('inf')
  
  ans = float('inf')
  for coin in coins:
    ans = min(
      ans,
      1 + fn(s - coin)
    )
  return ans   
`
    }
};
