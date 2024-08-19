import config from "@/config/config";

export default async function emailExisting(email) {
  const response = await fetch(
    `${config.apiUrl}/user/${encodeURIComponent(email)}`
  );
  if (response.status === 200) {
    return true;
  }
  else if (response.status === 404) {
    return false;
  }
}
