import { debounce } from "./debounce";

const adjustElementPosition = (elem, count = 0) => {
  const rect = elem.getBoundingClientRect();
  const viewPortWidth = window.innerWidth;

  if (rect.left  < 0) {
    elem.style.left = '0';
    elem.style.right = 'auto';
    elem.style.transform = 'translateX(0)';
  } else if (rect.right  > viewPortWidth) {
    elem.style.left = 'auto';
    elem.style.right = '0';
    elem.style.transform = 'translateX(0)';
  } else {
    elem.style.left = '50%';
    elem.style.right = 'auto';
    elem.style.transform = 'translateX(-50%)';
  }

  const postRect = elem.getBoundingClientRect();

  if ((postRect.left  < 0 || postRect.right  > viewPortWidth) && count < 3) {
    count ++;
    adjustElementPosition(elem, count);
  }
};


export const initChoices = () => {
  const choices = document.querySelectorAll('.choices');

  choices.forEach((choice) => {
    const btn = choice.querySelector('.choices__btn');
    const box = choice.querySelector('.choices__box');
  
    btn.addEventListener('click', () => {
      box.classList.toggle('choices__box_open');
  
      choices.forEach(otherChoice => {
        if (otherChoice !== choice) {
          otherChoice.querySelector('.choices__box')
          .classList.remove('choices__box_open')
        }
      });
  
      adjustElementPosition(box);
    })
  
    window.addEventListener('resize', debounce(() => {
      adjustElementPosition(box);
    }));
  });  
};