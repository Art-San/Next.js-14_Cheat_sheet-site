import {
  bigFormError,
  fixErrFitch,
  errorFitch,
  errorPrice,
  fixBigFormError,
  fixErrorPrice,
  fixUserError,
  peculiarityUseState,
  useStateUseEffect,
  userError
} from './data'

export const items = {
  fetch: [
    {
      id: 1,
      teg: 'error',
      title: 'Fitch',
      code: errorFitch,
      desc1: '1. Применялся код в Next.js-14 с TS',
      desc2:
        '2. TypeError: Cannot read properties of undefined (reading title)',
      desc3: '3. <h1>{product.title}</h1>'
    },
    {
      id: 2,
      teg: 'fix',
      title: 'Fitch',
      code: fixErrFitch,
      desc1:
        '1. В product.title и product.description после product ставим "?".',
      desc2:
        '2. const [product, setProduct] = useState() если мы предполагаем что product изначально пустой то использовать undefined не верно, использовать null',
      desc3: '3. Можем добавить State для ЗАГРУЗКИ [loading, setLoading]'
    }
  ],
  price: [
    {
      id: 1,
      teg: 'error',
      title: 'Price',
      code: errorPrice,
      desc1: '1. Увеличение конечной суммы при добавлении товара',
      desc2: '2. С useEffect работает.',
      desc3: ''
    },
    {
      id: 2,
      teg: 'fix',
      title: 'Price',
      code: fixErrorPrice,
      desc1: '1. Убрали лишний хук',
      desc2: '2. Без useEffect работает отлично',
      desc3: ''
    }
  ],
  user: [
    {
      id: 1,
      teg: 'error',
      title: 'User',
      code: userError,
      desc1: '1. Задача в State в поле name добавить значение',
      desc2: '2. Не работает setUser((user.name = e.target.value))',
      desc3: ''
    },
    {
      id: 2,
      teg: 'fix',
      title: 'User',
      code: fixUserError,
      desc1:
        '1. С помощью спред (...) оператора разворачиваем объект, добавляем нужные поля',
      desc2: '',
      desc3: ''
    }
  ],
  form: [
    {
      id: 1,
      teg: 'error',
      title: 'Big Form',
      code: bigFormError,
      desc1: '1. Создаем компонент с множеством полей.',
      desc2: '2. Добавили под каждое поле useState',
      desc3: '3. Получилось не очень'
    },
    {
      id: 1,
      teg: 'fix',
      title: 'Big Form',
      code: fixBigFormError,
      desc1:
        '1. Убрали все useState кроме одного, добавили объект с именами полей.',
      desc2: '2. В input добавили name со значением имя поля из объекта',
      desc3:
        '3. В setData с помощью спред (...) оператора разворачиваем объект, перезаписываем поля '
    }
  ],
  render: [
    {
      id: 1,
      teg: 'fix',
      title: 'Render',
      code: peculiarityUseState,
      desc1: '',
      desc2: '',
      desc3: ''
    }
  ],
  render2: [
    {
      id: 1,
      teg: 'fix',
      title: 'Render2',
      code: useStateUseEffect,
      desc1: '',
      desc2: '',
      desc3: ''
    }
  ]
}
// export const itemsError = {
//   fetch: {
//     id: 1,
//     teg: 'error',
//     title: '',
//     code: errorFitch,
//     desc: '',
//     desc2: ''
//   },
//   price: {
//     id: 1,
//     teg: 'error',
//     title: '',
//     code: errorPrice,
//     desc: '',
//     desc2: ''
//   },
//   user: {
//     id: 1,
//     teg: 'error',
//     title: '',
//     code: userError,
//     desc: '',
//     desc2: ''
//   },
//   form: {
//     id: 1,
//     teg: 'error',
//     title: '',
//     code: bigFormError,
//     desc: '',
//     desc2: ''
//   },
//   render: {
//     id: 1,
//     teg: '',
//     title: '',
//     code: peculiarityUseState,
//     desc: '',
//     desc2: ''
//   },
//   render2: {
//     id: 1,
//     teg: '',
//     title: '',
//     code: useStateUseEffect,
//     desc: '',
//     desc2: ''
//   }
// }

// export const itemsErrorFix = {
//   fetch: {
//     id: 2,
//     teg: 'fix',
//     title: '',
//     code: fixErrFitch,
//     desc: '',
//     desc2: ''
//   },
//   prise: {
//     id: 2,
//     teg: 'fix',
//     title: '',
//     code: fixErrorPrice,
//     desc: '',
//     desc2: ''
//   },
//   user: {
//     id: 2,
//     teg: 'fix',
//     title: '',
//     code: fixUserError,
//     desc: '',
//     desc2: ''
//   },
//   form: {
//     id: 2,
//     teg: 'fix',
//     title: '',
//     code: fixBigFormError,
//     desc: '',
//     desc2: ''
//   }
// }
