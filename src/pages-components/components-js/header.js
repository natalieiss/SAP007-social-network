export function componentHeader() {
  const creatingHeader = document.createElement('header');
  creatingHeader.setAttribute('class', 'style-header');
  const templateHeader = `
 
 <img
 src="https://cdn.discordapp.com/attachments/956180620269219871/966046971443966032/eco_work_planet_Logotipo-removebg-preview_1.png"
 alt="logo"
 class="logo"
/>
<h1 class="name-page">Eco Work Planet</h1>
 
  `;
  creatingHeader.innerHTML = templateHeader;

  // const link = document.getElementById('stylePages');
  // link.href = 'pages-components/Styles/header.css';
  return creatingHeader;
}
