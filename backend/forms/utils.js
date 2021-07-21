async function getByEmail(client, email, fields) {
  let result = await client.select({ fields }).all();
  return result.find(
    (r) => r.fields.email.toLowerCase() === email.toLowerCase()
  );
}

module.exports = { getByEmail };
