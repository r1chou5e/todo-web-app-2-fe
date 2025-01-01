import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { getSubtypesByTypeCode } from '../../../api/type.service';

export default function Dropdown({ items = [], value, onChange, typeCode }) {
  const [options, setOptions] = useState(items);
  const [selected, setSelected] = useState(
    items.find((item) => item.value === String(value)) || items[0]
  );
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState('auto');

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(`${inputRef.current.offsetWidth}px`);
    }
  }, []);

  // Update selected item khi prop value thay đổi
  useEffect(() => {
    const foundItem = options.find((item) => item.value === String(value));
    if (foundItem) {
      setSelected(foundItem);
    }
  }, [value, options]);

  // Gọi API khi typeCode thay đổi
  useEffect(() => {
    if (typeCode) {
      const fetchData = async () => {
        try {
          const data = await getSubtypesByTypeCode(typeCode);
          const formattedData = data.subtypes.map((subtype) => ({
            label: subtype.subtypeName,
            value: subtype.subtypeValue,
          }));
          setOptions(formattedData);
        } catch (error) {
          console.error('Error fetching subtypes:', error);
        }
      };
      fetchData();
    }
  }, [typeCode]);

  return (
    <div>
      <Combobox
        value={selected}
        onChange={(item) => {
          setSelected(item);
          onChange(item.value); // Trả về giá trị (number) khi thay đổi
        }}
      >
        <div className="relative">
          <ComboboxInput
            ref={inputRef}
            className={clsx(
              'w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-8 pl-3 text-sm text-gray-900',
              'focus:ring-1 focus:border-gray-500'
            )}
            displayValue={(item) => item?.label}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          style={{ width: inputWidth }}
          className={clsx(
            'absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
          )}
        >
          {options.length === 0 && (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              No results found.
            </div>
          )}
          {options.map((item, index) => (
            <ComboboxOption
              key={index}
              value={item}
              className={({ active }) =>
                clsx(
                  'relative cursor-pointer select-none py-2 pl-10 pr-4',
                  active
                    ? 'bg-gray-600 text-white rounded-md mx-1'
                    : 'text-gray-900'
                )
              }
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={clsx(
                      'block truncate',
                      selected ? 'font-medium' : 'font-normal'
                    )}
                  >
                    {item.label}
                  </span>
                  {selected ? (
                    <span
                      className={clsx(
                        'absolute inset-y-0 left-0 flex items-center pl-3',
                        active ? 'text-white' : 'text-gray-600'
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
