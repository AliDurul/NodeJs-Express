module.exports = (err, req, res, next) => {
  const errStatusCode = res?.errStatusCode ?? 500

  res.status(errStatusCode).send({
    error: true,
    message: err.message,
    cause: err.cause,
    body: req.body,
  });
};
