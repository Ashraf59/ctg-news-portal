
document.getElementById('loader').style.display = 'none';
// Categories Link Added
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
            <button href="#" class="btn btn-outline-primary ms-3 fs-5" onclick="loadCategoryDetails('${category.category_id}')">${category.category_name}</button>
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
    textField.value = ("Number of news is", + newsFeed.length);

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
        const {name, published_date, img} = author;
        const newsDiv = document.createElement('div')
        
        newsDiv.innerHTML = `
        <div class="col-md-12 col-sm-12 my-4 rounded rounded-2 shadow-lg">
            <div class="d-lg-flex d-md-flex">
                <div>
                    <img src="${image_url}" class="img-fluid rounded-start h-100 m-sm-100" alt="...">
                </div>
                <div class="col-md-8 col-sm-12 ms-2 flex-md-row ">
                    <div class="card-body">
                        <h5 class="card-title mt-3 p-3"> ${title}</h5>
                        <p class="card-text p-3">${details.slice(0, 300) === true ? details.slice(0, 300) : details.slice(0, 301) + " ..."}</p>
                        <div class="d-flex justify-content-around align-items-center mt-5 mb-2">
                            <div class="d-flex "><img src="${img}" class="img-design" alt="...">
                                <p class="p-2">${name ? name : 'no name found'}</p> 
                            </div>
                            <div >${total_view}</div>
                            <div class="me-4"><button class="btn btn-outline-primary"  onclick="loadModal('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">details</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
}

//showing Modal


const loadModal = (authorId) => {
    // console.log(authorId)
    const url = `https://openapi.programming-hero.com/api/news/${authorId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data))
}
const displayModal = authors => {
    const modalBody = document.getElementById('modal-body')
    authors.forEach(authorData => {
        const { details, author } = authorData;
        const { name, img } = author;
        // modalBody.classList.add('card')
        modalBody.innerHTML = `
            <img src="${img}" class="card-img-top modal-design" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name ? name : 'no name found'}</h5>
                <p class="card-text">${details.slice(0, 100)}</p>
            </div>
        `;
    })
}

loadNewsCategory();