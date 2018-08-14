'use strict';
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
const galleryItems = [
  {
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
  constructor({ items, parentNode, defaultActiveItem }) {
    this.items = items;
    this.parentNode = parentNode;
    this.defaultActiveItem = defaultActiveItem;
    this.fullviewScreen = null;
    this.previewScreen = null;
    this.previewItem = null;
    this.createGallery();
  }
  createGallery() {    
    this.createrPreviewScreen();
    this.createFullviewScreenDefault();
    this.chooseFullviewImgClick();
    // this.parentNode.classList.add('image-gallery');
  }
  createFullviewScreenDefault() {
    this.fullviewScreen = document.createElement('img');
    const { fullview, alt } = this.items[this.defaultActiveItem];
    this.fullviewScreen.src = fullview;
    this.fullviewScreen.alt = alt;
    this.parentNode.firstElementChild.append(this.fullviewScreen)
  }

  createrPreviewScreen() {
    this.previewScreen = document.createElement('ul');
    this.previewScreen.classList.add('preview');
    this.items.forEach(img => {
      this.previewItem = document.createElement('li');
      const previewImg = document.createElement('img');
      previewImg.src = img.preview;
      previewImg.alt = img.alt;
      previewImg.dataset.fullview = img.fullview;
      this.previewItem.append(previewImg);
      this.previewScreen.append(this.previewItem);
      this.parentNode.append(this.previewScreen);
    });
  }

  chooseFullviewImgClick() {
    this.parentNode = addEventListener('click', this.handleOpenFullviewImg.bind(this));
  }
  handleOpenFullviewImg(event) {
    const target = event.target;
    const nodeName = event.target.nodeName;      
    if (nodeName !== 'IMG') return;
    this.fullviewScreen.src = target.dataset.fullview;
    this.fullviewScreen.alt = target.alt;
    
  }
}

const myGallery = new Gallery({
  items: galleryItems,
  parentNode: document.querySelector('.js-image-gallery'),
  defaultActiveItem: 1,
});
/* Далее плагин работает в автономном режиме */
