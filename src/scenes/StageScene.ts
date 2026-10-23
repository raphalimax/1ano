import Phaser from 'phaser';
import {
  BUTTON_ACTIVE_ALPHA,
  BUTTON_ALPHA,
  BUTTON_COLOR,
  BUTTON_GAP,
  BUTTON_ICON_ALPHA,
  BUTTON_ICON_COLOR,
  BUTTON_ICON_SIZE,
  BUTTON_MARGIN,
  BUTTON_SIZE,
  CAMERA_LERP,
  GAME_HEIGHT,
  GROUND_COLOR,
  GROUND_Y,
  MARKER_COLOR,
  MARKER_HEIGHT,
  MARKER_SPACING,
  MARKER_WIDTH,
  PLAYER_COLOR,
  PLAYER_HEIGHT,
  PLAYER_SPEED,
  PLAYER_WIDTH,
  ROOM_WIDTH,
} from '../config';
import { pressedButtons, resolveDirection, type ButtonLayout, type KeyState } from '../systems/input';

const BUTTON_TOP = GAME_HEIGHT - BUTTON_MARGIN - BUTTON_SIZE;

const BUTTON_LAYOUT: ButtonLayout = {
  left: { x: BUTTON_MARGIN, y: BUTTON_TOP, width: BUTTON_SIZE, height: BUTTON_SIZE },
  right: {
    x: BUTTON_MARGIN + BUTTON_SIZE + BUTTON_GAP,
    y: BUTTON_TOP,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },
};

export class StageScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private buttons!: Record<keyof ButtonLayout, Phaser.GameObjects.Rectangle>;
  private keys: Phaser.Input.Keyboard.Key[][] = [];

  constructor() {
    super('StageScene');
  }

  create(): void {
    this.drawRoom();

    this.player = this.add
      .rectangle(ROOM_WIDTH / 2, GROUND_Y, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_COLOR)
      .setOrigin(0.5, 1);

    const camera = this.cameras.main;
    camera.setBounds(0, 0, ROOM_WIDTH, GAME_HEIGHT);
    camera.startFollow(this.player, true, CAMERA_LERP, CAMERA_LERP);

    this.buttons = {
      left: this.createButton('left'),
      right: this.createButton('right'),
    };

    const kb = this.input.keyboard;
    if (kb) {
      const K = Phaser.Input.Keyboard.KeyCodes;
      this.keys = [
        [kb.addKey(K.LEFT), kb.addKey(K.A)],
        [kb.addKey(K.RIGHT), kb.addKey(K.D)],
      ];
    }
  }

  update(_time: number, delta: number): void {
    const touches = this.input.manager.pointers;
    const keys: KeyState = {
      left: this.keys[0]?.some((k) => k.isDown) ?? false,
      right: this.keys[1]?.some((k) => k.isDown) ?? false,
    };

    const dir = resolveDirection(touches, BUTTON_LAYOUT, keys);
    const half = PLAYER_WIDTH / 2;
    this.player.x = Phaser.Math.Clamp(
      this.player.x + dir * PLAYER_SPEED * (delta / 1000),
      half,
      ROOM_WIDTH - half,
    );

    const pressed = pressedButtons(touches, BUTTON_LAYOUT);
    this.buttons.left.setFillStyle(BUTTON_COLOR, pressed.left ? BUTTON_ACTIVE_ALPHA : BUTTON_ALPHA);
    this.buttons.right.setFillStyle(BUTTON_COLOR, pressed.right ? BUTTON_ACTIVE_ALPHA : BUTTON_ALPHA);
  }

  private drawRoom(): void {
    this.add.rectangle(0, GROUND_Y, ROOM_WIDTH, GAME_HEIGHT - GROUND_Y, GROUND_COLOR).setOrigin(0, 0);
    for (let x = 0; x <= ROOM_WIDTH; x += MARKER_SPACING) {
      this.add
        .rectangle(x, GROUND_Y, MARKER_WIDTH, MARKER_HEIGHT, MARKER_COLOR)
        .setOrigin(0.5, 1);
    }
  }

  private createButton(id: keyof ButtonLayout): Phaser.GameObjects.Rectangle {
    const r = BUTTON_LAYOUT[id];
    const bg = this.add
      .rectangle(r.x, r.y, r.width, r.height, BUTTON_COLOR, BUTTON_ALPHA)
      .setOrigin(0, 0)
      .setScrollFactor(0);

    const s = BUTTON_ICON_SIZE;
    const icon =
      id === 'left'
        ? this.add.triangle(0, 0, s, 0, 0, s / 2, s, s, BUTTON_ICON_COLOR, BUTTON_ICON_ALPHA)
        : this.add.triangle(0, 0, 0, 0, s, s / 2, 0, s, BUTTON_ICON_COLOR, BUTTON_ICON_ALPHA);
    icon.setPosition(r.x + r.width / 2, r.y + r.height / 2).setScrollFactor(0);

    return bg;
  }
}
