import React from "react";
import "./Form.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = ({ onChange, onSubmit, onHandleDate, state }) => {
  return (
      <div className="wrapper-padding">
        <h1 className="form-title">Job Application</h1>
        <p className="form-text">In order to apply, please fill the following form.</p>
        <p className="form-subtext">
          All fields with <span className="form-asterisk"> *</span> are required.
        </p>

        <div className="form-wrapper">
          <form onSubmit={onSubmit} className="form" noValidate>
            {/* name */}
            <div className="form-name form-item">
              <label className="form-label">
                First and Last Name<span className="form-asterisk"> *</span>
              </label>
              <input
                  className="form-field"
                  type="text"
                  name="fullName"
                  value={state.fullName}
                  onChange={onChange}
                  placeholder="Katia Rojas Sandoval"
                  required
              />
              <div className="form-message">{state.formErrors.fullName}</div>
            </div>
            {/* email */}
            <div className="form-email form-item">
              <label className="form-label">
                Email Address<span className="form-asterisk"> *</span>
              </label>
              <input
                  className="form-field"
                  name="email"
                  type="email"
                  value={state.email}
                  onChange={onChange}
                  placeholder="hola@endouble.com"
                  required
              />
              <div className="form-message">{state.formErrors.email}</div>
            </div>
            {/* birthdate */}
            <div className="block-birthdate-gender">
              <div className="form-birthdate form-item">
                <label className="form-label">
                  Date of Birth<span className="form-asterisk"> *</span>
                </label>
                <DatePicker
                    className="form-field"
                    name="birthDate"
                    selected={state.birthDate}
                    onChange={onHandleDate}
                    value={state.birthDate}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholder="dd/mm/yyyy"
                    required
                />
                <div className="form-message">{state.formErrors.birthDate}</div>
              </div>

              {/* gender */}
              <div className="form-gender form-item">
                <label className="form-label">
                  Gender<span className="form-asterisk"> *</span>
                </label>

                <select
                    className="form-field"
                    name="gender"
                    value={state.value}
                    onChange={onChange}
                    required
                >
                  <option>Choose your gender</option>
                  <option>Female</option>
                  <option>Male</option>
                </select>
                <div className="form-message">{state.formErrors.gender}</div>
              </div>
            </div>
            {/* address */}
            <div className="form-address form-item">
              <label className="form-label">
                Address<span className="form-asterisk"> *</span>
              </label>
              <input
                  className="form-field"
                  name="address"
                  type="text"
                  value={state.address}
                  onChange={onChange}
                  placeholder="Streetname"
                  required
              />
              <div className="form-message">{state.formErrors.address}</div>

              {/* house number */}
              <div className="block-number-zipcode">
                <div className="form-housNumber">
                  <input
                      className="form-field"
                      name="houseNumber"
                      type="text"
                      value={state.houseNumber}
                      onChange={onChange}
                      placeholder="House number"
                      required
                  />
                  <div className="form-message">{state.formErrors.houseNumber}</div>
                </div>

                {/* zipcode */}
                <div className="form-zipecode">
                  <input
                      className="form-field"
                      name="zipcode"
                      type="text"
                      value={state.zipcode}
                      onChange={onChange}
                      placeholder="Zipcode"
                      required
                  />
                  <div className="form-message">{state.formErrors.zipcode}</div>
                </div>
              </div>
            </div>
            {/* file */}
            <label className="form-label" />
            <div className="form-file form-item">
              <input
                  className="form-field"
                  name="file"
                  type="file"
                  accept=".doc, .docx, .pdf, .rtf, .txt"
                  onChange={onChange}
              />
            </div>
            {/* motivational letter */}
            <div className="form-letter form-item">
              <label className="form-label">Motivational Letter</label>
              <textarea
                  className="form-field-text form-item"
                  name="letter"
                  type="text"
                  value={state.letter}
                  onChange={onChange}
                  placeholder="Let the company know more about you!"
              />
            </div>
            {/* submit */}
            <div className="form-submit form-item">
              <button
                  className="form-item form-submit-button"
                  type="button"
                  onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Form;
