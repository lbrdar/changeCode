import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { postData } from '../../utils/index';
import './SignUp.css';


class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      teamname: '',
      password: '',
      password2: '',
      member1: {},
      member2: {},
      member3: {},
      member4: {}
    };
  }

  onFormSubmit = (e) => {
    const { teamname, password, member1, member2, member3, member4 } = this.state;
    e.preventDefault();

    postData('http://52.233.158.172/change/api/hr/account/register', {
      Teamname: teamname,
      Password: password,
      Members: [member1, member2, member3, member4]
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

  updateMember = (memberId, e) =>
    this.setState({
      [`member${memberId}`]: {
        ...this.state[`member${memberId}`],
        [e.target.name]: e.target.value
      }
    });

  renderMemberForm = (id) => (
    <div key={id}>
      <b>Member {id}:</b>
      <input
        type="text"
        placeholder="Name"
        name="name"
        required
        onChange={(e) => this.updateMember(id, e)}
      />
      <input
        type="text"
        placeholder="Surname"
        name="surname"
        required
        onChange={(e) => this.updateMember(id, e)}
      />
      <input
        type="text"
        placeholder="E-mail"
        name="mail"
        required
        onChange={(e) => this.updateMember(id, e)}
      />
    </div>
  );

  render() {
    return (
      <div className="SignUp">
        <h1>Registration Form</h1>
        <form className="SignUp-form" onSubmit={this.onFormSubmit}>
          <b>Team name</b>
          <input type="text" placeholder="Enter your team name" name="teamname" required
                 onChange={(e) => this.setState({ teamname: e.target.value })}/>
          <br />
          <label><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required
                 onChange={(e) => this.setState({ password: e.target.value })}/>
          <br />
          <label><b>Repeat Password</b></label>
          <input type="password" placeholder="Repeat Password" name="psw-repeat" required
                 onChange={(e) => this.setState({ password2: e.target.value })}/>

          <p>Team members:</p>
          {[1,2,3,4].map(this.renderMemberForm)}


          <button type="submit" className="SignUp-submit-button">Register</button>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  onComplete: PropTypes.func.isRequired
};

export default SignUp;
