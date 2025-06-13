import { describe, it, expect, vi } from 'vitest';

vi.mock('openai', () => ({
  Configuration: class {},
  OpenAIApi: class {
    // eslint-disable-next-line class-methods-use-this
    async createChatCompletion() {
      return { data: { choices: [{ message: { content: '' } }] } };
    }
  },
}));

import { GET } from '@/app/api/events/route';

describe('GET /api/events', () => {
  it('returns an object with an events array', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.events)).toBe(true);
  });
});
