import React from 'react';

export default function Tag({ colorVariant, text }) {
  const className =
    `text-xs font-medium px-2.5 py-0.5 me-2 rounded flex items-center justify-center ` +
    colorVariant;
  return <span className={className}>{text}</span>;
}
