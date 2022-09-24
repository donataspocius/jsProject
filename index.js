const username = "d306aad952470a383d39a775fc627fce";
const pass = "9a9332d20bdb61b667b018415e4c5404";

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
    console.log(apiData);
    return apiData;
  } catch (err) {
    console.log("fetch error: ", err);
  }
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
  const indexOfImage = apiCityData["included"].findIndex(
    (el) => el.type === "photo"
  );
  const imageUrl =
    apiCityData["included"][indexOfImage]["attributes"]["image"]["medium"];
  const population = apiCityData["data"]["attributes"]["population"];
  const rating = apiCityData["data"]["attributes"]["average_rating"];
  const airbnbLink = apiCityData["data"]["attributes"]["airbnb_url"];
  const checkIn = apiCityData["data"]["attributes"]["check_in_count"];

  // Additional properties for visited/wish user lists
  const dateOfVisit = null;
  const visitRating = null;

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
      dateOfVisit,
      visitRating,
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

  // render population
  let fullInfoCardElPop = document.createElement("p");
  fullInfoCardEl.append(fullInfoCardElPop);
  fullInfoCardElPop.textContent = `Population: ${population}`;

  // render rating
  let fullInfoCardElRating = document.createElement("p");
  fullInfoCardEl.append(fullInfoCardElRating);
  fullInfoCardElRating.textContent = `Rating: ${rating}`;

  // render check-in count
  let fullInfoCardElCheck = document.createElement("p");
  fullInfoCardEl.append(fullInfoCardElCheck);
  fullInfoCardElCheck.textContent = `Check-in count: ${checkIn}`;

  // render AirBnb link
  let fullInfoCardElAirbnbUrl = document.createElement("p");
  fullInfoCardElAirbnbUrl.textContent = "Check it out on ";
  fullInfoCardEl.append(fullInfoCardElAirbnbUrl);
  let airbnbUrl = document.createElement("a");
  airbnbUrl.href = `${airbnbLink}`;
  airbnbUrl.textContent = "AirBnb!";
  fullInfoCardElAirbnbUrl.append(airbnbUrl);

  // TODO: render date of visit

  // TODO: render visited rating

  // RENDERING BUTTONS

  closeBtnEl.addEventListener("click", (e) => {
    e.preventDefault();
    closeLargeCard();
  });

  document.addEventListener("keyup", (e) => {
    e.preventDefault();
    console.log(e.key);
    if (e.key === "Escape" && document.querySelector(".full-info-card")) {
      closeLargeCard();
    }
  });

  // visited button
  visitedBtn = document.createElement("button");
  fullInfoCardEl.append(visitedBtn);
  visitedBtn.id = "visitedBtn";
  visitedBtn.type = "button";
  visitedBtn.setAttribute("data-action", "edit");
  visitedBtn.textContent = "Add to VISITED places";

  visitedBtn.addEventListener("click", (e) => {
    e.preventDefault();
    renderVisitedForm();
    if (visitedBtn.dataset.action === "edit") {
      visitedBtn.textContent = "SAVE";
      visitedBtn.dataset.action = "save";
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

      // Close modal
      closeLargeCard();
    }
  });

  function setColorForSearchCard(id, color) {
    document.querySelector(`#api-cards-container #cc-${id}`).style.borderColor =
      color;
  }

  // planned visits but
  plannedVisitBtn = document.createElement("button");
  fullInfoCardEl.append(plannedVisitBtn);
  plannedVisitBtn.id = "plannedVisitBtn";
  plannedVisitBtn.type = "button";
  plannedVisitBtn.textContent = "Add to WISH list";
}

function saveToVisitedList(cityData) {
  // getting user input values
  let visitedInputDateValue = document.querySelector("#visitedDateInput").value;
  let visitedInputRatingValue = document.querySelector(
    "#visitedRatingInput"
  ).value;

  const newVisitedPlace = cityData;
  newVisitedPlace["dateOfVisit"] = visitedInputDateValue;
  newVisitedPlace["visitRating"] = visitedInputRatingValue;

  // pushing new entry to the list
  userVisitedData.push(newVisitedPlace);
  updateLocalStorage(userVisitedLS, userVisitedData);
}

function renderVisitedForm() {
  if (document.querySelector(".visited-info-input-container")) {
    document.querySelector(".visited-info-input-container").remove();
  }
  // RENDERING INPUT FORM

  let visitedInfoInputEl = document.createElement("form");
  document.querySelector(".full-info-card").append(visitedInfoInputEl);
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

function renderUserInfoCard() {
  let myDataInfoCardEl = document.createElement("div");
  document.querySelector("#my-data-container").append(myDataInfoCardEl);
  myDataInfoCardEl.id = "my-data-info-card";
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
    : "No Planned Visites";
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
  // figuring out which container to re-render
  switch (containerId) {
    case "visited-list-container":
      renderVisitedCitiesContainer();
    case "wish-list-container":
      renderWishCitiesContainer();
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
      loadApiSearchData(el.id, "byId").then((apiData) => {
        const processedApiData = prepareApiCityData(apiData);
        renderLargeCard(processedApiData);
      });
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

  renderUserInfoCard();
  renderUserLists();
  renderSearchBar();
}
