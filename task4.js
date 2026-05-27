let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const searchKeyword = document.getElementById('searchKeyword');

taskForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const name = document.getElementById('taskName').value;
    const description = document.getElementById('taskDesc').value;

    const newTask = {
        id: Date.now().toString(), 
        name: name,
        description: description
    };

    tasks.push(newTask);
    saveToLocalStorage();
    renderTasks(tasks);
    taskForm.reset();
});

const renderTasks = (taskArray) => {
    taskList.innerHTML = '';

    if (taskArray.length === 0) {
        taskList.innerHTML = '<p style="color: #666;">No tasks found.</p>';
        return;
    }

    taskArray.map(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        
        taskItem.innerHTML = `
            <div>
                <strong>${task.name}</strong>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #555;">${task.description}</p>
            </div>
            <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
        `;
        
        taskList.appendChild(taskItem);
    });
};

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage();
    renderTasks(tasks);
};

const filterTasks = () => {
    const keyword = searchKeyword.value.toLowerCase();
    
    const filtered = tasks.filter(task => 
        task.name.toLowerCase().includes(keyword) || 
        task.description.toLowerCase().includes(keyword)
    );
    
    renderTasks(filtered);
};

const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


const getWeather = async () => {
    const city = document.getElementById('cityName').value.trim();
    const weatherDisplay = document.getElementById('weatherDisplay');
    
    if (!city) {
        weatherDisplay.innerHTML = '<p style="color: red;">Please enter a city name first.</p>';
        return;
    }

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true`;

    try {
        weatherDisplay.innerHTML = '<p>Fetching weather...</p>';
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('City or weather data not found');
        }
        
        const data = await response.json();
        
        weatherDisplay.innerHTML = `
            <div class="weather-card">
                <h4>Weather Status</h4>
                <p><strong>Target City Input:</strong> ${city}</p>
                <p><strong>Temperature:</strong> ${data.current_weather.temperature}°C</p>
                <p><strong>Windspeed:</strong> ${data.current_weather.windspeed} km/h</p>
            </div>
        `;
    } catch (error) {
        weatherDisplay.innerHTML = `<p style="color: red;">Error: ${error.message}. Please try again.</p>`;
    }
};

renderTasks(tasks);