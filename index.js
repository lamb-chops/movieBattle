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
  //closes out drop down is no results
  if (!movies.length) {
    dropdown.classList.remove("is-active");
    return;
  }
  //reset shown results when typing in a different movie
  resultsWrapper.innerHTML = "";
  dropdown.classList.add("is-active"); //css library Bulma command to show dropdown
  for (let movie of movies) {
    const option = document.createElement("a");
    //checks if image has actual source
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    option.classList.add("dropdown-item");
    //backticks for multi line, url supposed to be in quotes for image
    option.innerHTML = `
        <img src="${imgSrc}"/>
        ${movie.Title}
    `;
    option.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = movie.Title;
      onMovieSelect(movie);
    });
    resultsWrapper.appendChild(option);
  }
};
input.addEventListener("input", debounce(onInput, 750));

//checks if click is on doc, checks if where clicked is inside dropdown or not
document.addEventListener("click", (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});

const onMovieSelect = async (movie) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "ffc91e36",
      i: movie.imdbID,
    },
  });
  document.querySelector("#summary").innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
  return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};
