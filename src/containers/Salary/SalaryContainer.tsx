import React from "react";
import styles from "src/assets/styles/containers/salary/SalaryContainer.module.scss";
import Button from "src/components/common/Button";
import SalaryLayout from "src/components/layout/SalaryLayout";
import Router from "next/router";

type Props = {};

const SalaryContainer: React.FC<Props> = () => {
  const onClick = () => {
    Router.push({
      pathname: "/salary/[step]",
      query: { step: "1" },
    });
  };
  return (
    <SalaryLayout>
      <section className={`${styles.SalaryContainerBox}`}>
        <div className={styles.box}>
          <h2>
            급여 명세서 교부 의무화 미지급시 <br />
            <strong>최대 500만원</strong> 이하 과태료
          </h2>
          <Button onClick={onClick}>급여명세서 발급받기</Button>
        </div>
      </section>
    </SalaryLayout>
  );
};

export default React.memo(SalaryContainer);
