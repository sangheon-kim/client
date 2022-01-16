import React from "react";

// * 기본급 hooks
export function useDefaultWage(wageSystem: WageSystem) {
  const [defaultSum, setDefaultSum] = React.useState(0);
  const [defaultWageRefs, _] = React.useState({
    timeRef: React.createRef<HTMLInputElement>(),
    priceRef: React.createRef<HTMLInputElement>(),
    defaultSumRef: React.createRef<HTMLParagraphElement>(),
  });
  const { timeRef, priceRef } = defaultWageRefs;

  const [defaultWage, setDefaultWage] = React.useState({
    time: undefined,
    price: undefined,
  });

  /** 기본급 객체 변환시 총액 계산 처리 */
  React.useEffect(() => {
    const price = defaultWage.price || 0;
    const time = defaultWage.time || 0;

    if (wageSystem === "monthlyWage") {
      setDefaultSum(price);
    } else {
      setDefaultSum(price * time);
    }
  }, [defaultWage, wageSystem]);

  /** 기본급 onChangeEventHandler */
  const defaultWageOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    e.target.value = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

    setDefaultWage({
      ...defaultWage,
      [name]: value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"),
    });
  };

  /** 금액 labelText */
  const priceLabel = React.useMemo(
    () =>
      ((wageSystem) => {
        switch (wageSystem) {
          case "hourlyWage":
            return "시급";
          case "dailyWage":
            return "일급";
          case "monthlyWage":
            return "월급";
        }
      })(wageSystem),
    [wageSystem]
  );
  /** 시간 LabelText */
  const timeLabel = React.useMemo(
    () =>
      ((wageSystem) =>
        wageSystem === "hourlyWage" ? "근로 시간" : "근로 일수")(wageSystem),
    [wageSystem]
  );

  return {
    defaultWageRefs,
    defaultSum,
    defaultWage,
    defaultWageOnchange,
    priceLabel,
    timeLabel,
  };
}
