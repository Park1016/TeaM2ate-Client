import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";

import { authState } from "state/auth";
import useCheckAuth from "hooks/useCheckAuth";
import MypageContent from "containers/MypageContent/MypageContent";

const Mypage = (props) => {
  const auth = useRecoilValue(authState);
  const [checkAuth] = useCheckAuth({ auth });

  useEffect(() => {
    checkAuth();
  }, [auth]);

  return <>{auth && <MypageContent />}</>;
};

export default Mypage;
