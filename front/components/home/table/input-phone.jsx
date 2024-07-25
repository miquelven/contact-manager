import { useState, useEffect } from "react";
import { Input } from "../../ui/input";

export default function InputPhoneNumber({ value, onChange, ...rest }) {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleInput = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    if (e.target.value.length == 10) {
      setInputValue(e.target.value);
      onChange(e.target.value);
    } else {
      setInputValue(formattedPhoneNumber);
      onChange(formattedPhoneNumber);
    }
  };

  return (
    <Input
      {...rest}
      onChange={handleInput}
      value={inputValue}
      placeholder="(xx) xxxxx-xxxx"
    />
  );
}

function formatPhoneNumber(value) {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 3) return `(${phoneNumber}`;
  if (phoneNumberLength < 7)
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
  if (phoneNumberLength <= 10)
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
      2,
      7
    )}-${phoneNumber.slice(7)}`;

  return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
    2,
    7
  )}-${phoneNumber.slice(7, 11)}`;
}
