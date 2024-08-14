import dayjs from "dayjs";

export const getDataByPeriod = async (
  period: dayjs.Dayjs,
  calanderType: boolean
) => {
  const startDate = period.startOf("month");
  const serverURL = "http://3.39.60.18:9000";
  const query = `${startDate}-${calanderType}`;
  const requestURL = `${serverURL}?query=${query}`;
};
