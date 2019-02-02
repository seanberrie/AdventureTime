import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

export default class Profile extends Component {
   state = {
      user:null
   }
    componentDidMount() { 
     axios.get(`/api/users/${this.props.currentUser._id}`)
        .then( res => {
          this.setState({user:res.data.payload})
        });
    }

    handleDelete = (e) => {
      e.preventDefault()
      axios.delete(`/api/users/${this.props.currentUser._id}/cities/${e.target.title}`)
      .then( res => {
        this.setState({ user:res.data.updatedUser })
      }

      )
    }
    render () {
    let {user} = this.state
    if (user) {
        return (
        <div className="hero">
          <div>
            <h1>Adventure Time</h1>
            <div>
            <Link className="addCity" to='/profile/city'>Add A City Here!</Link>
            </div>
            {user.cities.map((city, index) => {
              return (
            <div key={index} className="cityBox">
            <div>
              <form onSubmit={this.handleDelete} title={city._id}>
                  <p key={index}>{city.city}, {city.country}</p>
                <input type='hidden' value={city._id} />
                <input className="btn" value="delete" type="submit"/>
              </form>
              <Link to={{ pathname:'/profile/place', state:{user: user.city._id} }}>Add A Place Here!</Link>
              </div>
            </div>
             ) })}
          </div>
        </div>
      ) } else {
        return (
          <div>
            <h1>Adventure Time</h1>
            <Link to='/profile/city'>City</Link>
          </div>
          )
      }
  }
  
}
