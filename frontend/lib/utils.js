import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}

export const toDateTime = (secs) => {
  const t = new Date('1970-01-01T00:00:00.000Z')
  t.setSeconds(secs)
  return t;
}

export const getURL = () => {
  let url = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
  url = url.includes('http')? url : `https://${url}`;
  url = url.charAt(url.length - 1) === '/'? url : `${url}/`;
  return url;
}

export const postData = async (url, data) => {
  console.log('post', url, data);
  const response = await axios.post(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(data),
  });
  if (!response.status === 200) {
    throw new Error(response.statusText);
  }
  return response.json();
};
