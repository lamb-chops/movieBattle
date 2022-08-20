const fetchData = async (searchTerm) => {
    //sets up end points to attach at end of url, benefit of axios
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "ffc91e36",
      s: searchTerm,
    },
  });

  console.log(response.data);
};

let timeoutId
const input = document.querySelector('input')
//first time through timeoutId is und so setTimeout runs, next time through set timeout has
// a value so the timer is reset
const onInput = event => {
    if (timeoutId){
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
        fetchData(event.target.value);
    }, 500)
}
input.addEventListener('input', onInput)
