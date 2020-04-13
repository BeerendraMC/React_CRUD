import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import CustomMuiTable from './shared/MuiTable'

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            editClick: { isClicked: false, id: null },
            items: [],
        };
        this.deleteClickHandler = this.deleteClickHandler.bind(this);
        this.editClickHandler = this.editClickHandler.bind(this);
    }

    componentDidMount() {
        this.getEmployees();
    }

    getEmployees() {
        axios.get("http://localhost:8888/employees")
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data
                    });
                }
            )
            .catch(
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    editClickHandler(id) {
        this.setState({ editClick: { isClicked: true, id } });
    }

    deleteClickHandler(id) {
        axios.delete(`http://localhost:8888/employees/${id}`)
            .then(res => this.getEmployees())
            .catch(err => console.log(err));
    }

    render() {
        const { error, isLoaded, items, editClick } = this.state;
        const cols = [
            { field: 'id', name: 'Id' },
            { field: 'fullname', name: 'Full Name' },
            { field: 'contactPreference', name: 'Contact Preference' },
            { field: 'email', name: 'Email' },
            { field: 'phone', name: 'Phone', align: 'right' },
            { field: 'actions', name: 'Actions', align: 'center', actions: {edit: true, delete: true} },
        ];
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (editClick.isClicked) {
            return <Redirect to={`edit/${editClick.id}`} />;
        } else {
            return (
                <div className="mt-5 mb-5">
                    <CustomMuiTable
                        columns={cols}
                        rows={items}
                        displayHeader={true}
                        scrollable={true}
                        pagination={true}
                        onEditClick={this.editClickHandler}
                        onDeleteClick={this.deleteClickHandler}
                    />
                </div>
            );
        }
    }
}

export default EmployeeList;