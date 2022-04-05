import logo from './logo.svg';

import { Canvas } from '@react-three/fiber';

import './App.css';
import Box from './components/Box';

function App() {
  return (
    <div className="App">
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
        <Canvas>
          <Box />
        </Canvas>
      </header>
    </div>
  );
}

export default App;
