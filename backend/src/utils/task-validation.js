const VALID_PRIORITIES = ['Low', 'Medium', 'High'];
const VALID_STATUSES = ['To Do', 'In Progress', 'Done'];

function validateTaskPayload(payload) {
  const errors = [];

  if (!payload.title || !payload.title.trim()) {
    errors.push('Title is required.');
  }

  if (!payload.description || !payload.description.trim()) {
    errors.push('Description is required.');
  }

  if (!VALID_PRIORITIES.includes(payload.priority)) {
    errors.push('Priority must be Low, Medium, or High.');
  }

  if (payload.status && !VALID_STATUSES.includes(payload.status)) {
    errors.push('Status must be To Do, In Progress, or Done.');
  }

  return errors;
}

function validateStatus(status) {
  return VALID_STATUSES.includes(status);
}

module.exports = {
  VALID_PRIORITIES,
  VALID_STATUSES,
  validateStatus,
  validateTaskPayload
};
