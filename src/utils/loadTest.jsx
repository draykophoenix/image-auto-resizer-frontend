import { uploadImageToS3 } from "../api/frontendServer"
import sleep from "./sleep";

export default async function loadTest(num, delay) {
    for (var i = 0; i < num; i++) {
        uploadImageToS3(data[i].url, `_LT_${data[i].key}.jpg`);
        await sleep(delay);
        console.log("Bang!");
    }
}

const data = [
    {
        "url": "https://images.unsplash.com/photo-1517849845537-4d257902454a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwxfHxkb2d8ZW58MHx8fHwxNjk5MTc1NTAzfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-0"
    },
    {
        "url": "https://images.unsplash.com/photo-1552053831-71594a27632d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwyfHxkb2d8ZW58MHx8fHwxNjk5MTc1NTAzfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-1"
    },
    {
        "url": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwzfHxkb2d8ZW58MHx8fHwxNjk5MTc1NTAzfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-2"
    },
    {
        "url": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHw0fHxkb2d8ZW58MHx8fHwxNjk5MTc1NTAzfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-3"
    },
    {
        "url": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHw1fHxkb2d8ZW58MHx8fHwxNjk5MTc1NTAzfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-4"
    },
    {
        "url": "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHw2fHxkb2d8ZW58MHx8fHwxNjk5MTc1NTAzfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-5"
    },
    {
        "url": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHw3fHxkb2d8ZW58MHx8fHwxNjk5MTc1NTAzfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-6"
    },
    {
        "url": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHw4fHxkb2d8ZW58MHx8fHwxNjk5MTc1NTAzfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-7"
    },
    {
        "url": "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHw5fHxkb2d8ZW58MHx8fHwxNjk5MTc1NTAzfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-8"
    },
    {
        "url": "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwxMHx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-9"
    },
    {
        "url": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwxMXx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-10"
    },
    {
        "url": "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwxMnx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-11"
    },
    {
        "url": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwxM3x8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-12"
    },
    {
        "url": "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwxNHx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-13"
    },
    {
        "url": "https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwxNXx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-14"
    },
    {
        "url": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwxNnx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-15"
    },
    {
        "url": "https://images.unsplash.com/photo-1597633425046-08f5110420b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwxN3x8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-16"
    },
    {
        "url": "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwxOHx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-17"
    },
    {
        "url": "https://images.unsplash.com/photo-1575859431774-2e57ed632664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwxOXx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-18"
    },
    {
        "url": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwyMHx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-19"
    },
    {
        "url": "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwyMXx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-20"
    },
    {
        "url": "https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwyMnx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-21"
    },
    {
        "url": "https://images.unsplash.com/photo-1544568100-847a948585b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwyM3x8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-22"
    },
    {
        "url": "https://images.unsplash.com/photo-1581888227599-779811939961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwyNHx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-23"
    },
    {
        "url": "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwyNXx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-24"
    },
    {
        "url": "https://images.unsplash.com/photo-1546491764-67a5b8d5b3ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwyNnx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-25"
    },
    {
        "url": "https://images.unsplash.com/photo-1558788353-f76d92427f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwyN3x8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-26"
    },
    {
        "url": "https://images.unsplash.com/photo-1560525821-d5615ef80c69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwyOHx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-27"
    },
    {
        "url": "https://images.unsplash.com/photo-1534551767192-78b8dd45b51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwyOXx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-28"
    },
    {
        "url": "https://images.unsplash.com/photo-1534361960057-19889db9621e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTQwODl8MHwxfHNlYXJjaHwzMHx8ZG9nfGVufDB8fHx8MTY5OTE3NTUwM3ww&ixlib=rb-4.0.3&q=80&w=1080",
        "key": "dog-29"
    }
]