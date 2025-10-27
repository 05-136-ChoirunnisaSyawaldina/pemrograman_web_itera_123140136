document.addEventListener('DOMContentLoaded', () => {

    // --- Seleksi Elemen DOM ---
    const taskForm = document.getElementById('task-form');
    const taskIdInput = document.getElementById('task-id');
    const taskNameInput = document.getElementById('task-name');
    const courseNameInput = document.getElementById('course-name');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const submitButton = document.getElementById('submit-button');
    const cancelEditButton = document.getElementById('cancel-edit-button');
    
    const taskList = document.getElementById('task-list');
    const filterStatus = document.getElementById('filter-status');
    const filterCourse = document.getElementById('filter-course');
    
    const totalTasksCount = document.getElementById('total-tasks');
    const incompleteCount = document.getElementById('incomplete-count');
    const completedTasksCount = document.getElementById('completed-tasks');

    // --- State Aplikasi ---
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // --- Fungsi ---

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        const statusFilterValue = filterStatus.value;
        const courseFilterValue = filterCourse.value.toLowerCase();

        const filteredTasks = tasks.filter(task => {
            const matchesStatus = (statusFilterValue === 'all') ||
                (statusFilterValue === 'completed' && task.completed) ||
                (statusFilterValue === 'incomplete' && !task.completed);
            const matchesCourse = task.name.toLowerCase().includes(courseFilterValue) || task.course.toLowerCase().includes(courseFilterValue);
            return matchesStatus && matchesCourse;
        });

        if (tasks.length === 0) {
            taskList.innerHTML = `<div class="text-center py-10 text-gray-500">🎉<br>Hore! Tidak ada tugas. Saatnya bersantai!</div>`;
        } else if (filteredTasks.length === 0) {
            taskList.innerHTML = `<div class="text-center py-10 text-gray-500">🔍<br>Tidak ada tugas yang cocok dengan filter Anda.</div>`;
        } else {
            filteredTasks.forEach(task => {
                const isUrgent = !task.completed && (new Date(task.deadline) - new Date()) / (1000 * 3600 * 24) < 2;
                const borderColor = task.completed ? 'border-green-400' : isUrgent ? 'border-red-400' : 'border-indigo-400';

                const taskItem = document.createElement('div');
                taskItem.className = `task-card bg-white/50 p-4 rounded-lg shadow-sm fade-in ${borderColor}`;
                taskItem.innerHTML = `
                    <div class="flex items-start gap-4">
                        <input type="checkbox" class="checkbox-custom mt-1" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                        <div class="flex-grow ${task.completed ? 'task-completed' : ''}">
                            <p class="font-bold text-gray-800">${task.name}</p>
                            <p class="text-sm text-gray-600">${task.course}</p>
                            <p class="text-xs text-gray-500 mt-1">Deadline: ${task.deadline}</p>
                        </div>
                        <div class="flex flex-col gap-2">
                            <button class="edit-btn text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200" data-id="${task.id}">✏️</button>
                            <button class="delete-btn text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200" data-id="${task.id}">🗑️</button>
                        </div>
                    </div>
                `;
                taskList.appendChild(taskItem);
            });
        }
        updateStatistics();
    };

    const updateStatistics = () => {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const incomplete = total - completed;

        totalTasksCount.textContent = total;
        incompleteCount.textContent = incomplete;
        completedTasksCount.textContent = completed;
    };

    const resetForm = () => {
        taskForm.reset();
        taskIdInput.value = '';
        submitButton.textContent = 'Tambahkan Tugas';
        cancelEditButton.classList.add('hidden');
    };

    // --- Event Listeners ---

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = taskIdInput.value;
        const name = taskNameInput.value.trim();
        const course = courseNameInput.value.trim();
        const deadline = taskDeadlineInput.value;

        if (!name || !course || !deadline) {
            alert('Harap isi semua kolom yang wajib diisi!');
            return;
        }

        if (id) { // Mode Edit
            const task = tasks.find(t => t.id == id);
            task.name = name;
            task.course = course;
            task.deadline = deadline;
        } else { // Mode Tambah
            const newTask = { id: Date.now(), name, course, deadline, completed: false };
            tasks.unshift(newTask); // Tambah ke awal array
        }
        
        saveTasks();
        renderTasks();
        resetForm();
    });

    cancelEditButton.addEventListener('click', resetForm);

    taskList.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        // Toggle Selesai
        if (e.target.matches('.checkbox-custom')) {
            const task = tasks.find(t => t.id == id);
            task.completed = !task.completed;
        }

        // Tombol Hapus
        if (e.target.matches('.delete-btn')) {
            if (confirm('Yakin ingin menghapus tugas ini?')) {
                tasks = tasks.filter(t => t.id != id);
            }
        }

        // Tombol Edit
        if (e.target.matches('.edit-btn')) {
            const task = tasks.find(t => t.id == id);
            taskIdInput.value = task.id;
            taskNameInput.value = task.name;
            courseNameInput.value = task.course;
            taskDeadlineInput.value = task.deadline;
            submitButton.textContent = 'Simpan Perubahan';
            cancelEditButton.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        saveTasks();
        renderTasks();
    });

    filterStatus.addEventListener('change', renderTasks);
    filterCourse.addEventListener('input', renderTasks);

    // --- Inisialisasi Aplikasi ---
    renderTasks();
});