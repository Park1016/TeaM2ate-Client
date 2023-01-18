import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";

import "./App.css";

import Header from "containers/Header/Header";
import Aside from "containers/Aside/Aside";
import Loading from "components/Loading/Loading";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      suspense: true,
    },
  },
});

const App = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Suspense fallback={<Loading />}>
          <Header />
          <Aside />
          <Outlet />
        </Suspense>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
