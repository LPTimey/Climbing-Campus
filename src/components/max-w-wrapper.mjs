"use strict";
const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .content-width{
      width: var(--content-width);
      &[data-center]{
        margin-inline: auto;
      }
      &[data-small]{
        width: var(--text-width);
      }
    }
  </style>

  <div class="content-width">
    <slot></slot>
  </div>
`;

export class MaxWWrapper extends HTMLElement {
  static get observedAttributes() {
    return ["center", "small", "as-child"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true),
    );
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    if (!this.shadowRoot) {
      return;
    }
    const center = this.hasAttribute("center");
    const small = this.hasAttribute("small");
    const asChild = this.hasAttribute("as-child");

    const wrapper = /** @type {HTMLDivElement|HTMLElement} */ (
      this.shadowRoot.querySelector(".content-width")
    );
    const slot = /** @type {HTMLSlotElement} */ (
      this.shadowRoot.querySelector("slot")
    );

    // Reset
    wrapper.removeAttribute("data-center");
    wrapper.removeAttribute("data-small");
    wrapper.style.display = "";

    if (center) wrapper.setAttribute("data-center", "");
    if (small) wrapper.setAttribute("data-small", "");

    if (asChild) {
      const assigned = slot.assignedElements();

      if (assigned.length === 1) {
        const child = assigned[0];

        child.classList.add("content-width");

        if (center) child.setAttribute("data-center", "");
        if (small) child.setAttribute("data-small", "");

        wrapper.replaceWith(child);
      }
    }
  }
}

customElements.define("max-w-wrapper", MaxWWrapper);
