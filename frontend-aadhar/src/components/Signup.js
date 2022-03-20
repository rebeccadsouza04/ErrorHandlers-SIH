import React, {Component} from 'react'
import OtpInput from 'react-otp-input';

export default class Signup extends Component  {

    state = { otp: '' };

    handleChange = (otp) => this.setState({ otp });

    render() {
    return (
        <section className="container">
            <h1 className="large text-primary" >Sign Up</h1>
            <form className="form">
                <div className="form-group">
                    <input
                    style={{
                        margin: '20px',
                    }}
                        type="text"
                        placeholder="Aadhar Number"
                        name="name"
                    />
                </div>
                <div style={{
                        margin: '20px',
                    }}>
                <OtpInput
                    value={this.state.otp}
                    onChange={this.handleChange}
                    numInputs={6}
                    separator={<span>-</span>}
                />
                </div>
                <input style={{
                        margin: '20px',
                    }} type="submit" className="btn btn-primary" />
            </form>
        </section>
    );
    }
}