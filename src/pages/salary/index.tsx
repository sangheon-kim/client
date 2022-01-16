import type { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import React from "react";
import SalaryContainer from "src/containers/Salary/SalaryContainer";
import wrapper from "src/store/configureStore";

const SalaryPage: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Flaw 급여명세서 발급</title>
      </Head>
      <SalaryContainer />
    </React.Fragment>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (__: GetStaticPropsContext) => {
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

export default SalaryPage;
