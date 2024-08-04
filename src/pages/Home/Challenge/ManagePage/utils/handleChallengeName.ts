
const handleChallengeName = <T>(
    inputElement: HTMLInputElement,
    setter: (
      value: React.SetStateAction<Omit<T, "id" | "notificationTime">>
    ) => void,
    newChallenge: Omit<T, "id" | "notificationTime">
  ): void => {
    inputElement.value = inputElement.value.replace(/[^a-zA-Zㄱ-ㅎ가-힣]/g, "");

    setter({ ...(newChallenge as Omit<T, "id" | "notificationTime">), name: inputElement.value });
  };

export default handleChallengeName;