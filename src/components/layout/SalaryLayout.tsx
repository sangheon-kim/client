import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "src/assets/styles/components/layout/SalaryLayout.module.scss";
import Footer from "src/components/common/Footer";
import Header from "src/components/common/Header";
import { envAction } from "src/store/env/env.slice";
import { RootState } from "src/store/roots";
import InitalizeUtil from "src/utils/InitalizeUtil";

type Props = {
  children: React.ReactNode;
};

const SalaryLayout: React.FC<Props> = ({ children }) => {
  const device = useSelector<RootState>((state) => state.env.device) as string;

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(envAction.deviceSetting(InitalizeUtil.isMobile()));
  }, [dispatch]);

  return (
    <section
      className={`${styles.SalaryLayout} ${styles[device]}`}
      data-name="SalaryLayout"
    >
      <Header />
      <main className={`${styles.Content} `}>{children}</main>
      <Footer />
    </section>
  );
};

export default React.memo(SalaryLayout);
