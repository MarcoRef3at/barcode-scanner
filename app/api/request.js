const ApiRequest = (api, body) => {
  const promise = new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        resolve(JSON.parse(request.responseText));
      } else {
        reject(request);
      }
    };
    request.open("POST", api);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(body);
  });
  return promise;
};
export default ApiRequest;
