import axios from 'axios';
export async function GET() {
    const options = {
        method: 'GET',
        headers: {
            'CF-Access-Client-Id': 'cd2d09c48b9768628d7a2bb64f33f512.access',
            'CF-Access-Client-Secret': '0c740a47ab5d68f8154f2b59249e4b49a1888f8319795ffa4bac533b0a922e12',
            Authorization: 'Bearer rBBPLafB293CDFisvXBsfv9aWviTJBSByBTXuvu7ykvb6QxDpMP3bqhd68msexKz'
        }
    };
    // const res = await axios.get('https://cms.blayze.cc/items/articles', options);

    const res = await fetch('https://cms.blayze.cc/items/articles', options);
    const result = await res.json();
    console.log(result);
    return { body: result };
}