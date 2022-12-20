import { fadeEffect } from "./loader.js";
import { NightMode } from "./theme-switch.js";

const d = document,
  $details = d.querySelector(".details"),
  $fragment = d.createDocumentFragment(),
  //queries
  queryFields = `?fields=flags,name,nativeName,population,region,subregion,capital,topLevelDomain,currencies,languages,borders`,
  nameQuery = `https://restcountries.com/v3/name/`,
  alphaQuery = `https://restcountries.com/v2/alpha/`;

const appendDetails = async (json, jsonBorders) => {
  json.forEach((country) => {
    let nativeName = Object.entries(country.name.nativeName)[0][1].official,
      languages = "";

    jsonBorders.languages.forEach((el) => {
      languages += `${el.name}, `;
    });

    $details.querySelector("img").src = country.flags[0];
    $details.querySelector("h1").textContent = country.name.common;

    $details.querySelector(
      ".native-name"
    ).innerHTML = `<b>Native Name:</b> ${nativeName}`;
    $details.querySelector(
      ".population"
    ).innerHTML = `<b>Population:</b> ${country.population.toLocaleString()}`;
    $details.querySelector(
      ".region"
    ).innerHTML = `<b>Region:</b> ${country.region}`;
    $details.querySelector(
      ".sub-region"
    ).innerHTML = `<b>Sub Region:</b> ${country.subregion}`;
    $details.querySelector(
      ".capital"
    ).innerHTML = `<b>Capital:</b> ${country.capital}`;
    $details.querySelector(
      ".top-domain"
    ).innerHTML = `<b>Top Level Domain:</b> ${jsonBorders.topLevelDomain[0]}`;
    $details.querySelector(
      ".currencies"
    ).innerHTML = `<b>Currencies:</b> ${jsonBorders.currencies[0].name}`;
    $details.querySelector(
      ".languages"
    ).innerHTML = `<b>Languages:</b> ${languages.slice(0, -2)}`;
    $details.querySelector("div>b").textContent = `Border Countries:`;

    if (jsonBorders.borders.length === 0) {
      $details.querySelector(
        "div>b"
      ).textContent = `This country has no borders`;
    } else {
      jsonBorders.borders.forEach(async (el) => {
        try {
          console.log(el);
          let response = await fetch(`${alphaQuery}${el}${queryFields}`),
            json = await response.json();

          if (!response.ok)
            throw { statusText: response.statusText, status: response.status };

          const $border = d.createElement("a");

          $border.textContent = json.name;
          $border.dataset.id = el;
          $details.querySelector(".borders").appendChild($border);
        } catch (error) {
          $details.querySelector(".borders").innerHTML = `An error has ocurred`;
        }
      });
    }

    d.addEventListener("click", async (e) => {
      if (e.target.matches(".borders a")) {
        try {
          e.preventDefault();
          let response = await fetch(
              `${alphaQuery}${e.target.dataset.id}${queryFields}`
            ),
            json = await response.json();

          if (!response.ok)
            throw { statusText: response.statusText, status: response.status };

          let country = json.name.replace(
            /(\s\(.*?\))|<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi,
            ""
          );

          sessionStorage.setItem("dataCountry", country);

          location.reload();
        } catch (error) {
          $details.innerHTML = `<h2>An error has ocurred</h2>`;
        }
      }
    });
  });
};

const getCountryDetails = async (url) => {
  try {
    let response = await fetch(url),
      json = await response.json();

    //slice to only 3 char
    let responseBorders = await fetch(
        `${alphaQuery}${json[0].altSpellings[0].slice(0, 3)}${queryFields}`
      ),
      jsonBorders = await responseBorders.json();

    if (!response.ok || !responseBorders.ok)
      throw {
        statusText: response.statusText || responseBorders.statusText,
        status: response.status || responseBorders.status,
        response: json || jsonBorders,
      };

    appendDetails(json, jsonBorders);
  } catch (error) {
    console.error(error);
    $details.innerHTML = `<h2>An error has ocurred</h2>`;
  }
};

getCountryDetails(
  `${nameQuery}${sessionStorage.getItem("dataCountry")}${queryFields}`
);

NightMode(".theme-switch", "[data-dark]");

window.addEventListener("load", (e) => {
  fadeEffect;
});
