import { axiosCaller } from "@/util/api";

export const loginByGoogle = async () => {
  const user = await axiosCaller({
    path: "/auth/google",
    method: "GET",
    payload: "",
  });

  console.log({ user });
};
