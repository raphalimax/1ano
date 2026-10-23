import { describe, expect, it } from 'vitest';
import { buttonAt, resolveDirection, type ButtonLayout, type KeyState } from '../src/systems/input';

const layout: ButtonLayout = {
  left: { x: 0, y: 100, width: 40, height: 40 },
  right: { x: 50, y: 100, width: 40, height: 40 },
};

const noKeys: KeyState = { left: false, right: false };
const at = (x: number, y: number, isDown = true) => ({ x, y, isDown });

describe('buttonAt', () => {
  it('acha o botão sob o ponto', () => {
    expect(buttonAt(10, 110, layout)).toBe('left');
    expect(buttonAt(60, 110, layout)).toBe('right');
  });

  it('retorna null fora dos botões e no vão entre eles', () => {
    expect(buttonAt(200, 50, layout)).toBeNull();
    expect(buttonAt(45, 110, layout)).toBeNull();
  });
});

describe('resolveDirection', () => {
  it('fica parado sem input', () => {
    expect(resolveDirection([], layout, noKeys)).toBe(0);
  });

  it('usa o teclado', () => {
    expect(resolveDirection([], layout, { left: true, right: false })).toBe(-1);
    expect(resolveDirection([], layout, { left: false, right: true })).toBe(1);
  });

  it('usa toques pressionados e ignora os soltos', () => {
    expect(resolveDirection([at(10, 110)], layout, noKeys)).toBe(-1);
    expect(resolveDirection([at(10, 110, false)], layout, noKeys)).toBe(0);
  });

  it('esquerda e direita juntas = parado', () => {
    expect(resolveDirection([at(10, 110), at(60, 110)], layout, noKeys)).toBe(0);
    expect(resolveDirection([at(10, 110)], layout, { left: false, right: true })).toBe(0);
  });

  it('deslizar o mesmo dedo de ◀ para ▶ inverte a direção', () => {
    const finger = at(10, 110);
    expect(resolveDirection([finger], layout, noKeys)).toBe(-1);
    finger.x = 60;
    expect(resolveDirection([finger], layout, noKeys)).toBe(1);
  });

  it('dedo pressionado que saiu do botão para de mover', () => {
    expect(resolveDirection([at(200, 20)], layout, noKeys)).toBe(0);
  });
});
