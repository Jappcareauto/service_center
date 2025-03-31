import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { StatsRange } from "@/enums/StatsRange";
import { calculateRange } from "@/utils/calculStatsRange";
import { useEffect, useState } from "react";
import httpClient from "@/services/api-client";

export const useDashboardView = () => {
  //dispatch Action
  const serviceCenterId = useAppSelector((state => state.serviceCenter.currentServiceCenter));
  const dispatch = useAppDispatch();

  const [weeksRevenue, setWeeksRevenue] = useState("0")
  const fetchData = async () => {
    
  };

  const fetchRevenue = async () => {
    console.log(serviceCenterId)
    httpClient.get(`service-center/${serviceCenterId}/stats?range=${StatsRange.WEEK}`).then((response) => {
        if(response.data.revenue){
          setWeeksRevenue(`${response.data.revenue.amount} ${response.data.revenue.currency}`)
        }
      }
    )
  }

  useEffect(() => {
    fetchData();
    fetchRevenue();
  }, []);

  return {
    weeksRevenue
  };
};
