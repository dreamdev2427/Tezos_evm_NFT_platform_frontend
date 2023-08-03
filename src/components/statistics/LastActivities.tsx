import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AiOutlineBarChart } from "react-icons/ai";
import HeadingWithIcon from "../layout/HeadingWithIcon";

//TODO: Create statistics pages --> get data from server

const data = [
  {
    name: new Date("2022-01"),
    pv: 24,
    amt: 2400,
  },
  {
    name: new Date("2022-02"),
    pv: 13,
    amt: 2210,
  },
  {
    name: new Date("2022-03"),
    pv: 98,
    amt: 2290,
  },
  {
    name: new Date("2022-04"),
    pv: 39,
    amt: 2000,
  },
  {
    name: new Date("2022-05"),
    pv: 48,
    amt: 2181,
  },
  {
    name: new Date("2022-06"),
    pv: 38,
    amt: 2500,
  },
  {
    name: new Date("2022-07"),
    pv: 43,
    amt: 2100,
  },
];
const LastActivities = (): JSX.Element => {
  const formatXAxis = (tickItem: Date): string => {
    const d = new Date(tickItem);
    return d.toLocaleString("default", { month: "long" });
  };

  return (
    <div>
      <HeadingWithIcon
        headingText="Activités récentes"
        Icon={<AiOutlineBarChart size={28} />}
      />
      <ResponsiveContainer className="my-10" width={"100%"} height={300}>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            tickFormatter={formatXAxis}
            dataKey="name"
            padding={{ left: 30, right: 30 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#3f51b5" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LastActivities;
