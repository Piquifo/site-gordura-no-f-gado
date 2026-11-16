# 🌿 Manual do Fígado Magro — Página de Vendas de Alta Conversão

Página de vendas profissional desenvolvida para o infoproduto **Manual do Fígado Magro**, remodelada com o design system editorial de alto padrão de `https://esposa-desejada.vercel.app`.

---

## 🎨 Identidade Visual & Design System

* **Tipografia:** `Playfair Display` (serifa editorial para títulos de impacto e ênfases em itálico) + `Inter` (sans-serif para máxima legibilidade no celular).
* **Paleta de Cores:**
  * **Seções Escuras:** Deep Forest (`#0C1812`) com cards em `#13251D` e bordas `#233F31`.
  * **Seções Claras:** Wellness Cream (`#F6F9F7` / `#FFFFFF`) com cards brancos, bordas suaves `#DCE7E1` e sombras elegantes.
  * **Destaques e Botões:** Verde nobre (`#0D6E44` / `#10B981`) com detalhes em dourado ouro (`#D4AF37`).
* **Estrutura dos 5 Produtos:**
  * Capa Mestre: `images/capa-mestre.jpg`
  * 1º Café da Manhã Anti-Gordura: `images/cafe-da-manha.jpg`
  * 2º Almoço Desintoxicante: `images/almoco.jpg`
  * 3º Janta Leve & Reparadora: `images/janta.jpg`
  * 4º Exercícios para Fazer em Casa: `images/exercicios.jpg`
  * 5º Bebidas para Derreter a Gordura no Fígado: `images/bebidas.jpg`

---

## ⚡ Como Configurar Seu Checkout

No arquivo **`script.js`**, na linha 6, você pode simplesmente colar o link do seu checkout:
```javascript
const CHECKOUT_URL = 'https://pay.hotmart.com/SEU_CODIGO';
```
Automaticamente, todos os botões de compra apontarão para a sua página de pagamento do Hotmart, Kiwify, Braip ou Eduzz.

---

## 📁 Arquivos Incluídos

* **`index.html`**: Estrutura modular semântica com o fluxo exato de seções da referência.
* **`style.css`**: Estilização idêntica ao site de referência (seções alternadas, cards com cantos arredondados de 20px–24px, tipografia responsiva e botões com sombra).
* **`script.js`**: Accordion FAQ com rotação de 45° no ícone circular, slider antes & depois touch-friendly e controle da barra fixa mobile.
* **`site-completo-figado.html`**: Versão compilada em arquivo único (HTML + CSS + JS embutidos), ideal para abrir direto no navegador ou colar no Elementor/WordPress.
* **`images/`**: Todas as 6 capas originais em alta resolução.
