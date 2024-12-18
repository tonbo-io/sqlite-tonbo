import init, { Connection } from "./pkg/sqlite_tonbo.js";

await init();

const conn = Connection.open();
console.log("ha")
await conn.create(
    "CREATE VIRTUAL TABLE temp.tonbo USING tonbo(" +
    "id='int primary key'," +
    "name='varchar nullable'," +
    "like='int nullable'" +
    ");",
);
await conn.insert("INSERT INTO tonbo (id, name, like) VALUES (0, 'lol', 0)");
await conn.insert("INSERT INTO tonbo (id, name, like) VALUES (1, 'tonbo', 12)");
await conn.insert("INSERT INTO tonbo (id, name, like) VALUES (2, 'fusio', 23)");
await conn.select("SELECT * FROM tonbo;").then((res) => {
    console.log(res);
});

await conn.delete("DELETE from tonbo WHERE id = 1").then(() =>  {
    console.log("after delete id:0")
    conn.select("SELECT * FROM tonbo;").then(res => {
        console.log(res);
        conn.update("UPDATE tonbo SET name = 'sqlite-tonbo', like = 10, id = 3 WHERE id = 0").then(() => {
            console.log("after update 0 to {name: 'sqlite-tonbo', like: 10, id: 3}");
            conn.select("SELECT * FROM tonbo;").then(res => {
                console.log(res);
            });
        });
    });
});

