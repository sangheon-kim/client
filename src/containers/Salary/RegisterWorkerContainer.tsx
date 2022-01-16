import React from "react";
import styles from "src/assets/styles/containers/salary/RegisterWorkerContainer.module.scss";
import SalaryLayout from "src/components/layout/SalaryLayout";
import { useExtraWage } from "src/hooks/salary/useExtraWage";
import { useDefaultWage } from "src/hooks/salary/useDefaultWage";
import StepOneContainer from "./StepOneContainer";
import StepTwoContainer from "./StepTwoContainer";

type Props = {
  step: number;
};

const RegisterWorkerContainer: React.FC<Props> = ({ step }) => {
  const [initRef, _] = React.useState({
    name: React.createRef<HTMLInputElement>(),
    birth: React.createRef<HTMLInputElement>(),
    givenDate: React.createRef<HTMLInputElement>(),
  });

  const [form, setForm]: [RegisterForm, any] = React.useState({
    name: "",
    birth: "",
    givenDate: "",
    wageSystem: "hourlyWage",
  });

  const [isDropdown, setDropdown] = React.useState(false);

  // 기본급 hooks
  const {
    defaultWage,
    defaultSum,
    defaultWageOnchange,
    priceLabel,
    timeLabel,
    defaultWageRefs,
  } = useDefaultWage(form.wageSystem);

  // 추가급 hooks
  const {
    renderList,
    extraWage,
    setUpExtraWage,
    extraWageSum,
    removeExtraWage,
    onChangeSubExtraWage,
    onChangeExtraWage,
  } = useExtraWage();

  const [sum, setSum] = React.useState(0);

  const onClickDropdown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { id } = e.currentTarget;
    setUpExtraWage(id);
    setDropdown(false);
  };

  React.useEffect(() => {}, [defaultWage]);

  const wageSystems = React.useMemo(
    () => [
      {
        id: "wageSystem1",
        value: "hourlyWage",
        title: "시급",
      },
      {
        id: "wageSystem2",
        value: "dailyWage",
        title: "일급",
      },
      {
        id: "wageSystem3",
        value: "monthlyWage",
        title: "월급",
      },
    ],
    []
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOneContainer
            form={form}
            setForm={setForm}
            initRef={initRef}
            wageSystems={wageSystems}
          />
        );
      case 2:
        return (
          <StepTwoContainer
            form={form}
            defaultWage={defaultWage}
            defaultWageRefs={defaultWageRefs}
            defaultWageOnchange={defaultWageOnchange}
            defaultSum={defaultSum}
            priceLabel={priceLabel}
            timeLabel={timeLabel}
            ExtraWageList={renderList}
            onClickDropdown={onClickDropdown}
            setDropdown={setDropdown}
            isDropdown={isDropdown}
            extraWage={extraWage}
            extraWageSum={extraWageSum}
            removeExtraWage={removeExtraWage}
            onChangeSubExtraWage={onChangeSubExtraWage}
            onChangeExtraWage={onChangeExtraWage}
          />
        );
    }
  };

  return (
    <SalaryLayout>
      <section className={`${styles.RegisterWorkerContainerBox}`}>
        {renderStep()}
      </section>
    </SalaryLayout>
  );
};

export default React.memo(RegisterWorkerContainer);
