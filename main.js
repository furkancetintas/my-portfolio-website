let navItems = document.querySelectorAll('.nav-link');
let cardContainer = document.querySelector('.card-container');
let theme = document.getElementById('theme');

document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 200) {
      document.getElementById('navbar_top').classList.add('fixed-top');
      // add padding top to show content behind navbar
      navbar_height = document.querySelector('.navbar').offsetHeight;
      document.body.style.paddingTop = navbar_height + 'px';
    } else {
      document.getElementById('navbar_top').classList.remove('fixed-top');
      // remove padding top from body
      document.body.style.paddingTop = '0';
    }
  });
});

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navItems.forEach((activeItem) => {
      activeItem.classList.remove('active');
    });
    item.classList.add('active');
  });
});

{
  /* 
  <div class="card">
    <div class="card-body">
      
      <div class="repo-info">
        !<span>06.04.2001</span>
        <p class="mb-0">
          <span> <i class="bx bx-star"></i> 2 </span>
          <span> <i class="bx bx-show"></i> 2 </span>
        </p>
      </div>
    </div>
  </div> */
}

fetch('https://api.github.com/users/furkancetintas/repos')
  .then((result) => result.json())
  .then((datas) =>
    datas.map((data) => {
      if (!data.private) {
        let card = document.createElement('div');
        card.classList.add('card', 'col-md-6', 'mx-1', 'my-1');
        let cardBody = document.createElement('div');
        let cardTitle = document.createElement('div');
        let cardTitleH6 = document.createElement('h6');
        let projectLink = document.createElement('a');
        let projectLinkIcon = document.createElement('i');
        let cardDescription = document.createElement('h6');
        let cardRepoInfo = document.createElement('div');

        let cardRepoInfoP = document.createElement('p');
        let cardRepoInfoStarIcon = document.createElement('i');
        let cardRepoInfoShowIcon = document.createElement('i');
        let cardRepoInfoForkIcon = document.createElement('i');

        let cardRepoInfoStarSpan = document.createElement('span');
        let cardRepoInfoShowSpan = document.createElement('span');
        let cardRepoInfoForkSpan = document.createElement('span');
        cardRepoInfoStarIcon.classList.add('bx', 'bx-star');
        cardRepoInfoShowIcon.classList.add('bx', 'bx-show');
        cardRepoInfoForkIcon.classList.add('bx', 'bx-git-repo-forked');

        projectLink.setAttribute('href', `${data.html_url}`);
        projectLinkIcon.classList.add('bx', 'bx-link-external');
        cardDescription.classList.add('card-description');
        cardRepoInfo.classList.add('repo-info');
        cardBody.classList.add('card-body');
        cardTitle.classList.add('card-title');
        cardTitleH6.classList.add('card-title-h6');
        cardRepoInfoP.classList.add('mb-0');
        projectLink.appendChild(projectLinkIcon);
        cardTitle.appendChild(cardTitleH6);
        cardTitle.appendChild(projectLink);

        cardRepoInfoP.appendChild(cardRepoInfoStarSpan);
        cardRepoInfoP.appendChild(cardRepoInfoShowSpan);
        cardRepoInfoP.appendChild(cardRepoInfoForkSpan);

        cardRepoInfo.appendChild(cardRepoInfoP);

        cardTitleH6.innerHTML += data.name;

        cardDescription;
        cardDescription.innerHTML += data.description;
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardDescription);
        cardBody.appendChild(cardRepoInfo);

        cardRepoInfoStarSpan.appendChild(cardRepoInfoStarIcon);
        cardRepoInfoShowSpan.appendChild(cardRepoInfoShowIcon);
        cardRepoInfoForkSpan.appendChild(cardRepoInfoForkIcon);

        cardRepoInfoStarIcon.parentElement.innerHTML += data.stargazers_count;
        cardRepoInfoShowIcon.parentElement.innerHTML += data.watchers_count;
        cardRepoInfoForkIcon.parentElement.innerHTML += data.forks_count;

        card.appendChild(cardBody);
        cardContainer.appendChild(card);
        console.log(data);
      }
    })
  )
  .catch((err) => {
    console.log('API Hatalı: ' + err.message);
  });

//! CHANGE THEMA !

theme.onclick = () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList);
  if (localStorage.getItem('theme') != '') {
    document.body.classList.add(localStorage.getItem('theme'));
    theme.innerHTML = '<i class="bx bxs-moon"></i>';
  } else {
    theme.innerHTML = '<i class="bx bxs-sun"></i>';
  }
};
if (localStorage.getItem('theme') != '') {
  document.body.classList.add(localStorage.getItem('theme'));
}
console.log(window.location);

window.addEventListener('hashchange', () => {
  history.pushState('', document.title, window.location.pathname);
});
