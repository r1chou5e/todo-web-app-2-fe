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

export default function Dropdown({ items, selectItem }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(items[0]);
  const inputRef = useRef(null); // To reference the input element
  const [inputWidth, setInputWidth] = useState('auto'); // State to store the input width

  const filteredItems =
    query === ''
      ? items
      : items.filter((item) => {
          return item[selectItem].toLowerCase().includes(query.toLowerCase());
        });

  // Effect to update the input width on mount and when input width changes
  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(`${inputRef.current.offsetWidth}px`);
    }
  }, [inputRef.current]);

  return (
    <div>
      <Combobox
        value={selected}
        onChange={(value) => setSelected(value)}
        onClose={() => setQuery('')}
      >
        <div className="relative">
          <ComboboxInput
            ref={inputRef} // Attach ref to the input
            className={clsx(
              'w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-8 pl-3 text-sm text-gray-900',
              'focus:ring-1 focus:border-gray-500'
            )}
            displayValue={(item) => item?.[selectItem]}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          style={{ width: inputWidth }} // Apply dynamic width
          className={clsx(
            'absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
          )}
        >
          {filteredItems.length === 0 && (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              No results found.
            </div>
          )}
          {filteredItems.map((item) => (
            <ComboboxOption
              key={item.id}
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
                    {item[selectItem]}
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
