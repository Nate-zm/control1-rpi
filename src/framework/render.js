export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend'
};

export function createElement(template) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template.trim();
  return wrapper.firstElementChild;
}

export function render(component, container, place = RenderPosition.BEFOREEND) {
  
  // the component might be exempted with getElement() or already DOM-element
  const element = (typeof component.getElement === 'function') ? component.getElement() : component;
  if (!container) return;
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
    default:
      container.append(element);
      break;
  }
}
