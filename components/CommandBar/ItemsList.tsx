import Item, { ItemProps } from './Item'

interface ItemsListProps {
  setHighlightedItemIndex: (index: number) => void
  searchItems: ItemProps[]
  itemsRef: React.RefObject<HTMLDivElement>
}

const ItemsList = (props: ItemsListProps) => {
  const { setHighlightedItemIndex, searchItems, itemsRef } = props
  console.log(searchItems)
  return (
    <div className="relative inset-0 flex flex-col" ref={itemsRef}>
      {searchItems.map((item, index) => {
        const { title, icon, href } = item
        return (
          <Item
            {...item}
            key={title}
            onMouseMove={(
              e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
              setHighlightedItemIndex(index)
            }}
          />
        )
      })}
    </div>
  )
}
export default ItemsList
