const d = document;
((ratingForm, ratingPoint, ratingSubmit, formResponse, totalRating) => {
  const $form = d.querySelector(ratingForm),
    $points = d.querySelectorAll(ratingPoint),
    $formResponse = d.querySelector(formResponse),
    $totalPoint = d.getElementById(totalRating);

  d.addEventListener("click", (e) => {
    if (e.target.matches(ratingPoint)) {
      //si ya lo contiene que se lo quite
      if (e.target.classList.contains("active")) {
        e.target.classList.remove("active");
      } //caso contrario (es decir, que no lo tenga) que se lo quite a todos primero, y luego se lo agregue al elemento que seleccioné
      else {
        $points.forEach((e) => {
          e.classList.remove("active");
        });
        e.target.classList.add("active");
        $totalPoint.innerText = `You selected ${e.target.innerText} out of 5`;
      }
    }

    if (e.target.matches(ratingSubmit)) {
      e.preventDefault();

      if ($totalPoint.innerText === "") {
        alert("please rate before submitting");
      } else {
        $formResponse.classList.remove("none");
        $form.classList.add("none");
      }
    }
  });
})(
  ".rating-form",
  ".rating-button",
  ".submit-rating",
  ".form-response",
  "final-rating"
);
