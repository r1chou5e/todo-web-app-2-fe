import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

export default function LoginForm() {
  return (
    <div>
      <div className="space-y-6 transition-all duration-500">
        <label className="block">
          <span className="text-base font-medium text-[#111418]">Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mt-2 h-12 px-4 py-2 border border-[#dce0e5] rounded-xl text-[#111418] focus:outline-none focus:border-[#1980e6]"
          />
        </label>
        <label className="block">
          <span className="text-base font-medium text-[#111418]">Password</span>
          <input
            type="password"
            placeholder="Enter a password"
            className="w-full mt-2 h-12 px-4 py-2 border border-[#dce0e5] rounded-xl text-[#111418] focus:outline-none focus:border-[#1980e6]"
          />
        </label>
      </div>

      <div className="mt-8">
        <button className="w-full h-12 bg-[#1980e6] text-white font-bold rounded-xl transition-colors duration-300">
          Login
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-[#637588]">
        Or login with
      </div>
      <div className="mt-4 flex justify-center gap-3">
        <button className="flex-1 h-12 bg-[#f0f2f4] text-[#111418] font-bold rounded-xl flex items-center justify-center gap-2">
          <FaGoogle className="text-[#EA4335]" />
          Google
        </button>
        <button className="flex-1 h-12 bg-[#f0f2f4] text-[#111418] font-bold rounded-xl flex items-center justify-center gap-2">
          <FaFacebook className="text-[#4267B2]" />
          Facebook
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-[#637588] underline cursor-pointer">
        Forgot your password?
      </div>
    </div>
  );
}
