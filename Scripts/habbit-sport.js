let sport_days = [];

function loadSportData() {
  const dd = JSON.parse(localStorage.getItem("SPORT_HABBIT"));
  if (dd) sport_days = dd;
}

function _udateSportData() {
  localStorage.removeItem("SPORT_HABBIT");
  localStorage.setItem("SPORT_HABBIT", JSON.stringify(sport_days));
}

function removeDataSport(day) {
  const rem_idx = sport_days.findIndex((d) => d.day === day);
  sport_days.splice(rem_idx, 1);
  _udateSportData();
}

function addDataSport(value) {
  sport_days.push(value);
  _udateSportData();
}

function makeNewSport(day, comment) {
  const sport = $("<div>");
  sport.addClass("sport");
  const head = $("<div>");
  head.addClass("sport__day");
  head.text(`День ${day}`);
  const comm = $("<div>");
  comm.addClass("sport__comment");
  comm.text(comment);
  const del_btn = $("<button>");
  del_btn.addClass("sport__delete");
  const img = $("<img>");
  img.prop({
    src: "/image/delete.svg",
    alt: `Удалить день ${day}`,
  });
  del_btn.append(img);
  sport.append(head);
  sport.append(comm);
  sport.append(del_btn);
  return sport;
}

function updateSportDays() {
  sport_days.forEach((d, idx) => {
    $("#sport_list").append(makeNewSport(d.day, d.comment));
  });
}

function updateForm(day) {
  $("#sport_form_id").attr("data-item-id", day);
  $("#sport_day_id").text(`День ${day}`);
}

$(document).ready((e) => {
  loadSportData();

  updateSportDays();
  const maxDay = Math.max(0, ...sport_days.map((d) => d.day));
  updateForm(maxDay + 1);

  $("#sport_form_id").submit((e) => {
    e.preventDefault();
    const form = $(e.target);
    const day = form.attr("data-item-id");
    const input_value = form.find("input").val();
    addDataSport({
      day: day,
      comment: input_value,
    });
    $("#sport_list").append(makeNewSport(parseInt(day), input_value));
    updateForm(parseInt(day) + +1);
    form[0].reset();
  });

  $(document).on("click", ".sport__delete", (e) => {
    const current = $(e.currentTarget);
    const idx = current.prev().prev().text().split(" ")[1];
    console.log(idx);
    current.parent().remove();
    removeDataSport(idx);
    const maxDay = Math.max(0, ...sport_days.map((d) => d.day));
    updateForm(maxDay + 1);
  });
});
