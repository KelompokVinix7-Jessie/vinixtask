// Render halaman Tasks (parent page)
function renderTasksPage(container) {
    container.innerHTML = `
        <div class="tasks-tabs">
            <button class="tab-btn active" data-tab="logbook">Logbook</button>
            <button class="tab-btn" data-tab="weekly-tasks">Weekly Tasks</button>
        </div>
        
        <div class="tab-content active" id="logbook-tab">
            <!-- Konten logbook akan diisi oleh fungsi renderLogbookPage -->
        </div>
        
        <div class="tab-content" id="weekly-tasks-tab">
            <!-- Konten weekly tasks akan diisi oleh fungsi renderWeeklyTasksPage -->
        </div>
    `;
    
    // Render konten tab awal
    renderLogbookPage(document.getElementById('logbook-tab'));
    
    // Setup tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Update tab aktif
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update konten tab
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(`${tab}-tab`).classList.add('active');
            
            // Render konten tab yang dipilih
            if (tab === 'logbook') {
                renderLogbookPage(document.getElementById('logbook-tab'));
            } else if (tab === 'weekly-tasks') {
                renderWeeklyTasksPage(document.getElementById('weekly-tasks-tab'));
            }
        });
    });
}

// Render halaman Logbook
function renderLogbookPage(container) {
    // Tambahkan deskripsi logbook
    const logbookDescription = document.createElement('div');
    logbookDescription.className = 'logbook-description';
    logbookDescription.textContent = 'Complete your weekly logbook entries. Each week must be completed before the next one unlocks.';
    
    // Buat grid logbook
    const logbookGrid = document.createElement('div');
    logbookGrid.className = 'logbook-grid';
    
    // Kosongkan container terlebih dahulu
    container.innerHTML = '';
    container.appendChild(logbookDescription);
    container.appendChild(logbookGrid);
    
    // Render setiap logbook card
    appData.tasks.logbooks.forEach(logbook => {
        // Cek apakah logbook terkunci
        const currentWeek = getCurrentWeek();
        const isLocked = logbook.week > currentWeek;
        
        const logbookCard = document.createElement('div');
        logbookCard.className = `logbook-card ${isLocked ? 'locked' : ''}`;
        logbookCard.setAttribute('data-id', logbook.id);
        logbookCard.setAttribute('data-type', 'logbook');
        
        logbookCard.innerHTML = `
            <h4>${logbook.title}</h4>
            <p>Deadline: ${formatDate(logbook.deadline)}</p>
            <div class="logbook-meta">
                <div class="task-status status-${isLocked ? 'locked' : logbook.status}">
                    ${isLocked ? 'Locked' : 
                      logbook.status === 'completed' ? 'Completed' : 
                      logbook.status === 'overdue' ? 'Overdue' : 'Open'}
                </div>
                ${!isLocked ? 
                    (logbook.status === 'completed' ? 
                        `<button class="btn btn-outline btn-view" data-id="${logbook.id}" data-type="logbook">View</button>` : 
                        `<button class="btn btn-primary btn-upload" data-id="${logbook.id}" data-type="logbook">Upload Task</button>`
                    ) : 
                    `<button class="btn btn-outline" disabled>Locked</button>`
                }
            </div>
        `;
        
        logbookGrid.appendChild(logbookCard);
    });
    
    // Setup event listeners
    setupTaskEventListeners(container);
}

// Render halaman Weekly Tasks
function renderWeeklyTasksPage(container) {
    // Buat container untuk weekly tasks
    const weeklyTasksList = document.createElement('div');
    weeklyTasksList.className = 'weekly-tasks-list';
    
    // Kosongkan container terlebih dahulu
    container.innerHTML = '';
    container.appendChild(weeklyTasksList);
    
    // Render setiap weekly task card
    appData.tasks.weeklyTasks.forEach(task => {
        // Tentukan status task
        const status = getWeeklyTaskStatus(task);
        const isLocked = status === 'locked';
        
        const taskCard = document.createElement('div');
        taskCard.className = `weekly-task-card ${isLocked ? 'locked' : ''}`;
        taskCard.setAttribute('data-id', task.id);
        taskCard.setAttribute('data-type', 'weekly');
        
        taskCard.innerHTML = `
            <div class="weekly-task-info">
                <h4>${task.title}</h4>
                <div class="weekly-task-meta">
                    <span><i class="ri-calendar-line"></i> Deadline: ${formatDate(task.deadline)}</span>
                </div>
                <div class="weekly-task-status-container">
                    <div class="task-status status-${status}">
                        ${status === 'locked' ? 'Locked' : 
                          status === 'in-progress' ? 'In Progress' : 
                          status === 'submitted' ? 'Submitted' : 
                          status === 'graded' ? 'Graded' : 'Overdue'}
                    </div>
                    ${task.grade ? `<div class="weekly-task-grade">Grade: ${task.grade}</div>` : ''}
                </div>
                ${task.comments && status === 'graded' ? `<p><strong>Mentor Comment:</strong> ${task.comments}</p>` : ''}
            </div>
            <div class="task-actions">
                ${!isLocked ? 
                    (status === 'submitted' || status === 'graded' ? 
                        `<button class="btn btn-outline btn-view" data-id="${task.id}" data-type="weekly">View</button>` : 
                        `<button class="btn btn-primary btn-upload" data-id="${task.id}" data-type="weekly">Upload Task</button>`
                    ) : 
                    `<button class="btn btn-outline" disabled>Locked</button>`
                }
            </div>
        `;
        
        weeklyTasksList.appendChild(taskCard);
    });
    
    // Setup event listeners
    setupTaskEventListeners(container);
}

// Setup event listeners untuk task cards
function setupTaskEventListeners(container) {
    // Setup event listener untuk upload task
    container.querySelectorAll('.btn-upload').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            window.location.hash = `task-detail/${taskType}/${taskId}`;
        });
    });
    
    // Setup event listener untuk view task
    container.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            window.location.hash = `task-view/${taskType}/${taskId}`;
        });
    });
    
    // Setup event listener untuk card logbook
    container.querySelectorAll('.logbook-card:not(.locked)').forEach(card => {
        card.addEventListener('click', function() {
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            
            // Tentukan apakah ke halaman upload atau view
            const task = appData.tasks.logbooks.find(t => t.id === parseInt(taskId));
            
            if (task.status === 'completed') {
                window.location.hash = `task-view/${taskType}/${taskId}`;
            } else {
                window.location.hash = `task-detail/${taskType}/${taskId}`;
            }
        });
    });
    
    // Setup event listener untuk card weekly task
    container.querySelectorAll('.weekly-task-card:not(.locked)').forEach(card => {
        card.addEventListener('click', function() {
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            
            // Tentukan apakah ke halaman upload atau view
            const task = appData.tasks.weeklyTasks.find(t => t.id === parseInt(taskId));
            const status = getWeeklyTaskStatus(task);
            
            if (status === 'submitted' || status === 'graded') {
                window.location.hash = `task-view/${taskType}/${taskId}`;
            } else {
                window.location.hash = `task-detail/${taskType}/${taskId}`;
            }
        });
    });
}

// Render halaman Detail Tugas (Upload)
function renderTaskDetailPage(container, taskPath) {
    console.log('renderTaskDetailPage called with:', taskPath); // Debug log
    
    if (!taskPath) {
        container.innerHTML = '<p>Task not found - no task path provided</p>';
        return;
    }
    
    const parts = taskPath.split('/');
    const taskType = parts[0];
    const taskId = parseInt(parts[1]);
    
    let task;
    if (taskType === 'logbook') {
        task = appData.tasks.logbooks.find(t => t.id === taskId);
    } else if (taskType === 'weekly') {
        task = appData.tasks.weeklyTasks.find(t => t.id === taskId);
    }
    
    if (!task) {
        container.innerHTML = `<p>Task not found - Type: ${taskType}, ID: ${taskId}</p>`;
        return;
    }
    
    // Tentukan apakah deadline sudah lewat
    const isOverdue = new Date(task.deadline) < new Date();
    
    container.innerHTML = `
        <div class="task-detail">
            <div class="task-detail-header">
                <div class="task-detail-info">
                    <h2>${task.title}</h2>
                    <div class="task-detail-meta">
                        <span><i class="ri-calendar-line"></i> Deadline: ${formatDate(task.deadline)}</span>
                        <span class="task-status status-${isOverdue ? 'overdue' : 'in-progress'}">${isOverdue ? 'Overdue' : 'In Progress'}</span>
                    </div>
                </div>
            </div>
            
            <div class="task-description">
                <h3>Description</h3>
                <p>${task.description}</p>
            </div>
            
            <div class="upload-section" id="upload-area">
                <i class="ri-upload-cloud-2-line"></i>
                <h3>Upload Your Work</h3>
                <p>Click to upload or drag and drop your file here</p>
                <p>${taskType === 'logbook' ? 'PDF, JPG, PNG, DOCX' : 'PDF, PPT'} (Max. 10MB)</p>
                <input type="file" id="file-input" class="file-input" accept="${taskType === 'logbook' ? '.pdf,.jpg,.jpeg,.png,.docx' : '.pdf,.ppt,.pptx'}">
            </div>
            
            ${taskType === 'weekly' ? `
                <div class="notes-section">
                    <h3>Notes (Optional)</h3>
                    <textarea class="notes-input" id="task-notes" placeholder="Add any notes about your submission...">${task.notes || ''}</textarea>
                </div>
            ` : ''}
            
            ${task.submittedFiles && task.submittedFiles.length > 0 ? `
                <div class="uploaded-files">
                    <h3>Uploaded Files</h3>
                    ${task.submittedFiles.map(file => `
                        <div class="file-item">
                            <div class="file-info">
                                <i class="ri-file-text-line file-icon"></i>
                                <span>${file}</span>
                            </div>
                            <span>Uploaded: ${task.submittedDate ? formatDate(task.submittedDate) : 'Not submitted'}</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="payment-actions">
                <button class="btn btn-outline" onclick="window.history.back()">Back</button>
                <button class="btn btn-primary" id="submit-task" ${task.submittedFiles && task.submittedFiles.length > 0 ? '' : 'disabled'}>${taskType === 'logbook' ? 'Submit Logbook' : 'Submit Task'}</button>
            </div>
        </div>
    `;
    
    // Setup file upload - pindahkan fungsi handleFileUpload ke luar
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const submitBtn = document.getElementById('submit-task');
    
    // Pastikan elemen ditemukan sebelum menambahkan event listener
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary)';
            uploadArea.style.backgroundColor = 'var(--primary-light)';
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'var(--gray-light)';
            uploadArea.style.backgroundColor = 'transparent';
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--gray-light)';
            uploadArea.style.backgroundColor = 'transparent';
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                handleFileUpload(task, fileInput.files[0], taskType);
            }
        });
        
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                handleFileUpload(task, fileInput.files[0], taskType);
            }
        });
    }
    
    // Setup submit task
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            if (!task.submittedFiles || task.submittedFiles.length === 0) {
                alert('Please upload a file before submitting.');
                return;
            }
            
            // Update status task
            task.status = taskType === 'logbook' ? 'completed' : 'submitted';
            task.submittedDate = new Date().toISOString();
            
            // Simpan notes untuk weekly task
            if (taskType === 'weekly') {
                const notesInput = document.getElementById('task-notes');
                if (notesInput) {
                    task.notes = notesInput.value;
                }
            }
            
            // Simpan perubahan
            localStorage.setItem('app_tasks', JSON.stringify(appData.tasks));
            
            // Hitung ulang statistik
            calculateTaskStats();
            
            alert(`${taskType === 'logbook' ? 'Logbook' : 'Task'} submitted successfully!`);
            window.history.back();
        });
    }
    
    // Fungsi untuk menangani upload file
    function handleFileUpload(task, file, type) {
        // Validasi file
        const validTypes = type === 'logbook' 
            ? ['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
            : ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
        
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!validTypes.includes(file.type)) {
            alert(`Please upload a ${type === 'logbook' ? 'PDF, JPG, PNG, or DOCX' : 'PDF or PPT'} file.`);
            return;
        }
        
        if (file.size > maxSize) {
            alert('File size exceeds 10MB limit.');
            return;
        }
        
        // Simpan file (dalam aplikasi nyata, ini akan diupload ke server)
        task.submittedFiles = [file.name];
        
        // Update UI
        if (uploadArea) {
            uploadArea.innerHTML = `
                <i class="ri-checkbox-circle-line" style="color: var(--success); font-size: 40px;"></i>
                <h3>File Uploaded Successfully</h3>
                <p>${file.name}</p>
                <p>Uploaded: ${new Date().toLocaleDateString()}</p>
                <button class="btn btn-outline" id="change-file">Change File</button>
            `;
            
            // Aktifkan tombol submit
            if (submitBtn) {
                submitBtn.disabled = false;
            }
            
            // Setup event listener untuk change file
            const changeFileBtn = document.getElementById('change-file');
            if (changeFileBtn) {
                changeFileBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Reset upload area
                    uploadArea.innerHTML = `
                        <i class="ri-upload-cloud-2-line"></i>
                        <h3>Upload Your Work</h3>
                        <p>Click to upload or drag and drop your file here</p>
                        <p>${type === 'logbook' ? 'PDF, JPG, PNG, DOCX' : 'PDF, PPT'} (Max. 10MB)</p>
                        <input type="file" id="file-input" class="file-input" accept="${type === 'logbook' ? '.pdf,.jpg,.jpeg,.png,.docx' : '.pdf,.ppt,.pptx'}">
                    `;
                    
                    // Setup ulang event listeners
                    const newFileInput = document.getElementById('file-input');
                    if (newFileInput) {
                        uploadArea.addEventListener('click', () => newFileInput.click());
                        newFileInput.addEventListener('change', () => {
                            if (newFileInput.files.length) {
                                handleFileUpload(task, newFileInput.files[0], type);
                            }
                        });
                    }
                    
                    // Nonaktifkan tombol submit
                    if (submitBtn) {
                        submitBtn.disabled = true;
                    }
                });
            }
        }
    }
}

// Render halaman View Tugas
function renderTaskViewPage(container, taskPath) {
    if (!taskPath) {
        container.innerHTML = '<p>Task not found</p>';
        return;
    }
    
    const parts = taskPath.split('/');
    const taskType = parts[0];
    const taskId = parseInt(parts[1]);
    
    let task;
    if (taskType === 'logbook') {
        task = appData.tasks.logbooks.find(t => t.id === taskId);
    } else if (taskType === 'weekly') {
        task = appData.tasks.weeklyTasks.find(t => t.id === taskId);
    }
    
    if (!task) {
        container.innerHTML = '<p>Task not found. Please check the task ID and type.</p>';
        return;
    }
    
    // Tentukan apakah deadline sudah lewat (untuk logbook)
    const isOverdue = taskType === 'logbook' && new Date(task.deadline) < new Date();
    const canEdit = taskType === 'logbook' && !isOverdue;
    
    container.innerHTML = `
        <div class="file-viewer">
            <div class="file-viewer-header">
                <h2>${task.title}</h2>
                <div>
                    ${canEdit ? `<button class="btn btn-outline" id="edit-task">Edit Submission</button>` : ''}
                    <button class="btn btn-outline" onclick="window.history.back()">Back</button>
                </div>
            </div>
            
            <div class="file-preview">
                ${getFilePreview(task.submittedFiles[0])}
            </div>
            
            <div class="file-meta">
                <div class="file-meta-item">
                    <span class="file-meta-label">Submitted Date:</span>
                    <span>${formatDate(task.submittedDate)}</span>
                </div>
                
                ${taskType === 'weekly' && task.notes ? `
                    <div class="file-meta-item">
                        <span class="file-meta-label">Your Notes:</span>
                        <span>${task.notes}</span>
                    </div>
                ` : ''}
                
                ${taskType === 'weekly' && task.grade ? `
                    <div class="file-meta-item">
                        <span class="file-meta-label">Grade:</span>
                        <span class="grade-value">${task.grade}</span>
                    </div>
                ` : ''}
            
                
            </div>
            
            ${taskType === 'weekly' && task.status === 'submitted' && !task.grade ? `
                <div class="review-message">
                    <p>Your submission is being reviewed by the mentor. Feedback will be available soon.</p>
                </div>
            ` : ''}
        </div>
    `;
    
    // Setup event listener untuk edit task (logbook saja)
    if (canEdit) {
        document.getElementById('edit-task').addEventListener('click', function() {
            window.location.hash = `task-detail/${taskType}/${taskId}`;
        });
    }
}

// Helper function untuk preview file
function getFilePreview(filename) {
    if (!filename) return '<p>No file uploaded</p>';
    
    if (filename.endsWith('.pdf')) {
        return `
            <div class="pdf-placeholder">
                <i class="ri-file-pdf-line"></i>
            </div>
            <p>PDF File: ${filename}</p>
            <button class="btn btn-primary" onclick="viewFile('${filename}')">View File</button>
        `;
    } else if (filename.match(/\.(jpg|jpeg|png)$/i)) {
        return `
            <div class="pdf-placeholder">
                <i class="ri-image-line"></i>
            </div>
            <p>Image File: ${filename}</p>
            <button class="btn btn-primary" onclick="viewFile('${filename}')">View File</button>
        `;
    } else if (filename.endsWith('.docx')) {
        return `
            <div class="pdf-placeholder">
                <i class="ri-file-word-line"></i>
            </div>
            <p>Document File: ${filename}</p>
            <button class="btn btn-primary" onclick="viewFile('${filename}')">View File</button>
        `;
    } else if (filename.endsWith('.ppt') || filename.endsWith('.pptx')) {
        return `
            <div class="pdf-placeholder">
                <i class="ri-slideshow-line"></i>
            </div>
            <p>Presentation File: ${filename}</p>
            <button class="btn btn-primary" onclick="viewFile('${filename}')">View File</button>
        `;
    } else {
        return `
            <div class="pdf-placeholder">
                <i class="ri-file-text-line"></i>
            </div>
            <p>File: ${filename}</p>
            <button class="btn btn-primary" onclick="viewFile('${filename}')">View File</button>
        `;
    }
}

// Fungsi untuk melihat file (simulasi)
function viewFile(filename) {
    alert(`In a real application, this would open the file: ${filename}\n\nFor this demo, we're simulating file viewing.`);
    
    // Dalam aplikasi nyata, ini akan membuka file di tab baru atau viewer
    // window.open(`/files/${filename}`, '_blank');
}

// Fungsi untuk mendapatkan minggu saat ini (setiap Senin minggu baru)
function getCurrentWeek() {
    // Untuk demo, kita akan menggunakan tanggal tetap
    // Dalam aplikasi nyata, ini akan menggunakan tanggal saat ini
    const demoDate = new Date('2025-01-20'); // Tanggal demo (Senin)
    
    // Hitung minggu ke berapa berdasarkan tanggal
    const startDate = new Date('2025-01-06'); // Minggu 1 dimulai
    const diffTime = Math.abs(demoDate - startDate);
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    
    return Math.min(diffWeeks, 10); // Maksimal 10 minggu
}

// Fungsi untuk mendapatkan status weekly task
function getWeeklyTaskStatus(task) {
    const currentDate = new Date();
    const deadline = new Date(task.deadline);
    
    // Jika task sudah dikumpulkan
    if (task.status === 'completed' || task.status === 'submitted') {
        if (task.grade) {
            return 'graded';
        } else {
            return 'submitted';
        }
    }
    
    // Jika deadline sudah lewat dan belum dikumpulkan
    if (deadline < currentDate && task.status !== 'completed') {
        return 'overdue';
    }
    
    // Jika task terbuka (tidak terkunci)
    const currentWeek = getCurrentWeek();
    if (task.week <= currentWeek) {
        return 'in-progress';
    }
    
    // Jika task terkunci
    return 'locked';
}

// Fungsi untuk memformat tanggal
function formatDate(dateString) {
    if (!dateString) return 'Not submitted';
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

