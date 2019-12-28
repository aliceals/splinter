import React from 'react'
import { registerUserRequest } from '../actions/signUp'
import { loginError } from '../actions/login'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    }
  }


  componentDidMount() {
    this.props.dispatch(loginError(''))
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submit = (e) => {
    e.preventDefault()
    e.target.reset()
    if (this.state.confirm_password != this.state.password) return this.props.dispatch(loginError("Passwords don't match"))
    this.props.dispatch(registerUserRequest(this.state))
  }

  render() {
    const { auth } = this.props
    return (

      <div className="registerContainer animated fadeIn col-12">

        <form className="form" onSubmit={this.submit}>

          <h1 className='formTitle'>Sign up to Splinter</h1>
          <h5 className='signUpMessage'>Already signed up?? <Link to='/login'>Log In</Link></h5>

          {auth.errorMessage && <><h1><span className="badge badge-danger badge-lg">{auth.errorMessage}</span></h1><br></br></>}

          <div className="justify-content-center">
            <input required className="form-control first" placeholder="First Name" type="text" name="first_name" onChange={this.handleChange} />
          </div>

          <div className="justify-content-center">
            <input required className="form-control last" placeholder="Last Name" type="text" name="last_name" onChange={this.handleChange} />
          </div>

          <div className="justify-content-center">
            <input required className="form-control email" placeholder="Email" type="text" name="email" onChange={this.handleChange} />
          </div>

          <div className="justify-content-center">
            <input required className="form-control password1" placeholder="Password" type="password" name="password" onChange={this.handleChange} />
          </div>

          <div className="justify-content-center">
            <input required className="form-control password2" placeholder="Confirm Password" type="password" name="confirm_password" onChange={this.handleChange} />
          </div>

          <div className="registerButton">
            <button className="btn custom-button submit" value="Register" type="submit">Sign up!</button>
          </div>

        </form>
      </div>
    )
  }
}



const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(SignUp)

