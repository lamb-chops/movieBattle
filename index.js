const fetchData = async (searchTerm) => {
  //sets up end points to attach at end of url, benefit of axios
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "ffc91e36",
      s: searchTerm,
    },
  });
  //error is property in response, return empty array if no match to avoid errors
  if (response.data.Error) {
    return [];
  }

  //capital S cuz thats how api has it, array of movies
  return response.data.Search;
};

const root = document.querySelector(".autocomplete");
root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

//first time through timeoutId is und so setTimeout runs, next time through set timeout has
// a value so the timer is reset
//async/await cuz fetchData returns promise so gotta wait for info
const onInput = async (event) => {
  const movies = await fetchData(event.target.value);

  dropdown.classList.add("is-active"); //css library Bulma command to show dropdown
  for (let movie of movies) {
    const option = document.createElement("a");

    option.classList.add("dropdown-item");
    //backticks for multi line, url supposed to be in quotes for image
    option.innerHTML = `
        <img src="${movie.Poster}"/>
        ${movie.Title}
    `;

    resultsWrapper.appendChild(option);
  }
};
input.addEventListener("input", debounce(onInput, 750));
