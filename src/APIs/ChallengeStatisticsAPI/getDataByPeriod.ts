import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import dayjs from "dayjs";
import { calanderResponseDataType } from "../../pages/Home/ChallengeStatistics/dataTypes";

export const getDataByPeriod = async (
  period: dayjs.Dayjs,
  calanderType: boolean
): Promise<calanderResponseDataType["result"] | null> => {
  const JWT_TOKEN = localStorage.getItem("jwtToken");
  const startDate = calanderType
    ? period.startOf("week").add(1, "day")
    : period.startOf("month");
  const endDate = calanderType
    ? period.endOf("week").add(1, "day")
    : period.endOf("month");

  const config: AxiosRequestConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://3.39.60.18:9000/challenges/week?startDate=${startDate.format(
      "YYYY-MM-DD"
    )}&endDate=${endDate.format("YYYY-MM-DD")}`,
    headers: {
      Jwt: localStorage.getItem('jwtToken') as string,
    },
  };

  console.log(JWT_TOKEN);
  //jwt토큰 이용해서 해당유저 정보불러오는 로직 추가해야됨

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
