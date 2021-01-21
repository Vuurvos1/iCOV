// querySelectors
export const q = document.querySelector.bind(document);
export const qa = document.querySelectorAll.bind(document);

export const moveInArray = (input, from, to) => {
  let numberOfDeletedElm = 1;
  const elm = input.splice(from, numberOfDeletedElm);

  numberOfDeletedElm = 0;

  return input.splice(to, numberOfDeletedElm, elm);
};

export const getAtribute = (attributes, value) => {
  if (Array.isArray(attributes)) {
    for (const i of attributes) {
      if (i.Name == value) {
        return i.Value;
      }
    }
  }

  return null;
};

export const convertDate = (date) => {
  // input 'year-month-day'
  const months = [
    'januarie',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'novmeber',
    'december',
  ];
  date = date.split('-');

  return `${parseInt(date[2])} ${months[parseInt(date[1]) - 1]} ${date[0]}`;
};
