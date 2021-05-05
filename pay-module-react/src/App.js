import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import web2decentorage from './web2decentorage';
import { Component } from 'react';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = { manager: ''};
  };

  async componentDidMount() {
    //const manager = await web2decentorage.methods.getDecentorage().call();

    //console.log(manager);

    //this.setState({ manager });
  }

  render() {
    console.log(web2decentorage.methods.getDecentorage());
    web3.eth.getAccounts().then(console.log); //can't use await here we use then instead
    return (
      <div>
        <h2>web2decentorage Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
      </div>
    )
  };
};

export default App;
