'use strict';

async function postData(url, data) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data,
    });

    return await response.json();
}

export default postData;