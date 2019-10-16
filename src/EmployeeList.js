import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import CustomMuiTable from './shared/MuiTable'

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
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

    render() {
        const { error, isLoaded, items } = this.state;
        const cols = [
            { field: 'id', name: 'Id' },
            { field: 'fullname', name: 'Full Name' },
            { field: 'contactPreference', name: 'Contact Preference' },
            { field: 'email', name: 'Email' },
            { field: 'phone', name: 'Phone', align: 'right' },
        ];
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                // <div className="container mt-5">
                //     <Table striped bordered hover size="sm">
                //         <thead>
                //             <tr><th colSpan="6"><h3 className="text-center">Employee Details</h3></th></tr>
                //             <tr>
                //                 <th>Id</th>
                //                 <th>Name</th>
                //                 <th>Contact Preference</th>
                //                 <th>Email</th>
                //                 <th>Phone</th>
                //                 {/* <th>Skills</th> */}
                //             </tr>
                //         </thead>
                //         <tbody>
                //             {items.map(item => (
                //                 <tr key={item.id}>
                //                     <td>{item.id}</td>
                //                     <td>{item.fullname}</td>
                //                     <td>{item.contactPreference}</td>
                //                     <td>{item.email}</td>
                //                     <td>{item.phone}</td>
                //                 </tr>
                //             ))}
                //         </tbody>
                //     </Table>
                // </div>
                <div className="mt-5 mb-5"><CustomMuiTable columns={cols} rows={items} displayHeader={true} scrollable={true} pagination={true}></CustomMuiTable></div>
            );
        }
    }
}

export default EmployeeList;