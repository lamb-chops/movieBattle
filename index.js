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

createAutoComplete({
  root: document.querySelector(".autocomplete"),
});
createAutoComplete({
  root: document.querySelector(".autocomplete2"),
});
createAutoComplete({
  root: document.querySelector(".autocomplete3"),
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
