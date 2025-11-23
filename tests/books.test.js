const supabase = require('../src/supabaseClient');
const controller = require('../src/controllers/books');

jest.mock('../src/supabaseClient');

describe('books controller', () => {
  it('list should return books array', async () => {
    supabase.from = jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn().mockResolvedValue({ data: [{ id: '1', title: 'Book 1', author: 'A1', owner_id: 'u1' }], error: null })
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
