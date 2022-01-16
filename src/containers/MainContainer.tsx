import React from "react";
import SalaryLayout from "src/components/layout/SalaryLayout";
import styles from "src/assets/styles/containers/MainContainer.module.scss";

type Props = {};

const MainContainer: React.FC<Props> = () => {
  return <SalaryLayout>123</SalaryLayout>;
};

export default React.memo(MainContainer);
