export function componentFooter() {
  const creatingFooter = document.createElement('footer');
  creatingFooter.setAttribute('class', 'style-footer');

  const link = document.getElementById('stylePages');
  link.href = '../pages-components/Styles/footer.css';

  const templateFooter = `

  <p>
    ©Created by
    <a href="https://github.com/KarinaMel0" target="_blank"> Karina Mel</a>
    <a href="https://github.com/Marione-Tainara" target="_blank">
      | Marione Pereira</a
    >
    <a href="https://github.com/natalieiss" target="_blank"
      >|Natalie Silva</a
    >
  </p>

 
  `;
  creatingFooter.innerHTML = templateFooter;
  return creatingFooter;
}
