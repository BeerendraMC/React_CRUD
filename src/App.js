import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="text-center mt-4">
        <h1>Employee Management</h1>
      </div>
    );
  }
  // render() {
  //   const list = ['Arun', 'Akhil', 'Suman']
  //   return (
  //     <div className="App">
  //       <h1>
  //       {
  //         list.map(x => { 
  //           return (
  //             <div key={x}>{x}</div>
  //             ); })
  //       }
  //       </h1>
  //     </div>
  //   );
  // }
}

export default App;
