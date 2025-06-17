// Cookie helpers
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (encodeURIComponent(value) || "")  + expires + "; path=/";
}
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
    }
    return null;
}

// Main logic
const ft_list = document.getElementById('ft_list');
let todos = [];

function saveTodos() {
    setCookie('todos', JSON.stringify(todos), 365);
}

function loadTodos() {
    const cookie = getCookie('todos');
    if (cookie) {
        try {
            todos = JSON.parse(cookie);
        } catch { todos = []; }
    }
}

function renderTodos() {
    ft_list.innerHTML = '';
    todos.forEach((todo, idx) => {
        const div = document.createElement('div');
        div.className = 'todo';
        div.textContent = todo;
        div.onclick = function() {
            if (confirm('Do you want to remove this TO DO?')) {
                todos.splice(idx, 1);
                saveTodos();
                renderTodos();
            }
        };
        ft_list.appendChild(div);
    });
}

document.getElementById('new-btn').onclick = function() {
    const text = prompt('Enter a new TO DO:');
    if (text && text.trim() !== '') {
        todos.push(text.trim());
        saveTodos();
        renderTodos();
    }
};

// Init
loadTodos();
renderTodos();