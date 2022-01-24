import type { GetStaticPropsContext, NextPage } from "next";
import React from "react";
import Link from "next/link";
// import Calculator from "src/components/calculator/Calculator";
import wrapper from "src/store/configureStore";

const Home: NextPage = () => {
  return (
    <h1>
      {/* <Calculator /> */}
      Hello,{" "}
      <Link href="/salary">
        <a style={{ textDecoration: "underline" }}>급여명세서 발급하러 가기</a>
      </Link>
    </h1>
  );
};

export default Home;

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (ctx: GetStaticPropsContext) => {
    try {
      return {
        props: {},
      };
    } catch (error) {
      return {
        props: {},
      };
    }
  }
);
