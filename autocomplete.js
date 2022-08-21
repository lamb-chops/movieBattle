const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData
}) => {
  root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  //first time through timeoutId is und so setTimeout runs, next time through set timeout has
  // a value so the timer is reset
  //async/await cuz fetchData returns promise so gotta wait for info
  const onInput = async (event) => {
    const items = await fetchData(event.target.value);
    //closes out drop down is no results
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }
    //reset shown results when typing in a different movie
    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active"); //css library Bulma command to show dropdown
    for (let item of items) {
      const option = document.createElement("a");
      //checks if image has actual source
      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
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
};
