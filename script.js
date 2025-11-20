document.addEventListener('DOMContentLoaded', function() {

    /* --- 1. PRELOADER --- */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => { preloader.style.opacity = '0'; preloader.style.visibility = 'hidden'; }, 500);
        });
    }

    /* --- 2. NAVBAR SCROLL & REVEAL --- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) navbar.classList.add('scrolled-nav');
        else navbar.classList.remove('scrolled-nav');
        
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (window.scrollY > 400) backToTopBtn.classList.add('show');
            else backToTopBtn.classList.remove('show');
        }
    });

    const reveals = document.querySelectorAll('.reveal');
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        reveals.forEach((reveal) => {
            if (reveal.getBoundingClientRect().top < windowHeight - 120) {
                reveal.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    document.getElementById('backToTop')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* --- 3. INTERACTIONS (BANNER, LIKE) --- */
    document.getElementById('discountBanner')?.addEventListener('click', function() {
        this.classList.toggle('active');
    });

    const heartButtons = document.querySelectorAll('.menu-card button:not(.btn-custom-yellow)');
    heartButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            if (icon.classList.contains('text-secondary')) {
                icon.classList.remove('text-secondary');
                icon.classList.add('text-danger', 'fa-solid');
                this.style.transform = 'scale(1.3)';
            } else {
                icon.classList.remove('text-danger', 'fa-solid');
                icon.classList.add('text-secondary');
                this.style.transform = 'scale(0.9)';
            }
            setTimeout(() => { this.style.transform = 'scale(1)'; }, 200);
        });
    });

    /* --- 4. CAROUSEL --- */
    var myCarouselEl = document.querySelector('#testimonialCarousel');
    if (myCarouselEl) {
        new bootstrap.Carousel(myCarouselEl, { interval: 4000, wrap: true, pause: 'hover', touch: true });
        myCarouselEl.addEventListener('slide.bs.carousel', function () {
            const imgGrid = document.querySelector('.image-grid-final');
            if(imgGrid) imgGrid.style.opacity = '0.6';
        });
        myCarouselEl.addEventListener('slid.bs.carousel', function () {
            const imgGrid = document.querySelector('.image-grid-final');
            if(imgGrid) imgGrid.style.opacity = '1';
        });
    }

    /* --- 5. API SEARCH (THEMEALDB) --- */
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('btnSearchApi');
    const resultsContainer = document.getElementById('searchResults');
    async function searchFood(query) {
        resultsContainer.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-warning"></div></div>`;
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await res.json();
            if (data.meals) {
                let html = '';
                data.meals.forEach(meal => {
                    html += `<div class="col-12"><div class="d-flex align-items-center p-2 rounded-3 border search-item">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="search-img shadow-sm">
                                <div class="ms-3"><h6 class="fw-bold mb-1 text-dark">${meal.strMeal}</h6>
                                <span class="badge bg-warning text-dark bg-opacity-25 border border-warning">${meal.strCategory}</span></div></div></div>`;
                });
                resultsContainer.innerHTML = html;
            } else {
                resultsContainer.innerHTML = `<div class="text-center py-5"><p class="text-muted">No food found.</p></div>`;
            }
        } catch (err) { resultsContainer.innerHTML = `<p class="text-center text-danger">Error loading data.</p>`; }
    }
    if (searchBtn) searchBtn.addEventListener('click', () => { if (searchInput.value.trim()) searchFood(searchInput.value.trim()); });
    if (searchInput) searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter' && searchInput.value.trim()) searchFood(searchInput.value.trim()); });

    /* --- 5. FULL MENU LOGIC --- */
/* --- 6. FULL MENU LOGIC (20 Items) --- */
    const fullMenuData = [
        { id: 1, name: "Mie Ramen", price: 20.2, cat: "Asian", img: "anh7.png" },
        { id: 2, name: "Salad Tahu", price: 15.0, cat: "Asian", img: "anh8.png" },
        { id: 3, name: "Roti Bakar", price: 12.5, cat: "Dessert", img: "anh9.png" },
        { id: 4, name: "Spaghetti", price: 25.0, cat: "Western", img: "anh10.png" },
        { id: 5, name: "Chicken Curry", price: 18.5, cat: "Asian", img: "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg" },
        { id: 6, name: "Beef Steak", price: 35.0, cat: "Western", img: "https://www.themealdb.com/images/media/meals/vtausi1511723720.jpg" },
        { id: 7, name: "Pancakes", price: 10.0, cat: "Dessert", img: "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg" },
        { id: 8, name: "Sushi Platter", price: 40.0, cat: "Asian", img: "https://www.themealdb.com/images/media/meals/g046bb1663969138.jpg" },
        { id: 9, name: "Burger King", price: 14.5, cat: "Western", img: "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg" },
        { id: 10, name: "Chocolate Cake", price: 8.0, cat: "Dessert", img: "https://www.themealdb.com/images/media/meals/tqtywx1468317269.jpg" },
        { id: 11, name: "Fried Rice", price: 11.0, cat: "Asian", img: "https://www.themealdb.com/images/media/meals/uspwow1511700908.jpg" },
        { id: 12, name: "Pizza Peperoni", price: 22.0, cat: "Western", img: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg" },
        { id: 13, name: "Ice Cream", price: 6.5, cat: "Dessert", img: "https://www.themealdb.com/images/media/meals/yqtpvu1511736109.jpg" },
        { id: 14, name: "Orange Juice", price: 5.0, cat: "Drinks", img: "https://www.themealdb.com/images/media/meals/wxyvqq1511723401.jpg" },
        { id: 15, name: "Pho Vietnam", price: 16.0, cat: "Asian", img: "https://www.themealdb.com/images/media/meals/qqwypw1511797882.jpg" },
        { id: 16, name: "Fish and Chips", price: 19.0, cat: "Western", img: "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg" },
        { id: 17, name: "Donut", price: 4.5, cat: "Dessert", img: "https://www.themealdb.com/images/media/meals/4skiis1511179844.jpg" },
        { id: 18, name: "Lemonade", price: 4.0, cat: "Drinks", img: "https://www.themealdb.com/images/media/meals/ypxvwv1505333929.jpg" },
        { id: 19, name: "Tacos", price: 13.5, cat: "Western", img: "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg" },
        { id: 20, name: "Pad Thai", price: 17.5, cat: "Asian", img: "https://www.themealdb.com/images/media/meals/n7qnkb1630444129.jpg" }
    ];

    const menuContainer = document.getElementById('fullMenuContainer');
    function renderMenu(items) {
        menuContainer.innerHTML = '';
        if (items.length === 0) { document.getElementById('noMenuResults').classList.remove('d-none'); return; }
        else { document.getElementById('noMenuResults').classList.add('d-none'); }

        let html = '';
        items.forEach(item => {
            html += `<div class="col-6 col-md-4 col-lg-3 d-flex align-items-stretch">
                        <div class="card menu-card border-0 w-100 p-3 pt-4 rounded-4 bg-white shadow-sm hover-up d-flex flex-column">
                            <div class="menu-img-wrapper mb-3 text-center">
                                <img src="${item.img}" class="rounded-circle shadow-sm" style="width: 100px; height: 100px; object-fit: cover;">
                            </div>
                            <div class="card-body p-0 text-center d-flex flex-column">
                                <div><span class="badge bg-light text-secondary border mb-2">${item.cat}</span><h6 class="fw-bold mb-1 text-truncate">${item.name}</h6></div>
                                <div class="mt-auto"><p class="text-muted small mb-2">$ ${item.price.toFixed(1)}</p>
                                <button class="btn btn-custom-yellow w-100 rounded-pill fw-bold btn-sm" onclick="addToCart('${item.name}', '${item.price}', '${item.img}')">Add <i class="fa-solid fa-plus ms-1"></i></button></div>
                            </div>
                        </div>
                    </div>`;
        });
        menuContainer.innerHTML = html;
    }
    function filterMenu(query) {
        const lower = query.toLowerCase();
        renderMenu(fullMenuData.filter(i => i.name.toLowerCase().includes(lower) || i.cat.toLowerCase().includes(lower)));
    }
    window.filterMenuCategory = function(cat) {
        renderMenu(cat === 'All' ? fullMenuData : fullMenuData.filter(i => i.cat === cat));
    };
    document.getElementById('menuSearchInput')?.addEventListener('input', (e) => filterMenu(e.target.value));
    document.getElementById('moreMenuModal')?.addEventListener('shown.bs.modal', () => { renderMenu(fullMenuData); document.getElementById('menuSearchInput').value = ''; });

    /* --- 6. CART & PAYMENT --- */
    window.cart = [];
    const cartBadge = document.getElementById('cartBadge');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCountTitle = document.getElementById('cartCountTitle');

    window.addToCart = function(name, price, image) {
        const exist = window.cart.find(i => i.name === name);
        if (exist) exist.quantity++;
        else window.cart.push({ name: name, price: parseFloat(price), image: image, quantity: 1 });
        updateCartUI();
        const icon = document.querySelector('.fa-cart-shopping');
        if(icon) { icon.style.transform = 'scale(1.4)'; icon.style.color = '#FFCB45'; setTimeout(() => { icon.style.transform = 'scale(1)'; icon.style.color = ''; }, 300); }
    };
    window.removeFromCart = function(index) { window.cart.splice(index, 1); updateCartUI(); };
    
    function updateCartUI() {
        const totalCount = window.cart.reduce((sum, i) => sum + i.quantity, 0);
        if (cartBadge) cartBadge.innerText = totalCount;
        if (cartCountTitle) cartCountTitle.innerText = `(${totalCount} items)`;
        if (window.cart.length === 0) {
            cartItemsContainer.innerHTML = `<div class="text-center py-5"><i class="fa-solid fa-basket-shopping fa-4x mb-3 text-secondary opacity-25"></i><h6 class="fw-bold text-secondary">Empty Cart</h6></div>`;
        } else {
            let html = '';
            window.cart.forEach((item, index) => {
                html += `<div class="cart-item d-flex align-items-center py-3 border-bottom"><img src="${item.image}" class="cart-item-img shadow-sm" style="width:60px;height:60px;object-fit:cover;border-radius:10px;"><div class="ms-3 flex-grow-1"><h6 class="fw-bold mb-0 text-dark">${item.name}</h6><p class="text-muted small mb-0">$ ${item.price} x ${item.quantity}</p></div><div class="fw-bold text-warning fs-6 me-3">$ ${(item.price * item.quantity).toFixed(1)}</div><button onclick="removeFromCart(${index})" class="btn btn-light btn-sm text-danger"><i class="fa-solid fa-trash"></i></button></div>`;
            });
            cartItemsContainer.innerHTML = html;
        }
        const total = window.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        if (cartTotalElement) cartTotalElement.innerText = '$ ' + total.toFixed(2);
    }

    document.querySelectorAll('.btn-custom-yellow').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.innerHTML.includes('Sign in') || this.id === 'backToTop' || this.id === 'btnSearchApi' || this.closest('#moreMenuModal') || this.closest('#blogForm')) return;
            const card = this.closest('.card');
            if (card) {
                const name = card.querySelector('h5').innerText;
                const price = card.querySelector('.fs-5') ? card.querySelector('.fs-5').innerText.replace('$', '').trim() : '10.0';
                const img = card.querySelector('img').src;
                addToCart(name, price, img);
            } else { addToCart('Special Combo', '25.5', 'anh1.png'); }
        });
    });

    const btnPayment = document.getElementById('btnPayment');
    if (btnPayment) {
        btnPayment.addEventListener('click', function() {
            if (window.cart.length === 0) { alert("Your cart is empty!"); return; }
            const cartModalEl = document.getElementById('cartModal');
            const cartModal = bootstrap.Modal.getInstance(cartModalEl); 
            if(cartModal) cartModal.hide();
            setTimeout(() => {
                const successModal = new bootstrap.Modal(document.getElementById('paymentSuccessModal'));
                successModal.show();
            }, 200);
            window.cart = []; updateCartUI();
        });
    }
    /* --- 7. CART LOGIC --- */


    /* --- 8. CHECKOUT LOGIC --- */
    const btnCheckout = document.getElementById('btnCheckout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function() {
            if (window.cart.length === 0) { alert("Your cart is empty!"); return; }
            const cartModalEl = document.getElementById('cartModal');
            const cartModal = bootstrap.Modal.getInstance(cartModalEl);
            cartModal.hide();
            const successModal = new bootstrap.Modal(document.getElementById('paymentSuccessModal'));
            successModal.show();
            window.cart = []; updateCartUI();
        });
    }
});
/* --- 7. BLOG LOGIC (ĐÃ BỔ SUNG) --- */
    const stars = document.querySelectorAll('#ratingStars i');
    const ratingInput = document.getElementById('ratingValue');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            ratingInput.value = value;
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= value) { s.classList.remove('fa-regular'); s.classList.add('fa-solid'); } 
                else { s.classList.remove('fa-solid'); s.classList.add('fa-regular'); }
            });
        });
    });

    const blogForm = document.getElementById('blogForm');
if (blogForm) {
    blogForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('blogName').value;
        const content = document.getElementById('blogContent').value;
        const rating = ratingInput.value;
        if (!name || !content || rating == 0) { alert("Please fill in all fields and select a rating!"); return; }
        const blogModalEl = document.getElementById('blogModal');
        const blogModal = bootstrap.Modal.getInstance(blogModalEl);
        blogModal.hide();
        alert(`Thank you, ${name}! Your review has been submitted.`);
        blogForm.reset();
        stars.forEach(s => { s.classList.remove('fa-solid'); s.classList.add('fa-regular'); });
    });
}