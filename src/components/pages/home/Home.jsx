import React, { useEffect, useState } from 'react';
import Header from '../../templates/header/Header';
import TodoList from '../../templates/todo-list/TodoList';
import {
  getRawAccessToken,
  removeAccessToken,
} from '../../../api/config/storageManager';
import { getUserProfileByAccessToken } from '../../../api/user.service';
import { useLoading } from '../../../context/LoadingProvider';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../api/auth.service';

export default function Home() {
  const { setIsLoading } = useLoading();
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = getRawAccessToken();
      if (accessToken) {
        try {
          setIsLoading(true);
          const profileInfo = await getUserProfileByAccessToken();
          setProfile(profileInfo);
          return;
        } catch (error) {
          logout();
        } finally {
          setIsLoading(false);
        }
      } else {
        logout();
      }
    };

    fetchData();
  }, []);

  const logout = async () => {
    await logoutUser(profile.email);
    removeAccessToken();
    navigate('/login', {
      state: { message: 'Your session has expired!' },
    });
  };
  return (
    <div>
      <Header profile={profile} />
      <div className="px-40 flex flex-1 justify-center py-5">
        <TodoList />
      </div>
    </div>
  );
}
