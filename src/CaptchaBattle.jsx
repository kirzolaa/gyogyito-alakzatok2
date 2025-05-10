import React, { useState } from 'react';
import './style.css';
import captchaImg from './assets/captcha.jpg';

// Generate an array of random image URLs from Unsplash and Picsum
function getRandomImages(n = 9) {
  const urls = [];
  for (let i = 0; i < n; i++) {
    // Picsum Photos with unique seed for each image
    const seed = `${Date.now()}-${i}-${Math.floor(Math.random() * 1000000)}`;
    urls.push(`https://picsum.photos/seed/${seed}/200/200`);
  }
  return urls;
}


// Epic confetti component
function EpicConfetti({active}) {
  if (!active) return null;
  // Generate 30 confetti pieces with random colors and positions
  const colors = ['#5a4fff','#ff5afd','#ffd700','#00ffe7','#fff'];
  return (
    <div className="confetti">
      {Array.from({length: 30}).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random()*98}%`,
            background: colors[Math.floor(Math.random()*colors.length)],
            animationDelay: `${Math.random()*0.8}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function CaptchaBattle() {
  const [stage, setStage] = useState('start');
  const [msg, setMsg] = useState('');
  const [randomImages, setRandomImages] = useState(getRandomImages());
  const [clickCount, setClickCount] = useState(0);
  const [dodgePositions, setDodgePositions] = useState(Array(9).fill({x:0,y:0}));

  const normalMessages = [
    'Nincs is lámpa! Ez egy igazi epic captcha! 😎',
    'There is no lamp!',
    'No traffic lights here!',
    'Try again! There are no lamps!',
    'Seriously, no lamps!'
  ];
  const epicMessages = [
    'THERE IS NO LAMP!!!!!! CAN YOU NOT UNDERSTAND?',
    'STOP LOOKING FOR LAMPS!!!',
    'NO TRAFFIC LIGHTS EITHER!!!',
    'ABSOLUTELY NO LAMPS PRESENT!!!',
    'READ THE INSTRUCTIONS: NO LAMP!'
  ];

  function handleCaptchaClick() {
    setRandomImages(getRandomImages()); // Refresh random images
    setStage('captcha');
    setMsg('');
    setClickCount(0); // Reset click count for new round
    setDodgePositions(Array(9).fill({x:0,y:0}));
  }

  function handleImageClick() {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        setMsg(epicMessages[Math.floor(Math.random() * epicMessages.length)]);
      } else {
        setMsg(normalMessages[Math.floor(Math.random() * normalMessages.length)]);
      }
      return newCount;
    });
  }

  function handleImageMouseMove(idx) {
    if (clickCount > 5) {
      // Move image to a random position within its cell (max ±30px)
      setDodgePositions(posArr => {
        const newArr = [...posArr];
        newArr[idx] = {
          x: Math.floor(Math.random() * 60) - 30,
          y: Math.floor(Math.random() * 60) - 30
        };
        return newArr;
      });
    }
  }

  return (
    <div className="epic-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <EpicConfetti active={clickCount > 5} />
      <h1 className="epic-heading" style={{ fontSize: '2.5rem', marginBottom: '0.5em' }}>
        Gyógyitó Kapcsák - Epic Captcha Battle
      </h1>
      <div style={{ margin: '2em', padding: '2em', background: 'rgba(40,40,60,0.93)', borderRadius: '2em', boxShadow: '0 0 24px #5a4fff88', color: '#fff', fontSize: '1.3rem', textAlign: 'center', minWidth: 340 }}>
        {stage === 'start' && (
          <>
            <img
              src={captchaImg}
              alt="captcha icon"
              style={{ width: 100, height: 100, margin: '1em auto', display: 'block', filter: 'drop-shadow(0 0 10px #5a4fff88)' }}
              onClick={handleCaptchaClick}
              className="captcha-icon"
            />
            <p style={{ fontWeight: 'bold', fontSize: '1.2em', margin: '1em 0' }}>Kattints a captcha ikonra a kihíváshoz!</p>
          </>
        )}
        {stage === 'captcha' && (
          <>
            <div style={{ fontWeight: 'bold', fontSize: '1.3em', marginBottom: '1.2em', color: '#ffd700', textShadow: '0 0 10px #ff5afd' }}>
              Válaszd ki az összes lámpát a képek közül!
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 90px)',
              gap: '1em',
              justifyContent: 'center',
              marginBottom: '1.2em',
            }}>
              {randomImages.map((img, idx) => (
                <img
                  src={img}
                  alt="not a lamp"
                  key={idx}
                  style={{
                    width: 85, height: 85, borderRadius: 12,
                    boxShadow: '0 0 8px #5a4fff77',
                    cursor: clickCount > 5 ? 'not-allowed' : 'pointer',
                    border: '2px solid #5a4fff', background: '#222',
                    position: clickCount > 5 ? 'relative' : 'static',
                    left: clickCount > 5 ? dodgePositions[idx].x : 0,
                    top: clickCount > 5 ? dodgePositions[idx].y : 0,
                    transition: 'left 0.18s, top 0.18s'
                  }}
                  onClick={clickCount > 5 ? undefined : handleImageClick}
                  onMouseMove={() => handleImageMouseMove(idx)}
                  tabIndex={-1}
                  draggable={false}
                />
              ))}
            </div>
            {msg && <div style={{ color: '#ff5a5a', fontWeight: 'bold', fontSize: '1.1em', marginBottom: '0.7em' }}>{msg}</div>}
            <button className="shape-btn" style={{ marginTop: '0.5em' }} onClick={() => setStage('start')}>
              ⟵ Vissza
            </button>
          </>
        )}
        <a href="/" className="shape-btn" style={{ fontSize: '1.1rem', marginTop: '2em', background: '#5a4fff', color: '#fff', border: 'none', borderRadius: '1.2em', padding: '0.9em 2.1em', textDecoration: 'none', boxShadow: '0 0 12px #5a4fff88', transition: 'background 0.2s' }}>
          ← Back to Shapes
        </a>
      </div>
    </div>
  );
}
