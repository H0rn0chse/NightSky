var y = (o, i, e) => {
  if (!i.has(o))
    throw TypeError("Cannot " + e);
};
var t = (o, i, e) => (y(o, i, "read from private field"), e ? e.call(o) : i.get(o)), n = (o, i, e) => {
  if (i.has(o))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(o) : i.set(o, e);
}, a = (o, i, e, m) => (y(o, i, "write to private field"), m ? m.call(o, e) : i.set(o, e), e);
var C = (o, i, e) => (y(o, i, "access private method"), e);
const L = `:host{display:block;position:absolute;cursor:pointer;overflow:hidden;clip-path:polygon(0% 0%,100% 0%,100% 100%)}:host([placement="top-left"]){top:0;left:0;transform:scaleX(-1)}:host([placement="top-right"]){top:0;right:0}:host([placement="bottom-left"]){bottom:0;left:0;transform:scale(-1)}:host([placement="bottom-right"]){bottom:0;right:0;transform:scaleY(-1)}.link{display:inline-block;position:relative;height:100%;width:100%}svg.container{position:absolute;height:100%;width:100%}.link:hover path[part=octocat-arm],.link:active path[part=octocat-arm]{animation-name:wave-hand;animation-timing-function:ease-in-out;animation-iteration-count:1}@keyframes wave-hand{0%,to{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}
`, N = `<div style="display: none">
  <slot name="svg"></slot>
</div>
<a part="anchor" class="link" target="_blank">
  <svg class="container" viewBox="0 0 250 250" aria-hidden="true">

    <path part="banner" d="M 0.5 0 H 250 V 249.5 Z"></path>

    <g part="octocat">
      <path part="octocat-arm" style="transform-origin: 132px 106px;"
        d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2">
      </path>

      <path part="octocat-body"
        d="M114.0,116.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 140.5,142.5 Z">
      </path>
    </g>
  </svg>
</a>`, S = "github-corner", _ = [
  "size",
  "href",
  "placement",
  "banner-color",
  "octocat-color",
  "wave-duration"
], k = document.createElement("template");
k.innerHTML = N;
const A = ["top-right", "top-left", "bottom-right", "bottom-left"], w = "5rem", M = "black", O = "white", q = "0.5s";
var s, g, h, l, p, d, b, u, v, T, f, E;
class R extends HTMLElement {
  constructor() {
    super();
    n(this, v);
    n(this, f);
    n(this, s, void 0);
    n(this, g, void 0);
    n(this, h, void 0);
    n(this, l, void 0);
    n(this, p, void 0);
    n(this, d, void 0);
    n(this, b, []);
    n(this, u, "init");
    a(this, s, this.attachShadow({ mode: "open" }));
    const e = document.createElement("style");
    e.textContent = L, t(this, s).append(e, k.content.cloneNode(!0)), a(this, g, t(this, s).querySelector("a.link")), a(this, h, t(this, s).querySelector(
      "svg.container"
    )), a(this, l, t(this, s).querySelector(
      "path[part=banner]"
    )), a(this, p, t(this, s).querySelector(
      "g[part=octocat]"
    )), a(this, d, t(this, s).querySelector(
      "path[part=octocat-arm]"
    ));
    const m = t(this, s).querySelector(
      "slot[name=svg]"
    );
    m.addEventListener("slotchange", () => {
      t(this, b).forEach((c) => {
        t(this, h).contains(c) && t(this, h).removeChild(c);
      });
      const r = m.assignedNodes().filter((c) => c.nodeName === "svg");
      a(this, b, r.map((c) => c.cloneNode(!0))), t(this, b).forEach((c) => t(this, h).append(c));
    });
  }
  connectedCallback() {
    t(this, u) === "init" && C(this, v, T).call(this), a(this, u, "connected");
  }
  disconnectedCallback() {
    a(this, u, "disconnected");
  }
  static get observedAttributes() {
    return _;
  }
  attributeChangedCallback(e, m, r) {
    switch (e) {
      case "size":
        C(this, f, E).call(this, r);
        break;
      case "href":
        t(this, g).setAttribute("href", r);
        break;
      case "banner-color":
        t(this, l).setAttribute("fill", r);
        break;
      case "octocat-color":
        t(this, p).setAttribute("fill", r);
        break;
      case "wave-duration":
        t(this, d).style.setProperty("animation-duration", r);
        break;
      case "placement":
        if (!A.includes(r)) {
          this.setAttribute("placement", A[0]);
          break;
        }
    }
  }
}
s = new WeakMap(), g = new WeakMap(), h = new WeakMap(), l = new WeakMap(), p = new WeakMap(), d = new WeakMap(), b = new WeakMap(), u = new WeakMap(), v = new WeakSet(), T = function() {
  const e = this.getAttribute("size");
  C(this, f, E).call(this, e || w), t(this, l).getAttribute("fill") || t(this, l).setAttribute("fill", M), t(this, p).getAttribute("fill") || t(this, p).setAttribute("fill", O), t(this, d).style.getPropertyValue("animation-duration") || t(this, d).style.setProperty("animation-duration", q), this.getAttribute("placement") || this.setAttribute("placement", A[0]);
}, f = new WeakSet(), E = function(e) {
  this.style.width = e, this.style.height = e;
};
customElements.define(S, R);
//# sourceMappingURL=github-corner-element.es.js.map
