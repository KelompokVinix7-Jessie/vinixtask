// Render halaman Task Templates
function renderTemplatesPage(container) {
    const isVIP = appData.user.isVIP;
    
    container.innerHTML = `
        <div class="templates-container">
            <!-- Upgrade Prompt - Tampilkan hanya jika bukan VIP -->
            ${!isVIP ? `
            <div class="upgrade-prompt">
                <div class="upgrade-content">
                    <h2>
                        <i class="ri-vip-crown-line"></i>
                        Unlock Premium Templates
                    </h2>
                    <p>Get access to professionally designed templates that will help you complete your tasks faster and more efficiently.</p>
                </div>
                <button class="btn-premium" id="upgrade-templates-btn">
                    <i class="ri-vip-crown-fill"></i>
                    Upgrade to PRO
                </button>
            </div>
            ` : ''}

            <!-- All Templates in Grid -->
            <div class="templates-grid">
                <!-- Template 1 -->
                <div class="template-card ${isVIP ? '' : 'locked'}">
                    <div class="template-content">
                        <div class="template-icon">
                            <i class="ri-book-line"></i>
                        </div>
                        <h4>Weekly Logbook Template</h4>
                        <p>Standard format for weekly logbook entries with structured sections.</p>
                        ${isVIP ? 
                            `<button class="btn btn-primary download-template-btn full-width-btn">
                                <i class="ri-download-line"></i>
                                Download
                            </button>` :
                            `<button class="btn btn-outline full-width-btn" disabled>
                                <i class="ri-lock-line"></i>
                                Locked
                            </button>`
                        }
                    </div>
                </div>

                <!-- Template 2 -->
                <div class="template-card ${isVIP ? '' : 'locked'}">
                    <div class="template-content">
                        <div class="template-icon">
                            <i class="ri-calendar-todo-line"></i>
                        </div>
                        <h4>Daily Activity Log</h4>
                        <p>Track daily activities and progress with time tracking.</p>
                        ${isVIP ? 
                            `<button class="btn btn-primary download-template-btn full-width-btn">
                                <i class="ri-download-line"></i>
                                Download
                            </button>` :
                            `<button class="btn btn-outline full-width-btn" disabled>
                                <i class="ri-lock-line"></i>
                                Locked
                            </button>`
                        }
                    </div>
                </div>

                <!-- Template 3 -->
                <div class="template-card ${isVIP ? '' : 'locked'}">
                    <div class="template-content">
                        <div class="template-icon">
                            <i class="ri-team-line"></i>
                        </div>
                        <h4>Meeting Notes Template</h4>
                        <p>Document team meetings, decisions, and action items.</p>
                        ${isVIP ? 
                            `<button class="btn btn-primary download-template-btn full-width-btn">
                                <i class="ri-download-line"></i>
                                Download
                            </button>` :
                            `<button class="btn btn-outline full-width-btn" disabled>
                                <i class="ri-lock-line"></i>
                                Locked
                            </button>`
                        }
                    </div>
                </div>

                <!-- Template 4 - Basic (always available) -->
                <div class="template-card">
                    <div class="template-content">
                        <div class="template-icon">
                            <i class="ri-task-line"></i>
                        </div>
                        <h4>Basic Task Template</h4>
                        <p>Simple template for basic weekly tasks and assignments.</p>
                        <button class="btn btn-primary download-template-btn full-width-btn">
                            <i class="ri-download-line"></i>
                            Download
                        </button>
                    </div>
                </div>
                
                <!-- Template 5 -->
                <div class="template-card ${isVIP ? '' : 'locked'}">
                    <div class="template-content">
                        <div class="template-icon">
                            <i class="ri-file-chart-line"></i>
                        </div>
                        <h4>Advanced Report Template</h4>
                        <p>Comprehensive template for detailed project reports.</p>
                        ${isVIP ? 
                            `<button class="btn btn-primary download-template-btn full-width-btn">
                                <i class="ri-download-line"></i>
                                Download
                            </button>` :
                            `<button class="btn btn-outline full-width-btn" disabled>
                                <i class="ri-lock-line"></i>
                                Locked
                            </button>`
                        }
                    </div>
                </div>

                <!-- Template 6 -->
                <div class="template-card ${isVIP ? '' : 'locked'}">
                    <div class="template-content">
                        <div class="template-icon">
                            <i class="ri-presentation-line"></i>
                        </div>
                        <h4>Project Presentation</h4>
                        <p>Professional presentation template for project updates.</p>
                        ${isVIP ? 
                            `<button class="btn btn-primary download-template-btn full-width-btn">
                                <i class="ri-download-line"></i>
                                Download
                            </button>` :
                            `<button class="btn btn-outline full-width-btn" disabled>
                                <i class="ri-lock-line"></i>
                                Locked
                            </button>`
                        }
                    </div>
                </div>

                <!-- Template 7 -->
                <div class="template-card ${isVIP ? '' : 'locked'}">
                    <div class="template-content">
                        <div class="template-icon">
                            <i class="ri-file-list-line"></i>
                        </div>
                        <h4>Progress Report</h4>
                        <p>Template for weekly progress reports and updates.</p>
                        ${isVIP ? 
                            `<button class="btn btn-primary download-template-btn full-width-btn">
                                <i class="ri-download-line"></i>
                                Download
                            </button>` :
                            `<button class="btn btn-outline full-width-btn" disabled>
                                <i class="ri-lock-line"></i>
                                Locked
                            </button>`
                        }
                    </div>
                </div>

                <!-- Template 8 -->
                <div class="template-card ${isVIP ? '' : 'locked'}">
                    <div class="template-content">
                        <div class="template-icon">
                            <i class="ri-time-line"></i>
                        </div>
                        <h4>Time Tracking Sheet</h4>
                        <p>Track time spent on different tasks and projects.</p>
                        ${isVIP ? 
                            `<button class="btn btn-primary download-template-btn full-width-btn">
                                <i class="ri-download-line"></i>
                                Download
                            </button>` :
                            `<button class="btn btn-outline full-width-btn" disabled>
                                <i class="ri-lock-line"></i>
                                Locked
                            </button>`
                        }
                    </div>
                </div>
            </div>

            <!-- Jika user sudah VIP, tampilkan pesan -->
            ${isVIP ? `
            <div class="vip-status-banner">
                <div class="vip-badge-large">
                    <i class="ri-vip-crown-fill"></i>
                    PRO Member
                </div>
                <p>You have access to all premium templates. Thank you for being a PRO member!</p>
            </div>
            ` : ''}
        </div>
    `;
    
    // Event listener untuk tombol upgrade
    const upgradeBtn = document.getElementById('upgrade-templates-btn');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function() {
            window.location.hash = 'upgrade';
        });
    }

    // Event listener untuk tombol "Download Template"
    container.querySelectorAll('.download-template-btn').forEach(button => {
        button.addEventListener('click', function() {
            const templateCard = this.closest('.template-card');
            const templateName = templateCard.querySelector('h4').textContent;
            
            showAlertDialog(
                'Download Started',
                `Downloading "${templateName}" template. Your download will begin shortly.`,
                null,
                'success'
            );
        });
    });
}


