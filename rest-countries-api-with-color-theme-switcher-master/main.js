import {
  baseApiLink,
  getCountries,
  queryFields,
  regionQuery,
} from "./modules/getCountries.js";
import { fadeEffect } from "./modules/loader.js";
import { NightMode } from "./modules/theme-switch.js";
const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  if (
    sessionStorage.getItem("region") === "All regions" ||
    sessionStorage.getItem("region") === null
  ) {
    getCountries(`${baseApiLink}${queryFields}`);
  } else {
    getCountries(
      `${regionQuery}${sessionStorage.getItem("region")}${queryFields}`
    );
  }
});

NightMode(".theme-switch", "[data-dark]");

window.addEventListener("load", (e) => {
  fadeEffect;
});
