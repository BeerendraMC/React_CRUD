import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import MuiCSSOverride from './Mui.css.override';

class CreateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            contactPreference: '',
            email: '',
            phone: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
        const stateName = e.target.name;
        this.setState({ [stateName]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = this.state;
        axios.post("http://localhost:8888/employees", obj)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        let title = 'Create Employee';
        return (
            <div className="container">
                <div className="card mt-5 mb-5">
                    <div className="card-header"><h3>{title}</h3></div>
                    <div className="card-body">
                        <form >
                            <div className="form-group row">
                                <label className="col-md-4 text-right">Name</label>
                                <div className="col-md-5">
                                    <InputComponent name="fullname" className="form-control" placeholder="Enter Employee Name"
                                        value={this.state.fullname} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-4 text-right">Contact Preference</label>
                                <div className="col-md-5">
                                    <div className="form-control">
                                        <div className="form-check-inline">
                                            <label className="form-check-label">
                                                <InputComponent type="radio" className="form-check-input" value="phone" checked={this.state.contactPreference === 'phone'}
                                                    name="contactPreference" onChange={this.handleChange} />Phone
                                            </label>
                                        </div>
                                        <div className="form-check-inline">
                                            <label className="form-check-label">
                                                <InputComponent type="radio" className="form-check-input" value="email" checked={this.state.contactPreference === 'email'}
                                                    name="contactPreference" onChange={this.handleChange} />Email
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-4 text-right">Email</label>
                                <div className="col-md-5">
                                    <InputComponent type="email" name="email" className="form-control" placeholder="Enter Employee Email"
                                        value={this.state.email} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-4 text-right">Phone</label>
                                <div className="col-md-5">
                                    <InputComponent type="text" name="phone" className="form-control" placeholder="Enter Employee Phone"
                                        value={this.state.phone} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-md-12 text-center">
                                    <InputComponent type="submit" className="btn btn-primary btn-sm" value="Submit" onClick={this.onSubmit} />
                                </div>
                            </div>
                <MuiCSSOverride></MuiCSSOverride>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

class InputComponent extends Component {
    static propTypes = {
        type: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        checked: PropTypes.bool,
        className: PropTypes.string,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        onClick: PropTypes.func
    };

    static defaultProps = {
        type: 'text',
        name: '',
        value: '',
        placeholder: '',
        checked: false,
        className: '',
        required: false,
        disabled: false,
        onChange: () => { },
        onClick: () => { }
    };

    render() {
        return (
            <input type={this.props.type} className={this.props.className} name={this.props.name} value={this.props.value}
                placeholder={this.props.placeholder} required={this.props.required} disabled={this.props.disabled}
                onChange={this.props.onChange} checked={this.props.checked} onClick={this.props.onClick} />
        )
    }
}

export default CreateEmployee;