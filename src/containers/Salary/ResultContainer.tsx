/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "src/assets/styles/containers/salary/ResultContainer.module.scss";
import Router from "next/router";
import Button from "src/components/common/Button";
``;

type Props = {
  form: RegisterForm;
  [key: string]: any;
};

const ResultContainer: React.FC<Props> = (props) => {
  const { form, ...rest } = props;

  React.useEffect(() => {
    if (!name || !birth) {
      Router.push({
        pathname: "/salary/[step]",
        query: { step: "1" },
      });
    }
  }, []);

  const onClick = () => {
    Router.push({
      pathname: "/salary/[step]",
      query: { step: "5" },
    });
  };

  const { name, birth } = form;

  return (
    <div className={styles.ResultContainer}>
      <div className={styles["ResultContainer-content"]}>
        <h2>
          임금명세서가 <br />
          완성되었습니다
        </h2>
      </div>
      <div className={styles.ButtonGroup}>
        <Button onClick={onClick}>다운로드 하러가기</Button>
        {/* <Button>KAKAO 발송하기</Button>
        <Button>Email 발송하기</Button> */}
      </div>
    </div>
  );
};

export default React.memo(ResultContainer);
