import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
  }

  searchinput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitSearch = () => {
    this.props.searchKey(this.state.search)
  }

  render() {
    return (
      <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" name="search" onChange={this.searchinput} placeholder="Search" aria-label="Search"/>
        <button onClick={this.submitSearch} className="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
      </form>
    )
  }
};

export default Search