/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const studentDomContainer = document.querySelector('.student-list')
const buttonDomContainer = document.querySelector('.link-list')

let students = data

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
const filterByPage = currentPage => students.filter( (student, index) => index >= 9 * currentPage && index < 9 * (currentPage + 1))

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = students => {

	studentDomContainer.innerHTML = ''

	students.map( student => {

		// Sanity check data before using and provide empty fallback string
		student.picture.thumbnail = student.picture.thumbnail ? student.picture.thumbnail : ''
		student.name.title = student.name.title ? student.name.title : ''
		student.name.first = student.name.first ? student.name.first : ''
		student.name.last = student.name.last ? student.name.last : ''
		student.email = student.email ? student.email : ''
		student.registered.date = student.registered.date ? student.registered.date : ''
	
		const html = document.createElement('li')
	
		html.classList.add('student-item', 'cf')
	
		html.innerHTML = `
			<div class="student-details">
				<img class="avatar" src="${student.picture.thumbnail}" alt="Profile Picture">
				<h3>${student.name.title} ${student.name.first} ${student.name.last}</h3>
				<span class="email">${student.email}</span>
			</div>
				<div class="joined-details">
				<span class="date">${student.registered.date}</span>
			</div>
		`
		studentDomContainer.append(html)

	})
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = total => {

	buttonDomContainer.innerHTML = ''

	if( total > 0 ) {

		for( let i = 0; i < Math.ceil(total / 9); i++) {

			const li = document.createElement('li')
	
			li.innerHTML = `<button type="button">${i + 1}</button>`
	
			buttonDomContainer.append(li)
	
		}
	
		document.querySelectorAll('.link-list button').forEach( item => item.addEventListener('click', e => {
	
			let active = document.querySelector('.link-list button.active').classList.remove('active')
	
			item.classList.add('active')
	
			showPage(filterByPage(parseInt(item.innerText) - 1))
	
		}))
	
		buttonDomContainer.querySelector('li:first-of-type button').classList.add('active')

	}

}

const enableHeaderSearch = () => {

	const getSearchForm = () => {

		const searchForm = document.createElement('label')

		const filterItems = () => {
			
			const search = document.querySelector('#search').value
			
			students = students.filter( student => student.name.first == search || student.name.last == search  )

			showPage(students)
			addPagination(students.length)

		}

		searchForm.classList.add('student-search')

		searchForm.setAttribute('for', 'search')

		searchForm.innerHTML = `
			<label for="search" class="student-search">
				<span>Search by name</span>
				<input id="search" placeholder="Search by name...">
				<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
			</label>`

		searchForm.querySelector('button').addEventListener('click', filterItems)

		document.querySelector('.header').append( searchForm )

	}

	getSearchForm()

}

// Call functions
showPage(filterByPage(0))

addPagination(students.length)

enableHeaderSearch()