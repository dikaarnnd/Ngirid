const oracledb = require('oracledb');

const dbConfig = {
  user: "system",
  password: "test",
  connectString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1522))(CONNECT_DATA=(SID=FREE)))"
};

async function getConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    return connection;
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    throw err;
  }
}

module.exports = getConnection;
