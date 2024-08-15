import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import dayjs from "dayjs";
import { calanderResponseDataType } from "../../pages/Home/ChallengeStatistics/dataTypes";

export const getDataByPeriod = async (
  period: dayjs.Dayjs,
  calanderType: boolean
): Promise<calanderResponseDataType["result"] | null> => {
  const startDate = calanderType
    ? period.startOf("week").add(1, "day")
    : period.startOf("month");
  const endDate = calanderType
    ? period.endOf("week").add(1, "day")
    : period.endOf("month");

  var config: AxiosRequestConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://3.39.60.18:9000/challenges/week?startDate=${startDate.format(
      "YYYY-MM-DD"
    )}&endDate=${endDate.format("YYYY-MM-DD")}`,
    headers: {
      Jwt: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjQ5NjU4MTQzIiwiaWF0IjoxNzIzMDg1ODA4LCJleHAiOjE3MjY2ODU4MDgsInVzZXJJZCI6MX0.0y4fkQBnXqIXNJEPt9RZRpCI0HDBCE50KOPeHjelCw8",
    },
  };

  try {
    const response: AxiosResponse<calanderResponseDataType> = await axios(
      config
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
