🚀 Como Executar o Projeto
1. Pré-requisitos
Ter o Node.js instalado em sua máquina.

Estar conectado na mesma rede Wi-Fi da antena Starlink (ou em uma sub-rede sob a faixa 192.168.1.X).

Certificar-se de que o arquivo de modelo starlink.glb está presente dentro do diretório vizualizador-front/public/.

2. Configurando e Rodando o Backend
Abra um terminal na pasta raiz do projeto (VIZUALIZADOR STARLINK/):

Instale as dependências do servidor:

Bash
npm install
O arquivo .env já está configurado na porta 3000. Inicie o servidor:

Bash
npm start
(Ou execute diretamente node server.js). O terminal deverá exibir: 🚀 Proxy da Starlink rodando em http://localhost:3000.

3. Rodando o Frontend
Abra um segundo terminal (mantenha o do backend rodando) e navegue até a pasta do cliente:

Entre no diretório do frontend:

Bash
cd vizualizador-front
Instale as dependências de interface e 3D:

Bash
npm install
Execute o servidor do Vite expondo-o para a rede local:

Bash
npm run dev -- --host
O terminal do Vite fornecerá o endereço da sua rede local (ex: http://192.168.1.50:5173/). Abra este link no navegador do seu computador ou smartphone!

⚙️ Detalhes Importantes de Sincronização
Porta Integrada (3000): O arquivo App.jsx do frontend foi configurado com a constante de porta fixa const PORT = 3000;. Isso garante o alinhamento perfeito com o server.js do backend, evitando falhas de comunicação (Erro no fetch) ou problemas com o gerenciamento de variáveis de ambiente do Vite.

Controle de Acesso por IP: O backend restringe o acesso por segurança. Se você acessar o frontend a partir de um dispositivo cujo IP não comece com 192.168.1. (ou não seja localhost), a interface exibirá automaticamente a tela de Acesso Negado. Caso sua rede local utilize outra faixa (como 10.0.0.X ou 192.168.0.X), você deve atualizar a condicional do middleware de IP no arquivo server.js.
"""

with open("README.md", "w", encoding="utf-8") as f:
f.write(markdown_content)

print("README.md gerado com sucesso.")

Seu arquivo MD está pronto
[file-tag: code-generated-file-0-1781137401639160059]

Aqui está a documentação reescrita e adaptada, já considerando que você fixou a porta como `3000` no código. O aviso de erro de porta foi removido e a parte de execução local está simplificada e mais direta! 

Abaixo, você também pode visualizar como o texto do `README.md` ficou:

```markdown
# 📡 Visualizador de Alinhamento Starlink

Um sistema completo (Frontend em React 3D e Backend em Node.js) para visualizar em tempo real a telemetria e o alinhamento da sua antena Starlink. 

O sistema renderiza um modelo 3D da antena e exibe um "fantasma" (holograma) que representa a posição ideal. O objetivo é girar e inclinar a antena física até que ela se alinhe perfeitamente com o fantasma projetado na tela.

---

## ✨ Funcionalidades

- **Visualização 3D em Tempo Real:** Representação fiel da antena utilizando `@react-three/fiber` e carregamento de modelos `.glb`.
- **Guia de Alinhamento (Fantasma):** Renderiza uma réplica translúcida azul indicando o azimute e a elevação exatos desejados pela Starlink.
- **Painel de Telemetria Integrado:** Exibe os ângulos em tempo real de inclinação e azimute com atualizações a cada 100ms.
- **Detecção de Obstrução:** Alerta em tempo real na interface caso a antena informe bloqueios físicos no sinal (árvores, telhados, etc.).
- **Filtro de Segurança de Rede (IP):** O backend possui um middleware de segurança que bloqueia requisições vindas de fora da rede local (permitindo apenas a faixa `192.168.1.X`, `localhost` ou `::1`).
- **Tela de Bloqueio Automática:** Se um dispositivo de fora da rede permitida tentar acessar a aplicação, o frontend exibe uma tela absoluta de "Acesso Negado".

---

## 🛠️ Tecnologias Utilizadas

**Frontend (`/vizualizador-front`):**
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) (Build rápido e hot-reload)
- [React Three Fiber (R3F)](https://docs.pmnd.rs/react-three-fiber/) & [Drei](https://github.com/pmndrs/drei) (Para renderização de gráficos 3D no navegador)
- CSS3 (Interface moderna com efeito Glassmorphism)

**Backend (Raiz do Projeto):**
- [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/)
- `@gibme/starlink` (Biblioteca para comunicação gRPC direta com o IP nativo da antena Starlink)
- `cors` & `dotenv`

---

## 📁 Estrutura do Projeto

A estrutura de pastas está organizada da seguinte forma:

```text
VIZUALIZADOR STARLINK/
├── vizualizador-front/       # Aplicação React (Frontend)
│   ├── public/
│   │   └── starlink.glb      # Modelo 3D da antena (carregado via useGLTF)
│   ├── src/
│   │   ├── App.jsx           # Componente principal, controle de estados e requisições HTTP
│   │   ├── StarlinkDish.jsx  # Componente 3D que renderiza a antena física e a fantasma
│   │   ├── main.jsx          # Ponto de entrada do React
│   │   └── index.css         # Estilizações globais e reset de tela
│   ├── package.json          # Scripts e dependências do Frontend
│   └── vite.config.js        # Configurações do Vite
├── server.js                 # Servidor Express (Backend / Proxy gRPC da Starlink)
├── package.json              # Scripts e dependências do Backend
└── .env                      # Configuração de variáveis do servidor (Porta)
🚀 Como Executar o Projeto
1. Pré-requisitos
Ter o Node.js instalado em sua máquina.

Estar conectado na mesma rede Wi-Fi da antena Starlink (ou em uma sub-rede sob a faixa 192.168.1.X).

Certificar-se de que o arquivo de modelo starlink.glb está presente dentro do diretório vizualizador-front/public/.

2. Configurando e Rodando o Backend
Abra um terminal na pasta raiz do projeto (VIZUALIZADOR STARLINK/):

Instale as dependências do servidor:

Bash
npm install
O arquivo .env já está configurado na porta 3000. Inicie o servidor:

Bash
npm start
(Ou execute diretamente node server.js). O terminal deverá exibir: 🚀 Proxy da Starlink rodando em http://localhost:3000.

3. Rodando o Frontend
Abra um segundo terminal (mantenha o do backend rodando) e navegue até a pasta do cliente:

Entre no diretório do frontend:

Bash
cd vizualizador-front
Instale as dependências de interface e 3D:

Bash
npm install
Execute o servidor do Vite expondo-o para a rede local:

Bash
npm run dev -- --host
O terminal do Vite fornecerá o endereço da sua rede local (ex: http://192.168.1.50:5173/). Abra este link no navegador do seu computador ou smartphone!

⚙️ Detalhes Importantes de Sincronização
Porta Integrada (3000): O arquivo App.jsx do frontend foi configurado com a constante de porta fixa const PORT = 3000;. Isso garante o alinhamento perfeito com o server.js do backend, garantindo assim que a telemetria não falhe.

Controle de Acesso por IP: O backend restringe o acesso por segurança. Se você acessar o frontend a partir de um dispositivo cujo IP não comece com 192.168.1. (ou não seja localhost), a interface exibirá automaticamente a tela de Acesso Negado. Caso sua rede local utilize outra faixa (como 10.0.0.X ou 192.168.0.X), você deve atualizar a condicional do middleware de IP no arquivo server.js.