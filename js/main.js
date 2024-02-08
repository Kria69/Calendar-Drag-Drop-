const screens = document.querySelectorAll('.screen')
const main = document.querySelector('.main')
const plus = document.querySelector('.plus')
const calendar = document.querySelector('.calendar')
const back = document.querySelector('.back')

let hoveredElement = null

const bgColorsMap = {
    one: 'linear-gradient(90deg, #ff85e4 0%, #229efd 179.25%)',
    two: 'linear-gradient(90deg, #209cff 0%, #68e0cf 100%)',
    three: 'linear-gradient(90deg, #84fab0 0%, #8fd3f4 100%)',
}

main.addEventListener('dragover', dragOver)
main.addEventListener('dragenter', dragEnter)
main.addEventListener('dragleave', dragLeave)
main.addEventListener('drop', dragDrop)
main.addEventListener('dragstart', dragStart)
main.addEventListener('dragend', dragEnd)

back.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
    screens[1].classList.remove('hidden')
})

calendar.addEventListener('click', (event) => {
    event.preventDefault()
    screens[1].classList.add('hidden')
    screens[0].classList.remove('up')
})

plus.addEventListener('click', () => {
    const newRow = document.createElement('div')
    newRow.classList.add('row')
    newRow.setAttribute('id', 'ph')
    main.appendChild(newRow)

    const newPHOne = document.createElement('div')
    newPHOne.classList.add('placeholder', 'one')
    newRow.appendChild(newPHOne)
    const newPHTwo = document.createElement('div')
    newPHTwo.classList.add('placeholder', 'two')
    newRow.appendChild(newPHTwo)
    const newPHThree = document.createElement('div')
    newPHThree.classList.add('placeholder', 'three')
    newRow.appendChild(newPHThree)

    const newItem = document.createElement('div')
    newItem.classList.add('item')
    newItem.setAttribute('draggable', 'true')
    newPHOne.appendChild(newItem)

    const deleteSpan = document.createElement('span')
    deleteSpan.classList.add('delete')
    const newImg = document.createElement('img')
    newImg.src = 'img/trash.png'
    deleteSpan.appendChild(newImg)
    deleteSpan.addEventListener('click', function () {
        deleteItem(deleteSpan)
    })
    newItem.appendChild(deleteSpan)

    const textNode = document.createElement('span');
    textNode.classList.add('task');
    textNode.contentEditable = true;
    textNode.textContent = 'Задача';
    newItem.appendChild(textNode);
})

function dragStart(event) {
    if (event.target.classList.contains('item')) {
        event.target.classList.add('hold')
        setTimeout(() => event.target.classList.add('hide'), 0)
    }
}

function dragEnd(event) {
    if (event.target.classList.contains('item')) {
        event.target.className = 'item'
    }
}

function dragOver(event) {
    event.preventDefault()
}

function dragEnter(event) {
    if (event.target.classList.contains('placeholder')) {
        event.target.classList.add('hovered')
        hoveredElement = event.target
        const classes = event.target.classList
        for (const key in bgColorsMap) {
            if (classes.contains(key)) {
                hoveredElement.style.background = bgColorsMap[key]
            }
        }
    }
}

function dragLeave(event) {
    if (event.target.classList.contains('placeholder')) {
        event.target.classList.remove('hovered')
        if (hoveredElement) {
            hoveredElement.style.background = ''
        }
    }
}

function dragDrop(event) {
    if (event.target.classList.contains('placeholder')) {
        event.preventDefault()
        event.target.classList.remove('hovered')

        const elementToAppend = document.querySelector('.item.hold')
        const targetRow = event.target.closest('.row')

        if (elementToAppend && targetRow === elementToAppend.closest('.row')) {
            event.target.appendChild(elementToAppend)
        }

        if (hoveredElement) {
            hoveredElement.style.background = ''
        }
    }
}

main.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        deleteItem(event.target)
    }
})

function deleteItem(deleteIcon) {
    const itemToDelete = deleteIcon.parentNode
    const rowToDelete = itemToDelete.closest('.row')
    rowToDelete.remove()
}