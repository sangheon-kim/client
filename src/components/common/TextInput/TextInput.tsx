import React, { ChangeEventHandler } from "react";
import styles from "src/assets/styles/components/common/TextInput.module.scss";

type Props = {
  type?: string;
  label?: string;
  onChange?: ChangeEventHandler;
  value?: string;
  name: string;
  placeholder?: string;
  readOnly?: boolean;
  autoComplete?: string;
};

const TextInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    label,
    value,
    onChange,
    name,
    placeholder,
    readOnly,
    type,
    autoComplete,
  } = props;

  return (
    <div className={styles.TextInput} data-name="TextInput">
      {label && <label>{label}</label>}
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        autoComplete={autoComplete}
        ref={ref}
      />
    </div>
  );
});

export default React.memo(TextInput);

TextInput.displayName = "TextInput";
