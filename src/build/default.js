/**
 * Main entry point for the NightSky web component.
 * This file imports the necessary styles and defines the custom element.
 * It is the starting point for the build process.
 */

import "../main.css";
import { NightSky } from "../NightSky.js";

window.customElements.define("night-sky", NightSky);
