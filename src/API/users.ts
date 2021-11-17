import axios from 'axios';
import { IUsers } from '../types/data';

const NUM_USERS = 7;

export const getUsers = async () => {

    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
    if (!data) return null;
    
    const result: IUsers[] = getRandom(data, NUM_USERS);
    return result;
}  

//formula from 'https://newbedev.com/javascript-get-5-random-unique-elements-from-array-js-code-example'
function getRandom(arr: IUsers[], n: number) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);

    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
