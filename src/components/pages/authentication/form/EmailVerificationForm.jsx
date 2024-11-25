import React, { useState } from 'react';

export default function EmailVerificationForm({ email }) {
  const submit = async () => {};

  return (
    <div>
      <div className="space-y-6 transition-all duration-500">
        <p className="text-sm mb-4">
          We sent a verification link to your email <b>{email}</b>. If you don't
          see it, check your spam folder or click below to resend.
        </p>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <button
          className={`w-full h-12 bg-[#1980e6] text-white font-bold rounded-xl transition-colors duration-300`}
          onClick={submit}
        >
          Resend email
        </button>
      </div>
    </div>
  );
}
