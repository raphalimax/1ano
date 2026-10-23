# Decisões

Uma linha por decisão, com o motivo. Não desfazer sem discutir.

- Phaser 3.90 fixo, não Phaser 4 — mais exemplos confiáveis; evita mistura de APIs.
- Side-scroller plano, sem eixo de profundidade — corta complexidade de colisão e controles.
- Bárbara é a protagonista jogável; o parceiro é controlado pelo jogo — co-op humano não funciona em uma tela de celular.
- Parceiro nunca morre; morte da jogadora não pune — o objetivo é ela terminar o jogo.
- Hospedagem na Vercel: `dev` = teste (preview), `main` = produção. Nome do projeto neutro para não estragar a surpresa.
- Conteúdo (textos, fases, chefes) separado da lógica em `src/content/`.
