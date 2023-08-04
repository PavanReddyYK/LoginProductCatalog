const url = document.URL 
const url1= url.split('?')
const data1=url1[1].split('&')
const uid = data1[0].split('=')
const sid = data1[1].split('=')
function loadData(){
    // alert (sid[1]+"   "+ uid[1])

    // const url4 = new URL(url)
    // const uid4 = url4.searchParams.get('uID')

    $.post(`/showDetails`,
  {
      "sessionid": sid[1],
      "id" :uid[1]
  },
  (data)=>{
      // console.log(data);
      var name = data.user_name;
      var phone = data.user_phone;
      var userID = data.user_id;
      var address = data.user_address;
    
      document.getElementById('name').value = name
      document.getElementById('phone').value = phone
      document.getElementById('id').value = userID
      document.getElementById('address').value = address
  })
}

function editData(){
    document.getElementById('name').removeAttribute('disabled')
      document.getElementById('phone').removeAttribute('disabled')
    //   document.getElementById('type').innerHTML =  `<input type="text" class="enabled" name="" value="">`
      document.getElementById('address').removeAttribute('disabled')
      document.getElementById('saveButton').className="show"
      document.getElementById('cancelButton').className="show"
      document.getElementById('deleteButton').className="hide"
      document.getElementById('editButton').className="hide"
}

function cancelChange(){
    location.reload()
}
function deleteData(){
  if(window.confirm("Are you sure you want to proceed?"))
  {
    $.post(`/deleteData`,
    {
        "uID"  :  uid[1]
    },
    (data)=>{
      console.log(data)  // res.status(200)   -->   OK
      if(data == 'OK'){
        window.location=`/home?sessionId=${sid[1]}`
      }
        else{
          document.getElementById('response').innerHTML='<span style="color: rgb(229, 21, 21);">Failed to delete user!!</span>'
        }
      })
  }
  else{
    location.reload()
  }
}
function saveChange(){
    const name = document.getElementById('name').value
    const phone = document.getElementById('phone').value
    const address = document.getElementById('address').value

    $.post(`/update`,
  {
      "name": name,
      "phone" : phone,
      "address" : address,
      "uID"  :  uid[1],
      "sID" : sid[1]
  },
  (data)=>{
    console.log(data)  // res.status(200)   -->   OK
    if(data == 'OK'){
      location.reload()
      document.getElementById('response').innerHTML='<span style="color: rgb(21, 229, 35);">Edit successfull, changes have been saved</span>'
    }
    else if(data=='undefined'){
      document.getElementById('response').innerHTML='<span style="color: rgb(21, 929, 35);">Invalid Entry</span>'
    }
      else{
        document.getElementById('response').innerHTML='<span style="color: rgb(229, 21, 21);">Failed to save changes</span>'
      }
  })
}