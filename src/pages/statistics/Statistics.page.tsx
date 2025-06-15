import CalendarIcon from "@/assets/icons/CalendarIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import StarIcon from "@/assets/icons/StarIcon";
import StatisticIcon from "@/assets/icons/StatisticIcon";
import { AppointmentType } from "@/components/appointment/types";
import Avatar from "@/components/avatar/Avatar.component";
import Button from "@/components/button/Button.component";
import Drawer from "@/components/drawer/Drawer.component";
import LineChart from "@/components/line-chart/LineChart.component";
import Skeleton from '@/components/skeletons/Skeleton.component';
import StatisticsCard from "@/components/statistics-card/StatisticsCard.component";
import {
  useGetAppointmentsMutation,
  useGetPaymentsMutation,
  useGetServiceCentersMutation,
} from "@/redux/api";
import { useAppSelector } from "@/redux/store";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import StatisticsProfile from "./StatisticsProfile";
import StatComponent from "./StatsComponent";
import DashboardLayout from '@/layouts/DashboardLayout';

const Statistics = () => {
  const [open, setOpen] = useState(false);
  const { user_info } = useAppSelector((state) => state.auth);
  const [revenue, setRevenue] = useState("");
  const [allAppointments, setAllAppointments] = useState<AppointmentType[]>([]);
  const [inprogressAppointments, setInProgressAppointments] = useState<
    AppointmentType[]
  >([]);
  const [completedAppointments, setCompletedAppointments] = useState<
    AppointmentType[]
  >([]);

  const [getAppointments, { data: appointments, isLoading }] =
    useGetAppointmentsMutation();
  const [getPayments, { isLoading: paymentsLoading }] = useGetPaymentsMutation(
    {}
  );

  const [getServiceCenters, { data, isLoading: serviceCentersLoading }] =
    useGetServiceCentersMutation();

  const getAppointmentsData = (status?: string) => {
    const submitData = status
      ? {
          status,
          serviceCenterId: data?.data?.[0]?.id,
        }
      : {};
    getAppointments(submitData)
      .unwrap()
      .then((res) => {
        //       const NOT_STARTED = "NOT_STARTED",
        // IN_PROGRESS = "IN_PROGRESS",
        // COMPLETED = "COMPLETED",
        const allAppoinments = res?.data?.filter(
          (appointment: AppointmentType) =>
            appointment.status === "NOT_STARTED" ||
            appointment.status === "IN_PROGRESS" ||
            appointment.status === "COMPLETED"
        );
        setAllAppointments(allAppoinments);
        const inProgressAppointments = allAppoinments.filter(
          (appointment: AppointmentType) => appointment.status === "IN_PROGRESS"
        );
        setInProgressAppointments(inProgressAppointments);
        const completedAppointments = allAppoinments.filter(
          (appointment: AppointmentType) => appointment.status === "COMPLETED"
        );
        setCompletedAppointments(completedAppointments);
      });
  };

  useEffect(() => {
    getServiceCenters({
      ownerId: user_info?.userId,
    })
      .unwrap()
      .then(() => {
        getAppointmentsData("");
      });
    getPayments({})
      .unwrap()
      .then((res) => {
        const totalAmount = res?.data?.reduce(
          (sum, payment) => sum + (payment.money?.amount || 0),
          0
        );
        setRevenue(`${totalAmount.toString()} XAF`);
      });
  }, []);

  const center = data?.data?.[0];

  // const getPaymentsData = (status?: PaymentStatus) => {
  //   const submitData = status
  //     ? {
  //         status,
  //       }
  //     : {};
  //   getPayments(submitData);
  // };

  return (
    <DashboardLayout showBack={false}>
      {isLoading || serviceCentersLoading || paymentsLoading ? (
        <div className="flex-co space-y-8">
          <Skeleton paragraph={{ rows: 8 }} />
          <Skeleton paragraph={{ rows: 8 }} />
        </div>
      ) : (
        <div>
          <Avatar name={center?.name} className="w-16 h-16" isName={false} />
          <div className="flex items-end justify-between mt-4">
            <h2 className="text-lg">{center?.name}</h2>
            <Button
              onClick={() => setOpen(true)}
              className=" h-10 rounded-full font-normaltext-sm"
              variant='tertiary'
            >
              View Profile
            </Button>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-x-4 text-primary mb-4">
              <div className="flex items-center gap-x-2 mb-2">
                <LocationIcon />
                <span>{center?.location?.name}</span>
              </div>
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              <div className="flex items-center gap-x-2">
                <StarIcon />
                <span>4.75</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 mb-3">
            <h2 className="font-medium">Overview</h2>
            <Button className="rounded-full h-10 text-sm">
              Download Reports
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <StatisticsCard
              title="Appointments"
              value={appointments?.data && appointments?.data?.length}
              badgeTitle="In Progress"
              icon={<CalendarIcon className="text-primary" />}
              second
              titleClassName="text-primary"
            />
            <StatisticsCard
              title="Revenue"
              value={revenue}
              badgeTitle="This Week"
              icon={<StatisticIcon className="text-primary" />}
              second
              titleClassName="text-primary"
            />
          </div>
          <div className="w-full p-6 border border-borderColor rounded-3xl my-6">
            <div className="flex justify-between items-center mb-5">
              <div className="w-auto">
                <div className="text-gray-500 text-sm">Total Revenue</div>
                <div className="text-2xl font-bold">{revenue}</div>
              </div>
              <div className="flex items-center gap-x-3">
                <Button
                  className={twMerge(
                    "text-sm text-primary px-6 py-2 space-x-2 items-center rounded-full bg-primaryAccent hover:bg-primary hover:text-white transition-all duration-300"
                  )}
                >
                  <span>Revenue</span>
                  <ChevronDownIcon className="h-4" />
                </Button>
                <Button
                  className={twMerge(
                    "text-sm text-primary px-6 py-2 space-x-2 items-center rounded-full bg-primaryAccent  hover:bg-primary hover:text-white transition-all duration-300"
                  )}
                >
                  <span>This Week</span>
                  <ChevronDownIcon className="h-4" />
                </Button>
              </div>
            </div>
            <div className="h-[400px] mb-4">
              <LineChart />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between w-full mb-5 items-center">
              <h2 className="font-medium">Appointment Stats</h2>
              <div className="text-sm rounded-2xl px-3 py-2 bg-grey3">
                This Week
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <StatComponent
                title={"Total Revenue"}
                value={revenue}
                icon={<CalendarIcon className="text-primary" />}
              />
              <StatComponent
                title="Total Appointments"
                value={allAppointments && allAppointments?.length}
                icon={<CalendarIcon className="text-primary" />}
              />
              <StatComponent
                title="In Progress Appointments"
                value={inprogressAppointments && inprogressAppointments?.length}
                icon={<CalendarIcon className="text-primary" />}
              />
              <StatComponent
                title="Completed Appointments"
                value={completedAppointments && completedAppointments?.length}
                icon={<CalendarIcon className="text-primary" />}
              />
            </div>
          </div>

          <Drawer
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            title="Profile"
          >
            <StatisticsProfile />
          </Drawer>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Statistics;
