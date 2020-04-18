import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";

const styles = {
    root: {
        margin: '20px auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 300,
        width: 400
    }
};

class Login extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.from = this.props.location.state ? this.props.location.state.from : { pathname: "/home" };
    }

    handleChange(e) {
        const stateName = e.target.name;
        this.setState({ [stateName]: e.target.value });
    }

    handleLoginClick(e) {
        e.preventDefault();
        axios.get(`http://localhost:8888/users/${this.state.userid}`)
            .then(res => res.data)
            .then(user => {
                if (user && user.password.toLowerCase() === this.state.password.toLowerCase()) {
                    let userDetails = { id: user.id, name: user.name, role: user.role };
                    localStorage.setItem('userDetails', JSON.stringify(userDetails));
                    alert('Successfully logged in!!');
                    this.props.history.replace(this.from);
                } else {
                    alert('Incorrect userid/password!!')
                }
            })
            .catch(err => {
                console.log(err);
                alert('Incorrect userid/password!!');
            });
    }

    render() {
        if (localStorage.getItem('userDetails')) {
            return <Redirect to="/home" />;
        } else {
            return (
                <form style={styles.root} noValidate autoComplete="off">
                    <TextField
                        type="text"
                        name="userid"
                        id="userid"
                        error={isNaN(this.state.userid)}
                        helperText={isNaN(this.state.userid) ? 'Accepts only numeric values' : ''}
                        label="UserId"
                        variant="outlined"
                        value={this.state.userid}
                        onChange={this.handleChange}
                    />
                    <TextField
                        type="password"
                        name="password"
                        id="password"
                        label="Password"
                        variant="outlined"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!(this.state.userid && this.state.password) || isNaN(this.state.userid)}
                        onClick={this.handleLoginClick}
                    >
                        Login
                    </Button>
                </form>
            );
        }
    }
}

export default withRouter(Login);