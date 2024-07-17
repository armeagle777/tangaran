import { auth } from '@strapi/helper-plugin';
import axios from 'axios';

const localApi = axios.create({
  baseURL: '/region-community',
});

export const debounceFetch = async (url, options, delay) => {
  let debounceTimer;
  return new Promise((resolve, reject) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(async () => {
      try {
        const response = await localApi.get(url, options);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
};

export async function getRegionData(regionId) {
  const data = await debounceFetch(
    `/regions/${regionId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.getToken()}`,
      },
    },
    1000,
  );
  return data.data;
}

export async function getRegionsData() {
  try {
    const response = await localApi.get(`/regions`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateRelation({ data, id }) {
  try {
    const response = await localApi.post(
      `/relations/${id}`,
      { data },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.getToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
