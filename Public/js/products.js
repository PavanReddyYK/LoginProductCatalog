// const url = document.URL       //  -->>  http://localhost:1526/home?session_id=s1001
// alert(url)

// const url = document.URL 
//     const url1= url.split('?')
//     alert(url1[1])

function viewProduct(product_id){
  // alert(user_id);
  const session_id = sessionStorage.getItem('sid');
  window.location=`http://localhost:8445/Details?uID=${product_id}&sID=${session_id}`
}

function fetchProducts(){
  const sessionId = sessionStorage.getItem('sid');

  $.post(`/fetchData`,
  {
      session_id : sessionId
  },
  (data)=>{
      console.log(data);

      let productData = ""
      for(let i = 0; i < data.length ; i++){
        productData += '<tr><td>'+data[i].product_name+'</td><td><button class="btn btn-primary" onclick="viewProduct('+data[i].product_id+')">View Product</button></td></tr>'
      }
      document.getElementById('productsData').innerHTML= productData;
  })
}





