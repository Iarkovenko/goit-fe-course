/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [{
    img: 'https://placeimg.com/400/150/arch',
    title: 'Post title 1',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    link: 'link-1.com',
  },
  {
    img: 'https://placeimg.com/400/150/nature',
    title: 'Post title 2',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    link: 'link-2.com',
  },
  {
    img: 'https://placeimg.com/400/150/tech',
    title: 'Post title 3',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    link: 'link-3.com',
  },
];

const page = $qs('.posts');

function createPostCard({
  img,
  title,
  text,
  link
}) {

  const itemDom = $cel('div', {className: 'post'})

  const logoType = $cel('img', {className: 'post__image', src: img})

  const titleText = $cel('h2', {className: 'post__title'}, title)

  const content = $cel('p', {className: 'post__text'}, text);

  const linkTo = $cel('a', {className: 'button', href: link}, 'Read More')

  itemDom.append(logoType, titleText, content, linkTo);
  
  return itemDom
}

function createItemsBoadr(arr) {
  return arr.reduce((acc, note) => acc.concat(createPostCard(note)), [])
}
const elements = createItemsBoadr(posts)
page.append(...elements)