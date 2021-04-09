const body = document.querySelector('body');

function game(parent) {

  parent.innerHTML = '';

  const xArr = [];
  const oArr = [];

  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  body.append(wrapper);

  for (let i = 0; i < 9; i++) {
    const element = document.createElement('div');
    element.classList.add('element');
    element.setAttribute('id', i);
    wrapper.append(element);
  }

  wrapper.addEventListener('click', (e) => {

    if (e.target === wrapper) {
      return;
    }

    if (!xArr.includes(e.target.id) && !oArr.includes(e.target.id)) {

      if (xArr.length === oArr.length) {
        xArr.push(e.target.id);
        e.target.classList.add('red');

        if (isWin(xArr)) {
          winNotification(wrapper, 'Red');
        }

      } else {
        oArr.push(e.target.id);
        e.target.classList.add('yellow');

        if (isWin(oArr)) {
          winNotification(wrapper, 'Yellow');
        }

      }
    }
  });
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

function winNotification(parent, winner) {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.innerText = `${winner} wins!`;

  const btnRestart = document.createElement('button');
  btnRestart.classList.add('btn-restart');
  btnRestart.innerText = 'Restart';

  btnRestart.addEventListener('click', () => {
    game(body);
  });

  notification.append(btnRestart)
  parent.append(notification);
}

game(body);
