// Handle URL yang tidak ditemukan
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Handle semua error server
const errorHandler = (err, req, res, next) => {
  // Jika status code masih 200, ubah jadi 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode);
  res.json({
    message: err.message,
    // Tampilkan stack trace hanya di mode development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };