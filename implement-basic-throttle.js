// This is a JavaScript coding problem from BFE.dev

/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
  // your code here
  //wait 을 기준으로 대기후 func함수를 실행해야하는 것 같다.
  //반환은 func함수를 한다. 근데 그대로 반환하는게 아니라 wait만큼 딜레이를 걸고 func이 실행되게 해야한다.
  //근데 무작정 wait만큼 딜레이가 아니라, 이 함수가 실행이 된 후게 딜레이가 걸리도록 해야한다. 첫 실행때는 딜레이가 있으면 안된다.
  //⭐️ 딜레이중에 반환 함수가 호출된다면 해당 인자를 기억했다가 딜레이가 끝나면 실행한다. 근데 여러번 호출되면 최신값만 호출한다.

  let waiting = false;
  let lastArg = null;

  const delay = () => {
    setTimeout(() => {
      waiting = false; // 쿨다운 해제

      if (!lastArg) return;
      func(lastArg);
      waiting = true; //쿨다운 실행
      lastArg = null; //⭐️ 중요! 마지막 arg를 처리하면 Null로 초기화 해줘야한다.
      delay();
    }, wait);
  };

  return (arg) => {
    if (!waiting) {
      func(arg);
      waiting = true; //쿨다운 실행
      delay();
    } else {
      lastArg = arg;
    }
  };
}
