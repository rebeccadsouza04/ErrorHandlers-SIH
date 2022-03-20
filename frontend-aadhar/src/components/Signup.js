import React, { Component } from "react";
import OtpInput from "react-otp-input";

export default class Signup extends Component {
  state = { otp: "", data: "", error: false, enabled: false };

  handleChange = (otp) => this.setState({ otp });

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/users/${event.target.elements.num.value}`)
      .then((response) => {
        if (response.status == 404) {
          this.setState({ error: true });
          return;
        }
        return response.json();
      })
      .then((data) => {
        // this.setState({ error: false });
        if (data) {
          // console.log(data[0]);
          this.setState({ data: data[0] });
          // console.log(this.state.data);
        }
      });
  };

  enable = () => this.setState({ enabled: true });

  render() {
    return this.state.data ? (
      <div>
        <h1>{this.state.data.name}</h1>
        <h2>{!this.state.enabled ? "MFA NOT ENABLED" : "MFA ENABLED"}</h2>
        {!this.state.enabled ? (
          <button onClick={this.enable}>Enable</button>
        ) : (
          ""
        )}
        {!this.state.enabled ? (
          ""
        ) : (
          <img src="https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=200x200&chld=M|0&cht=qr&chl=otpauth://totp/sih:user@sih.com?secret=E8D121AA22&issuer=sih&algorithm=SHA1&digits=6&period=30"></img>
        )}
      </div>
    ) : (
      <section className="container">
        <h1 className="large text-primary" style={{ margin: "20px" }}>
          Sign Up
        </h1>
        <h3
          style={{
            margin: "20px",
            color: "red",
          }}
        >
          {this.state.error ? "Error" : ""}
        </h3>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              style={{
                margin: "20px",
              }}
              type="text"
              placeholder="Aadhar Number"
              name="num"
            />
          </div>
          <div
            style={{
              margin: "20px",
            }}
          >
            <OtpInput
              value={this.state.otp}
              onChange={this.handleChange}
              numInputs={6}
              separator={<span>-</span>}
            />
          </div>
          <input
            style={{
              margin: "20px",
            }}
            type="submit"
            className="btn btn-primary"
          />
        </form>
      </section>
    );
  }
}
