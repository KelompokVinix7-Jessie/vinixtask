// Render halaman Home/Dashboard
function renderHomePage(container) {
    const stats = appData.tasks;
    
    container.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon completed">
                    <i class="ri-checkbox-circle-line"></i>
                </div>
                <div class="stat-value">${stats.completed}</div>
                <div class="stat-label">Tasks Completed</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon completed">
                    <i class="ri-book-line"></i>
                </div>
                <div class="stat-value">${stats.logbookCompleted}</div>
                <div class="stat-label">Logbook Completed</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon pending">
                    <i class="ri-time-line"></i>
                </div>
                <div class="stat-value">${stats.pending}</div>
                <div class="stat-label">Pending Tasks</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon overdue">
                    <i class="ri-alarm-warning-line"></i>
                </div>
                <div class="stat-value">${stats.overdue}</div>
                <div class="stat-label">Overdue</div>
            </div>
        </div>
        
        <h2 class="section-title">Upcoming Tasks</h2>
        <div class="tasks-list">
            ${stats.upcoming.map(task => `
                <div class="task-card" data-id="${task.id}" data-type="${task.type === 'Weekly Task' ? 'weekly' : 'logbook'}">
                    <div class="task-info">
                        <h4>${task.type}: ${task.title}</h4>
                        <div class="task-meta">
                            <span><i class="ri-calendar-line"></i> Deadline: ${task.deadline}</span>
                        </div>
                    </div>
                    <div class="task-status status-${task.status}">${task.status === 'open' ? 'Open' : task.status === 'completed' ? 'Completed' : 'Overdue'}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Setup event listener untuk task card
    container.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('click', function() {
            const taskId = this.getAttribute('data-id');
            const taskType = this.getAttribute('data-type');
            window.location.hash = `task-detail/${taskType}/${taskId}`;
        });
    });
}
document.querySelectorAll('.dropdown-item').forEach(item => {
  // visual cepat saat ditekan
  item.addEventListener('mousedown', () => item.classList.add('press'));
  item.addEventListener('mouseup', () => item.classList.remove('press'));
  item.addEventListener('mouseleave', () => item.classList.remove('press'));
  item.addEventListener('touchstart', () => item.classList.add('press'));
  item.addEventListener('touchend', () => item.classList.remove('press'));

  // persistent active setelah klik (pindah ke item yg diklik)
  item.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});
