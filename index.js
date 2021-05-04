const body = document.querySelector('body');

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
body.append(wrapper);

let xArr = [];
let oArr = [];
let cellsCounter = 0;

function game(wrapper) {

  xArr = [];
  oArr = [];
  cellsCounter = 0;

  if (!wrapper.children.length) {

    for (let i = 0; i < 9; i++) {
      const element = document.createElement('div');
      element.classList.add('element');
      element.setAttribute('id', i);
      wrapper.append(element);
    }

    wrapper.addEventListener('click', (e) => {
      
      if (!e.target.classList.contains('element')) {
        return;
      }

      cellsCounter++;

      if (!xArr.includes(e.target.id) && !oArr.includes(e.target.id)) {
  
        if (xArr.length === oArr.length) {
          xArr.push(e.target.id);
          e.target.classList.add('red');
  
          if (xArr.length > 2) {
            if (isWin(xArr)) {
              winNotification(wrapper, 'Red wins!');
            }
          }
          
        } else {
          oArr.push(e.target.id);
          e.target.classList.add('yellow');
          
          if (oArr.length > 2) {
            if (isWin(oArr)) {
              winNotification(wrapper, 'Yellow wins!');
            }
          }
        }
      }
      if (cellsCounter === 9 && !isWin(xArr) && !isWin(oArr)) {
        winNotification(wrapper, 'Draw!');
      } 
    });
  } else {
    for (let child of wrapper.children) {
      child.classList.remove('red', 'yellow');
    }
  }
}

function isWin(arr) {
  const win = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let condition of win) {
    if (arr.includes(condition[0].toString())
      && arr.includes(condition[1].toString())
      && arr.includes(condition[2].toString())) {
      return true;
    }
  }
}

function winNotification(parent, message) {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.innerText = `${message}`;

  const btnRestart = document.createElement('button');
  btnRestart.classList.add('btn-restart');
  btnRestart.innerText = 'Restart';

  btnRestart.addEventListener('click', (e) => {
    notification.parentNode.removeChild(notification);
    game(wrapper);
  });

  notification.append(btnRestart)
  parent.append(notification);
}

game(wrapper);
