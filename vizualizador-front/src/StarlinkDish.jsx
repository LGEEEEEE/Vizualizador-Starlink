import React, { useRef } from 'react';
import { useGLTF, Clone } from '@react-three/drei';

export default function StarlinkDish({ tiltDeg, rotationDeg, isGhost }) {
  const groupRef = useRef();
  
  // R3F vai buscar o arquivo na pasta public automaticamente
  const { scene } = useGLTF('/starlink.glb'); 

  const tiltRad = tiltDeg * (Math.PI / 180);
  const rotationRad = rotationDeg * (Math.PI / 180);

  return (
    <group ref={groupRef} rotation={[tiltRad, rotationRad, 0, 'YXZ']}>
      
      {/* O Componente Clone permite duplicar o modelo e sobrescrever os materiais */}
      {isGhost ? (
        // ANTENA ALVO (FANTASMA): Injetamos o material de "holograma"
        <Clone 
          object={scene} 
          scale={0.15} // Encolhendo o modelo gigante
          inject={<meshStandardMaterial color="#00aaff" transparent opacity={0.3} roughness={0.2} />}
        />
      ) : (
        // ANTENA REAL: Renderiza normal com as cores/texturas que vieram no .glb
        <Clone 
          object={scene} 
          scale={0.15} 
        />
      )}
      
    </group>
  );
}

// Isso faz o navegador já ir baixando o modelo antes mesmo de precisar usar, tira o lag inicial!
useGLTF.preload('/starlink.glb');