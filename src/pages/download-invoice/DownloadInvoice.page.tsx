import images from "@/assets/images";
import Button from "@/components/button/Button.component";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const DownloadInvoice = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
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
  };

  return (
    <div className="pt-2 bg-white w-[65%]">
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
            <p className="text-primary text-xl font-semibold">#101020</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-t border-gray-200 mt-10 py-6">
          {/* Billed To */}
          <div className="flex flex-col space-y-3">
            <p className="text-sm text-gray-400">Billed To</p>
            <p className="text-primary font-semibold mt-1 text-sm">Sara May</p>
            <p className="text-sm">Deido, Douala, Cameroon.</p>
            <p className="text-sm">(555)1314–9684</p>
            <p className="text-sm">person@email.com</p>
          </div>

          {/* From */}
          <div className="flex flex-col space-y-3">
            <p className="text-sm text-gray-400">From</p>
            <p className="font-semibold mt-1 text-sm">Dave's Garage</p>
            <p className="text-sm">Tradex Makepe, Douala, Cameroon.</p>
            <p className="text-sm">(555)1314–9684</p>
            <p className="text-sm">person@email.com</p>
          </div>

          {/* Vehicle */}
          <div className="flex flex-col space-y-3 w-[100%]">
            <p className="text-sm text-gray-400">Vehicle Details</p>
            <p className="text-sm w-full justify-between flex">
              <span className="text-gray-400">Make:</span>{" "}
              <span className="font-semibold text-right">Porsche</span>
            </p>
            <p className="text-sm w-full justify-between flex">
              <span className="text-gray-400">Model:</span>
              <span className="font-semibold text-right">Taycan</span>
            </p>
            <p className="text-sm w-full justify-between flex">
              <span className="text-gray-400">Trim:</span>
              <span className="font-semibold text-right">Turbo S</span>
            </p>
            <p className="text-sm w-full justify-between flex">
              <span className="text-gray-400">Year:</span>
              <span className="font-semibold text-right">2024</span>
            </p>
            <p className="text-sm w-full justify-between flex">
              <span className="text-gray-400">VIN:</span>
              <span className="font-semibold text-right">VE8293703</span>
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="flex justify-end">
          <div className="flex flex-col space-y-3 mt-3 w-[31%] self-end">
            <div className="flex justify-between items-center space-x-3">
              <p className="text-sm text-gray-400">Issue Date</p>
              <p className="text-sm font-semibold">20 Oct 2024</p>
            </div>
            <div className="flex justify-between items-center space-x-3">
              <p className="text-sm text-gray-400 ">Due Date</p>
              <p className="text-sm font-semibold">20 Nov 2024</p>
            </div>
          </div>
        </div>

        {/* Charges */}
        <div className="mt-10">
          <h3 className="text-sm font-semibold">Charges</h3>
          <div className="divide-y divide-gray-200 mt-3 space-y-2">
            {[
              { name: "Tyres", price: "4,000.00 XAF" },
              { name: "Spraying", price: "6,000.00 XAF" },
              { name: "Vin Detection", price: "3,400.00 XAF" },
              { name: "Bumper change", price: "1,200.00 XAF" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between py-2 relative pt-4 text-sm text-gray-800 items-center"
              >
                <p className="text-gray-400">{item.name}</p>
                <p>{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 border-t border-t-primary pt-4 space-y-4 text-sm">
          <div className="flex justify-between py-1">
            <span className="text-gray-400">Sub Total</span>
            <span className="font-bold">14,700.00 XAF</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-400">Tax (10%)</span>
            <span className="text-gray-400 font-semibold">1,470.00 XAF</span>
          </div>
        </div>
          <div className="flex justify-between mt-6 bg-primaryAccent text-primary font-bold p-4 rounded">
            <span className='font-normal text-gray-400'>Total</span>
            <span>16,170.00 XAF</span>
          </div>
      </div>
      <div className="flex justify-end px-10 py-4 pb-8">
        <Button onClick={handleDownloadPDF} variant="secondary" className='text-sm'>
          Download Invoice
        </Button>
      </div>
    </div>
  );
};

export default DownloadInvoice;
