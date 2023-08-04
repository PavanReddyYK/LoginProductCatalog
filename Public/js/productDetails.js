function loadData(){
  const url   = document.URL 
  const url1  = url.split('?')
  const data1 = url1[1].split('&')
  const uid   = data1[0].split('=')
  const sid   = data1[1].split('=')
  // alert (sid[1]+"   "+ uid[1])

  // const url4 = new URL(url)
  // const uid4 = url4.searchParams.get('uID')

  $.post(`/showDetails`,
{
    "sessionid": sid[1],
    "id" :uid[1]
},
(data)=>{

    console.log(data);
    const name        = data.product_name;
    const desc        = data.product_desc;
    const productID   = data.product_id;
    const price       = data.product_price;

    document.getElementById('name').innerHTML = name
    document.getElementById('desc').innerHTML = desc
    document.getElementById('id').innerHTML = productID
    document.getElementById('price').innerHTML = price
})
}
