/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styles from './styles.module.scss';

const Dropdown = ({ options, value, onChange, multi = false }) => {
  const [open, setOpen] = useState(false);

  const onSelect = (v) => {
    onChange(v);
    if (!multi) setOpen(!open);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.main} onClick={() => setOpen(!open)}>
          <div className={styles.valueWrapper}>{multi ? 'Select from Dropdown' : value}</div>
          <img src="/images/dressed/arrow-down.png" alt="" />
        </div>
        {open && (
          <div className={styles.dropdown}>
            {options.map((option, index) => (
              <div className={styles.item} key={index} onClick={() => onSelect(option)}>
                <div className={styles.optionWrapper}>{option}</div>
                {multi && (
                  <input
                    type="checkbox"
                    checked={!!value?.find((item) => item === option)}
                    onChange={() => onSelect(option)}
                    className={styles.customCheck}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
