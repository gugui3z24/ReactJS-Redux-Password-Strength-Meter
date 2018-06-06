import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showModal } from '../actions/modal-actions';
import generator from 'random-password';

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirm: '',
            match: true,
            hasNumber: false,
            hasUpper: false,
            hasLower: false,
            hasSpecial: false,
            progressClass: 'bg-danger',
            progress: 0
        }
        this.onChange = this.onChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    resetForm() {
        this.setState({
            password: '',
            confirm: '',
            match: true,
            hasNumber: false,
            hasUpper: false,
            hasLower: false,
            hasSpecial: false
        }, this.validateForm);
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.showModal(true);
    }

    validateForm() {
        this.setState({
            'match': this.state.password === this.state.confirm,
            'hasNumber': this.hasNumber(this.state.password),
            'hasUpper': this.hasUpper(this.state.password),
            'hasLower': this.hasLower(this.state.password),
            'hasSpecial': this.hasSpecial(this.state.password)
        }, this.getPasswordStrength);
    }

    onKeyUp(event) {
        this.validateForm();
    }

    hasNumber(value) {
        return value.match(/\d+/g) != null;
    }

    hasUpper(value) {
        return value.match(/[A-Z]+/g) != null;
    }

    hasLower(value) {
        return value.match(/[a-z]+/g) != null;
    }

    hasSpecial(value) {
        // eslint-disable-next-line
        const exp = new RegExp(/[\~\`\!\@\#\$\%\^\&\*\(\)\-\=\[\]\'\;\\\/\.\,\<\>\?\:\"\{\}\+\_\"]+/g);
        return value.match(exp) != null;
    }

    formIsValid() {
        return this.state.hasLower &&
            this.state.hasNumber &&
            this.state.hasSpecial &&
            this.state.hasUpper &&
            this.state.match;
    }

    getPasswordStrength() {
        let progress = 0;
        if (this.state.hasUpper) {
            progress += 20;
        }

        if (this.state.hasLower) {
            progress += 20;
        }

        if (this.state.hasNumber) {
            progress += 20;
        }

        if (this.state.hasSpecial) {
            progress += 20;
        }

        if (this.state.password.length > 10) {
            progress += 20;
        }

        switch (progress) {
            case 40:
                this.setState({ 'progressClass': 'bg-warning' });
                break;
            case 60:
                this.setState({ 'progressClass': 'bg-info' });
                break;
            case 80:
                this.setState({ 'progressClass': 'bg-info' });
                break;
            case 100:
                this.setState({ 'progressClass': 'bg-success' });
                break;
            default:
                this.setState({ 'progressClass': 'bg-danger' });
                break;
        }
        this.setState({ 'progress': progress });
    }

    generateRandomPassword() {
        let password = generator(20);
        let isStrong;
        while (!isStrong) {
            if (this.hasLower(password) && this.hasUpper(password) && this.hasNumber(password) && this.hasSpecial(password)) {
                isStrong = true;
            } else {
                password = generator(20);
            }
        }
        this.setState({
            'password': password,
            'confirm': password
        }, this.validateForm);
    }

    togglePasswordVisibility(fieldName) {
        if (document.getElementById(fieldName).type === 'text') {
            document.getElementById(fieldName).type = 'password';
            document.getElementById(`${fieldName}-show-icon`).className = 'show-hide-icon far fa-eye';
        } else {
            document.getElementById(fieldName).type = 'text';
            document.getElementById(`${fieldName}-show-icon`).className = 'show-hide-icon far fa-eye-slash';
        }
    }

    render() {
        return (
            <div>
                <h1>Password Confirmation</h1>
                <div id="password-container" className="d-flex mt-5">
                    <div className="mr-5 text-left w-50">
                        <form id="form" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Password</label>
                                <div className="d-flex align-items-baseline">
                                    <input
                                        maxLength="40"
                                        style={{ minWidth: '260px' }}
                                        onKeyUp={this.onKeyUp}
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        aria-describedby="passwordHelp"
                                        placeholder="Enter password" />
                                    <i
                                        title="Show/Hide"
                                        id="password-show-icon"
                                        onClick={() => { this.togglePasswordVisibility('password') }}
                                        className="show-hide-icon far fa-eye"></i>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Confirm</label>
                                <div className="d-flex align-items-baseline">
                                    <input
                                        maxLength="40"
                                        onKeyUp={this.onKeyUp}
                                        value={this.state.confirm}
                                        type="password"
                                        name="confirm"
                                        style={{ minWidth: '260px' }}
                                        onChange={this.onChange}
                                        className="form-control"
                                        id="confirm"
                                        placeholder="Confirm Password" />
                                    <i
                                        title="Show/Hide"
                                        id="confirm-show-icon"
                                        onClick={() => { this.togglePasswordVisibility('confirm') }}
                                        className="show-hide-icon far fa-eye"></i>
                                </div>
                            </div>
                            <button disabled={!this.formIsValid()} type="submit" className="btn btn-info mr-1 mb-2">Submit</button>
                            <button onClick={this.resetForm} type="button" className="btn btn-outline-info mr-1 mb-2">Reset</button>
                            <button type="button" className="btn btn-danger mb-2" onClick={() => { this.generateRandomPassword() }}>Generate Random</button>
                        </form>
                    </div>
                    <div className="text-left w-50">
                        <ul className="list-group" style={{ minWidth: '255px' }}>
                            <li className="list-group-item">
                                <i
                                    style={this.state.match ? { color: 'green' } : { color: 'red' }}
                                    className={"far mr-2 " + (this.state.match ? 'fa-check-circle' : 'fa-times-circle')}>
                                </i>
                                Passwords match
                            </li>
                            <li className="list-group-item">
                                <i
                                    style={this.state.hasNumber ? { color: 'green' } : { color: 'red' }}
                                    className={"far mr-2 " + (this.state.hasNumber ? 'fa-check-circle' : 'fa-times-circle')}>
                                </i>
                                Has number
                            </li>
                            <li className="list-group-item">
                                <i
                                    style={this.state.hasUpper ? { color: 'green' } : { color: 'red' }}
                                    className={"far mr-2 " + (this.state.hasUpper ? 'fa-check-circle' : 'fa-times-circle')}>
                                </i>
                                Has uppercase
                            </li>
                            <li className="list-group-item">
                                <i
                                    style={this.state.hasLower ? { color: 'green' } : { color: 'red' }}
                                    className={"far mr-2 " + (this.state.hasLower ? 'fa-check-circle' : 'fa-times-circle')}>
                                </i>
                                Has lowercase
                            </li>
                            <li className="list-group-item">
                                <i
                                    style={this.state.hasSpecial ? { color: 'green' } : { color: 'red' }}
                                    className={"far mr-2 " + (this.state.hasSpecial ? 'fa-check-circle' : 'fa-times-circle')}>
                                </i>
                                Has special character
                            </li>
                        </ul>
                        <div className="mt-2">Password Strength:</div>
                        <div className="progress mt-2">
                            <div
                                className={"progress-bar " + this.state.progressClass}
                                role="progressbar"
                                aria-valuenow="75"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: this.state.progress + '%' }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Password.propTypes = {
    showModal: PropTypes.func.isRequired,
}

export default connect(null, { showModal })(Password);