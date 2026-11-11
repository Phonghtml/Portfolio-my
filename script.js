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

// ===== GSAP Animations =====
// ถ้า GSAP โหลดไม่สำเร็จ หรือผู้ใช้เปิดโหมดลดการเคลื่อนไหว ให้แสดงเนื้อหาปกติโดยไม่มีแอนิเมชัน
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typeof gsap !== 'undefined' && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);

    // clearProps ป้องกัน inline transform ของ GSAP ไปทับ hover ของ CSS
    const cleanup = 'transform,opacity';

    // 1) Navbar เลื่อนลงมาตอนโหลด
    gsap.from('header', { y: -80, opacity: 0, duration: 0.8, ease: 'power3.out' });

    // 2) Hero intro
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
        .from('.hero-content h3', { y: 20, opacity: 0, duration: 0.6 })
        .from('.hero-content h1', { y: 30, opacity: 0, duration: 0.8 }, '-=0.3')
        .from('.hero-content h2', { y: 20, opacity: 0, duration: 0.6 }, '-=0.5')
        .from('.hero-content p', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-btns .btn', { y: 20, opacity: 0, duration: 0.5, stagger: 0.12, clearProps: cleanup }, '-=0.4')
        .from('.hero-code-box', { x: 60, opacity: 0, duration: 1, ease: 'power4.out', clearProps: cleanup }, '-=1')
        .from('.code-body .keyword, .code-body .string, .code-body .boolean', {
            opacity: 0, duration: 0.4, stagger: 0.04
        }, '-=0.6');

    // หัวข้อของทุก section
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: cleanup,
            scrollTrigger: { trigger: title, start: 'top 90%' }
        });
    });

    // About: ข้อความและกล่องการศึกษาเลื่อนเข้ามาจากคนละด้าน
    gsap.from('.about-text', {
        x: -50, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: cleanup,
        scrollTrigger: { trigger: '.about-grid', start: 'top 80%' }
    });
    gsap.from('.about-education', {
        x: 50, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: cleanup,
        scrollTrigger: { trigger: '.about-grid', start: 'top 80%' }
    });
    gsap.from('.about-education li', {
        x: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', clearProps: cleanup,
        scrollTrigger: { trigger: '.about-education', start: 'top 80%' }
    });

    // Skills: การ์ดทยอยขึ้นทีละใบ
    gsap.from('.skill-card', {
        y: 50, opacity: 0, scale: 0.96, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)', clearProps: cleanup,
        scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' }
    });
    // ไอคอนในการ์ดหมุนเข้าที่เล็กน้อย
    gsap.from('.skill-card i', {
        rotation: -90, scale: 0, duration: 0.8, stagger: 0.12, ease: 'back.out(2)', clearProps: 'transform',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' }
    });

    // Projects: การ์ดผลงานเด้งขึ้นทีละใบ
    gsap.from('.project-card', {
        y: 70, opacity: 0, duration: 0.9, stagger: 0.18, ease: 'power3.out', clearProps: cleanup,
        scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' }
    });
    // ตัวเลขลำดับ 01/02/03 จางเข้ามาจากขนาดใหญ่
    gsap.from('.project-num', {
        scale: 1.4, opacity: 0, duration: 1, stagger: 0.18, ease: 'power2.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' }
    });

    // Contact: ช่องทางติดต่อทยอยขึ้น
    gsap.from('.contact-item', {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', clearProps: cleanup,
        scrollTrigger: { trigger: '.contact-wrapper', start: 'top 85%' }
    });
    gsap.from('.contact-subtitle', {
        opacity: 0, y: 20, duration: 0.7, clearProps: cleanup,
        scrollTrigger: { trigger: '.contact-subtitle', start: 'top 90%' }
    });

    // Footer ค่อยๆ ปรากฏ
    gsap.from('footer', {
        opacity: 0, duration: 1,
        scrollTrigger: { trigger: 'footer', start: 'top 98%' }
    });

    // เลื่อนไปยังหัวข้อ: ทำให้การกดเมนู hash link ยังทำงานตามปกติ
    // (CSS scroll-behavior: smooth จัดการให้แล้ว)

    // รีคำนวณตำแหน่ง ScrollTrigger หลังฟอนต์และรูปโหลดเสร็จ
    window.addEventListener('load', () => ScrollTrigger.refresh());
}
