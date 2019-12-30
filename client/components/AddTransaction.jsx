import React from 'react'
import { connect } from 'react-redux'
import { newTransaction, deleteTransactions } from '../actions/transactions'

class AddTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transaction: {},
      group_members: this.props.groupMembers.filter(({ group_id }) => group_id == this.props.activeGroup),
      showTransactionForm: false,
      error: false,
      checked: true,
      selectedPayer: [],
      errorPayer: false,
      errorPeopleAmount: false
    }
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      transaction: {},
      group_members: this.props.groupMembers.filter(({ group_id }) => group_id == this.props.activeGroup),
      showTransactionForm: false,
      error: false,
      checked: true,
      selectedPayer: [],
      errorPayer: false,
      errorPeopleAmount: false
    })
  }

  handleCheck = () => {

    if (this.state.selectedPayer.length !== 0) {
      if (this.state.checked) {
        this.setState({
          checked: false,
          group_members: this.state.selectedPayer,
          errorPayer: false
        })
      } else {
        this.setState({
          checked: true,
          group_members: this.props.groupMembers.filter(({ group_id }) => group_id == this.props.activeGroup),
          errorPayer: false
        })
      }
    } else {
      this.setState({
        errorPayer: true
      })
    }

  }
  handlePayerChange = (e) => {
    this.setState({
      group_members: this.props.groupMembers.filter(({ group_id }) => group_id == this.props.activeGroup)
    })
    if (this.state.checked == false) {
      this.handleCheck()
    }
    let members = this.props.groupMembers.filter(({ group_id }) => group_id == this.props.activeGroup)
    let selectedMem = members.filter(member => member.groupMember_id == e.target.value)
    this.setState({
      selectedPayer: selectedMem
    })

  }

  updateDetails = (e) => {
    this.setState({
      transaction: {
        ...this.state.transaction,
        [e.target.name]: e.target.value,
        group_id: this.props.activeGroup,
      }
    })
  }

  handlePayees = (e) => {
    let selectedPayee = this.props.groupMembers.filter(member => member.group_id == this.props.activeGroup && member.member_name == e.target.value)
    this.setState({
      group_members: [...this.state.group_members, selectedPayee[0]]
    })
  }

  toggleTransaction = (e) => {
    this.setState({
      showTransactionForm: !this.state.showTransactionForm
    })
  }

  submit = (e) => {
    e.preventDefault()
    if (this.state.group_members.length <= 1) {
      this.setState({
        errorPeopleAmount: true
      })
    } else {
      if (this.state.transaction.transactionName == undefined || this.state.transaction.transactionName == "" || !this.state.transaction.groupMemberId) {
        this.setState({
          error: true
        })
      } else {
        this.props.dispatch(newTransaction(this.state))
        this.setState({
          error: false,
          errorPeopleAmount: false,
          checked: true,
          transaction: { transactionName: "", transactionTotal: 0.00, groupMemberId: 'Select Member' }
        })
      }
    }
  }

  deleteMember = (e) => {
    if (this.state.selectedPayer[0].member_name == e.target.name) {
      this.handleCheck()
      return this.setState({
        group_members: this.props.groupMembers.filter(({ group_id }) => group_id == this.props.activeGroup)
      })

    } else {
      e.preventDefault()
      this.setState({
        group_members: this.state.group_members.filter(member => member.member_name !== e.target.name)
      })
    }

  }


  render() {
    console.log(this.state)
    let members = this.props.groupMembers.filter(({ group_id }) => group_id == this.props.activeGroup)
    let splitMembers = members.filter(member => !this.state.group_members.includes(member))
    console.log(this.state)
    return (
      <>
        <div className="form-content">
          <h2 className="subTitle" onClick={this.toggleTransaction}>Add New Transaction <i className="dashHeader fas fa-chevron-circle-down"></i></h2>
          {this.state.showTransactionForm &&
            <div className="animated fadeIn">
              <form className="transactionForm" onSubmit={this.submit}>
                <div className="row">
                  <div className="col-lg-4 col-sm-12">

                    <label className="inputLabel" >Description</label>
                    <input value={this.state.transaction.transactionName} className='form-control paymentDesc' type='text' name='transactionName' placeholder="eg. Breakfast at Tiffany's" onChange={this.updateDetails}></input>
                  </div>
                  <div className="col-lg-3 col-sm-12">
                    <label className="inputLabel">Paid by</label>
                    <select value={this.state.transaction.groupMemberId} className='form-control payedby' name='groupMemberId' onChange={this.updateDetails} onClick={this.handlePayerChange}>
                      <option>Select Member</option>
                      {members.map((member, i) => {

                        return <option value={member.groupMember_id} key={i}>{member.member_name}</option>
                      })}
                    </select>
                  </div>
                  <div className="col-lg-2 col-sm-12 transactionAmountWrapper">
                    <label className="inputLabel ">Amount $</label>
                    <span className='transactionAmountInput'></span>
                    <input value={this.state.transaction.transactionTotal} className='form-control amount' type='number' name='transactionTotal' placeholder='0.00' onChange={this.updateDetails} ></input>
                  </div>
                </div>
                <div>
                  {this.state.errorPayer == true && <p style={{ color: "red" }}>Please select a payer</p>}
                  <label className="inputLabel">Split by all members?</label>
                  <input className="custom-box" type='checkbox' name='membersOwing' checked={this.state.checked} onChange={this.handleCheck}></input>
                  {!this.state.checked &&
                    <>
                      <div className="col-lg-3 col-sm-12">
                        <select className="form-control" onChange={this.handlePayees} >
                          <option>Select Member</option>
                          {splitMembers.map((member, i) => {
                            return <option key={member.member_name} value={member.member_name}>{member.member_name}</option>
                          })}
                        </select>
                      </div>
                      {this.state.group_members.map((member, i) => {
                        return <ul className="formMembersList"> <li key={i + 1000} className="transactionFormMembersListItem">{member.member_name} <button className="btn btn-outline-danger btn-sm" name={member.member_name} onClick={this.deleteMember}>Remove</button></li></ul>
                      })}
                    </>
                  }
                </div>
                {/* <div>
                  <label className="inputLabel">Split cost evenly?</label>
                  <input type='checkbox' name='amountMembersOwing' defaultChecked></input>
                </div> */}
                <div>
                  {this.state.errorPeopleAmount == true && <p style={{ color: "red" }}>Please select more than one member</p>}
                  <button className="btn addTransactionButton custom-button btn-lg" type="submit" onClick={this.submit}>
                    Add Transaction
              </button>
                </div>
              </form>
              {this.state.error == true && <p style={{ color: "red" }}>Please fill in all the details in the form</p>}
            </div>}
        </div>
      </>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    groupMembers: reduxState.groupMembers,
    activeGroup: reduxState.activeGroup
  }
}

export default connect(mapStateToProps)(AddTransaction)