import { ICard, StatusType } from '@/types';

export interface ColumnProps {
  id: number;
  title: string;
  status: StatusType;
  cards: ICard[];
}
