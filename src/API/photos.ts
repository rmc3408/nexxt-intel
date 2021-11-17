import axios from 'axios';
import { IAlbums } from '../types/data';

export const getPhotos = async (albums: IAlbums[]) => {

    const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos');
    if (!data) return null;
    return data;
}  
