document.getElementById('loginBtn').addEventListener('click', async function (event) {
    event.preventDefault();  // Предотвращаем переход по ссылке

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to send data');
        }

        const result = await response.json();
        console.log('Server response:', result);
        alert('Login successful');
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed');
    }
});
