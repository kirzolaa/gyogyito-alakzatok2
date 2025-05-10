import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, GradientTexture } from '@react-three/drei';
import SphereShape from './shapes/SphereShape';
import TorusShape from './shapes/TorusShape';
import BoxShape from './shapes/BoxShape';
import ConeShape from './shapes/ConeShape';
import DodecahedronShape from './shapes/DodecahedronShape';
import CaptchaBattle from './CaptchaBattle';

const epicMessages = [
  'wow', 'much wow', 'epic wow', 'epic heal', 'heal +9000', 'gyógyulás +100', 'rainbow power!', 'szivárvány boost', 'ultra epic!', 'legendary!', 'gyógyító energia', '✨✨✨', 'maximum heal', 'full epic', 'gyógyító alakzat!', 'rainbow heal', 'gyógyító szivárvány', 'heal +∞', 'cosmic wow', 'unreal heal', 'epicness overload', 'gyógyító csoda', 'super heal', 'gyógyító fény', 'rainbow heal +1000', 'gyógyító szivárvány', 'rainbow mode', 'epic szivárvány', 'heal +1M', 'gyógyító boost', 'rainbow epic', 'gyógyító szivárvány', 'ultra wow', 'epicness +1000', 'heal +42', 'gyógyító alakzatok', 'rainbow effect', 'epic heal', 'wow', 'much wow', 'epic wow', 'heal +xy'
];

const getRandomEpicMessage = () => epicMessages[Math.floor(Math.random() * epicMessages.length)];

const getRandomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 90%, 60%)`;

const getRandomRainbow = () => {
  let stops = [];
  for (let i = 0; i < 6; i++) {
    stops.push(`hsl(${i * 60}, 100%, 60%)`);
  }
  return `linear-gradient(90deg, ${stops.join(', ')})`;
};

const shapes = [
  { key: 'gomb', name: 'Gömb', component: SphereShape },
  { key: 'torusz', name: 'Tórusz', component: TorusShape },
  { key: 'kocka', name: 'Kocka', component: BoxShape },
  { key: 'kúp', name: 'Kúp', component: ConeShape },
  { key: 'dodekaéder', name: 'Dodekaéder', component: DodecahedronShape },
];

export default function App() {
  const [selected, setSelected] = useState(shapes[0].key);
  const [epicMsg, setEpicMsg] = useState(null);
  const [msgColor, setMsgColor] = useState('#fff');
  const [msgKey, setMsgKey] = useState(0);
  const [route, setRoute] = useState(window.location.pathname);
  const ShapeComponent = shapes.find(s => s.key === selected).component;

  // Routing logic
  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
  };

  // Show message for 1.5s
  const handleEpicClick = () => {
    setEpicMsg(getRandomEpicMessage());
    setMsgColor(getRandomColor());
    setMsgKey(Math.random());
    setTimeout(() => setEpicMsg(null), 1500);
  };

  if (route === '/captcha-battle') {
    return <CaptchaBattle />;
  }

  return (
    <div className="epic-bg" style={{ minHeight: '100vh', position: 'relative', paddingBottom: '110px' }}>
      <header className="header" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 className="epic-heading" style={{ fontSize: '2.5rem', marginBottom: '0.5em' }}>Gyógyitó alakzatok</h1>
        <button
          className="shape-btn epic-btn"
          style={{ marginTop: '0.6em', fontWeight: 'bold', background: 'linear-gradient(90deg,#5a4fff,#ff5afd)', color: '#fff', fontSize: '1.13rem', boxShadow: '0 0 10px #5a4fff88', border: 'none', letterSpacing: '0.05em', cursor: 'pointer' }}
          onClick={() => navigate('/captcha-battle')}
        >
          ⚔️ Epic Captcha Battle (Gyógyitó Kapcsák)
        </button>
      </header>
      <div className="shape-selector">
        {shapes.map(shape => (
          <button
            key={shape.key}
            className={
              'shape-btn epic-btn' + (selected === shape.key ? ' selected' : '')
            }
            onClick={() => setSelected(shape.key)}
          >
            {shape.name}
          </button>
        ))}
      </div>
      <main className="main-3d epic-3d" style={{position:'relative'}}>
        {epicMsg && (
          <div
            key={msgKey}
            className="epic-float-msg"
            style={{
              color: msgColor,
              background: getRandomRainbow(),
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              fontSize: '2.2rem',
              textShadow: '0 0 24px #fff, 0 0 8px #232942',
              position: 'absolute',
              left: '50%',
              top: '12%',
              transform: 'translate(-50%, -30%)',
              zIndex: 20,
              pointerEvents: 'none',
              animation: 'epicMsgAnim 1.5s cubic-bezier(.4,2,.4,1)'
            }}
          >
            {epicMsg}
          </div>
        )}
        <Canvas
          shadows
          camera={{ position: [0, 0, 11], fov: 45 }}
          style={{width: '100%', height: '70vh', maxWidth: '900px', margin: '0 auto'}}
          onPointerMissed={handleEpicClick}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 10, 4]} intensity={1.4} castShadow />
          <Environment preset="sunset" />
          <ShapeComponent onEpicClick={handleEpicClick} enableRainbow={true} />
          <OrbitControls enablePan={false} />
        </Canvas>
      </main>
      <footer className="epic-footer">
        <div style={{fontSize: '1.05rem', marginBottom: '0.3em'}}>
          Bugs brought to you by <a href="https://github.com/kirzolaa" style={{color:'#aaf', textShadow:'0 0 4px #232942'}} target="_blank" rel="noopener noreferrer">Terminalthor</a>
        </div>
        <div className="bemter-footer">Bem tér Solutionz</div>
        <div style={{fontSize: '1.1rem', opacity: 0.8}}>2025</div>
      </footer>
    </div>
  );
}
