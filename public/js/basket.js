// ! get item
const addToCartBtn = document.getElementById("addTocart");
const cartDOM = document.querySelector(".cart__items");
const totalCount = document.querySelectorAll(".cart_quantity");
const totalPrice = document.querySelectorAll(".price");


const discountInput = document.getElementById("discountInput");
const discountBtn = document.getElementById("discountBtn");

if (discountBtn) {
    discountBtn.addEventListener("click", e => {
        e.preventDefault();
        document.cookie = `discount__Molla = ${discountInput.value};`
    })
}

let cartItems = (JSON.parse(localStorage.getItem("cart___items")) || []);
document.addEventListener("DOMContentLoaded", loadData)



if (addToCartBtn !== null) {
    addToCartBtn.addEventListener("click", e => {
        e.preventDefault();


        // ! get parent 
        var parentElement = document.getElementById("card__item");

        var product = {
            id: parentElement.querySelector("#attr__id").value.replace(/ /g, ''),
            attr: parentElement.querySelector("#attr__id").value.replace(/ /g, ''),
            color: parentElement.querySelector("#attr__color").value,
            title: parentElement.querySelector("#product__title").innerText,
            price: parseInt(parentElement.querySelector("#priceTag").innerText.replace(/\,/g, "")),
            image: parentElement.querySelector("#product__image").value,
            quantity: 1,
        }


        let isInCart = cartItems.filter(item => item.id === product.id).length > 0;

        if (!isInCart) {
            cartItems.push(product);
            length();
            saveToLocalStorage();
        } else {
            return alert("این محصول در سبد خرید موجود است");
        }
    })

}
// ! save to local storage
const saveToLocalStorage = () => {
    localStorage.setItem("cart___items", JSON.stringify(cartItems));
    document.cookie = `cart__Molla = ${JSON.stringify(cartItems)};`
}
// ! show product in cart html
function addItemToTheDom(product) {
    cartDOM.insertAdjacentHTML("afterbegin", `
    <tr class="cart__item">
    <td class="product-col">
        <div class="product">
            <figure class="product-media">
                <a href="#">
                    <img src="/uploads/images/products/${product.image}"
                        alt="${product.title}">
                </a>
            </figure>

            <h3 class="product-title">
                <a href="#">${product.title}</a>
            </h3>
        </div><!-- End .product -->
        <input type="hidden" name="" id="product__id" value="${product.attr}">
    </td>
    <td class="price-col"> <span style="background-color:${product.color};padding :.5rem;"></span></td>
    <td class="price-col mt-2">${product.price}</td>
    <td class="quantity-col product_quantity">
        <div class="cart-product-quantity product_quantity">
        <input class="product__quantity" min="1" max="100" value="${product.quantity}" type="number" action='count' />
        </div>
    </td>
    <td class="remove-col product_remove" action='remove'><button class="btn-remove"><i
                class="icon-close"></i></button></td>
</tr>
    `)
}


// ! calc total price
function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.quantity * item.price
    })

    document.querySelector(".cart_amount").innerText = separate(total);
    document.querySelector(".cart_amount-t").innerText = separate(total + 30000);
    totalPrice.forEach(i => i.innerText = total)
    totalCount.forEach(i => i.innerText = cartItems.length)
    length();
}

// ! load data
function loadData() {
    if (cartItems.length > 0) {
        cartItems.forEach(product => {
            addItemToTheDom(product);
            const cartDOMItems = document.querySelectorAll(".cart__item");
            cartDOMItems.forEach(inItem => {
                if (inItem.querySelector("#product__id").value === product.id) {
                    removeItem(inItem, product)
                    priceItem(inItem, product)
                    length();
                }
            })
        });
        calculateTotal();
        saveToLocalStorage();
    }
}


// ! removeItem
const removeItem = (inItem, product) => {
    inItem.querySelector("[action='remove']").addEventListener("click", () => {
        cartItems.forEach(cartItem => {
            if (cartItem.id === product.id) {
                cartItems = cartItems.filter(newElement => newElement.id !== product.id);
                inItem.remove();
                calculateTotal();
                length();
                saveToLocalStorage();
            }
        })
    })
}


// ! priceItem 
const priceItem = (inItem, product) => {
    inItem.querySelector(".product__quantity").addEventListener("change", () => {
        cartItems.forEach(cartItem => {
            if (cartItem.id === product.id) {
                cartItem.quantity = parseInt(inItem.querySelector(".product__quantity")
                    .value);
                calculateTotal();
                length();
                saveToLocalStorage();
            }
        })
    })
}

// ! total length
const length = () => {
    document.querySelector(".cart-count").innerText = cartItems.length;
}
length();

