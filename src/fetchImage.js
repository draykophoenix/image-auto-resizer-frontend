// unsplash.js
import { createApi } from 'unsplash-js';

// const proxiedApi = createApi({
//   apiUrl: 'https://mywebsite.com/unsplash-proxy',
// });

const tempKeyedApi = createApi({
  accessKey: "MVD5e8doDm10FXRTCXPY6HeEMGUMV6eLbLqAHp0wruE"
});

export async function getRandomPhoto(query) {
  const response = await tempKeyedApi.photos.getRandom({ query });
  if (response.errors) {
    throw new Error("Error fetching random photo: " + response.errors[0]);
  }
  return response
  // return response.response.links.download;
}

export async function getPhotosByQuery(query) {
  const res = await tempKeyedApi.search.getPhotos({ query, perPage: 5 });
  if (res.errors) {
    throw new Error("Error fetching queried photo: " + res.errors[0]);
  }
  return res.response.results.map(mapUnsplashToGallery)
}

function mapUnsplashToGallery(unsplashPhoto) {
  return {
    src: unsplashPhoto.urls.small,
    width: unsplashPhoto.width,
    height: unsplashPhoto.height,
    caption: unsplashPhoto.description
  }
}