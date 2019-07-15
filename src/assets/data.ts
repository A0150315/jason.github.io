const topList: Topic.Data[] = [
  {
    title: '["1", "2", "3"].map(parseInt)',
    id: 1,
    answer: 14,
    options: [
      {
        id: 11,
        name: '["1", "2", "3"]'
      },
      {
        id: 12,
        name: '[1, 2, 3]'
      },
      {
        id: 13,
        name: '[0, 1, 2]'
      },
      {
        id: 14,
        name: 'other'
      }
    ]
  },
  {
    title: '[typeof null, null instanceof Object]',
    id: 2,
    answer: 21,
    options: [
      {
        id: 21,
        name: '["object", false]'
      },
      {
        id: 22,
        name: '[null, false]'
      },
      {
        id: 23,
        name: '["object", true]'
      },
      {
        id: 24,
        name: 'other'
      }
    ]
  }
]

export default topList
