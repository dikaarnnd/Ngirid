const express = require('express');
const router = express.Router();
const getConnection = require('../db');
const oracledb = require('oracledb');

// ✅ GET: Ambil semua transaksi user
router.get('/transactions/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log("🔍 Fetch transaksi untuk user ID:", userId);

  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT id, type, TO_CHAR(CREATED_DATE, 'YYYY-MM-DD') AS created_date, note, amount
       FROM transactions
       WHERE user_id = :userId
       ORDER BY CREATED_DATE DESC`,
      [userId],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetch transactions:", err);
    res.status(500).json({ message: "Gagal ambil transaksi" });
  }
});

// ✅ POST: Tambah transaksi
router.post('/transactions', async (req, res) => {
  const { user_id, type, amount, note, date } = req.body;

  if (!user_id || !type || !amount || !note || !date) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }

  try {
    const conn = await getConnection();

    console.log("📤 Payload ke Oracle:", { user_id, type, amount, note, date });

    const result = await conn.execute(
      `INSERT INTO transactions (USER_ID, TYPE, AMOUNT, NOTE, CREATED_DATE)
      VALUES (:user_id, :type, :amount, :note, TO_DATE(:created_date, 'YYYY-MM-DD'))`,
      {
        user_id: user_id,            // ✅ sama seperti di SQL
        type: type,
        amount: amount,
        note: note,
        created_date: date           // ✅ GANTI dari `:date` ke `:created_date`
      },
      { autoCommit: true }
    );

    console.log("✅ Transaksi ditambahkan:", result.rowsAffected);
    res.status(201).json({ message: 'Transaksi berhasil ditambahkan' });
  } catch (err) {
    console.error('❌ Gagal insert transaksi:', err.message);
    res.status(500).json({ message: 'Gagal menambahkan transaksi' });
  }
});

// ✅ PUT: Edit transaksi berdasarkan ID
router.put('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id, type, amount, note, date } = req.body;

  if (!user_id || !type || !amount || !note || !date) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }

  try {
    const conn = await getConnection();

    const result = await conn.execute(
      `UPDATE transactions
       SET user_id = :user_id,
           type = :type,
           amount = :amount,
           note = :note,
           created_date = TO_DATE(:created_date, 'YYYY-MM-DD')
       WHERE id = :id`,
      {
        user_id,
        type,
        amount,
        note,
        created_date: date,  // 🔄 match TO_DATE(:created_date)
        id
      },
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    res.json({ message: "Transaksi berhasil diperbarui" });
  } catch (err) {
    console.error("❌ Gagal update transaksi:", err.message);
    res.status(500).json({ message: "Gagal memperbarui transaksi" });
  }
});


// ✅ DELETE: Hapus transaksi berdasarkan ID
router.delete('/transactions/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `DELETE FROM transactions WHERE id = :id`,
      { id },
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    res.json({ message: "Transaksi berhasil dihapus" });
  } catch (err) {
    console.error("❌ Gagal hapus transaksi:", err.message);
    res.status(500).json({ message: "Gagal menghapus transaksi" });
  }
});



module.exports = router;
