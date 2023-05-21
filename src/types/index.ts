export interface ICard {
  id: number;
  title: string;
  body: string;
}

export type StatusType = 'queue' | 'inprogress' | 'review' | 'done';

export interface IBoard {
  id: number;
  title: string;
  cards: ICard[];
  status: StatusType;
}

export interface ICardDragItem extends ICard {
  status: StatusType;
  columnId: number;
}
