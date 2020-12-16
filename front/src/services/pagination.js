export function getListings() {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        res: res.body,
      })
    }, 1500)
  })
}