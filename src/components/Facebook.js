import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import { FACEBOOK_APP_ID, BACKEND_FB_LOGIN_URL } from '../config'

export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: '',
  }

  responseFacebook = response => {
    console.log(response)

    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    })

    fetch(
      `${BACKEND_FB_LOGIN_URL}`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: response,
        }),
      }
    )

  }

  componentClicked = () => {
    console.log("clocked!")
  }

  render() {
    const fbContent = (<FacebookLogin
      appId={`${FACEBOOK_APP_ID}`}
      autoLoad={true}
      fields="name,email,picture"
      onClick={this.componentClicked}
      callback={this.responseFacebook} />)
    let loginInfo

    if(this.state.isLoggedIn) {
      loginInfo = (
        <div style={{
          width: '400px',
          margin: 'auto',
          background: '#f4f4f4',
          padding: '20px'
        }}>
          <img src={this.state.picture} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
        </div>
      )
    } else {
      loginInfo = null
    }

    return (
      <div>
        {loginInfo}
        {fbContent}
      </div>
    )
  }
}
