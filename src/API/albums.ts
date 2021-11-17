import axios from 'axios';
import { IUsers } from '../types/data'


export const getAlbums = async (users: IUsers[]) => {

    const { data } = await axios.get('https://jsonplaceholder.typicode.com/albums');
    if (!data) return null;
    return data;
}  

