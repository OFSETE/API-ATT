const supabase = require('../src/supabaseClient');
const controller = require('../src/controllers/posts');

jest.mock('../src/supabaseClient');

describe('posts controller', () => {
  it('list should return posts array', async () => {
    supabase.from = jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn().mockResolvedValue({ data: [{ id: '1', title: 'T1', content: 'C1', owner_id: 'u1' }], error: null })
      }))
    }));

    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    await controller.list(req, res);

    expect(res.json).toHaveBeenCalled();
    const arg = res.json.mock.calls[0][0];
    expect(Array.isArray(arg)).toBe(true);
    expect(arg[0]).toHaveProperty('id');
  });
});
