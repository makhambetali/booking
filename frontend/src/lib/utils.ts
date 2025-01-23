import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

export const queryClient = new QueryClient();

export const axiosApiClient = axios.create({
    baseURL: process.env.SERVER_URL || 'http://localhost:8000/api/v1',
});

//CRUDS
export async function getMasters() {
    const { data } = await axiosApiClient.get('/barbers');
    return data;
}
