let iptEls = document.querySelectorAll("input");
[].forEach.call(inps, function (iptEl) {
  iptEl.onchange = function (e) {
    console.log(this.files);
  };
});
