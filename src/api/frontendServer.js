import axios from 'axios';
import { Buffer } from 'buffer';

// const SERVER_URL = "http://ec2-3-27-195-136.ap-southeast-2.compute.amazonaws.com:3000";
const SERVER_URL = "http://localhost:3000"

// export function requestJob(name, url) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: name, url: url })
//       };
//       return fetch(SERVER_URL + "/requestJob", requestOptions)
//         .then(r => console.log(r))
// }

// TODO: Add same name error handling
function requestPresignedUploadURL(key) {
  return fetch(SERVER_URL + '/requestUploadURL/' + key)
  .then(res => res.json())
  .then(json => json.url)
}

export async function uploadImageToS3(url, key) {
  const presignedURL = await requestPresignedUploadURL(key);
  const contentType = "application/jpeg"

  // Download the image from the provided URL
  const imageResponse = await axios.get(url, {
    responseType: "arraybuffer",
  });

  if (imageResponse.status !== 200) {
    throw new Error("Failed to fetch the image.");
  }

  const imageData = Buffer.from(imageResponse.data);

  // Upload the downloaded image data to S3 using a presigned URL
  await axios.put(presignedURL, imageData, {
    headers: { "Content-Type": contentType },
  });
}