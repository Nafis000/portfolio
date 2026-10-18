// ----------------------------------------------------
// Security Helpers & Constants
// ----------------------------------------------------

// Pre-computed SHA-256 hash for admin password ("admin123")
const ADMIN_PASSWORD_HASH = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";

// Asynchronous Web Crypto SHA-256 hasher
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Strict HTML Entity Sanitizer to prevent Cross-Site Scripting (XSS)
function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    if (typeof str !== 'string') return String(str);
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Fallback local portfolio database if fetch fails
const DEFAULT_PORTFOLIO_DATA = {
  "projects": [
    {
      "id": "lfr",
      "title": "Line Follower Robot",
      "shortDescription": "Autonomous robot using Arduino Nano and PID for smooth tracking.",
      "longDescription": "Implemented a PID (Proportional-Integral-Derivative) control algorithm using an Arduino Nano. This calculates the error value from the IR sensor array and adjusts motor speed continuously for smooth path correction.",
      "image": "pictures/Screenshot 2025-12-19 163131.png",
      "category": "PID",
      "challenge": "To build a high-speed robot capable of following a complex black line on a white surface without losing trajectory on sharp turns.",
      "solution": "Implemented a PID (Proportional-Integral-Derivative) control algorithm using an Arduino Nano. This calculates the error value from the IR sensor array and adjusts motor speed continuously for smooth path correction.",
      "techStack": ["Arduino Nano", "QTR-8RC Sensors", "L298N Driver", "C++"],
      "githubUrl": "#",
      "featured": true
    },
    {
      "id": "rover",
      "title": "ESP32 Wi-Fi Rover",
      "shortDescription": "Remote controlled rover via Wi-Fi with OLED feedback.",
      "longDescription": "Built a web-controlled surveillance rover. The ESP32 hosts a web server that serves a control interface to any connected phone/laptop. It displays connection status and IP address on an onboard OLED screen.",
      "image": "pictures/Screenshot 2025-12-19 163131.png",
      "category": "IoT",
      "challenge": "To construct a low-latency web-controlled vehicle with onboard feedback.",
      "solution": "Designed a mobile web dashboard hosting control buttons. Used WebSocket communication on the ESP32 to receive controls and updated an SSD1306 OLED screen over I2C with current statuses.",
      "techStack": ["ESP32", "WebSocket", "OLED I2C"],
      "githubUrl": "#",
      "featured": true
    },
    {
      "id": "soccer",
      "title": "RC Soccer Bot",
      "shortDescription": "High-torque robot designed for speed and responsiveness.",
      "longDescription": "Engineered a robust chassis with high-torque gear motors to push objects (balls) while maintaining high agility. Optimized weight distribution for traction.",
      "image": "pictures/Screenshot 2025-12-19 163131.png",
      "category": "Robotics",
      "challenge": "To design a chassis and drive system that provides strong pushing power while keeping the robot highly agile and responsive.",
      "solution": "Engineered a robust custom chassis using lightweight acrylic. Implemented high-torque DC gear motors and high-traction wheels, optimized center of gravity, and controlled it using a custom transmitter/receiver setup.",
      "techStack": ["Arduino", "High-Torque Motors", "RF Receiver", "Acrylic Chassis"],
      "githubUrl": "#",
      "featured": true
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "degree": "BSc in Electrical Engineering",
      "institution": "University of Pécs (Hungary)",
      "period": "Current Student",
      "tag": "Stipendium Hungaricum Scholar"
    },
    {
      "id": "edu-2",
      "degree": "BSc in CSE",
      "institution": "University of Asia Pacific",
      "period": "Jul 2024 – Jun 2025 (2 Semesters)",
      "tag": "CGPA: 3.94"
    },
    {
      "id": "edu-3",
      "degree": "HSC (Science)",
      "institution": "Shaheed Police Smrity College",
      "period": "2022",
      "tag": "GPA 5.00"
    }
  ],
  "experience": [
    {
      "id": "exp-1",
      "role": "Customer Relationship Officer",
      "company": "Synergy Solutions",
      "period": "Feb '24 - Sept '24",
      "bullets": [
        "Managed customer communication and relationship support.",
        "Improved coordination, problem-solving, and professional communication skills."
      ]
    }
  ],
  "certifications": [
    {
      "id": "cert-1",
      "title": "Advanced IoT System Design",
      "issuer": "Coursera / University of California",
      "year": "2024",
      "description": "Comprehensive course on designing IoT architecture, sensor integration, and cloud data processing using ESP32.",
      "url": "#"
    },
    {
      "id": "cert-2",
      "title": "C++ Programming for Robotics",
      "issuer": "Udemy Academy",
      "year": "2023",
      "description": "Focused on memory management, pointers, and object-oriented programming specifically for embedded systems.",
      "url": "#"
    },
    {
      "id": "cert-3",
      "title": "Arduino Fundamentals",
      "issuer": "Arduino Official",
      "year": "2022",
      "description": "Mastered digital I/O, PWM, and serial communication protocols.",
      "url": "#"
    }
  ]
};

let portfolioData = {
  projects: [],
  education: [],
  experience: [],
  certifications: []
};

// Global colors config for Playful Geometric theme
const SCHEMES = [
  {
    name: 'violet',
    hex: '#8B5CF6',
    text: 'text-[#8B5CF6]',
    border: 'border-[#8B5CF6]',
    shadow: 'shadow-[5px_5px_0px_0px_#8B5CF6]',
    badge: 'bg-[#8B5CF6] text-white border-2 border-[#1E293B]',
    button: 'btn-candy'
  },
  {
    name: 'pink',
    hex: '#F472B6',
    text: 'text-[#F472B6]',
    border: 'border-[#F472B6]',
    shadow: 'shadow-[5px_5px_0px_0px_#F472B6]',
    badge: 'bg-[#F472B6] text-white border-2 border-[#1E293B]',
    button: 'bg-[#F472B6] text-white font-bold rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1E293B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1E293B] transition-all'
  },
  {
    name: 'yellow',
    hex: '#FBBF24',
    text: 'text-[#D97706]',
    border: 'border-[#FBBF24]',
    shadow: 'shadow-[5px_5px_0px_0px_#FBBF24]',
    badge: 'bg-[#FBBF24] text-[#1E293B] border-2 border-[#1E293B]',
    button: 'bg-[#FBBF24] text-[#1E293B] font-bold rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1E293B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1E293B] transition-all'
  },
  {
    name: 'mint',
    hex: '#34D399',
    text: 'text-[#059669]',
    border: 'border-[#34D399]',
    shadow: 'shadow-[5px_5px_0px_0px_#34D399]',
    badge: 'bg-[#34D399] text-[#1E293B] border-2 border-[#1E293B]',
    button: 'bg-[#34D399] text-[#1E293B] font-bold rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1E293B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1E293B] transition-all'
  }
];

function getScheme(index) {
  return SCHEMES[index % SCHEMES.length];
}

// ----------------------------------------------------
// Loading & Router Logic
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
    if (window.lucide) {
        lucide.createIcons();
    }
    
    // Load config database
    await loadData();
    
    // Page renders based on DOM element hooks
    renderPageSections();
    
    // Form and button listeners
    setupAdminControls();
    setupContactForm();
    
    // Redirect login trigger
    if (sessionStorage.getItem('open_admin_login') === 'true') {
        sessionStorage.removeItem('open_admin_login');
        openAdminLogin();
    }
    
    // Initial animations
    setupScrollReveal();
    revealOnScroll();
});

async function loadData() {
    // 1. LocalStorage draft
    const local = localStorage.getItem('portfolio_data');
    if (local) {
        try {
            portfolioData = JSON.parse(local);
            return;
        } catch (e) {
            console.error("Local data corrupted. Resetting.", e);
            localStorage.removeItem('portfolio_data');
        }
    }
    
    // 2. Fetch main portfolio JSON
    try {
        const res = await fetch('portfolio_data.json');
        if (res.ok) {
            portfolioData = await res.json();
            return;
        }
    } catch (e) {
        console.warn("Could not load portfolio_data.json. Using offline fallback.");
    }
    
    // 3. Fallback defaults
    portfolioData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
}

function saveData() {
    localStorage.setItem('portfolio_data', JSON.stringify(portfolioData));
}

function renderPageSections() {
    const isAdmin = sessionStorage.getItem('admin_logged_in') === 'true';
    
    // Toggle Admin bar presence if logged in
    const adminBar = document.getElementById('admin-bar');
    if (adminBar) {
        if (isAdmin) {
            adminBar.classList.remove('hidden');
        } else {
            adminBar.classList.add('hidden');
        }
    }

    // projects.html grid
    if (document.getElementById('projects-grid')) {
        renderProjects();
    }
    // index.html featured grid
    if (document.getElementById('featured-projects-grid')) {
        renderFeaturedProjects();
    }
    // index.html education
    if (document.getElementById('education-timeline')) {
        renderEducation();
    }
    // index.html experience
    if (document.getElementById('experience-list')) {
        renderExperience();
    }
    // certifications.html certifications
    if (document.getElementById('certifications-list')) {
        renderCertifications();
    }
}

// ----------------------------------------------------
// Section Renderers (with XSS Protection)
// ----------------------------------------------------

// Projects grid
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    const isAdmin = sessionStorage.getItem('admin_logged_in') === 'true';
    grid.innerHTML = '';
    
    portfolioData.projects.forEach((project, index) => {
        const scheme = getScheme(index);
        const card = document.createElement('div');
        card.className = `bg-white border-2 border-[#1E293B] rounded-2xl overflow-hidden ${scheme.shadow} transition-all duration-300 hover:-translate-y-1 hover:-rotate-1 hover:shadow-[8px_8px_0px_0px_#1E293B] reveal relative group`;
        
        card.innerHTML = `
            <div class="h-48 bg-slate-100 border-b-2 border-[#1E293B] relative flex items-center justify-center overflow-hidden">
                <img src="${escapeHTML(project.image) || 'pictures/projects/placeholder.png'}" alt="${escapeHTML(project.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='pictures/projects/placeholder.png'">
                <div class="absolute top-3 right-3 z-20 flex gap-1.5">
                    <span class="${scheme.badge} px-3 py-1 rounded-full text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#1E293B]">${escapeHTML(project.category || 'Project')}</span>
                    ${project.featured ? `<span class="bg-[#FBBF24] text-[#1E293B] border-2 border-[#1E293B] px-3 py-1 rounded-full text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#1E293B]">Featured</span>` : ''}
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-heading font-extrabold text-[#1E293B] mb-2 group-hover:${scheme.text} transition-colors">${escapeHTML(project.title)}</h3>
                <p class="text-[#64748B] text-sm font-medium mb-6 h-12 line-clamp-2">${escapeHTML(project.shortDescription)}</p>
                
                ${isAdmin ? `
                    <div class="flex gap-2 mb-4">
                        <button onclick="openProjectForm('${escapeHTML(project.id)}')" class="flex-1 py-1.5 text-xs font-bold border-2 border-[#1E293B] bg-white text-[#1E293B] rounded-full hover:bg-[#F1F5F9] transition-all flex items-center justify-center gap-1 shadow-[2px_2px_0px_0px_#1E293B]">
                            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Edit
                        </button>
                        <button onclick="deleteProject('${escapeHTML(project.id)}')" class="flex-1 py-1.5 text-xs font-bold border-2 border-[#1E293B] bg-[#EF4444] text-white rounded-full hover:bg-red-600 transition-all flex items-center justify-center gap-1 shadow-[2px_2px_0px_0px_#1E293B]">
                            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Delete
                        </button>
                    </div>
                ` : ''}

                <button onclick="showProjectDetails('${escapeHTML(project.id)}')" class="${scheme.button} w-full py-2.5 text-sm font-bold text-center block">
                    View Details
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
    setupScrollReveal();
}

// Featured homepage projects
function renderFeaturedProjects() {
    const grid = document.getElementById('featured-projects-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const featured = portfolioData.projects.filter(p => p.featured).slice(0, 3);
    
    featured.forEach((project, index) => {
        const scheme = getScheme(index);
        const card = document.createElement('div');
        card.onclick = () => showProjectDetails(project.id);
        card.className = `bg-white border-2 border-[#1E293B] rounded-2xl overflow-hidden ${scheme.shadow} transition-all duration-300 hover:-translate-y-1 hover:-rotate-1 hover:shadow-[8px_8px_0px_0px_#1E293B] reveal cursor-pointer block group`;
        
        card.innerHTML = `
            <div class="h-44 bg-slate-100 border-b-2 border-[#1E293B] relative overflow-hidden">
                <img src="${escapeHTML(project.image) || 'pictures/projects/placeholder.png'}" alt="${escapeHTML(project.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='pictures/projects/placeholder.png'">
                <div class="absolute top-3 right-3 z-20">
                    <span class="${scheme.badge} px-3 py-1 rounded-full text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#1E293B]">${escapeHTML(project.category || 'Project')}</span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-heading font-extrabold text-[#1E293B] mb-2 group-hover:${scheme.text} transition-colors">${escapeHTML(project.title)}</h3>
                <p class="text-[#64748B] text-sm font-medium mb-4 h-10 line-clamp-2">${escapeHTML(project.shortDescription)}</p>
                <div class="${scheme.button} w-full py-2.5 text-sm font-bold text-center block">
                    View Details
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    setupScrollReveal();
}

// Education timeline on homepage
function renderEducation() {
    const container = document.getElementById('education-timeline');
    if (!container) return;
    const isAdmin = sessionStorage.getItem('admin_logged_in') === 'true';
    container.innerHTML = '';
    
    portfolioData.education.forEach((edu, index) => {
        const card = document.createElement('div');
        card.className = "relative reveal";
        
        const isLatest = index === 0;
        const nodeBg = isLatest ? 'bg-[#8B5CF6]' : 'bg-white';
        const pulseClass = isLatest ? '<div class="w-2.5 h-2.5 bg-white rounded-full animate-ping"></div>' : '';
        
        card.innerHTML = `
            <span class="absolute -left-[45px] top-4 ${nodeBg} border-4 border-[#1E293B] w-7 h-7 rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_#1E293B]">
                ${pulseClass}
            </span>
            <div class="sticker-card p-6 rounded-2xl border-2 border-[#1E293B] bg-white shadow-[5px_5px_0px_0px_#1E293B] relative">
                ${isAdmin ? `
                    <div class="absolute top-3 right-3 flex gap-1.5 z-20">
                        <button onclick="openEducationForm('${escapeHTML(edu.id)}')" class="p-1.5 text-xs bg-white border-2 border-[#1E293B] text-[#1E293B] rounded-full hover:bg-[#F1F5F9] transition-all shadow-[2px_2px_0px_0px_#1E293B]">
                            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                        </button>
                        <button onclick="deleteEducation('${escapeHTML(edu.id)}')" class="p-1.5 text-xs bg-[#EF4444] border-2 border-[#1E293B] text-white rounded-full hover:bg-red-600 transition-all shadow-[2px_2px_0px_0px_#1E293B]">
                            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                ` : ''}
                <h4 class="text-[#1E293B] font-heading font-extrabold text-lg pr-12">${escapeHTML(edu.degree)}</h4>
                <div class="text-[#8B5CF6] text-sm font-bold mb-1">${escapeHTML(edu.institution)}</div>
                <p class="text-xs text-[#64748B] font-mono font-bold ${edu.tag ? 'mb-3' : ''}">${escapeHTML(edu.period)}</p>
                ${edu.tag ? `
                    <div class="inline-block bg-[#FBBF24] text-[#1E293B] text-xs font-bold px-3 py-1 rounded-full border-2 border-[#1E293B] shadow-[2px_2px_0px_0px_#1E293B]">
                        ${escapeHTML(edu.tag)}
                    </div>
                ` : ''}
            </div>
        `;
        container.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
    setupScrollReveal();
}

// Experience checklist on homepage
function renderExperience() {
    const list = document.getElementById('experience-list');
    if (!list) return;
    const isAdmin = sessionStorage.getItem('admin_logged_in') === 'true';
    list.innerHTML = '';
    
    portfolioData.experience.forEach((exp, index) => {
        const scheme = getScheme(index);
        const bulletsHtml = exp.bullets ? exp.bullets.map(b => `<li class="flex items-start gap-2.5"><span class="w-3 h-3 rounded-full ${scheme.badge} flex-shrink-0 mt-1"></span><span>${escapeHTML(b)}</span></li>`).join('') : '';
        
        const card = document.createElement('div');
        card.className = `sticker-card p-6 rounded-2xl border-2 border-[#1E293B] bg-white ${scheme.shadow} transition-all group relative reveal`;
        
        card.innerHTML = `
            ${isAdmin ? `
                <div class="absolute top-3 right-3 flex gap-1.5 z-20">
                    <button onclick="openExperienceForm('${escapeHTML(exp.id)}')" class="p-1.5 text-xs bg-white border-2 border-[#1E293B] text-[#1E293B] rounded-full hover:bg-[#F1F5F9] transition-all shadow-[2px_2px_0px_0px_#1E293B]">
                        <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                    </button>
                    <button onclick="deleteExperience('${escapeHTML(exp.id)}')" class="p-1.5 text-xs bg-[#EF4444] border-2 border-[#1E293B] text-white rounded-full hover:bg-red-600 transition-all shadow-[2px_2px_0px_0px_#1E293B]">
                        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                </div>
            ` : ''}
            <div class="flex justify-between items-start mb-2 pr-12">
                <h4 class="text-xl font-heading font-extrabold text-[#1E293B] group-hover:${scheme.text} transition-colors">${escapeHTML(exp.role)}</h4>
                <span class="text-xs font-mono font-bold text-[#1E293B] bg-[#F1F5F9] border-2 border-[#1E293B] px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#1E293B]">${escapeHTML(exp.period)}</span>
            </div>
            <div class="${scheme.text} text-sm font-bold mb-4">${escapeHTML(exp.company)}</div>
            <ul class="text-[#64748B] font-medium space-y-2.5 text-sm">
                ${bulletsHtml}
            </ul>
        `;
        list.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
    setupScrollReveal();
}

// Certifications timeline list
function renderCertifications() {
    const list = document.getElementById('certifications-list');
    if (!list) return;
    const isAdmin = sessionStorage.getItem('admin_logged_in') === 'true';
    list.innerHTML = '';
    
    portfolioData.certifications.forEach((cert, index) => {
        const scheme = getScheme(index);
        const hasUrl = cert.url && cert.url !== '#';
        const isLatest = index === 0;
        const nodeBg = isLatest ? 'bg-[#8B5CF6]' : 'bg-white';
        const pulseClass = isLatest ? '<div class="w-2.5 h-2.5 bg-white rounded-full animate-ping"></div>' : '';
        
        const card = document.createElement('div');
        card.className = "relative reveal";
        
        card.innerHTML = `
            <span class="absolute -left-[45px] top-6 ${nodeBg} border-4 border-[#1E293B] w-7 h-7 rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_#1E293B]">
                ${pulseClass}
            </span>
            <div class="sticker-card p-6 rounded-2xl border-2 border-[#1E293B] bg-white ${scheme.shadow} transition-colors group relative">
                ${isAdmin ? `
                    <div class="absolute top-3 right-3 flex gap-1.5 z-20">
                        <button onclick="openCertificationForm('${escapeHTML(cert.id)}')" class="p-1.5 text-xs bg-white border-2 border-[#1E293B] text-[#1E293B] rounded-full hover:bg-[#F1F5F9] transition-all shadow-[2px_2px_0px_0px_#1E293B]">
                            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                        </button>
                        <button onclick="deleteCertification('${escapeHTML(cert.id)}')" class="p-1.5 text-xs bg-[#EF4444] border-2 border-[#1E293B] text-white rounded-full hover:bg-red-600 transition-all shadow-[2px_2px_0px_0px_#1E293B]">
                            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                ` : ''}
                <div class="flex justify-between items-start mb-2 pr-12">
                    <h3 class="text-xl font-heading font-extrabold text-[#1E293B] group-hover:${scheme.text} transition-colors">${escapeHTML(cert.title)}</h3>
                    <span class="text-xs font-mono font-bold text-[#1E293B] bg-[#F1F5F9] border-2 border-[#1E293B] px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#1E293B]">${escapeHTML(cert.year)}</span>
                </div>
                <div class="${scheme.text} text-sm font-bold mb-3">${escapeHTML(cert.issuer)}</div>
                <p class="text-[#64748B] text-sm font-medium ${hasUrl ? 'mb-4' : ''} leading-relaxed">
                    ${escapeHTML(cert.description)}
                </p>
                ${hasUrl ? `
                    <a href="${escapeHTML(cert.url)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-xs font-bold text-[#1E293B] hover:text-[#8B5CF6] bg-[#FFFDF5] border-2 border-[#1E293B] px-3 py-1.5 rounded-full shadow-[2px_2px_0px_0px_#1E293B] transition-all">
                        <i data-lucide="external-link" class="w-3.5 h-3.5 mr-1 text-[#8B5CF6]"></i> Verify Credential
                    </a>
                ` : ''}
            </div>
        `;
        list.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
    setupScrollReveal();
}

// ----------------------------------------------------
// Details Modal Logic
// ----------------------------------------------------

function showProjectDetails(id) {
    const project = portfolioData.projects.find(p => p.id === id);
    if (!project) return;
    
    const modal = document.getElementById('project-detail-modal');
    if (!modal) return;
    
    modal.querySelector('#detail-title').textContent = project.title;
    modal.querySelector('#detail-image').src = project.image || 'pictures/projects/placeholder.png';
    modal.querySelector('#detail-image').alt = project.title;
    modal.querySelector('#detail-challenge').textContent = project.challenge || "No challenge provided.";
    modal.querySelector('#detail-solution').textContent = project.solution || "No solution provided.";
    
    const techContainer = modal.querySelector('#detail-techstack');
    techContainer.innerHTML = '';
    const stack = Array.isArray(project.techStack) ? project.techStack : (project.techStack ? project.techStack.split(',').map(s => s.trim()) : []);
    stack.forEach(tech => {
        if (!tech) return;
        const tag = document.createElement('span');
        tag.className = "px-3 py-1 bg-[#F1F5F9] border-2 border-[#1E293B] rounded-full text-xs font-bold text-[#1E293B] font-mono shadow-[2px_2px_0px_0px_#1E293B]";
        tag.textContent = tech;
        techContainer.appendChild(tag);
    });
    
    const ghBtn = modal.querySelector('#detail-github-btn');
    if (project.githubUrl && project.githubUrl !== '#') {
        ghBtn.href = project.githubUrl;
        ghBtn.classList.remove('hidden');
    } else {
        ghBtn.classList.add('hidden');
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeDetailsModal() {
    const modal = document.getElementById('project-detail-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// ----------------------------------------------------
// Admin Gateway Logic (SHA-256 Hashed Verification)
// ----------------------------------------------------

function enableAdminMode() {
    sessionStorage.setItem('admin_logged_in', 'true');
    renderPageSections();
}

function disableAdminMode() {
    sessionStorage.removeItem('admin_logged_in');
    renderPageSections();
}

function openAdminLogin() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.querySelector('#admin-password').focus();
    }
}

function closeAdminLogin() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.querySelector('#admin-password').value = '';
    }
}

async function verifyAdminPassword() {
    const passwordInput = document.getElementById('admin-password');
    if (passwordInput) {
        const inputVal = passwordInput.value;
        const hashedInput = await hashPassword(inputVal);
        if (hashedInput === ADMIN_PASSWORD_HASH) {
            enableAdminMode();
            closeAdminLogin();
        } else {
            alert("Incorrect password!");
            passwordInput.value = '';
        }
    }
}

// ----------------------------------------------------
// Projects CRUD
// ----------------------------------------------------

function openProjectForm(id = '') {
    const modal = document.getElementById('project-form-modal');
    if (!modal) return;
    
    const formTitle = modal.querySelector('#form-title');
    const pIdInput = modal.querySelector('#form-project-id');
    const pTitle = modal.querySelector('#form-project-title');
    const pCategory = modal.querySelector('#form-project-category');
    const pImage = modal.querySelector('#form-project-image');
    const pShort = modal.querySelector('#form-project-short');
    const pChallenge = modal.querySelector('#form-project-challenge');
    const pSolution = modal.querySelector('#form-project-solution');
    const pTech = modal.querySelector('#form-project-tech');
    const pGithub = modal.querySelector('#form-project-github');
    const pFeatured = modal.querySelector('#form-project-featured');
    
    if (id) {
        const p = portfolioData.projects.find(item => item.id === id);
        if (!p) return;
        
        formTitle.textContent = "Edit Project";
        pIdInput.value = p.id;
        pTitle.value = p.title || '';
        pCategory.value = p.category || '';
        pImage.value = p.image || '';
        pShort.value = p.shortDescription || '';
        pChallenge.value = p.challenge || '';
        pSolution.value = p.solution || '';
        pTech.value = Array.isArray(p.techStack) ? p.techStack.join(', ') : (p.techStack || '');
        pGithub.value = p.githubUrl || '';
        pFeatured.checked = !!p.featured;
    } else {
        formTitle.textContent = "Add New Project";
        pIdInput.value = '';
        pTitle.value = '';
        pCategory.value = '';
        pImage.value = 'pictures/projects/placeholder.png';
        pShort.value = '';
        pChallenge.value = '';
        pSolution.value = '';
        pTech.value = '';
        pGithub.value = '';
        pFeatured.checked = false;
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeProjectForm() {
    const modal = document.getElementById('project-form-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function saveProjectForm() {
    const id = document.getElementById('form-project-id').value;
    const title = document.getElementById('form-project-title').value.trim();
    const category = document.getElementById('form-project-category').value.trim();
    const image = document.getElementById('form-project-image').value.trim();
    const shortDesc = document.getElementById('form-project-short').value.trim();
    const challenge = document.getElementById('form-project-challenge').value.trim();
    const solution = document.getElementById('form-project-solution').value.trim();
    const tech = document.getElementById('form-project-tech').value.trim();
    const github = document.getElementById('form-project-github').value.trim();
    const featured = document.getElementById('form-project-featured').checked;
    
    if (!title || !shortDesc) {
        alert("Title and Short Description are required!");
        return;
    }
    
    const techStack = tech ? tech.split(',').map(s => s.trim()).filter(s => s.length > 0) : [];
    
    if (id) {
        const index = portfolioData.projects.findIndex(p => p.id === id);
        if (index !== -1) {
            portfolioData.projects[index] = {
                ...portfolioData.projects[index],
                title,
                category,
                image,
                shortDescription: shortDesc,
                challenge,
                solution,
                techStack,
                githubUrl: github || '#',
                featured
            };
        }
    } else {
        const newId = 'proj-' + Date.now();
        portfolioData.projects.push({
            id: newId,
            title,
            category,
            image: image || 'pictures/projects/placeholder.png',
            shortDescription: shortDesc,
            challenge,
            solution,
            techStack,
            githubUrl: github || '#',
            featured
        });
    }
    
    saveData();
    closeProjectForm();
    renderPageSections();
    alert("Saved draft! Remember to Export portfolio_data.json to save permanently.");
}

function deleteProject(id) {
    if (confirm("Are you sure you want to delete this project?")) {
        portfolioData.projects = portfolioData.projects.filter(p => p.id !== id);
        saveData();
        renderPageSections();
    }
}

// ----------------------------------------------------
// Education CRUD
// ----------------------------------------------------

function openEducationForm(id = '') {
    const modal = document.getElementById('education-form-modal');
    if (!modal) return;
    
    const formTitle = modal.querySelector('#edu-form-title');
    const eduId = modal.querySelector('#form-edu-id');
    const eduDegree = modal.querySelector('#form-edu-degree');
    const eduInstitution = modal.querySelector('#form-edu-institution');
    const eduPeriod = modal.querySelector('#form-edu-period');
    const eduTag = modal.querySelector('#form-edu-tag');
    
    if (id) {
        const edu = portfolioData.education.find(item => item.id === id);
        if (!edu) return;
        formTitle.textContent = "Edit Education Entry";
        eduId.value = edu.id;
        eduDegree.value = edu.degree || '';
        eduInstitution.value = edu.institution || '';
        eduPeriod.value = edu.period || '';
        eduTag.value = edu.tag || '';
    } else {
        formTitle.textContent = "Add Education Entry";
        eduId.value = '';
        eduDegree.value = '';
        eduInstitution.value = '';
        eduPeriod.value = '';
        eduTag.value = '';
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeEducationForm() {
    const modal = document.getElementById('education-form-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function saveEducationForm() {
    const id = document.getElementById('form-edu-id').value;
    const degree = document.getElementById('form-edu-degree').value.trim();
    const institution = document.getElementById('form-edu-institution').value.trim();
    const period = document.getElementById('form-edu-period').value.trim();
    const tag = document.getElementById('form-edu-tag').value.trim();
    
    if (!degree || !institution || !period) {
        alert("Degree, Institution, and Period are required!");
        return;
    }
    
    if (id) {
        const index = portfolioData.education.findIndex(e => e.id === id);
        if (index !== -1) {
            portfolioData.education[index] = { ...portfolioData.education[index], degree, institution, period, tag };
        }
    } else {
        const newId = 'edu-' + Date.now();
        portfolioData.education.push({ id: newId, degree, institution, period, tag });
    }
    
    saveData();
    closeEducationForm();
    renderPageSections();
    alert("Saved draft! Remember to Export portfolio_data.json to save permanently.");
}

function deleteEducation(id) {
    if (confirm("Are you sure you want to delete this education entry?")) {
        portfolioData.education = portfolioData.education.filter(e => e.id !== id);
        saveData();
        renderPageSections();
    }
}

// ----------------------------------------------------
// Experience CRUD
// ----------------------------------------------------

function openExperienceForm(id = '') {
    const modal = document.getElementById('experience-form-modal');
    if (!modal) return;
    
    const formTitle = modal.querySelector('#exp-form-title');
    const expId = modal.querySelector('#form-exp-id');
    const expRole = modal.querySelector('#form-exp-role');
    const expCompany = modal.querySelector('#form-exp-company');
    const expPeriod = modal.querySelector('#form-exp-period');
    const expBullets = modal.querySelector('#form-exp-bullets');
    
    if (id) {
        const exp = portfolioData.experience.find(item => item.id === id);
        if (!exp) return;
        formTitle.textContent = "Edit Experience Entry";
        expId.value = exp.id;
        expRole.value = exp.role || '';
        expCompany.value = exp.company || '';
        expPeriod.value = exp.period || '';
        expBullets.value = Array.isArray(exp.bullets) ? exp.bullets.join('\n') : (exp.bullets || '');
    } else {
        formTitle.textContent = "Add Experience Entry";
        expId.value = '';
        expRole.value = '';
        expCompany.value = '';
        expPeriod.value = '';
        expBullets.value = '';
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeExperienceForm() {
    const modal = document.getElementById('experience-form-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function saveExperienceForm() {
    const id = document.getElementById('form-exp-id').value;
    const role = document.getElementById('form-exp-role').value.trim();
    const company = document.getElementById('form-exp-company').value.trim();
    const period = document.getElementById('form-exp-period').value.trim();
    const bulletsRaw = document.getElementById('form-exp-bullets').value.trim();
    
    if (!role || !company || !period) {
        alert("Role, Company, and Period are required!");
        return;
    }
    
    const bullets = bulletsRaw ? bulletsRaw.split('\n').map(b => b.trim()).filter(b => b.length > 0) : [];
    
    if (id) {
        const index = portfolioData.experience.findIndex(e => e.id === id);
        if (index !== -1) {
            portfolioData.experience[index] = { ...portfolioData.experience[index], role, company, period, bullets };
        }
    } else {
        const newId = 'exp-' + Date.now();
        portfolioData.experience.push({ id: newId, role, company, period, bullets });
    }
    
    saveData();
    closeExperienceForm();
    renderPageSections();
    alert("Saved draft! Remember to Export portfolio_data.json to save permanently.");
}

function deleteExperience(id) {
    if (confirm("Are you sure you want to delete this experience entry?")) {
        portfolioData.experience = portfolioData.experience.filter(e => e.id !== id);
        saveData();
        renderPageSections();
    }
}

// ----------------------------------------------------
// Certifications CRUD
// ----------------------------------------------------

function openCertificationForm(id = '') {
    const modal = document.getElementById('certification-form-modal');
    if (!modal) return;
    
    const formTitle = modal.querySelector('#cert-form-title');
    const certId = modal.querySelector('#form-cert-id');
    const certTitle = modal.querySelector('#form-cert-title');
    const certIssuer = modal.querySelector('#form-cert-issuer');
    const certYear = modal.querySelector('#form-cert-year');
    const certDesc = modal.querySelector('#form-cert-desc');
    const certUrl = modal.querySelector('#form-cert-url');
    
    if (id) {
        const cert = portfolioData.certifications.find(item => item.id === id);
        if (!cert) return;
        formTitle.textContent = "Edit Certification Entry";
        certId.value = cert.id;
        certTitle.value = cert.title || '';
        certIssuer.value = cert.issuer || '';
        certYear.value = cert.year || '';
        certDesc.value = cert.description || '';
        certUrl.value = cert.url || '';
    } else {
        formTitle.textContent = "Add Certification Entry";
        certId.value = '';
        certTitle.value = '';
        certIssuer.value = '';
        certYear.value = '';
        certDesc.value = '';
        certUrl.value = '';
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeCertificationForm() {
    const modal = document.getElementById('certification-form-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function saveCertificationForm() {
    const id = document.getElementById('form-cert-id').value;
    const title = document.getElementById('form-cert-title').value.trim();
    const issuer = document.getElementById('form-cert-issuer').value.trim();
    const year = document.getElementById('form-cert-year').value.trim();
    const description = document.getElementById('form-cert-desc').value.trim();
    const url = document.getElementById('form-cert-url').value.trim();
    
    if (!title || !issuer || !year) {
        alert("Title, Issuer, and Year are required!");
        return;
    }
    
    if (id) {
        const index = portfolioData.certifications.findIndex(c => c.id === id);
        if (index !== -1) {
            portfolioData.certifications[index] = { ...portfolioData.certifications[index], title, issuer, year, description, url: url || '#' };
        }
    } else {
        const newId = 'cert-' + Date.now();
        portfolioData.certifications.push({ id: newId, title, issuer, year, description, url: url || '#' });
    }
    
    saveData();
    closeCertificationForm();
    renderPageSections();
    alert("Saved draft! Remember to Export portfolio_data.json to save permanently.");
}

function deleteCertification(id) {
    if (confirm("Are you sure you want to delete this certification?")) {
        portfolioData.certifications = portfolioData.certifications.filter(c => c.id !== id);
        saveData();
        renderPageSections();
    }
}

// ----------------------------------------------------
// JSON Export & Import Controls
// ----------------------------------------------------

function exportProjectsJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "portfolio_data.json");
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
}

function triggerImportJSON() {
    const fileInput = document.getElementById('import-json-file');
    if (fileInput) {
        fileInput.click();
    }
}

function handleImportJSON(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported.projects && imported.education && imported.experience && imported.certifications) {
                portfolioData = imported;
                saveData();
                renderPageSections();
                alert("Portfolio database imported! Export as portfolio_data.json to download and commit changes.");
            } else {
                alert("Invalid schema. JSON must contain projects, education, experience, and certifications arrays.");
            }
        } catch (err) {
            alert("Error parsing JSON file: " + err.message);
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// ----------------------------------------------------
// Setup Hooks & DOM Events
// ----------------------------------------------------

function setupAdminControls() {
    const fileInput = document.getElementById('import-json-file');
    if (fileInput) {
        fileInput.addEventListener('change', handleImportJSON);
    }
    const passwordInput = document.getElementById('admin-password');
    if (passwordInput) {
        passwordInput.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                await verifyAdminPassword();
            }
        });
    }
}

function setupContactForm() {
    const contactForm = document.querySelector('#contact form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Anti-bot honeypot validation
        const honeypot = document.getElementById('contact-honeypot');
        if (honeypot && honeypot.value) {
            // Silently block bot submission
            alert("Message sent successfully!");
            contactForm.reset();
            return;
        }
        
        const inputs = contactForm.querySelectorAll('input:not(#contact-honeypot), textarea');
        const name = inputs[0]?.value.trim();
        const email = inputs[1]?.value.trim();
        const message = inputs[2]?.value.trim();
        
        if (!name || !email || !message) {
            alert("Please fill in all required fields.");
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
        alert(`Thank you, ${escapeHTML(name)}! Your message has been received.`);
        contactForm.reset();
    });
}

// Global Modal Closer Keydown
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDetailsModal();
        closeAdminLogin();
        closeProjectForm();
        closeEducationForm();
        closeExperienceForm();
        closeCertificationForm();
    }
});

// Original animations and Mobile Menu toggles
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('shadow-[4px_6px_0px_0px_#1E293B]');
    } else {
        navbar.classList.remove('shadow-[4px_6px_0px_0px_#1E293B]');
    }
});

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

let revealElements = [];
function setupScrollReveal() {
    revealElements = document.querySelectorAll('.reveal');
}

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// ----------------------------------------------------
// Production Security & Anti-Inspection Protections
// ----------------------------------------------------

// 1. Disable Right-Click Context Menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// 2. Disable Developer Tools & View Source Shortcuts
document.addEventListener('keydown', (e) => {
    // Disable F12 Key
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element picker)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+S (Save Page)
    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        return false;
    }
});

// 3. Disable Image Dragging
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});