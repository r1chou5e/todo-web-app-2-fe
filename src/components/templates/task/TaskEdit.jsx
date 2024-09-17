import React, { useState } from 'react';
import TimePicker from '../../controls/time-picker/TimePicker';
import Dropdown from '../../controls/dropdown/Dropdown';
import { TaskTypes } from '../../../constants';

export default function TaskEdit({
  id,
  title,
  description,
  time,
  type,
  onSave,
  onCancel,
  onRemove,
}) {
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editTime, setEditTime] = useState(time); // TODO: cần sử lý logic khi chọn giờ thì phải là giờ sau giờ hiện tại, nếu giờ là giờ nhỏ hơn giờ hiện tại thì là giờ hôm sau
  const [editType, setEditType] = useState(type);

  const handleSave = () => {
    onSave({
      title: editTitle,
      description: editDescription,
      time: editTime,
    });
  };

  return (
    <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">Edit task</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 cursor-pointer"
          onClick={() => onCancel(id)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="Edit title"
        className="w-full mb-2 p-2 border rounded-lg"
      />
      <textarea
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        placeholder="Edit description"
        className="w-full mb-2 p-2 border rounded-lg"
      />
      <div className="flex gap-3">
        <TimePicker setValue={setEditTime} value={editTime} />
        <Dropdown
          items={Object.values(TaskTypes)}
          value={editType}
          onChange={(e) => setEditType(e)}
        />
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => onRemove(id)}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Remove
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
}
