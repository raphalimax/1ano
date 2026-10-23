import { describe, expect, it } from 'vitest';
import { GAME_HEIGHT, GAME_WIDTH } from '../src/config';

describe('config', () => {
  it('usa a resolução lógica 384×216', () => {
    expect(GAME_WIDTH).toBe(384);
    expect(GAME_HEIGHT).toBe(216);
  });
});
