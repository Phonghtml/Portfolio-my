// เปิด-ปิดเมนูบนมือถือ (Responsive Navbar)
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ปิดเมนูอัตโนมัติเมื่อคลิกลิงก์ในมือถือ
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});