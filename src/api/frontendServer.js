import axios from 'axios';
import { Buffer } from 'buffer';
import fetchConfig from '../utils/fetchConfig';

// TODO: Add same name error handling
function requestPresignedUploadURL(name) {
  return fetchConfig()
  .then(config => fetch(config.frontendServerURL + '/requestUploadURL/' + name))
  .then(res => res.json())
  .then(json => json.url)
}

function requestPresignedReadURL(key) {
  return fetchConfig()
  .then(config => fetch(config.frontendServerURL + '/requestReadURL/' + key))
  .then(res => res.json())
  .then(json => json.url)
}

export async function uploadImageToS3(url, key) {
  var presignedURL
  try {
    presignedURL = await requestPresignedUploadURL(key);
  } catch (err) {
    console.error(err)
    return {err: "Failed to get presigned URL!"}
  }
  const contentType = "application/jpeg"

  // Download the image from the provided URL
  const imageResponse = await axios.get(url, {
    responseType: "arraybuffer",
  });

  if (imageResponse.status !== 200) {
    console.error(imageResponse)
    return {err: "Failed to get image!"}
  }

  const imageData = Buffer.from(imageResponse.data);

  // Upload the downloaded image data to S3 using a presigned URL
  return await axios.put(presignedURL, imageData, {
    headers: { "Content-Type": contentType },
  });
}

export function pollForZips() {
  return fetchConfig()
  .then(config => fetch(config.frontendServerURL + '/latestZipFiles'))
  .then(res => res.json())
  .then(json => json.map( file => {
    return {
      name: file.Key,
      lastModified: new Date(file.LastModified).toLocaleString(),
      size:Math.round((file.Size / 1000)) + "MB"
    }
  }))
}

export async function readFileFromS3 (key) {
  const presignedURL = await requestPresignedReadURL(key);

  await axios({ url: presignedURL, method: 'GET', responseType: 'blob' })
  .then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${key}`);
    document.body.appendChild(link);
    link.click();
  });
}