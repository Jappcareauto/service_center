import { StatsRange } from '@/modules/statistics/models/statsRanche';
import { calculateRange } from '@/modules/statistics/utils/calculStatsRange';
import apiClient from '@/services/api-client';
import { useState, useEffect } from 'react';

interface WeeklyStatsChartInterface {
    name: string;
    value: number;
  }

const useAppointmentStats = () => {
    const [appointmentWeeklyStats, setAppointmentWeeklyStats] = useState<WeeklyStatsChartInterface[]>([]);

    const fetchWeeklyAppointmentStats = async () => {
        console.log("fetching weekly stats");
        const range = calculateRange(StatsRange.WEEK);
        try {
            const res = await apiClient.get(`/appointment/stats?startDate=${range.startDate}&endDate=${range.endDate}&range=${range.range}`);
            const formattedStats = [
                { name: 'Mon', value: res.data.currentStats.MONDAY || 0 },
                { name: 'Tues', value: res.data.currentStats.TUESDAY || 0 },
                { name: 'Wed', value: res.data.currentStats.WEDNESDAY || 0 },
                { name: 'Thurs', value: res.data.currentStats.THURSDAY || 0 },
                { name: 'Fri', value: res.data.currentStats.FRIDAY || 0 },
                { name: 'Sat', value: res.data.currentStats.SATURDAY || 0 },
                { name: 'Sun', value: res.data.currentStats.SUNDAY || 0 },
            ];
            setAppointmentWeeklyStats(formattedStats);
        } catch (err) {
            console.log("error", err);
        }
    };

    useEffect(() => {
        fetchWeeklyAppointmentStats();
    }, []);

    return { appointmentWeeklyStats };
};

export default useAppointmentStats;