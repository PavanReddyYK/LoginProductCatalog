const helper = require('../helper/help1');
const {uuid} = require('uuidv4');

const  login = (req,res)=>{
    const phone = req.body.phone;
    const password = req.body.password;
    const data = {
        outer_select:'user_id',   
        outer_table : 'user_info',
        outer_condition : `user_phone = '${phone}' && user_password = '${password}'`
    };

    helper.selectData(data,(result)=>{
        if(result.length==1){
            const userid = result[0].user_id;

            const session_data = {
                outer_select:'session_id',
                outer_table : 'session_info',
                outer_condition : `user_id = ${userid}`
            };
            helper.selectData(session_data,(session)=>{
                if(session.length==1){
                    const session_id = session[0].session_id;
                    res.send(session_id);  
                }else
                {
                    if(session.length==0){
                        console.log(uuid());

                        const sessionId = uuid();
                        const new_session_data = {
                            table_name : "session_info",
                            column_name : "session_id,user_id",
                            values : `"${sessionId}","${result[0].user_id}"`
                        }
                        helper.insertData(new_session_data,(success)=>{
                            if(success){
                                res.send(sessionId)
                            }else{
                                res.sendStatus(500);
                            }
                        });
                    }
                }
            })
        }
        else
        {
            // console.log("invalid credentials")
            res.render('index.html');
        }
    })

}

const dashboard = (req,res)=>{
    const sessionId = req.query.sessionId;
    const data= {
    outer_select    : 'user_type',
    outer_table     : 'user_info',
    outer_condition : `user_id `,
    inner_select    : 'user_id',
    inner_table     : 'session_info',
    inner_condition : `session_id = "${sessionId}"`
    }

    helper.getData(data,(result)=>{
        if(result.length == 1){
            const userType = result[0].user_type;
            if(userType=='admin'){
                res.render('dashBoard.html');
            }else
            {
                res.render('products.html');
            }
        }else
        {
            res.sendStatus(500);
        }
    })
}

const fetchData = (req,res)=>{
    const sessionId = req.body.session_id;

    const data= {
        outer_select    : 'user_type',
        outer_table     : 'user_info',
        outer_condition : `user_id `,
        inner_select    : 'user_id',
        inner_table     : 'session_info',
        inner_condition : `session_id = "${sessionId}"`
        }
    
        helper.getData(data,(result)=>{
            if(result.length == 1){
                const userType = result[0].user_type;
                if(userType=='admin'){
                    const data= {
                        outer_select    : '*',
                        outer_table     : 'user_info',
                        outer_condition : '1=1'
                    }
                    helper.selectData(data,(result)=>{
                        // console.log(result)
                        res.send(result);
                    })
                }else if(userType=='consumer')
                {
                    const data= {
                        outer_select    : '*',
                        outer_table     : 'product_info',
                        outer_condition : '1=1'
                    }
                    helper.selectData(data,(result)=>{
                        // console.log(result)
                        res.json(result);
                    })
                }
            }else
            {
                res.sendStatus(500);
            }
        })
}

const displayData= (req,res)=>
{
    const uid = req.query.uID;
    const sid = req.query.sID;

    const sessionData = {
    outer_select    : 'user_type',
    outer_table     : 'user_info',
    outer_condition : 'user_id',
    inner_select    : 'user_id',
    inner_table     : 'session_info',
    inner_condition :  `session_id="${sid}"`
    }
    helper.getData(sessionData,(result)=>{
        if(result.length==1)
        {
            console.log(result[0]);
            if(result[0].user_type=='admin')
            {
                res.render('userDetails.html')
            }
            else if(result[0].user_type=='consumer')
            {
                res.render('productDetails.html')
            }
        }
    })
}

const showData=(req,res)=>
{
    const uORpID = req.body.id;
    const sid = req.body.sessionid;
    // let sid=sessionStorage.getItem('sid');   // cant user sessionStorage in backEnd/server

    const sessionData = {
        outer_select    : 'user_type',
        outer_table     : 'user_info',
        outer_condition : 'user_id',
        inner_select    : 'user_id',
        inner_table     : 'session_info',
        inner_condition :  `session_id="${sid}"`
    }
    helper.getData(sessionData,(result)=>
    {
        if(result.length==1)
        {
            console.log(result[0]);
            if(result[0].user_type=='admin')
            {
                // res.json(result[0])
                const userArguments ={
                    outer_select : 'user_name, user_phone, user_id, user_address',
                    outer_table : 'user_info',
                    outer_condition : ` user_id = '${uORpID}'`
                }

                helper.selectData(userArguments,(result)=>{
                    // console.log(result)
                    if(result.length==1){
                        res.json(result[0])
                    }
                    else
                    {
                        res.status(401).json({msg:"Data not found"})
                    }
                })
            }
            else if(result[0].user_type=='consumer')
            {
                // console.log("consumer22 broo");
                // res.json(result[0])
                const userArguments ={
                    outer_select : 'product_name, product_desc, product_id, product_price',
                    outer_table : 'product_info',
                    outer_condition : `product_id = '${uORpID}'`
                }

                helper.selectData(userArguments,(result)=>{
                    // console.log(result)
                    if(result.length==1){
                        res.json(result[0])
                    }
                    else
                    {
                        res.status(401).json({msg:"Data not found"})
                    }
                })

            }
        }
    })
}

    const updateData = (req,res)=>
    {
        const name = req.body.name
        const phone = req.body.phone
        const address = req.body.address
        const uID  =  req.body.uID
        const sID  = req.body.sID

        const data= {
            outer_select    : 'user_type',
            outer_table     : 'user_info',
            outer_condition : `user_id `,
            inner_select    : 'user_id',
            inner_table     : 'session_info',
            inner_condition : `session_id = "${sID}"`
            }
        
            helper.getData(data,(result)=>{
                if(result.length == 1){
                    const userType = result[0].user_type;
                    if(userType=='admin'){
                        const updateValues = {
                            table_name  : `user_info`,
                            columnValue : ` user_name="${name}",user_phone="${phone}",user_address="${address}"`,
                            condition   : `user_id=${uID}`
                        }
                        helper.updateData(updateValues,(result)=>{
                            if(result==1)
                            {
                                res.sendStatus(200)
                            }
                            else if(result==2)
                            {
                                res.status(406)
                            }
                            else{
                                res.sendStatus(500)
                            }
                        })
                    }else if(userType=='consumer')
                    {
                        res.status(401)
                    }
                }else
                {
                    res.sendStatus(500);
                }
            })
    }

    const deleteData = (req,res)=>{
        const uID = req.body.uID

        const data = { 
            table_name  : 'user_info',
            condition   : `user_id=${uID}`
        }

        helper.deleteData(data,(result)=>{
            if(result)
            {
                res.sendStatus(200)
            }
            else{
                res.sendStatus(500)
            }
        })
    }

module.exports = {login,dashboard,fetchData,displayData, showData, updateData,deleteData};