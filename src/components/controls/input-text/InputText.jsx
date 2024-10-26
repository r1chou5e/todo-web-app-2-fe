import React, { useEffect, useState } from 'react';
import ErrorText from '../validation/ErrorText';

export default function InputText({
  type = 'text',
  placeholder = '',
  label = '',
  value = '',
  validate = () => true,
  errorMessage = 'Invalid input',
  onChange,
  onBlur,
}) {
  const [controlValue, setControlValue] = useState(value);
  const [error, setError] = useState('');

  useEffect(() => {
    setControlValue(value);
  }, [value]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setControlValue(inputValue);

    if (onChange) {
      onChange(inputValue);
    }

    if (!validate(inputValue)) {
      setError(errorMessage);
    } else {
      setError('');
    }
  };

  return (
    <label className="block">
      <span className="text-base font-medium text-[#111418]">{label}</span>
      <input
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        value={controlValue}
        onChange={handleChange}
        className={`w-full mt-2 h-12 px-4 py-2 border ${
          error ? 'border-red-500' : 'border-[#dce0e5]'
        } rounded-xl text-[#111418] focus:outline-none focus:border-[#1980e6]`}
      />
      {error && <ErrorText message={error} />}
    </label>
  );
}
