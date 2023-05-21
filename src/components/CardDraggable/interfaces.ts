import { StatusType } from '@/types';

export interface CardProps {
  id: number;
  title: string;
  body: string;
  status: StatusType;
  columnId: number;
}
