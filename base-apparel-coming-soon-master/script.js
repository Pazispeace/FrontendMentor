const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  const $form = d.querySelector("form"),
    $emailErrorMsg = d.createElement("p");

  $emailErrorMsg.textContent = "Please provide a valid email";
  $emailErrorMsg.classList.add("email-error");

  d.addEventListener("input", (e) => {
    if (e.target === $form.email) {
      let regex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

      if (regex.test(e.target.value) || e.target.value === "") {
        e.target.classList.remove("is-invalid");
        $emailErrorMsg.classList.add("none");
        console.log(regex.test(e.target.value));
      } else {
        e.target.classList.add("is-invalid");
        $form.insertAdjacentElement("beforeend", $emailErrorMsg);
        $emailErrorMsg.classList.remove("none");
      }
    }
  });

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});
