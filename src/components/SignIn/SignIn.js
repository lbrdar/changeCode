import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { postData } from '../../utils/index';
import './SignIn.css';


class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      teamname: '',
      password: ''
    };
  }

  onFormSubmit = (e) => {
    const { teamname, password } = this.state;
    e.preventDefault();

    postData('http://52.233.158.172/change/api/hr/account/login', {
      Teamname: teamname,
      Password: password
    })
      .then((res) => {
        if (res.Errors.length) {
          throw res.Errors;
        }
        return JSON.parse(res.Result)
      })
      .then((res) => this.props.onComplete(res))
      .catch(console.err);
  };

  render() {
    return (
      <div className="SignIn">
        <h1>Login Form</h1>
        <form className="SignIn-form" onSubmit={this.onFormSubmit}>
          <b>Team name</b>
          <input type="text" placeholder="Enter your team name" name="teamname" required
                 onChange={(e) => this.setState({ teamname: e.target.value })}/>
          <br />
          <label><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required
                 onChange={(e) => this.setState({ password: e.target.value })}/>
          <br />

          <button type="submit" className="SignIn-submit-button">Login</button>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  onComplete: PropTypes.func.isRequired
};

export default SignIn;
