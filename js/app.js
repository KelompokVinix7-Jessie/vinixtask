// Data structure untuk aplikasi
const appData = {
    // Status login
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    rememberMe: localStorage.getItem('rememberMe') === 'true',
    
    // Data user
    user: JSON.parse(localStorage.getItem('app_user')) || {
        username: "user",
        name: "Alex Thompson",
        email: "alex.thompson@example.com",
        phone: "+62 812-3456-7890",
        cvLink: "https://example.com/cv",
        isVIP: localStorage.getItem('isVIP') === 'true',
        avatar: "AT"
    },
    
    // Data tugas
    tasks: JSON.parse(localStorage.getItem('app_tasks')) || {
        // Statistik
        completed: 0,
        logbookCompleted: 2,
        pending: 1,
        overdue: 0,
        
        // Tugas mendatang
        upcoming: [
            {
                id: 1,
                type: "Logbook",
                title: "Week 2 - Team Formation and Roles",
                deadline: "2025-11-27",
                status: "open"
            },
            {
                id: 2,
                type: "Weekly Task",
                title: "Week 2 - Team Formation and Roles",
                deadline: "2025-11-27",
                status: "open"
            },
            {
                id: 3,
                type: "Logbook",
                title: "Week 1 - Project Planning and Timeline",
                deadline: "2025-11-20",
                status: "overdue"
            }
        ],
        
        // Logbook
        logbooks: Array.from({length: 10}, (_, i) => ({
            id: i+1,
            type: "Logbook",
            week: i+1,
            title: `Logbook Week ${i+1}`,
            deadline: `2025-${11 + Math.floor(i/4)}-${15 + (i%4)*7}`,
            status: i < 2 ? "completed" : i === 2 ? "overdue" : "open",
            description: `Description for Logbook Week ${i+1}`,
            score: i < 2 ? "A" : null,
            comments: i < 2 ? "Great work! Well documented and thorough analysis." : null,
            submittedFiles: i < 2 ? [`logbook_week_${i+1}.pdf`] : [],
            submittedDate: i < 2 ? new Date().toISOString() : null,
            locked: false
        })),
        
        // Weekly tasks
        // Data tugas - update bagian weeklyTasks
weeklyTasks: Array.from({length: 10}, (_, i) => ({
    id: i+1,
    type: "Weekly Task",
    week: i+1,
    title: `Week ${i+1} - ${['Project Planning', 'Team Formation', 'Requirements Analysis', 'Design Phase', 'Implementation', 'Testing', 'Deployment', 'Documentation', 'Final Review', 'Presentation'][i]}`,
    deadline: `2025-${11 + Math.floor(i/4)}-${10 + (i%4)*7}`,
    status: i < 1 ? "completed" : i === 1 ? "overdue" : "open",
    description: `Description for Weekly Task Week ${i+1}`,
    score: i < 1 ? "A" : null,
    grade: i < 1 ? "A" : null, // Tambahkan grade
    comments: i < 1 ? "Excellent work! Very thorough analysis and implementation." : null,
    submittedFiles: i < 1 ? [`task_week_${i+1}.pdf`] : [],
    submittedDate: i < 1 ? new Date().toISOString() : null,
    locked: false,
    notes: i < 1 ? "Completed all requirements as specified." : null
}))
    },
    
    // Data tim
    team: [
        {
            id: 1,
            name: "Alex Thompson",
            role: "Project Manager",
            phone: "+62 812-3456-7890",
            email: "alex.thompson@example.com",
            cvLink: "https://example.com/cv/alex"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            role: "Frontend Developer",
            phone: "+62 813-4567-8901",
            email: "sarah.johnson@example.com",
            cvLink: "https://example.com/cv/sarah"
        },
        {
            id: 3,
            name: "Michael Chen",
            role: "Backend Developer",
            phone: "+62 814-5678-9012",
            email: "michael.chen@example.com",
            cvLink: "https://example.com/cv/michael"
        },
        {
            id: 4,
            name: "Emily Davis",
            role: "UI/UX Designer",
            phone: "+62 815-6789-0123",
            email: "emily.davis@example.com",
            cvLink: "https://example.com/cv/emily"
        }
    ],
    
    // Data template (VIP)
    templates: [
        {
            id: 1,
            title: "Logbook Template",
            description: "Standard template for weekly logbook entries"
        },
        {
            id: 2,
            title: "Daily Activity Log",
            description: "Track your daily activities and progress"
        },
        {
            id: 3,
            title: "Meeting Notes",
            description: "Structured template for meeting minutes"
        },
        {
            id: 4,
            title: "Task Report Template",
            description: "Comprehensive task reporting format"
        },
        {
            id: 5,
            title: "Project Plan Template",
            description: "Detailed project planning document"
        },
        {
            id: 6,
            title: "Final Project Template",
            description: "Template for final project documentation"
        }
    ],
    
    // Data transaksi
    transactions: JSON.parse(localStorage.getItem('app_transactions')) || []
};

// Fungsi untuk menghitung statistik tugas
function calculateTaskStats() {
    const tasks = appData.tasks;
    
    // Hitung logbook completed
    tasks.logbookCompleted = tasks.logbooks.filter(logbook => 
        logbook.status === "completed" && !logbook.locked
    ).length;
    
    // Hitung weekly tasks completed
    const weeklyCompleted = tasks.weeklyTasks.filter(task => 
        task.status === "completed" && !task.locked
    ).length;
    
    // Total tasks completed
    tasks.completed = tasks.logbookCompleted + weeklyCompleted;
    
    // Hitung pending tasks (open dan belum terkunci)
    tasks.pending = tasks.logbooks.filter(logbook => 
        logbook.status === "open" && !logbook.locked
    ).length + tasks.weeklyTasks.filter(task => 
        task.status === "open" && !task.locked
    ).length;
    
    // Hitung overdue tasks
    tasks.overdue = tasks.logbooks.filter(logbook => 
        logbook.status === "overdue" && !logbook.locked
    ).length + tasks.weeklyTasks.filter(task => 
        task.status === "overdue" && !task.locked
    ).length;
    
    // Update upcoming tasks
    tasks.upcoming = [
        ...tasks.logbooks.filter(logbook => 
            (logbook.status === "open" || logbook.status === "overdue") && !logbook.locked
        ).slice(0, 3),
        ...tasks.weeklyTasks.filter(task => 
            (task.status === "open" || task.status === "overdue") && !task.locked
        ).slice(0, 3)
    ].slice(0, 5); // Batasi hingga 5 item
    
    // Simpan ke localStorage
    localStorage.setItem('app_tasks', JSON.stringify(tasks));
}

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initializing...');
    
    // Hitung statistik awal
    calculateTaskStats();
    
    // Cek status login
    if (appData.isLoggedIn) {
        showApp();
    } else {
        showLogin();
    }
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup hash routing
    setupHashRouting();
});

// Setup hash routing
function setupHashRouting() {
    console.log('Setting up hash routing...');
    window.addEventListener('hashchange', loadPageFromHash);
    // Load halaman saat pertama kali
    loadPageFromHash();
}

// Load halaman berdasarkan hash
function loadPageFromHash() {
    if (!appData.isLoggedIn) return;
    
    const hash = window.location.hash.substring(1) || 'home';
    const parts = hash.split('/');
    const mainPage = parts[0];
    const subPage = parts.slice(1).join('/'); // Fix: tangani multiple parameters
    
    // Update menu aktif
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeMenuItem = document.querySelector(`.menu-item[data-page="${mainPage}"]`);
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
    }
    
    // Load halaman
    loadPage(mainPage, subPage);
}

// Tampilkan halaman login
function showLogin() {
    console.log('Showing login page');
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('app').style.display = 'none';
    
    // Isi data login jika remember me aktif
    if (appData.rememberMe) {
        document.getElementById('email').value = localStorage.getItem('savedEmail') || '';
        document.getElementById('password').value = localStorage.getItem('savedPassword') || '';
        document.getElementById('remember').checked = true;
    }
}

// Tampilkan aplikasi utama
function showApp() {
    console.log('Showing main app');
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    
    // Update informasi user di sidebar
    const sidebarUserName = document.getElementById('sidebar-user-name');
    const sidebarAvatar = document.getElementById('sidebar-avatar');
    
    if (sidebarUserName) {
        sidebarUserName.textContent = appData.user.name;
    }
    if (sidebarAvatar) {
        sidebarAvatar.textContent = appData.user.avatar;
    }
}

// Setup semua event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Tasks menu dropdown
    const tasksMenu = document.getElementById('tasks-menu');
    if (tasksMenu) {
        tasksMenu.addEventListener('click', function() {
            const dropdown = document.getElementById('tasks-dropdown');
            if (dropdown) {
                dropdown.classList.toggle('active');
                
                const arrow = this.querySelector('.dropdown-arrow');
                if (arrow) {
                    arrow.classList.toggle('ri-arrow-down-s-line');
                    arrow.classList.toggle('ri-arrow-up-s-line');
                }
            }
        });
    }
    
    // Navigasi menu
    document.querySelectorAll('.menu-item').forEach(item => {
        if (item.id !== 'logout-btn' && item.id !== 'tasks-menu') {
            item.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                if (page) {
                    console.log('Navigating to:', page);
                    window.location.hash = page;
                }
            });
        }
    });
    
    // Navigasi dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                console.log('Navigating to:', page);
                window.location.hash = page;
            }
        });
    });
    
    // Tombol upgrade di sidebar
    const upgradeBtn = document.querySelector('.btn-pro');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function() {
            console.log('Navigating to upgrade page');
            window.location.hash = 'upgrade';
        });
    }
    
    // Tombol logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// Handle logout
function handleLogout() {
    console.log('Logging out...');
    appData.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    showLogin();
    
    // Reset form login
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

// Load halaman berdasarkan nama
function loadPage(pageName, subPage = null) {
    console.log('Loading page:', pageName, 'subPage:', subPage);
    
    const pageTitle = document.getElementById('page-title');
    const pageContent = document.getElementById('page-content');
    
    if (!pageTitle || !pageContent) {
        console.error('Page title or content element not found');
        return;
    }
    
    // Reset konten
    pageContent.innerHTML = '';
    
    // Render konten berdasarkan halaman
    switch(pageName) {
        case 'home':
            pageTitle.textContent = 'Dashboard';
            renderHomePage(pageContent);
            break;
        case 'tasks':
            pageTitle.textContent = 'Tasks';
            renderTasksPage(pageContent);
            break;
        case 'logbook':
            pageTitle.textContent = 'Tasks - Logbook';
            renderLogbookPage(pageContent);
            break;
        case 'weekly-tasks':
            pageTitle.textContent = 'Tasks - Weekly Tasks';
            renderWeeklyTasksPage(pageContent);
            break;
        case 'task-detail':
            pageTitle.textContent = 'Task Details';
            renderTaskDetailPage(pageContent, subPage);
            break;
        case 'task-view':
            pageTitle.textContent = 'View Task';
            renderTaskViewPage(pageContent, subPage);
            break;
        case 'templates':
            pageTitle.textContent = 'Task Templates';
            renderTemplatesPage(pageContent);
            break;
        case 'team':
            pageTitle.textContent = 'Team Space';
            renderTeamPage(pageContent);
            break;
        case 'profile':
            pageTitle.textContent = 'Profile';
            renderProfilePage(pageContent);
            break;
        case 'edit-profile':
            pageTitle.textContent = 'Edit Profile';
            renderEditProfilePage(pageContent);
            break;
        case 'change-password':
            pageTitle.textContent = 'Change Password';
            renderChangePasswordPage(pageContent);
            break;
        case 'upgrade':
            pageTitle.textContent = 'Upgrade to PRO';
            renderUpgradePage(pageContent);
            break;
        default:
            pageTitle.textContent = 'Dashboard';
            renderHomePage(pageContent);
    }
}

// =============================================
// FUNGSI RENDER HALAMAN PROFILE YANG DIPERBAIKI
// =============================================

// Render halaman Profile
function renderProfilePage(container) {
    console.log('Rendering profile page');
    const user = appData.user;
    const transactions = appData.transactions;
    
    container.innerHTML = `
        <div class="profile-container">
            <div class="profile-main-card">
                <div class="profile-header">
                    <div class="profile-avatar">
                        ${user.avatar}
                        <div class="profile-avatar-edit">
                            <i class="ri-pencil-line"></i>
                        </div>
                    </div>
                    <div class="profile-info">
                        <h3>${user.name} ${user.isVIP ? '<span class="vip-badge">PRO</span>' : ''}</h3>
                        <p>${user.email}</p>
                    </div>
                </div>
                
                <div class="profile-details">
                    <div class="detail-item">
                        <label>Email</label>
                        <p>${user.email}</p>
                    </div>
                    <div class="detail-item">
                        <label>Phone Number</label>
                        <p>${user.phone}</p>
                    </div>
                    <div class="detail-item">
                        <label>CV Link</label>
                        <p><a href="${user.cvLink}" target="_blank">View CV</a></p>
                    </div>
                    <div class="detail-item">
                        <label>Membership</label>
                        <p>${user.isVIP ? 'PRO' : 'Free'}</p>
                    </div>
                </div>
                
                <div class="profile-actions">
                    <button class="btn btn-primary" id="edit-profile-btn">Edit Profile</button>
                    <button class="btn btn-outline" id="change-password-btn">Change Password</button>
                </div>
            </div>
            
            ${transactions.length > 0 ? `
                <div class="profile-card transaction-history">
                    <h3>Transaction History</h3>
                    <table class="transaction-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${transactions.map(transaction => `
                                <tr>
                                    <td>${transaction.date}</td>
                                    <td>${transaction.description}</td>
                                    <td>${transaction.amount}</td>
                                    <td>${transaction.status}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            ` : ''}
            
            <div class="action-cards">
                <div class="action-card">
                    <i class="ri-vip-crown-line" style="font-size: 40px; color: var(--warning);"></i>
                    <h3>Upgrade to PRO</h3>
                    <p>Unlock all premium features and templates</p>
                    <button class="btn btn-warning" id="upgrade-btn">Upgrade Now</button>
                </div>
                <div class="action-card">
                    <i class="ri-refresh-line" style="font-size: 40px; color: var(--danger);"></i>
                    <h3>Reset Demo</h3>
                    <p>Clear all data and reset the application</p>
                    <button class="btn btn-danger" id="reset-demo">Reset</button>
                </div>
            </div>
        </div>
    `;
    
    // Event listener untuk edit profile
    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            console.log('Navigating to edit profile');
            window.location.hash = 'edit-profile';
        });
    }
    
    // Event listener untuk change password
    const changePasswordBtn = document.getElementById('change-password-btn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            console.log('Navigating to change password');
            window.location.hash = 'change-password';
        });
    }
    
    // Event listener untuk reset demo
    const resetDemoBtn = document.getElementById('reset-demo');
    if (resetDemoBtn) {
        resetDemoBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
                localStorage.clear();
                location.reload();
            }
        });
    }
    
    // Event listener untuk tombol upgrade
    const upgradeBtn = document.getElementById('upgrade-btn');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function() {
            console.log('Navigating to upgrade page');
            window.location.hash = 'upgrade';
        });
    }
}

// Render halaman Edit Profile
function renderEditProfilePage(container) {
    console.log('Rendering edit profile page');
    const user = appData.user;
    
    container.innerHTML = `
        <div class="edit-profile-form">
            <div class="form-section">
                <h3 class="form-section-title">Profile Information</h3>
                <div class="form-group">
                    <label class="form-label" for="edit-name">Full Name</label>
                    <input type="text" id="edit-name" class="form-input form-input-disabled" value="${user.name}" readonly>
                    <small class="form-help">Name cannot be changed</small>
                </div>
                <div class="form-group">
                    <label class="form-label" for="edit-email">Email</label>
                    <input type="email" id="edit-email" class="form-input" value="${user.email}">
                </div>
                <div class="form-group">
                    <label class="form-label" for="edit-phone">Phone Number</label>
                    <input type="tel" id="edit-phone" class="form-input" value="${user.phone}">
                </div>
                <div class="form-group">
                    <label class="form-label" for="edit-cv">CV Link</label>
                    <input type="url" id="edit-cv" class="form-input" value="${user.cvLink}">
                </div>
            </div>
            
            <div class="form-actions">
                <button class="btn btn-outline" id="cancel-edit-btn">Cancel</button>
                <button class="btn btn-primary" id="save-profile">Save Changes</button>
            </div>
        </div>
    `;
    
    // Event listener untuk cancel
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function() {
            console.log('Canceling edit, going back');
            window.history.back();
        });
    }
    
    // Event listener untuk save profile - HANYA SATU
    const saveProfileBtn = document.getElementById('save-profile');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function() {
            console.log('Save profile clicked');
            // Tampilkan konfirmasi sebelum menyimpan
            if (confirm('Are you sure you want to save these changes?')) {
                const name = document.getElementById('edit-name').value;
                const email = document.getElementById('edit-email').value;
                const phone = document.getElementById('edit-phone').value;
                const cvLink = document.getElementById('edit-cv').value;
                
                // Update user data
                appData.user.name = name;
                appData.user.email = email;
                appData.user.phone = phone;
                appData.user.cvLink = cvLink;
                appData.user.avatar = name.split(' ').map(n => n[0]).join('');
                
                // Simpan ke localStorage
                localStorage.setItem('app_user', JSON.stringify(appData.user));
                
                // Update sidebar
                const sidebarUserName = document.getElementById('sidebar-user-name');
                const sidebarAvatar = document.getElementById('sidebar-avatar');
                if (sidebarUserName) sidebarUserName.textContent = name;
                if (sidebarAvatar) sidebarAvatar.textContent = appData.user.avatar;
                
                alert('Profile updated successfully!');
                window.history.back();
            }
        });
    }
}

// Render halaman Change Password
function renderChangePasswordPage(container) {
    console.log('Rendering change password page');
    
    container.innerHTML = `
        <div class="change-password-form">
            <div class="form-section">
                <h3 class="form-section-title">Change Password</h3>
                <div class="form-group">
                    <label class="form-label" for="current-password">Current Password</label>
                    <input type="password" id="current-password" class="form-input" placeholder="Enter current password">
                </div>
                <div class="form-group">
                    <label class="form-label" for="new-password">New Password</label>
                    <input type="password" id="new-password" class="form-input" placeholder="Enter new password">
                </div>
                <div class="form-group">
                    <label class="form-label" for="confirm-password">Confirm New Password</label>
                    <input type="password" id="confirm-password" class="form-input" placeholder="Confirm new password">
                </div>
            </div>
            
            <div class="form-actions">
                <button class="btn btn-outline" id="cancel-password-btn">Cancel</button>
                <button class="btn btn-primary" id="save-password">Change Password</button>
            </div>
        </div>
    `;
    
    // Event listener untuk cancel
    const cancelPasswordBtn = document.getElementById('cancel-password-btn');
    if (cancelPasswordBtn) {
        cancelPasswordBtn.addEventListener('click', function() {
            console.log('Canceling password change, going back');
            window.history.back();
        });
    }
    
    // Event listener untuk save password
    const savePasswordBtn = document.getElementById('save-password');
    if (savePasswordBtn) {
        savePasswordBtn.addEventListener('click', function() {
            console.log('Save password clicked');
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validasi
            if (!currentPassword || !newPassword || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('New password and confirm password do not match');
                return;
            }
            
            // Tampilkan konfirmasi
            if (confirm('Are you sure you want to change your password?')) {
                // Simulasi perubahan password
                // Dalam aplikasi nyata, ini akan mengirim request ke server
                
                alert('Password changed successfully!');
                window.history.back();
            }
        });
    }
}

// =============================================
// FUNGSI RENDER LAINNYA (PLACEHOLDER)
// =============================================

function renderHomePage(container) {
    container.innerHTML = `<h2>Dashboard Content</h2><p>Home page content here</p>`;
}

function renderTasksPage(container) {
    container.innerHTML = `<h2>Tasks Content</h2><p>Tasks page content here</p>`;
}

function renderLogbookPage(container) {
    container.innerHTML = `<h2>Logbook Content</h2><p>Logbook page content here</p>`;
}

function renderWeeklyTasksPage(container) {
    container.innerHTML = `<h2>Weekly Tasks Content</h2><p>Weekly tasks page content here</p>`;
}

function renderTaskDetailPage(container, subPage) {
    container.innerHTML = `<h2>Task Detail Content</h2><p>Task detail for: ${subPage}</p>`;
}

function renderTaskViewPage(container, subPage) {
    container.innerHTML = `<h2>Task View Content</h2><p>Task view for: ${subPage}</p>`;
}

function renderTemplatesPage(container) {
    container.innerHTML = `<h2>Templates Content</h2><p>Templates page content here</p>`;
}

function renderTeamPage(container) {
    container.innerHTML = `<h2>Team Content</h2><p>Team page content here</p>`;
}

function renderUpgradePage(container) {
    container.innerHTML = `<h2>Upgrade Content</h2><p>Upgrade page content here</p>`;
}

// =============================================
// INISIALISASI TAMBAHAN UNTUK DEBUGGING
// =============================================

// Tambahkan debugging info
console.log('App data initialized:', appData);
console.log('Current hash:', window.location.hash);

// Pastikan fungsi tersedia secara global untuk event handler
window.handleLogout = handleLogout;