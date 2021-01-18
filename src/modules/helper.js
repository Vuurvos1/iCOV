// querySelectors
export const q = document.querySelector.bind(document);
export const qa = document.querySelectorAll.bind(document);

export const getStyle = (el, styleProp) => {
  // const x = document.getElementById(el);
  console.log(el);

  const x = el;
  let y;

  if (window.getComputedStyle) {
    y = document.defaultView
      .getComputedStyle(x, null)
      .getPropertyValue(styleProp);
  } else if (x.currentStyle) {
    y = x.currentStyle[styleProp];
  }

  return y;
};

export const moveInArray = (input, from, to) => {
  let numberOfDeletedElm = 1;

  const elm = input.splice(from, numberOfDeletedElm);
  console.log(elm);

  numberOfDeletedElm = 0;

  return input.splice(to, numberOfDeletedElm, elm);
};

export const getAtribute = (attributes, value) => {
  for (const i of attributes) {
    if (i.Name == value) {
      return i.Value;
    }
  }

  return null;
};
