const supabase = require('../supabaseClient');
const { postSchema } = require('../validators/postValidator');

const list = async (req, res) => {
  const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ message: 'Erro ao buscar posts', details: error.message });
  return res.json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ message: 'Post não encontrado' });
  return res.json(data);
};

const create = async (req, res) => {
  const parse = postSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ message: 'Validação falhou', issues: parse.error.errors });

  const { title, content } = parse.data;
  const owner_id = req.user?.id;
  const { data, error } = await supabase.from('posts').insert([{ title, content, owner_id }]).select().single();
  if (error) return res.status(500).json({ message: 'Erro ao criar post', details: error.message });
  return res.status(201).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const parse = postSchema.partial().safeParse(req.body);
  if (!parse.success) return res.status(400).json({ message: 'Validação falhou', issues: parse.error.errors });

  const { data: existing, error: findErr } = await supabase.from('posts').select('*').eq('id', id).single();
  if (findErr) return res.status(404).json({ message: 'Post não encontrado' });
  if (existing.owner_id !== req.user?.id) return res.status(403).json({ message: 'Não autorizado' });

  const { data, error } = await supabase.from('posts').update(parse.data).eq('id', id).select().single();
  if (error) return res.status(500).json({ message: 'Erro ao atualizar post', details: error.message });
  return res.json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { data: existing, error: findErr } = await supabase.from('posts').select('*').eq('id', id).single();
  if (findErr) return res.status(404).json({ message: 'Post não encontrado' });
  if (existing.owner_id !== req.user?.id) return res.status(403).json({ message: 'Não autorizado' });

  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) return res.status(500).json({ message: 'Erro ao deletar post', details: error.message });
  return res.status(204).send();
};

module.exports = { list, getById, create, update, remove };
