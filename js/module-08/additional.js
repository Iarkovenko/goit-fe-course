'use strict'
/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Создайте плагин галлереи используя ES6 класс. Добавьте поля и методы класса так, 
  чтобы можно было создать любое количество галлерей на странице. Функционал плагина 
  аналогичный заданию выше.
  
  При создании экземпляра конструктор получает:
    - items - список элементов для preview
    - parentNode - ссылку на DOM-узел в который будут помещены fullview и preview
    - defaultActiveItem - номер активного элемента preview по умолчанию
    
  Тогда создание экземпляра будет выглядеть следующим образом.
*/
const galleryItems = [{
    preview: 'img/preview-1.jpeg',
    fullview: 'img/fullview-1.jpeg',
    alt: 'alt text 1',
  },
  {
    preview: 'img/preview-2.jpeg',
    fullview: 'img/fullview-2.jpeg',
    alt: 'alt text 2',
  },
  {
    preview: 'img/preview-3.jpeg',
    fullview: 'img/fullview-3.jpeg',
    alt: 'alt text 3',
  },
  {
    preview: 'img/preview-4.jpeg',
    fullview: 'img/fullview-4.jpeg',
    alt: 'alt text 4',
  },
  {
    preview: 'img/preview-5.jpeg',
    fullview: 'img/fullview-5.jpeg',
    alt: 'alt text 5',
  },
  {
    preview: 'img/preview-6.jpeg',
    fullview: 'img/fullview-6.jpeg',
    alt: 'alt text 6',
  },
];

class Gallery {
  constructor({
    items = '',
    parentNode = '',
    defaultActiveItem = ''
  }) {
    this.items = items;
    this.parentNode = parentNode;
    this.defaultActiveItem = defaultActiveItem;
    const fullview = this.parentNode.querySelector('.fullview');
    const imgFullview = document.createElement('img');    
    fullview.append(imgFullview);    
    const preview = this.parentNode.querySelector('.preview');
    preview.addEventListener('click', this.handlerChooseFullImg.bind(this));
    const elementsPreview = [];
    this.items.forEach(item => {
      const itemPreview = document.createElement('li');
      const imgPreview = document.createElement('img');
      imgPreview.src = item.preview;
      imgPreview.dataset.fullview = item.fullview;
      imgPreview.alt = item.alt;
      itemPreview.append(imgPreview);
      elementsPreview.push(itemPreview);
    });
    preview.append(...elementsPreview);
    
    const imgPreviewBar = preview.querySelectorAll('img');
    imgFullview.src = imgPreviewBar[this.defaultActiveItem].dataset.fullview;
  }
  handlerChooseFullImg({target}) {
    if (target.nodeName !== 'IMG') return;
    imgFullview.src = target.dataset.fullview;
    imgFullview.alt = target.alt;
    imgPreviewBar.forEach(img => {
      if (img !== target) {
        img.classList.remove('preview-active');
      } else {
        img.classList.add('preview-active');
      }
    })
  }
}
const myGallery = new Gallery({
  items: galleryItems,
  parentNode: document.querySelector('.image-gallery'),
  defaultActiveItem: 1
});
/* Далее плагин работает в автономном режиме */