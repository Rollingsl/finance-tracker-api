process.env.DATABASE_URL = "postgresql://postgres:postgres123@localhost:5432/finance_tracker";
process.env.JWT_SECRET = "your_super_secret_key_change_this";
process.env.PORT = "3000";

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});