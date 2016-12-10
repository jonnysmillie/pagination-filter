// Get relevant HTML elements and store as constants
const $page = document.querySelector('.page')
const $pageHeader = $page.querySelector('.page-header')
const $studentsList = document.getElementById('student-list')

// Helper functions to show or hide
function show(el) {
    el.style.display = 'block'
}

function hide(el) {
    el.style.display = 'none'
}

// Displays all student list items between minInclusiveInt and maxInclusiveInt
// Hides all others
function filterStudentsHTML(minInclusiveInt, maxInclusiveInt) {
    const $studentsListItems = $studentsList.children

    minInclusiveInt = minInclusiveInt || 0
    maxInclusiveInt = maxInclusiveInt || $studentsListItems.length

    for (var i = 0; i < $studentsListItems.length; i++) {
        const $li = $studentsListItems.item(i)
        if (i < minInclusiveInt) {
            hide($li)
        } else if (i >= maxInclusiveInt) {
            hide($li)
        } else {
            show($li)
        }
    }
}

function onPaginationItemClick(event) {
    event.preventDefault()

    const pageNumber = parseInt(event.target.textContent)
    filterStudentsHTML((pageNumber * 10) - 10, pageNumber * 10)
}

function onSearchSubmit(event) {
    const $input = document.getElementById('searchInput')
    const query = $input.value

    $input.value = ''

    if (query === '') {
        return false
    }

    $studentsList.children.forEach(function ($li) {
        const name = $li.querySelector('h3').textContent

        if (name.includes(query)) {
            show($li)
        } else {
            hide($li)
        }
    })
}

// Deal with HTMLCollections like Arrays
HTMLCollection.prototype.forEach = Array.prototype.forEach

function buildSearchHTML() {
    const $container = document.createElement('div')
    const $input = document.createElement('input')
    const $btn = document.createElement('button')

    $container.className = 'student-search'
    $input.id = 'searchInput'
    $input.setAttribute('placeholder', 'Search for students...')
    $btn.id = 'searchButton'
    $btn.textContent = 'Search'

    $btn.addEventListener('click', onSearchSubmit, false)

    $container.appendChild($input)
    $container.appendChild($btn)

    return $container
}

function buildPaginationHTML(pageCount) {
    const $container = document.createElement('div')
    const $ul = document.createElement('ul')

    for (var i = 0; i < pageCount; i++) {
        const $li = document.createElement('li')
        const $a = document.createElement('a')

        $a.className = 'pageNumbers'
        $a.href = '#'
        $a.textContent = i + 1

        $li.appendChild($a)
        $ul.appendChild($li)

        $li.addEventListener('click', onPaginationItemClick, false)
    }

    $container.className = 'pagination'

    $container.appendChild($ul)
    return $container
}

// Add the search-bar HTML
$pageHeader.appendChild(buildSearchHTML());

// Add the pagination to HTML
$page.appendChild(buildPaginationHTML(5));

// Hide all student list-items but the first 10
for (var i = 10; i < $studentsList.children.length; i++) {
    hide($studentsList.children.item(i))
}