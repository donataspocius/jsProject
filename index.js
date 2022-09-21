const username = "c827e94ec41d32012308222cffa9b24d";
const pass = "6c3000ee9b691b3532f0151922527e07";

let customerData = [];
let fakeCityData;

document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();
  renderApp();
});

function renderApp() {
  renderUI();
  loadApiSearchData("united-states");
  searchBtn();

  // document.querySelectorAll(".city-card").forEach((el, index) =>
  //   el.addEventListener("click", function (e) {
  //     console.log("hello");
  //     e.preventDefault();
  //     renderLargeCard(apiData, index);
  //     moveToListBtns();
  //   })
  // );
}

function searchBtn() {
  document.querySelector("#search-btn").addEventListener("click", (e) => {
    let searchCriteria = document.querySelector("#search-input").value;
    loadApiSearchData(searchCriteria);
  });
}

async function loadApiSearchData(searchInput) {
  try {
    if (!searchInput) return;
    // formating search input by replacing spaces with dashes (api docs)
    let formatedInput = searchInput.split(" ").join("-").toLowerCase();
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
    let apiData = await response.json();
    renderSearchResults(apiData);
    console.log(apiData);
  } catch (err) {
    renderSearchResults();
    console.log("fetch error: ", err);
  }
}

function moveToListBtns() {
  document.querySelector("#visitedBtn").addEventListener("click", (e) => {
    console.log(visitedBtn.isInEdit);
    visitedBtn.isInEdit = !visitedBtn.isInEdit;
    console.log(visitedBtn.isInEdit);
    renderApp();
  });

  document.querySelector("#plannedVisitBtn").addEventListener("click", (e) => {
    console.log("clicked planned visited button");
  });
}

function renderLargeCard(apiData, index) {
  // const cityId =
  //   apiData["data"]["attributes"]["top_cities_and_towns"][index]["id"];
  // console.log("city id: ", cityId);

  // console.log("fake city data here: ", fakeCityData);

  // RENDERING FULL CITY DATA CARD

  appContainerEl.style.filter = "blur(3px)";

  // info card
  let fullInfoCardEl = document.createElement("div");
  document.body.append(fullInfoCardEl);
  fullInfoCardEl.className = "full-info-card";

  // render h1
  let fullInfoCardElH1 = document.createElement("h1");
  fullInfoCardEl.append(fullInfoCardElH1);
  fullInfoCardElH1.textContent = `${fakeCityData["data"]["attributes"]["long_name"]}`;

  // render image
  let fullInfoCardElImg = document.createElement("img");
  fullInfoCardEl.append(fullInfoCardElImg);
  let indexOfImage = fakeCityData["included"].findIndex(
    (el) => el.type === "photo"
  );
  fullInfoCardElImg.src = `${fakeCityData["included"][indexOfImage]["attributes"]["image"]["medium"]}`;

  // render card data
  let population = `${fakeCityData["data"]["attributes"]["population"]}`;
  let rating = `${fakeCityData["data"]["attributes"]["average_rating"]}`;
  let airbnbLink = `${fakeCityData["data"]["attributes"]["airbnb_url"]}`;
  let checkIn = `${fakeCityData["data"]["attributes"]["check_in_count"]}`;

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

  // rendering buttons
  visitedBtn = document.createElement("button");
  fullInfoCardEl.append(visitedBtn);
  visitedBtn.id = "visitedBtn";
  visitedBtn.type = "button";
  visitedBtn.textContent = !visitedBtn.isInEdit
    ? "Add to VISITED places"
    : "SAVE";
  visitedBtn.isInEdit = false;

  plannedVisitBtn = document.createElement("button");
  fullInfoCardEl.append(plannedVisitBtn);
  plannedVisitBtn.id = "plannedVisitBtn";
  plannedVisitBtn.type = "button";
  plannedVisitBtn.textContent = "Add to WISH list";
  visitedBtn.isinEdit = false;
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
  let listsContainerEl = document.createElement("div");
  document.querySelector("#my-data-container").append(listsContainerEl);
  listsContainerEl.id = "lists-container";

  let visitedListContainerEl = document.createElement("div");
  listsContainerEl.append(visitedListContainerEl);
  visitedListContainerEl.id = "visited-list-container";

  let visitedListH1 = document.createElement("h1");
  visitedListContainerEl.append(visitedListH1);
  visitedListH1.textContent = "Visited Cities";

  let wishListContainerEl = document.createElement("div");
  listsContainerEl.append(wishListContainerEl);
  wishListContainerEl.id = "wish-list-container";

  let wishListH1 = document.createElement("h1");
  wishListContainerEl.append(wishListH1);
  wishListH1.textContent = "Planned Visits";
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
    renderCards(citiesDataFromApi);
  }
}

function renderCards(apiCityData) {
  apiCityData.forEach((el) => {
    let cardEl = document.createElement("div");
    document.querySelector("#api-cards-container").append(cardEl);
    cardEl.className = "city-card";
    cardEl.id = el.id;
    cardEl.textContent = el.name;
    cardEl.addEventListener("click", (e) => {
      console.log(cardEl.id);
      e.preventDefault();
      renderLargeCard(apiCityData);
      moveToListBtns();
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

// CODE ENDS HERE
// API DATA OBJECT.

fakeCityData = {
  data: {
    id: "6588544",
    type: "destination",
    attributes: {
      slug: "new-york-ny-usa",
      url: "https://www.roadgoat.com/travel-guides/new-york-ny-usa",
      destination_type: "City",
      short_name: "New York",
      name: "New York, NY",
      long_name: "New York, New York State, US",
      population: 8175133,
      latitude: 40.742185,
      longitude: -73.992602,
      bounding_box: null,
      geonames_id: 5128581,
      walk_score_url: "https://www.walkscore.com/NY/New_York",
      budget: {
        "New York, NY": {
          value: 8,
          text: "Extreme",
          subText: "Big money spender!",
        },
        "New York (State)": {
          value: 7,
          text: "Very High",
          subText: "Ouchie",
        },
        "United States": {
          value: 6,
          text: "High",
          subText: "Get that wallet ready",
        },
      },
      safety: {
        "New York, NY": {
          value: 4,
          text: "High",
          subText: "Exercise Normal Precaution",
        },
        "United States": {
          value: 4,
          text: "High",
          subText: "Exercise Normal Precaution",
        },
      },
      covid: {
        "New York, NY": {
          value: 19.8,
          url: "https://covidactnow.org/us/new_york-ny/county/bronx_county",
          text: "High",
        },
        "New York (State)": {
          value: 19.6622099162205,
          url: "https://covidactnow.org/us/new_york-ny/",
          text: "High",
        },
        "United States": {
          value: 7.57510197154485,
          url: "https://www.worldometers.info/coronavirus/",
          text: "Medium",
        },
      },
      average_rating: 4.30769230769231,
      check_in_count: 11550,
      google_events_url:
        "https://www.google.com/search?q=events+new+york+ny&ibp=htl;events",
      vrbo_url:
        "https://vrbo.prf.hn/click/camref:1101ljbvy/creativeref:1101l63118/destination:https://www.vrbo.com/search/keywords:new-york-ny",
      alltrails_url:
        "https://www.alltrails.com/explore?b_tl_lat=41.34&b_tl_lng=-74.59&b_br_lat=40.14&b_br_lng=-73.39",
      open_elevation_url:
        "https://api.open-elevation.com/api/v1/lookup?locations=40.742185,-73.992602",
      foursquare_url:
        "https://api.foursquare.com/v2/venues/search?ll=40.742185,-73.992602&radius=100000",
      kayak_car_rental_url:
        "https://www.kayak.com/in?a=roadgoatdl&url=/cars/NewYork%2CNY/NewYork%2CNY/2022-10-14/2022-10-21/?sort=price_a",
      kayak_lodgings_url:
        "https://www.kayak.com/in?a=roadgoatdl&url=/hotels/NewYork%2CNY/2022-10-14/2022-10-21/1adults?sort=userrating_b",
      airbnb_url: "https://www.airbnb.com/s/New+York%2C+NY/homes",
      getyourguide_url:
        "https://getyourguide.com/s/?q=New+York%2C+NY&partner_id=0TQGVTE",
      wikipedia_url: "http://en.wikipedia.org/wiki/New_York_City",
      woe_id: 2459115,
      alternate_names: ["NYC", "Big Apple", "NY", "New York", "New York City"],
      iso2: null,
      iso3: null,
      languages: null,
      currency_code: null,
      currency_name: null,
      phone_prefix: null,
      capital: null,
      top_cities_and_towns: [],
    },
    relationships: {
      state: {
        data: {
          id: "2010537",
          type: "destination",
        },
      },
      country: {
        data: {
          id: "2008781",
          type: "destination",
        },
      },
      continent: {
        data: {
          id: "10935560",
          type: "destination",
        },
      },
      known_for: {
        data: [
          {
            id: "12",
            type: "known_for",
          },
          {
            id: "4",
            type: "known_for",
          },
          {
            id: "3",
            type: "known_for",
          },
          {
            id: "17",
            type: "known_for",
          },
          {
            id: "2",
            type: "known_for",
          },
          {
            id: "8",
            type: "known_for",
          },
          {
            id: "7",
            type: "known_for",
          },
          {
            id: "21",
            type: "known_for",
          },
          {
            id: "9",
            type: "known_for",
          },
          {
            id: "18",
            type: "known_for",
          },
          {
            id: "20",
            type: "known_for",
          },
          {
            id: "6",
            type: "known_for",
          },
        ],
      },
      photos: {
        data: [
          {
            id: "608",
            type: "photo",
          },
          {
            id: "585",
            type: "photo",
          },
          {
            id: "581",
            type: "photo",
          },
          {
            id: "579",
            type: "photo",
          },
          {
            id: "578",
            type: "photo",
          },
        ],
      },
      travelers: {
        data: [
          {
            id: "210",
            type: "user",
          },
          {
            id: "607",
            type: "user",
          },
          {
            id: "195",
            type: "user",
          },
          {
            id: "547",
            type: "user",
          },
          {
            id: "206",
            type: "user",
          },
        ],
      },
      mentions: {
        data: [
          {
            id: "3",
            type: "mention",
          },
        ],
      },
    },
  },
  included: [
    {
      id: "10935560",
      type: "destination",
      attributes: {
        slug: "north-america",
        destination_type: "Continent",
        short_name: "North America",
        name: "North America",
        long_name: "North America",
        latitude: 42.13646,
        longitude: -100.8141,
        bounding_box: {
          sw_lon: -171.486609,
          sw_lat: 8.040134,
          ne_lon: -39.362977,
          ne_lat: 71.088537,
        },
        countable: true,
        average_rating: 4.76923076923077,
        check_in_count: 21172,
      },
      relationships: {
        known_for: {
          data: [],
        },
        featured_photo: {
          data: {
            id: "2436",
            type: "photo",
          },
        },
      },
    },
    {
      id: "2436",
      type: "photo",
      attributes: {
        image: {
          full: "https://cdn.roadgoat.com/uploads/photo/image/2436/landscapes-1426130_1920.jpg",
          large:
            "https://cdn.roadgoat.com/uploads/photo/image/2436/large_landscapes-1426130_1920.jpg",
          medium:
            "https://cdn.roadgoat.com/uploads/photo/image/2436/medium_landscapes-1426130_1920.jpg",
          thumb:
            "https://cdn.roadgoat.com/uploads/photo/image/2436/thumb_landscapes-1426130_1920.jpg",
          avatar:
            "https://cdn.roadgoat.com/uploads/photo/image/2436/avatar_landscapes-1426130_1920.jpg",
        },
      },
    },
    {
      id: "12",
      type: "known_for",
      attributes: {
        slug: "charming",
        name: "Charming",
        icon: "https://cdn.roadgoat.com/images/shared/icons/known-for/charming",
      },
    },
    {
      id: "4",
      type: "known_for",
      attributes: {
        slug: "foodie",
        name: "Foodie",
        icon: "https://cdn.roadgoat.com/images/shared/icons/known-for/foodie",
      },
    },
    {
      id: "3",
      type: "known_for",
      attributes: {
        slug: "nightlife",
        name: "Nightlife",
        icon: "https://cdn.roadgoat.com/images/shared/icons/known-for/nightlife",
      },
    },
    {
      id: "17",
      type: "known_for",
      attributes: {
        slug: "architecture",
        name: "Architecture",
        icon: "https://cdn.roadgoat.com/images/shared/icons/known-for/architecture",
      },
    },
    {
      id: "2",
      type: "known_for",
      attributes: {
        slug: "history",
        name: "History",
        icon: "https://cdn.roadgoat.com/images/shared/icons/known-for/history",
      },
    },
    {
      id: "8",
      type: "known_for",
      attributes: {
        slug: "museums",
        name: "Museums",
        icon: "https://cdn.roadgoat.com/images/shared/icons/known-for/museums",
      },
    },
    {
      id: "7",
      type: "known_for",
      attributes: {
        slug: "performing-arts",
        name: "Performing Arts",
        icon: "https://cdn.roadgoat.com/images/shared/icons/known-for/performing-arts",
      },
    },
    {
      id: "21",
      type: "known_for",
      attributes: {
        slug: "music",
        name: "Music",
        icon: "https://cdn.roadgoat.com/images/shared/icons/known-for/music",
      },
    },
    {
      id: "9",
      type: "known_for",
      attributes: {
        slug: "posh",
        name: "Posh",
        icon: "https://cdn.roadgoat.com/images/shared/icons/known-for/posh",
      },
    },
    {
      id: "18",
      type: "known_for",
      attributes: {
        slug: "lgbt-friendly",
        name: "LGBT Scene",
        icon: "https://cdn.roadgoat.com/images/shared/icons/known-for/lgbt-friendly",
      },
    },
    {
      id: "20",
      type: "known_for",
      attributes: {
        slug: "diversity",
        name: "Diversity",
        icon: "https://cdn.roadgoat.com/images/shared/icons/known-for/diversity",
      },
    },
    {
      id: "6",
      type: "known_for",
      attributes: {
        slug: "shopping",
        name: "Shopping",
        icon: "https://cdn.roadgoat.com/images/shared/icons/known-for/shopping",
      },
    },
    {
      id: "2008781",
      type: "destination",
      attributes: {
        slug: "united-states",
        destination_type: "Country",
        short_name: "United States",
        name: "United States",
        long_name: "United States",
        latitude: 39.76,
        longitude: -98.5,
        bounding_box: {
          sw_lon: -124.733253,
          sw_lat: 24.544245,
          ne_lon: -66.954811,
          ne_lat: 49.388611,
        },
        countable: true,
        average_rating: 4.26470588235294,
        check_in_count: 21377,
      },
      relationships: {
        known_for: {
          data: [],
        },
        featured_photo: {
          data: {
            id: "692",
            type: "photo",
          },
        },
      },
    },
    {
      id: "692",
      type: "photo",
      attributes: {
        image: {
          full: "https://cdn.roadgoat.com/uploads/photo/image/692/travel-guide-of-san-francisco-ca-usa-original.jpg",
          large:
            "https://cdn.roadgoat.com/uploads/photo/image/692/large_travel-guide-of-san-francisco-ca-usa-original.jpg",
          medium:
            "https://cdn.roadgoat.com/uploads/photo/image/692/medium_travel-guide-of-san-francisco-ca-usa-original.jpg",
          thumb:
            "https://cdn.roadgoat.com/uploads/photo/image/692/thumb_travel-guide-of-san-francisco-ca-usa-original.jpg",
          avatar:
            "https://cdn.roadgoat.com/uploads/photo/image/692/avatar_travel-guide-of-san-francisco-ca-usa-original.jpg",
        },
      },
    },
    {
      id: "3",
      type: "mention",
      attributes: {
        title: "52 Places to Go in 2019",
        excerpt: "A starter kit for escaping into the world",
        url: "https://www.roadgoat.com/blog/lists/52-places-to-go-in-2019",
        source_name: "New York Times",
        source_domain: "nytimes.com",
        source_logo:
          "https://cdn.roadgoat.com/uploads/mention_source/logo/1/avatar_new-york-times-logo.webp",
      },
      relationships: {},
    },
    {
      id: "608",
      type: "photo",
      attributes: {
        image: {
          full: "https://cdn.roadgoat.com/uploads/photo/image/608/travel-guide-of-new-york-ny-usa-original.jpg",
          large:
            "https://cdn.roadgoat.com/uploads/photo/image/608/large_travel-guide-of-new-york-ny-usa-original.jpg",
          medium:
            "https://cdn.roadgoat.com/uploads/photo/image/608/medium_travel-guide-of-new-york-ny-usa-original.jpg",
          thumb:
            "https://cdn.roadgoat.com/uploads/photo/image/608/thumb_travel-guide-of-new-york-ny-usa-original.jpg",
          avatar:
            "https://cdn.roadgoat.com/uploads/photo/image/608/avatar_travel-guide-of-new-york-ny-usa-original.jpg",
        },
      },
    },
    {
      id: "585",
      type: "photo",
      attributes: {
        image: {
          full: "https://cdn.roadgoat.com/uploads/photo/image/585/travel-guide-of-new-york-ny-usa-original.jpg",
          large:
            "https://cdn.roadgoat.com/uploads/photo/image/585/large_travel-guide-of-new-york-ny-usa-original.jpg",
          medium:
            "https://cdn.roadgoat.com/uploads/photo/image/585/medium_travel-guide-of-new-york-ny-usa-original.jpg",
          thumb:
            "https://cdn.roadgoat.com/uploads/photo/image/585/thumb_travel-guide-of-new-york-ny-usa-original.jpg",
          avatar:
            "https://cdn.roadgoat.com/uploads/photo/image/585/avatar_travel-guide-of-new-york-ny-usa-original.jpg",
        },
      },
    },
    {
      id: "581",
      type: "photo",
      attributes: {
        image: {
          full: "https://cdn.roadgoat.com/uploads/photo/image/581/travel-guide-of-new-york-ny-usa-original.jpg",
          large:
            "https://cdn.roadgoat.com/uploads/photo/image/581/large_travel-guide-of-new-york-ny-usa-original.jpg",
          medium:
            "https://cdn.roadgoat.com/uploads/photo/image/581/medium_travel-guide-of-new-york-ny-usa-original.jpg",
          thumb:
            "https://cdn.roadgoat.com/uploads/photo/image/581/thumb_travel-guide-of-new-york-ny-usa-original.jpg",
          avatar:
            "https://cdn.roadgoat.com/uploads/photo/image/581/avatar_travel-guide-of-new-york-ny-usa-original.jpg",
        },
      },
    },
    {
      id: "579",
      type: "photo",
      attributes: {
        image: {
          full: "https://cdn.roadgoat.com/uploads/photo/image/579/travel-guide-of-new-york-ny-usa-original.jpg",
          large:
            "https://cdn.roadgoat.com/uploads/photo/image/579/large_travel-guide-of-new-york-ny-usa-original.jpg",
          medium:
            "https://cdn.roadgoat.com/uploads/photo/image/579/medium_travel-guide-of-new-york-ny-usa-original.jpg",
          thumb:
            "https://cdn.roadgoat.com/uploads/photo/image/579/thumb_travel-guide-of-new-york-ny-usa-original.jpg",
          avatar:
            "https://cdn.roadgoat.com/uploads/photo/image/579/avatar_travel-guide-of-new-york-ny-usa-original.jpg",
        },
      },
    },
    {
      id: "578",
      type: "photo",
      attributes: {
        image: {
          full: "https://cdn.roadgoat.com/uploads/photo/image/578/travel-guide-of-new-york-ny-usa-original.jpg",
          large:
            "https://cdn.roadgoat.com/uploads/photo/image/578/large_travel-guide-of-new-york-ny-usa-original.jpg",
          medium:
            "https://cdn.roadgoat.com/uploads/photo/image/578/medium_travel-guide-of-new-york-ny-usa-original.jpg",
          thumb:
            "https://cdn.roadgoat.com/uploads/photo/image/578/thumb_travel-guide-of-new-york-ny-usa-original.jpg",
          avatar:
            "https://cdn.roadgoat.com/uploads/photo/image/578/avatar_travel-guide-of-new-york-ny-usa-original.jpg",
        },
      },
    },
    {
      id: "2010537",
      type: "destination",
      attributes: {
        slug: "new-york",
        destination_type: "State",
        short_name: "New York",
        name: "New York (State)",
        long_name: "New York (State)",
        latitude: 43.00035,
        longitude: -75.4999,
        bounding_box: {
          sw_lon: -79.7625122070312,
          sw_lat: 40.4773979187012,
          ne_lon: -71.8527069091797,
          ne_lat: 45.0158615112305,
        },
        countable: true,
        average_rating: 4.375,
        check_in_count: 14362,
      },
      relationships: {
        known_for: {
          data: [],
        },
        featured_photo: {
          data: {
            id: "2355",
            type: "photo",
          },
        },
      },
    },
    {
      id: "2355",
      type: "photo",
      attributes: {
        image: {
          full: "https://cdn.roadgoat.com/uploads/photo/image/2355/34485049333_5a836a9a39_o.jpg",
          large:
            "https://cdn.roadgoat.com/uploads/photo/image/2355/large_34485049333_5a836a9a39_o.jpg",
          medium:
            "https://cdn.roadgoat.com/uploads/photo/image/2355/medium_34485049333_5a836a9a39_o.jpg",
          thumb:
            "https://cdn.roadgoat.com/uploads/photo/image/2355/thumb_34485049333_5a836a9a39_o.jpg",
          avatar:
            "https://cdn.roadgoat.com/uploads/photo/image/2355/avatar_34485049333_5a836a9a39_o.jpg",
        },
      },
    },
    {
      id: "210",
      type: "user",
      attributes: {
        name: "Traveler Name",
        url: "https://www.roadgoat.com/travelers/eliza-coker",
        avatar_url:
          "https://cdn.roadgoat.com/uploads/user/avatar/210/avatar_jake-melara-30681.jpg",
      },
    },
    {
      id: "607",
      type: "user",
      attributes: {
        name: "Bill Shamam",
        url: "https://www.roadgoat.com/travelers/bill-shamam",
        avatar_url:
          "https://cdn.roadgoat.com/uploads/user/avatar/607/avatar_profilepic.jpeg",
      },
    },
    {
      id: "195",
      type: "user",
      attributes: {
        name: "N M",
        url: "https://www.roadgoat.com/travelers/nir-markus",
        avatar_url:
          "https://cdn.roadgoat.com/uploads/user/avatar/195/avatar_1463089_970101317119_1132090941_n.jpg",
      },
    },
    {
      id: "547",
      type: "user",
      attributes: {
        name: "Amanda Patten",
        url: "https://www.roadgoat.com/travelers/amanda-patten",
        avatar_url:
          "https://cdn.roadgoat.com/uploads/user/avatar/547/avatar_profilepic.jpeg",
      },
    },
    {
      id: "206",
      type: "user",
      attributes: {
        name: "Chris E",
        url: "https://www.roadgoat.com/travelers/chris-e",
        avatar_url:
          "https://cdn.roadgoat.com/uploads/user/avatar/206/avatar_395995_4112379538650_1957359157_n.jpg",
      },
    },
  ],
};
