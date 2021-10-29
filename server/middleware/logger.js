module.exports = {
  logger: (req, res, next) => {
    res.on('finish', () => {
      console.log(`${req.originalUrl} ${req.method} ${res.statusCode} `);
    });
    next();
  },
};
