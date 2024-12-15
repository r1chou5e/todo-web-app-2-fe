import React, { useEffect, useState } from 'react';
import Header from '../../templates/header/Header';
import TodoList from '../../templates/todo-list/TodoList';
import { getRawAccessToken } from '../../../api/config/tokenManager';
import { getUserProfileByAccessToken } from '../../../api/user.service';
import { useLoading } from '../../../context/LoadingProvider';

export default function Home() {
  const { setIsLoading } = useLoading();
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = getRawAccessToken();
      setIsLoading(true);
      if (accessToken) {
        const profileInfo = await getUserProfileByAccessToken(accessToken);
        setProfile(profileInfo);
      } else {
        window.location.href = '/login';
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div>
      <Header profile={profile} />
      <div className="px-40 flex flex-1 justify-center py-5">
        <TodoList />
      </div>
    </div>
  );
}
