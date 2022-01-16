import React from "react";
import styles from "src/assets/styles/components/common/ThemeChangeButton.module.scss";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "src/hooks/useTheme";

type Props = {};

const ThemeChangeButton: React.FC<Props> = () => {
  const { isDark, ThemeChange } = useTheme();

  return (
    <button className={styles.ThemeChangeButton} onClick={ThemeChange}>
      {isDark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
    </button>
  );
};

export default React.memo(ThemeChangeButton);
