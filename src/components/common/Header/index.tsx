import React from "react";
import Image from "next/image";
import styles from "src/assets/styles/components/common/Header.module.scss";
import ThemeChangeButton from "src/components/common/ThemeChangeButton";

type Props = {};

const Header: React.FC<Props> = () => {
  React.useEffect(() => {}, []);
  return (
    <header className={styles.Header} data-name="Header">
      <img src={"/images/logo.png"} alt="logo" width={50} height={50} />
      <ThemeChangeButton />
      {/* Header */}
    </header>
  );
};

export default React.memo(Header);
