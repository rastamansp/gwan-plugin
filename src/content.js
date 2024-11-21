// Função para criar o menu interativo
function createMenu(textbox) {
  // Remove menus existentes para evitar duplicação
  document
    .querySelectorAll(".custom-text-menu")
    .forEach((menu) => menu.remove());

  // Cria o contêiner do menu
  const menuContainer = document.createElement("div");
  menuContainer.className = "custom-text-menu";

  // Adiciona itens ao menu
  const options = [
    {
      label: "Melhorar escrita",
      icon: "icons/melhorar.png",
      action: () => alert("Melhorar escrita"),
    },
    {
      label: "Corrigir ortografia e gramática",
      icon: "icons/corrigir.png",
      action: () => alert("Corrigir ortografia e gramática"),
    },
    {
      label: "Traduzir para...",
      icon: "icons/traduzir.png",
      action: () => alert("Traduzir para..."),
    },
  ];

  options.forEach((option) => {
    const item = document.createElement("div");
    item.className = "menu-item";
    item.innerHTML = `<img src="${chrome.runtime.getURL(
      option.icon
    )}" alt="" class="menu-icon"> ${option.label}`;
    item.addEventListener("click", option.action);
    menuContainer.appendChild(item);
  });

  // Adiciona o menu ao documento
  document.body.appendChild(menuContainer);

  // Calcula a posição do menu em relação ao campo de texto
  const rect = textbox.getBoundingClientRect();
  menuContainer.style.top = `${rect.bottom + window.scrollY}px`;
  menuContainer.style.left = `${rect.left + window.scrollX}px`;

  // Remove o menu ao clicar fora
  const removeMenu = (event) => {
    if (!menuContainer.contains(event.target) && event.target !== textbox) {
      menuContainer.remove();
      document.removeEventListener("click", removeMenu);
    }
  };
  document.addEventListener("click", removeMenu);
}

// Adiciona evento a todas as caixas de texto
const textboxes = document.querySelectorAll('textarea, input[type="text"]');

textboxes.forEach((textbox) => {
  textbox.addEventListener("focus", () => createMenu(textbox));
});
