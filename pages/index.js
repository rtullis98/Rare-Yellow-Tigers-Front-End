/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/RegisterForm';
import { checkUser } from '../utils/auth';

function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  }, []);

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  return (
    // <div
    //   className="text-center d-flex flex-column justify-content-center align-content-center"
    //   style={{
    //     height: '90vh',
    //     padding: '30px',
    //     maxWidth: '400px',
    //     margin: '0 auto',
    //   }}
    // >
    //   <h1>Hello {user.fbUser.displayName}! </h1>
    //   <p>Your Bio: {user.bio}</p>
    //   <p>Click the button below to logout!</p>
    //   <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
    //     Sign Out
    //   </Button>
    // </div>
    <>
      { authUser?.uid === user.uid ? (
        <div
          className="text-center d-flex flex-column justify-content-center align-content-center"
          // style={{
          //   height: '90vh',
          //   padding: '30px',
          //   maxWidth: '1200px',
          //   margin: '0 auto',
          // }}
        >
          <Link passHref href="/userProfile">
            <Button variant="light" className="bg-transparent fs-2 border-0 ">Hello {user.fbUser.displayName}!</Button>
          </Link>
          {/* <p>Click the button below to logout!</p>
          <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
            Sign Out
          </Button> */}
        </div>
      ) : (<RegisterForm user={user} onUpdate={onUpdate} />)}
    </>
  );
}

export default Home;

// updateUser={updateUser} - was inside of the <RegisterForm /> component as a prop
