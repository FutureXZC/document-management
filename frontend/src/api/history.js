export function getHistory(formData) {
  return fetch("http://127.0.0.1:3000/history/getHistory", {
    method: "post"
  }).then(res => {
    return res.json();
  });
}

export function deleteHistory(submitDate) {
  return fetch("http://127.0.0.1:3000/history/deleteHistory", {
    method: "post",
    body: JSON.stringify(submitDate),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}
