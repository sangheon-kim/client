import React from "react";
import styles from "src/assets/styles/components/common/Button.module.scss";

type Props = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({ children, onClick, disabled }) => {
  return (
    <button
      className={styles.Button}
      data-name="Button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
