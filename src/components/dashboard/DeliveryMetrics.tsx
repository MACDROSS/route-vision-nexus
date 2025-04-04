
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for the chart
const data = [
  { day: 'Mon', onTime: 94, delayed: 6 },
  { day: 'Tue', onTime: 92, delayed: 8 },
  { day: 'Wed', onTime: 88, delayed: 12 },
  { day: 'Thu', onTime: 96, delayed: 4 },
  { day: 'Fri', onTime: 90, delayed: 10 },
  { day: 'Sat', onTime: 86, delayed: 14 },
  { day: 'Sun', onTime: 98, delayed: 2 },
];

const DeliveryMetrics = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Delivery Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              stackOffset="expand"
              barSize={25}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, '']} />
              <Bar dataKey="onTime" name="On Time" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="delayed" name="Delayed" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-courier-500 rounded"></div>
              <span className="text-sm">On Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-[#f97316] rounded"></div>
              <span className="text-sm">Delayed</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryMetrics;
