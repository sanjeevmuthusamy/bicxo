INSERT INTO tasks (title, description, priority, status, assignee_id)
VALUES
  ('Set up project structure', 'Create frontend, backend, and database folders.', 'Medium', 'Done', 'user-1'),
  ('Build task API', 'Create REST endpoints for Kanban task management.', 'High', 'In Progress', 'user-1'),
  ('Design board UI', 'Create three workflow columns for task cards.', 'Medium', 'To Do', 'user-2')
ON CONFLICT DO NOTHING;
