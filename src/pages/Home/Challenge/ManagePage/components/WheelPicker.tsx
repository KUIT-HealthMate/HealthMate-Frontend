import styled from "@emotion/styled";
import { useRef, useEffect, useState } from "react";

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 33%;
  height: 111px;
  overflow-y: scroll;
  position: relative;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ListCenter = styled.div`
  background: rgba(14, 148, 148, 0.1);
  box-sizing: border-box;
  height: 37px;
  position: sticky;
  top: 37px;
`;

const ListItem = styled.li<{ isSelected: boolean }>`
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ isSelected }) => isSelected && "bold"};
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.4)};
`;

interface ScrollPickerProps {
  list: (string | number)[];
  onSelectedChange?: (selected: string | number) => void;
  initialIndex: number;
  pickerStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

const WheelPicker = ({
  list,
  onSelectedChange,
  initialIndex,
  pickerStyle,
}: ScrollPickerProps) => {
  const SCROLL_DEBOUNCE_TIME = 74;

  const newList = ["", ...list, ""];
  const ref = useRef<HTMLUListElement>(null);
  const [selected, setSelected] = useState(1);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ITEM_HEIGHT = 37;

  const handleScroll = () => {
    if (ref.current) {
      clearTimeout(timerRef.current!);
      if (ref.current.scrollTop < ITEM_HEIGHT) {
        ref.current.scrollTop = ITEM_HEIGHT;
      }
      timerRef.current = setTimeout(() => {
        const index = Math.floor(
          (ref.current!.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT
        );
        if (list[index] !== "") {
          setSelected(index);
          itemRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          onSelectedChange && onSelectedChange(newList[index]);
        }
      }, SCROLL_DEBOUNCE_TIME);
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = (initialIndex + 1) * ITEM_HEIGHT;
    }
  }, [initialIndex]);

  return (
    <List ref={ref} onScroll={handleScroll}>
      <ListCenter style={pickerStyle} />
      {newList.map((item, index) => (
        <ListItem
          key={index}
          isSelected={index === selected}
          ref={(el) => (itemRefs.current[index] = el)}
        >
          {item}
        </ListItem>
      ))}
    </List>
  );
};

export default WheelPicker;
