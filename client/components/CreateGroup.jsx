import React from 'react'
import { connect } from 'react-redux'
import { createNewGroupThunk } from '../actions/groups'

class CreateGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      group_name: '',
      group_description: '',
      user_id: '',
      settled: false,
      members_names: [],
      new_member_name: '',
      error: false
    }
  }

  updateMembers = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addMember = (e) => {
    e.preventDefault()
    if (this.state.new_member_name == "") {

    } else {
      this.state.members_names.push(this.state.new_member_name)
      this.setState({
        new_member_name: ''
      })
    }
  }

  updateDetails = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      user_id: this.props.auth.user.user_id
    })
  }

  submit = (e) => {
    e.preventDefault()
    if (this.state.group_name == '' || this.state.group_description == '' || this.state.members_names.length < 2) {
      this.setState({
        error: true
      })
    } else {
      this.props.dispatch(createNewGroupThunk(this.state))
      this.setState({
        error: false
      })
    }
  }

  deleteMember = (e) => {
    e.preventDefault()
    this.setState({
      members_names: this.state.members_names.filter(member => member !== e.target.name)
    })
  }



  render() {
    return (
      <>
        <div className="form-content animated fadeIn">
          <form className="groupForm">
            <h2 className="groupFormTitle">Create a new group</h2>
            <label>Group Name</label>
            <input className='form-control groupname' required type='text' name='group_name' placeholder='eg. Kates Birthday' onChange={this.updateDetails}></input>

            <label>Description</label>
            <input className='form-control groupdescription' required type='text' name='group_description' placeholder='eg. Great Mates Drinking Crates To Celebrate Our Old Mates Birthdate. Mate.' onChange={this.updateDetails}></input>


            <label>Add Group Member</label>
            <input className='form-control groupmember' required type='text' name='new_member_name' placeholder='eg. Joe' onChange={this.updateMembers} value={this.state.new_member_name}></input>
            <div>
              <button className="addMemberButton btn custom-button btn-sm" onClick={this.addMember}>Add member</button>
            </div>
            <ul className="formMembersList"> {this.state.members_names.map(member => {
              return <li key={1} className="formMembersListItem">{member} <button className="btn btn-outline-danger btn-sm" name={member} onClick={this.deleteMember}>Remove</button></li>
            })}
            </ul>
            <button className="btn custom-button btn-lg" onClick={this.submit}>
              Create Group
          </button>
          </form>
          {this.state.error == true && <p style={{ color: "red" }}>Please fill in all the details in the form</p>}
        </div>
      </>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    auth: reduxState.auth,
    groups: reduxState.groups,
    groupMembers: reduxState.groupMembers,
    activeGroup: reduxState.activeGroup
  }
}




export default connect(mapStateToProps)(CreateGroup)