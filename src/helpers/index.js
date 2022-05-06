const getPaginatorParams = (page, size) => {
  const limit = size ? +size : 50
  const offset = page ? (+page-1)*limit : 0
  return { limit, offset }
}

const getPaginatorData = (data, page, limit) => {
  const { count, rows } = data
  const currentPage = page ? +page : 1
  const totalPages = Math.ceil(count / limit)
  return {
    count,
    rows,
    totalPages,
    currentPage
  }
}

module.exports = {
  getPaginatorParams,
  getPaginatorData
}