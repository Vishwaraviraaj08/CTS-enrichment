import { useState ,useEffect} from 'react'
// import './login.css'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {useNavigate} from "react-router-dom";



const firebaseConfig = {
    apiKey: "AIzaSyAHEGmBtvssZPR1D1MEJ-EA2xIEZbRt1ig",
    authDomain: "cts-ep.firebaseapp.com",
    projectId: "cts-ep",
    storageBucket: "cts-ep.appspot.com",
    messagingSenderId: "123793437502",
    appId: "1:123793437502:web:dc7216276db8d9ae05726f",
    measurementId: "G-K2EXGVQR1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeForm, setActiveForm] = useState('signIn');
    const auth = getAuth(app);
    const navigate = useNavigate();
    const handleSignIn = async (event) => {
        event.preventDefault();
        // const auth = getAuth(app);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Handle successful sign-in
            navigate('/test');
        } catch (error) {
            console.error('Failed to sign in', error);
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();


        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Handle successful sign-up
            navigate('/test');
        } catch (error) {
            console.error('Failed to create user', error);
        }
    };

    const toggleForm = () => {
        setActiveForm((prevForm) => (prevForm === 'signIn' ? 'signUp' : 'signIn'));
    };

    return (
        <>
            <style>
                {`
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }

          #container {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 300px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          h2 {
            color: #333;
            text-align: center;
          }

          form {
            display: flex;
            flex-direction: column;
          }

          input {
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            outline: none;
          }

          button {
            background-color: #4caf50;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          button:hover {
            background-color: #45a049;
          }
          
          .main-form {
            display: flex;
            flex-direction: column;
            /*align-items: center;*/
            /*justify-content: center;*/
            gap: 10px;
            
          }
        `}
            </style>
            <div id={'container'}>
                {activeForm === 'signIn' && (
                    <form className={"main-form"} onSubmit={handleSignIn}>
                        <h2>Sign In</h2>
                        <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input
                            type='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type='submit'>Sign In</button>
                    </form>
                )}

                {activeForm === 'signUp' && (
                    <form className={"main-form"} onSubmit={handleSignUp}>
                        <h2>Sign Up</h2>
                        <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input
                            type='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type='submit'>Sign Up</button>
                    </form>
                )}

                <button onClick={toggleForm}>{activeForm === 'signIn' ? 'Switch to Sign Up' : 'Switch to Sign In'}</button>
            </div>
        </>
    );
}

export default LoginPage;