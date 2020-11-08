
const scrollspy = () => {
  const sections = document.querySelectorAll('[data-scrollspy]')
  const len = sections.length

  const createSectionArray = () => {
    const arr = []
    let i = 0
    for (i; i < len; i++) {
      const h = sections[i].clientHeight
      const obj = { i, h }
      arr.push(obj)
    }
    return arr
  }

  const addTMax = (arr, secArr) => {
    let i = 0
    const len = secArr.length
    for ( i; i < len ; i++) {
      let mx = 0
      let r = 0
      for (r; r<= i; r++) {
        mx+= arr[r].h
      }
      arr[i].tMax = mx
    }
  }

  const addTMin = (arr, secArr) => {
    let i = 0
    const len = secArr.length
    for ( i; i < len ; i++) {
      let mn = 0
      let r = 0
      for (r; r<= i; r++) {
        if (r-1 >= 0) {
          mn = arr[r-1].tMax
        } else {
          mn = 0
        }
      }
      arr[i].tMin = mn
    }
  }


  const idInView = () => {
    const arr = createSectionArray()
    addTMax(arr, sections)
    addTMin(arr, sections)
    const topPos = window.pageYOffset
    let i = 0

    for(i; i < len ; i++) {
      if(topPos <= arr[i].tMax && topPos >= arr[i].tMin ) {
        console.log(i)
        return i
      }
    }
  }

  const addStylingToId = (id) => {
    const activeClass = 'section--active'
    const isActivateds = document.querySelectorAll(`.${activeClass}`)
    isActivateds.forEach(item => {
      item.classList.remove(activeClass)
    })
    sections[id].classList.add(activeClass)
  }

  const init = () => {
    window.addEventListener('scroll', () => {
      let id = idInView()
      addStylingToId(id)
    })
  }
  return {
    init
  }
}
