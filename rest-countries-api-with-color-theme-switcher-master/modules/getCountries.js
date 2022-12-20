const d = document,
  $template = d.getElementById("template").content,
  $fragment = d.createDocumentFragment(),
  $section = d.querySelector(".countries"),
  $searchFilter = d.querySelector(".search-filter"),
  //queries
  baseApiLink = "https://restcountries.com/v3/all",
  regionQuery = `https://restcountries.com/v3/region/`,
  nameQuery = `https://restcountries.com/v3/name/`,
  alphaQuery = `https://restcountries.com/v3/alpha/`,
  queryFields = `?fields=name,population,region,capital,flags`;

export { baseApiLink, regionQuery, nameQuery, alphaQuery, queryFields };

const removeCards = () => {
  d.querySelectorAll(".card").forEach((el) => {
    $section.removeChild(el);
  });
};

const appendCountries = (json) => {
  removeCards();
  json.forEach((country) => {
    $template.querySelector(".card > img").src = country.flags[0];
    $template.querySelector(".country-name").textContent = country.name.common;
    $template.querySelector(".card a").dataset.id = country.name.common;
    $template.querySelector(
      ".population"
    ).innerHTML = `<b>Population:</b> ${country.population.toLocaleString()}`;
    $template.querySelector(
      ".region"
    ).innerHTML = `<b>Region:</b> ${country.region}`;
    $template.querySelector(
      ".capital"
    ).innerHTML = `<b>Capital:</b> ${country.capital}`;
    let $clone = d.importNode($template, true);
    $fragment.appendChild($clone);
  });

  $section.appendChild($fragment);

  d.addEventListener("click", (e) => {
    if (e.target.matches(".card h2")) {
      e.preventDefault();
      sessionStorage.setItem("dataCountry", e.target.textContent);
      window.location = "details.html";
    }
  });
};

export const getCountries = async (url) => {
  try {
    $section.innerHTML = ``;

    let response = await fetch(url),
      json = await response.json();

    //order alphabetically
    json.sort((a, b) => {
      if (a.name.common.toLowerCase() < b.name.common.toLowerCase()) {
        return -1;
      }
      if (a.name.common.toLowerCase() > b.name.common.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    if (!response.ok)
      throw { statusText: response.statusText, status: response.status };

    appendCountries(json);
  } catch (error) {
    $section.innerHTML = `<h2>Try searching again</h2>`;
  }
};
/* 
d.addEventListener("change", (e) => {
  if (e.target === $regionFilter) {
    sessionStorage.setItem("region", e.target.value);
    if (e.target.value === "all") {
      getCountries(`${baseApiLink}${queryFields}`);
    } else {
      getCountries(`${regionQuery}${e.target.value}${queryFields}`);
    }
  }
}); */

d.addEventListener("click", (e) => {
  if (e.target.matches(".dropdown-title")) {
    if (e.target.dataset.status === "closed") {
      d.querySelector(".dropdown-content").classList.remove("none");
      e.target.dataset.status = "open";
    } else {
      d.querySelector(".dropdown-content").classList.add("none");
      e.target.dataset.status = "closed";
    }
  } else {
    d.querySelector(".dropdown-title").dataset.status = "closed";
    d.querySelector(".dropdown-content").classList.add("none");
  }

  if (e.target.matches(".dropdown-content p")) {
    sessionStorage.setItem("region", e.target.textContent);

    if (e.target.textContent === "All regions") {
      getCountries(`${baseApiLink}${queryFields}`);
    } else {
      getCountries(`${regionQuery}${e.target.textContent}${queryFields}`);
    }
  }
});

d.addEventListener("input", async (e) => {
  if (e.target === $searchFilter) {
    let searchInputValue = e.target.value.trim().toLowerCase();

    if (!e.target.value) {
      sessionStorage.getItem("region") !== "all"
        ? getCountries(
            `${regionQuery}${sessionStorage.getItem("region")}${queryFields}`
          )
        : getCountries(`${baseApiLink}${queryFields}`);
    } else {
      getCountries(`${nameQuery}${searchInputValue}${queryFields}`);
    }
  }
});
