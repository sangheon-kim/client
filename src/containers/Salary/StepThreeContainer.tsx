/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "src/assets/styles/containers/salary/StepThreeContainer.module.scss";
import Router from "next/router";
import RadioButtonGroup from "src/components/common/RadioButtonGroup";
import Button from "src/components/common/Button";
import TextInput from "src/components/common/TextInput/TextInput";
import { CgMathPlus } from "react-icons/cg";
import Dropdown from "src/components/common/Dropdown/Dropdown";
import { BsTrash } from "react-icons/bs";

type Props = {
  form: RegisterForm;
  setForm: React.Dispatch<React.SetStateAction<RegisterForm>>;
  [key: string]: any;
};

const StepThreeContainer: React.FC<Props> = (props) => {
  const { form, setForm, ...rest } = props;
  const { name, birth, workerType } = form;
  const {
    WorkerTypes,
    allowance,
    defaultAllowanceChange,
    isDropdown,
    setDropdown,
    allowanceSum,
    renderList,
    onClickAllowanceDropdown,
    extraAllowance,
    removeExtraAllowance,
    onChangeExtraAllowance,
    defaultSum,
    setAllowance,
    extraWage,
  } = rest;

  const extraWageFilter = extraWage.reduce(
    (acc: number, cur: { [key: string]: any }) => {
      if (cur.key !== "meals") {
        acc += Number(cur.price);
      }
      return acc;
    },
    0
  );

  const {
    annuity,
    employmentInsurance,
    healthyInsurance,
    industrialAccident,
    threePremium,
  } = allowance;

  React.useEffect(() => {
    if (!name || !birth) {
      Router.push({
        pathname: "/salary/[step]",
        query: { step: "1" },
      });
    }

    // 3.3% 자동 계산
    if (workerType === "etc") {
      setAllowance({
        ...allowance,
        threePremium: Math.floor((extraWageFilter + defaultSum) * 0.033),
      });
    }

    // console.log(();
  }, [workerType]);

  const onClickRadio = React.useCallback(
    (e: any) => {
      const { id } = e.target;

      setForm({
        ...form,
        workerType: id,
      });
    },
    [form]
  );

  const onSubmit = () => {
    Router.push({
      pathname: "/salary/[step]",
      query: { step: "4" },
    });
  };

  return (
    <div className={styles.StepThreeContainer}>
      <div className={styles["StepThreeContainer--UserInfo"]}>
        <p>{name || ""}</p>
        <p>{birth || ""}</p>
      </div>
      <RadioButtonGroup
        label="기본 공제"
        radioList={WorkerTypes}
        name={"wageSystem"}
        checkedValue={workerType}
        onClick={onClickRadio}
      />
      <div className={styles.DefaultAllowance}>
        {workerType === "fullTime" ? (
          <div>
            <a
              className={styles.DefaultAllowance__caption}
              href="https://www.nps.or.kr/jsppage/business/insure_cal.jsp"
              target="_blank"
              rel="noreferrer"
            >
              계산법 참고하기
            </a>
            <TextInput
              label={"연금보험료"}
              value={annuity}
              name="annuity"
              onChange={defaultAllowanceChange}
              autoComplete="off"
              placeholder={"연금보험료 입력"}
            />
            <TextInput
              label={"고용보험료"}
              value={employmentInsurance}
              name="employmentInsurance"
              onChange={defaultAllowanceChange}
              autoComplete="off"
              placeholder={"연금보험료 입력"}
            />
            <TextInput
              label={"국민건강보험료"}
              value={healthyInsurance}
              name="healthyInsurance"
              onChange={defaultAllowanceChange}
              autoComplete="off"
              placeholder={"국민건강보험료 입력"}
            />
            <TextInput
              label={"산재보험료"}
              value={industrialAccident}
              name="industrialAccident"
              onChange={defaultAllowanceChange}
              autoComplete="off"
              placeholder={"산재보험료 입력"}
            />
          </div>
        ) : workerType === "etc" ? (
          <div>
            <TextInput
              label={"3.3% 공제"}
              value={threePremium}
              name="threePremium"
              onChange={defaultAllowanceChange}
              autoComplete="off"
              placeholder={"3.3% 공제 입력"}
            />
          </div>
        ) : null}
      </div>
      <div className={styles.ExtraAllowance}>
        <div className={styles["ExtraAllowance__header"]}>
          <h3 className={styles["ExtraAllowance__header--title"]}>추가 공제</h3>
          <button
            className={styles["ExtraAllowance__header--button"]}
            onClick={() => setDropdown(!isDropdown)}
          >
            <CgMathPlus />
            {isDropdown && (
              <Dropdown list={renderList} onClick={onClickAllowanceDropdown} />
            )}
          </button>
          <p className={styles["ExtraAllowance__header--value"]}>
            ₩ {allowanceSum.toLocaleString("ko-KR")}
          </p>
        </div>
        {extraAllowance.map((item: any) => {
          const { title, price, key } = item;

          return key.indexOf("etc") > -1 ? (
            <div className={`${styles["ExtraAllowance__content--header"]}`}>
              <React.Fragment>
                <input
                  className={styles["ExtraAllowance__content--header--title"]}
                  type="text"
                  value={title}
                  name={`${key}_title`}
                  onChange={onChangeExtraAllowance}
                />
                <BsTrash onClick={() => removeExtraAllowance(key)} />
              </React.Fragment>
              <input
                className={styles["ExtraAllowance__content--header--price"]}
                name={`${key}_price`}
                type="text"
                value={price}
                onChange={onChangeExtraAllowance}
              />
            </div>
          ) : (
            <div className={`${styles["ExtraAllowance__content--header"]}`}>
              <h5 className={styles["ExtraAllowance__content--header--title"]}>
                {title}{" "}
                {key === "workTax" && (
                  <a
                    href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6594&cntntsId=7873"
                    className={styles.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    참고
                  </a>
                )}
                <BsTrash onClick={() => removeExtraAllowance(key)} />
              </h5>
              <input
                className={styles["ExtraAllowance__content--header--price"]}
                type="text"
                value={price}
                name={`${key}_price`}
                onChange={onChangeExtraAllowance}
              />
            </div>
          );
        })}
      </div>
      <Button onClick={onSubmit}>다음</Button>
    </div>
  );
};

export default React.memo(StepThreeContainer);
