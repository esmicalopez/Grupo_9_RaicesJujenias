const productContainer = document.querySelector(".main-productos")
const productList = JSON.parse(window.localStorage.getItem("products"))

console.log(productContainer)
console.log(productList)

function putProducts (data) {
    data.forEach(product => {
        const article = document.createRange().createContextualFragment(`
            <article class="producto">
                <div class="">
                    <a href="/productos/<%= product.id %>">
                        <img src=${product.image} alt="">
                    </a>
                </div>
                <a href="/productos/<%= product.id %>" class="producto-nombre">
                    <div class="producto-nombre-title">${product.name}</div>
                    <div class="producto-nombre-description">${product.description}</div>

                </a>
    
                <div class="card-price-product">
                    ${product.price}
                </div>
                <i class="fa-solid fa-xmark delete-product-button" data-p-id="${product.id}"></i>
            </article>
        `)
        productContainer.append(article)
    })
}

putProducts(productList)

productContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "I") {
        const productList = JSON.parse(window.localStorage.getItem("products"))

        const indexToRemove = productList.findIndex(p => p.id === e.target.getAttribute("data-p-id"))

        if (indexToRemove !== -1) {
            productList.splice(indexToRemove, 1)
            window.localStorage.setItem("products", JSON.stringify(productList))
            e.target.parentNode.remove()
        }

        if (productList.length === 0) {
            window.localStorage.removeItem("products")
        }
    }
})
