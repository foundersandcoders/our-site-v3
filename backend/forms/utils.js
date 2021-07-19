async function getByEmail(client, email, fields) {
  return client
    .select({ fields })
    .all()
    .find((r) => r.fields.email.toLowerCase() === email.toLowerCase());
}

module.exports = { getByEmail };
