export type Direction = -1 | 0 | 1;

export type ButtonId = 'left' | 'right';

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ButtonLayout = Record<ButtonId, Rect>;

export interface TouchPoint {
  x: number;
  y: number;
  isDown: boolean;
}

export interface KeyState {
  left: boolean;
  right: boolean;
}

function contains(rect: Rect, x: number, y: number): boolean {
  return x >= rect.x && x < rect.x + rect.width && y >= rect.y && y < rect.y + rect.height;
}

export function buttonAt(x: number, y: number, layout: ButtonLayout): ButtonId | null {
  if (contains(layout.left, x, y)) return 'left';
  if (contains(layout.right, x, y)) return 'right';
  return null;
}

/** Botões sob algum dedo pressionado agora (pela posição atual, não pela inicial). */
export function pressedButtons(touches: readonly TouchPoint[], layout: ButtonLayout): KeyState {
  const state: KeyState = { left: false, right: false };
  for (const t of touches) {
    if (!t.isDown) continue;
    const id = buttonAt(t.x, t.y, layout);
    if (id) state[id] = true;
  }
  return state;
}

/** Junta toque e teclado. Esquerda e direita ao mesmo tempo = parado. */
export function resolveDirection(
  touches: readonly TouchPoint[],
  layout: ButtonLayout,
  keys: KeyState,
): Direction {
  const touch = pressedButtons(touches, layout);
  const left = touch.left || keys.left;
  const right = touch.right || keys.right;
  if (left === right) return 0;
  return left ? -1 : 1;
}
