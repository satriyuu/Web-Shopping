const app = new Vue({
    el: '#app',
    data: {
        searchQuery: '',
        products: [
            {
                name: 'Chicken Jasuke',
                image: '1.PNG',
                description: 'Ayam potong dengan jagung manis keju',
                price: 10000,
                quantity: 1,
                rating: Math.random() * 5,
                stock: Math.floor(Math.random() * 10) // Random stock between 0 and 9
            },
            {
                name: 'Ayam Village',
                image: '2.PNG',
                description: 'Ayam bakar kampoeng dengan sambal mencret',
                price: 20000,
                quantity: 1,
                rating: Math.random() * 5,
                stock: Math.floor(Math.random() * 10)
            },
            {
                name: 'Salmonela',
                image: '3.PNG',
                description: 'Salmon laut nil dengan sayur beraneka ragam',
                price: 15000,
                quantity: 1,
                rating: Math.random() * 5,
                stock: Math.floor(Math.random() * 10)
            },
            {
                name: 'Longtong Karie',
                image: '4.PNG',
                description: 'Longtong dengan kuah kari spesial',
                price: 25000,
                quantity: 1,
                rating: Math.random() * 5,
                stock: Math.floor(Math.random() * 10)
            },
            {
                name: 'Rumput Alang-Alang',
                image: '5.PNG',
                description: 'Salad dengan beraneka ragam rumput',
                price: 30000,
                quantity: 1,
                rating: Math.random() * 5,
                stock: Math.floor(Math.random() * 10)
            },
            {
                name: 'Pitsa',
                image: '6.PNG',
                description: 'Makanan orang itali',
                price: 18000,
                quantity: 1,
                rating: Math.random() * 5,
                stock: Math.floor(Math.random() * 10)
            }
        ],
        showCart: false,
        cartItems: [],
        showProductModal: false,
        selectedProduct: {}
    },
    methods: {
        toggleCart() {
            this.showCart = !this.showCart;
        },
        addToCart(product) {
            let cartProduct = this.cartItems.find(item => item.name === product.name);
            if (cartProduct) {
                if (cartProduct.quantity < cartProduct.stock) {
                    cartProduct.quantity++;
                    product.stock--; // Decrease stock when adding to cart
                } else {
                    alert("Stock sudah habis!");
                }
            } else {
                if (product.stock > 0) {
                    this.cartItems.push({...product, quantity: 1});
                    product.stock--; // Decrease stock when adding to cart
                } else {
                    alert("Stock sudah habis!");
                }
            }
        },
        decreaseQuantity(product) {
            if (product.quantity > 1) {
                product.quantity--;
                product.stock++; // Increase stock when decreasing cart quantity
                // Update stock in products array
                const index = this.products.findIndex(item => item.name === product.name);
                if (index !== -1) {
                    this.products[index].stock++; // Add stock to product in products array
                }
            } else {
                this.removeFromCart(product);
            }
        },
        increaseQuantity(product) {
            if (product.quantity < product.stock) {
                product.quantity++;
                product.stock--; // Decrease stock when increasing cart quantity
            } else {
                alert("Stock sudah habis!");
            }
        },
        removeFromCart(product) {
            this.cartItems = this.cartItems.filter(item => item.name !== product.name);
            product.stock += product.quantity; // Increase stock when removing from cart
            // Update stock in products array
            const index = this.products.findIndex(item => item.name === product.name);
            if (index !== -1) {
                this.products[index].stock += product.quantity; // Add stock to product in products array
            }
        },
        proceedToCheckout() {
            localStorage.setItem('totalPrice', this.getTotalPrice);
            window.location.href = 'checkout.html';
        },
        showProductDetails(product) {
            this.selectedProduct = product;
            this.showProductModal = true;
        },
        closeProductDetails() {
            this.showProductModal = false;
        },
        filterProducts() {
            if (this.searchQuery === '') {
                return this.products;
            } else {
                return this.products.filter(product =>
                    product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }
        }
    },
    computed: {
        filteredProducts() {
            return this.filterProducts();
        },
        getTotalPrice() {
            return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        }
    }
});
