import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function DashboardChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
        datasets: [
          {
            label: "Inscriptions",
            data: [45, 60, 75, 90, 110, 130],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59,130,246,0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="mb-4 text-lg font-semibold text-white">
        Évolution des inscriptions
      </h2>

      <canvas ref={chartRef}></canvas>
    </div>
  );
}