"use strict";
import * as echarts from "echarts";
/** @import {EChartsOption} from "echarts" */

/**
  TODO: make better than this slop
  @param {HTMLElement|echarts.ECharts} chart 
  @param {{
    fromBuilding: string;
    fromLevel: number;
    toBuilding: string;
    toLevel: number;
    steps: number;
    notes?: string;
  }[]} data 
 */
export default function ConnectionsGraph(chart, data) {
  console.log(data);
  if (chart instanceof HTMLElement) {
    chart = echarts.init(chart);
  }
  // TODO: sort data by fromBuilding and fromLevel
  const sortedData = [...data].sort((a, b) => {
    if (a.fromBuilding === b.fromBuilding) {
      return a.fromLevel - b.fromLevel;
    }
    return a.fromBuilding.localeCompare(b.fromBuilding);
  });

  // TODO: create 1 Node for Every Building+Level Combi
  const nodeMap = new Map();
  const nodeId = (b, l) => `${b} (${l})`;

  for (const d of data) {
    const from = nodeId(d.fromBuilding, d.fromLevel);
    const to = nodeId(d.toBuilding, d.toLevel);

    nodeMap.set(from, { id: from, name: from });
    nodeMap.set(to, { id: to, name: to });
  }

  const nodes = Array.from(nodeMap.values());

  // TODO: Create Edges Set
  const edgeSet = new Set();
  const links = [];

  // helper for canonical edge (undirected)
  const edgeKey = (a, b) => (a < b ? `${a}__${b}` : `${b}__${a}`);

  // TODO: Connect Pairs as in data
  for (const d of sortedData) {
    const from = nodeId(d.fromBuilding, d.fromLevel);
    const to = nodeId(d.toBuilding, d.toLevel);

    const key = edgeKey(from, to);
    if (!edgeSet.has(key)) {
      edgeSet.add(key);
      links.push({ source: from, target: to });
    }
  }

  /** @type {echarts.EChartsOption} */
  const options = {
    tooltip: {
      type: "item",
    },
    backgroundColor: "#00000000",
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    textStyle: { color: "#fff" },
    title: {
      text: "Connections between & inside Buildings",
      left: "center",
      textStyle: {
        color: "#fff",
      },
    },
    legend: {
      bottom: 25,
      textStyle: {
        color: "#fff",
      },
    },
    series: [
      {
        type: "graph",
        // layout: "circular",
        layout: "force",
        draggable: true,

        data: nodes,
        links,

        roam: "move",

        label: {
          show: true,
          color: "#fff",
        },

        force: {
          repulsion: 250,
          edgeLength: 0.5,
          initLayout: "circular",
        },

        edgeSymbol: ["none", "none"],

        lineStyle: {
          color: "#aaa",
          opacity: 0.6,
        },
      },
    ],
  };

  chart.setOption(options);
  return chart;
}

/**
  @param {HTMLElement} div 
  @param {{
    fromBuilding: string;
    fromLevel: number;
    toBuilding: string;
    toLevel: number;
  }[]} data 
 */
export function ConnectionsStacked2(div, data) {
  const chart = echarts.init(div);

  const nodeMap = new Map();
  const edgeSet = new Set();

  const getId = (b, l) => `${b} (${l})`;

  const getGroup = (b) => String(b);

  const categories = [];

  const ensureCategory = (b) => {
    if (!categories.includes(b)) categories.push(b);
  };

  const addNode = (id, building) => {
    if (!nodeMap.has(id)) {
      nodeMap.set(id, {
        id,
        name: id,
        category: getGroup(building),
      });
    }
  };

  const links = [];

  for (const d of data) {
    const from = getId(d.fromBuilding, d.fromLevel);
    const to = getId(d.toBuilding, d.toLevel);

    ensureCategory(d.fromBuilding);
    ensureCategory(d.toBuilding);

    addNode(from, d.fromBuilding);
    addNode(to, d.toBuilding);

    const key = from < to ? `${from}__${to}` : `${to}__${from}`;

    if (!edgeSet.has(key)) {
      edgeSet.add(key);
      links.push({ source: from, target: to });
    }
  }

  const nodes = Array.from(nodeMap.values());

  /** @type {EChartsOption} */
  const options = {
    backgroundColor: "transparent",

    title: {
      text: "Building Connections (Clustered)",
      left: "center",
      textStyle: { color: "#fff" },
    },

    legend: [
      {
        data: categories,
        textStyle: { color: "#fff" },
      },
    ],

    series: [
      {
        type: "graph",
        layout: "force",

        data: nodes,
        links,

        categories: categories.map((name) => ({ name })),

        roam: false,

        label: {
          show: true,
          color: "#fff",
          fontSize: 11,
        },

        force: {
          repulsion: 300,
          edgeLength: 140,
          gravity: 0.1,
        },

        edgeSymbol: ["none", "none"],

        lineStyle: {
          color: "#aaa",
          opacity: 0.6,
        },
      },
    ],
  };

  chart.setOption(options);
  return chart;
}
