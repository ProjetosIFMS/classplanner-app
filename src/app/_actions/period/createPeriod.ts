import { Session } from "@/types/session";
import api from "@/utils/axios-instance";
import { AxiosResponse } from "axios";

type Period = {
  from?: Date | undefined;
  to?: Date | undefined;
};

type PeriodReponseData = {
  id: string;
  start_date: string;
  end_date: string;
};

export const createPeriod = async (period: Period, session: Session) => {
  try {
    const res: AxiosResponse<PeriodReponseData> = await api.post(
      "/period",
      {
        start_date: period.from,
        end_date: period.to,
      },
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      },
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
