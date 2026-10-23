import Phaser from 'phaser';
import { BACKGROUND_COLOR, GAME_HEIGHT, GAME_WIDTH, VIEWPORT_RESYNC_DELAYS } from './config';
import { StageScene } from './scenes/StageScene';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: BACKGROUND_COLOR,
  pixelArt: true,
  roundPixels: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  input: {
    activePointers: 3,
  },
  scene: [StageScene],
});

// Chrome no iPhone às vezes fica com a altura antiga depois de girar:
// usa a altura realmente visível e força o Phaser a remedir.
function syncViewport(): void {
  const height = window.visualViewport?.height ?? window.innerHeight;
  document.documentElement.style.setProperty('--app-height', `${height}px`);
  if (game.isBooted && game.scale.getParentBounds()) game.scale.refresh();
}

function syncViewportAfterRotation(): void {
  syncViewport();
  for (const delay of VIEWPORT_RESYNC_DELAYS) setTimeout(syncViewport, delay);
}

syncViewport();
window.addEventListener('resize', syncViewport);
window.visualViewport?.addEventListener('resize', syncViewport);
window.addEventListener('orientationchange', syncViewportAfterRotation);
