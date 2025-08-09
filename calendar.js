
function selectMonthYear(callback) {
  
  const existing = document.getElementById("monthYearDialog");
  if (existing) existing.remove();

  
  const now = new Date();
  const currentYear = now.getFullYear();
  let selectedMonth = now.getMonth(); 
  let selectedYear = currentYear;

 
  const modal = document.createElement("div");
  modal.id = "monthYearDialog";
  modal.style.position = "fixed";
  modal.style.inset = "0";
  modal.style.background = "rgba(0,0,0,0.5)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "9999";

  
  modal.innerHTML = `
    <div style="
      background: #303030;
      border-radius: 16px;
      padding: 24px;
      width: 340px;
      text-align: center;
      box-shadow: 0 10px 40px rgba(250,250,250,0.1);
      font-family: sans-serif;
      animation: fadeIn 0.3s ease;
    ">
      <h3 style="margin-bottom: 12px; color: #00b894;">Select Month & Year</h3>
      <div id="monthGrid" style="
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-bottom: 20px;
      ">
        ${[...Array(12)].map((_, i) => {
          const name = new Date(0, i).toLocaleString("en-IN", { month: "short" });
          return `<div class="month-cell" data-month="${i}" style="
            padding: 10px;
            border-radius: 8px;
            background: ${i === selectedMonth ? '#00b894' : '#f3f4f6'};
            color: ${i === selectedMonth ? 'white' : '#111827'};
            cursor: pointer;
            font-weight: 500;
            transition: 0.2s;
          ">${name}</div>`;
        }).join("")}
      </div>

      <input type="number" id="yearPicker" value="${currentYear}" style="
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
        margin-bottom: 20px;
        text-align: center;
      " min="1900" max="2099"
		onkeydown="return false"
		ondrop="return false"
		onpaste="return false"/>

      <button id="submitMonthYear" style="
        background: #00b894;
        color: white;
        padding: 10px 24px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        font-size: 15px;
      ">Submit</button>
    </div>
  `;

  document.body.appendChild(modal);

 
  modal.querySelectorAll(".month-cell").forEach(cell => {
    cell.addEventListener("click", () => {
      selectedMonth = parseInt(cell.getAttribute("data-month"));
      modal.querySelectorAll(".month-cell").forEach(c => {
        c.style.background = "#f3f4f6";
        c.style.color = "#111827";
      });
      cell.style.background = "#00b894";
      cell.style.color = "white";
    });
  });

  document.getElementById("submitMonthYear").onclick = () => {
    selectedYear = parseInt(document.getElementById("yearPicker").value);
    modal.remove();
    if (callback) callback(selectedMonth, selectedYear);
  };
}

