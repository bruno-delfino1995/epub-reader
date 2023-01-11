const express = require('express')
const app = express()
const port = 3000

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

const getBookUrl = async (book) => {
	const client = new S3Client({
		endpoint: 'http://localhost:4566'
	});

	const command = new GetObjectCommand({
		Bucket: 'bucket',
		Key: `bucket/${book}`
	});

	const url = await getSignedUrl(client, command, { expiresIn: 3600 });

	return url;
}

app.use(express.static('public'))

app.get('/url/*', async (req, res) => {
	const book = req.params[0];
	const url = await getBookUrl(book);

  res.send(url)
})

app.get('/bibi-bookshelf/*', async (req, res) => {
	const book = req.params[0];
	const url = await getBookUrl(book);

  res.redirect(url)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
