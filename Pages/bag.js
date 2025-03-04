const CONVENIENCE_FEES = 99;
let bagItemObject;
onLoad();

function onLoad(){
    LoadBagItem();
    displayBagItems();
    displayBagSummary();
}



function displayBagSummary(){
    let bagsumaryele = document.querySelector('.bag-summary');
    let totalItem = bagItemObject.length;
    let totalMRP = 0 ;
    let totalDiscount =0;
    let finalPayment = 0;
    bagItemObject.forEach(non => {
        totalMRP += non.original_price;
        console.log(totalMRP);
       totalDiscount +=  (non.original_price -non.current_price);
    });
    finalPayment = ((totalMRP-totalDiscount)+ CONVENIENCE_FEES);

    bagsumaryele.innerHTML =  `
    <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹${finalPayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>
  `
}
function LoadBagItem(){
bagItemObject=addTo.map(itemid =>{
    for(let i =0; i < items.length;i++ ){
        if(itemid == items[i].id){
            return items[i];
        }
    }
})
}

function displayBagItems(){

    let containerEle = document.querySelector('.bag-items-container');
    let innerTex = '';
    bagItemObject.forEach(element => {
       innerTex += generateItemHtml(element)  
    });
    containerEle.innerHTML = innerTex;
}

function removeFromBag(id){
    addTo = addTo.filter(iid => iid != id);
    localStorage.setItem('addTo',JSON.stringify(addTo));
    LoadBagItem();
    displayBagItems();
    displayBagSummary();
}

function generateItemHtml(item){
return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="/images/Products/${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>`;
}

