import React, { Component } from 'react';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import TeamInfo from '../TeamInfo';
import { getData, getCookie, setCookie } from '../../utils';
import './App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      displayRegister: true,
      displayLogin: false,
      teamInfo: {}
    };
  }

  componentWillMount() {
    const token = getCookie('token');
    const teamId = getCookie('teamId');
    if (token && teamId) {
      this.getTeamData(teamId, token)
        .then((teamInfo) => {
          this.setState({ displayRegister: false, displayLogin: false, teamInfo: JSON.parse(teamInfo.Result) })
        });
    }
  }

  onSignIn = (teamData) => {
    setCookie('token', teamData.AuthorizationToken);
    setCookie('teamId', teamData.TeamId);

    this.getTeamData(teamData.TeamId, teamData.AuthorizationToken)
      .then((teamInfo) => {
        this.setState({ displayRegister: false, displayLogin: false, teamInfo: JSON.parse(teamInfo.Result) })
      });
  };
  onSignUp = () => this.setState({ displayRegister: false, displayLogin: true });

  getTeamData = (teamId, token) => {
    return getData(`http://52.233.158.172/change/api/hr/team/details/${teamId}`, {
      'X-Authorization': token
    });
  };

  goToSignIn = () => this.setState({ displayRegister: false, displayLogin: true });
  goToSignUp = () => this.setState({ displayRegister: true, displayLogin: false });

  render() {
    const { displayRegister, displayLogin, teamInfo } = this.state;
    return (
      <div className="App">
        {displayRegister &&
          <div>
            <SignUp onComplete={this.onSignUp} />
            <button className="App-button" onClick={this.goToSignIn}>Go to Login</button>
          </div>
        }
        {displayLogin &&
        <div>
          <SignIn onComplete={this.onSignIn} />
          <button className="App-button" onClick={this.goToSignUp}>Go to Register</button>
        </div>
        }
        {!displayRegister && !displayLogin &&
          <TeamInfo id={teamInfo.Id} name={teamInfo.TeamName} members={teamInfo.Members} />
        }
      </div>
    );
  }
}

export default App;
