/* eslint-disable @typescript-eslint/no-explicit-any */
// import DisclosiorAlertComponent from "./components/DisclosiorAlertComponent";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import ExpandIcon from "@/assets/icons/ExpandIcon";
import AppointmentDetailModal from "@/components/appointment-detail-modal/AppointmentDetailModal.component";
import Appointment from "@/components/appointment/Appointment.component";
import Button from "@/components/button/Button.component";
import CalendarCard from "@/components/calendars/CalendarCard.component";
import BarChart from "@/components/charts/BarChart.component";
import Drawer from "@/components/drawer/Drawer.component";
import FilterBar from "@/components/filter-bar/FilterBar.component";
import Modal from "@/components/modals/Modal.component";
import NoData from "@/components/no-data/NoData.component";
import Skeleton from "@/components/skeletons/Skeleton.component";
import StatisticsCard from "@/components/statistics-card/StatisticsCard.component";
import Table from "@/components/table/Table.component";
import {
  appointmentStatuses,
  dayMap,
  getAppointmentColumns,
  weekDays,
} from "@/constants";
import { colors } from "@/constants/colors";
import { AppointmentStatus } from "@/enums";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useDeleteAppointmentMutation,
  useGetAppointmentQuery,
  useGetAppointmentsMutation,
  useGetAppointmentStatsByDateMutation,
  useGetServiceCentersMutation,
} from "@/redux/api";
import { useAppSelector } from "@/redux/store";
import { paths } from "@/routes/paths";
import {
  Appointment as AppointmentType,
  BarChartItemType,
  DateRange,
} from "@/types";
import { getDefaultWeekDates } from "@/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

const Appointments = () => {
  const { user_info } = useAppSelector((state) => state.auth);
  const [getAppointments, { data, isLoading }] = useGetAppointmentsMutation();
  const [deleteAppointment, { isLoading: deleteLoading }] =
    useDeleteAppointmentMutation();
  const [appointmentsList, setAppointmentsList] = useState<AppointmentType[]>(
    []
  );
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const { data: appointment, isLoading: appointmentLoading } =
    useGetAppointmentQuery(id, {
      skip: !id,
    });
  const [getAppointmentStats, { isLoading: statsLoading }] =
    useGetAppointmentStatsByDateMutation();
  const [currentAppointments, setCurrentAppointments] = useState("");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isList, setIsList] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState<BarChartItemType[]>([]);

  const [getServiceCenters, { data: serviceCenter }] =
    useGetServiceCentersMutation();

  useEffect(() => {
    const { startDate, endDate } = getDefaultWeekDates();
    handleAppointmentStats(startDate, endDate);
    getServiceCenters({ ownerId: user_info?.userId });
  }, []);

  useEffect(() => {
    getAppointmentsData(AppointmentStatus.NOT_STARTED);
  }, []);

  const getAppointmentsData = (status?: AppointmentStatus) => {
    const submitData = status
      ? {
          status,
          serviceCenterId: serviceCenter?.data?.[0]?.id,
        }
      : {};
    getAppointments(submitData)
      .unwrap()
      .then((res) => {
        setAppointmentsList(res.data);
        const filteredTableData = res.data.map((item) => {
          return {
            id: item?.id,
            status: item?.status ? item?.status : "NOT_STARTED",
            date: item?.date,
            locationType: item?.locationType,
            serviceTitle: item?.service?.title,
            vehicleName: item?.vehicle?.name,
            image: item?.vehicle?.media?.mainItemUrl,
          };
        });
        const filteredCurrentAppointments = res.data.filter(
          (item) => item.status === "IN_PROGRESS"
        );
        setCurrentAppointments(filteredCurrentAppointments.length.toString());
        setTableData(filteredTableData as any);
      });
  };

  const onDelete = () => {
    if (!deleteId) return;
    deleteAppointment(deleteId)
      .unwrap()
      .then((res) => {
        toast.success(res?.meta?.message ?? "Appointment Deleted Successully");
        setDeleteId("");
        getAppointmentsData();
      })
      .catch((err) => {
        if (err?.data?.errors) {
          toast.error(err?.data?.errors);
          return;
        }
        toast.error("Oops an error occcured!");
      });
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleViewDetails = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const columns = getAppointmentColumns(handleDelete, handleViewDetails);

  const handleAppointmentStats = (startDate: string, endDate: string) => {
    const data = {
      startDate,
      endDate,
      range: "WEEK" as DateRange,
    };
    getAppointmentStats(data)
      .unwrap()
      .then((res) => {
        if (res?.data.currentStats) {
          const formattedStats = weekDays.map((day: string) => ({
            name: dayMap[day as keyof typeof dayMap],
            value:
              res?.data.currentStats[
                day as keyof typeof res.data.currentStats
              ] || 0,
          }));
          setWeeklyStats(formattedStats);
        }
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <DashboardLayout showBack={false}>
      <div className="flex gap-x-6">
        <div className="pr-3 flex-[75%] flex flex-col">
          <div
            className={twMerge(
              "mt-6 pr-5",
              expanded && "overflow-y-visible mt-0"
            )}
          >
            {!expanded && (
              <div className="grid grid-cols-2 gap-x-6">
                <div>
                  <StatisticsCard
                    title="Appointments"
                    value={currentAppointments}
                    badgeTitle={"In progress"}
                    icon={<CalendarIcon color={colors.primary} />}
                    second
                  />
                </div>
                <BarChart
                  data={weeklyStats}
                  title="Weekly Appointments"
                  onSelect={(start, end) => handleAppointmentStats(start, end)}
                  isLoading={statsLoading}
                />
              </div>
            )}
            <div className="my-8 justify-between flex">
              <div className="flex items-center gap-x-3">
                <CalendarIcon />
                <h2 className="font-medium">Appointments</h2>
              </div>
              <button
                onClick={() => setExpanded(!expanded)}
                className={twMerge(
                  "rounded-full flex items-center justify-center mr-3 gap-x-3"
                )}
              >
                <h2 className="font-medium text-primary">View all</h2>
                <ExpandIcon color="#FB7C37" />
              </button>
            </div>
            <div>
              <FilterBar
                filters={appointmentStatuses}
                onFilter={(filter) =>
                  getAppointmentsData(filter as AppointmentStatus)
                }
                onGrid={() => {
                  setIsList(false);
                }}
                onList={() => {
                  setIsList(true);
                }}
                isList={isList}
              />
            </div>
            <div
              className={twMerge(
                "flex flex-col gap-y-8 mt-6",
                isList && "gap-y-0 mt-5"
              )}
            >
              <div
                className={twMerge(
                  "flex flex-col gap-y-3",
                  isList && "gap-y-0"
                )}
              >
                <div className="flex gap-x-4 mb-3">
                  <div className="border-borderColor border rounded-xl p-3 w-[250px]">
                    <CalendarIcon color={colors.primary} />
                    {isLoading ? (
                      <Skeleton paragraph={{ rows: 1 }} />
                    ) : (
                      <h2 className="font-bold mt-3 text-2xl">
                        {currentAppointments}
                      </h2>
                    )}
                    <small className="text-sm font-light text-gray-400">
                      Current Appointments
                    </small>
                  </div>
                  <div className="border-borderColor border rounded-xl p-3 w-[250px]">
                    <CalendarIcon color={colors.primary} />
                    {isLoading ? (
                      <Skeleton paragraph={{ rows: 1 }} />
                    ) : (
                      <h2 className="font-bold mt-3 text-2xl">
                        {data?.data?.length}
                      </h2>
                    )}
                    <small className="text-sm font-light text-gray-400">
                      Total Appointments
                    </small>
                  </div>
                </div>
                <div className="flex flex-col gap-y-5 h-screen">
                  {appointmentsList?.length > 0 ? (
                    isList ? (
                      // Show the table when isList is true
                      <Table data={tableData} columns={columns} />
                    ) : (
                      // Show the appointment list (or map) when isList is false
                      appointmentsList?.map((app) => (
                        <Appointment
                          key={app.id}
                          {...app}
                          onDetail={() => {
                            setOpen(true);
                            setId(app.id as string);
                          }}
                        />
                      ))
                    )
                  ) : (
                    <NoData
                      title="No Appointments"
                      message="You haven’t scheduled any appointments yet."
                      isLoading={isLoading}
                      dataLength={appointmentsList?.length}
                    />
                  )}
                </div>
              </div>
              {/* <AppointmentList loading={loading} appointments={appointments} /> */}
            </div>
          </div>
        </div>
        <div
          className={twMerge("flex flex-col flex-[30%]", expanded && "hidden")}
        >
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-base my-4">Today's Calendar</h2>
            <button onClick={() => navigate(paths.calendar)}>
              <ExpandIcon />
            </button>
          </div>
          <div>
            <CalendarCard fullscreen={false} />
          </div>
          <div>
            <Button
              variant="tertiary"
              className="rounded-full w-auto mt-4"
              onClick={() => navigate(paths.calendar)}
            >
              Show Calendar
            </Button>
          </div>
          {/* <div className="gap-y-6 mt-7 flex-col flex">
          <SchedulerCard twBorderColor="" />
          <SchedulerCard
            twBorderColor="bg-[#F4EEFF] "
            twBgcolor=" border-[#744AFF] "
          />
          <SchedulerCard twBorderColor="" />
          <SchedulerCard
            twBorderColor="bg-[#EAFFE9] "
            twBgcolor=" border-[#18B760] "
          />
        </div> */}
        </div>
        <Drawer
          open={open}
          onClose={() => {
            setOpen(false);
            setId("");
          }}
          title="Appointment Details"
          loading={appointmentLoading}
          onNavigate={() =>
            appointment && navigate(`/appointment/${appointment?.data?.id}`)
          }
          width={window.innerWidth * 0.27}
        >
          <AppointmentDetailModal {...appointment?.data} />
        </Drawer>
        <Modal
          open={deleteId?.length > 0}
          onClose={() => setDeleteId("")}
          title="Delete Appointment"
          onOk={onDelete}
          width={window.innerWidth * 0.3}
          okText="Delete"
          confirmLoading={deleteLoading}
        >
          <p>Are you sure you want to delete this appointment</p>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
