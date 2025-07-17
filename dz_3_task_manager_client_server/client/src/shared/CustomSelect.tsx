import { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  optionClassName?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  label,
  className = "",
  optionClassName = "",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className={`${styles.selectWrapper} ${className}`} ref={ref}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={`${styles.selected} ${open ? styles.selectedOpen : ""}`}
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen((o) => !o);
        }}
      >
        {selected ? selected.label : "-"}
        {open ? (
          <KeyboardArrowUpIcon className={styles.arrow} fontSize="small" />
        ) : (
          <KeyboardArrowDownIcon className={styles.arrow} fontSize="small" />
        )}
      </div>
        <ul className={`${styles.optionsList} ${open ? styles.optionsListOpen : ""}`}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${optionClassName} ${option.value === value ? styles.selectedOption : ""}`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
    </div>
  );
} 