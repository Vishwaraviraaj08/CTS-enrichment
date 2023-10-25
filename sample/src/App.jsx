import React, { useState } from "react";
import "./App.scss";
import Swal from "sweetalert2";
import Form from "./components/Form/index.jsx";

const App = () => {
    const [state, setState] = useState({
        fullName: "",
        birthDate: new Date(),
        email: "",
        gender: "",
        address: "",
        houseNumber: "",
        zipcode: "",
        file: new FileReader(),
        letter: "",
        submitting: true,
        formErrors: {
            fullName: "",
            birthDate: "",
            email: "",
            gender: "",
            address: "",
            houseNumber: "",
            zipcode: "",
            file: "ok",
            letter: "ok",
        },
        isModalOpen: false,
        show: "",
    });

    const handleDate = (date) => {
        setState((prevState) => ({
            ...prevState,
            birthDate: date,
        }));
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setState((prevState) => {
            let formErrors = { ...prevState.formErrors };

            switch (name) {
                case "fullName":
                    formErrors.fullName =
                        value.length < 3 ? "Minimum 3 characters required" : "Perfect!";
                    break;

                case "birthDate":
                    formErrors.birthDate = RegExp(
                        /^(((((((0?[13578])|(1[02]))[\.\-/]?((0?[1-9])|([12]\d)|(3[01])))|(((0?[469])|(11))[\.\-/]?((0?[1-9])|([12]\d)|(30)))|((0?2)[\.\-/]?((0?[1-9])|(1\d)|(2[0-8]))))[\.\-/]?((\d{2})?([\d][\d]))))|((0?2)[\.\-/]?(29)[\.\-/]?(((19)|(20))?(([02468][048])|([13579][26])))))$/
                    ).test(value)
                        ? "Perfect!"
                        : "Enter DD/MM/YYYY birthdate format";
                    break;

                case "email":
                    formErrors.email =
                        RegExp(
                            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zAZ0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                        ).test(value) && value.length > 0
                            ? "Perfect!"
                            : "Invalid email address";
                    break;

                case "gender":
                    formErrors.gender =
                        RegExp(/^male$||^female$/).test(value) && value.length > 0
                            ? "Perfect!"
                            : "Please choose a gender";
                    break;

                case "address":
                    formErrors.address =
                        value.length < 2 && value.length > 0
                            ? "street name required"
                            : "Perfect!";
                    break;

                case "houseNumber":
                    formErrors.houseNumber =
                        RegExp(/^[0-9]*$/).test(value) && value.length > 0
                            ? "Perfect!"
                            : "Numeric characters required";
                    break;

                case "zipcode":
                    formErrors.zipcode = RegExp(/^([0-9]{4}[ ]+[a-zA-Z]{2})$/).test(value)
                        ? "Perfect!"
                        : "Please enter a valid dutch zipcode";
                    break;

                default:
                    break;
            }

            return {
                ...prevState,
                formErrors,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            state.formErrors.fullName === "Perfect!" &&
            state.formErrors.birthDate === "" &&
            state.formErrors.email === "Perfect!" &&
            state.formErrors.gender === "Perfect!" &&
            state.formErrors.address === "Perfect!" &&
            state.formErrors.houseNumber === "Perfect!" &&
            state.formErrors.zipcode === "Perfect!" &&
            state.formErrors.file === "ok" &&
            state.formErrors.letter === "ok"
        ) {
            Swal.fire("Thanks for submitting!", "We will contact you soon!", "success");
        } else {
            Swal.fire({
                type: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    return (
        <div className="App">
            <main>
                <Form state={state} onChange={handleChange} onSubmit={handleSubmit} onHandleDate={handleDate} />
            </main>
        </div>
    );
};

export default App;
