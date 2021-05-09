export function addTask(formData) {
  return fetch("http://118.24.211.84:3033/publish/addTask", {
    method: "post",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}
