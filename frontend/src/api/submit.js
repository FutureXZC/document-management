export function getSubmitList(pageInfo) {
  return fetch("http://121.5.64.221:3033/submit/getSubmitList", {
    method: "post",
    body: JSON.stringify(pageInfo),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}

export function getFileList(releaseDate) {
  return fetch("http://121.5.64.221:3033/submit/getFileList", {
    method: "post",
    body: JSON.stringify(releaseDate),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}

export function upload(formData) {
  return fetch("http://121.5.64.221:3033/submit/upload", {
    method: "post",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}
