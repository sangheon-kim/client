import type { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import React from "react";
import RegisterWorkerContainer from "src/containers/Salary/RegisterWorkerContainer";
import wrapper from "src/store/configureStore";

type Props = {
  step: number;
};

const SalaryProcessPage: NextPage<Props> = ({ step }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Flaw 급여명세서 양식 작성</title>
      </Head>
      <RegisterWorkerContainer step={step} />
    </React.Fragment>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { step: "1" } },
      { params: { step: "2" } },
      { params: { step: "3" } },
      { params: { step: "4" } },
      { params: { step: "5" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }: GetStaticPropsContext) => {
      if (!params) throw new Error("No Params");
      const step = Number(params.step) || 1;

      try {
        return {
          props: {
            step,
          },
        };
      } catch (error) {
        return {
          props: {
            step,
          },
        };
      }
    }
);

export default SalaryProcessPage;
