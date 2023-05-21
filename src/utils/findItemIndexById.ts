type Item = {
  id: number;
};

export const findItemIndexById = <TItem extends Item>(
  items: TItem[],
  id: number
) => {
  return items.findIndex((item: TItem) => item.id === id);
};
