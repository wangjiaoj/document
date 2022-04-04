#  dom
[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
## 一、HTMLElemet
HTMLElement.dataset
```html
<div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth>John Doe</div>
```

```javascript
const el = document.querySelector('#user');
// el.id === 'user'
// el.dataset.id === '1234567890'

// set a data attribute
el.dataset.dateOfBirth = '1960-10-03';
```