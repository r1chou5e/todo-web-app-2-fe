import React from 'react';
import RoundCheckbox from '../../controls/checkbox/RoundCheckbox';
import Tag from '../../controls/tag/Tag';
import { TaskTypeColorVariants } from '../../../constants';

export default function Task({ id, title, description, type, time, onEdit }) {
  return (
    <div className="flex items-center gap-4 bg-[#FFFFFF] px-4 py-3 rounded-lg shadow-lg min-h-[72px] justify-between transition-transform transform hover:scale-105">
      <div className="flex items-center gap-4">
        <RoundCheckbox />
        <div className="flex flex-col justify-center">
          <div className="flex gap-2">
            <p className="text-black text-base font-medium leading-normal line-clamp-1">
              {title}
            </p>
            <Tag colorVariant={TaskTypeColorVariants[type]} text={type} />
          </div>
          <p className="text-neutral-500 text-sm font-normal leading-normal line-clamp-2">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="shrink-0">
          <p className="text-neutral-500 text-sm font-normal leading-normal">
            {time}
          </p>
        </div>
        <div className="cursor-pointer" onClick={() => onEdit(id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
