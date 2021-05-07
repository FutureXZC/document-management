export function getSubmitList() {
  return fetch("http://127.0.0.1:3000/submit/getSubmitList", {
    method: "post"
  }).then(res => {
    return res.json();
  });
}

export function getFileList(releaseDate) {
  return fetch("http://127.0.0.1:3000/submit/getFileList", {
    method: "post",
    body: JSON.stringify(releaseDate),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}

export function upload(formData) {
  return fetch("http://127.0.0.1:3000/submit/upload", {
    method: "post",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}
