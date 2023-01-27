import { IFeedback } from "@/typings";
import { axiosCaller } from "@/util/api";

export const createFeedbackAPI = async (
  feedback: IFeedback,
): Promise<IFeedback | null> => {
  const createdFeedback = await axiosCaller<IFeedback>({
    path: "/feedback/create",
    method: "POST",
    payload: feedback,
  });

  return createdFeedback;
};
