export default function jsx(tag, attributes = {}, ...children) { // переводит jsx формат в js
  attributes = attributes || {}; // защита если не передавали атрибуты
  if (typeof tag === 'function') {
    return tag(attributes, ...children);
  }

  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'class') {
      element.classList.add(...value.trim().split(' '));
    } else if (key.startsWith('on') && key.toLowerCase() in window) {
      element.addEventListener(key.toLowerCase().substring(2),value)
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(element.style, value);
    } else {
      element.setAttribute(key, value);
    }
  });
  
  children.forEach((child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      element.append(document.createTextNode(child.toString()));
    } else if (Array.isArray(child)) {
      child.forEach(innerChild => element.append(innerChild));
    } else {
      element.append(child);
    }
  });
  
  return element;
};
