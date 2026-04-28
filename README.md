#  ProactiveGuard - Sistema de Segurança Industrial Proativa com IA

##  Sobre o Projeto

**ProactiveGuard** é uma solução inovadora de segurança industrial que substitui o modelo punitivo-tradicional por um sistema de **monitoramento contínuo baseado em Inteligência Artificial**, capaz de detectar riscos em tempo real, emitir alertas preventivos e promover uma cultura de prevenção antes da infração ocorrer.

Desenvolvido para o contexto do **Metaindústria**, o sistema não é uma ferramenta genérica de RH, mas sim uma **ferramenta operacional de campo** integrada à lógica de segurança proativa do chão de fábrica.

---

##  Equipe

| Nome | rm |
|------|-------|
| **Arthur Augutus Sariva Pereira ** | 555106 |
| **André Bartolo Pellegrino dos Santos**| 558319 |  

---

##  Problema Abordado
Desenvolver um sistema de visão computacional focado em aprimorar a segurança contínua em ambientes fabris, com capacidade de identificar, alertar sobre e antecipar riscos potenciais aos trabalhadores.
Detectar, de maneira instantânea, a utilização adequada dos equipamentos de proteção individual (EPIs), como capacetes, coletes, luvas e óculos de segurança.
Analisar posturas corporais inadequadas e o posicionamento dos funcionários em áreas de risco dentro da fábrica.
Implementar notificações automáticas – sons, imagens e painéis de controle – em situações de perigo iminente.
Utilizar dados históricos para treinar os modelos de inteligência artificial na previsão de possíveis ocorrências de acidentes.
Realizar testes práticos em maquinários industriais padrão na etapa de conclusão do projeto. 

 ## proposta de solução

 Ainda é comum vermos acidentes nas fábricas por falta de equipamentos de proteção ou atitudes arriscadas. A questão não é só o descumprimento das normas, mas sim as pessoas – o cansaço, a necessidade de produzir mais rápido e a falta de atenção. Hoje, as soluções agem depois que o problema acontece: câmeras filmam, e os chefes repreendem após o acidente. Isso gera um custo alto para todos.

A Nossa Proposta: Agir Antes que o Problema Aconteça

Criamos um sistema que entende como o trabalhador costuma agir e identifica sinais que podem levar a um acidente. Veja um exemplo:

João está trabalhando há 3 horas na linha de produção. O sistema identifica que ele está curvando as costas várias vezes e tirando o capacete rapidamente. Em vez de esperar que ele caia ou se machuque, o sistema avisa no painel e sugere que ele faça uma pausa. O robô que trabalha perto dele diminui um pouco a velocidade.

## tecnologias selecionadas 

Tecnologia e Justificativa
Python
Ecossistema maduro para visão computacional (OpenCV, MediaPipe, YOLO) e integração com sistemas industriais.

FastAPI
Baixa latência, assíncrono, ideal para alertas em tempo real e endpoints REST leves.

PostgreSQL + TimescaleDB
Relacional para dados mestres + extensão time-series para logs contínuos de eventos de segurança.

Redis + Pub/Sub
Cache de alertas e fila de mensagens para notificações instantâneas (WebSockets).

YOLOv8 + OpenCV
Detecção de objetos/EPIs em imagem com alta performance (30+ FPS).

React + PWA
Interface adaptável para dispositivos móveis e fixos no chão de fábrica.

Docker + Kubernetes
Escalabilidade industrial e orquestração em ambientes de borda ou nuvem.

## justificativa técnica.

A criação de algoritmos que identificam, instantaneamente, os Equipamentos de Proteção Individual (EPIs) e atos perigosos (como posturas incorretas e proximidade de áreas de risco) é o fundamento técnico deste desafio. A metodologia emprega técnicas atuais de Deep Learning, como redes neurais convolucionais (CNNs) para identificar objetos e estimar poses para avaliar a postura, em consonância com os ideais da Indústria 5.0 e Open Lab. 

 ## Requisitos Funcionais (RF)

ID e Descrição
RF01
Detectar capacete, óculos, luva, colete e protetor auricular via câmera.

RF02
Emitir alerta sonoro/visual quando EPI ausente por > 2 segundos.

RF03
Registrar evento de risco com timestamp, local, EPI ausente e foto ofuscada.

RF04
Permitir que supervisor confirme ou descarte alerta manualmente.

RF05
Gerar relatório diário/semanal de conformidade por área/turno.

RF06
Enviar notificação push para operador e supervisor simultaneamente.

RF07
Dashboard com mapa térmico de riscos por zona da fábrica.


RF08
Modo "apenas prevenção" (sem registro de punição) – cultura de melhoria contínua.

## Requisitos Não Funcionais (RNF)
ID e Descrição
RNF01
Tempo de inferência por frame ≤ 50ms (edge GPU).

RNF02
Sistema deve suportar 50 câmeras simultâneas.

RNF03
Interface responsiva (web/mobile) com PWA.

RNF04
APIs documentadas com Swagger.

RNF05
Logs de auditoria imutáveis para rastreabilidade.

RNF06
Disponibilidade mínima 99,9% em horário de produção.

##  Diagramas UML

### 1. Diagrama de Casos de Uso

![Diagrama de Casos de Uso](diagramas/casos_uso.png)

**Atores identificados:**
- **Operador de Chão de Fábrica**: Recebe notificações preventivas, visualiza orientações
- **Supervisor de Segurança**: Registra alertas, confirma/descarta eventos, acessa dashboard
- **Gestor Industrial**: Gera relatórios, acessa KPIs e mapa térmico de riscos

**Principais relacionamentos:**
- `<<include>>` no registro de alerta → geração de log automático
- `<<extend>>` no modo prevenção ativa (sem punição)

---

### 2. Diagrama de Atividades

![Diagrama de Atividades](diagramas/atividades.png)

**Fluxo crítico representado:** Detecção e alerta de EPI ausente

**Etapas principais:**
1. Captura de frame da câmera (30 FPS)
2. Inferência YOLOv8 para detecção de EPIs
3. Temporizador de 2 segundos (evita falsos positivos)
4. Persistência do evento no TimescaleDB
5. Publicação do alerta no Redis Pub/Sub
6. Notificação simultânea para supervisor (dashboard) e operador (PWA)
7. Avaliação do supervisor (confirmar/descartar/ignorar)
8. Geração de log de auditoria e atualização do dashboard

---

### 3. Diagrama de Classes

![Diagrama de Classes](diagramas/classes.png)

**Entidades principais:**
- **Usuario** (abstract) → herança para **Operador**, **Supervisor**, **Gestor**
- **Camera** → composição com **ServicoInferencia** (YOLOv8)
- **Zona** → associação com **EventoRisco**
- **EventoRisco** → relação 1:1 com **Alerta**
- **Usuario** → associação 1:N com **Alerta** (recebe notificações)
- **Gestor** → associação 1:N com **RelatorioConformidade**

**Coerência entre diagramas:**
- Todos os casos de uso têm suporte nos demais diagramas
- As atividades refletem os métodos das classes
- Os relacionamentos UML respeitam o domínio industrial


