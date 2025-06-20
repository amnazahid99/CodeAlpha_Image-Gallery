document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Image data - using placeholder images from Unsplash
    const imageData = {
        nature: [
            { id: 1, url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b', title: 'Mountain Landscape' },
            { id: 2, url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d', title: 'Forest Path' },
            { id: 3, url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', title: 'Misty Morning' },
            { id: 4, url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07', title: 'Autumn Colors' },
            { id: 5, url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716', title: 'Waterfall' },
            { id: 6, url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', title: 'Rocky Coast' }
        ],
        abstract: [
            { id: 7, url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e', title: 'Colorful Patterns' },
            { id: 8, url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31', title: 'Geometric Shapes' },
            { id: 9, url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d', title: 'Liquid Art' },
            { id: 10, url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564', title: 'Cosmic Colors' },
            { id: 11, url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa', title: 'Digital Universe' },
            { id: 12, url: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031', title: 'Fractal Design' }
        ],
        portrait: [
            { id: 13, url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d', title: 'Man Portrait' },
            { id: 14, url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', title: 'Woman Smiling' },
            { id: 15, url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', title: 'Casual Portrait' },
            { id: 16, url: 'https://images.unsplash.com/photo-1554151228-14d9def656e4', title: 'Happy Woman' },
            { id: 17, url: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e', title: 'Couple Portrait' },
            { id: 18, url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7', title: 'Thoughtful Man' }
        ],
        cars: [
            { id: 19, url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8', title: 'Classic Car' },
            { id: 20, url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a', title: 'Sports Car' },
            { id: 21, url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d', title: 'Luxury Vehicle' },
            { id: 22, url: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def', title: 'Vintage Car' },
            { id: 23, url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e', title: 'Modern Sedan' },
            { id: 24, url: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366', title: 'Red Sports Car' }
        ]
    };
    
    let currentCategory = 'nature';
    let currentImageIndex = 0;
    let currentImages = [];
    
    // DOM elements
    const galleryGrid = document.getElementById('gallery-grid');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const imageTitle = document.getElementById('image-title');
    const closeLightbox = document.getElementById('close-lightbox');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const categoryLinks = document.querySelectorAll('.categories-content a');
    
    // Initialize gallery with default category
    loadCategory(currentCategory);
    
    // Category navigation
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            currentCategory = category;
            loadCategory(category);
        });
    });
    
    // Load images for a category
    function loadCategory(category) {
        currentImages = imageData[category];
        renderGallery(currentImages);
    }
    
    // Render gallery images
    function renderGallery(images) {
        galleryGrid.innerHTML = '';
        
        images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-index', index);
            
            galleryItem.innerHTML = `
                <img src="${image.url}" alt="${image.title}" class="gallery-img">
                <div class="image-overlay">
                    <h3>${image.title}</h3>
                </div>
            `;
            
            galleryItem.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Open lightbox with selected image
    function openLightbox(index) {
        currentImageIndex = index;
        const image = currentImages[index];
        
        lightboxImage.src = image.url;
        lightboxImage.alt = image.title;
        lightboxImage.style.filter = 'none'; // Reset filter
        imageTitle.textContent = image.title;
        
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Close lightbox
    function closeLightboxFunc() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
    
    // Navigation functions
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        const image = currentImages[currentImageIndex];
        lightboxImage.src = image.url;
        lightboxImage.alt = image.title;
        lightboxImage.style.filter = 'none'; // Reset filter when changing image
        imageTitle.textContent = image.title;
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        const image = currentImages[currentImageIndex];
        lightboxImage.src = image.url;
        lightboxImage.alt = image.title;
        lightboxImage.style.filter = 'none'; // Reset filter when changing image
        imageTitle.textContent = image.title;
    }
    
    // Event listeners
    closeLightbox.addEventListener('click', closeLightboxFunc);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightboxFunc();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
    
    // Image filter controls
    const filterButtons = document.querySelectorAll('.filter-controls button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            applyFilter(filter);
        });
    });
    
    function applyFilter(filter) {
        switch(filter) {
            case 'grayscale':
                lightboxImage.style.filter = 'grayscale(100%)';
                break;
            case 'sepia':
                lightboxImage.style.filter = 'sepia(100%)';
                break;
            case 'brightness':
                lightboxImage.style.filter = 'brightness(150%) contrast(120%)';
                break;
            default:
                lightboxImage.style.filter = 'none';
        }
    }
    
    // Gallery navigation buttons
    prevBtn.addEventListener('click', () => {
        // In a real implementation, this would load previous set of images
        // For this demo, we'll just scroll the gallery
        galleryGrid.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        galleryGrid.scrollBy({ left: 300, behavior: 'smooth' });
    });
});