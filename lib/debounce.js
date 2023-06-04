var timer;

export default function debounce(func, timeout = 1000){
    return async (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }