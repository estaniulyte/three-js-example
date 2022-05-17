import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, TrackballControls } from '@react-three/drei'
// import randomWord from 'random-words'

function Word({ children, ...props }) {
  const color = new THREE.Color()
  const fontProps = { font: '/Inter-Bold.woff', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const over = (e) => (e.stopPropagation(), setHovered(true))
  const out = () => setHovered(false)
  // Change the mouse cursor on hover
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer'
    return () => (document.body.style.cursor = 'auto')
  }, [hovered])
  // Tie component to the render-loop
  useFrame(({ camera }) => {
    // Make text face the camera
    ref.current.quaternion.copy(camera.quaternion)
    // Animate font color
    ref.current.material.color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1)
  })
  return <Text ref={ref} onPointerOver={over} onPointerOut={out} {...props} {...fontProps} children={children} characters="AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789!#+/" />
}

function Cloud({ count = 4, radius = 20 }) {
  // Create a count x count random words with spherical distribution
  const WordsArray = [
      [],
      ["", "Ownership", "Coaching", "", "VueJS", "RCA", "Regressions", "Test Document"],
      ["", "C#", " ", "C++", " ", "QA", "", "Design"],
      ["Agile", "Sprint", " ", "FogBugz", "Retrospective", "Planning", "iOS", "Pull Request"],
      ["Manual Testing", "TestRail", "Feedback", "Design Guidelines", "Performance", " ", " ", "Platforms"],
      ["Unity", "", "Confluence", "Bug Report", "Customers", "Users First", "Android", "Test Plan"],
      ["Mobile", " ", "Feature testing", " ", "GIT", "Release", "Coverage", "Quality"],
      ["Documentation", "Web GL", " ", "Usability", "UI/UX", "", " ", "Test Cases"],
      [" ", "JIRA", "Automation", " ", "JS", "", "Platform", ""],
      ["Tooling", "", " ", "Product", "Testing projects", "Exploratory testing", "", ""],
  ]
  const words = useMemo(() => {
    const temp = ['React', 'Array', "Cat"]
    const spherical = new THREE.Spherical()
    const phiSpan = Math.PI / (count + 1)
    const thetaSpan = (Math.PI * 2) / count
    for (let i = 1; i < count + 1; i++) {
        for (let j = 0; j < count; j++) {
            console.log(i + " : " + j);
            temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), 
                // randomWord()
                WordsArray[i][j]
            ])
        }
    }
      // Taken from https://discourse.threejs.org/t/can-i-place-obects-on-a-sphere-surface-evenly/4773/6
    return temp
  }, [count, radius])
  return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />)
}

export default function WordsSphere() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
      <fog attach="fog" args={['#202025', 0, 80]} />
      <Suspense fallback={null}>
        <Cloud count={8} radius={20} />
        <TrackballControls />
      </Suspense>
    </Canvas>
  )
}
