class DateManager {
    constructor() {
        this.currentDate = new Date('2025-11-09');
        this.isInitialized = false;
        this.init();
    }

    init() {
        const savedDate = localStorage.getItem('demoCurrentDate');
        if (savedDate) {
            this.currentDate = new Date(savedDate);
        }
        
        this.updateDisplay();
        this.calculateTaskStatuses();
        
        this.isInitialized = true;
        console.log('📅 Date Manager initialized:', this.formatDateForDisplay(this.currentDate));
    }

    setDate(dateString) {
        const newDate = new Date(dateString);
        if (isNaN(newDate.getTime())) {
            console.error('❌ Invalid date format. Use YYYY-MM-DD');
            return false;
        }

        this.currentDate = newDate;
        this.saveDate();
        this.updateDisplay();
        this.calculateTaskStatuses();
        
        console.log('✅ Date changed to:', this.formatDateForDisplay(this.currentDate));
        return true;
    }

    navigateDays(days) {
        this.currentDate.setDate(this.currentDate.getDate() + days);
        return this.setDate(this.currentDate.toISOString().split('T')[0]);
    }

    resetToToday() {
        return this.setDate(new Date().toISOString().split('T')[0]);
    }

    updateDisplay() {
        const display = document.getElementById('current-date-display');
        if (display) {
            display.textContent = this.formatDateForDisplay(this.currentDate);
        }
    }

    saveDate() {
        localStorage.setItem('demoCurrentDate', this.currentDate.toISOString());
    }

    formatDateForDisplay(date) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        };
        return date.toLocaleDateString('id-ID', options);
    }

    getCurrentDate() {
        return new Date(this.currentDate);
    }

    calculateTaskStatuses() {
        if (!appData || !appData.tasks) return;

        const tasks = appData.tasks;
        const today = this.getCurrentDate();
        
        tasks.logbooks.forEach(logbook => {
            const deadline = new Date(logbook.deadline);
            if (logbook.status !== 'completed') {
                logbook.status = today > deadline ? 'overdue' : 'open';
            }
        });
        
        tasks.weeklyTasks.forEach(task => {
            const deadline = new Date(task.deadline);
            if (task.status !== 'completed') {
                task.status = today > deadline ? 'overdue' : 'open';
            }
        });

        tasks.logbooks.forEach((logbook, index) => {
            logbook.locked = index > 0 && tasks.logbooks[index - 1].status !== 'completed';
        });

        tasks.weeklyTasks.forEach((task, index) => {
            task.locked = index > 0 && tasks.weeklyTasks[index - 1].status !== 'completed';
        });

        if (typeof calculateTaskStats === 'function') {
            calculateTaskStats();
        }
        
        if (appData && appData.isLoggedIn && typeof loadPageFromHash === 'function') {
            loadPageFromHash();
        }
    }

    debug() {
        console.log('=== DATE MANAGER DEBUG ===');
        console.log('Current Date:', this.formatDateForDisplay(this.currentDate));
        console.log('ISO String:', this.currentDate.toISOString());
        console.log('Local Storage:', localStorage.getItem('demoCurrentDate'));
        console.log('Available Methods:');
        console.log('  - dateManager.setDate("YYYY-MM-DD")');
        console.log('  - dateManager.navigateDays(number)');
        console.log('  - dateManager.resetToToday()');
        console.log('  - dateManager.debug()');
        console.log('==========================');
    }
}

// Initialize Date Manager
(function() {
    'use strict';
    window.dateManager = new DateManager();
    if (typeof dateManager === 'undefined') {
        window.dateManager = window.dateManager;
    }
})();