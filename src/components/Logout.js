import React from 'react'
import { Redirect } from "react-router-dom";
import Layout from './Layout'

class Logout extends React.Component {
  componentDidMount() {
    window.localStorage.removeItem('jwt')
  }

  render() {
    return (
        <Layout>
            <Redirect to='/'/>
        </Layout>
    )
  }
}

export default Logout;