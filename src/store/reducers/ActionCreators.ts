import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ICard } from '@/types';

const URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchAllCards = createAsyncThunk(
  'board/fetchAllCards',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<ICard>(`${URL}?_limit=5`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDeleteCard = createAsyncThunk(
  'board/fetchDeleteCard',
  async (id: number, thunkApi) => {
    try {
      const response = await axios.request({
        url: `${URL}/${id}`,
        method: 'DELETE',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const fetchAddCard = createAsyncThunk(
  'board/fetchAddCard',
  async (data: ICard, thunkApi) => {
    try {
      const response = await axios.request<ICard>({
        url: URL,
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
        },
        data,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

export const fetchUpdateCard = createAsyncThunk(
  'board/fetchUpdateCard',
  async (data: ICard, thunkApi) => {
    try {
      const response = await axios.request<ICard>({
        url: `${URL}/${data.id}`,
        method: 'PUT',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
        },
        data,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);
