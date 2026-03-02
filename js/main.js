document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('full-image');
    const closeBtn = document.querySelector('.modal-close');
    const galleryImages = document.querySelectorAll('.works-gallery img');

    // ギャラリー内の各画像に拡大イベントを追加
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = "block";
            modalImg.src = img.src;
        });
    });

    // 閉じる処理
    const closeModal = () => {
        modal.style.display = "none";
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});