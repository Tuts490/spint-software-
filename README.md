# 🛡️ ProactiveGuard - Segurança Industrial Proativa com IA

**ProactiveGuard** é uma solução inovadora de segurança industrial que substitui o modelo punitivo-tradicional por um sistema de **monitoramento contínuo baseado em Inteligência Artificial**. O sistema é capaz de detectar riscos em tempo real, emitir alertas preventivos e promover uma cultura de prevenção antes da infração ocorrer.

Desenvolvido para o contexto do **Metaindústria**, o sistema atua como uma **ferramenta operacional de campo** integrada à lógica de segurança proativa do chão de fábrica.

---

## 👥 Equipe

| Nome | RM |
|------|-------|
| **Arthur Augutus Sariva Pereira** | 555106 |
| **André Bartolo Pellegrino dos Santos** | 558319 |

---

## 🎯 O Problema e a Proposta de Solução

**O Problema:** Ainda é comum vermos acidentes nas fábricas por falta de equipamentos de proteção ou atitudes arriscadas. A questão não é só o descumprimento das normas, mas sim as pessoas – o cansaço, a necessidade de produzir mais rápido e a falta de atenção. As soluções atuais agem de forma reativa (após o acidente).

**A Solução:** Criamos um sistema que entende como o trabalhador costuma agir e identifica sinais que podem levar a um acidente. 
*Exemplo:* O sistema identifica que o operador está curvando as costas repetidamente e tirando o capacete. Em vez de esperar o acidente, o sistema avisa no painel, sugere uma pausa e até reduz a velocidade de robôs próximos.

---

## 🔗 Links Rápidos

| Recurso | Link |
|---------|------|
| 📋 **Board Trello** | [Clique aqui](https://trello.com/invite/b/6a8db95f95592c6476de9990/ATTIf4c7811915d9594eb067e17f364843e4AD7407F4/sprint-softaware) |
| 📄 **Documento de Cerimônias Scrum** |(cerimonias-sprint3.md) |
| 🎬 **Vídeo Walkthrough (YouTube)** | [Assistir no YouTube] |

---

## 🛠️ Tecnologias Selecionadas

| Tecnologia | Justificativa |
|------------|---------------|
| **Python** | Ecossistema maduro para visão computacional (OpenCV, MediaPipe, YOLO) e integração industrial. |
| **FastAPI** | Baixa latência, assíncrono, ideal para alertas em tempo real e endpoints REST leves. |
| **PostgreSQL + TimescaleDB** | Relacional para dados mestres + extensão time-series para logs contínuos. |
| **Redis + Pub/Sub** | Cache de alertas e fila de mensagens para notificações instantâneas (WebSockets). |
| **YOLOv8 + OpenCV** | Detecção de objetos/EPIs em imagem com alta performance (30+ FPS). |
| **React + PWA** | Interface adaptável para dispositivos móveis e fixos no chão de fábrica. |
| **Docker + Kubernetes** | Escalabilidade industrial e orquestração em ambientes de borda ou nuvem. |

---

## 📋 Requisitos do Sistema

### Requisitos Funcionais (RF)
*   **RF01:** Detectar capacete, óculos, luva, colete e protetor auricular via câmera.
*   **RF02:** Emitir alerta sonoro/visual quando EPI ausente por > 2 segundos.
*   **RF03:** Registrar evento de risco com timestamp, local, EPI ausente e foto ofuscada.
*   **RF04:** Permitir que supervisor confirme ou descarte alerta manualmente.
*   **RF05:** Gerar relatório diário/semanal de conformidade por área/turno.
*   **RF06:** Enviar notificação push para operador e supervisor simultaneamente.
*   **RF07:** Dashboard com mapa térmico de riscos por zona da fábrica.
*   **RF08:** Modo "apenas prevenção" (sem registro de punição).

### Requisitos Não Funcionais (RNF)
*   **RNF01:** Tempo de inferência por frame ≤ 50ms (edge GPU).
*   **RNF02:** Sistema deve suportar 50 câmeras simultâneas.
*   **RNF03:** Interface responsiva (web/mobile) com PWA.
*   **RNF04:** APIs documentadas com Swagger.
*   **RNF05:** Logs de auditoria imutáveis para rastreabilidade.
*   **RNF06:** Disponibilidade mínima 99,9% em horário de produção.

---

## 🖥️ Instruções de Uso e Navegação (Protótipo)

O protótipo foi desenhado com foco em UX para tablets industriais (botões grandes de 48px, alto contraste e imagem ofuscada por LGPD).

### Fluxos Principais
1.  **Cadastro e consulta de EPI:** Tela de Gestão de EPIs → Busca → Clique no colaborador → Ver detalhes.
2.  **Emissão e visualização de alerta:** Dashboard → "Ver Alertas" → Clique no card → Tela de Alertas → "Ver detalhes" → Confirmar/Descartar.
3.  **Geração de relatório:** Dashboard → "Relatórios" → Selecionar setor/período → Gerar → Exportar.
4.  **Gestão de zonas:** Dashboard → "Zonas" → Visualizar cards → Editar configurações.
5.  **Acesso ao sistema:** Tela de Login → Inserir credenciais → "Entrar" → Dashboard.

### Sistema Visual
*   **Cores:** #1E2A5E (header), #E67E22 (alertas), #27AE60 (confirmar), #F4F4F4 (fundo).
*   **Tipografia:** Montserrat (títulos), Open Sans (corpo).
*   **Ícones:** Feather Icons (linha grossa).

---

## 🚀 Resumo das Entregas por Sprint

*   **Sprint 1 e 2 (Concepção e Arquitetura):** Definição do problema, proposta de valor, justificativa técnica, modelagem de banco de dados e criação dos diagramas UML (Casos de Uso, Atividades e Classes).
*   **Sprint 3 (Prototipagem e Design):** Criação das 7 telas do protótipo navegável no Figma, definição do sistema visual (UI/UX), fluxos de navegação e documentação das cerimônias Scrum.
*   **Sprint 4 (Desenvolvimento Front-end e Refinamento):** Implementação do código do Dashboard em React + Tailwind CSS (este repositório), gravação do vídeo walkthrough e consolidação da documentação final.

---

## 💻 Como Rodar o Projeto Front-end (VS Code)

Para visualizar o Dashboard construído em código (React + Vite), siga os passos:

**1. Pré-requisitos**
Certifique-se de ter o [Node.js] instalado em sua máquina.

**2. Abra a pasta correta no VS Code**
Abra o VS Code na pasta raiz deste projeto (onde fica o arquivo `package.json`).

**3. Instale as dependências**
No terminal do VS Code , rode:
```bash
npm install

Após instalar, rode:
npm run dev
5. Acesse no navegador
Segure Ctrl e clique no link exibido no terminal .