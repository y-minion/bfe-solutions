// This is a JavaScript coding problem from BFE.dev

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @returns {(...args: any[]) => any}
 */
function debounce(func, wait) {
  let timerId = null;

  //딜레이 함수 호출시 타이머 아이디 초기화
  const cooling = (arg) => {
    timerId = setTimeout(() => {
      func(arg); //밀렸던 함수 실행
    }, wait);
  };

  return (arg) => {
    clearTimeout(timerId);
    cooling(arg);
  };
}
