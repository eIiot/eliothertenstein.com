const handler = (req, res) => {
  const url = decodeURIComponent(req.query.url)
  fetch(url)
    .then((response) => response.body)
    .then((body) => {
      body.pipe(res)
    })
}

export default handler
