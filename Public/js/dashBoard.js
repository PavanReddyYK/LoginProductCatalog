// const url = document.URL       //  -->>  http://localhost:1526/home?session_id=s1001
// alert(url)

// const url = document.URL 
//     const url1= url.split('?')
//     alert(url1[1])

function displayUser(user_id){
  // alert(user_id);
  const session_id = sessionStorage.getItem('sid');
  window.location=`http://localhost:8445/Details?uID=${user_id}&sID=${session_id}`
}

function fetchUsers(){ 
  const sessionId = sessionStorage.getItem('sid');

  $.post(`/fetchData`,
  {
      session_id : sessionId
  },
  (data)=>{
      // console.log(data);
      let consumerData = ""
      let adminData =""
      for(let i = 0; i < data.length ; i++){
        const type = data[i].user_type
        if(type=="admin")
        {
          adminData += '<tr><td>'+data[i].user_name + '</td><td>'+data[i].user_phone + '</td><td><input type="button" name="" id="button" value="View" onclick="displayUser('+ data[i].user_id +')"/></td></tr>'
        }
        else{
          consumerData += '<tr><td>'+data[i].user_name + '</td><td>'+data[i].user_phone + '</td><td><input type="button" name="" id="button" value="View" onclick="displayUser('+ data[i].user_id +')"/></td></tr>'
        }

      }
      
      document.getElementById('consumerData').innerHTML = consumerData;
      document.getElementById('adminData').innerHTML= adminData;
  })
}





