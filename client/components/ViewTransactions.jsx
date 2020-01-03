import React from 'react'
import { connect } from 'react-redux'
import { getTransactions, deleteTransactions } from '../actions/transactions'
import TransactionDetails from './TransactionDetails'
import Swal from 'sweetalert2';
import { deleteTransactionMessage } from '../utils/alertMessages';

class ViewTransactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openTransactions: [],
      viewAllTransactions: false
    }
  }

  viewAllTransactions = (e) => {
    this.setState({
      viewAllTransactions: !this.state.viewAllTransactions
    })
  }

  toggleTransaction = (e) => {
    if (this.state.openTransactions.includes(e.target.name)) {
      this.setState({ openTransactions: this.state.openTransactions.filter(t => t !== e.target.name) })
    }
    else {
      this.setState({ openTransactions: [...this.state.openTransactions, e.target.name] })
    }
  }

  // componentDidMount() {
  //   this.props.dispatch(getTransactions(Number(this.props.activeGroup[0])))
  // }

  getGroupMember = (id) => {
    return this.props.groupMembers.map(person => {
      if (person.groupMember_id == id) {
        return person.member_name
      }
    })
  }


  handleDelete = (e) => {
    let id = e.target.id
    Swal.fire(deleteTransactionMessage).then((result) => {
      if (result.value) {
        this.props.dispatch(deleteTransactions(id, this.props.activeGroup))
      }
    })

  }


  render() {
    let selectedGroup = this.props.groups.find(group => group.group_id == this.props.activeGroup)

    return (
      <>
        <h2 className="subTitle" onClick={this.viewAllTransactions}>View All Transactions <i className="dashHeader fas fa-chevron-circle-down"></i></h2>
        {this.state.viewAllTransactions && <div className="animated fadeIn">
          <table className="table">
            <thead>
              <tr>
                <th scope='col'>Description</th>
                <th className='hiddenOnMobile' scope='col'>Date</th>
                <th scope='col'>Total</th>
                <th scope='col'>Paid by</th>
                {selectedGroup.settled == 0 && <th scope='col'>Delete</th>}

              </tr>
            </thead>
            <tbody>
              {this.props.transactions.filter(transaction => transaction.total_contribution > 0)
                .map((transaction, i) => {
                  let date = new Date(transaction.date * 1000)
                  let dateString = date.toString().slice(4, 15)
                  let name = this.getGroupMember(transaction.groupMember_id)
                  return (
                    <>
                      <tr>
                        <td><button className='btn transactionsButton btn-block' onClick={this.toggleTransaction} name={transaction.transaction_name}>{transaction.transaction_name}</button></td>
                        <td className='hiddenOnMobile'>{dateString}</td>
                        <td>${transaction.transaction_total / 100}</td>
                        <td>{name}</td>
                        {selectedGroup.settled == 0 && <td><button onClick={this.handleDelete} id={transaction.transaction_id} className='btn btn-outline-danger delete'>Delete!</button></td>}
                      </tr>
                      {this.state.openTransactions.includes(transaction.transaction_name) &&
                        <TransactionDetails name={transaction.transaction_name} />
                      }
                    </ >
                  )
                })
              }
            </tbody>
          </table>
        </div>}
      </>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    groups: reduxState.groups,
    transactions: reduxState.transactions,
    groupMembers: reduxState.groupMembers,
    activeGroup: reduxState.activeGroup,
  }
}

export default connect(mapStateToProps)(ViewTransactions)

