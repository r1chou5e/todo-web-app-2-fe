import React, { useEffect, useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import InputText from '../../../controls/input-text/InputText';
import { loginUser } from '../../../../api/auth.service';
import { useLoading } from '../../../../context/LoadingProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlert } from '../../../../context/AlertProvider';
import {
  getAccessToken,
  setAccessToken,
} from '../../../../api/config/tokenManager';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoading } = useLoading();
  const location = useLocation();
  const { showAlert } = useAlert();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      window.location.href = '/';
    }
    const message = location.state?.message;
    if (message) {
      showAlert(message, 'error');
    }
  }, [location.state, showAlert]);

  const submit = async () => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsLoading(true);
      const token = await loginUser(email, password);
      if (token) {
        setAccessToken(token);
        window.location.href = '/';
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="space-y-6 transition-all duration-500">
        <InputText
          type="email"
          placeholder="you@example.com"
          label="Email"
          validate={validateEmail}
          onChange={setEmail}
          value={email}
          errorMessage="Please enter a valid email"
        />
        <InputText
          type="password"
          placeholder="Enter a password"
          label="Password"
          onChange={setPassword}
          validate={validatePassword}
          value={password}
          errorMessage="Password must be at least 6 characters"
        />
      </div>

      <div className="mt-8">
        <button
          className="w-full h-12 bg-[#1980e6] text-white font-bold rounded-xl transition-colors duration-300"
          onClick={submit}
        >
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
