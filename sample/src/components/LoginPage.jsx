import { useState ,useEffect} from 'react'
// import './login.css'
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
        <>
        <head>
            <style>
                {`
                
/*@import url("https://fonts.googleapis.com/css?family=Nunito:600,700&display=swap");*/
/*@import '~bootstrap/dist/css/bootstrap.min.css';*/

* {
    box-sizing: border-box;
}

body {
    font-family: Nunito, Roboto, Arial, sans-serif;
    background: #2e56e0;
    height: 100vh;
    display: flex;
    margin: 0; /* Remove default margin */
}

#app {
    height: 100%;
    display: flex;
    justify-content: center;
}

.container {
    position:relative;
    text-align: center;
    color: #ffffff;
    width: 150%;
    display: block;
    margin: 10% auto auto auto;
}

.container > header {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0 auto 60px auto;
    position: relative;
    height: 35px;
    width: 250px;
    overflow: hidden;
}

.header-headings {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    transition: all 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

.header-headings > span {
    margin: 3px 0;
    font-size: 20px;
}

.header-headings.sign-in {
    transform: translateY(0);
}

.header-headings.sign-up {
    transform: translateY(-30px);
}

.header-headings.forgot {
    transform: translateY(-50px);
}

.options {
    display: flex;
    align-items: center;
    width: 70%;
    justify-content: space-evenly;
}

@media screen and (max-width: 80px) {
    .options {
        width: 100%;
        flex-direction: column; /* Stack options vertically on small screens */
    }




    .container {
        text-align: center;
        color: #fff;
        width: 100%;
        display: block;
        margin: 5% auto auto auto;
    }
}

.options > li {
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.2s ease;
    margin-right: 20%;
    list-style-type: none;
}


.options > li:hover {
    opacity: 1;
}

.options > li.active {
    opacity: 1;
}

.options > li:nth-of-type(2) {
    margin-left: auto;
}

.options > li:last-of-type {
    margin-left: auto;
}

.account-form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
}

.account-form-fields {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

.account-form-fields.sign-in {
    max-height: 123px;
}

.account-form-fields.sign-up {
    max-height: 250px;
}

.account-form-fields > input {
    border: 0;
    margin-bottom: 10px;
    padding: 15px;
    font-size: 1rem;
    font-family: Nunito, sans-serif;
    color: #000;
    border-radius: 5px;

}

.account-form-fields > input::-moz-placeholder {
    color: #aaa;
}

.account-form-fields > input:-ms-input-placeholder {
    color: #aaa;
}

.account-form-fields > input::placeholder {
    color: #aaa;
}

/*.account-form-fields > input:-ms-input-placeholder {*/
/*    color: #aaa;*/

/*}*/
.account-form-fields > input:focus {
    outline: none;
}

.btn-submit-form {
    border: 0;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
    padding: 15px 0;
    border-radius: 5px;
    color: #fff;
    font-size: 1rem;
    font-family: Nunito, sans-serif;
    background: #6381e8;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.13);
    transition: all 0.2s ease;
}

.btn-submit-form:hover {
    background: #4468e4;
}

.btn-submit-form:active,
.btn-submit-form:focus {
    outline: none;
    background: #2e56e0;
}

                `}
            </style>
        </head>
            <body>
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
        </div></body></>
    );
}


export default LoginPage;