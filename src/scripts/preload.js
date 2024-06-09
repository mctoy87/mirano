export const callbackWithPreload =  async function (elem, cb, ...params) {
  const preload = document.createElement('div');
  preload.classList.add('preload');

  elem.append(preload);
  elem.style.position = 'relative';
  preload.style.display = 'flex';

  try {
    const result =  await cb(...params);
    return result;
  } finally {
    preload.style.display = 'none';
    preload.remove();
    elem.style.position = '';
  }
}