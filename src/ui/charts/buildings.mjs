"use strict";
import * as echarts from "echarts";

export default function initBuildingScores() {
  const charts = document.querySelectorAll("#part_A .bar");

  const data = [
    {
      title: "Energy",
      value: 82,
      color: "#5470C6",
    },
    {
      title: "Comfort",
      value: 67,
      color: "#91CC75",
    },
  ];

  charts.forEach((el, index) => {
    const chart = echarts.init(el);

    chart.setOption({
      animation: true,
      grid: {
        left: 90,
        right: 20,
        top: 10,
        bottom: 10,
      },
      xAxis: {
        type: "value",
        max: 100,
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
      yAxis: {
        type: "category",
        data: [data[index].title],
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
      series: [
        {
          type: "bar",
          data: [data[index].value],
          barWidth: 18,
          showBackground: true,
          backgroundStyle: {
            color: "#ececec",
          },
          label: {
            show: true,
            position: "right",
            formatter: "{c}",
            color: "#333",
            fontWeight: "bold",
          },
          itemStyle: {
            color: data[index].color,
            borderRadius: [9, 9, 9, 9],
          },
        },
      ],
    });
  });
}

initBuildingScores()