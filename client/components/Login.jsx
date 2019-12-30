import React from 'react'

import { loginUser, loginError } from '../actions/login'

import { connect } from 'react-redux'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateDetails = this.updateDetails.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(loginError(''))
  }

  updateDetails(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    let { email, password } = this.state
    this.props.dispatch(loginUser({ email, password }))
      .then(() => {

      })
  }

  render() {
    const { auth } = this.props
    return (
      <div className="loginContainer animated fadeIn">
        <div className="col-12">
          <form className="form" onSubmit={this.handleSubmit}>
            <h1 className='formTitle'>Log In</h1>
            {auth.errorMessage && (
              <>
                <h1>
                  <span className='badge badge-danger badge-lg'>
                    {auth.errorMessage}
                  </span>
                </h1>
                <br></br>
              </>
            )}
            <div className=''>
              <label htmlFor='email'>
                <input
                  required
                  className='form-control useremail'
                  placeholder='Email'
                  type='text'
                  name='email'
                  onChange={this.updateDetails}
                />
              </label>
            </div>
            <div className=''>
              <label htmlFor='password'>
                <input
                  required
                  className='form-control password'
                  placeholder='Password'
                  type='password'
                  name='password'
                  onChange={this.updateDetails}
                />
              </label>
            </div>
            <div className="loginButton">
              <button className='btn custom-button' value='Login' type='submit'>Log In!</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    auth: reduxState.auth,
    userGroups: reduxState.userDetails
  }
}

export default connect(mapStateToProps)(Login)