import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import StarlinkDish from './StarlinkDish';
import './index.css';

function App() {
  const [telemetria, setTelemetria] = useState({
    tiltAngle: 0,
    rotationAngle: 0,
    targetTilt: 0,
    targetRotation: 0,
    obstructed: false,
  });

  // Novo estado para controlar a tela de bloqueio
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);

  const PORT = 3000;

  useEffect(() => {
    const host = window.location.hostname;
    const apiUrl = `http://${host}:${PORT}/api/starlink-status`;

    const interval = setInterval(() => {
      fetch(apiUrl)
        .then(async (res) => {
          // Se o Node.js barrou o IP (Status 403 Forbidden)
          if (res.status === 403) {
            setIsWrongNetwork(true);
            throw new Error("wrong_network");
          }
          // Se passou, garante que a tela de erro some
          setIsWrongNetwork(false);
          return res.json();
        })
        .then((data) => setTelemetria(data))
        .catch((err) => {
          // Só ignora no console se o erro for proposital do bloqueio de rede
          if (err.message !== "wrong_network") console.error("Erro no fetch:", err);
        });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  // Se o IP for inválido, exibe a tela de bloqueio absoluta por cima de tudo
  if (isWrongNetwork) {
    return (
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0a0a0c', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{
          backgroundColor: 'rgba(255, 30, 30, 0.1)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '20px', padding: '40px', border: '1px solid rgba(255, 50, 50, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(255, 0, 0, 0.2)', color: 'white', textAlign: 'center', maxWidth: '400px'
        }}>
          <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0' }}>📡</h1>
          <h2 style={{ color: '#ff4444', margin: '0 0 15px 0' }}>Acesso Negado</h2>
          <p style={{ color: '#cccccc', lineHeight: '1.5' }}>
            Seu dispositivo não está na rede correta. Conecte-se ao <strong>Wi-Fi da Starlink</strong> para acessar o painel de alinhamento.
          </p>
        </div>
      </div>
    );
  }

  // --- O CÓDIGO NORMAL DA APLICAÇÃO CONTINUA AQUI ---
  const diffTilt = Math.abs(telemetria.tiltAngle - telemetria.targetTilt);
  const diffRotation = Math.abs(telemetria.rotationAngle - telemetria.targetRotation);
  const isAligned = diffTilt <= 3 && diffRotation <= 3;

  const visualTilt = isAligned ? telemetria.targetTilt : telemetria.tiltAngle;
  const visualRotation = isAligned ? telemetria.targetRotation : telemetria.rotationAngle;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)',
        width: '90%', maxWidth: '500px', backgroundColor: 'rgba(20, 20, 20, 0.6)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '20px', 
        padding: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)', 
        zIndex: 10, color: 'white', textAlign: 'center', fontFamily: 'system-ui, sans-serif'
      }}>
        <h1 style={{ margin: '0 0 15px 0', fontSize: '1.5rem', fontWeight: '600', letterSpacing: '1px' }}>STARLINK ALIGNMENT</h1>
        
        <div style={{
          backgroundColor: isAligned ? 'rgba(0, 255, 100, 0.2)' : 'rgba(255, 180, 0, 0.2)',
          color: isAligned ? '#4aff80' : '#ffc44a', padding: '12px', borderRadius: '12px',
          fontWeight: 'bold', fontSize: '1.1rem', transition: 'all 0.3s ease'
        }}>
          {isAligned ? "✅ ALINHAMENTO PERFEITO" : "↻ GIRE PARA ENCAIXAR NO FANTASMA"}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px', fontSize: '0.9rem', color: '#aaaaaa' }}>
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Inclinação</div>
            <div style={{ color: 'white', fontWeight: 'bold' }}>{telemetria.tiltAngle.toFixed(1)}°</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Azimute</div>
            <div style={{ color: 'white', fontWeight: 'bold' }}>{telemetria.rotationAngle.toFixed(1)}°</div>
          </div>
        </div>

        {telemetria.obstructed && (
          <div style={{ marginTop: '15px', backgroundColor: '#ff4444', color: 'white', padding: '10px', borderRadius: '8px', fontWeight: 'bold' }}>
            🛑 OBSTRUÇÃO DETECTADA!
          </div>
        )}
      </div>

      <Canvas camera={{ position: [0, 2, 7], fov: 45 }} style={{ width: '100%', height: '100%' }}>
        <color attach="background" args={['#0a0a0c']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
        <Environment preset="night" />

        <Suspense fallback={null}>
          <StarlinkDish tiltDeg={telemetria.targetTilt} rotationDeg={telemetria.targetRotation} isGhost={true} />
          <StarlinkDish tiltDeg={visualTilt} rotationDeg={visualRotation} isGhost={false} />
        </Suspense>

        <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        <OrbitControls makeDefault enableDamping={true} minPolarAngle={0} maxPolarAngle={Math.PI / 2 + 0.1} />
      </Canvas>
    </div>
  );
}

export default App;