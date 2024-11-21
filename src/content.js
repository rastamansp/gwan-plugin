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
      action: () => logAction("Melhorar escrita", textbox.value),
    },
    {
      label: "Corrigir ortografia e gramática",
      icon: "icons/corrigir.png",
      action: () => logAction("Corrigir ortografia e gramática", textbox.value),
    },
    {
      label: "Traduzir para...",
      icon: "icons/traduzir.png",
      action: () => logAction("Traduzir para...", textbox.value),
    },
    {
      label: "Encurtar",
      icon: "icons/encurtar.png",
      action: () => logAction("Encurtar", textbox.value),
    },
    {
      label: "Alongar",
      icon: "icons/alongar.png",
      action: () => logAction("Alongar", textbox.value),
    },
    {
      label: "Simplificar Linguagem",
      icon: "icons/simplificar.png",
      action: () => logAction("Simplificar Linguagem", textbox.value),
    },
    {
      label: "Mudar Tom",
      icon: "icons/mudar-tom.png",
      action: () => logAction("Mudar Tom", textbox.value),
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
  menuContainer.style.position = "absolute";
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

// Função para registrar as ações no histórico
function logAction(action, text) {
  const logMessage = `Botão selecionado: ${action}\nTexto atual: ${text}`;
  alert(logMessage); // Exibe o log no alert
  console.log(logMessage); // Registra no console

  // Atualiza o histórico no HTML
  const historyDiv = document.getElementById("history");
  const newEntry = document.createElement("p");
  newEntry.textContent = logMessage;
  historyDiv.appendChild(newEntry);
}

// Adiciona evento a todas as caixas de texto
document.querySelectorAll("textarea, input[type='text']").forEach((textbox) => {
  textbox.addEventListener("focus", () => createMenu(textbox));
});
