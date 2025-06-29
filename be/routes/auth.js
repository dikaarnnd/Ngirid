const express = require('express');
const router = express.Router();
const getConnection = require('../db');

// Signup
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const conn = await getConnection();

    await conn.execute(
      `INSERT INTO users (username, password, email) VALUES (:username, :password, :email)`,
      [username, hashedPassword, email],
      { autoCommit: true }
    );

    res.json({ message: "Akun berhasil dibuat" });
  } catch (err) {
    console.error("❌ Error insert:", err);
    res.status(500).json({ message: "Gagal membuat akun" });
  }
});

// ✅ Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT * FROM users WHERE username = :username`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    const user = result.rows[0];
    const hashedPassword = user[2]; // Asumsikan password ada di kolom ke-2

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    res.json({ message: "Login berhasil", user });
  } catch (err) {
    console.error("❌ Error login:", err);
    res.status(500).json({ message: "Gagal login" });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute(`SELECT * FROM users`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal ambil user" });
  }
});

module.exports = router;
