// const SERVER_URL = "http://ec2-3-27-195-136.ap-southeast-2.compute.amazonaws.com:3000";
const SERVER_URL = "http://localhost:3000"

export function requestJob(name, url) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, url: url })
      };
      return fetch(SERVER_URL + "/requestJob", requestOptions)
        .then(r => console.log(r))
}
