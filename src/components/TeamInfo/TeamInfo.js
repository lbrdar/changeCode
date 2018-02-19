import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './TeamInfo.css';


class TeamInfo extends Component {
  renderMember = ({ Name: name, Surname: surname, Mail: mail }, i) => (
    <li key={i}>
      <b>Full name:</b> {name} {surname}<br />
      <b>E-mail:</b> {mail}
    </li>
  );

  render() {
    const { id, name, members } = this.props;
    return (
      <div className="TeamInfo">
        <h1>Team info</h1>
        <p><b>Team id:</b> {id}</p>
        <p><b>Team name:</b> {name}</p>
        <p><b>Team members:</b> </p>
        <ul>
          { members.map(this.renderMember) }
        </ul>
      </div>
    );
  }
}

TeamInfo.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired
};

export default TeamInfo;
