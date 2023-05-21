import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconClose } from '@consta/uikit/IconClose';

import { moveCard, setDraggableItem } from '@store/reducers/boardSlice';

import { STATUS_MAP } from '../Column/constants';

import { CardProps } from './interfaces';

import styles from './styles.module.scss';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';

import { fetchDeleteCard } from '@/store/reducers/ActionCreators';

export const CardDraggable: FC<CardProps> = ({
  id,
  title,
  body,
  status,
  columnId,
}) => {
  const dispatch = useAppDispatch();
  const { draggedItem } = useAppSelector((state) => state.board);
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag({
    type: 'CARD',
    item: () => {
      dispatch(setDraggableItem({ id, title, body, status, columnId }));
      return { id, title, body, status, columnId };
    },
    end: () => dispatch(setDraggableItem(null)),
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    drop() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.id === id) {
        return;
      }

      if (STATUS_MAP[draggedItem.status] === status) {
        dispatch(
          moveCard({
            draggedItemId: draggedItem.id,
            hoveredItemId: id,
            sourceColumnId: draggedItem.columnId,
            targetColumnId: columnId,
          })
        );
      }
    },
  });

  const removeCardHandler = () => {
    dispatch(fetchDeleteCard(id));
  };

  drag(drop(ref));

  return (
    <Card
      className={styles.card}
      verticalSpace="xs"
      horizontalSpace="xs"
      ref={ref}
    >
      <div className={styles.closeBtnWrapper}>
        <Button
          iconRight={IconClose}
          onlyIcon
          size="xs"
          onClick={removeCardHandler}
        />
      </div>
      <Text className={styles.cardTitle} as="h3" weight="bold" size="l">
        {title}
      </Text>
      <Text type="p" size="s">
        {body}
      </Text>
    </Card>
  );
};
