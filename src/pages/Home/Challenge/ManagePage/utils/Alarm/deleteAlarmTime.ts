const deleteAlarmTime = (index: number, setAlarmTime: React.Dispatch<React.SetStateAction<{
    hour: number;
    minute: number;
}[]>>,alarmTime: 
    {
    hour: number;
    minute: number;
    }[] ) => {
    setAlarmTime(alarmTime => {
      // 새로운 배열을 생성하면서 해당 인덱스의 아이템을 제외
      return alarmTime.filter((_, i) => i !== index);
    });
  }

  export default deleteAlarmTime