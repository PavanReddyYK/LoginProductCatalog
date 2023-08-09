const mysql = require("mysql2");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "training1",
  });

  con.connect(function (err) {
    if (err){
        throw err;
    }
    else{
        console.log("Connected!");
    }
});

const   selectData = (data,callBack)=>{
    const outer_select = data.outer_select;
    const outer_table = data.outer_table;
    const outer_condition = data.outer_condition;

    const select_query = `SELECT ${outer_select} FROM ${outer_table} WHERE ${outer_condition}`

    con.query(select_query,(err,result)=>{
        if(err) {
            throw err;
        }else
        {
            callBack(result);          // Array Format
        }
    })
}

const insertData = (data,callBack) =>{
    const table_name = data.table_name;
    const column_name = data.column_name;
    const values = data.values;

    const insert_query = `INSERT INTO ${table_name} (${column_name}) VALUES (${values});`

    con.query(insert_query,(insert_err,insert_result)=>{
        if(insert_err){
            throw insert_err;
        }else{
            console.log("Data Inserted..")
            callBack(1)
        }
    })
}

const getData = (data,callBack)=>{
    const outer_select = data.outer_select;
    const outer_table = data.outer_table;
    const outer_condition = data.outer_condition;
    const inner_select = data.inner_select;
    const inner_table = data.inner_table;
    const inner_condition = data.inner_condition;

    const getQuery = `SELECT ${outer_select} FROM ${outer_table} WHERE ${outer_condition} IN (SELECT ${inner_select} FROM ${inner_table} WHERE ${inner_condition});`
    
    con.query(getQuery,(Err, getResult)=>{
        if(Err){
            throw getErr;
        }else{
            callBack(getResult);
        }
    })
}

const updateData = (data, callBack)=>{
    const table_name  = data.table_name
    const columnValue =  data.columnValue
    const condition = data.condition

    const select_query = `UPDATE ${table_name} SET ${columnValue} WHERE ${condition};`

    con.query(select_query,(err,result)=>{
        console.log(result)
        if(err){
            callBack(0);
        }
        else if(result== undefined)
        {
            callBack(2)
        }
        else{
            callBack(1)
        }
    })
}

const deleteData = (data, callBack)=>{
    const table_name = data.table_name
    const condition = data.condition

    const delete_query= `DELETE FROM ${table_name} WHERE ${condition};`

    con.query(delete_query,(err,result)=>{
        if(!err)
        {
            callBack(1)
        }else{
            callBack(0)
        }
    })
}

module.exports = {selectData,insertData,getData, updateData, deleteData};
