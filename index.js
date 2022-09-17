console.log("fetch start");
let username = "c827e94ec41d32012308222cffa9b24d";
let pass = "6c3000ee9b691b3532f0151922527e07";

let newSecret = btoa(`${username}:${pass}`);
console.log(newSecret);
let apiData = fetch("https://api.roadgoat.com/api/v2/destinations/6588544", {
  method: "GET",
  headers: {
    Authorization: "Basic " + newSecret,
  },
})
  .then((response) => response.json())
  .then((result) => console.log("result", result))
  .catch((err) => console.log(err));
