export default (url, options) =>
  fetch(
    url,
    Object.assign({}, typeof options === 'object' ? options : {}, {
      headers: Object.assign(
        {},
        typeof options === 'object' ? options.headers : {},
        {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      )
    })
  )
