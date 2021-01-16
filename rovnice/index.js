document.querySelectorAll('.droptarget').forEach(item => {
  item.addEventListener('dragover', event => {
    event.preventDefault();
  });
  item.addEventListener('dragleave', event => {
    item.classList.remove('hover');
  });
  item.addEventListener('dragenter', event => {
    item.classList.add('hover');
  });
  item.addEventListener('drop', event => {
    event.preventDefault();
    const elemId = event.dataTransfer.getData('text/plain');
    const elem = document.getElementById(elemId);
    item.appendChild(elem);
  });
});

const createDraggableElement = (id) => {
  const el = document.createElement('div');
  el.id = id;
  el.classList.add('draggable');
  el.setAttribute('draggable', 'true');
  el.addEventListener('dragstart', event => {
    document.querySelectorAll('.draggable').forEach(di => {
      if (di !== el) {
        di.style.pointerEvents = 'none';
      }
    });
    event.dataTransfer.setData('text/plain', el.id);
  });
  el.addEventListener('dragend', event => {
    document.querySelectorAll('.draggable').forEach(di => {
      di.style.pointerEvents = 'auto';
    });
  });
  return el;
};

const setEquation = (equation) => {
  const parseSide = (side, left) => {

    const rx = /(?:[\+\-]\s*)?[0-9a-z]+/g;
    const parts = side.match(rx);

    const parent = document.querySelector('.droptarget.' + (left ? 'left' : 'right'));

    parent.querySelectorAll('.draggable').forEach(dr => dr.remove());

    parts.forEach((p, i) => {
      const el = createDraggableElement((left ? 'left' : 'right') + i);
      el.classList.add(((p.startsWith('-')+left) % 2) == 0 ? 'negative' : 'positive');
      el.textContent = p.replace(/[\+\-]/g, '');
      parent.appendChild(el);
    });
  };

  const sides = equation.replace(/\s/g, '').split('=');
  parseSide(sides[0], true);
  parseSide(sides[1], false);
};

document.querySelectorAll('#enter').forEach(item => {
  item.addEventListener('click', event => {
    setEquation(document.getElementById('equation').value);
  });
});

if (location.hash) {
  setEquation(location.hash.replace(/^#/, ''))
} else {
  setEquation('x+20=50');
}
