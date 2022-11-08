import logo from './logo.svg';
import './App.css';
import NavigationBar from "./Components/NavigationBar";
import Banner from "./Components/Banner";

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Banner/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
