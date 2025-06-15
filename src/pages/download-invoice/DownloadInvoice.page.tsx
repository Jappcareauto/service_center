import images from "@/assets/images";
import Button from "@/components/button/Button.component";
import DashboardLayout from '@/layouts/DashboardLayout';
import { useAppSelector } from "@/redux/store";
import { InvoiceData } from "@/types";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

const DownloadInvoice = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { invoice: myInvoice } = useAppSelector((state) => state.appointment);
  const [isLoading, setIsLoading] = useState(false);
  const invoice: InvoiceData = myInvoice;
  const handleDownloadPDF = async () => {
    setIsLoading(true);
    const element = invoiceRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
    setIsLoading(false);
  };

  return (
    <DashboardLayout showBack>
      <div className="pt-2 bg-white w-[80%]">
        <div
          className="max-w-4xl mx-auto bg-white p-10 font-sans text-gray-800"
          ref={invoiceRef}
        >
          {/* Header */}
          <div className="flex justify-between items-start ">
            <div className="w-32">
              <img src={images.logo} alt="Logo" className="h-full w-full" />
            </div>
            <div className="text-right">
              <h2 className="text-primary text-sm font-medium">Invoice</h2>
              <p className="text-primary text-xl font-semibold">
                #: system generated
              </p>
            </div>
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-t border-gray-200 mt-10 py-6">
            {/* Billed To */}
            <div className="flex flex-col space-y-3">
              <p className="text-sm text-gray-400">Billed To</p>
              <p className="text-primary font-semibold mt-1 text-sm">
                {invoice?.billedTo?.name}
              </p>
              {invoice?.billedTo?.location && (
                <p className="text-sm">
                  {invoice?.billedTo?.location ?? "N/A"}
                </p>
              )}
              {invoice?.billedTo?.phone && (
                <p className="text-sm">{invoice?.billedTo?.phone ?? "N/A"}</p>
              )}
              {invoice?.billedTo?.email && (
                <p className="text-sm">{invoice?.billedTo?.email ?? "N/A"}</p>
              )}
            </div>

            {/* From */}
            <div className="flex flex-col space-y-3">
              <p className="text-sm text-gray-400">From</p>
              <p className="text-primary font-semibold mt-1 text-sm">
                {invoice?.billedFrom?.name}
              </p>
              {invoice?.billedFrom?.location && (
                <p className="text-sm">
                  {invoice?.billedFrom?.location ?? "N/A"}
                </p>
              )}
              {invoice?.billedFrom?.phone && (
                <p className="text-sm">{invoice?.billedFrom?.phone ?? "N/A"}</p>
              )}
              {invoice?.billedFrom?.email && (
                <p className="text-sm">{invoice?.billedFrom?.email ?? "N/A"}</p>
              )}
            </div>

            {/* Vehicle */}
            <div className="flex flex-col space-y-3 w-[100%]">
              <p className="text-sm text-gray-400">Vehicle Details</p>
              {invoice?.vehicle?.make && (
                <p className="text-sm w-full justify-between flex">
                  <span className="text-gray-400">Make:</span>{" "}
                  <span className="font-semibold text-right">
                    {invoice?.vehicle?.make}
                  </span>
                </p>
              )}
              {invoice?.vehicle?.model && (
                <p className="text-sm w-full justify-between flex">
                  <span className="text-gray-400">Model:</span>{" "}
                  <span className="font-semibold text-right">
                    {invoice?.vehicle?.model}
                  </span>
                </p>
              )}

              {invoice?.vehicle?.trim && (
                <p className="text-sm w-full justify-between flex">
                  <span className="text-gray-400">Trim:</span>{" "}
                  <span className="font-semibold text-right">
                    {invoice?.vehicle?.trim}
                  </span>
                </p>
              )}
              {invoice?.vehicle?.year && (
                <p className="text-sm w-full justify-between flex">
                  <span className="text-gray-400">Year:</span>{" "}
                  <span className="font-semibold text-right">
                    {invoice?.vehicle?.year}
                  </span>
                </p>
              )}
              {invoice?.vehicle?.vin && (
                <p className="text-sm w-full justify-between flex">
                  <span className="text-gray-400">VIN:</span>{" "}
                  <span className="font-semibold text-right">
                    {invoice?.vehicle?.vin}
                  </span>
                </p>
              )}
              {invoice?.vehicle?.regNumber && (
                <p className="text-sm w-full justify-between flex">
                  <span className="text-gray-400">REG Number:</span>{" "}
                  <span className="font-semibold text-right">
                    {invoice?.vehicle?.regNumber}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="flex justify-end">
            <div className="flex flex-col space-y-3 mt-3 w-[31%] self-end">
              <div className="flex justify-between items-center space-x-3">
                <p className="text-sm text-gray-400">Issue Date</p>
                <p className="text-sm font-semibold">
                  {dayjs(invoice?.issueDate).format("DD MMMM YYYY")}
                </p>
              </div>
              <div className="flex justify-between items-center space-x-3">
                <p className="text-sm text-gray-400 ">Due Date</p>
                <p className="text-sm font-semibold">
                  {dayjs(invoice?.dueDate).format("DD MMMM YYYY")}
                </p>
              </div>
            </div>
          </div>

          {/* Charges */}
          <div className="mt-10">
            <h3 className="text-sm font-semibold">Charges</h3>
            <div className="divide-y divide-gray-200 mt-3 space-y-2">
              {invoice?.items ? (
                invoice?.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between py-2 relative pt-4 text-sm text-gray-800 items-center"
                  >
                    <p className="text-gray-400">{item.name}</p>
                    <p>{item.price} XAF</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No Items Purchased</p>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 border-t border-t-primary pt-4 space-y-4 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-gray-400">Sub Total</span>
              <span className="font-bold">{invoice?.total} XAF</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-400">Tax ({invoice?.tax}) %</span>
              <span className="text-gray-400 font-semibold">
                {invoice?.total} XAF
              </span>
            </div>
          </div>
          <div className="flex justify-between mt-6 bg-primaryAccent text-primary font-bold p-4 rounded">
            <span className="font-normal text-gray-400">Total</span>
            <span>{invoice?.total} XAF</span>
          </div>
        </div>
        <div className="flex justify-end px-32 py-4 pb-8">
          <Button
            onClick={handleDownloadPDF}
            variant="secondary"
            className="text-sm"
            isLoading={isLoading}
          >
            Download Invoice
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DownloadInvoice;
