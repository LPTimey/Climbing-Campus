"use strict";
import * as echarts from "echarts";
/** @import {EChartsOption} from "echarts" */

/**
  @param {HTMLElement} div 
  @param {{
    building: string;
    toLevel: number;
    steps: number;
    notes?: string;
  }[]} data 
 */
export default function StepsStacked(div, data) {
  const buildings = [...new Set(data.map((d) => d.building))];
  const levels = [...new Set(data.map((d) => d.toLevel))].sort((a, b) => a - b);

  const notes = new Map();
  const matrix = new Map();
  levels.forEach((level) => {
    matrix.set(level, new Array(buildings.length).fill(0));
  });
  // FIXME: connect notes correctly, currently they are random if 1 Level Exists more than once
  data.forEach((data) => {
    notes.set(data.toLevel, data.notes);
  });

  data.forEach((d) => {
    const bIndex = buildings.indexOf(d.building);
    matrix.get(d.toLevel)[bIndex] += d.steps * Math.sign(d.toLevel);
  });

  const chart = echarts.init(div);

  /** @type {EChartsOption} */
  const options = {
    tooltip: {
      type: "item",
    },
    textStyle: { color: "#fff" },
    title: {
      text: "Steps per Building",
      left: "center",
      textStyle: {
        color: "#fff",
      },
    },
    series: levels.map((level, i) => {
      const isNegative = level < 0;
      return {
        name: `Level ${level}`,
        type: "bar",
        // stack: "total",
        stack: isNegative ? "neg" : "pos",
        data: matrix.get(level),
        // stackOrder: "seriesAsc",
        stackOrder: isNegative ? "seriesDesc" : "seriesAsc",
        tooltip: {
          formatter: (params) => {
            const buildingIndex = params.dataIndex;
            const currentLevel = levels[i];

            let total = 0;

            for (const lvl of levels) {
              if (isNegative && lvl > 0) continue; // nur negative
              if (!isNegative && lvl < 0) continue; // nur positive

              if (isNegative) {
                if (lvl < currentLevel) continue;
              } else {
                if (lvl > currentLevel) continue;
              }

              total += matrix.get(lvl)[buildingIndex] || 0;
            }

            return `
              <b>${params.name} - ${notes.get(level)}</b><br/>
              ${params.seriesName}<br/>
              Steps (this level): ${params.value}<br/>
              Total up to here: <b>${total}</b><br/>
            `;
          },
        },
      };
    }),
    legend: {
      bottom: 25,
      textStyle: {
        color: "#fff",
      },
    },
    yAxis: {
      type: "value",
      name: "Steps",
    },
    xAxis: {
      type: "category",
      data: buildings.map((building) => ({
        value: building,
        textStyle: { color: "#fff" },
      })),
    },
  };
  chart.setOption(options);
  console.log("Done");
  return chart;
}
