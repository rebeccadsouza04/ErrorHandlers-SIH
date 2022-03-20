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
      <div
        style={{
          margin: "auto",
          marginTop: "10vh",
          height: "auto",
          width: "30vw",
          border: "2px solid #eeee",
          padding: "2rem",
        }}
      >
        <p>
          <b>Aadhaar Number: </b>
          {this.state.data.uid}
        </p>
        <p>
          <b>Name: </b>
          {this.state.data.name}
        </p>
        <p>
          <b>Dob: </b>
          {this.state.data.dob}
        </p>
        <p>
          <b>Gender: </b>
          {this.state.data.gender}
        </p>
        <p>
          <b>Phone: </b>
          {this.state.data.phone}
        </p>
        <p>
          <b>Email: </b>
          {this.state.data.email}
        </p>
        <p>
          <b>Street: </b>
          {this.state.data.street}
        </p>
        <p>
          <b>Subdist: </b>
          {this.state.data.subdist}
        </p>
        <p>
          <b>District: </b>
          {this.state.data.district}
        </p>
        <p>
          <b>State: </b>
          {this.state.data.state}
        </p>
        <p>
          <b>Pincode: </b>
          {this.state.data.pincode}
        </p>
        {!this.state.enabled ? (
          <>
            <h3 style={{ color: "lightcoral" }}>MFA Not Enabled</h3>
            <p style={{ fontSize: "14px" }}>
              Enable now for to substitute sms OTP
            </p>
          </>
        ) : (
          "MFA enabled ✔️"
        )}
        {!this.state.enabled ? (
          <button onClick={this.enable}>Enable</button>
        ) : (
          ""
        )}
        {!this.state.enabled ? (
          ""
        ) : (
          <>
            <br></br>
            <img
              style={{ marginTop: "10px" }}
              src="https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=200x200&chld=M|0&cht=qr&chl=otpauth://totp/sih:user@sih.com?secret=5DISDKRC&issuer=sih&algorithm=SHA1&digits=6&period=30"
            ></img>
          </>
        )}
      </div>
    ) : (
      <section className="container">
        <div
          style={{
            margin: "auto",
            marginTop: "10vh",
            height: "auto",
            width: "30vw",
            border: "2px solid #eeee",
            padding: "2rem",
          }}
        >
          <h1 className="large text-primary">Login to myAadhaar</h1>
          <h3 style={{ color: "lightsalmon" }}>
            {this.state.error ? "No such aadhar" : ""}
          </h3>
          <form className="form" onSubmit={this.handleSubmit}>
            <div>
              <div style={{ margin: "2rem" }} className="form-group">
                <input
                  style={{
                    borderRadius: "2px",
                    border: "none",
                    borderBottom: "1px solid black",
                    height: "24px",
                    padding: "5px",
                    width: "20vw",
                  }}
                  type="text"
                  placeholder="Aadhar Number"
                  name="num"
                />
              </div>
              <div style={{ margin: "2rem" }}>
                <OtpInput
                  value={this.state.otp}
                  onChange={this.handleChange}
                  numInputs={6}
                  separator={<span>-</span>}
                />
              </div>
            </div>
            <input
              style={{
                marginLeft: "2rem",
                border: "none",
                height: "24px",
                padding: "5px",
                width: "20vw",
              }}
              type="submit"
              className="btn btn-primary"
            />
          </form>
        </div>
      </section>
    );
  }
}
