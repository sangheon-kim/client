/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "src/assets/styles/containers/salary/StepOneContainer.module.scss";
import Button from "src/components/common/Button";
import RadioButtonGroup from "src/components/common/RadioButtonGroup";
import TextInput from "src/components/common/TextInput/TextInput";
import Router from "next/router";

type Props = {
  form: RegisterForm;
  setForm: React.Dispatch<React.SetStateAction<RegisterForm>>;
  wageSystems: Array<Record<"id" | "value" | "title", string>>;
  [key: string]: any;
};

const StepOneContainer: React.FC<Props> = (props) => {
  const { form, setForm, wageSystems, initRef } = props;
  const [validate, setValidate] = React.useState(false);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (name === "birth" || name === "givenDate") {
        if (value.length <= 8) {
          e.target.value = value
            .replace(/[^0-9.]/g, "")
            .replace(/(\..*)\./g, "$1");
        } else {
          e.target.value = e.target.value.slice(0, 8);
        }
      }

      setValidate(
        initRef.name.current.value.length > 0 &&
          initRef.birth.current.value.length === 8 &&
          initRef.givenDate.current.value.length === 8
      );
    },
    []
  );

  const onClickRadio = React.useCallback(
    (e: any) => {
      const { id } = e.target;

      setForm({
        ...form,
        wageSystem: id,
      });
    },
    [form, setForm]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setForm({
      ...form,
      name: initRef.name.current.value,
      birth: initRef.birth.current.value,
      givenDate: initRef.givenDate.current.value,
    });

    Router.push({
      pathname: "/salary/[step]",
      query: { step: "2" },
    });
  };

  React.useEffect(() => {
    const { name, birth, givenDate } = form;

    // 뒤로 가기 차단
    initRef.name.current.value = name;
    initRef.birth.current.value = birth;
    initRef.givenDate.current.value = givenDate;

    setValidate(
      initRef.name.current.value.length > 0 &&
        initRef.birth.current.value.length === 8 &&
        initRef.givenDate.current.value.length === 8
    );
  }, [initRef.birth, initRef.givenDate, initRef.name]);

  const { wageSystem } = form;

  return (
    <React.Fragment>
      <h6 className={styles.StepOneTitle}>기본 입력</h6>
      <form className={styles.RegisterWorkerForm} onSubmit={onSubmit}>
        <TextInput
          name="name"
          label="이름"
          placeholder="이름을 입력해주세요"
          ref={initRef.name}
          onChange={onChange}
        />
        <TextInput
          name="birth"
          ref={initRef.birth}
          onChange={onChange}
          label="생년월일"
          placeholder="예) 19981230"
        />
        <TextInput
          name="givenDate"
          ref={initRef.givenDate}
          onChange={onChange}
          label="급여지급일"
          placeholder="예) 20221230"
        />
        <RadioButtonGroup
          label="급여 제도"
          radioList={wageSystems}
          name={"wageSystem"}
          checkedValue={wageSystem}
          onClick={onClickRadio}
        />
        <Button disabled={!validate}>다음</Button>
      </form>
    </React.Fragment>
  );
};

export default React.memo(StepOneContainer);
