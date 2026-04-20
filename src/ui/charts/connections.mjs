"use strict";
import * as echarts from "echarts";

/** @typedef {import("echarts").EChartsOption} EChartsOption */
/** @typedef {import("echarts").GraphSeriesOption} GraphSeriesOption */

/**
 * @typedef {Object} Connection
 * @property {string} fromBuilding
 * @property {number} fromLevel
 * @property {string} toBuilding
 * @property {number} toLevel
 * @property {number} [steps]
 * @property {string} [notes]
 */

/**
 * @typedef {Object} GraphNode
 * @property {string} id
 * @property {string} name
 * @property {number} category
 */

/**
 * @typedef {Object} GraphLink
 * @property {string} source
 * @property {string} target
 */

/**
 * Unified graph with building categories
 *
 * @param {HTMLElement | echarts.ECharts} chart
 * @param {Connection[]} data
 * @returns {echarts.ECharts}
 */
export default function ConnectionsGraph(chart, data) {
  if (chart instanceof HTMLElement) {
    chart = echarts.init(chart);
  }

  /** @type {Map<string, GraphNode>} */
  const nodeMap = new Map();

  /** @type {Set<string>} */
  const edgeSet = new Set();

  /** @type {GraphLink[]} */
  const links = [];

  /**
   * @param {string} building
   * @param {number} level
   */
  const getId = (building, level) => `${building} (${level})`;

  /** @type {string[]} */
  const categories = [];

  /**
   * @param {string} building
   */
  const ensureCategory = (building) => {
    if (!categories.includes(building)) categories.push(building);
  };

  /**
   * @param {string} id
   * @param {string} building
   */
  const addNode = (id, building) => {
    if (!nodeMap.has(id)) {
      nodeMap.set(id, {
        id,
        name: id,
        category: categories.indexOf(building),
      });
    }
  };

  for (const d of data) {
    ensureCategory(d.fromBuilding);
    ensureCategory(d.toBuilding);

    const from = getId(d.fromBuilding, d.fromLevel);
    const to = getId(d.toBuilding, d.toLevel);

    addNode(from, d.fromBuilding);
    addNode(to, d.toBuilding);

    const key = from < to ? `${from}__${to}` : `${to}__${from}`;

    if (!edgeSet.has(key)) {
      edgeSet.add(key);
      links.push({ source: from, target: to });
    }
  }

  const degreeMap = new Map();

  for (const l of links) {
    degreeMap.set(l.source, (degreeMap.get(l.source) ?? 0) + 1);
    degreeMap.set(l.target, (degreeMap.get(l.target) ?? 0) + 1);
  }

  // --- Nodes mit Größe + Farbe ---
  const nodes = Array.from(nodeMap.values()).map((node) => {
    const degree = degreeMap.get(node.id) ?? 0;

    return {
      ...node,
      symbolSize: 10 + degree * 5,

      // itemStyle: {
      //   color: degree > 8 ? "#ff6b6b" : degree > 4 ? "#ffd166" : "#4dabf7",
      // },
    };
  });

  /** @type {GraphSeriesOption[]} */
  const series = [
    {
      type: "graph",
      layout: "force",

      data: nodes,
      links,

      categories: categories.map((name) => ({ name })),

      legendHoverLink: false,

      draggable: true,
      roam: true,
      scaleLimit: {
        min: 0.5,
        max: 3,
      },

      label: {
        show: true,
        color: "#fff",
        backgroundColor: "#99999940",
        align: "left",
      },

      force: {
        repulsion: 500,
        edgeLength: 50,
        gravity: 0.2,
      },
      emphasis: {
        focus: "adjacency",
        lineStyle: {
          width: 5,
        },
      },

      lineStyle: {
        color: "#aaa",
        opacity: 0.6,
      },
    },
  ];

  /** @type {EChartsOption} */
  const options = {
    backgroundColor: "transparent",

    title: {
      text: "Building Connections",
      left: "center",
      textStyle: { color: "#fff" },
    },

    legend: {
      data: categories,
      bottom: 20,
      textStyle: { color: "#fff" },
    },

    tooltip: {
      trigger: "item",
    },

    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: { type: "png" },
      },
    },

    series,
  };

  chart.setOption(options);
  return chart;
}
