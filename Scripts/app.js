const habbits_const = [
  {
    id: "sport",
    icon: "Dumbbell",
    name: "Отжимания",
  },
  {
    id: "water",
    icon: "Water",
    name: "Вода",
  },
  {
    id: "food",
    icon: "Food",
    name: "Еда",
  },
];

let habbits = [];

function loadHabbit() {
  const dd = localStorage.getItem("HABBITS");
  if (dd) habbits = JSON.parse(dd);
}

function addHabbit(id) {
  const habbit = habbits_const.find((d) => d.id === id);
  if (habbit) {
    habbits.push(habbit);
  } else {
    alert("Не удалось найти занятие");
    return;
  }
  _udateHabbitData();
}

function _udateHabbitData() {
  localStorage.removeItem("HABBITS");
  localStorage.setItem("HABBITS", JSON.stringify(habbits));
}

function makeNewHabbit(habbit) {
  const btn = $("<button>");
  btn.attr({
    "menu-habbit-id": habbit.id,
  });
  btn.addClass("menu__item");
  const img = $("<img>");
  img.prop("src", `/image/${habbit.icon}.svg`);
  img.prop("alt", habbit.name);
  btn.append(img);
  return btn;
}

function updateHabbits() {
  habbits.forEach((habbit) => {
    const btn = makeNewHabbit(habbit);
    $("#act_buttons").append(btn);
  });
}

$(document).ready((e) => {
  // localStorage.removeItem("SPORT_HABBIT")
  // $(".progress__cover-bar").css("width", "100%")
  loadHabbit();
  console.log(habbits);
  updateHabbits();

  $(document).on("click", ".menu__item", (e) => {
    $(".menu__item").each((i, b) => $(b).removeClass("menu__item__active"));

    const $btn = $(e.currentTarget);
    console.log($btn);
    const menu_id = $btn.attr("menu-habbit-id");
    $btn.addClass("menu__item__active");

    $(".page-content").each((i, p) => {
      const $page = $(p).hide();
      console.log($page.attr("id"), menu_id);
      if ($page.attr("id") === menu_id) {
        $page.show();
      } else {
        $page.hide();
      }
    });
  });
  const idx = habbits.length;
  if (idx > 2) $(".menu__add").remove();

  $(Array.from($(".menu__item"))[0]).addClass("menu__item__active");
  $(Array.from($(".page-content"))[0]).show();


  $(".menu__add").click((e) => {
    const idx = habbits.length;
    console.log(idx)
    addHabbit(habbits_const[idx].id);
    $("#act_buttons").append(makeNewHabbit(habbits_const[idx]));
    if (habbits.length > 2) {
      $(".menu__add").hide();
      return
    }
  });
});
