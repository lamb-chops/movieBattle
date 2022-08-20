const debounce = (func, delay = 1000) => {
  let timeoutId;
  //how to handle args for func
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      //how to apply args passed to func
      func.apply(null, args);
    }, delay);
  };
};
