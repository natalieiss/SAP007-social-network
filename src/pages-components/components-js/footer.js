export function componentFooter() {
  const createFooter = document.createElement('p');
  createFooter.setAttribute('class', 'style-footer');

  const link = document.getElementById('stylePages');
  link.href = 'src/pages-componentes/Styles/footer.css';

  const templateFooter = `
  ©Created by
  <a href="https://github.com/KarinaMel0" target="_blank"> Karina Mel</a>
  <a href="https://github.com/Marione-Tainara" target="_blank">
  | Marione Pereira</a
  >
  <a href="https://github.com/natalieiss" target="_blank"
  >|Natalie Silva</a>
  `;
  createFooter.innerHTML = templateFooter;
  return createFooter;
}
