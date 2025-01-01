let addTo;
onload();

function onload(){
let addTostr = localStorage.getItem('addTo');
addTo = addTostr ? JSON.parse(addTostr) : [];
    displayItems();
display_bag_items();
}

function displayItems(){
let itemsContainerEle = document.querySelector('.items-container');

items.forEach((num)=>{
itemsContainerEle.innerHTML += `<div class="item-container">
    <img class="item-image" src="/images/Products/${num.image}" alt="item image">
    <div class="rating">${num.rating.stars}⭐| ${num.rating.count}K</div>
    <div class="company-name">${num.company}</div>
    <div class="item-name">${num.item_name.slice(0,25)}</div>
    <div class="price">
        <span class="current-price">Rs${num.current_price}</span>
        <span class="original-price">Rs${num.original_price}</span>
        <span class="discount">(${num.discount_percentage}% OFF)</span>
    </div>
    <div class="btn-add-bag" onclick ="addToBag(${num.id})">Add to Bag</div>
</div>`;
});
}


displayItems();

function addToBag(id){
 addTo.push(id);
 console.log(addTo);
 localStorage.setItem('addTo',JSON.stringify(addTo))
 display_bag_items();
}
function display_bag_items(){
    let displayEle = document.querySelector('.bag-item-count');
    if(addTo.length >0){
        displayEle.style.visibility = 'visible';
        displayEle.innerText =`${addTo.length}`;
    }else{displayEle.style.visibility = 'hidden';}
    // addTo ? displayEle.innerText =`${addTo.length}`: 0;    
}
display_bag_items();