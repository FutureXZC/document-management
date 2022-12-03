export function addTask(formData) {
  return fetch("http://121.5.64.221:3033/publish/addTask", {
    method: "post",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}
