import React from "react";
import styles from "src/assets/styles/components/common/Dropdown.module.scss";

interface ListItem {
  text: string;
  key: string;
  [key: string]: any;
}

type Props = {
  list: Array<ListItem>;
  onClick: React.MouseEventHandler;
};

const Dropdown: React.FC<Props> = (props) => {
  const { list, onClick } = props;

  return (
    <div className={styles["Dropdown"]}>
      <ul className={styles["Dropdown__list"]}>
        {list.map(({ key, text }) => {
          return (
            <li
              className={styles["Dropdown__list--item"]}
              key={key}
              onClick={onClick}
              id={key}
            >
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(Dropdown);
