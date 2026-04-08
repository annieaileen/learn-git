// ข้อมูลอาหารตัวอย่าง
const foods = [
    { id: 1, name: 'ข้าวผัด', price: 50, image: 'assets/food1.jpg' },
    { id: 2, name: 'ก๋วยเตี๋ยว', price: 60, image: 'assets/food2.jpg' },
    // เพิ่มอาหารอื่นๆ
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// แสดงเมนู
function displayMenu(filter = '') {
    const menuDiv = document.getElementById('menu');
    if (!menuDiv) return;
    menuDiv.innerHTML = '';
    foods.filter(f => f.name.includes(filter)).forEach(food => {
        menuDiv.innerHTML += `
            <div class="bg-white p-4 rounded-lg shadow">
                <img src="${food.image}" alt="${food.name}" class="w-full h-32 object-cover rounded">
                <h3 class="text-xl font-bold mt-2">${food.name}</h3>
                <p class="text-gray-600">ราคา: ${food.price} บาท</p>
                <button onclick="addToCart(${food.id})" class="bg-green-500 text-white px-4 py-2 rounded mt-2">เพิ่มในตะกร้า</button>
            </div>
        `;
    });
}

// เพิ่มในตะกร้า
function addToCart(id) {
    const food = foods.find(f => f.id === id);
    cart.push(food);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('เพิ่มในตะกร้าแล้ว');
}

// แสดงตะกร้า
function displayCart() {
    const cartDiv = document.getElementById('cart-items');
    if (!cartDiv) return;
    cartDiv.innerHTML = '';
    cart.forEach((item, index) => {
        cartDiv.innerHTML += `
            <div class="bg-white p-4 rounded-lg shadow mb-4">
                <h3>${item.name}</h3>
                <p>ราคา: ${item.price} บาท</p>
                <button onclick="removeFromCart(${index})" class="bg-red-500 text-white px-4 py-2 rounded">ลบ</button>
            </div>
        `;
    });
}

// ลบจากตะกร้า
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// จัดการฟอร์ม checkout
document.getElementById('checkout-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const order = { items: cart, ...Object.fromEntries(formData) };
    const response = await fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    });
    if (response.ok) {
        alert('คำสั่งซื้อสำเร็จ');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});

// ค้นหา
document.getElementById('search')?.addEventListener('input', (e) => {
    displayMenu(e.target.value);
});

// โหลดหน้า
document.addEventListener('DOMContentLoaded', () => {
    displayMenu();
    displayCart();
});