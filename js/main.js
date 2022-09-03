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
        displayNews(data.data)
        newsNumber(data.data.length)
    }
    catch(error){
        console.log(error)
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
    newsNumberFind.appendChild(newsNumberDiv)
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
                            <h6 class="p-3 m-2"><i class="fa-solid fa-eye"> </i> ${data.total_view ? data.total_view : 'no view'}</h6>
                            <div class='p-3 m-2 text-warning'>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half-stroke"></i>
                            </div>

                            <div class="btn btn-danger py-3 px-4 m-2 modal-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="modalId('${data._id}')">
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </div>
        `
        mediaSection.appendChild(newsDiv)
    })
    toogleSpinner(false)
}


const modalId = async (id) => {
    const url = (`https://openapi.programming-hero.com/api/news/${id}`);
    try{
        const response = await fetch(url);
        const data = await response.json();
        modal(data.data);
    }
    catch(error){
        console.log(error)
    }
}

const modal = async (data) => {
    const modalId = document.getElementById('modal-id');
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header flex-column">
                    <h6 class="modal-title d-block" id="exampleModalLabel">Author Name: ${data[0].author.name ? data[0].author.name : 'no name found'}</h6>
                    <p class="modal-title" id="exampleModalLabel">Author Name: ${data[0].author.published_date ? data[0].author.published_date : "no date found"}</p>
                </div>

                <div class="modal-body text-center">
                    <img src="${data[0].author.img}" style="height: 300px; width: 300px">
                    <h6 class="pt-3">View: ${data[0].total_view ? data[0].total_view : 'no data found'}</h6>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
`
    modalId.appendChild(modalDiv)
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


toogleSpinner(true)


categoryClick(01)
loadCategory()
