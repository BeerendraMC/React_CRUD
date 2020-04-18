import React from 'react'

export default function Home() {
    return (
        <div className="text-center mt-4">
            <h1>Employee Management</h1>
            <h4>You are an {JSON.parse(localStorage.getItem('userDetails')).role}</h4>
        </div>
    );
}
