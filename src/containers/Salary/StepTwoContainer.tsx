/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "src/assets/styles/containers/salary/StepTwoContainer.module.scss";
import Button from "src/components/common/Button";
import TextInput from "src/components/common/TextInput/TextInput";
import { CgMathPlus } from "react-icons/cg";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import Dropdown from "src/components/common/Dropdown/Dropdown";
import { BsTrash } from "react-icons/bs";
import Router from "next/router";

type Props = {
  form: RegisterForm;
  defaultWage: { [key: string]: any };
  defaultWageOnchange: React.ChangeEventHandler;
  defaultSum: number;
  priceLabel: string;
  timeLabel: string;
  ExtraWageList: any;
  [key: string]: any;
};

let isOnce = false;

const StepTwoContainer: React.FC<Props> = (props) => {
  const {
    form,
    defaultWage,
    defaultWageOnchange,
    defaultSum,
    priceLabel,
    timeLabel,
    ExtraWageList,
    ...rest
  } = props;
  const {
    isDropdown,
    onClickDropdown,
    setDropdown,
    extraWage,
    extraWageSum,
    defaultWageRefs,
    removeExtraWage,
    onChangeSubExtraWage,
    onChangeExtraWage,
  } = rest;

  const { timeRef, priceRef, defaultSumRef } = defaultWageRefs;
  const [isDefaultWageFold, setDefaultWageFold] = React.useState(false);

  const { name, birth, wageSystem } = form;
  const { price, time } = defaultWage;

  React.useEffect(() => {
    if (Object.keys(extraWage).length > 0) {
      if (!isOnce) {
        isOnce = true;
        setDefaultWageFold(true);
      }
    }
  }, [extraWage]);

  React.useEffect(() => {
    const { name, birth } = form;

    if (!name || !birth) {
      Router.push({
        pathname: "/salary/[step]",
        query: { step: "1" },
      });
    }
  }, []);

  return (
    <div className={styles.StepTwoContainer}>
      <div className={styles["StepTwoContainer--UserInfo"]}>
        <p>{name || "김상헌"}</p>
        <p>{birth || "19950906"}</p>
      </div>
      <div className={styles.DefaultWage}>
        <div className={styles["DefaultWage__header"]}>
          <h3 className={styles["DefaultWage__header--title"]}>
            기본 지급
            <button onClick={() => setDefaultWageFold(!isDefaultWageFold)}>
              {isDefaultWageFold ? <AiOutlineDown /> : <AiOutlineUp />}
            </button>
          </h3>
          {
            <p className={styles["DefaultWage__header--value"]}>
              ₩ {defaultSum.toLocaleString("ko-KR")}
            </p>
          }
        </div>
        {!isDefaultWageFold && (
          <div className={`${styles["DefaultWage__content"]}`}>
            {wageSystem !== "monthlyWage" && (
              <TextInput
                label={timeLabel}
                value={time}
                name="time"
                onChange={defaultWageOnchange}
                autoComplete="off"
                placeholder={"예) 10"}
              />
            )}
            <TextInput
              label={priceLabel}
              value={price}
              name="price"
              onChange={defaultWageOnchange}
              autoComplete="off"
              placeholder={"금액을 입력해주세요"}
            />
          </div>
        )}
      </div>
      <div className={styles.ExtraWage}>
        <div className={styles["ExtraWage__header"]}>
          <h3 className={styles["ExtraWage__header--title"]}>추가 지급</h3>
          <button
            className={styles["ExtraWage__header--button"]}
            onClick={() => setDropdown(!isDropdown)}
          >
            <CgMathPlus />
            {isDropdown && (
              <Dropdown list={ExtraWageList} onClick={onClickDropdown} />
            )}
          </button>
          <p className={styles["ExtraWage__header--value"]}>
            ₩ {extraWageSum.toLocaleString("ko-KR")}
          </p>
        </div>
        <div className={`${styles["ExtraWage__content"]}`}>
          {extraWage.map((item: any) => {
            const { title, price, child, key: parentKey } = item;

            return (
              <React.Fragment key={parentKey}>
                {parentKey.indexOf("etc") < 0 ? (
                  !!child ? (
                    // 야간 수당, 휴일, 연장 근로 수당
                    <React.Fragment>
                      <div
                        className={`${styles["ExtraWage__content--header"]}`}
                      >
                        <h5
                          className={
                            styles["ExtraWage__content--header--title"]
                          }
                        >
                          {title}
                          <BsTrash onClick={() => removeExtraWage(parentKey)} />
                        </h5>
                        <input
                          className={
                            styles["ExtraWage__content--header--price"]
                          }
                          type="text"
                          value={price.toLocaleString("ko-KR")}
                          readOnly
                        />
                      </div>
                      {child.map(
                        (
                          { subTitle, value, key, placeholder }: any,
                          idx: number
                        ) => {
                          return (
                            <TextInput
                              label={subTitle}
                              value={value}
                              name={`${parentKey}_${key}`}
                              autoComplete="off"
                              key={idx}
                              placeholder={placeholder}
                              onChange={onChangeSubExtraWage}
                            />
                          );
                        }
                      )}
                    </React.Fragment>
                  ) : (
                    // 상여금, 식대 등
                    <div className={`${styles["ExtraWage__content--header"]}`}>
                      <h5
                        className={styles["ExtraWage__content--header--title"]}
                      >
                        {title}
                        <BsTrash onClick={() => removeExtraWage(parentKey)} />
                      </h5>
                      <input
                        className={styles["ExtraWage__content--header--price"]}
                        type="text"
                        value={price}
                        name={`${parentKey}_price`}
                        onChange={onChangeExtraWage}
                      />
                    </div>
                  )
                ) : (
                  // 기타 (직접 입력)
                  <div className={`${styles["ExtraWage__content--header"]}`}>
                    <React.Fragment>
                      <input
                        className={styles["ExtraWage__content--header--title"]}
                        type="text"
                        value={title}
                        name={`${parentKey}_title`}
                        onChange={onChangeExtraWage}
                      />
                      <BsTrash onClick={() => removeExtraWage(parentKey)} />
                    </React.Fragment>
                    <input
                      className={styles["ExtraWage__content--header--price"]}
                      name={`${parentKey}_price`}
                      type="text"
                      value={price}
                      onChange={onChangeExtraWage}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <Button>다음</Button>
    </div>
  );
};

export default React.memo(StepTwoContainer);
