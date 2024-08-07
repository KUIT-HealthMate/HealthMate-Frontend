
const handleChallengeName = <T>(
    inputElement: HTMLInputElement,
    setter: (
      value: React.SetStateAction<T>
    ) => void,
    newChallenge: Omit<T, "id" | "notificationTime">
  ): void => {
    inputElement.value = inputElement.value.replace(/[^a-zA-Zㄱ-ㅎ가-힣]/g, "");

    setter({ ...(newChallenge as T), name: inputElement.value });
  };

export default handleChallengeName;

