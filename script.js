const btnsFilter = document.querySelectorAll('.filter__btn')
const productList = document.querySelector('.product__list')
const cartBtn = document.querySelector('.cart__btn')
const modalCart = document.querySelector('.modal__cart')
const closeBtnCart = document.querySelector('.cart__close')
const listCart = document.querySelector('.list__cart')
const clearBtnCart = document.querySelector('.clear__cart')
const resultPrice = document.querySelector('.text__price')
const cartCurrency = document.querySelector('.cart__btn-currency')
const btnSortPrice = document.querySelector('.sort__price-btn')
const logoBtnSortPrice = document.querySelector('.logo__sort-btn')

function loadPageSaveProductCart() {
    const loadPageSaveProducts = localStorage.getItem('cart')
    if (loadPageSaveProducts) {
        cartProducts = JSON.parse(loadPageSaveProducts)
        renderCart(cartProducts)
    }
}

cartBtn.addEventListener('click', () => {
    modalCart.classList.add('active')
})

closeBtnCart.addEventListener('click', () => {
    modalCart.classList.remove('active')
    console.log(1)
})

modalCart.addEventListener('click', (e) => {
    if (e.target === modalCart) {
        modalCart.classList.remove('active')
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modalCart.classList.remove('active')
    }
})

let products = [
    { id: 1, name: 'Laptop', price: 50000, category: 'Electronics' },
    { id: 2, name: 'Phone', price: 30000, category: 'Electronics' },
    { id: 3, name: 'Sneakers', price: 8000, category: 'Shoes' },
    { id: 4, name: 'T-shirt', price: 8000, category: 'Clothes' },
    { id: 5, name: 'Сomputer', price: 75000, category: 'Electronics' },
    { id: 6, name: 'Slates', price: 3000, category: 'Shoes' },
    { id: 7, name: 'Sweater', price: 9000, category: 'Clothes' },
]

let cartProducts = []

loadPageSaveProductCart()

function renderProducts(array) {
    productList.innerHTML = ''
    totalPrice()
    renderCurrencyCart()
    array.forEach((product) => {
        const li = document.createElement('li')
        li.textContent = `${product.name}: ${product.price} руб`
        productList.appendChild(li)
        const btnAdd = document.createElement('button')
        btnAdd.textContent = '+'
        btnAdd.classList.add('btn__add-cart')
        li.appendChild(btnAdd)
        btnAdd.addEventListener('click', () => {
            cartProducts.push(product)
            renderCart(cartProducts)
            saveProductsCart()
        })

    })
}

renderProducts(products)


function renderCart(array) {
    listCart.innerHTML = ''
    array.forEach((product) => {
        const itemCart = document.createElement('li')
        itemCart.textContent = `${product.name}: ${product.price}`
        listCart.appendChild(itemCart)
        const btnRemove = document.createElement('button')
        btnRemove.textContent = 'X'
        btnRemove.classList.add('btn__remove-cart')
        itemCart.appendChild(btnRemove)
        btnRemove.addEventListener('click', () => {
            const index = cartProducts.findIndex(p => p.id === product.id)
            if (index !== -1) {
                cartProducts.splice(index, 1)
                renderCart(cartProducts)
                saveProductsCart()
            }
        })
    })
    totalPrice()
    renderCurrencyCart()
}

function totalPrice() {
    const totalPrice = cartProducts.reduce((acc, product) => {
        return acc += product.price
    }, 0)
    resultPrice.textContent = totalPrice
}

function renderCurrencyCart() {
    if (cartProducts.length > 0) {
        cartCurrency.textContent = cartProducts.length
        cartCurrency.classList.add('show')
    } else {
        cartCurrency.classList.remove('show')
    }
}

function filterProducts() {
    btnsFilter.forEach((btn) => {
        btn.addEventListener('click', () => {
            const selectedCategory = btn.dataset.category
            const filtredArr = products.filter((product => product.category === selectedCategory))
            if (selectedCategory === 'all') {
                renderProducts(products)
            } else {
                renderProducts(filtredArr)
            }
        })
    })
}

filterProducts()

function sortPriceCart() {
    btnSortPrice.addEventListener('click', () => {
        logoBtnSortPrice.classList.toggle('click')
        if (logoBtnSortPrice.classList.contains('click')) {
            cartProducts = cartProducts.sort((a, b) => {
                return b.price - a.price
            })
        } else {
            cartProducts = cartProducts.sort((a, b) => {
                return a.price - b.price
            })
        }
        renderCart(cartProducts)
    })

}
sortPriceCart()

function activeSortBtns() {
    btnsFilter.forEach((btn) => {
        btn.addEventListener('click', () => {
            btnsFilter.forEach(b => b.classList.remove('active-link'))
            btn.classList.add('active-link')
        })
    })
}
activeSortBtns()

function saveProductsCart() {
    const cartSaveArr = JSON.stringify(cartProducts)
    localStorage.setItem('cart', cartSaveArr)
}

function clearCart() {
    clearBtnCart.addEventListener('click', () => {
        listCart.innerHTML = ''
        cartProducts = []
        resultPrice.textContent = '0'
        saveProductsCart()
    })
}
clearCart()
