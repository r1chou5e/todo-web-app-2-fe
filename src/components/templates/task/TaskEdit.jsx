import React, { useState } from 'react';
import TimePicker from '../../controls/time-picker/TimePicker';
import Dropdown from '../../controls/dropdown/Dropdown';
import { TaskTypes } from '../../../constants';

export default function TaskEdit({
  id,
  title,
  description,
  time,
  onSave,
  onCancel,
}) {
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editTime, setEditTime] = useState(time);

  const handleSave = () => {
    onSave({ title: editTitle, description: editDescription, time: editTime });
  };

  return (
    <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg">
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
        <Dropdown items={Object.values(TaskTypes)} selectItem="value" />
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => onCancel(id)}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Cancel
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
