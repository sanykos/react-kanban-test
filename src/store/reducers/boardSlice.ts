import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INITIAL_BOARD } from '../mock';

import {
  fetchAllCards,
  fetchDeleteCard,
  fetchAddCard,
  fetchUpdateCard,
} from './ActionCreators';

import { findItemIndexById } from '@/utils/findItemIndexById';
import { ICard, ICardDragItem } from '@/types';

const initialState = INITIAL_BOARD;

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setDraggableItem(state, action: PayloadAction<ICardDragItem | null>) {
      state.draggedItem = action.payload;
    },
    moveCard(
      state,
      action: PayloadAction<{
        draggedItemId: number;
        hoveredItemId: number | null;
        sourceColumnId: number;
        targetColumnId: number;
      }>
    ) {
      const { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId } =
        action.payload;
      const { boards } = state;
      const sourceListIndex = findItemIndexById(boards, sourceColumnId);

      const targetListIndex = findItemIndexById(boards, targetColumnId);

      const dragIndex = findItemIndexById(
        boards[sourceListIndex].cards,
        draggedItemId
      );

      const hoverIndex = hoveredItemId
        ? findItemIndexById(boards[targetListIndex].cards, hoveredItemId)
        : 0;

      const item = boards[sourceListIndex].cards[dragIndex];

      boards[sourceListIndex].cards.splice(dragIndex, 1);
      boards[targetListIndex].cards.splice(hoverIndex, 0, item);
    },
  },
  extraReducers: {
    [fetchAllCards.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAllCards.fulfilled.type]: (state, action: PayloadAction<ICard[]>) => {
      state.isLoading = false;
      state.error = '';
      state.boards[0].cards = action.payload;
    },
    [fetchAllCards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload
        ? action.payload
        : 'Ошибка при загрузке карточек';
    },

    [fetchDeleteCard.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchDeleteCard.fulfilled.type]: (state, action: PayloadAction<ICard>) => {
      state.isLoading = false;
      state.error = '';
      state.boards[0].cards.filter((card) => card.id !== action.payload.id);
    },
    [fetchDeleteCard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload
        ? action.payload
        : 'Ошибка при удалении элемента';
    },

    [fetchAddCard.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAddCard.fulfilled.type]: (state, action: PayloadAction<ICard>) => {
      state.isLoading = false;
      state.error = '';
      state.boards[0].cards.push(action.payload);
    },
    [fetchAddCard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload
        ? action.payload
        : 'Ошибка при добавлении карточки';
    },

    [fetchUpdateCard.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUpdateCard.fulfilled.type]: (state, action: PayloadAction<ICard>) => {
      state.isLoading = false;
      state.error = '';
      state.boards[0].cards.map((card) => {
        if (card.id === action.payload.id) {
          return {
            ...card,
            ...action.payload,
          };
        }
        return card;
      });
    },
    [fetchUpdateCard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload
        ? action.payload
        : 'Ошибка при обновлении карточки';
    },
  },
});

export const { moveCard, setDraggableItem } = boardSlice.actions;
export default boardSlice;
