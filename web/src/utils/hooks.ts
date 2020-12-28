import { useQuery } from '@apollo/client';
import { GET_PROFILE_PICTURE } from 'src/requests';
import { useContext, useEffect } from 'react';
import { AuthContext } from './auth';
import jwtDecode from 'jwt-decode';

interface UserPayload {
  username: string;
  name: string;
  id: string;
}

export const useComponentVisible = (
  ref: React.MutableRefObject<null>,
  isVisible: boolean,
  toggle: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        toggle(!isVisible);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, isVisible, toggle]);
};

export const useProfilePicture = (username: string) => {
  const { data } = useQuery(GET_PROFILE_PICTURE, {
    variables: { username },
  });
  console.log(data, 'profile');

  return data?.getUser.profilePicture
    ? 'data:image/jpeg;base64,' + data.getUser.profilePicture
    : null;
};

export const useCurrentUserData = () => {
  const context = useContext(AuthContext);

  return context.token ? jwtDecode<UserPayload>(context.token) : null;
};
