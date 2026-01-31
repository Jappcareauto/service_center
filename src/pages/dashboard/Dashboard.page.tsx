/* eslint-disable @typescript-eslint/no-explicit-any */
// import DisclosiorAlertComponent from "./components/DisclosiorAlertComponent";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import StatisticIcon from "@/assets/icons/StatisticIcon";
import images from '@/assets/images';
import AppointmentDetailModal from "@/components/appointment-detail-modal/AppointmentDetailModal.component";
import Appointment from "@/components/appointment/Appointment.component";
import Drawer from "@/components/drawer/Drawer.component";
import FilterBar from "@/components/filter-bar/FilterBar.component";
import Invoice from "@/components/invoice/Invoice.component";
import Modal from "@/components/modals/Modal.component";
import NoData from "@/components/no-data/NoData.component";
import Skeleton from "@/components/skeletons/Skeleton.component";
import StatisticsCard from "@/components/statistics-card/StatisticsCard.component";
import Table from "@/components/table/Table.component";
import { appointmentStatuses, getAppointmentColumns } from "@/constants";
import { AppointmentStatus, InvoiceStatus } from "@/enums";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useDeleteAppointmentMutation,
  useGetAppointmentQuery,
  useGetAppointmentsQuery,
  useGetInvoicesQuery,
  useGetPaymentsQuery,
  useGetUserQuery,
} from "@/redux/api";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Appointment as AppointmentType } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

const Dashboard = () => {
  const { user_info } = useAppSelector((state) => state.auth);
  const [status, setStatus] = useState<AppointmentStatus>(
    AppointmentStatus.ALL
  );
  const { data, isLoading } = useGetAppointmentsQuery({
    status,
  });
  const { data: user } = useGetUserQuery(user_info?.userId);
  const { data: payments, isLoading: paymentsLoading } = useGetPaymentsQuery(
    {}
  );
  const { data: invoice, isLoading: invoiceLoading } = useGetInvoicesQuery({
    status: InvoiceStatus.ALL,
  });
  const [deleteAppointment, { isLoading: deleteLoading }] =
    useDeleteAppointmentMutation();
  const [appointmentsList, setAppointmentsList] = useState<AppointmentType[]>(
    []
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [id, setId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const { data: appointment, isLoading: appointmentLoading } =
    useGetAppointmentQuery(id, {
      skip: !id,
    });
  const [revenue, setRevenue] = useState("");
  const [open, setOpen] = useState(false);
  const [isList, setIsList] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (user?.data) {
      dispatch(setUser(user?.data));
      console.log(user?.data)
    }
  }, [dispatch, user]);

  useEffect(() => {
    // console.log("data", data);
    if (data && data?.data) {
      setAppointmentsList(data?.data);
      const filteredTableData = data?.data.map((item) => {
        return {
          id: item.id,
          status: item.status ? item.status : "NOT_STARTED",
          date: item.date,
          locationType: item.locationType,
          serviceTitle: item?.service?.title,
          vehicleName: item?.vehicle?.name,
          image: item?.vehicle?.imageUrl,
        };
      });
      setTableData(filteredTableData as any);
      const totalAmount = payments?.data?.reduce(
        (sum, payment) => sum + (payment?.totalAmount || 0),
        0
      );
      if (totalAmount) {
        setRevenue(`${totalAmount.toString()} XAF`);
      }
    }
  }, [data, payments]);

  const onDelete = () => {
    if (!deleteId) return;
    deleteAppointment(deleteId)
      .unwrap()
      .then((res) => {
        toast.success(res?.meta?.message ?? "Appointment Deleted Successully");
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
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="lg:flex-[65%] flex flex-col">
          <div className="lg:pr-5">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatisticsCard
                title="Appointments"
                value={appointmentsList?.length}
                badgeTitle={"This week"}
                icon={<CalendarIcon color="#fff" />}
                isLoading={isLoading}
              />
              <StatisticsCard
                title="Revenue"
                value={revenue}
                badgeTitle="This Week"
                icon={<StatisticIcon className="text-primary" />}
                second
                isLoading={paymentsLoading}
              />
            </div>

            {/* Recent Appointments */}
            <div className="flex items-center gap-2 mt-6">
              <CalendarIcon />
              <h2 className="font-medium">Recent Appointments</h2>
            </div>
            <div className="mt-6">
              <FilterBar
                filters={appointmentStatuses}
                onFilter={(filter) => {
                  setStatus(filter as AppointmentStatus);
                }}
                onGrid={() => setIsList(false)}
                onList={() => setIsList(true)}
                isList={isList}
              />
            </div>

            {/* Appointments List */}
            <div
              className={twMerge(
                "flex flex-col gap-y-8 mt-10",
                isList && "gap-y-0 mt-5"
              )}
            >
              {!isList && (
                <div>
                  {appointmentsList?.length > 0 && (
                    <p className="font-semibold mb-3">Up Next</p>
                  )}
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
              {appointmentsList?.length > 1 && (
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
                        <Table data={tableData} columns={columns} />
                      ) : (
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
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:flex-[30%] flex flex-col gap-y-6 w-full">
          {/* <BarChart
            data={weeklyStats}
            title="Weekly Appointments"
            onSelect={(start, end) => handleAppointmentStats(start, end)}
            isLoading={statsLoading}
          /> */}
          {invoiceLoading ? (
            <Skeleton />
          ) : invoice?.data?.[0] ? (
            <Invoice
              name={invoice?.data?.[0]?.billedToUser.name}
              email={invoice?.data?.[0]?.billedToUser.email}
              invoiceNumber={invoice?.data?.[0]?.number as string}
              issueDate={invoice?.data?.[0]?.issueDate as string}
              money={invoice?.data?.[0]?.money}
              // service={service?.data?.title}
              status={invoice?.data?.[0]?.status as InvoiceStatus}
              onClick={() => {
                navigate(`/invoice/${invoice?.data?.[0]?.id}`);
                // dispatch(setAppointment(data?.data as Appointment));
              }}
            />
          ) : (
            <div className="bg-purple bg-primaryAccentLight rounded-3xl w-full relative flex items-center h-[120px] px-4">
              <p className="text-gray-400 font-light">
                No Invoice available
              </p>
              <img
                src={images.bgService}
                alt=""
                className="absolute bottom-0 right-2"
              />
            </div>
          )}
          {/* <div className="bg-purple bg-red-400 rounded-3xl w-full relative flex items-center h-[120px] px-4">
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
          </div> */}
        </div>

        {/* Drawer + Modal */}
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
          className="w-full sm:w-[500px] md:w-[600px] lg:w-[700px]"
        >
          <AppointmentDetailModal {...appointment?.data} />
        </Drawer>
        <Modal
          open={deleteId?.length > 0}
          onClose={() => setDeleteId("")}
          title="Delete Appointment"
          onOk={onDelete}
          width={window.innerWidth < 768 ? "90%" : window.innerWidth * 0.3}
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
