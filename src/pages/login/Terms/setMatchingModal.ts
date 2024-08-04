const setMatchingModals = (
  modals: boolean[],
  index: number,
  setModals: React.Dispatch<React.SetStateAction<boolean[]>>
) => {
    const temp = [...modals];
    temp[index] = !temp[index];

    setModals(temp);
};

export default setMatchingModals;
