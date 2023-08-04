function validate(){
    // alert('hi')

    const phone = document.getElementById('phoneNo').value;
    const password = document.getElementById('password').value;

    if(phone.length>0 && password.length>0)
    {
        $.post('/login',
        {
            phone : phone,   
            password : password
        },
        (data)=>{
            // const sid = data.session_id
            const sessionId = data;
            sessionStorage.setItem('sid', sessionId);
            window.location.href = `/home?sessionId=${sessionId}`
        })
        .error=(xhr)=>{
            console.log(xhr);
            document.getElementById('msg').innerHTML='<b style="color: red; " class="mx-1">Invalid Credentials</b>'
        };
    }
    else{
        document.getElementById('msg').innerHTML='<b style="color: red; " class="mx-1">Enter the Credentials</b>'
    }
   
 

}



