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
    const allCategoryFind = document.getElementById('all-category');
    categorys.forEach( category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('text-center')
        categoryDiv.innerHTML = `
        <div class='category'>
            <div onclick="categoryClick(${category.category_id})" class='btn p-3 fw-semibold' href='#'>${category.category_name}</div>
        </div>`
        allCategoryFind.appendChild(categoryDiv)    
    });
}

const categoryClick = async id => {
    const url = (`https://openapi.programming-hero.com/api/news/category/0${id}`)
    toogleSpinner(true)
    try{
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data.data)
        displayNews(data.data);
        newsNumber(data.data.length);
    }
    catch(error){
        console.log(error);
    }
}

const newsNumber = (data) => {
    const newsNumberFind = document.getElementById('news-number');
    newsNumberFind.innerHTML = ``;
    const newsNumberDiv = document.createElement('div');
    newsNumberDiv.classList.add('p-3', 'my-4', 'border', 'rounded')
    newsNumberDiv.innerHTML = `
    <h3 class='text-center'> ${data} news found.</h3>
    `
    newsNumberFind.appendChild(newsNumberDiv);
}


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
                <div class="col-lg-3 col-sm-12 p-2">
                    <img src="${data.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-lg-9 col-sm-12">
                    <div class="card-body p-4">
                        <h4 class="card-title">${data.title}</h4>
                        <p class="card-text">${data.details.length > 450 ? data.details.slice(0, 450) + " ...." : data.details}</p>
                        <br>
                        <div class="d-lg-flex justify-content-between">
                            <div class="d-inline-flex ">
                                <img class='author-img rounded-pill' src="${data.author.img ? data.author.img : "no image found"}">
                                <div class="ps-2">
                                    <h6 class="fw-bold">${data.author.name ? data.author.name : 'no name found'}</h6>
                                    <p>${data.author.published_date ? data.author.published_date : 'no date found'}</p>
                                </div>
                            </div>
                            <h6 class="p-3 m-2 d-inline"><i class="fa-solid fa-eye"> </i> ${data.total_view ? data.total_view : 'no view'}</h6>
                            <div class='p-3 m-2 text-warning d-inline-flex'>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half-stroke"></i>
                            </div>

                            <button type="button" class="btn btn-danger py-3 px-4 m-2 modal-btn d-inline" data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="modalId('${data._id}')">
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>        

                        </div>
                    </div>
                </div>
            </div>
            </div>
        `
        mediaSection.appendChild(newsDiv);
    })
    toogleSpinner(false);
}


const modalId = async (id) => {
    console.log(id)
    const url = (`https://openapi.programming-hero.com/api/news/${id}`);
    console.log(url)
    try{
        const response = await fetch(url);
        const data = await response.json();
        modal(data.data[0]);
    }
    catch(error){
        console.log(error)
    }
}

const modal = data => {
    console.log(data)
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = `Title: ${data.title}`;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <div class= "text-center">
        <img src='${data.image_url ? data.image_url : "no image found"}' style:"height=400px; width=400px">
    </div>
    <h6 class="m-2">Author Name: ${data.author.name ? data.author.name : 'no name found'}</h6>
    <h6 class="m-2">Total View: ${data.total_view ? data.total_view : 'no data found'}</h6>
    <h6 class="m-2">Rating Number: ${data.rating.number ? data.rating.number : 'no data found'}</h6>
    <h6 class="m-2">Rating Badge: ${data.rating.badge ? data.rating.badge : 'no data found'}</h6>
    <h6 class="m-2">Publish Date: ${data.author.published_date  ? data.author.published_date : 'no data found'}</h6>
`
}

const toogleSpinner = isLoading => {
    const spinner = document.getElementById('spinner')
    if (isLoading){
        spinner.classList.remove('d-none')
    }
    else{
        spinner.classList.add('d-none')
    }
}

categoryClick(01)
loadCategory()
