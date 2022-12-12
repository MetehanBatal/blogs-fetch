export async function GET() {
    const options = {
        method: 'POST',
        headers: {
			cookie: 'CF_Authorization=eyJraWQiOiJhNjdkMTdkOThlNTA5NWEzZGE4OWRiNWY2ODk0Nzg3NzEwNjgwOGEwNmI2OTg2NDI3OGQzZWFhNjMyYjQ1MzcyIiwiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1QifQ.eyJ0eXBlIjoiYXBwIiwiYXVkIjoiNTAwNzcxZmM0ZjE0NTczNjBlMTFjZjczNjkyM2M1MGY3YjUwNjAxYWRjYmEzYzkxNzhlODE4OTU2N2VmZjkyZCIsImV4cCI6MTY3MDQ2NDc0NSwiaXNzIjoiaHR0cHM6XC9cL2JsYXl6ZS5jbG91ZGZsYXJlYWNjZXNzLmNvbSIsImNvbW1vbl9uYW1lIjoiY2QyZDA5YzQ4Yjk3Njg2MjhkN2EyYmI2NGYzM2Y1MTIuYWNjZXNzIiwiaWF0IjoxNjY3ODM2NzQ1LCJzdWIiOiIifQ.fdP46xHiROHVAIhasBHSxn4Fb07nbRAdduKsW6rDqaT5kVxLOtI0hx0-IB56aqDYOJJCHa57Nt4MSGAsF3LE_upUbsOWf38XOgAzSY-5jDAQEQaen9ZiXhF2fxxG7VhT6NT0r2uaKD6_HR_gcZcyUxF8IvbFn7fq2dtxFthtM8SuMqc1yBiRaSxyPr5vG3ufgKCV9W_DHWUuD153qPya-0hpwNewsH462NJpbo1wHvax-f5Ex5y2JvkccF6mAX5aYQ0TR7rs_VziB0_Gup3ckUxLA4IRJkSpkJfWK9Hogu8vFLl9Pklk_nRidobdPYLtvYVEH3gohs8KVD_2jaaIrQ',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ROrTakRL3yIv8WYJuHoVG1fcRjNXVbl6'
		},
        body: '{"query":"query {\\n\\tarticles (limit: 500, filter: { sports: { sport_id: { name: {_eq: \\"Car Racing\\"} }}}) {\\n\\t\\tid\\n\\t\\texcerpt\\n\\t\\ttitle\\n\\t\\tmeta_description\\n\\t\\ttype\\n\\t\\tslug\\n\\t\\tis_featured\\n\\t\\tis_premium\\n\\t\\tupdated_at\\n\\t\\tvideo_playlist_id {\\n\\t\\t\\ttitle\\n\\t\\t\\tdescription\\n\\t\\t\\tvideos {\\n\\t\\t\\t\\tvideo_id {\\n\\t\\t\\t\\t\\ttitle\\n\\t\\t\\t\\t\\tmux_playback_id\\n\\t\\t\\t\\t\\tdescription\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\ttypes {\\n\\t\\t\\tarticle_type_id {\\n\\t\\t\\t\\ttitle\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tcategories {\\n\\t\\t\\tarticle_category_id {\\n\\t\\t\\t\\ttitle\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\tsports {\\n\\t\\t\\tsport_id {\\n\\t\\t\\t\\tname\\n\\t\\t\\t}\\n\\t\\t}\\n\\t\\thero_image {\\n\\t\\t\\tfilename_disk\\n\\t\\t}\\n\\t\\tauthors {\\n\\t\\t\\tauthor_id {\\n\\t\\t\\t\\tfull_name\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n}\\n"}'
    };
    // const res = await axios.get('https://cms.blayze.cc/items/articles', options);

    const res = await fetch('https://cms.blayze.cc/graphql?limit=1000', options);
    const result = await res.json();

    return { body: result };
}