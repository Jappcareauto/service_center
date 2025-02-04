import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import DatePicker from "@/shared/generics/layouts/date-picker/DatePicker";
import moment from "moment";
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import "../styles/CalendarStyle.scss";
import { CalendarModal } from "./CalendarModal";
// const days = ["M", "T", "W", "T", "F", "S", "S"];

const localizer = momentLocalizer(moment);

const events: Event[] = [
  // Monday, February 3, 2025
  {
    title: "Monday Event 1",
    start: new Date(2025, 1, 3, 9, 0),
    end: new Date(2025, 1, 3, 10, 0),
  },
  {
    title: "Monday Event 2",
    start: new Date(2025, 1, 3, 11, 0),
    end: new Date(2025, 1, 3, 12, 0),
  },

  // Tuesday, February 4, 2025
  {
    title: "Tuesday Event 1",
    start: new Date(2025, 1, 4, 10, 0),
    end: new Date(2025, 1, 4, 11, 0),
  },
  {
    title: "Tuesday Event 2",
    start: new Date(2025, 1, 4, 14, 0),
    end: new Date(2025, 1, 4, 15, 0),
  },

  // Wednesday, February 5, 2025
  {
    title: "Wednesday Event 1",
    start: new Date(2025, 1, 5, 9, 0),
    end: new Date(2025, 1, 5, 10, 0),
  },
  {
    title: "Wednesday Event 2",
    start: new Date(2025, 1, 5, 13, 0),
    end: new Date(2025, 1, 5, 14, 0),
  },

  // Thursday, February 6, 2025
  {
    title: "Thursday Event 1",
    start: new Date(2025, 1, 6, 8, 0),
    end: new Date(2025, 1, 6, 9, 0),
  },
  {
    title: "Thursday Event 2",
    start: new Date(2025, 1, 6, 16, 0),
    end: new Date(2025, 1, 6, 17, 0),
  },

  // Friday, February 7, 2025
  {
    title: "Friday Event 1",
    start: new Date(2025, 1, 7, 9, 0),
    end: new Date(2025, 1, 7, 10, 0),
  },
  {
    title: "Friday Event 2",
    start: new Date(2025, 1, 7, 15, 0),
    end: new Date(2025, 1, 7, 16, 0),
  },

  // Saturday, February 8, 2025
  {
    title: "Saturday Event 1",
    start: new Date(2025, 1, 8, 10, 0),
    end: new Date(2025, 1, 8, 11, 0),
  },
  {
    title: "Saturday Event 2",
    start: new Date(2025, 1, 8, 14, 0),
    end: new Date(2025, 1, 8, 15, 0),
  },

  // Sunday, February 9, 2025
  {
    title: "Sunday Event 1",
    start: new Date(2025, 1, 9, 11, 0),
    end: new Date(2025, 1, 9, 12, 0),
  },
  {
    title: "Sunday Event 2",
    start: new Date(2025, 1, 9, 13, 0),
    end: new Date(2025, 1, 9, 14, 0),
  },

  // Additional events to reach 30
  {
    title: "Additional Event 1",
    start: new Date(2025, 1, 3, 15, 0),
    end: new Date(2025, 1, 3, 16, 0),
  },
  {
    title: "Additional Event 2",
    start: new Date(2025, 1, 3, 17, 0),
    end: new Date(2025, 1, 3, 18, 0),
  },
  {
    title: "Additional Event 3",
    start: new Date(2025, 1, 4, 9, 0),
    end: new Date(2025, 1, 4, 10, 0),
  },
  {
    title: "Additional Event 4",
    start: new Date(2025, 1, 4, 11, 0),
    end: new Date(2025, 1, 4, 12, 0),
  },
  {
    title: "Additional Event 5",
    start: new Date(2025, 1, 5, 10, 0),
    end: new Date(2025, 1, 5, 11, 0),
  },
  {
    title: "Additional Event 6",
    start: new Date(2025, 1, 5, 12, 0),
    end: new Date(2025, 1, 5, 13, 0),
  },
  {
    title: "Additional Event 7",
    start: new Date(2025, 1, 6, 9, 0),
    end: new Date(2025, 1, 6, 10, 0),
  },
  {
    title: "Additional Event 8",
    start: new Date(2025, 1, 6, 11, 0),
    end: new Date(2025, 1, 6, 12, 0),
  },
  {
    title: "Additional Event 9",
    start: new Date(2025, 1, 7, 10, 0),
    end: new Date(2025, 1, 7, 11, 0),
  },
  {
    title: "Additional Event 10",
    start: new Date(2025, 1, 7, 12, 0),
    end: new Date(2025, 1, 7, 13, 0),
  },
  {
    title: "Additional Event 11",
    start: new Date(2025, 1, 8, 9, 0),
    end: new Date(2025, 1, 8, 10, 0),
  },
  {
    title: "Additional Event 12",
    start: new Date(2025, 1, 8, 11, 0),
    end: new Date(2025, 1, 8, 12, 0),
  },
  {
    title: "Additional Event 13",
    start: new Date(2025, 1, 9, 10, 0),
    end: new Date(2025, 1, 9, 11, 0),
  },
  {
    title: "Additional Event 14",
    start: new Date(2025, 1, 9, 12, 0),
    end: new Date(2025, 1, 9, 13, 0),
  },
];

// const WeekTable = () => {
//   return (
//     <table className="table-fixed border-collapse border rounded-xl w-full">
//       <thead>
//         <tr>
//           {days.map((day) => (
//             <th key={day} className="border  px-4 py-2">
//               {day}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {[1, 2, 3].map((row) => (
//           <tr key={row}>
//             {days.map((day) => (
//               <td key={day} className="border p-2  space-y-2">
//                 <div className="bg-greenAccent p-1 rounded-lg">BodyShop</div>
//                 <div className="bg-primaryAccent p-1 rounded-lg">RedBuper</div>
//                 <div className="bg-purple p-1 rounded-lg">Engine</div>
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

export const CalendarView = () => {
  return (
    <div>
      <CalendarModal />
      <div className="flex w-full gap-x-4   ">
        <div className="h-[250px] w-full bg-primaryAccent rounded-xl flex justify-between p-5 items-end ">
          <h3>Calendar</h3>
          <PrimaryButton className=" rounded-full scale-90  bg-background text-primary ">
            Week
          </PrimaryButton>
        </div>
        <DatePicker className="w-[360px] " />
      </div>

      <div className="mt-4">
        {/* <WeekTable /> */}

        <Calendar
        
          className=" "
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={["week"]}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
};
