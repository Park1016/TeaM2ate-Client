import { useSetRecoilState } from "recoil";
import { modalState } from "state/modal";

const useCheckAuth = ({ auth }) => {
  const setModal = useSetRecoilState(modalState);

  const checkAuth = () => {
    if (!auth) {
      alert("로그인 후 접근 가능한 페이지입니다");
      setModal({ login: true, signup: false, find: false });
    }
  };

  return [checkAuth];
};

export default useCheckAuth;
