const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'PrismaClientKnownRequestError') {
      return res.status(400).json({ error: 'Database error', code: err.code });
    }
  
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
  
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
  
    res.status(err.status || 500).json({
      error: err.message || 'Something went wrong on our end',
    });
  };
  
  module.exports = errorHandler;