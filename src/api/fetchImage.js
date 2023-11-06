import { createApi } from 'unsplash-js';

// const proxiedApi = createApi({
//   apiUrl: 'https://mywebsite.com/unsplash-proxy',
// });

const tempKeyedApi = createApi({
  accessKey: "MVD5e8doDm10FXRTCXPY6HeEMGUMV6eLbLqAHp0wruE"
});

export async function getPhotosByQuery(query, page) {
  const res = await tempKeyedApi.search.getPhotos({ query, page: page, perPage: 5 });
  if (res.errors) {
    throw new Error("Error fetching queried photo: " + res.errors[0]);
  }
  // // -- Generate test data --
  // console.log(res.response.results.map((image, i) => {return {
  //   url : image.urls.full,
  //   name: query + "-" + i
  // }}));

  return res.response.results.map(image => {return {
    src: image.urls.small, 
    width: image.width,
    height: image.height,
    caption: image.description,
    url: image.urls.full,
    link: image.links.html,
    creditName: image.user.name
  }});
}