import { FormData as ContactFormData } from '@/components/main/main-form/Main-form';
import axios from 'axios';

const $api = axios.create({
  timeout: 10000,
  baseURL: process.env.NEXT_PUBLIC_DEV_API,
});

export const sendForm = async (data: ContactFormData) => {
  try {
    const response = await $api.post('/api/email', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(' Ответ сервера:', response.data);
    return response;
  } catch (err: any) {
    console.error('Full URL was:', `${process.env.NEXT_PUBLIC_DEV_API}/api/email`);
    throw err;
  }
};
