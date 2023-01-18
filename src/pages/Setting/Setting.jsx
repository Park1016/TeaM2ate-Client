import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";

import { authState } from "state/auth";
import useCheckAuth from "hooks/useCheckAuth";
import SettingContent from "containers/SettingContent/SettingContent";

const Setting = (props) => {
  const auth = useRecoilValue(authState);
  const [checkAuth] = useCheckAuth({ auth });

  useEffect(() => {
    checkAuth();
  }, [auth]);

  return <>{auth && <SettingContent />}</>;
};

export default Setting;
