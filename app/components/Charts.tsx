"use client";
import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController, DoughnutController, LineElement, PointElement, LineController } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController, DoughnutController, LineElement, PointElement, LineController);

export function StatusChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const chart = new Chart(ref.current!, {
      type: "doughnut",
      data: {
        labels: ["Bekerja", "Wirausaha", "Melanjutkan Studi", "Mencari Kerja"],
        datasets: [{ data: [65, 15, 12, 8], backgroundColor: ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"], borderWidth: 0 }],
      },
      options: { plugins: { legend: { position: "bottom" } } },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

export function FakultasChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const chart = new Chart(ref.current!, {
      type: "bar",
      data: {
        labels: ["FT", "FKIP", "FE", "FH", "FIKES", "FISIP"],
        datasets: [{ label: "Alumni Bekerja (%)", data: [78, 72, 85, 70, 88, 75], backgroundColor: "#3b82f6", borderRadius: 6 }],
      },
      options: { scales: { y: { beginAtZero: true, max: 100 } }, plugins: { legend: { display: false } } },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

export function GajiChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const chart = new Chart(ref.current!, {
      type: "bar",
      data: {
        labels: ["< 3 Jt", "3-5 Jt", "5-7 Jt", "7-10 Jt", "> 10 Jt"],
        datasets: [{ label: "Persentase", data: [15, 35, 28, 15, 7], backgroundColor: ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#8b5cf6"], borderRadius: 6 }],
      },
      options: { scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

export function WaktuTungguChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const chart = new Chart(ref.current!, {
      type: "doughnut",
      data: {
        labels: ["< 3 Bulan", "3-6 Bulan", "6-12 Bulan", "> 12 Bulan"],
        datasets: [{ data: [45, 27, 18, 10], backgroundColor: ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"], borderWidth: 0 }],
      },
      options: { plugins: { legend: { position: "bottom" } } },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}
