const loadNewsCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    displayCategory(data.data.news_category);
    
    // .catch(error => console.log(error));
    
}

const displayCategory = categories =>{

    

    const newsCategory = document.getElementById('news-category');

    categories.forEach(category => {

            console.log(category);

            const categoryDiv = document.createElement('div');
            // mealDiv.classList.add('col');
            categoryDiv.innerHTML = `
            <button class="btn btn-border border-0">${category.category_name}</button>
            `;
    
            newsCategory.appendChild(categoryDiv);
    })

}

loadNewsCategory();