export function login(formData) {
  return fetch("http:///121.5.64.221:3033/users/login", {
    method: "post",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}

export function register(formData) {
  return fetch("http://121.5.64.221:3033/users/register", {
    method: "post",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}
