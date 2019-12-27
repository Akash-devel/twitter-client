import React, { Component } from "react";
var axios = require("axios");
const STATIC_URL = "https://twitter-server-123.herokuapp.com";
class Twitter extends Component {
  constructor(props) {
    console.log("inside constructor");
    super(props);
    this.state = { user1: "", user2: "", mutualFriends: [] };
    this.infoToShow = <h5>Loading...</h5>;
  }

  componentDidMount() {
    console.log("Inside ComponentDidMount");
    this.infoToShow = <h5>Waiting for Submit...</h5>;
  }

  componentDidUpdate(prevProps, preState) {
    console.log("inside componentDidUpdate");
    this.infoToShow = <h5>Waiting for Submit...</h5>;
  }

  componentWillUnmount() {
    console.log("inside componentWillUnmount");
  }

  async findMututalFriends(event) {
    event.preventDefault();
    try {
      const url = `${STATIC_URL}/friends/mutual/${this.state.user1}/${this.state.user2}`;
      const res = await axios.get(url);
      if (res.data.status && res.data.mutualFriends.length > 0) {
        this.setState({ mutualFriends: res.data.mutualFriends });
      } else {
        if (res.data.message) {
          this.infoToShow = res.data.message;
          this.setState({ mutualFriends: [] });
          return;
        }
        throw new Error();
      }
    } catch (err) {
      this.infoToShow = <h5>No Mutual Friends Found</h5>;
      this.setState({ mutualFriends: [] });
    }
  }

  renderMutualFriendsList() {
    if (this.state.mutualFriends.length === 0) {
      return this.infoToShow;
    }
    return this.state.mutualFriends.map((item, index) => (
      <li key={index} className="list-group-item">
        {item}
      </li>
    ));
  }

  clearInputs() {
    this.infoToShow = <h5>Loading...</h5>;
    this.setState({ user1: "", user2: "", mutualFriends: [] });
  }

  render() {
    console.log("inside render");
    return (
      <React.Fragment>
        <form>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="User 1"
                value={this.state.user1}
                onChange={event => this.setState({ user1: event.target.value })}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="User 2"
                value={this.state.user2}
                onChange={event => this.setState({ user2: event.target.value })}
              />
            </div>
          </div>
          <div className="text-center">
            <div className="btn-group">
              <button
                style={{ width: "10rem", marginTop: "50px" }}
                type="submit"
                className="btn btn-primary"
                onClick={event => this.findMututalFriends(event)}
              >
                Submit
              </button>
              <button
                style={{
                  width: "10rem",
                  marginTop: "50px",
                  marginLeft: "10px"
                }}
                type="button"
                className="btn btn-primary"
                onClick={() => this.clearInputs()}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
        <hr />
        <ul className="list-group" style={{ marginBottom: "50px" }}>
          {this.renderMutualFriendsList()}
        </ul>
      </React.Fragment>
    );
  }
}

export default Twitter;
