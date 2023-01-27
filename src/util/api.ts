import axios, { Method } from "axios";
import { API_URL } from "@/constants/env";

type IAxiosCallerArgs = {
  path: string;
  method: Method;
  payload?: any;
};

export const axiosCaller = async <T>({
  path,
  method,
  payload,
}: IAxiosCallerArgs): Promise<T | null> => {
  try {
    let response = await axios({
      url: path,
      baseURL: API_URL,
      method,
      data: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.log({ error });

    throw error?.message;
  }
};
