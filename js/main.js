document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillCounters = document.querySelectorAll('.skill-percentage');
    const progressBar = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-list a');

    // --- Scroll Handler (Logic: 5-3, 5-4, 5-7, 5-8) ---
    const handleScroll = () => {
        const scrollY = window.pageYOffset;

        // 5-7: Top Progress Bar
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / totalHeight) * 100;
        if (progressBar) progressBar.style.width = progress + "%";

        // Reveal & Skill Animation (5-4 Count-up Upgrade)
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                if (!el.classList.contains('active')) {
                    el.classList.add('active');

                    // Skill Section Specific: Individual Bar & Count-up
                    if (el.id === 'skills') {
                        // Individual Progress Bars
                        const bars = el.querySelectorAll('.skill-progress');
                        bars.forEach(bar => bar.style.width = bar.getAttribute('data-level'));

                        // Individual Counters
                        const counters = el.querySelectorAll('.skill-percentage');
                        counters.forEach(counter => {
                            const target = +counter.getAttribute('data-target');
                            let count = 0;
                            const update = () => {
                                const speed = target / 40; // Speed of count-up
                                if (count < target) {
                                    count = Math.ceil(count + speed);
                                    counter.innerText = (count > target ? target : count) + "%";
                                    setTimeout(update, 25);
                                }
                            };
                            update();
                        });
                    }
                }
            }
        });

        // 5-8: Active Nav Update
        let currentId = "";
        sections.forEach(sec => {
            const top = sec.offsetTop;
            if (scrollY >= top - 150) currentId = sec.getAttribute("id");
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentId}`) link.classList.add("active");
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial Check

    // --- Burger Menu (5-1) ---
    const toggle = document.getElementById('nav-toggle');
    const menu = document.querySelector('.nav-list');
    if (toggle) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
    navLinks.forEach(l => l.addEventListener('click', () => {
        toggle.classList.remove('active'); menu.classList.remove('active');
    }));

    // --- Works Filtering (5-5) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.works-item');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const val = btn.getAttribute('data-filter');
            workItems.forEach(item => {
                const cat = item.getAttribute('data-category');
                if (val === 'all' || val === cat) {
                    item.style.display = 'flex';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
                } else {
                    item.style.opacity = '0'; item.style.transform = 'scale(0.95)';
                    setTimeout(() => { item.style.display = 'none'; }, 400);
                }
            });
        });
    });

    // --- Image Modal (5-6) ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('full-image');
    const closeBtn = document.querySelector('.modal-close');
    const galleryImgs = document.querySelectorAll('.works-gallery img');
    if (modal) {
        galleryImgs.forEach(img => {
            img.addEventListener('click', () => { modal.style.display = "block"; modalImg.src = img.src; });
        });
        const close = () => { modal.style.display = "none"; };
        closeBtn.addEventListener('click', close);
        modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    }
});