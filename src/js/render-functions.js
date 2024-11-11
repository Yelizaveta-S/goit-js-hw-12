const drawMarkup = data => {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
    <li class="general-list-item" >
        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}"></a>
        <div>
            <p class="general-list-item-p" ><b>Likes</b><span>${likes}</span></p>
            <p class="general-list-item-p" ><b>Views</b><span>${views}</span></p>
            <p class="general-list-item-p" ><b>Comments</b><span>${comments}</span></p>
            <p class="general-list-item-p" ><b>Downloads</b><span>${downloads}</span></p>
        </div>
    </li>
    `;
      }
    )
    .join('');
};
export default drawMarkup;
