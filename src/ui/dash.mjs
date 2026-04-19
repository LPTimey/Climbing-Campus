"use strict";
import * as echarts from "echarts";

import { getBarrierData } from "@/data/barriers.mjs";
import { getConnectionData } from "@/data/connections.mjs";
import { getStepData } from "@/data/steps.mjs";
import StepsStacked from "./charts/steps.mjs";
import ConnectionsGraph from "./charts/connections.mjs";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: grid;
      gap: 2rem;
    }
    #chart, #graph {
      width: 160ch;
      height: 45rem;
    }
  </style>

  <div id="chart"></div>
  <div id="graph"></div>
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

    const chartDom = /** @type {HTMLDivElement} */(this.shadowRoot.getElementById("chart"));
    StepsStacked(chartDom, stepData);

    const graphDom = /** @type {HTMLDivElement} */ (
      this.shadowRoot.getElementById("graph")
    );
    ConnectionsGraph(graphDom, connections);
    return;
  }
}

customElements.define("dash-board", Dash);
