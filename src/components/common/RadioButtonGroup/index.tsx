import React, { MouseEventHandler } from "react";
import styles from "src/assets/styles/components/common/RadioButtonGroup.module.scss";

type Props = {
  label?: string;
  checkedValue?: string;
  name: string;
  radioList: Array<Record<"id" | "value" | "title", string>>;
  onClick: MouseEventHandler;
};

const RadioButtonGroup: React.FC<Props> = (props) => {
  const { label, name, checkedValue, radioList, onClick } = props;
  return (
    <div className={styles.RadioButtonGroup} data-name="RadioButtonGroup">
      {label && <label>{label}</label>}
      <div className={styles.RadioButtonGroupForm}>
        {radioList.map(({ id, value, title }, idx) => {
          return (
            <React.Fragment key={idx}>
              <input type="radio" id={id} name={name} value={value} />
              <label
                htmlFor={id}
                id={value}
                onClick={onClick}
                className={`${styles["RadioButtonGroupForm--item"]} ${
                  checkedValue === value ? styles.checked : ""
                }`}
              >
                {title}
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(RadioButtonGroup);
