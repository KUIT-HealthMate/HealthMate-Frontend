import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import dayjs from "dayjs";
import { periodName } from "../../pages/HealthChart/HealthChart";
import {
  dayResponseDataType,
  notDayResponseDataType,
} from "../../pages/HealthChart/dataTypes";

export const getChartData = async (period: periodName, today: dayjs.Dayjs) => {
  const JWT_TOKEN = localStorage.getItem("jwtToken");
  const config: AxiosRequestConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://3.39.60.18:9000/diagnosis/${period}/${today.format(
      "YYYY-MM-DD"
    )}`,
    headers: {
      Jwt: localStorage.getItem('jwtToken') as string,
    },
  };
  console.log(JWT_TOKEN);
  //jwt토큰 이용해서 해당유저 정보불러오는 로직 추가해야됨

  console.log(
    `http://3.39.60.18:9000/diagnosis/${period}/${today.format("YYYY-MM-DD")}`
  );

  try {
    const response: AxiosResponse<
      dayResponseDataType | notDayResponseDataType
    > = await axios(config);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return null;
  }

  //   axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       console.log(error.response);
  //     });
};
