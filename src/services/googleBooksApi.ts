import axios from 'axios';
import { CONFIG } from '../config';
import { Book } from '../types/book';

const BASE_URL = CONFIG.BASE_URL;

export const searchGoogleBooks = async (query: string = 'javascript'): Promise<Book[]> => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}`);
    return response.data.items || [];
  } catch (error) {
    console.error('Error fetching books from Google Books API:', error);
    return [];
  }
};
