document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Mood tracker
    const moodOptions = document.querySelectorAll('.mood-option');
    moodOptions.forEach(option => {
        option.addEventListener('click', selectMood);
    });
    
    // Cancer information search
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchCancerInfo);
    
    // Load initial data
    loadCancerInfo('breast');
    loadResources();
});

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggleBtn = document.getElementById('darkModeToggle');
    if (document.body.classList.contains('dark-mode')) {
        toggleBtn.textContent = 'Light Mode';
    } else {
        toggleBtn.textContent = 'Dark Mode';
    }
}

// Select mood
function selectMood(e) {
    const moodOptions = document.querySelectorAll('.mood-option');
    moodOptions.forEach(option => {
        option.classList.remove('active');
    });
    
    this.classList.add('active');
    alert(`Thank you for sharing your mood. We've recorded you're feeling ${this.dataset.mood}.`);
}

// Search cancer information
function searchCancerInfo() {
    const searchTerm = document.getElementById('cancerSearch').value.trim();
    if (searchTerm) {
        loadCancerInfo(searchTerm);
    } else {
        alert('Please enter a search term');
    }
}

// Load cancer information from API
async function loadCancerInfo(term) {
    try {
        // In a real app, we would use the National Cancer Institute API
        // For this demo, we'll use mock data to avoid CORS issues
        // const response = await fetch(`https://www.cancer.gov/api/gdc/v1/search?term=${term}`);
        // const data = await response.json();
        
        // Mock data
        const mockData = {
            results: [
                {
                    title: "Understanding Breast Cancer",
                    description: "Breast cancer is a disease in which cells in the breast grow out of control. There are different kinds of breast cancer.",
                    type: "Patient Education",
                    url: "#"
                },
                {
                    title: "Treatment Options",
                    description: "Learn about the different treatment options for breast cancer including surgery, chemotherapy, and radiation.",
                    type: "Treatment Information",
                    url: "#"
                },
                {
                    title: "Managing Side Effects",
                    description: "Information about common side effects of breast cancer treatment and how to manage them.",
                    type: "Supportive Care",
                    url: "#"
                },
                {
                    title: "Nutrition During Treatment",
                    description: "Dietary recommendations for patients undergoing breast cancer treatment.",
                    type: "Nutrition",
                    url: "#"
                },
                {
                    title: "Emotional Support Resources",
                    description: "Resources to help cope with the emotional impact of a breast cancer diagnosis.",
                    type: "Mental Health",
                    url: "#"
                }
            ]
        };
        
        displayCancerInfo(mockData.results);
    } catch (error) {
        console.error('Error fetching cancer information:', error);
        document.getElementById('cancerInfoContainer').innerHTML = `
            <div class="info-card">
                <h3>Error Loading Information</h3>
                <p>We couldn't load the cancer information at this time. Please try again later.</p>
            </div>
        `;
    }
}

// Display cancer information
function displayCancerInfo(info) {
    const container = document.getElementById('cancerInfoContainer');
    container.innerHTML = '';
    
    if (info.length === 0) {
        container.innerHTML = `
            <div class="info-card">
                <h3>No Results Found</h3>
                <p>Try a different search term.</p>
            </div>
        `;
        return;
    }
    
    info.forEach(item => {
        const card = document.createElement('div');
        card.className = 'info-card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p><strong>Type:</strong> ${item.type}</p>
            <a href="${item.url}" class="btn">Learn More</a>
        `;
        container.appendChild(card);
    });
}

// Load resources
function loadResources() {
    // Mock resources data
    const resources = [
        {
            title: "Chemotherapy Guide",
            description: "A comprehensive guide to understanding chemotherapy and its effects.",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            type: "Treatment"
        },
        {
            title: "Nutrition During Cancer",
            description: "Learn how to maintain proper nutrition during your cancer treatment.",
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            type: "Nutrition"
        },
        {
            title: "Managing Fatigue",
            description: "Strategies to cope with cancer-related fatigue and improve energy levels.",
            image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            type: "Symptom Management"
        }
    ];
    
    displayResources(resources);
}

// Display resources
function displayResources(resources) {
    const container = document.getElementById('resourceList');
    container.innerHTML = '';
    
    resources.forEach(resource => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        card.innerHTML = `
            <img src="${resource.image}" alt="${resource.title}">
            <div class="resource-content">
                <h3>${resource.title}</h3>
                <p>${resource.description}</p>
                <p><strong>Category:</strong> ${resource.type}</p>
                <a href="#" class="btn">View Resource</a>
            </div>
        `;
        container.appendChild(card);
    });
}