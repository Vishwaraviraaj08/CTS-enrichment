import { useState ,useEffect} from 'react'
import './login.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';




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
const analytics = getAnalytics(app);
const auth = getAuth(app);

function Form({ option }) {
    const [ipAddress, setIPAddress] = useState('');

    useEffect(() => {
        async function fetchIP() {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                setIPAddress(data.ip);
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }
        }
        fetchIP();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();


        // Collect form data
        let formData = {};
        const formElements = event.target.elements;

        for (const element of formElements) {
            if (element.id) {
                formData[element.id] = element.value;
            }
        }
        formData['ipAddress'] = ipAddress;

        // Logging the collected form data as JSON
        console.log(JSON.stringify(formData));

        handleFirebaseSubmit(event).then(r => console.log(r));

        setTimeout(() => {

        },1500);
        console.log('5 seconds later');
        const response = await submitForm(formData);
        console.log(response);
    }


    async function handleFirebaseSubmit(event) {
        event.preventDefault();

        try {
            const email = event.target.elements.email.value;
            const password = event.target.elements.password.value;

            if (option === 1) {
                await signInWithEmailAndPassword(auth, email, password);
            } else if (option === 2) {
                await createUserWithEmailAndPassword(auth, email, password);
            }

            // Authentication successful, you can redirect or do something else here
        } catch (error) {
            console.error('Error:', error);
        }
    }



    let submitForm = async (formData) => {
        try {


            formData = Object.fromEntries(
                Object.entries(formData).filter(([key, value]) => key !== 'password' && key !== 'repeat-password')
            );


            console.log(formData);

            const response = await fetch('http://localhost:3001/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            return response.ok;
        } catch (error) {
            console.error('Error submitting form data:', error);
            return false; // Request failed due to an error
        }
    };







    return (
        <form
            method="POST"
            // action={"/" + (option === 1 ? "sign-in" : "sign-up")}
              onSubmit={handleSubmit}
              className="account-form"
        >
            <div
                className={
                    "account-form-fields " +
                    (option === 1 ? "sign-in" : "sign-up" )
                }
            >
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    required
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={option === 1 || option === 2}
                />
                <input
                    id="repeat-password"
                    name="repeat-password"
                    type="password"
                    placeholder="Repeat password"
                    required={option === 2}
                    disabled={option === 1}
                />
            </div>
            <button className="btn-submit-form" type="submit">
                {option === 1 ? "Sign in" : "Sign up" }
            </button>
        </form>
    );
}

function LoginPage() {
    const [option, setOption] = useState(1);

    return (
        <div className="container">

            <header className="text-center mt-5">
                <div
                    className={
                        "header-headings " +
                        (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
                    }
                >
                    <span>Sign in to your account</span>
                    <span>Create an account</span>
                </div>
            </header>
            <ul className="options d-flex justify-content-center">
                <li className={option === 1 ? "active" : ""} onClick={() => setOption(1)}>
                    Sign in
                </li>
                <li className={option === 2 ? "active" : ""} onClick={() => setOption(2)}>
                    Sign up
                </li>
            </ul>
            <Form option={option} />
        </div>
    );
}


export default LoginPage;