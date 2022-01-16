import React from "react";
import styles from "src/assets/styles/components/calculator/Calculator.module.scss";
import {
  CgMathDivide,
  CgMathEqual,
  CgMathMinus,
  CgMathPercent,
  CgMathPlus,
  CgClose,
} from "react-icons/cg";

type Props = {};

const Calculator: React.FC<Props> = () => {
  const [value, setValue] = React.useState(0);

  return (
    <div className={styles.Calculator}>
      <div className={styles["Calculator__header"]}>
        <button className={styles.close}></button>
        <button className={styles.minus}></button>
        <button className={styles.plus}></button>
      </div>
      <div className={styles["Calculator__result"]}>{value}</div>
      <div className={styles["Calculator__buttonWrapper"]}>
        <div className={styles["Calculator__buttonWrapper--group"]}>
          <button>C</button>
          <button>-1</button>
          <button>%</button>
          <button>
            <CgMathDivide />
          </button>
        </div>
        <div className={styles["Calculator__buttonWrapper--group"]}>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>
            <CgClose />
          </button>
        </div>
        <div className={styles["Calculator__buttonWrapper--group"]}>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>
            <CgMathMinus />
          </button>
        </div>
        <div className={styles["Calculator__buttonWrapper--group"]}>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>
            <CgMathPlus />
          </button>
        </div>
        <div className={styles["Calculator__buttonWrapper--group"]}>
          <button className={styles.zero}>0</button>
          <button>.</button>
          <button>
            <CgMathEqual />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Calculator);
