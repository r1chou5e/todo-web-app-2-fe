import React, { useEffect, useState } from 'react';
import Header from '../../templates/header/Header';
import TodoList from '../../templates/todo-list/TodoList';
import { getRawAccessToken } from '../../../api/config/tokenManager';
import { getUserProfileByAccessToken } from '../../../api/user.service';
import { useLoading } from '../../../context/LoadingProvider';
import { useNavigate } from 'react-router-dom';

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
          const profileInfo = await getUserProfileByAccessToken(accessToken);
          setProfile(profileInfo);
          return;
        } catch (error) {
          navigate('/login', {
            state: { message: 'Your session has expired!' },
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        navigate('/login', {
          state: { message: 'Your session has expired!' },
        });
      }
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
