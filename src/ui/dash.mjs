import { getBarrierData } from "@/data/barriers.mjs";
import { getConnectionData } from "@/data/connections.mjs";
import { getStepData } from "@/data/steps.mjs";

const stepData = getStepData();
const connections = getConnectionData();
const barriers = getBarrierData();

const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: block;
    }
  </style>

  <div>
    <slot></slot>
  </div>
`;

class Dash extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.stepData = stepData;
    this.connections = connections;
    this.barriers = barriers;
  }
  connectedCallback() {
    this._render();
  }
  async _render() {
    const stepData = await this.stepData;
    const connections = await this.connections;
    const barriers = await this.barriers;

    this.shadowRoot.append(JSON.stringify(stepData))
    this.shadowRoot.append(JSON.stringify(connections))
    this.shadowRoot.append(JSON.stringify(barriers))

  }
}

customElements.define("dash-board",Dash)
