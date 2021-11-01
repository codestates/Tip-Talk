import { useHistory } from 'react-router';
import Modal from './Modal';
import Portal from './Portal';

const Logout = ({ setUser, isOpen, setIsOpen }) => {
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setUser(null);
    history.push('/');
  };

  return (
    <>
      {isOpen === true ? (
        <Portal>
          <Modal
            message={'로그아웃 하시겠습니까?'}
            setIsOpen={setIsOpen}
            callback={logoutHandler}
          />
        </Portal>
      ) : null}
    </>
  );
};

export default Logout;
