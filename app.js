// Seleção dos elementos do DOM para futuramente serem utilizados..
const userList = document.getElementById("user-list"); // lista onde os usuários serão exibidos
const searchName = document.getElementById("search-name"); // campo de busca por nome
const searchCity = document.getElementById("search-city"); // campo de busca por cidade
const loading = document.getElementById("loading"); // indicador de carregamento (...)
const noResults = document.getElementById("no-results"); // mensagem de erro

let users = []; // Variável Let para armazenar os dados dos usuários retornados pela API

// Consumindo API e buscando os usuários
async function fetchUsers() {
    try {
     loading.classList.remove('escondido'); // Exibe o indicador de carregamento
        const response = await fetch("https://jsonplaceholder.typicode.com/users"); // requisição à API
        if (!response.ok) throw new  Error ("Erro ao buscar usuários."); // Verificação se a resposta da API é válida
        users = await response.json(); // Aqui convertemos a resposta em JSON e armazenamos na variável Let users, acima
        displayUsers(users); // Exibe os usários da lista
    } catch (error) {
      alert ("Erro ao carregar usuários: " + error.message); // Alerta de erro caso ocorra ao buscar os usuários
    } finally {
        loading.classList.add("escondido"); // esconde o indicador de carregamento após busca do usuário
    }
}


// Exibição dos usuários da lista
function displayUsers(userListData) {
    userList.innerHTML = ""; // limpa o conteúdo atual da lista, assim evitamos duplicidade.

    if (userListData.length === 0) { // se a lista de usuários estiver vazia :
        noResults.classList.remove('escondido'); // exbie a mensagem que nenhum dado foi encontrado
        return; // interrompe a execução da função
    }

    noResults.classList.add('escondido'); // esconde a mensagem de erro

    //objeto que itera sobre cada usuário e cria um elemento HTML
    userListData.forEach((user) =>{
       const listItem = document.createElement("li"); // Cria um item da lista (html)
       listItem.className = "user-item"; // Aqui deixei uma classe para estilização

       //objeto que cria uma div html utilizando o template string para o nome, e-mail e cidade do usuário!
       listItem.innerHTML = `
               <div>
                 <h2>${user.name}</h2>    
                  <p>${user.email}</p>  
                  <p>${user.address.city}</p>
               </div> 
       `;
       userList.appendChild(listItem); // Adiciona o item na lista de usuários para exibição no HTML
    });
}

// Opção de filtragem dos usuários
function filterUsers() {
    //Obter os valores dos campos de busca
    const nameQuery = searchName.value.toLowerCase();
    const cityQuery = searchCity.value.toLowerCase();

    // filtra os usuários com base nome e cidade
    const filteredUsers = users.filter((user) => {
       const matchesName = user.name.toLowerCase().includes(nameQuery); //verifica se o nome do usuário corresponde à busca
       const matchesCity = user.address.city.toLowerCase().includes(cityQuery); // Verifica se a cidade do usuário corresponde a busca
       return matchesName && matchesCity; // retorna true se ambos critérios acima forem atendidos
    });

    displayUsers(filteredUsers); // exibe os usuários filtrados na lista
}

searchName.addEventListener("input", filterUsers); // adiciona um ouvinte de evento para atualizar a lista quando o nome for alterado
searchCity.addEventListener("input", filterUsers); // faz a mesma coisa que a dde cima, porem quando a cidade for alterada

fetchUsers(); // chama a função principal, para buscar os usuários e carregar o website.