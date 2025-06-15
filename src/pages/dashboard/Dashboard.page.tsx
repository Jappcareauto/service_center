/* eslint-disable @typescript-eslint/no-explicit-any */
import images from "@/assets/images";
// import DisclosiorAlertComponent from "./components/DisclosiorAlertComponent";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import StatisticIcon from "@/assets/icons/StatisticIcon";
import AppointmentDetailModal from "@/components/appointment-detail-modal/AppointmentDetailModal.component";
import Appointment from "@/components/appointment/Appointment.component";
import BarChart from "@/components/charts/BarChart.component";
import Drawer from "@/components/drawer/Drawer.component";
import FilterBar from "@/components/filter-bar/FilterBar.component";
import Modal from "@/components/modals/Modal.component";
import NoData from "@/components/no-data/NoData.component";
import StatisticsCard from "@/components/statistics-card/StatisticsCard.component";
import Table from "@/components/table/Table.component";
import {
  appointmentStatuses,
  dayMap,
  getAppointmentColumns,
  weekDays,
} from "@/constants";
import { AppointmentStatus } from "@/enums";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useDeleteAppointmentMutation,
  useGetAppointmentQuery,
  useGetAppointmentsMutation,
  useGetAppointmentStatsByDateMutation,
  useGetPaymentsMutation,
  useGetServiceCentersMutation,
  useGetUserQuery,
  useUpdateAppointmentStatusMutation,
} from "@/redux/api";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  Appointment as AppointmentType,
  BarChartItemType,
  DateRange,
} from "@/types";
import { getDefaultWeekDates, getSubmitData } from "@/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

const Dashboard = () => {
  const { user_info } = useAppSelector((state) => state.auth);

  const [getAppointments, { isLoading }] = useGetAppointmentsMutation();
  const { data: user } = useGetUserQuery(user_info?.userId);
  const [getPayments, { isLoading: paymentsLoading }] = useGetPaymentsMutation(
    {}
  );
  const [getAppointmentStats, { isLoading: statsLoading }] =
    useGetAppointmentStatsByDateMutation();
  const [deleteAppointment, { isLoading: deleteLoading }] =
    useDeleteAppointmentMutation();
  const [appointmentsList, setAppointmentsList] = useState<AppointmentType[]>(
    []
  );
  const [updateStatus, { isLoading: updateStatusLoading }] =
    useUpdateAppointmentStatusMutation({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [id, setId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const {
    data: appointment,
    isLoading: appointmentLoading,
    refetch,
  } = useGetAppointmentQuery(id, {
    skip: !id,
  });
  const [revenue, setRevenue] = useState("");
  const [open, setOpen] = useState(false);
  const [isList, setIsList] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState<BarChartItemType[]>([]);

  useEffect(() => {
    getAppointmentsData(AppointmentStatus.NOT_STARTED);
    const { startDate, endDate } = getDefaultWeekDates();
    handleAppointmentStats(startDate, endDate);
  }, []);

  useEffect(() => {
    if (user?.data) {
      dispatch(setUser(user?.data));
    }
  }, [dispatch, user]);
  const [getServiceCenters, { data: serviceCenter }] =
    useGetServiceCentersMutation();

  useEffect(() => {
    const { startDate, endDate } = getDefaultWeekDates();
    getServiceCenters({ ownerId: user_info?.userId });
    handleAppointmentStats(startDate, endDate);
    getAppointmentsData(AppointmentStatus.NOT_STARTED);
  }, []);

  const getAppointmentsData = (status?: string) => {
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
            id: item.id,
            status: item.status ? item.status : "NOT_STARTED",
            date: item.date,
            locationType: item.locationType,
            serviceTitle: item?.service?.title,
            vehicleName: item?.vehicle?.name,
            image: item?.vehicle?.media?.mainItemUrl,
          };
        });
        setTableData(filteredTableData as any);
      });
    getPayments({})
      .unwrap()
      .then((res) => {
        // setPaymentsList(res.data);
        const totalAmount = res?.data?.reduce(
          (sum, payment) => sum + (payment.money?.amount || 0),
          0
        );
        setRevenue(`${totalAmount.toString()} XAF`);
      });
  };

  const onDelete = () => {
    if (!deleteId) return;
    deleteAppointment(deleteId)
      .unwrap()
      .then((res) => {
        toast.success(res?.meta?.message ?? "Appointment Deleted Successully");
        getAppointmentsData();
        setDeleteId("");
      })
      .catch((err) => {
        if (err?.data?.errors) {
          toast.error(err?.data?.errors);
          return;
        }
        toast.error("Oops an error occcured!");
      });
  };
  const handleUpdateStatus = () => {
    if (appointment?.data?.status) {
      const data = getSubmitData(
        appointment?.data?.status,
        appointment?.data?.id as string
      );
      updateStatus(data as any)
        .unwrap()
        .then((res) => {
          toast.success(
            res?.meta?.message ?? "Appointment Status Successully Updated"
          );
          refetch();
          setId("");
        })
        .catch((err) => {
          if (err?.data?.errors) {
            toast.error(err?.data?.errors);
            return;
          }
          toast.error("Oops an error occcured!");
        });
    }
  };

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

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleViewDetails = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const columns = getAppointmentColumns(handleDelete, handleViewDetails);

  // const collapseItems: CollapseProps["items"] = emergencyItems.map((item) => ({
  //   key: item.id,
  //   label: <EmergencyCardHeading data={item} />,
  //   children: <EmergencyCardBottom data={item} />,
  // }));

  return (
    <DashboardLayout showBack={false}>
      <div className="flex gap-x-4">
        <div className="pr-3 flex-[65%] flex flex-col">
          <div className="mt-6  pr-5">
            <div className="grid grid-cols-2 gap-x-6">
              <div>
                <StatisticsCard
                  title="Appointments"
                  value={appointmentsList?.length}
                  badgeTitle={"This week"}
                  icon={<CalendarIcon className="text-white" />}
                  isLoading={isLoading}
                />
              </div>
              <StatisticsCard
                title="Revenue"
                value={revenue}
                badgeTitle="This Week"
                icon={<StatisticIcon className="text-primary" />}
                second
                isLoading={paymentsLoading}
              />
            </div>
            {/* {emergencies?.data && emergencies?.data?.length > 0 && (
            <div className="my-5">
              <CustomCollapse items={collapseItems} />
            </div>
          )} */}
            <div className="flex items-center gap-x-2 mt-6">
              <CalendarIcon />
              <h2 className="font-medium">Recent Appointments</h2>
            </div>
            <div className="mt-6">
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
                "flex flex-col gap-y-8 mt-10",
                isList && "gap-y-0 mt-5"
              )}
            >
              {!isList && (
                <div>
                  <p className="font-semibold mb-3">Up Next</p>
                  {appointmentsList?.length > 0 ? (
                    <Appointment
                      {...appointmentsList?.[0]}
                      onDetail={() => {
                        setOpen(true);
                        setId(appointmentsList?.[0]?.id as string);
                      }}
                    />
                  ) : (
                    <NoData
                      title="No Appointments"
                      message="You haven’t scheduled any appointments yet."
                      isLoading={isLoading}
                      dataLength={appointmentsList?.length}
                    />
                  )}
                </div>
              )}
              <div
                className={twMerge(
                  "flex flex-col gap-y-3",
                  isList && "gap-y-0"
                )}
              >
                {!isList && <p className="font-semibold mb-3">Later</p>}
                <div className="flex flex-col gap-y-5">
                  {appointmentsList?.length > 0 ? (
                    isList ? (
                      // Show the table when isList is true
                      <Table data={tableData} columns={columns} />
                    ) : (
                      // Show the appointment list (or map) when isList is false
                      appointmentsList?.map((appointment) => (
                        <Appointment
                          key={appointment.id}
                          {...appointment}
                          onDetail={() => {
                            setOpen(true);
                            setId(appointment.id as string);
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
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-[30%] gap-y-6">
          <div>
            <BarChart
              data={weeklyStats}
              title="Weekly Appointments"
              onSelect={(start, end) => handleAppointmentStats(start, end)}
              isLoading={statsLoading}
            />
            <div className="bg-purple rounded-3xl w-full relative flex items-center h-[120px] px-4">
              <p className="text-2xl font-light">
                Vehicle
                <br />
                Reports
              </p>
              <img
                src={images.bgService}
                alt=""
                className="absolute bottom-0 right-2"
              />
            </div>
          </div>
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
        >
          <AppointmentDetailModal
            {...appointment?.data}
            onClick={handleUpdateStatus}
            isLoading={updateStatusLoading}
          />
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

export default Dashboard;
