let conn;

(async () => {
  const tonbo = await import("./pkg/sqlite_tonbo.js");
  await tonbo.default();

  conn = tonbo.Connection.open();

  await conn.create(`CREATE VIRTUAL TABLE temp.tonbo USING tonbo(
      table_name ='tonbo',
      addr = 'http://localhost:50051',
    );`);

  for (let i = 0; i < 10; i++) {
    await conn.insert(
      `INSERT INTO tonbo (id, name, like) VALUES (${i}, 'lol', ${i})`
    );
  }
})();

onmessage = function (event) {
  const sql = event.data.sql;
  const type = event.data.type;
  switch (type) {
    case "select":
      conn.select(sql).then((res) => {
        this.postMessage({ type: type, data: res });
      });
      break;
    case "insert":
      conn.insert(sql).then((res) => {
        this.postMessage({ type: type, data: res });
      });
      break;
    default:
      break;
  }
};