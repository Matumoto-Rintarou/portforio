document.addEventListener('DOMContentLoaded', () => {
    // --- 1. スクロールアニメーション (4-10 / 5-3) ＆ スキルバー (5-4) ---
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.skill-progress'); // 5-4用
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // 画面の85%の位置に要素が入ったら表示
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add('active');

                // 【5-4追加】もし表示されたのが「スキルセクション」ならバーを伸ばす
                if (el.id === 'skills') {
                    skillBars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-level');
                    });
                }
            }
        });
    };

    // スクロール時と読み込み時に実行
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // 初回実行


    // --- 2. ハンバーガーメニュー (5-1) ---
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }

    // リンクをクリックしたらメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });


    // --- 3. 作品フィルタリング (5-5追加) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.works-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // ボタンのactiveクラスを切り替え
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            workItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'flex'; // 表示（Worksの横並びを維持するためflex）
                    // 少し遅らせてふわっと表示させる
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    // アニメーションが終わる頃に完全に消す
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });


    // --- 4. 画像拡大モーダル (5-6) ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('full-image');
    const closeBtn = document.querySelector('.modal-close');
    const galleryImages = document.querySelectorAll('.works-gallery img');

    if (modal && galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                modal.style.display = "block";
                modalImg.src = img.src;
            });
        });

        const closeModal = () => {
            modal.style.display = "none";
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
}); 