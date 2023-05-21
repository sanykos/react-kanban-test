import { IBoard, ICardDragItem } from '../types';

export interface AppState {
  draggedItem: ICardDragItem | null;
  isLoading: boolean;
  error: string;
  boards: IBoard[];
}

export const INITIAL_BOARD: AppState = {
  draggedItem: null,
  isLoading: false,
  error: '',
  boards: [
    { id: 1, title: 'Очередь', status: 'queue', cards: [] },
    { id: 2, title: 'В работе', status: 'inprogress', cards: [] },
    { id: 3, title: 'На проверке', status: 'review', cards: [] },
    { id: 4, title: 'Выполнено', status: 'done', cards: [] },
  ],
};
