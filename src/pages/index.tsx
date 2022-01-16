import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import React from "react";
import Calculator from "src/components/calculator/Calculator";
import wrapper from "src/store/configureStore";

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Calculator />
    </React.Fragment>
  );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx: GetServerSidePropsContext) => {
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
