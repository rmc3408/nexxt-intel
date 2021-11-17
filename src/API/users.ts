import axios from 'axios';
import { getRandom } from '../helpers/functions';
import { IUsers } from '../types/data';

const NUM_USERS = 7;

export const getUsers = async () => {

    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
    if (!data) return null;
    
    const result: IUsers[] = getRandom(data, NUM_USERS);
    return result;
}  

