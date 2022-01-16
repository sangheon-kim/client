import React from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";

export function useExtraWage() {
  const [index, setIndex] = React.useState(0);
  const [extraWage, setExtraWage]: [Array<any>, any] = React.useState([]);
  const [extraWageSum, setExtraWageSum] = React.useState(0);
  const ExtraWageList = [
    {
      key: "add",
      text: "연장근로",
      isTaxFree: false,
    },
    {
      key: "night",
      text: "야간근로",
      isTaxFree: false,
    },
    {
      key: "holiday",
      text: "휴일근로",
      isTaxFree: false,
    },
    {
      key: "bonus",
      text: "상여금",
      isTaxFree: false,
    },
    {
      key: "meals",
      text: "식대",
      isTaxFree: true,
    },
    {
      key: "etc",
      text: "기타 (직접입력)",
      isTaxFree: false,
    },
  ];

  React.useEffect(() => {
    const price = extraWage.reduce((acc, cur) => {
      return (acc += Number(cur.price));
    }, 0);

    setExtraWageSum(price);
  }, [extraWage]);

  const renderList = ExtraWageList.reduce(
    (acc: Array<{ [key: string]: any }>, cur) => {
      const isContain =
        extraWage.filter((item) => {
          return item.key === cur.key;
        }).length > 0;
      if (!isContain) acc.push(cur);
      return acc;
    },
    []
  );

  // const renderList = ExtraWageList.reduce(
  //   (acc: { [key: string]: any }, cur) => {
  //     console.log({
  //       cur,
  //       extraWage,
  //     });
  //     const isContain =
  //       extraWage.filter((item) => item.id !== cur.key).length === 0;
  //     if (!isContain || cur.key === "etc") acc.push(cur);

  //     return acc;
  //   },
  //   []
  // );

  const setUpExtraWage = (id: string) => {
    let parseId: string = id;
    if (id === "etc") {
      parseId += index;
      setIndex(index + 1);
    }
    const item = ExtraWageList.find((item) => item.key === parseId);
    const childKeyList = ["add", "night", "holiday"];

    setExtraWage(
      [...extraWage].concat({
        key: parseId,
        title: item?.text,
        price: 0,
        ...(childKeyList.indexOf(parseId) > -1 && {
          child: [
            {
              subTitle: item?.text + " 시간",
              value: undefined,
              key: "time",
              placeholder: "ex) 10",
            },
            {
              subTitle: item?.text + " 시급",
              value: undefined,
              key: "price",
              placeholder: "ex) 11200",
            },
          ],
        }),
      })
    );
  };

  const removeExtraWage = (id: string) => {
    setExtraWage(extraWage.filter((item) => item.key !== id));
  };

  const onChangeSubExtraWage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const [parentKey, childKey] = name.split("_");

    setExtraWage(
      extraWage.map((item) => {
        return item.key === parentKey
          ? {
              ...item,
              price:
                childKey === "time"
                  ? item.child[
                      item.child.findIndex((item: any) => item.key === "price")
                    ].value * Number(value) || 0
                  : item.child[
                      item.child.findIndex((item: any) => item.key === "time")
                    ].value * Number(value) || 0,
              child: item.child.map((subItem: any) => {
                return subItem.key === childKey
                  ? {
                      ...subItem,
                      value,
                    }
                  : subItem;
              }),
            }
          : item;
      })
    );
  };

  const onChangeExtraWage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [parentKey, childKey] = name.split("_");
    // console.log({
    //   name,
    //   value,
    // });
    setExtraWage(
      extraWage.map((wageItem) => {
        return wageItem.key === parentKey
          ? {
              ...wageItem,
              [childKey]: value,
            }
          : wageItem;
      })
    );

    // console.log({
    //   name,
    //   value,
    // });
  };

  return {
    renderList,
    extraWage,
    setUpExtraWage,
    extraWageSum,
    removeExtraWage,
    onChangeSubExtraWage,
    onChangeExtraWage,
  };
}
