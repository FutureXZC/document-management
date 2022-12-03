export function getHistory(id) {
  return fetch("http://121.5.64.221:3033/history/getHistory", {
    method: "post",
    body: JSON.stringify(id),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}

export function deleteHistory(submitDate) {
  return fetch("http://121.5.64.221:3033/history/deleteHistory", {
    method: "post",
    body: JSON.stringify(submitDate),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}

export function getPublishedTask(teacher) {
  return fetch("http://121.5.64.221:3033/history/getPublishedTask", {
    method: "post",
    body: JSON.stringify(teacher),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}

export function deleteTask(releaseDate) {
  return fetch("http://121.5.64.221:3033/history/deleteTask", {
    method: "post",
    body: JSON.stringify(releaseDate),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    return res.json();
  });
}

export function downloadTaskFile(releaseDate) {
  window.location.href = `http://121.5.64.221:3033/history/downloadTaskFile/${releaseDate}`;
}
