export function login(formData) {
  return fetch("http://127.0.0.1:3000/users/login", {
    method: "post",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}

export function register(formData) {
  return fetch("http://127.0.0.1:3000/users/register", {
    method: "post",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}
