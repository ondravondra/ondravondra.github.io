document.querySelectorAll('.draggable').forEach(item => {
  item.addEventListener('dragstart', event => {
    document.querySelectorAll('.draggable').forEach(di => {
      if (di !== item) {
        di.style.pointerEvents = 'none';
      }
    });
    event.dataTransfer.setData('text/plain', item.id);
  });
  item.addEventListener('dragend', event => {
    document.querySelectorAll('.draggable').forEach(di => {
      di.style.pointerEvents = 'auto';
    });
  });
});

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
