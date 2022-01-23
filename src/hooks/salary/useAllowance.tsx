import React from "react";

export function useAllowance() {
  const [index, setIndex] = React.useState(0);
  const [allowance, setAllowance]: [any, any] = React.useState({});
  const [extraAllowance, setExtraAllowance]: [Array<any>, any] = React.useState(
    []
  );
  const [allowanceSum, setAllowanceSum] = React.useState(0);
  const [extraAllowanceSum, setExtraAllowanceSum] = React.useState(0);

  const defaultAllowanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllowance({
      ...allowance,
      [e.target.name]: e.target.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1"),
    });
  };

  const WorkerTypes = React.useMemo(
    () => [
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
    []
  );

  const ExtraAllowanceList = React.useMemo(
    () => [
      {
        key: "workTax",
        text: "근로소득세",
        isTaxFree: false,
      },
      {
        key: "etc",
        text: "기타 (직접입력)",
        isTaxFree: false,
      },
    ],
    []
  );

  React.useEffect(() => {
    const price = extraAllowance.reduce((acc, cur) => {
      return (acc += Number(cur.price));
    }, 0);
    setAllowanceSum(price);
    setExtraAllowanceSum(price);
  }, [extraAllowance]);

  const setUpExtraAllowance = (id: string) => {
    let parseId: string = id;
    if (id === "etc") {
      parseId += index;
      setIndex(index + 1);
    }

    const item = ExtraAllowanceList.find((item) => item.key === parseId);

    setExtraAllowance(
      [...extraAllowance].concat({
        key: parseId,
        title: item?.text,
        price: 0,
      })
    );
  };

  const removeExtraAllowance = (id: string) => {
    setExtraAllowance(extraAllowance.filter((item) => item.key !== id));
  };

  const renderList = ExtraAllowanceList.reduce(
    (acc: Array<{ [key: string]: any }>, cur) => {
      const isContain =
        extraAllowance.filter((item) => {
          return item.key === cur.key;
        }).length > 0;
      if (!isContain) acc.push(cur);
      return acc;
    },
    []
  );

  const onChangeExtraAllowance = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    const [parentKey, childKey] = name.split("_");

    if (/price/.test(name)) {
      value = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    }

    setExtraAllowance(
      extraAllowance.map((allowanceItem) => {
        return allowanceItem.key === parentKey
          ? {
              ...allowanceItem,
              [childKey]: value,
            }
          : allowanceItem;
      })
    );
  };

  return {
    allowance,
    setAllowance,
    allowanceSum,
    setAllowanceSum,
    WorkerTypes,
    defaultAllowanceChange,
    renderList,
    setUpExtraAllowance,
    removeExtraAllowance,
    extraAllowance,
    onChangeExtraAllowance,
  };
}
