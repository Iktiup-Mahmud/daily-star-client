const loadCategory = async () => {
    const url = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const response = await url.json();
    loadNewsCategory(response.data.news_category);
}

const loadNewsCategory = categorys => {
    console.log(categorys);
    const allCategoryFind = document.getElementById('all-category');
    categorys.forEach( category => {
        const categoryDiv = document.createElement('div');
        // categoryDiv.classList.add('')
        categoryDiv.innerHTML = `
        <div class='category'>
            <div class='btn p-3 fw-semibold' href='#'>${category.category_name}</div>
        </div>`
        allCategoryFind.appendChild(categoryDiv)
    });
}



loadCategory()
// loadNewsCategory()
