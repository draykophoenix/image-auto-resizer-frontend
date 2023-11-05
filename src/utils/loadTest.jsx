import { uploadImageToS3 } from "../api/frontendServer"
import { data } from "./testPhotos";
import sleep from "./sleep";

export default async function loadTest(num, delay, setLoadStrikes) {
    for (var i = 0; i < num; i++) {
        const rand = Math.round((Math.random() * 10000)).toString()
        uploadImageToS3(data[i % 30].url, `_LT_${rand}_${data[i % 30].key}.jpg`);
        await sleep(delay);
        setLoadStrikes(i + 1);
    }
}