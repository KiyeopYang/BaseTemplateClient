import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { Colors } from 'constants/theme';
import { MetricValue } from 'types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

type Props = {
  label: string;
  data: MetricValue[];
};
const MetricHistoriesChart = (props: Props) => {
  const [data, setData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    const labels = props.data.map((item) =>
      dayjs(item.datetime).format('MM/DD')
    );
    const canvas = document.createElement('canvas');
    let backgroundGradient;
    let borderGradient;
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        backgroundGradient = ctx.createLinearGradient(30, 20, 300, 100);
        backgroundGradient.addColorStop(0, 'rgba(68, 204, 255, 0.25)');
        backgroundGradient.addColorStop(1, 'rgba(68, 79, 255, 0.25)');
        borderGradient = ctx.createLinearGradient(30, 20, 300, 100);
        borderGradient.addColorStop(0, 'rgba(68, 204, 255, 0.25)');
        borderGradient.addColorStop(1, 'rgba(68, 79, 255, 0.75)');
      }
    }
    const datasets = props.data.map((item) => item.value);
    setData({
      labels,
      datasets: [
        {
          fill: true,
          label: props.label,
          data: datasets,
          backgroundColor: backgroundGradient,
          borderColor: borderGradient,
          borderWidth: 2,
          pointRadius: props.data.map((_, i) =>
            i === props.data.length - 1 ? 3 : 0
          ),
          pointBackgroundColor: Colors.primary['500'],
          pointBorderColor: Colors.primary['500'],
        },
      ],
    });
  }, [props]);
  return (
    <Line
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          y: {
            min: 0,
          },
        },
      }}
      height={230}
    />
  );
};
export default MetricHistoriesChart;
