const handleAlarmTime = (
    amOrPm: number, 
    hour: number, 
    minutes: number, 
    isEditMode: boolean, 
    setAlarmTime: (value: React.SetStateAction<{
    hour: number;
    minutes: number;
    }[]>) => void, 
    alarmTime: 
    {
    hour: number;
    minutes: number;
    }[], 
    editIndex: number, 
    setAmOrPm: (value: React.SetStateAction<number>) => void, 
    setHour: (value: React.SetStateAction<number>) => void, 
    setMinutes: (value: React.SetStateAction<number>) => void, 
    setIsEditMode: (value: React.SetStateAction<boolean>) => void) => {
    console.log("handleAlarmTime: " + amOrPm + hour + minutes);
    let hourIn24: number = amOrPm * 12 + (hour % 12);
    if(isEditMode) {
      setAlarmTime(alarmTime.map((item,index) => {
        if(index == editIndex){
          return {
            ...item,
            hour: hourIn24,
            minutes: minutes,
          };
        }
        return item;
      }))
    } else {
      setAlarmTime([...alarmTime, { hour: hourIn24, minutes: minutes }]);
    }

    setAmOrPm(0);
    setHour(0);
    setMinutes(0);
    setIsEditMode(false);
};

export default handleAlarmTime;