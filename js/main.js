const loadCategory = async () => {
    const url = ('https://openapi.programming-hero.com/api/news/categories');
    try{
        const response = await fetch(url);
        const data = await response.json();
        displayCategory(data.data.news_category);
    }
    catch(error){
        console.log(error);
    }
}

const displayCategory = categorys => {
    console.log(categorys);
    const allCategoryFind = document.getElementById('all-category');
    categorys.forEach( category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <div class='category'>
            <div onclick="categoryClick(${category.category_id})" class='btn p-3 fw-semibold' href='#'>${category.category_name}</div>
        </div>`
        allCategoryFind.appendChild(categoryDiv)
    });
}

const categoryClick = async id => {
    const url = (`https://openapi.programming-hero.com/api/news/category/0${id}`)
    try{
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data.data)
        displayNews(data.data)
    }
    catch(error){
        console.log(error)
    }
}

// const 

const displayNews = datas => {
    const mediaSection = document.getElementById('media-section');
    // console.log(data)
    mediaSection.innerHTML = ``;
    datas.forEach( data => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('container')
        newsDiv.innerHTML = `
        <div class="card m-3 shadow p-3 mb-5 bg-body rounded">
            <div class="row g-0 ">
                <div class="col-3 p-2">
                    <img src="${data.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-9">
                    <div class="card-body p-4">
                        <h4 class="card-title">${data.title}</h4>
                        <p class="card-text">${data.details.length > 450 ? data.details.slice(0, 450) + " ...." : data.details}</p>
                        <br>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex">
                                <img class='author-img rounded-pill' src="${data.author.img ? data.author.img : "no image found"}">
                                <div class="ps-2">
                                    <h6 class="fw-bold">${data.author.name ? data.author.name : 'no name found'}</h6>
                                    <p>${data.author.published_date ? data.author.published_date : 'no date found'}</p>
                                </div>
                            </div>
                            <h6 class="p-3 m-2"><i class="fa-solid fa-eye"></i>${data.total_view}</h6>
                            <h1>name</h1>
                            <h1>name</h1>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        `
        mediaSection.appendChild(newsDiv)
})
}







categoryClick(01)
loadCategory()
