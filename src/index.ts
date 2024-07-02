import './styles/style.scss';

function countFavorites() {
  const favoritesBadge = document.getElementById('count-badge')
  if (!favoritesBadge) {
    return
  }
  const storedFavorits = localStorage.getItem(`favorites-count`)
  if (!storedFavorits) {
    favoritesBadge.innerHTML = '0'
    return
  }

  const count = parseInt(storedFavorits)
  favoritesBadge.innerHTML = count.toString()
}


const socket = new WebSocket('ws://localhost:8080');
socket.addEventListener('message', (event) => {
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      const data = JSON.parse(reader.result);
      console.log(data); // { key: 'value' }
    } else {
      console.error('Erro: O resultado não é uma string');
    }
  };
  reader.readAsText(event.data);
  countFavorites();
});

window.onload = () => {
  countFavorites();
}