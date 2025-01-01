import React, { useState } from 'react';
import TimePicker from '../../controls/time-picker/TimePicker';
import Dropdown from '../../controls/dropdown/Dropdown';

export default function TaskEdit({
  id,
  title,
  description,
  time,
  type,
  onSave,
  onCancel,
  onRemove,
  addMode,
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
    <div className="bg-[#FFFFFF] p-4 rounded-xl shadow-lg mt-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">
            {addMode ? 'Add task' : 'Edit task'}
          </span>
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
        placeholder="Title"
        className="w-full mb-2 p-2 border rounded-lg"
      />
      <textarea
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        placeholder="Description"
        className="w-full mb-2 p-2 border rounded-lg"
      />
      <div className="flex gap-3">
        <TimePicker setValue={setEditTime} value={editTime} />
        <Dropdown
          typeCode="T001"
          value={editType}
          onChange={(e) => setEditType(e)}
        />
      </div>
      <div className="flex justify-end gap-2 mt-2">
        {!addMode && (
          <button
            onClick={() => onRemove(id)}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
          >
            Remove
          </button>
        )}
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
        >
          {addMode ? 'Confirm' : 'Update'}
        </button>
        <div></div>
      </div>
    </div>
  );
}
