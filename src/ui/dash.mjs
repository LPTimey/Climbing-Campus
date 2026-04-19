"use strict";
import * as echarts from "echarts";

import { getBarrierData } from "@/data/barriers.mjs";
import { getConnectionData } from "@/data/connections.mjs";
import { getStepData } from "@/data/steps.mjs";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    #chart {
      width: 160ch;
      height: 500px;
    }
  </style>

  <div id="chart"></div>
`;

class Dash extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true),
    );
  }

  connectedCallback() {
    this._render();
  }

  /// TODO: make good non slop Graph
  async _render() {
    if (!this.shadowRoot) {
      return;
    }
    const stepData = await getStepData();
    const connections = await getConnectionData();
    const barriers = await getBarrierData();

    const chartDom = this.shadowRoot.getElementById("chart");
    const chart = echarts.init(chartDom);

    // ----------------------------
    // Node Handling
    // ----------------------------
    const nodeMap = new Map();
    const stepsByBuilding = new Map();
    // init
    stepData.forEach((s) => {
      if (!stepsByBuilding.has(s.building)) {
        stepsByBuilding.set(s.building, []);
      }
      stepsByBuilding.get(s.building).push(s);
    });

    // sortieren (wichtig!)
    for (const [b, arr] of stepsByBuilding.entries()) {
      arr.sort((a, b) => a.toLevel - b.toLevel);
    }

    const getKey = (building, level) => `${building}-${level}`;

    const getCumulativeSteps = (building, level) => {
      const steps = stepsByBuilding.get(building) || [];

      return steps
        .filter((s) => s.toLevel <= level)
        .reduce((sum, s) => sum + s.steps, 0);
    };

    const ensureNode = (building, level) => {
      const key = getKey(building, level);
      const steps = getCumulativeSteps(building, level);

      if (!nodeMap.has(key)) {
        nodeMap.set(key, {
          id: key,
          name: `${building} (L${level})`,
          value: level,
          symbolSize: 40,
          itemStyle: { color: "#5470c6" },
          tooltip: {
            formatter: `
              🏢 ${building}<br>
              📍 Level: ${level}<br>
              🪜 kumulierte Schritte: <b>${steps}</b>
            `,
          },
        });
      }

      return key;
    };

    // ----------------------------
    // Build nodes from all datasets
    // ----------------------------

    stepData.forEach((s) => {
      ensureNode(s.building, s.toLevel);
      ensureNode(s.building, s.toLevel - 1);
    });

    connections.forEach((c) => {
      ensureNode(c.fromBuilding, c.fromLevel);
      ensureNode(c.toBuilding, c.toLevel);
    });

    barriers.forEach((b) => {
      ensureNode(b.building, b.level);
    });

    // ----------------------------
    // Links
    // ----------------------------
    const links = [];

    // --- Step transitions (vertical movement)
    stepData.forEach((s) => {
      const from = ensureNode(s.building, s.toLevel - 1);
      const to = ensureNode(s.building, s.toLevel);

      links.push({
        source: from,
        target: to,

        label: {
          show: true,
          formatter: `${s.steps} Stufen`,
        },

        tooltip: {
          formatter: `
            🏢 ${s.building}<br>
            Level ${s.toLevel - 1} ↔ ${s.toLevel}<br>
            🪜 Schritte: <b>${s.steps}</b>
          `,
        },

        lineStyle: {
          color: "#91cc75",
          width: 2,
        },
      });
    });

    // --- Building connections
    connections.forEach((c) => {
      const from = ensureNode(c.fromBuilding, c.fromLevel);
      const to = ensureNode(c.toBuilding, c.toLevel);

      links.push({
        source: from,
        target: to,
        lineStyle: {
          color: "#fac858",
          width: 2,
        },
      });
    });

    // --- Level 0 full mesh connection (implicit rule)
    const level0Nodes = Array.from(nodeMap.values()).filter(
      (n) => n.value === 0,
    );

    for (let i = 0; i < level0Nodes.length; i++) {
      for (let j = i + 1; j < level0Nodes.length; j++) {
        links.push({
          source: level0Nodes[i].id,
          target: level0Nodes[j].id,
          lineStyle: {
            color: "#999",
            type: "dashed",
          },
        });
      }
    }

    // ----------------------------
    // Barriers styling
    // ----------------------------
    barriers.forEach((b) => {
      const key = getKey(b.building, b.level);
      const node = nodeMap.get(key);

      if (node) {
        node.itemStyle = {
          color: "#66ee66",
        };

        node.symbol = "diamond";

        node.tooltip = {
          formatter: b.note,
        };
      }
    });

    // ----------------------------
    // Layout (simple structured grid)
    // ----------------------------
    const buildings = [...new Set(stepData.map((s) => s.building))];

    const levels = [
      ...new Set(Array.from(nodeMap.values()).map((n) => n.value)),
    ];

    nodeMap.forEach((node) => {
      const buildingIndex = buildings.indexOf(node.id.split("-")[0]);
      const level = node.value;

      node.x = buildingIndex * 200;
      node.y = -level * 120;
    });

    // ----------------------------
    // ECharts option
    // ----------------------------
    const option = {
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          type: "graph",
          roam: true,

          data: Array.from(nodeMap.values()),
          links,

          label: {
            show: true,
          },

          edgeSymbol: ["none", "arrow"],
          edgeSymbolSize: 8,
        },
      ],
    };

    chart.setOption(option);
  }
}

customElements.define("dash-board", Dash);
