// =======================
// 🔐 SISTEMA DE CÓDIGOS
// =======================

let codigosValidos = {
  "VIP123": { ativo: true, expira: "2026-04-30" },
  "CLIENTE456": { ativo: true, expira: "2026-05-05" },
  "VIP557": { ativo: true, expira: "2026-05-05" },
  "VIP222": { ativo: true, expira: "2026-05-05" },
  "VIP111": { ativo: true, expira: "2026-05-06" },
  "VIP112": { ativo: true, expira: "2026-05-06" },
  "VIP113": { ativo: true, expira: "2026-05-06" },
  "VIP114": { ativo: true, expira: "2026-05-06" },
  "VIP115": { ativo: true, expira: "2026-05-06" },
  "VIP116": { ativo: true, expira: "2026-05-06" },
  "VIP117": { ativo: true, expira: "2026-05-06" },
  "VIP118": { ativo: true, expira: "2026-05-06" },
  "VIP119": { ativo: true, expira: "2026-05-06" },
  "VIP120": { ativo: true, expira: "2026-05-06" },
  "VIP121": { ativo: true, expira: "2026-05-06" },
  "VIP122": { ativo: true, expira: "2026-05-06" },
  "VIP124": { ativo: true, expira: "2026-05-06" },
  "VIP125": { ativo: true, expira: "2026-05-06" },
};

// =======================
// CÓDIGO
// =======================

function pedirCodigo() {
  let code = prompt("Digite seu código de acesso:");

  if (!code) {
    pedirCodigo();
    return;
  }

  validarCodigo(code);
}

function validarCodigo(code) {
  let hoje = new Date();

  if (codigosValidos[code]) {
    let dataExpira = new Date(codigosValidos[code].expira);

    if (!codigosValidos[code].ativo) {
      alert("Código desativado!");
      pedirCodigo();
      return;
    }

    if (hoje > dataExpira) {
      alert("Código expirado!");
      pedirCodigo();
      return;
    }

    localStorage.setItem("ativo", "true");
    mostrarToast("Acesso liberado!");
  } else {
    alert("Código inválido!");
    pedirCodigo();
  }
}

// ================= LOADING =================
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
    }, 1500);
});

// ================= COPIAR =================
function copiar() {
    const msg = document.getElementById("msg");
    msg.select();
    document.execCommand("copy");
    toast("Mensagem copiada!");
}

// ================= TOAST =================
function toast(texto) {
    const t = document.getElementById("toast");
    t.innerText = texto;
    t.style.opacity = "1";

    setTimeout(() => {
        t.style.opacity = "0";
    }, 2000);
}

// ================= LINK ÚNICO =================
function gerarLink() {
    const numero = document.getElementById("numero").value.replace(/\D/g, "");
    const msg = encodeURIComponent(document.getElementById("msg").value);

    if (!numero) {
        alert("Digite um número válido");
        return;
    }

    const url = `https://wa.me/${numero}?text=${msg}`;
    window.open(url, "_blank");
}

// gerar link whatsapp
function gerarLista() {
  const input = document.getElementById("lista");
  const mensagem = document.getElementById("msg").value;

  if (!input.value.trim()) {
    alert("Digite os números!");
    return;
  }

  const numeros = input.value.split(/[\n,; ]+/);

  let resultadoHTML = "";
  let links = [];
  let validos = 0;

  numeros.forEach((num) => {
    let numeroLimpo = num.replace(/\D/g, "");

    if (numeroLimpo.length >= 10) {
      const link = `https://api.whatsapp.com/send?phone=${numeroLimpo}&text=${encodeURIComponent(mensagem)}`;

      links.push(link);

      resultadoHTML += `<p><a href="${link}" target="_blank">${numeroLimpo}</a></p>`;
      validos++;
    }
  });

  mostrarResultado(resultadoHTML, links);

  alert(`✅ ${validos} números válidos`);
}

function mostrarResultado(html, links) {
  let box = document.getElementById("resultado");

  if (!box) {
    box = document.createElement("div");
    box.id = "resultado";
    box.style.marginTop = "20px";

    document.querySelector(".container").appendChild(box);
  }

  box.innerHTML = `
    <h2>Links Gerados</h2>
    <div style="max-height:200px; overflow:auto;">${html}</div>

    <br>
    <button onclick='abrirTodos(${JSON.stringify(links)})'>Abrir Todos</button>
    <button onclick='copiarLinks(${JSON.stringify(links)})'>Copiar</button>
  `;
}

function abrirTodos(links) {
  links.forEach((link, index) => {
    setTimeout(() => {
      window.open(link, "_blank");
    }, index * 2000); // 1 segundo entre cada
  });
}

function copiarLinks(links) {
  const texto = links.join("\n");

  navigator.clipboard.writeText(texto);

  alert("Links copiados!");
}

// ================= COMPRA =================
function comprar(plano) {
    const msg = encodeURIComponent(`Quero comprar o plano ${plano}`);
    const numero = "5521990682259"; // seu número

    window.open(`https://wa.me/${numero}?text=${msg}`, "_blank");
}