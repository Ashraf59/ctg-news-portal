
document.getElementById('loader').style.display = 'none'
const loadNewsCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
}

const displayCategory = categories =>{
    const newsCategory = document.getElementById('news-category');
    categories.forEach(category => {
            // console.log(category);
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `
            <button href="#" class="btn btn-outline-primary" onclick="loadCategoryDetails('${category.category_id}')">${category.category_name}</button>
        `;

            newsCategory.appendChild(categoryDiv)
    });
}


const loadCategoryDetails = async(category_id) => {
    document.getElementById('loader').style.display = 'block';
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const response = await fetch(url);
    const data = await response.json();
    displayNewsFeed(data.data);
}

const displayNewsFeed = newsFeed => {
    // console.log(newsFeed)
    document.getElementById('loader').style.display = 'none'
    const textField = document.getElementById('text-field')

    if (newsFeed.length != 0) {
        textField.innerHTML = `
        <p>${newsFeed.length} Number of news</p>
        `;

    }
    else {
        textField.innerText = 'There is No news'

    }

    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = "";
    newsFeed.forEach(news => {
        // console.log(news)
        const { title, details, total_view, thumbnail_url, image_url, author, _id } = news;
        const newsDiv = document.createElement('div')
        //newsDiv.classList.add('imgs')
        newsDiv.innerHTML = `
        <div class="d-flex my-4 shadow p-3 mb-5 bg-body rounded">
            <div class="col-md-4">
            <img src="${image_url}" class="img-fluid rounded-start h-100" alt="...">
            </div>
            <div class="col-md-8 ms-3">
                <div class="card-body">
                    <h5 class="card-title mt-3 mb-2"> ${title}</h5>
                    <p class="card-text text-justify">${details.slice(0, 300) === true ? details.slice(0, 300) : details.slice(0, 301) + " ..."}</p>
                    <div class="d-flex justify-content-around  mt-5">
                        <div><img src="${thumbnail_url}" class="img-fluid w-25 h-25 rounded-circle" alt="..."> </div>
                        <div>${total_view ? total_view : 'No views'}</div>
                        <div class="me-4"><button class="btn btn-outline-primary"  onclick="loadModalDetails('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">details</button></div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
}

//showing Modal


const loadModalDetails = (authorBioId) => {
    // console.log(authorId)
    const url =  `https://openapi.programming-hero.com/api/news/${authorBioId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data))
}
const displayModal = authorsBio => {
    const modalDetail = document.getElementById('modal-detail')
    authorsBio.forEach(authorData => {
        const { details, author } = authorData;
        const { name, img } = author;
        // modalBody.classList.add('card')
        modalDetail.innerHTML = `
            <img src="${img}" class="card-img-top modal-design" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name ? name : 'no name found'}</h5>
                <p class="card-text">${details.slice(0, 100)}</p>
            </div>
        `;
    })
}
// loadNewsDetails();

loadNewsCategory();