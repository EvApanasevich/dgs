"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { SensorType, SensorValueType } from "@/types/types";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

type LineChartPropsType = {
  sensors: Array<SensorType> | undefined;
  sensorsValues: Array<SensorValueType> | undefined;
  from: string;
  to: string;
};

export function LineChart({
  sensors,
  sensorsValues,
  from,
  to,
}: LineChartPropsType) {
  const session = useSession();
  const params = useParams();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Показатели за период с ( ${from} ) по ( ${to} )`,
      },
    },
  };

  const labels = sensorsValues?.map((item) => item.date);
  const currentSensName = sensors?.find(
    (sen) => sen.id === Number(params.sensorId)
  );

  const data = {
    labels,
    datasets: [
      {
        label: currentSensName?.name,
        data: sensorsValues?.map((item) => item.value),
        borderWidth: 1,
        pointRadius: 0,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 255, 255)",
      },
    ],
  };

  if (sensorsValues?.length === 0)
    return <div className="text-red-500">Данные за период отсутствуют</div>;

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
