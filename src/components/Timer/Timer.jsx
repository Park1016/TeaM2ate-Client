import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import classNames from "classnames/bind";

import styles from "./Timer.module.scss";

const Timer = ({ setCheckAuthNum, start }) => {
  const cx = classNames.bind(styles);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10);
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: time,
    autoStart: true,
    onExpire: () => {
      alert("유효시간이 만료되었습니다");
      setCheckAuthNum(false);
    },
  });

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 180);
    restart(time);
  }, [start]);

  return (
    <div className={cx("timer")}>
      <span>{minutes}</span>:
      <span>{seconds.toString().length === 1 ? `0${seconds}` : seconds}</span>
    </div>
  );
};

export default Timer;
