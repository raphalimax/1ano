import Phaser from 'phaser';
import {
  BACKGROUND_COLOR,
  GAME_HEIGHT,
  GAME_WIDTH,
  TEST_RECT_COLOR,
  TEST_RECT_HEIGHT,
  TEST_RECT_WIDTH,
} from './config';

class TestScene extends Phaser.Scene {
  constructor() {
    super('TestScene');
  }

  create(): void {
    this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      TEST_RECT_WIDTH,
      TEST_RECT_HEIGHT,
      TEST_RECT_COLOR,
    );
  }
}

new Phaser.Game({
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
  scene: [TestScene],
});
