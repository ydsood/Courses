import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../../actions";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  console.log(error);
  return (
    <fieldset className="form-group">
      <label htmlFor={input.name}>{label}</label>
      <input className="form-control" {...input} type={type} />
      {touched && error && <span className="text-danger">{error}</span>}
    </fieldset>
  );
};

class Signup extends Component {
  handleFormSubmit(formProps) {
    //call action creator to signup user
    //if form is not valid this method is not called
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong>
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const {
      handleSubmit,
      fields: [email, password, passwordConfirm]
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name={email}
          component={renderField}
          type="email"
          label="Email:"
          validate={emailValidation}
        />
        <Field
          name={password}
          component={renderField}
          type="password"
          label="Password:"
        />
        <Field
          name={passwordConfirm}
          component={renderField}
          type="password"
          label="Confirm Password:"
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    );
  }
}

//receives an object of fields
/**
 * 
 * {
 *    email : "abc@gmail.com",
 *    password : "password",
 *    passwordConfirm : "password"
 * }
 * 
 * Should return a similar object with error strings
 * for keys instead of warnings
 * {
 *    email : "not a valida email",
 *    password : "Does not match confirmPassword",
 *    passwordConfirm : "Does not match password"
 * }
 */

//common validation for all fields
function validate(formProps, formObj) {
  const errors = {};

  if (!formProps.password) {
    errors.password = "Password cannot be blank";
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = "Confirm password cannot be blank";
  }

  if (!formProps.email) {
    errors.email = "Email cannot be blank";
  }

  if (formProps.password !== formProps.passwordConfirm)
    errors.password = "Passwords don't match";
  return errors;
}

//validation for a specific field
const emailValidation = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: "signup",
    fields: ["email", "password", "passwordConfirm"],
    validate
  })(Signup)
);
