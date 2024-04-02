const express = require('express')
const mysql = require('mysql2')
const app = express()
app.use(express.json())

const connection =  mysql.createConnection({
    user : "admin",
    password : "NoTeDeSt^C10.6?SxwY882}",
    host : "nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com",
    port : "3306",
    database : "conqtvms_dev"
})
const getDatails = (req, res) => {

    const pageSize = req.query.pageSize ? req.query.pageSize : 10
    const currentPage = req.query.currentPage ? req.query.currentPage : 1
    const searchBy = req.query.searchBy ? req.query.searchBy : ''
    const searchFields = req.query.searchFields && Array.isArray(req.query.searchFields) ? req.query.searchFields : []

    const Limit = pageSize
    const offset = (currentPage - 1) * pageSize
    const query = `select * from ProductV2  Limit ${offset}, ${Limit}`

    connection.query(query, (err, data) => {
        if (err) {
            res.status(500).json({ status: "failed" })
        } else {
            const result = data.filter(product => {
                const fieldsToSearch = searchFields.length ? searchFields : Object.keys(product);
                return fieldsToSearch.some(field => {
                    return String(product[field]).toLowerCase().includes(searchBy.toLowerCase());
                });
            });
            res.status(200).json(result.length ? result : data)
        }
    })
}


 app.get('/getdetails',(req,res)=>{
    getDatails(req,res)
 })




app.listen('3000', ()=>{
if(connection) {
    console.log("db connected");
}
    console.log('server started' );
})