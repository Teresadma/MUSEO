const mysql = require ("mysql2/promise");

async function main()
{
    try {
        let connection = await mysql.createConnection(
            {
                host: "localhost",
                user: "root",
                password: "administrador",
                database: "museo"
            }
        );
        console.log("Conexion correcta")
        // let sql = `SELECT p.name, expositor, date_dev, d.name, d.last_name, d.email
        // FROM prestado_a AS pa 
        // INNER JOIN posesion AS pos 
        // ON (pa.prestamo_id = pos.posesion_id)
        // INNER JOIN pieza AS p 
        // ON (p.pieza_id = pa.pieza_id)
        // INNER JOIN duenyo AS d
        // ON (p.duenyo_id = d.duenyo_id) 
        // WHERE pos.posesion_id = 2`;
        let sql = `SELECT place, 
        COUNT(pieza_id) 
        FROM pieza
        GROUP BY place
        ORDER BY pieza_id ASC`;

        let [result] = await connection.query(sql);
        console.log(result)
    }
    catch(err)
    {
        console.log(err)
        await connection.end();
    }
}
main();