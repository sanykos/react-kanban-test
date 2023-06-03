export const STATUS_MAP = {
  queue: 'inprogress',
  inprogress: 'review',
  review: 'done',
  done: 'done',
} as const;

export interface ICard {
  id: number;
  title: string;
  body: string;
}

export type StatusType = keyof typeof STATUS_MAP;

export interface IBoard {
  id: number;
  title: string;
  cards: ICard[];
  status: StatusType;
}

export interface AppState {
  draggedItem: ICardDragItem | null;
  isLoading: boolean;
  error: string;
  boards: IBoard[];
}

export interface ICardDragItem extends ICard {
  status: StatusType;
  columnId: number;
}
