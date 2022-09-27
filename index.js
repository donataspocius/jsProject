const username = "f4bbd92dbd9d483de912eaf87088aec3";
const pass = "b63f0614d25b51490896071ab9f5c097";

let userVisitedData = [];
let userWishData = [];
let userVisitedLS = "userVisitedData";
let userWishLS = "userWishData";

function updateLocalStorage(itemName, arrayData) {
  window.localStorage.setItem(itemName, JSON.stringify(arrayData));
}

function getFromLocalStorage() {
  let visitedDataLocalStorage = window.localStorage.getItem(userVisitedLS);
  let wishDataLocalStorage = window.localStorage.getItem(userWishLS);
  if (visitedDataLocalStorage)
    userVisitedData = JSON.parse(visitedDataLocalStorage);
  if (wishDataLocalStorage) userWishData = JSON.parse(wishDataLocalStorage);
}

async function loadApiSearchData(searchInput, searchBy) {
  try {
    let formatedInput = null;
    if (!searchInput) return;
    // formating search input by replacing spaces with dashes (api docs)
    if (searchBy === "byName") {
      formatedInput = searchInput.split(" ").join("-").toLowerCase();
    } else {
      formatedInput = searchInput;
    }

    if (searchBy === "byName" && Number(searchInput)) {
      throw new Error("invalid country or city name entered");
    }

    let newSecret = btoa(`${username}:${pass}`);
    let response = await fetch(
      `https://api.roadgoat.com/api/v2/destinations/${formatedInput}`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + newSecret,
        },
      }
    );
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    let apiData = await response.json();
    return apiData;
  } catch (err) {}
}

document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();
  getFromLocalStorage();
  renderApp();
});

function renderApp() {
  renderUI();
  loadApiSearchData("united-states", "byName").then((apiData) => {
    renderSearchResults(apiData);
  });
  searchBtn();
}

function searchBtn() {
  document.querySelector("#search-btn").addEventListener("click", (e) => {
    let searchCriteria = document.querySelector("#search-input").value;
    loadApiSearchData(searchCriteria, "byName").then((apiData) => {
      renderSearchResults(apiData);
    });
  });
}

function closeLargeCard() {
  document.querySelector(".full-info-card").remove();
  document.querySelector("#app-container").style.filter = "none";
}

function prepareApiCityData(apiCityData) {
  const id = apiCityData["data"]["id"];
  const cityName = apiCityData["data"]["attributes"]["long_name"];
  const imgs = apiCityData["included"].filter((el) => el.type === "photo");

  const imageUrl =
    imgs.length > 1
      ? imgs[1]["attributes"]["image"]["medium"]
      : imgs[0]["attributes"]["image"]["medium"];

  const population = apiCityData["data"]["attributes"]["population"];
  const rating = apiCityData["data"]["attributes"]["average_rating"];
  const airbnbLink = apiCityData["data"]["attributes"]["airbnb_url"];
  const checkIn = apiCityData["data"]["attributes"]["check_in_count"];
  const lat = apiCityData["data"]["attributes"]["latitude"];
  const long = apiCityData["data"]["attributes"]["longitude"];

  // Additional properties for visited/wish user lists
  const dateOfVisit = null; /* city visited and date */
  const visitRating = null; /* average of all visited places */
  const plannedVisitDate = null; /* days left till next visit to {cityName} */

  return Object.assign(
    {},
    {
      id,
      cityName,
      imageUrl,
      population,
      rating,
      airbnbLink,
      checkIn,
      lat,
      long,
      dateOfVisit,
      visitRating,
      plannedVisitDate,
    }
  );
}

function renderLargeCard(apiData) {
  const id = apiData["id"];
  const cityName = apiData["cityName"];
  const imageUrl = apiData["imageUrl"];
  const population = apiData["population"];
  const rating = apiData["rating"];
  const airbnbLink = apiData["airbnbLink"];
  const checkIn = apiData["checkIn"];
  const dateOfVisit = apiData["dateOfVisit"];
  const visitRating = apiData["visitRating"];
  const plannedVisitDate = apiData["plannedVisitDate"];
  const lat = apiData["lat"];
  const long = apiData["long"];

  // RENDERING FULL CITY DATA CARD
  appContainerEl.style.filter = "blur(3px)";

  // info card
  let fullInfoCardEl = document.createElement("div");
  document.body.append(fullInfoCardEl);
  fullInfoCardEl.className = "full-info-card";

  // Close button
  let closeBtnEl = document.createElement("img");
  fullInfoCardEl.append(closeBtnEl);
  closeBtnEl.src = "./img/x-symbol.svg";
  closeBtnEl.alt = "x button";
  closeBtnEl.id = "closeBtn";
  // render h1
  let fullInfoCardElH1 = document.createElement("h1");
  fullInfoCardEl.append(fullInfoCardElH1);
  fullInfoCardElH1.textContent = cityName;

  // render image
  let fullInfoCardElImg = document.createElement("img");
  fullInfoCardEl.append(fullInfoCardElImg);
  fullInfoCardElImg.src = imageUrl;

  let dataContainer = document.createElement("div");
  fullInfoCardEl.append(dataContainer);
  dataContainer.id = "data-container";

  // render population
  let fullInfoCardElPop = document.createElement("p");
  dataContainer.append(fullInfoCardElPop);
  fullInfoCardElPop.textContent = `Population: ${population}`;

  // render rating
  let fullInfoCardElRating = document.createElement("p");
  dataContainer.append(fullInfoCardElRating);
  fullInfoCardElRating.textContent = `Rating: ${rating}`;

  // render check-in count
  let fullInfoCardElCheck = document.createElement("p");
  dataContainer.append(fullInfoCardElCheck);
  fullInfoCardElCheck.textContent = `Check-in count: ${checkIn}`;

  // render AirBnb link
  let fullInfoCardElAirbnbUrl = document.createElement("p");
  fullInfoCardElAirbnbUrl.textContent = "Check it out on ";
  dataContainer.append(fullInfoCardElAirbnbUrl);
  let airbnbUrl = document.createElement("a");
  airbnbUrl.href = `${airbnbLink}`;
  airbnbUrl.textContent = "AirBnb!";
  fullInfoCardElAirbnbUrl.append(airbnbUrl);

  closeBtnEl.addEventListener("click", (e) => {
    e.preventDefault();
    closeLargeCard();
  });

  document.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.key === "Escape" && document.querySelector(".full-info-card")) {
      closeLargeCard();
    }
  });

  // checking if card already added to any list (if yes, no need to render buttons)
  let isInAnyList =
    userVisitedData.some((el) => el.id === id) ||
    userWishData.some((el) => el.id === id);

  if (!isInAnyList) {
    // visited button
    visitedBtn = document.createElement("button");
    dataContainer.append(visitedBtn);
    visitedBtn.id = "visitedBtn";
    visitedBtn.type = "button";
    visitedBtn.setAttribute("data-action", "edit");
    visitedBtn.textContent = "Add to VISITED places";

    visitedBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (visitedBtn.dataset.action === "edit") {
        visitedBtn.textContent = "SAVE";
        visitedBtn.dataset.action = "save";
        visitedBtn.style.backgroundColor = "yellow";
        renderVisitedForm();
      } else {
        visitedBtn.textContent = "Add to VISITED places";
        visitedBtn.dataset.action = "edit";
        // push to userVisitedData list
        saveToVisitedList(apiData);
        // update localStorage
        updateLocalStorage(userVisitedLS, userVisitedData);
        // render in list
        renderCards(userVisitedData, "visited-list-container");
        setColorForSearchCard(id, "blue");
        renderUserInfoCard();

        // Close modal
        closeLargeCard();
      }
    });

    // planned visits button
    plannedVisitBtn = document.createElement("button");
    dataContainer.append(plannedVisitBtn);
    plannedVisitBtn.id = "plannedVisitBtn";
    plannedVisitBtn.type = "button";
    plannedVisitBtn.setAttribute("data-action", "edit");
    plannedVisitBtn.textContent = "Add to WISH list";

    plannedVisitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (plannedVisitBtn.dataset.action === "edit") {
        plannedVisitBtn.textContent = "SAVE";
        plannedVisitBtn.dataset.action = "save";
        plannedVisitBtn.style.backgroundColor = "yellow";
        renderPlannedVisitForm();
      } else {
        plannedVisitBtn.textContent = "Add to WISH list";
        plannedVisitBtn.dataset.action = "edit";

        // push to userVisitedData list
        saveToWishList(apiData);
        // update localStorage
        updateLocalStorage(userWishLS, userWishData);
        // render in list
        renderCards(userWishData, "wish-list-container");
        setColorForSearchCard(id, "green");
        renderUserInfoCard();

        // Close modal
        closeLargeCard();
      }
    });
  } else {
    if (dateOfVisit && visitRating) {
      // render date of visit
      let fullInfocardDateOfVisit = document.createElement("p");
      dataContainer.append(fullInfocardDateOfVisit);
      fullInfocardDateOfVisit.className = "userDataText";
      fullInfocardDateOfVisit.textContent = `Date of your last visit: ${dateOfVisit}`;

      // render rating
      let fullInfocardVisitRating = document.createElement("p");
      dataContainer.append(fullInfocardVisitRating);
      fullInfocardVisitRating.className = "userDataText";
      fullInfocardVisitRating.textContent = `Your rating: ${visitRating}`;
    } else if (plannedVisitDate) {
      let plannedVisitDateEl = document.createElement("p");
      dataContainer.append(plannedVisitDateEl);
      plannedVisitDateEl.className = "userDataText";
      plannedVisitDateEl.textContent = `Plan to visit: ${plannedVisitDate}`;
    }
  }

  let leafetMapEl = document.createElement("div");
  fullInfoCardEl.append(leafetMapEl);
  leafetMapEl.id = "map";

  generateMap(lat, long);
}

function generateMap(lat, long) {
  let map = L.map("map").setView([lat, long], 9);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  let marker = L.marker([lat, long]).addTo(map);
}

function setColorForSearchCard(id, color) {
  document.querySelector(`#api-cards-container #cc-${id}`).style.borderColor =
    color;
}

function saveToWishList(cityData) {
  let plannedVisitInputDate = document.querySelector("#plannedVisitDateInput");
  const newWishPlace = cityData;
  newWishPlace["plannedVisitDate"] = plannedVisitInputDate.value;

  // pushing new entry to the wish list
  userWishData.push(newWishPlace);
  updateLocalStorage(userWishLS, userWishData);
}

function saveToVisitedList(cityData) {
  // getting user input values
  let visitedInputDateValue = document.querySelector("#visitedDateInput");
  let visitedInputRatingValue = document.querySelector("#visitedRatingInput");

  const newVisitedPlace = cityData;
  newVisitedPlace["dateOfVisit"] = visitedInputDateValue.value;
  newVisitedPlace["visitRating"] = Number(visitedInputRatingValue.value);

  // pushing new entry to the list
  userVisitedData.push(newVisitedPlace);
  updateLocalStorage(userVisitedLS, userVisitedData);
}

function renderPlannedVisitForm() {
  if (document.querySelector(".planned-visit-input-container")) {
    document.querySelector(".planned-visit-input-container").remove();
  }

  // rendering input form
  let plannedVisitInputEl = document.createElement("form");
  document.querySelector("#data-container").append(plannedVisitInputEl);
  plannedVisitInputEl.className = "planned-visit-input-container";

  // rendering date of planned visit input
  let plannedVisitDateInputDiv = document.createElement("div");
  plannedVisitInputEl.append(plannedVisitDateInputDiv);
  plannedVisitDateInputDiv.classname = "planned-visit-date-input";

  let plannedVisitDateInputLabel = document.createElement("label");
  plannedVisitDateInputDiv.append(plannedVisitDateInputLabel);
  plannedVisitDateInputLabel.for = "plannedVisitDate";
  plannedVisitDateInputLabel.textContent = "Plan to visit: ";

  let plannedVisitDateInput = document.createElement("input");
  plannedVisitDateInputDiv.append(plannedVisitDateInput);
  plannedVisitDateInput.id = "plannedVisitDateInput";
  plannedVisitDateInput.type = "date";
  plannedVisitDateInput.name = "plannedVisitDate";
  plannedVisitDateInput.value = new Date().toLocaleDateString("en-CA");
}

function renderVisitedForm() {
  if (document.querySelector(".visited-info-input-container")) {
    document.querySelector(".visited-info-input-container").remove();
  }
  // RENDERING INPUT FORM

  let visitedInfoInputEl = document.createElement("form");
  document.querySelector("#data-container").append(visitedInfoInputEl);
  visitedInfoInputEl.className = "visited-info-input-container";

  // rendering date of visit input
  let dateInputDiv = document.createElement("div");
  visitedInfoInputEl.append(dateInputDiv);
  visitedInfoInputEl.classname = "visited-date-input";

  let dateInputLabel = document.createElement("label");
  dateInputDiv.append(dateInputLabel);
  dateInputLabel.for = "visitedDate";
  dateInputLabel.textContent = "Enter date of visit: ";

  let dateInput = document.createElement("input");
  dateInputDiv.append(dateInput);
  dateInput.id = "visitedDateInput";
  dateInput.type = "date";
  dateInput.name = "visitedDate";
  dateInput.value = new Date().toLocaleDateString("en-CA");

  // rendering rating of visit input
  let ratingInputDiv = document.createElement("div");
  visitedInfoInputEl.append(ratingInputDiv);
  visitedInfoInputEl.classname = "visited-rating-input";

  let ratingInputLabelEl = document.createElement("label");
  ratingInputDiv.append(ratingInputLabelEl);
  ratingInputLabelEl.for = "visitedRatingInput";
  ratingInputLabelEl.textContent = "Rate your visit (up to 10): ";

  let ratingInput = document.createElement("input");
  ratingInputDiv.append(ratingInput);
  ratingInput.id = "visitedRatingInput";
  ratingInput.type = "number";
  ratingInput.name = "visitedRatingInput";
  ratingInput.min = 1;
  ratingInput.max = 10;
  ratingInput.value = 5;
}

function renderSearchBar() {
  // search bar
  let apiDataContainerEl = document.createElement("div");
  document.querySelector("#app-container").append(apiDataContainerEl);
  apiDataContainerEl.id = "api-data-container";

  let apiSearchBarEl = document.createElement("div");
  apiDataContainerEl.append(apiSearchBarEl);
  apiSearchBarEl.id = "api-search-bar";

  let searchLabelEl = document.createElement("label");
  apiSearchBarEl.append(searchLabelEl);
  searchLabelEl.textContent = "Search For: ";
  searchLabelEl.for = "search";

  let searchInputEl = document.createElement("input");
  apiSearchBarEl.append(searchInputEl);
  searchInputEl.id = "search-input";
  searchInputEl.type = "text";
  searchInputEl.placeholder = "City or Country Name";

  let searchBtnEl = document.createElement("button");
  apiSearchBarEl.append(searchBtnEl);
  searchBtnEl.type = "submit";
  searchBtnEl.id = "search-btn";
  searchBtnEl.textContent = "Search!";
}

function renderUserLists() {
  // rendering main container
  let listsContainerEl = document.createElement("div");
  document.querySelector("#my-data-container").append(listsContainerEl);
  listsContainerEl.id = "lists-container";

  // rendering visited cities list
  renderVisitedCitiesContainer();
  renderCards(userVisitedData, "visited-list-container");
  // rendering planned visit list
  renderWishCitiesContainer();
  renderCards(userWishData, "wish-list-container");
}

function renderWishCitiesContainer() {
  if (document.querySelector("#wish-list-container")) {
    document.querySelector("#wish-list-container").remove();
  }

  let wishListContainerEl = document.createElement("div");
  document.querySelector("#lists-container").append(wishListContainerEl);
  wishListContainerEl.id = "wish-list-container";

  let wishListH1 = document.createElement("h1");
  wishListContainerEl.append(wishListH1);
  wishListH1.textContent = userWishData.length
    ? "Planned Visits"
    : "No Planned Visits";
}

function renderVisitedCitiesContainer() {
  if (document.querySelector("#visited-list-container")) {
    document.querySelector("#visited-list-container").remove();
  }

  let visitedListContainerEl = document.createElement("div");
  document.querySelector("#lists-container").append(visitedListContainerEl);
  visitedListContainerEl.id = "visited-list-container";

  let visitedListH1 = document.createElement("h1");
  visitedListContainerEl.append(visitedListH1);
  visitedListH1.textContent = userVisitedData.length
    ? "Visited Cities"
    : "No Visits Yet";
}

function renderSearchResults(apiData) {
  if (document.querySelector("#api-cards-container")) {
    document.querySelector("#api-cards-container").remove();
  }

  let apiCardsContainerEl = document.createElement("div");
  document.querySelector("#api-data-container").append(apiCardsContainerEl);
  apiCardsContainerEl.id = "api-cards-container";

  if (!apiData) {
    let pError = document.createElement("div");
    document.querySelector("#api-cards-container").append(pError);
    pError.textContent = "NO RESULTS FOUND";
  } else {
    let citiesDataFromApi =
      apiData["data"]["attributes"]["top_cities_and_towns"];
    renderCards(citiesDataFromApi, "api-cards-container");
  }
}

function renderCards(apiCityData, containerId) {
  let loadFromApi = false;
  // figuring out which container to re-render
  switch (containerId) {
    case "visited-list-container":
      renderVisitedCitiesContainer();
      break;
    case "wish-list-container":
      renderWishCitiesContainer();
      break;
    default:
      loadFromApi = true;
  }

  // generating cards for each city
  apiCityData.forEach((el) => {
    // generating cards
    let cardEl = document.createElement("div");
    document.querySelector(`#${containerId}`).append(cardEl);
    cardEl.className = "city-card";
    cardEl.id = "cc-" + el.id;
    cardEl.textContent = el.cityName ? el.cityName : el.name;

    // changing card colors by list
    switch (containerId) {
      case "visited-list-container": {
        cardEl.style.borderColor = "blue";
        break;
      }
      case "wish-list-container": {
        cardEl.style.borderColor = "green";
        break;
      }
      case "api-cards-container": {
        if (userVisitedData.some((elem) => elem.id == el.id)) {
          cardEl.style.borderColor = "blue";
        } else if (userWishData.some((elem) => elem.id == el.id)) {
          cardEl.style.borderColor = "green";
        }
        break;
      }
    }

    // handling card click
    cardEl.addEventListener("click", (e) => {
      e.preventDefault();
      if (loadFromApi) {
        loadApiSearchData(el.id, "byId").then((apiData) => {
          const processedApiData = prepareApiCityData(apiData);
          renderLargeCard(processedApiData);
        });
      } else {
        renderLargeCard(el);
      }
    });
  });
}

function renderUI() {
  appContainerEl = document.createElement("div");
  document.body.append(appContainerEl);
  appContainerEl.setAttribute("id", "app-container");

  let myDataContainerEl = document.createElement("div");
  appContainerEl.append(myDataContainerEl);
  myDataContainerEl.id = "my-data-container";

  let myDataInfoCardEl = document.createElement("div");
  document.querySelector("#my-data-container").append(myDataInfoCardEl);
  myDataInfoCardEl.id = "my-data-info-card";

  renderUserInfoCard();
  renderUserLists();
  renderSearchBar();
}

function statsDateOfVisits() {
  if (userVisitedData.length) {
    let latestDateOfVisit = userVisitedData.reduce((r, a) => {
      return r.dateOfVisit > a.dateOfVisit ? r : a;
    });
    return `${latestDateOfVisit.cityName}, ${latestDateOfVisit.dateOfVisit}`;
  }
}

function statsNextVisit() {
  let nextVisitDate;
  if (userWishData.length) {
    nextVisitDate = userWishData.reduce((r, a) => {
      return r.plannedVisitDate < a.plannedVisitDate ? r : a;
    });
    let diffInMs = new Date(nextVisitDate.plannedVisitDate) - new Date();
    let diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return `Next visit to ${nextVisitDate.cityName} in ${diffInDays.toFixed(
      0
    )} day(s)`;
  }
}

function calcAverageRating() {
  const average =
    userVisitedData.reduce((total, next) => total + next.visitRating, 0) /
    userVisitedData.length;
  return average.toFixed(2);
}

function renderUserInfoCard() {
  if (document.querySelector("#statsContainer")) {
    document.querySelector("#statsContainer").remove();
  }

  let myDataStatsContainer = document.createElement("div");
  document.querySelector("#my-data-info-card").append(myDataStatsContainer);
  myDataStatsContainer.id = "statsContainer";

  let statsH1 = document.createElement("h1");
  myDataStatsContainer.append(statsH1);
  statsH1.textContent = "User Statistics";

  let statsDateOfVisit = document.createElement("p");
  myDataStatsContainer.append(statsDateOfVisit);
  statsDateOfVisit.textContent = userVisitedData.length
    ? `Last visit: ${statsDateOfVisits()}`
    : "Last visit: n/a";

  let statsRating = document.createElement("p");
  myDataStatsContainer.append(statsRating);
  statsRating.textContent = userVisitedData.length
    ? `User average rating: ${calcAverageRating()}`
    : "User average rating: n/a";

  let statsNextVisitEl = document.createElement("p");
  myDataStatsContainer.append(statsNextVisitEl);
  statsNextVisitEl.textContent = userWishData.length
    ? `${statsNextVisit()}`
    : "n/a";
}
