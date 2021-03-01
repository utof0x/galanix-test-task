document.querySelector('.send-button').addEventListener('click', () => {
  const userCountry = document.querySelector('.user-input').value;

  fetch(`http://universities.hipolabs.com/search?country=${userCountry}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createTable();

      for (let i = 1; i < data.length; i++) {
        addTableRow(
          i,
          data[i].name,
          data[i].country,
          data[i]['alpha_two_code'],
          data[i]['web_pages'][0],
          data[i]['domains'][0]
        );
      }
    })
    .catch((err) => console.error(err));
});

document.querySelector('.reset-button').addEventListener('click', () => {
  document.querySelector('.user-input').value = '';

  document.querySelector('.table').remove();
});

const createTable = () => {
  const table = document.createElement('div');
  table.className = 'table';
  table.innerHTML = `
    <div class="title">
      <div class="title-id">ID</div>
      <div class="title-name">NAME</div>
      <div class="title-country">COUNTRY / CODE</div>
      <div class="title-web-page">WEB PAGE</div>
      <div class="title-domain">DOMAIN</div>
    </div>
  `;

  document.body.insertAdjacentElement('beforeend', table);
};

const addTableRow = (id, name, country, countryCode, webPage, domain) => {
  const row = document.createElement('div');
  row.className = 'table-row';

  row.insertAdjacentElement('beforeend', createTab('id', id));
  row.insertAdjacentElement('beforeend', createTab('name', name));
  row.insertAdjacentElement(
    'beforeend',
    createTab('country', `${country}/${countryCode}`)
  );
  row.insertAdjacentElement(
    'beforeend',
    createTab('web-page', createLink(webPage))
  );
  row.insertAdjacentElement('beforeend', createTab('domain', domain));

  document.querySelector('.table').insertAdjacentElement('beforeend', row);
};

const createTab = (className, html) => {
  const tab = document.createElement('div');
  tab.className = className;
  tab.innerHTML = html;

  return tab;
};

const createLink = (href) => {
  const link = document.createElement('a');
  link.innerHTML = href;
  link.href = href;

  return link.outerHTML;
};
