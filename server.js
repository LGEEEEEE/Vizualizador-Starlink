const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { Dishy } = require('@gibme/starlink/dishy');

const dishy = new Dishy();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// 🛡️ O "Leão de Chácara": Middleware de Verificação de IP
app.use('/api', (req, res, next) => {
    // Puxa o IP de quem está acessando (pode vir puro ou com prefixo IPv6)
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Regra de Ouro: Libera localhost (seu PC) OU qualquer dispositivo na rede 192.168.1.X
    if (clientIp.includes('192.168.1.') || clientIp.includes('127.0.0.1') || clientIp === '::1') {
        next(); // Pode passar!
    } else {
        console.log(`🚫 Acesso bloqueado. IP Fora da Rede: ${clientIp}`);
        // Retorna status 403 (Proibido) e quebra a requisição
        res.status(403).json({ error: "wrong_network", message: "Necessário conexão com o Wi-Fi da Starlink." });
    }
});

app.get('/api/starlink-status', async (req, res) => {
    try {
        const status = await dishy.fetch_diagnostics();

        const telemetria = {
            tiltAngle: status.alignmentStats.boresightElevationDeg,
            rotationAngle: status.alignmentStats.boresightAzimuthDeg,
            targetTilt: status.alignmentStats.desiredBoresightElevationDeg,
            targetRotation: status.alignmentStats.desiredBoresightAzimuthDeg,
            obstructed: status.alerts.obstructed
        };

        res.status(200).json(telemetria);
    } catch (error) {
        console.error("Erro ao puxar dados da antena:", error);
        res.status(500).json({ error: "Falha na comunicação gRPC com a Starlink" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Proxy da Starlink rodando em http://localhost:${PORT}`);
});