// (7)

// atfer document is load
document.addEventListener('DOMContentLoaded', () => {
  // show images count
  outImegesCount();

  // show current count
  outCurrentDate();
});

/**
 * Insert images count on page
 */

const outImegesCount = () => {
  // Count all images
  const imagesCount = document.querySelectorAll('.image').length;

  // Create empty div, set className and innerHtml
  const imagesCountTab = document.createElement('div');
  imagesCountTab.className = 'images-count';
  imagesCountTab.innerHTML = `Количество изображений: ${imagesCount}`;

  // Insert div on page
  document.body.insertAdjacentElement('afterbegin', imagesCountTab);
};

/**
 * Insert current date in format on page
 */

const outCurrentDate = () => {
  const currentDate = new Date();

  // get year, month, etc. also translate manth and day to "human readable" if needed
  const year = currentDate.getFullYear();
  const month =
    currentDate.getMonth() + 1 < 10
      ? '0' + currentDate.getMonth() + 1
      : currentDate.getMonth() + 1;
  const day =
    currentDate.getDate() < 10
      ? '0' + currentDate.getDate()
      : currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Create empty div, set className and innerHtml
  const currentDateTab = document.createElement('div');
  currentDateTab.className = 'current-date';
  currentDateTab.innerHTML = `Текущая дата: ${day}.${month}.${year} ${hours}:${minutes}`;

  // Insert div on page
  document.body.insertAdjacentElement('afterbegin', currentDateTab);
};

// (8)

// on every image
document.querySelectorAll('.image').forEach((image) => {
  // add click listener
  image.addEventListener('click', (e) => {
    // after click open "big image"
    openBigImage(e);
  });
});

/**
 * Insert background, image and close icon on page
 */

const openBigImage = (e) => {
  addBackground();

  addImage(e.target);

  addCloseIcon();
};

/**
 * Insert background on page
 */

const addBackground = () => {
  const background = document.createElement('div');
  background.className = 'background';

  document.body.insertAdjacentElement('beforeend', background);
};

/**
 * @param {node} image Image that was clicked
 * Insert image on page
 */

const addImage = (image) => {
  const bigImage = document.createElement('img');
  bigImage.className = 'big-image';
  bigImage.src = image.src;

  document.body.insertAdjacentElement('beforeend', bigImage);
};

/**
 * Insert close icon on page and add it click listener
 */

const addCloseIcon = () => {
  const closeIcon = document.createElement('img');
  closeIcon.className = 'close-image';
  closeIcon.src = './src/images/icons/close-icon.png';

  document.body.insertAdjacentElement('beforeend', closeIcon);

  closeIcon.addEventListener('click', closeImage);
};

/**
 * Remove background, image and close icon from page and delete click listener
 */

const closeImage = () => {
  const closeIcon = document.querySelector('.close-image');

  document.querySelector('.background').remove();
  document.querySelector('.big-image').remove();
  document.querySelector('.close-image').remove();

  closeIcon.removeEventListener('click', closeImage);
};

// (9)

document.addEventListener('DOMContentLoaded', () => {
  // if user first time on page and localStorage is full clear => return
  if (!getImages()) return;

  // get array from string
  const activeImages = getImages().split(',');

  document.querySelectorAll('.image').forEach((image) => {
    // compress all images on page w/ actives and if any image on page is not active
    if (!activeImages.some((activeImage) => activeImage === image.dataset.id)) {
      // remove it from page
      image.parentNode.remove();
    }
  });
});

document.querySelectorAll('.delete-image').forEach((deleteButton) =>
  deleteButton.addEventListener('click', (e) => {
    // remove images and delete button holder
    e.target.parentNode.remove();

    // create empty array
    const activeImages = [];

    // selct current images on page
    document.querySelectorAll('.image').forEach((image) => {
      // push image id to active images array
      activeImages.push(image.dataset.id);
    });

    // set new active images
    setImages([...activeImages]);
  })
);

document.querySelector('.reset').addEventListener('click', () => {
  // reset active images
  setImages('');

  // reload page to show all images
  location.reload();
  // По поводу этого - это очень плохо, я знаю, и если предположить что картинок не 12, а больше, то очевидно
  // что это очень не эфективно, но я нашел 2 варианта для этого задания, 1-й - добавлять классом "display: none"
  // к холдеру картинки и крестика (в моем случае), но этот вариант плох тем, что "едет" 3 задание по верстке
  // (1-й элемент должен быть красным), и 2 мой - на костылях, было бы неплохо узнать как это сделалаи "гуру"
});

/**
 * @param {array} activeImages Images that
 * Set
 */

const setImages = (activeImages) => {
  localStorage.setItem('activeImages', activeImages);
};

/**
 * @returns {string} String contains user active images
 */

const getImages = () => {
  return localStorage.getItem('activeImages');
};
