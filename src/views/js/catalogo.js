// function filterCategoria(categoria) {
//     const produtos = Array.from(document.querySelectorAll('.product-card'));

//     if (categoria === 'todos') {
//         produtos.forEach(produto => {
//             console.log(produto)
//             produto.style.display = 'flex';
//         });
//         return;
//     }

//     produtos.forEach(produto => {
//         produto.querySelector('.card-category').textContent === categoria ? 
//         produto.style.display = 'flex' : 
//         produto.style.display = 'none';
//     });
// }

// document.querySelector('#filtro-todos').addEventListener('click', function(e) {
//     e.target.classList.toggle('active');
//     filterCategoria('todos');
// });

// document.querySelector('#filtro-moveis').addEventListener('click', function(e) {
//     console.log(e.target)
//     e.target.classList.toggle('inactive');
//     e.target.classList.toggle('active');
//     filterCategoria('móveis');
// });

// document.querySelector('#filtro-decoracao').addEventListener('click', function(e) {
//     e.target.classList.toggle('inactive');
//     e.target.classList.toggle('active');
//     filterCategoria('decoração');
// });

// document.querySelector('#filtro-iluminacao').addEventListener('click', function(e) {
//     e.target.classList.toggle('inactive');
//     e.target.classList.toggle('active');
//     filterCategoria('iluminação');
// });

// document.querySelector('#filtro-textil').addEventListener('click', function(e) {
//     e.target.classList.toggle('inactive');
//     e.target.classList.toggle('active');
//     filterCategoria('têxtil');
// });