export function componentFooter() {
  const createFooter = document.createElement('footer');
  createFooter.setAttribute('class', 'style-footer');
  const templateFooter = ` 

  <p class='authors'>©Created by</p>
  <a class='authors'href='https://github.com/KarinaMel0' target='_blank'> Karina |</a>
  <a class='authors' href='https://github.com/Marione-Tainara' target='_blank'>
 Marione |</a>
  <a class='authors'href='https://github.com/natalieiss' target='_blank'>  Natalie </a>
  `;
  createFooter.innerHTML = templateFooter;
  return createFooter;
}
