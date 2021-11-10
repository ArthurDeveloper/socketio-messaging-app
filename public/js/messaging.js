let socket = io();

const room_name = document.title.toLowerCase();
const username = document.querySelector('#username').textContent.trim();
socket.emit('enterInRoom', {
    room_name: room_name
});

function sendMessage() {
    const message = document.querySelector('#message-input').value;
    if (message.trim() !== '') { 
        socket.emit('sendMessage', {
            content: message,
            room: room_name,
            author: username
        });
    }
}

function clearMessageInput() {
    document.querySelector('#message-input').value = '';
}

document.querySelector('#send-message-btn').addEventListener('click', () => {
    sendMessage();
    clearMessageInput();
});

document.querySelector('#message-input').addEventListener('keyup', (evt) => {
    if (evt.key == 'Enter') {
        sendMessage();
        clearMessageInput();
    }
});

socket.on('sendMessage', ({ content, author }) => {
    const messageContainer = document.createElement('div');

    const message = document.createElement('div');
    message.classList.add('message');
    message.style.alignSelf = author === username ? 'flex-start' : 'flex-end';
    message.style.backgroundColor = author === username ? '#cccccc' : '#0099ff';
    message.textContent = content;
    
    const messageAuthor = document.createElement('span');
    messageAuthor.style.alignSelf = author === username ? 'flex-start' : 'flex-end';
    messageAuthor.textContent = author === username ? 'You' : author;
    messageAuthor.classList.add('message-author');
    messageAuthor.classList.add('text-secondary');

    messageContainer.appendChild(message);
    messageContainer.appendChild(messageAuthor);
    messageContainer.classList.add('message-container');
    
    document.querySelector('#messages-box').appendChild(messageContainer);
});