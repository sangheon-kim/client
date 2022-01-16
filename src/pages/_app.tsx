import "src/assets/styles/globals.scss";
import React from "react";
import wrapper from "src/store/configureStore";
import type { AppProps } from "next/app";

function MyApp(ctx: AppProps) {
  const { Component, pageProps } = ctx;

  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
