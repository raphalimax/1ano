# Plano do jogo

Referência de escopo e roadmap. Consultar quando a tarefa citar uma etapa. Não implementar nada daqui sem pedido explícito.

## Escopo
- Side-scroller **plano** (só esquerda/direita, sem eixo de profundidade, sem pulo).
- Protagonista jogável: Bárbara. O namorado é o **parceiro controlado pelo jogo** a partir do fim da fase 1.
- Controles: ◀ ▶, **Atacar** (combo de 3 golpes no mesmo botão), **Juntos** (ataque conjunto quando o medidor de sintonia está cheio). Desktop: setas/A-D, J ou Espaço, K, Esc.
- 3 fases de ~4 min (3 salas + chefe cada), 12–15 min no total.
- Morrer não pune: volta ao início da sala com vida cheia. Checkpoint antes de cada chefe.
- Uma única `StageScene` genérica alimentada por `src/content/stages.ts`.
- Chefes definidos por dados em `src/content/bosses.ts`, combinando blocos: `telegraph`, `dash`, `rest`, `projectile`, `shield`.

## Fases (resumo)
1. **O começo** — inimigo "Dúvidas". Chefe Insegurança: pisca → avança → fica tonta e vulnerável.
2. **Nós dois** — parceiro + medidor de sintonia + Juntos. Inimigo extra "Ruído" (lento, resistente). Chefe Desencontro: escudo que só cai com Juntos.
3. **O futuro** — poucos inimigos, muitas memórias. Chefe O Tempo: sem barra de vida, sobreviver 60–90 s; dano não mata. Termina com os dois seguindo juntos → carta final.

## Fora do escopo inicial
Eixo de profundidade, pulo, co-op humano, seleção de dificuldade, retratos nos diálogos, galeria, PWA.

## Roadmap (cada etapa só começa quando a anterior passa no celular real)
1. **Projeto + deploy** — Vite + TS + Phaser 3.90, Vercel com `dev`/`main`. Pronto: retângulo visível na URL da `dev` no celular, horizontal, sem rolagem.
2. **Movimento + câmera + controles** — placeholder anda numa sala maior que a tela; botões ◀ ▶ e teclado. Pronto: 1 min andando no Android e no iPhone sem zoom, seleção de texto ou travar; deslizar de ◀ para ▶ inverte a direção.
3. **Ataque + máquina de estados** — combo de 3 golpes; hitbox visível com `?debug`. Pronto: apertar ataque repetidamente nunca trava.
4. **Primeiro inimigo** — persegue, causa dano, recua, morre. Pronto: 5 inimigos sem ficarem presos; vida no HUD.
5. **Diálogos** — lidos de `content/dialogues.ts`, pausam a fase. Pronto: mudar texto no conteúdo muda o jogo sem tocar em lógica.
6. **Primeiro chefe** — padrões de `content/bosses.ts`. Pronto: alterar valores nos dados muda o comportamento; alguém de fora vence em 1–2 tentativas.
7. **Fase 1 completa + save** — título → salas → chefe → cena. Pronto: jogável no celular; reabrir oferece "Continuar". *Marco: protótipo mínimo (meta 06/12).*
8. **Parceiro + Juntos.** Pronto: parceiro nunca fica preso fora da tela; Juntos só acende com medidor cheio.
9. **Fases 2 e 3 com placeholders.** Pronto: jogável do título à carta. *Marco: versão entregável (meta 17/01).*
10. **Arte e áudio finais.** Pronto: sem placeholders; áudio volta após trocar de app no iPhone.
11. **Narrativa e polimento.** Pronto: pessoa de fora termina sem ajuda em ≤ 20 min.
12. **Congelamento** (a partir de 15/02) — só correção de bugs; tag `v1.0`.

## Debug
- `?debug` na URL: hitboxes/hurtboxes, estado do personagem, input atual, fps, últimos erros na tela.
