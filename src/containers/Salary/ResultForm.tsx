import React from "react";
import styles from "src/assets/styles/containers/salary/ResultForm.module.scss";
import Button from "src/components/common/Button";
import html2canvas from "html2canvas";

const ResultForm: React.FC<any> = (props) => {
  console.log({ props });
  const { name, birth, givenDate } = props.form;
  const {
    allowance,
    defaultSum,
    extraWageSum,
    allowanceSum: extraAllowanceSum,
    defaultWage,
    extraWage,
    extraAllowance,
  } = props;
  const defaultAllowance = Object.keys(allowance).reduce((acc, cur) => {
    acc += Number((allowance as any)[cur]);
    return acc;
  }, 0);

  // 최종 급여 = (기본급 + 추가지급) - (추가 공제 + 기본 공제항목)
  const FinalPrice =
    defaultSum + extraWageSum - (extraAllowanceSum + defaultAllowance);

  // 지급액 총계
  const wageSum = defaultSum + extraWageSum;
  // 기본급
  const basic = defaultSum;
  // 기본급 설명
  const defaultWageCaption = `${defaultWage.price} * ${defaultWage.time}`;

  const DEFAULT_ALLOWANCE: { [key: string]: any } = {
    annuity: "연금보험료",
    employmentInsurance: "고용보험료",
    healthyInsurance: "국민건강보험료",
    industrialAccident: "산재보험료",
    threePremium: "3.3% 공제",
  };

  const childKeyList = ["add", "night", "holiday"];

  const allowanceSum = extraAllowanceSum + defaultAllowance;

  console.log(extraWage);

  console.log({
    FinalPrice,
    name,
    birth,
    defaultAllowance,
    givenDate,
  });

  React.useEffect(() => {}, []);

  const saveAs = (uri: string, filename: string) => {
    const link = document.createElement("a");
    if (typeof link.download === "string") {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    html2canvas(
      document.querySelector("#ResultForm") || document.createElement("div")
    ).then((canvas) => {
      saveAs(canvas.toDataURL("image/png"), "salary.png");
    });
  };

  return (
    <React.Fragment>
      <div
        className={styles.ResultForm}
        id="ResultForm"
        style={{ padding: "0 8px" }}
      >
        <h5>
          <strong>{name}</strong> <em>( {birth.slice(2)} )</em>님의 급여명세서
        </h5>
        <div className={styles["ResultForm-header"]}>
          <div className={styles["ResultForm-header-info"]}>
            <p className={styles["ResultForm-header-info__givenDate"]}>
              <strong>급여 지급일</strong> {givenDate}
            </p>
          </div>
          <div className={styles["ResultForm-header-sum"]}>
            <p className="ResultForm-header-sum__title">{"실수령액"}</p>
            <p className="ResultForm-header-sum__price">
              {(Number(FinalPrice) || 0).toLocaleString("ko-KR") + "원"}
            </p>
          </div>
        </div>
        <div className={styles["ResultForm-content"]}>
          <div className={styles["ResultForm-content-wage"]}>
            <div className={styles["ResultForm-content-wage-header"]}>
              <div>
                <button></button>
                <p className={styles["ResultForm-content-wage-header__title"]}>
                  {"지급액"}
                </p>
              </div>
              <p className={styles["ResultForm-content-wage-header__price"]}>
                {(Number(wageSum) || 0).toLocaleString("ko-KR") + "원"}
              </p>
            </div>
            <ul className={styles["ResultForm-content-wage-list"]}>
              <li className={styles["ResultForm-content-wage-list__item"]}>
                <p className={styles["list-item__title"]}>{"기본급"}</p>
                <p className={styles["list-item__caption"]}>
                  {defaultWageCaption}
                </p>
                <p className={styles["list-item__price"]}>
                  {(Number(basic) || 0).toLocaleString("ko-KR") + "원"}
                </p>
              </li>
              {extraWage.map((item: any) => {
                const { child, title, price } = item;

                return (
                  <li
                    className={styles["ResultForm-content-wage-list__item"]}
                    key={item.key}
                  >
                    <p className={styles["list-item__title"]}>{title}</p>
                    {child && (
                      <p className={styles["list-item__caption"]}>
                        {`${Number(child[1].value).toLocaleString(
                          "ko-KR"
                        )} * ${Number(child[0].value).toLocaleString("ko-KR")}`}
                      </p>
                    )}
                    <p className={styles["list-item__price"]}>
                      {Number(price).toLocaleString("ko-KR") + "원"}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles["ResultForm-content-allowance"]}>
            <div className={styles["ResultForm-content-allowance-header"]}>
              <div>
                <button></button>
                <p className={styles["ResultForm-content-wage-header__title"]}>
                  {"공제액"}
                </p>
              </div>
              <p className={styles["ResultForm-content-wage-header__price"]}>
                {Number(allowanceSum).toLocaleString("ko-KR") + "원"}
              </p>
            </div>
            <ul className={styles["ResultForm-content-allowance-list"]}>
              {Object.keys(allowance).map((item, idx) => {
                return (
                  <li
                    className={
                      styles["ResultForm-content-allowance-list__item"]
                    }
                    key={idx}
                  >
                    <p className={styles["list-item__title"]}>
                      {DEFAULT_ALLOWANCE[item]}
                    </p>
                    <p className={styles["list-item__price"]}>
                      {Number((allowance as any)[item] || 0).toLocaleString(
                        "ko-KR"
                      ) + "원"}
                    </p>
                  </li>
                );
              })}
              {extraAllowance.map((item: any, idx: any) => {
                return (
                  <li
                    className={
                      styles["ResultForm-content-allowance-list__item"]
                    }
                    key={idx}
                  >
                    <p className={styles["list-item__title"]}>{item.title}</p>
                    <p className={styles["list-item__price"]}>
                      {Number(item.price).toLocaleString("ko-KR") + "원"}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Button onClick={onClick}>다운로드</Button>
    </React.Fragment>
  );
};

export default ResultForm;
