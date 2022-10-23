const d = document;
(() => {
  const $details = d.querySelectorAll("details");

  $details.forEach((detail) => {
    detail.addEventListener("toggle", (e) => {
      if (e.target.open) {
        $details.forEach((detail) => {
          //if the iterating element is != from e.target (the element selected at the moment), AND the e.target is OPEN, close the other details tags
          if (detail != e.target) detail.open = false;
        });
      }
    });
  });
})();
