// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Add lightbox functionality for project images
document.addEventListener('DOMContentLoaded', () => {
    const projectMediaContainers = document.querySelectorAll('.project-media');
    
    // Create carousel modal
    const carouselModal = document.createElement('div');
    carouselModal.className = 'carousel-modal';
    carouselModal.innerHTML = `
        <div class="carousel-container">
            <button class="carousel-close" aria-label="Close">&times;</button>
            <button class="carousel-btn prev" aria-label="Previous">&lsaquo;</button>
            <div class="carousel-media-wrapper">
                <img class="carousel-content carousel-image" src="" alt="Project media" style="display: none;">
                <video class="carousel-content carousel-video" controls style="display: none;">
                    Your browser does not support the video tag.
                </video>
            </div>
            <button class="carousel-btn next" aria-label="Next">&rsaquo;</button>
            <div class="carousel-counter"></div>
        </div>
    `;
    document.body.appendChild(carouselModal);
    
    let currentGallery = [];
    let currentIndex = 0;
    
    const carouselImage = carouselModal.querySelector('.carousel-image');
    const carouselVideo = carouselModal.querySelector('.carousel-video');
    const carouselCounter = carouselModal.querySelector('.carousel-counter');
    const prevBtn = carouselModal.querySelector('.prev');
    const nextBtn = carouselModal.querySelector('.next');
    const closeBtn = carouselModal.querySelector('.carousel-close');
    
    function isVideoFile(filename) {
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
        return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    }
    
    function showImage(index) {
        if (currentGallery.length === 0) return;
        
        currentIndex = (index + currentGallery.length) % currentGallery.length;
        const currentMedia = currentGallery[currentIndex];
        
        // Pause any playing video
        if (!carouselVideo.paused) {
            carouselVideo.pause();
        }
        
        if (isVideoFile(currentMedia)) {
            // Show video, hide image
            carouselVideo.innerHTML = '';
            const source = document.createElement('source');
            source.src = currentMedia;
            
            // Set MIME type based on extension
            if (currentMedia.toLowerCase().endsWith('.mp4')) {
                source.type = 'video/mp4';
            } else if (currentMedia.toLowerCase().endsWith('.webm')) {
                source.type = 'video/webm';
            } else if (currentMedia.toLowerCase().endsWith('.ogg')) {
                source.type = 'video/ogg';
            } else if (currentMedia.toLowerCase().endsWith('.mov')) {
                source.type = 'video/quicktime';
            }
            
            carouselVideo.appendChild(source);
            carouselVideo.load();
            carouselVideo.style.display = 'block';
            carouselImage.style.display = 'none';
        } else {
            // Show image, hide video
            carouselImage.src = currentMedia;
            carouselImage.style.display = 'block';
            carouselVideo.style.display = 'none';
        }
        
        carouselCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
        
        // Hide navigation buttons if only one item
        if (currentGallery.length === 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        }
    }
    
    function openCarousel(gallery, startIndex = 0) {
        currentGallery = gallery;
        currentIndex = startIndex;
        showImage(currentIndex);
        carouselModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeCarousel() {
        carouselModal.classList.remove('active');
        document.body.style.overflow = '';
        // Pause and reset video when closing
        if (!carouselVideo.paused) {
            carouselVideo.pause();
        }
        carouselVideo.currentTime = 0;
    }
    
    // Add click handlers to images (not videos)
    projectMediaContainers.forEach(container => {
        const img = container.querySelector('img');
        const galleryData = container.getAttribute('data-gallery');
        
        if (img && galleryData) {
            img.style.cursor = 'pointer';
            
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                try {
                    const gallery = JSON.parse(galleryData);
                    openCarousel(gallery, 0);
                } catch (error) {
                    console.error('Error parsing gallery data:', error);
                }
            });
        }
    });
    
    // Navigation handlers
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex + 1);
    });
    
    closeBtn.addEventListener('click', closeCarousel);
    
    // Close when clicking outside the image
    carouselModal.addEventListener('click', (e) => {
        if (e.target === carouselModal || e.target.classList.contains('carousel-container')) {
            closeCarousel();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!carouselModal.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            showImage(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showImage(currentIndex + 1);
        } else if (e.key === 'Escape') {
            closeCarousel();
        }
    });
});
