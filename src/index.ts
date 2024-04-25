import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { Api } from './components/base/api';
import { IProductList } from './types';
import { Card } from './components/Card';
import { ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';


const API = new Api(API_URL);
const events = new EventEmitter()
const page = new Page(document.body, events)


const cardCatalogTemplate =ensureElement<HTMLTemplateElement>('#card-catalog');

API.get('/product/').then((data:IProductList) => {
  page.catalog = data.items.map(item => {

  const card = new Card(cardCatalogTemplate, 'card', {onClick: () => {
    events.emit('card:select', item)
  }})
  const cardData = {category: item.category, image: item.image, title: item.title, price: item.price}
  return card.render(cardData)
})}
)

