import { stat } from "fs";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
    Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function LineChartVisual() {
  const data = useSelector((state: RootState) => state.eonet.magnitudeData);
  return (
    <ResponsiveContainer>
      <LineChart
        width={500}
        height={300}
        data={data?.length > 0 ? data : []}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" />
        <YAxis yAxisId="left" dataKey={"mValue"}/>
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="mValue"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Brush />
      </LineChart>
    </ResponsiveContainer>
  );
}
