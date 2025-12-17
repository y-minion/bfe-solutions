// This is a JavaScript coding problem from BFE.dev

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */
function throttle(func, wait, option = { leading: true, trailing: true }) {
  // your code here
  let isWait = false;
  let lastArg = null;
  const { leading, trailing } = option;
  function delay() {
    setTimeout(() => {
      isWait = false; //cooling 해제
      if (!trailing) return;

      if (!lastArg) return; //cooling중에 호출이 되야 실행된다.
      //마지막에 쌓인 매개변수를 func에 전달
      func(lastArg);
      isWait = true;
      lastArg = null; //사용했으면 다시 null처리
      delay();
    }, wait);
  }
  return (arg) => {
    if (!isWait) {
      if (leading) {
        func(arg);
      } else {
        lastArg = arg;
      }

      isWait = true;
      delay();
    } else {
      lastArg = arg; //cooling중 입력받은 매개변수 업데이트
    }
  };
}
