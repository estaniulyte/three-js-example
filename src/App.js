import React, { Suspense } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import './App.css';
import Box from './components/Box';
import Sphere from './components/AnimatedSphere';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://threejs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn ThreeJS
        </a>
        <Canvas className="canvas">
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} intensity={1} />
          <Suspense fallback={null}>
            <Box />
          </Suspense>
        </Canvas>
        <Canvas className="canvas">
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} intensity={1} />
          <Suspense fallback={null}>
            <Sphere />
          </Suspense>
        </Canvas>
      </header>
    </div>
  );
}

export default App;
