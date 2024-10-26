import React, { useState } from 'react';
import InputText from '../../../controls/input-text/InputText';
import { registerUser } from '../../../../api/auth.service';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  // Validation functions
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const validateConfirmPassword = (password, confirmPassword) =>
    password === confirmPassword;

  const generateUsername = (email) => email.split('@')[0].toLowerCase();

  const submit = async () => {
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(password, confirmPassword)
    ) {
      await registerUser(email, password, username);
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
          onBlur={() => setUsername(generateUsername(email))}
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
        <InputText
          type="password"
          placeholder="Confirm your password"
          label="Confirm Password"
          onChange={setConfirmPassword}
          value={confirmPassword}
          validate={(value) => validateConfirmPassword(password, value)}
          errorMessage="Passwords do not match"
        />
        <InputText
          type="text"
          placeholder="Auto-generated username"
          label="Username"
          value={username}
          readOnly
        />
      </div>
      <div className="mt-8 flex items-center justify-between">
        <button
          className={`w-full h-12 bg-[#1980e6] text-white font-bold rounded-xl transition-colors duration-300`}
          onClick={submit}
        >
          Register
        </button>
      </div>
    </div>
  );
}
