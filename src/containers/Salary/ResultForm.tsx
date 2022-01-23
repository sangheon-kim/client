import React from "react";
import styles from "src/assets/styles/containers/salary/ResultForm.module.scss";
import Button from "src/components/common/Button";

const obj = {
  form: {
    name: "김영빈",
    birth: "19981230",
    givenDate: "20221230",
    wageSystem: "hourlyWage",
    workerType: "fullTime",
  },
  allowance: {
    annuity: "10",
    employmentInsurance: "40000",
    healthyInsurance: "20000",
    industrialAccident: "100000",
  },
  allowanceSum: 223456,
  WorkerTypes: [
    {
      id: "workerType1",
      value: "fullTime",
      title: "4대보험",
    },
    {
      id: "workerType2",
      value: "etc",
      title: "3.3%",
    },
    {
      id: "workerType3",
      value: "none",
      title: "해당사항 없음",
    },
  ],
  renderList: [
    {
      key: "etc",
      text: "기타 (직접입력)",
      isTaxFree: false,
    },
  ],
  extraAllowance: [
    {
      key: "workTax",
      title: "근로소득세",
      price: "100000",
    },
    {
      key: "etc0",
      title: "기타",
      price: "123456",
    },
  ],
  defaultWage: {
    time: "10",
    price: "40000",
  },
  extraWage: [
    {
      key: "add",
      title: "연장근로",
      price: 112000,
      child: [
        {
          subTitle: "연장근로 시간",
          value: "10",
          key: "time",
          placeholder: "ex) 10",
        },
        {
          subTitle: "연장근로 시급",
          value: "11200",
          key: "price",
          placeholder: "ex) 11200",
        },
      ],
    },
    {
      key: "bonus",
      title: "상여금",
      price: "10000",
    },
  ],
  extraWageSum: 122000,
  defaultSum: 400000,
};

const ResultForm: React.FC<any> = () => {
  const { name, birth, givenDate } = obj.form;
  const {
    allowance,
    defaultSum,
    extraWageSum,
    allowanceSum: extraAllowanceSum,
    defaultWage,
    extraWage,
    extraAllowance,
  } = obj;
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
  return (
    <div className={styles.ResultForm}>
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
            {extraWage.map((item) => {
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
                  className={styles["ResultForm-content-allowance-list__item"]}
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
            {extraAllowance.map((item, idx) => {
              return (
                <li
                  className={styles["ResultForm-content-allowance-list__item"]}
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
      <Button>다운로드</Button>
    </div>
  );
};

export default ResultForm;
