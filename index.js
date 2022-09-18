const username = "c827e94ec41d32012308222cffa9b24d";
const pass = "6c3000ee9b691b3532f0151922527e07";
const apiTestData = {
  data: {
    id: "2008781",
    type: "destination",
    attributes: {
      slug: "united-states",
      url: "https://www.roadgoat.com/travel-guides/united-states",
      destination_type: "Country",
      short_name: "United States",
      name: "United States",
      long_name: "United States",
      population: 310232863,
      latitude: 39.76,
      longitude: -98.5,
      bounding_box: {
        sw_lon: -124.733253,
        sw_lat: 24.544245,
        ne_lon: -66.954811,
        ne_lat: 49.388611,
      },
      geonames_id: 6252001,
      walk_score_url: null,
      budget: {
        "United States": {
          value: 6,
          text: "High",
          subText: "Get that wallet ready",
        },
      },
      safety: {
        "United States": {
          value: 4,
          text: "High",
          subText: "Exercise Normal Precaution",
        },
      },
      covid: {
        "United States": {
          value: 13.2626195023093,
          url: "https://www.worldometers.info/coronavirus/",
          text: "High",
        },
      },
      average_rating: 4.26470588235294,
      check_in_count: 21472,
      google_events_url:
        "https://www.google.com/search?q=events+united+states&ibp=htl;events",
      vrbo_url:
        "https://vrbo.prf.hn/click/camref:1101ljbvy/creativeref:1101l63118/destination:https://www.vrbo.com/search/keywords:united-states",
      alltrails_url: "https://www.alltrails.com/united-states",
      open_elevation_url:
        "https://api.open-elevation.com/api/v1/lookup?locations=39.76,-98.5",
      foursquare_url:
        "https://api.foursquare.com/v2/venues/search?ll=39.76,-98.5&radius=100000",
      airbnb_url: "https://www.airbnb.com/s/United+States/homes",
      getyourguide_url:
        "https://getyourguide.com/s/?q=United+States&partner_id=0TQGVTE",
      wikipedia_url: "http://en.wikipedia.org/wiki/United_States",
      woe_id: null,
      alternate_names: [
        "US",
        "United States of America",
        "USA",
        "U.S.",
        "U.S.A.",
        "United States",
        "America",
      ],
      iso2: "US",
      iso3: "USA",
      languages: "en-US,es-US,haw,fr",
      currency_code: "USD",
      currency_name: "Dollar",
      phone_prefix: "1",
      capital: "Washington",
      top_cities_and_towns: [
        {
          id: 6588544,
          name: "New York, NY",
          url: "https://www.roadgoat.com/travel-guides/new-york-ny-usa",
        },
        {
          id: 10774751,
          name: "Honolulu, HI",
          url: "https://www.roadgoat.com/travel-guides/honolulu-hi-usa",
        },
        {
          id: 10756160,
          name: "Yosemite Village, CA",
          url: "https://www.roadgoat.com/travel-guides/yosemite-village-ca-usa",
        },
        {
          id: 10745107,
          name: "Burlington, VT",
          url: "https://www.roadgoat.com/travel-guides/burlington-vt-usa",
        },
        {
          id: 10755326,
          name: "South San Francisco, CA",
          url: "https://www.roadgoat.com/travel-guides/south-san-francisco-ca-usa",
        },
        {
          id: 10792455,
          name: "Downtown/Financial District, MA",
          url: "https://www.roadgoat.com/travel-guides/downtown-financial-district-ma-usa",
        },
        {
          id: 10672983,
          name: "Oklahoma City, OK",
          url: "https://www.roadgoat.com/travel-guides/oklahoma-city-ok-usa",
        },
        {
          id: 10788427,
          name: "Yosemite Valley, CA",
          url: "https://www.roadgoat.com/travel-guides/yosemite-valley-ca-usa",
        },
        {
          id: 10774419,
          name: "Lahaina, HI",
          url: "https://www.roadgoat.com/travel-guides/lahaina-hi-usa",
        },
        {
          id: 10766553,
          name: "West Yellowstone, MT",
          url: "https://www.roadgoat.com/travel-guides/west-yellowstone-mt-usa",
        },
      ],
    },
    relationships: {
      state: {
        data: null,
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
        data: [],
      },
      photos: {
        data: [
          {
            id: "1212",
            type: "photo",
          },
          {
            id: "1211",
            type: "photo",
          },
          {
            id: "1210",
            type: "photo",
          },
          {
            id: "1209",
            type: "photo",
          },
          {
            id: "1208",
            type: "photo",
          },
        ],
      },
      travelers: {
        data: [
          {
            id: "685",
            type: "user",
          },
          {
            id: "1079",
            type: "user",
          },
          {
            id: "2338",
            type: "user",
          },
          {
            id: "600",
            type: "user",
          },
          {
            id: "2140",
            type: "user",
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
        check_in_count: 21472,
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
      id: "1212",
      type: "photo",
      attributes: {
        image: {
          full: "https://cdn.roadgoat.com/uploads/photo/image/1212/travel-guide-of-south-dakota-original.jpg",
          large:
            "https://cdn.roadgoat.com/uploads/photo/image/1212/large_travel-guide-of-south-dakota-original.jpg",
          medium:
            "https://cdn.roadgoat.com/uploads/photo/image/1212/medium_travel-guide-of-south-dakota-original.jpg",
          thumb:
            "https://cdn.roadgoat.com/uploads/photo/image/1212/thumb_travel-guide-of-south-dakota-original.jpg",
          avatar:
            "https://cdn.roadgoat.com/uploads/photo/image/1212/avatar_travel-guide-of-south-dakota-original.jpg",
        },
      },
    },
    {
      id: "1211",
      type: "photo",
      attributes: {
        image: {
          full: "https://cdn.roadgoat.com/uploads/photo/image/1211/travel-guide-of-oklahoma-original.jpg",
          large:
            "https://cdn.roadgoat.com/uploads/photo/image/1211/large_travel-guide-of-oklahoma-original.jpg",
          medium:
            "https://cdn.roadgoat.com/uploads/photo/image/1211/medium_travel-guide-of-oklahoma-original.jpg",
          thumb:
            "https://cdn.roadgoat.com/uploads/photo/image/1211/thumb_travel-guide-of-oklahoma-original.jpg",
          avatar:
            "https://cdn.roadgoat.com/uploads/photo/image/1211/avatar_travel-guide-of-oklahoma-original.jpg",
        },
      },
    },
    {
      id: "1210",
      type: "photo",
      attributes: {
        image: {
          full: "https://cdn.roadgoat.com/uploads/photo/image/1210/travel-guide-of-ohio-original.jpg",
          large:
            "https://cdn.roadgoat.com/uploads/photo/image/1210/large_travel-guide-of-ohio-original.jpg",
          medium:
            "https://cdn.roadgoat.com/uploads/photo/image/1210/medium_travel-guide-of-ohio-original.jpg",
          thumb:
            "https://cdn.roadgoat.com/uploads/photo/image/1210/thumb_travel-guide-of-ohio-original.jpg",
          avatar:
            "https://cdn.roadgoat.com/uploads/photo/image/1210/avatar_travel-guide-of-ohio-original.jpg",
        },
      },
    },
    {
      id: "1209",
      type: "photo",
      attributes: {
        image: {
          full: "https://cdn.roadgoat.com/uploads/photo/image/1209/travel-guide-of-north-dakota-original.jpg",
          large:
            "https://cdn.roadgoat.com/uploads/photo/image/1209/large_travel-guide-of-north-dakota-original.jpg",
          medium:
            "https://cdn.roadgoat.com/uploads/photo/image/1209/medium_travel-guide-of-north-dakota-original.jpg",
          thumb:
            "https://cdn.roadgoat.com/uploads/photo/image/1209/thumb_travel-guide-of-north-dakota-original.jpg",
          avatar:
            "https://cdn.roadgoat.com/uploads/photo/image/1209/avatar_travel-guide-of-north-dakota-original.jpg",
        },
      },
    },
    {
      id: "1208",
      type: "photo",
      attributes: {
        image: {
          full: "https://cdn.roadgoat.com/uploads/photo/image/1208/travel-guide-of-nebraska-original.jpg",
          large:
            "https://cdn.roadgoat.com/uploads/photo/image/1208/large_travel-guide-of-nebraska-original.jpg",
          medium:
            "https://cdn.roadgoat.com/uploads/photo/image/1208/medium_travel-guide-of-nebraska-original.jpg",
          thumb:
            "https://cdn.roadgoat.com/uploads/photo/image/1208/thumb_travel-guide-of-nebraska-original.jpg",
          avatar:
            "https://cdn.roadgoat.com/uploads/photo/image/1208/avatar_travel-guide-of-nebraska-original.jpg",
        },
      },
    },
    {
      id: "685",
      type: "user",
      attributes: {
        name: "Benjamin T. Dayley",
        url: "https://www.roadgoat.com/travelers/benjamin-t-dayley",
        avatar_url:
          "https://cdn.roadgoat.com/uploads/user/avatar/685/avatar_profilepic.jpeg",
      },
    },
    {
      id: "1079",
      type: "user",
      attributes: {
        name: "Ed Fedora",
        url: "https://www.roadgoat.com/travelers/ed-fedora",
        avatar_url: null,
      },
    },
    {
      id: "2338",
      type: "user",
      attributes: {
        name: "Carmina Stopczynski",
        url: "https://www.roadgoat.com/travelers/carmina-stopczynski",
        avatar_url: null,
      },
    },
    {
      id: "600",
      type: "user",
      attributes: {
        name: "Walter Detour Buschta",
        url: "https://www.roadgoat.com/travelers/walter-detour-buschta",
        avatar_url:
          "https://cdn.roadgoat.com/uploads/user/avatar/600/avatar_profilepic.jpeg",
      },
    },
    {
      id: "2140",
      type: "user",
      attributes: {
        name: "Rob Brain",
        url: "https://www.roadgoat.com/travelers/rob-brain",
        avatar_url:
          "https://cdn.roadgoat.com/uploads/user/avatar/2140/avatar_profilepic.jpeg",
      },
    },
  ],
};

document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();
  renderUI(apiTestData);
});

function renderUI(apiData) {
  // RENDERING USER DATA
  let appContainerEl = document.createElement("div");
  document.body.append(appContainerEl);
  appContainerEl.setAttribute("id", "app-container");

  let myDataContainerEl = document.createElement("div");
  appContainerEl.append(myDataContainerEl);
  myDataContainerEl.id = "my-data-container";

  let myDataInfoCardEl = document.createElement("div");
  myDataContainerEl.append(myDataInfoCardEl);
  myDataInfoCardEl.id = "my-data-info-card";

  let listsContainerEl = document.createElement("div");
  myDataContainerEl.append(listsContainerEl);
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

  // RENDERING API SEARCH DATA
  // search bar
  let apiDataContainerEl = document.createElement("div");
  appContainerEl.append(apiDataContainerEl);
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

  // api-cards-container
  let apiCardsContainerEl = document.createElement("div");
  apiDataContainerEl.append(apiCardsContainerEl);
  apiCardsContainerEl.id = "api-cards-container";

  // RENDER API SEARCH RESULT CARD
  let citiesDataFromApi = apiData["data"]["attributes"]["top_cities_and_towns"];
  citiesDataFromApi.forEach((el) => {
    let cardEl = document.createElement("div");
    apiCardsContainerEl.append(cardEl);
    cardEl.className = "city-card";
    cardEl.textContent = el.name;
  });
}

async function loadApiData() {
  try {
    // let searchInput = document.querySelector("#search-input").value;
    const searchInput = "united-states";
    let newSecret = btoa(`${username}:${pass}`);
    let response = await fetch(
      `https://api.roadgoat.com/api/v2/destinations/${searchInput}`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + newSecret,
        },
      }
    );
    let apiData = await response.json();
    // .then((content) => content);
    return apiData;
  } catch (err) {
    console.log("fetch error: ", err);
  }
}
