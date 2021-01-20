import {ExampleTemplate} from "../types/types";

export const EditDisance: ExampleTemplate = {
    'javascript':{
        variables: [{name:'str1', value: '\'algo\''}, {name:'str2', value: '\'alco\''}],
        params: [{name:'m', value: '4'}, {name:'n', value: '4'}],
        body: ` 
    // If first string is empty, 
    // insert all chars of the second str
    if (m === 0) return n;
 
    // If second string is empty, 
    // remove all chars of the first string
    if (n === 0) return m;
 
    // If last characters of two strings are same, ignore them and move on
    if (str1[m-1] === str2[n-1]){
        return fn(m-1, n-1);
    }
 
    // If last characters are not same, 
    // consider all three operations
    return 1 + Math.min(...[fn(m, n-1),    // Insert
                   fn(m-1, n),             // Remove
                   fn(m-1, n-1)]           // Replace
                   ); 
`
    },
    'python':{
        variables: [{name:'str1', value: '\'algo\''}, {name:'str2', value: '\'alco\''}],
        params: [{name:'m', value: '4'}, {name:'n', value: '4'}],
        body: ` 
    # If first string is empty, 
    # insert all chars of the second str
    if m == 0:
        return n
 
    # If second string is empty, 
    # remove all chars of the first string
    if n == 0:
        return m
 
    # If last characters of two strings are same, ignore them and move on
    if str1[m-1] == str2[n-1]:
        return fn(m-1, n-1)
 
    # If last characters are not same, 
    # consider all three operations
    return 1 + min([fn(m, n-1),   # Insert
                   fn(m-1, n),    # Remove
                   fn(m-1, n-1)]  # Replace
                   )    
`
    }
};
