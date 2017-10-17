import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
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
    const { handleSubmit, fields: [email, password] } = this.props;
    return (
      <form
        className="signin"
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      >
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name={email} component="input" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            name={password}
            type="password"
            component="input"
            className="form-control"
          />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
  form: "signin",
  fields: ["email", "password"]
})(Signin);

export default (Signin = connect(mapStateToProps, actions)(Signin));
