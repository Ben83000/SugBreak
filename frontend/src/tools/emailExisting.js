export default async function emailExisting(email) {
  const response = await fetch(
    `http://localhost:5000/user/${encodeURIComponent(email)}`
  );
  if (response.status === 200) {
    return true;
  }
  else if (response.status === 404) {
    return false;
  }
}
