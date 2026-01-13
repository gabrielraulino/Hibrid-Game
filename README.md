# 🕵️ INVESTIGATOR - Jogo de Investigação Híbrido

Um jogo de investigação híbrido (físico + digital) onde você assume o papel de um detetive investigando casos misteriosos. Combine cartas físicas com investigação digital para desvendar a verdade.

![Caso 001: Inveja Fatal](https://img.shields.io/badge/Caso-001%20%7C%20Inveja%20Fatal-gold?style=for-the-badge)

## 📖 Sobre o Jogo

**Investigator** é um jogo de mistério onde você investiga casos usando um sistema híbrido único:

- **Cartas Físicas**: Você possui cartas físicas com códigos (P1, P2, A1, L1, etc.)
- **Aplicativo Digital**: Digite os códigos no terminal para investigar pistas, interrogar suspeitos e examinar evidências
- **Interações Contextuais**: As informações mudam baseadas no local atual e nas evidências descobertas
- **Palpite Final**: Apresente sua conclusão sobre quem, com o quê e onde o crime foi cometido

## 🎮 Como Jogar

### Caso 001: Inveja Fatal

O corpo de **Ana Lúcia**, 26 anos, foi encontrado no **Cemitério Antigo**. Você tem:

- **5 Pessoas de Interesse** (P1-P5): Suspeitos e a vítima
- **3 Armas** (A1-A3): Possíveis armas do crime
- **3 Locais** (L1-L3): Cenários da investigação

### Passos da Investigação

1. **Tela de Introdução**: Leia a apresentação do caso
2. **Selecione um Local**: Escolha onde você está investigando (afeta as interações)
3. **Digite os Códigos**: Use o terminal para inserir códigos das cartas (ex: `P2`, `A1`, `L1`)
4. **Analise as Evidências**: Cada carta revela informações diferentes baseadas no contexto
5. **Descartar Cartas**: Marque cartas como descartadas quando descobrir que não são relevantes
6. **Apresentar Palpite Final**: Quando tiver evidências suficientes, apresente sua conclusão
7. **Resolva o Caso**: Descubra quem é o assassino, qual arma foi usada e onde o crime ocorreu

### Resposta Correta

- **Suspeito**: P2 (Ricardo)
- **Arma**: A1 (Faca de Caça)
- **Local**: L1 (Cemitério Antigo)

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <repository-url>

# Entre na pasta
cd application

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

O jogo estará disponível em `http://localhost:5173` (ou a porta indicada pelo Vite)

### Build para Produção

```bash
# Gere os arquivos de produção
npm run build

# Preview da build de produção
npm run preview
```

Os arquivos serão gerados na pasta `dist/`

## 🛠️ Tecnologias

- **React 18** - Framework UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Axios** - Cliente HTTP (preparado para integração com Strapi)

## 📁 Estrutura do Projeto

```
application/
├── src/
│   ├── components/       # Componentes React
│   │   ├── IntroScreen.tsx
│   │   ├── TerminalInput.tsx
│   │   ├── CardResponse.tsx
│   │   ├── LocationSelector.tsx
│   │   ├── DiscardCardsPanel.tsx
│   │   ├── FinalGuessDialog.tsx
│   │   └── GameResult.tsx
│   ├── hooks/            # Custom hooks
│   │   └── useInvestigation.ts
│   ├── types/            # Definições TypeScript
│   │   └── index.ts
│   ├── mockData/         # Dados de teste
│   │   └── invejaFatal.ts
│   ├── assets/           # Imagens e recursos
│   └── App.tsx           # Componente principal
├── roteiro.md            # Roteiro completo do caso
└── package.json
```

## 🎯 Funcionalidades

- ✅ Tela de introdução com apresentação do caso
- ✅ Sistema de seleção de local atual
- ✅ Terminal para investigação de cartas
- ✅ Sistema de flags e interações condicionais
- ✅ Descarte manual de cartas
- ✅ Diálogo de palpite final
- ✅ Validação de resposta correta
- ✅ Tela de resultado (vitória/derrota)
- ✅ Debug panel (apenas em desenvolvimento)

## 🔮 Futuras Melhorias

- [ ] Integração com Strapi CMS
- [ ] Sistema de combinação de cartas (Local + Suspeito + Arma)
- [ ] Múltiplos casos
- [ ] Sistema de pontuação
- [ ] Tempo limite para resolução
- [ ] Dicas e sistema de ajuda
- [ ] Histórico de investigação

## 📝 Licença

Este projeto foi desenvolvido como MVP para um jogo de investigação híbrido.

## 👤 Autor

Desenvolvido para o projeto **Tópicos Especiais**.

---

**Divirta-se investigando! 🕵️‍♂️**
