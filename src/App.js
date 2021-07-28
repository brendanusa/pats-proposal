import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      users: [
        {name: 'Brendan Bansavage', drafted: false, assigned: false},
        {name: 'Ryan Corbalis', drafted: false, assigned: false},
        {name: 'Chris Godfrey', drafted: false, assigned: false},
        {name: 'Patrick Godfrey', drafted: false, assigned: false},
        {name: 'John Kelly', drafted: false, assigned: false},
        {name: 'Dan Vogel', drafted: false, assigned: false}
      ],
      form: '',
      assignmentActive: false,
      activeUser: ''
    }
  }

  componentDidMount() {
    console.log('component did mount')
  }

  beginDraft = () => {
    this.setState({draftActive: true})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('handling submit');
    var newTeams = this.state.teams;
    newTeams.push(this.state.form)
    this.setState({teams: newTeams})
  }

  changeActiveUser = (array, index) => {
    
  }

  handleSwitchUser = () => {
    console.log('handling user switch')
    if (this.state.assignmentActive) {
      var filteredUsers = this.state.users.filter(user => !user.assigned)
      var index = Math.floor(Math.random()*filteredUsers.length)
      console.log('index', index)
      if (filteredUsers.length > 0) {
        var tempUsers = this.state.users;
        tempUsers.forEach(user => {
          if (user.name === filteredUsers[index].name) {
            user.assigned = true;
          }
        })
        this.setState({users: tempUsers})
        console.log(filteredUsers[index].name)
        this.setState({activeUser: filteredUsers[index].name})
      }
    } else {
      var filteredUsers = this.state.users.filter(user => !user.drafted)
      var index = Math.floor(Math.random()*filteredUsers.length)
      console.log('index', index)
      if (filteredUsers.length > 0) {
        var tempUsers = this.state.users;
        tempUsers.forEach(user => {
          if (user.name === filteredUsers[index].name) {
            user.drafted = true;
          }
        })
        this.setState({users: tempUsers})
        this.setState({activeUser: filteredUsers[index].name})
      } else {
        this.setState({assignmentActive: true})
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="Teams">
          {this.state.teams.length > 0 ? 
            this.state.teams.map(team => {
              return (
                <div>{team}</div>
              )
            })
            :
            <div></div>
          }
        </div>
        <div className="Draw">
          <div className="ActiveUser">
            {this.state.activeUser ? this.state.activeUser : null}
          </div>
          <div onClick={this.handleSwitchUser}>
            ADVANCE
          </div>
          <div>
            {!this.state.assignmentActive ? 
            <form className="Form" onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.form}
                onChange={e => this.setState({form: e.target.value})}
                style={{}}
              />
              <button className="Button" type="submit">Add Team</button>
            </form>
            :
            <div></div>}
          </div>
        </div>
      </div>
    );
  }

}

export default App;
