import React from "react";
import styles from "src/assets/styles/components/common/Footer.module.scss";

type Props = {};

const Footer = () => {
  return (
    <footer className={styles.Footer} data-name="Footer">
      문의 : mangbin98@gmail.com
    </footer>
  );
};

export default React.memo(Footer);
