// This is a JavaScript coding problem from BFE.dev

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @returns {(...args: any[]) => any}
 */
function debounce(func, wait) {
  let isCooling = true;
  let timerId = null;
  let lastArg = null;

  //딜레이 함수 호출시 타이머 아이디 초기화
  const cooling = () => {
    timerId = setTimeout(() => {
      isCooling = false;
      if (lastArg) {
        func(lastArg); //밀렸던 함수 실행
        isCooling = true;
        lastArg = null;
        cooling();
      }
    }, wait);
  };

  return (arg) => {
    if (isCooling) {
      lastArg = arg;
      clearTimeout(timerId);
      cooling(); //딜레이 초기화
    } else {
      func(arg);
      isCooling = true;
      cooling();
    }
  };
}
