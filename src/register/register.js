import '../firebase/firebaseconfig.js';
import { createNewUser } from '../firebase/firebaseauth.js';
import { componentHeader } from '../pages-components/components-js/header.js';
import { componentFooter } from '../pages-components/components-js/footer.js';

export const register = () => {
  const containerRegister = document.createElement('div');
  containerRegister.setAttribute('class', 'container');
  const templateRegister = `
 <div id="content-register">
  
 <section id="registro">
  <h1>Cadastro</h1>
    <div id="error">
      <p id="error-message"></p>
    </div>
    <form class='form-register'>
      <input type='email' name='email' class='email' placeholder='Preencha com o e-mail' autocomplete required />
      <input type='password' name='password' class='password' placeholder='Preencha com a senha' required /><br>
      <button type='submit' id='btn-register'>Cadastrar</button><br>
      <a href='#login'> Já possui conta?</a><br>
      <fieldset id='termsUse'>
        <h1>Termos de uso</h1>
        <div id='paragraph'>
          <p>Seja bem-vindo ao ECO WORK PLANET. Leia com atenção todos os termos abaixo.

          Este documento é oferecido pela ECO WORK PLANET que regulamenta todos os direitos e obrigações com todos que acessam o site, resguardado todos os direitos previstos na legislação, trazem as cláusulas abaixo como requisito para acesso e visita do mesmo.
          
          A permanência no website implica-se automaticamente na leitura e aceitação tácita do presente termos de uso a seguir. Este termo foi atualizado pela última vez em 05 de maio de 2022.
          
          1. DA FUNÇÃO DO SITE
          A ECO WORK PLANET é uma rede social que tem como objetivo trazer visibilidade para ONGs, iniciativas públicas ou privadas ao meio ambiente e permite que todos os usuários amantes do meio ambiente, entusiastas ou simpatizantes compartilhem informações, estilo de vida sustentável dentre outros. A ECO WORK PLANET possui conteúdo informativo de alta qualidade onde é possível o compartilhamento de venda de produtos físicos, digitais e a divulgação de prestação de serviço que envolvam o meio ambiente. A ECO WORK PLANET busca através da criação de conteúdo de alta qualidade e devidamente monitorado, trazer o conhecimento ao alcance de todos.
          
          Nesta plataforma, poderá ser realizado tanto a divulgação de material original de alta qualidade, assim como a divulgação de produtos de e-commerce.
          
          Todo o conteúdo presente neste site deverá ser desenvolvido e compartilhado respeitando-se os requisitos de confiabilidade, assim como deverão ser baseados em estudos sérios e respeitados, através de pesquisa de alto nível.
          
          É possível aos VISITANTES compartilharem conteúdo em tempo integral, não é permitida a prática de SPAM. A ECO WORK PLANET monitora periodicamente o conteúdo postado por seus VISITANTES sendo que qualquer conduta que fuja das boas práticas exigidas o VISITANTES praticante terá sua conta excluída ou banida por tempo determinado ou indeterminado. 
          
          Entende-se por boas práticas:
          Tratar os demais de forma respeitosas sendo impedido o uso de palavras de baixo calão ou ofensivas;
          É proibida a utilização, compartilhamento e distribuição de conteúdo obsceno ou de cunho sexual;
          É proibido a prática de Spams de qualquer natureza;
          
          É de responsabilidade do VISITANTE de usar todas as informações presentes no site com senso crítico, utilizando apenas como fonte de informação e compartilhamento de assuntos voltados ao meio ambiente, e sempre buscando especialistas da área para a solução concreta do seu conflito.
          
          2. DO ACEITE DOS TERMOS
          Este documento, chamado “Termos de Uso”, aplicáveis a todos os VISITANTES do site, foi desenvolvido pela Advogada Natalie Ingrid da Silva Santos (OAB/MG 170.142), que figura junto a Karina Mel e Marione Pereira como co-fundadora do presente site.
          
          Este termo especifica e exige que todo VISITANTE ao acessar o site, leia e compreenda todas as cláusulas do mesmo, visto que o presente Termo de Uso estabelece entre a ECO WORK PLANET e seus VISITANTES, direitos e obrigações entre ambas as partes, sendo imprescindível seu aceite para permanecer navegando no site.
          
          Ao continuar acessando o site, o VISITANTE expressa que aceita e entende todas as cláusulas, assim como concorda integralmente com cada uma delas, sendo este aceite imprescindível para a permanência na mesma. Caso o VISITANTE discorde de alguma cláusula ou termo deste contrato, o mesmo deve imediatamente interromper sua navegação de todas as formas e meios.
          
          Este termo pode e irá ser atualizado periodicamente pela ECO WORK PLANET, que se resguarda no direito de alteração, sem qualquer tipo de aviso prévio e comunicação. É importante que o VISITANTE confira sempre se houve movimentação e qual foi a última atualização do mesmo no começo da página.
          
          3. DO GLOSSÁRIO
          Este termo pode conter algumas palavras específicas que podem não ser de conhecimento geral. Entre elas:
          
          VISITANTE: Todo e qualquer usuário do site, de qualquer forma e meio, que acesse através de computador, notebook, tablet, celular ou quaisquer outros meios, o website ou plataforma da empresa.
          NAVEGAÇÃO: O ato de visitar páginas e conteúdo do website ou plataforma da ECO WORK PLANET.
          COOKIES: Pequenos arquivos de textos gerados automaticamente pelo site e transmitido para o navegador do VISITANTE, que servem para melhorar a usabilidade do VISITANTE.
          LOGIN: Dados de acesso do VISITANTE ao realizar o cadastro junto a EMPRESA, dividido entre usuário e senha, que dá acesso a funções restritas do site.
          HIPERLINKS: São links clicáveis que podem aparecer pelo site ou no conteúdo, que levam para outra página da EMPRESA ou site externo.
          OFFLINE: Quando o site ou plataforma se encontra indisponível, não podendo ser acessado externamente por nenhum usuário.
          Em caso de dúvidas sobre qualquer palavra utilizada neste termo, o VISITANTE deverá entrar em contato com a EMPRESA através dos canais de comunicação encontradas no site.
          
          4. DO ACESSO AO SITE
          O Site e plataforma funcionam normalmente 24 (vinte e quatro) horas por dia, porém podem ocorrer pequenas interrupções de forma temporária para ajustes, manutenção, mudança de servidores, falhas técnicas ou por ordem de força maior, que podem deixar o site indisponível por tempo limitado.
          
          A ECO WORK PLANET não se responsabiliza por nenhuma perda de oportunidade ou prejuízos que esta indisponibilidade temporária possa gerar aos VISITANTES.
          
          Em caso de manutenção que exigirem um tempo maior, a ECO WORK PLANET irá informar previamente aos VISITANTES da necessidade e do tempo previsto em que o site ou plataforma ficará off-line.
          
          O acesso ao site só é permitido a maiores de 18 anos de idade ou que possuírem capacidade civil plena. Para acesso de menores de idade, é necessária a expressa autorização dos pais ou tutores, ficando o mesmo responsáveis sobre qualquer compra ou acesso efetuados pelo mesmo.
          
          Caso seja necessário realizar um cadastro junto a plataforma, onde o VISITANTE deverá preencher um formulário com seus dados e informações, para ter acesso a alguma parte restrita.
          
          Todos os dados estão protegidos conforme a Lei Geral de Proteção de Dados, e ao realizar o cadastro junto ao site, o VISITANTE concorda integralmente com a coleta de dados conforme a Lei e com a Política de Privacidade da ECO WORK PLANET.
          
          5. DA LICENÇA DE USO E CÓPIA
          O VISITANTE poderá acessar todo o conteúdo do website, como artigos, vídeos, imagens, produtos e serviços, não significando nenhum tipo de cessão de direito ou permissão de uso, ou de cópia do mesmo.
          
          Todos os direitos são preservados, conforme a legislação brasileira, principalmente na Lei de Direitos Autorais (regulamentada na Lei nº 9.610/18), assim como no Código Civil brasileiro (regulamentada na Lei nº 10.406/02), ou quaisquer outras legislações aplicáveis.
          
          Todo o conteúdo do site é protegido por direitos autorais, e seu uso, cópia, transmissão, venda, cessão ou revenda, deve seguir a lei brasileira, tendo a EMPRESA todos os seus direitos reservados e não permitindo a cópia ou utilização de nenhuma forma e meio, sem autorização expressa e por escrita da mesma.
          
          A EMPRESA poderá em casos concretos permitir pontualmente exceções a este direito, que serão claramente destacados no mesmo, com a forma e permissão de uso do conteúdo protegido. Este direito é revogável e limitado as especificações de cada caso.
          
          6. DAS OBRIGAÇÕES
          O VISITANTE ao utilizar o website da EMPRESA, concorda integralmente em:
          
          De nenhuma forma ou meio realizar qualquer tipo de ação que tente invadir, hacker, destruir ou prejudicar a estrutura do site, plataforma da ECO WORK PLANET ou de seus parceiros comerciais. Incluindo-se, mas não se limitando, ao envio de vírus de computador, de ataques de DDOS, de acesso indevido por falhas da mesma ou quaisquer outras forma e meio.
          De não realizar divulgação indevida nos comentários do site de conteúdo de SPAM, empresas concorrentes, vírus, conteúdo que não possua direitos autorais ou quaisquer outros que não seja pertinente a discussão daquele texto, vídeo ou imagem.
          Da proibição em reproduzir qualquer conteúdo do site ou plataforma sem autorização expressa, podendo responder civil e criminalmente pelo mesmo.
          Com a Política de Privacidade do site, assim como tratamos os dados referentes ao cadastro e visita no site, podendo a qualquer momento e forma, requerer a exclusão dos mesmos, através do formulário de contato.
          7. DA MONETIZAÇÃO E PUBLICIDADE
          A ECO WORK PLANET pode alugar ou vender espaços publicitários na plataforma, ou no site, diretamente aos anunciantes, ou através de empresas especializadas.
          
          Essas publicidades não significam nenhuma forma de endosso ou responsabilidade pelos mesmos, ficando o VISITANTE responsável pelas compras, visitas, acessos ou quaisquer ações referentes as estas empresas.
          
          Todas as propagandas no site ou plataforma serão claramente destacadas como publicidade, como forma de disclaimer da ECO WORK PLANET e de conhecimento do VISITANTE.
          
          Em casos de compra de produtos ou serviços, será possível a devolução em até 07 (sete) dias, conforme o Código de Defesa do Consumidor.
          









          
          Estes anúncios podem ser selecionados pela empresa de publicidade automaticamente, conforme as visitas recentes do VISITANTE, assim como baseado no seu histórico de busca, conforme as políticas de acesso da plataforma.
          
          8. DOS TERMOS GERAIS
          O Site irá apresentar hiperlinks durante toda a sua navegação, que podem levar diretamente para outra página da ECO WORK PLANET ou para sites externos.
          
          Apesar da EMPRESA apenas criar links para sites externos de extrema confiança, caso o usuário acesse um site externo, a ECO WORK PLANET não tem nenhuma responsabilidade pelo meio, sendo uma mera indicação de complementação de conteúdo, ficando o mesmo responsável pelo acesso, assim como sobre quaisquer ações que venham a realizar neste site.
          
          Em caso que ocorra eventuais conflitos judiciais entre a ECO WORK PLANET e a EMPRESA, o foro elegido para a devida ação será o da comarca da ECO WORK PLANET, mesmo que haja outro mais privilegiado.
          
          Este Termo de uso é valido a partir de 10 de maio de 2022.
          </p>
        </div>
        <label value=''>Concordo com os
          termos de uso</label>
        <input id='check' type='checkbox' name='checkbox' />
      </fieldset>
    </form>
  </section>
  </div>
 `;
  containerRegister.appendChild(componentHeader());

  containerRegister.innerHTML += templateRegister;

  containerRegister.appendChild(componentFooter());

  const email = containerRegister.querySelector('.email');
  const password = containerRegister.querySelector('.password');
  const checkbox = containerRegister.querySelector('#check');

  containerRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    if (checkbox.checked) {
      createNewUser(email.value, password.value)
        .then(() => {
          window.location.hash = '#timeline';
        })
        .catch((error) => {
          const Termos = containerRegister.querySelector('#error-message');
          const errorCode = error.code;
          switch (errorCode) {
            case 'auth/weak-password':
              Termos.innerHTML = 'Senha com menos de 6 Digitos';

              break;
            case 'auth/email-already-in-use':
              Termos.innerHTML = 'E-mail em uso';

              break;
            default:
          }
        });
    } else {
      const Termos = containerRegister.querySelector('#error-message');
      Termos.innerHTML = 'Aceite os termos de uso';
    }
  });
  return containerRegister;
};
