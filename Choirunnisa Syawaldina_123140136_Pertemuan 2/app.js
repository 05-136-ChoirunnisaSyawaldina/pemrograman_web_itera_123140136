// PERSONAL DASHBOARD - PINK PURPLE THEME
// JavaScript ES6+

// CLASS 1: Note
class Note {
    constructor(title, content) {
        this.id = Date.now() + Math.random();
        this.title = title;
        this.content = content;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    update(title, content) {
        this.title = title;
        this.content = content;
        this.updatedAt = new Date().toISOString();
    }

    getFormattedDate() {
        return new Date(this.updatedAt).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// CLASS 2: Dashboard
class Dashboard {
    constructor() {
        this.notes = this.loadFromStorage('notes', []);
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderNotes();
        this.updateStats();
        this.startClock();
        this.fetchWeather();
    }

    // ARROW FUNCTION: Load from localStorage
    loadFromStorage = (key, defaultValue) => {
        try {
            const data = JSON.parse(localStorage.getItem(key));
            if (key === 'notes') {
                return data ? data.map(n => Object.assign(new Note(), n)) : defaultValue;
            }
            return data || defaultValue;
        } catch (e) {
            console.error('Error:', e);
            return defaultValue;
        }
    }

    // ARROW FUNCTION: Save to localStorage
    saveToStorage = (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error:', e);
        }
    }

    setupEventListeners() {
        document.getElementById('addNoteBtn').addEventListener('click', () => this.addNote());
        document.getElementById('noteTitle').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('noteContent').focus();
        });
    }

    // ASYNC/AWAIT: Fetch Weather
    async fetchWeather() {
        try {
            const response = await fetch(
                'https://api.open-meteo.com/v1/forecast?latitude=-5.45&longitude=105.27&current_weather=true'
            );
            const data = await response.json();
            
            // DESTRUCTURING
            const { temperature, weathercode } = data.current_weather;
            const weatherEmoji = this.getWeatherEmoji(weathercode);
            
            // TEMPLATE LITERALS
            document.getElementById('weatherInfo').textContent = `${weatherEmoji} ${Math.round(temperature)}°C`;
            document.getElementById('weatherStatus').textContent = 'Live';
            document.getElementById('weatherStatus').classList.remove('loading');
        } catch (error) {
            document.getElementById('weatherInfo').textContent = '🌡️ --°C';
            document.getElementById('weatherStatus').textContent = 'Offline';
            document.getElementById('weatherStatus').classList.remove('loading');
        }
    }

    getWeatherEmoji = (code) => {
        if (code === 0) return '☀️';
        if (code <= 3) return '⛅';
        if (code <= 67) return '🌧️';
        if (code <= 77) return '🌨️';
        if (code <= 82) return '🌦️';
        return '🌤️';
    }

    // ARROW FUNCTION: Clock
    startClock = () => {
        const updateClock = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            });
            const dateStr = now.toLocaleDateString('id-ID', { 
                weekday: 'long', 
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            
            document.getElementById('currentTime').textContent = timeStr;
            document.getElementById('currentDate').textContent = dateStr;
        };
        
        updateClock();
        setInterval(updateClock, 1000);
    }

    addNote() {
        const titleInput = document.getElementById('noteTitle');
        const contentInput = document.getElementById('noteContent');
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (!title || !content) {
            this.showNotification('Please fill in both fields! 📝');
            return;
        }

        const note = new Note(title, content);
        this.notes.push(note);
        this.saveToStorage('notes', this.notes);
        
        titleInput.value = '';
        contentInput.value = '';
        this.renderNotes();
        this.updateStats();
        this.showNotification('Note created! ✨');
    }

    // ARROW FUNCTION: Delete
    deleteNote = (id) => {
        // ARRAY METHOD: filter
        this.notes = this.notes.filter(n => n.id !== id);
        this.saveToStorage('notes', this.notes);
        this.renderNotes();
        this.updateStats();
        this.showNotification('Note deleted! 🗑️');
    }

    // TEMPLATE LITERALS: Render
    renderNotes() {
        const notesList = document.getElementById('notesList');
        
        if (this.notes.length === 0) {
            notesList.innerHTML = `
                <div class="text-center py-12" style="color: rgba(255, 255, 255, 0.5);">
                    <div class="text-6xl mb-4 float">📝</div>
                    <p class="text-lg">No notes yet</p>
                    <p class="text-sm mt-2">Create your first note!</p>
                </div>
            `;
            return;
        }

        // ARRAY METHOD: map & join
        notesList.innerHTML = this.notes.map(note => `
            <div class="note-item note-card">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="note-title flex-1">${note.title}</h3>
                    <button 
                        onclick="dashboard.deleteNote(${note.id})"
                        class="delete-btn"
                    >
                        ×
                    </button>
                </div>
                <p class="note-content">${note.content}</p>
                <div class="note-date">
                    <span>🕒</span>
                    <span>${note.getFormattedDate()}</span>
                </div>
            </div>
        `).join('');
    }

    updateStats = () => {
        document.getElementById('totalNotes').textContent = this.notes.length;
    }

    showNotification = (message) => {
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 glass text-white px-6 py-3 rounded-2xl z-50 fade-in-up';
        toast.style.zIndex = '9999';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
}

// INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard();
    window.dashboard = dashboard;
    
    console.log('💖 Dashboard Ready!');
});