const fetch = require('node-fetch');

exports.handler = async function(event) {
  const query = event.queryStringParameters.query;
  const page = event.queryStringParameters.page || 1;
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}&per_page=12`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};
