# CLAUDE.md

Jogo de navegador 2D, pixel art, side-scroller com combate simples. Presente pessoal: privado, sem backend.
Plano completo e roadmap: `docs/PLANO.md`. Decisões já tomadas: `docs/DECISOES.md`. Leia os dois antes de propor mudanças de arquitetura.

## Stack (fixa — não trocar nem atualizar sem eu pedir)
- Phaser **3.90.0** (versão exata no package.json). **Não usar APIs do Phaser 4.** Em dúvida, confira a documentação da 3.90.
- TypeScript estrito + Vite.
- Vitest para testes de funções puras.
- Hospedagem: Vercel. Branch `dev` = teste (preview). Branch `main` = produção. Nunca fazer commit direto na `main`.

## Comandos
- `npm run dev` — servidor local
- `npm run build` — build de produção (precisa passar sem erros antes de qualquer commit)
- `npm test` — testes

## Estrutura
- `src/content/` — SÓ dados (diálogos, fases, chefes, memórias, carta). Nenhuma lógica aqui.
- `src/scenes/` — cenas do Phaser.
- `src/entities/` — personagens (Fighter, Player, Partner, Enemy, Boss).
- `src/systems/` — input, combate, save. Preferir funções puras e testáveis.
- `src/config.ts` — constantes numéricas de jogo (velocidade, dano, tamanhos). Nada de números mágicos espalhados.
- `public/assets/` — sprites, fundos, áudio.

## Regras de trabalho
1. Uma tarefa por vez. Antes de codar, mostre o plano: arquivos que vai criar/alterar e por quê. Espere aprovação.
2. Altere apenas os arquivos necessários para a tarefa. Não renomeie, não mova e não refatore código que funciona sem eu pedir.
3. Não crie abstrações, gerenciadores, padrões ou dependências novas sem pedir.
4. Texto, nomes e valores de conteúdo vão em `src/content/`, nunca hardcoded na lógica.
5. Ao terminar: rode build e testes, e liste o que devo testar manualmente no celular.
6. Se algo do pedido conflitar com este arquivo ou com `docs/DECISOES.md`, pergunte antes.
7. Não implemente etapas futuras do roadmap "para adiantar".

## Restrições técnicas
- Prioridade é celular (Android e iPhone, Safari incluído), em orientação horizontal.
- Resolução lógica 384×216, `pixelArt: true`, `roundPixels: true`, escala FIT.
- CSS: `touch-action: none`, `overscroll-behavior: none`, `user-select: none`, `viewport-fit=cover` com `env(safe-area-inset-*)`.
- Áudio só inicia após o primeiro toque do usuário.
- Pausar automaticamente quando a página perde o foco (`visibilitychange`).
- Sem login, sem backend, sem analytics. Progresso só em `localStorage`.
- O repositório é privado e o conteúdo é pessoal: não adicionar nada que envie dados para fora.
