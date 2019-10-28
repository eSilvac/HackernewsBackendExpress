const requestBody = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing"});
  } else {
    next();
  }
}

const requestParams = (req, res, next) => {
  if (!req.params) {
    return res.status(400).send("Request params is missing");
  } else {
    next();
  }
}

module.exports = {
  requestBody,
  requestParams
}
