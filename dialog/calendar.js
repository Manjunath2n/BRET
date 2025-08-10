
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
    <div class = "dialog">
	<center>
      <h3 style="margin-bottom: 12px; color: #ffffff;">Select Month & Year</h3></center>
      <div id="monthGrid" style="
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-bottom: 20px;
      ">
        ${[...Array(12)].map((_, i) => {
          const name = new Date(0, i).toLocaleString("en-IN", { month: "short" });
          return `<div class="month-cell card ${i === selectedMonth ? 'active' : ''}" data-month="${i}">${name}</div>`;
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

      <center><div id="submitMonthYear" class="neon-btn" style = " background : rgb(255,255,255);" >Submit</div></center>
    </div>
  `;

  document.body.appendChild(modal);

 
modal.querySelectorAll(".month-cell").forEach(cell => {
    cell.addEventListener("click", () => {
      selectedMonth = parseInt(cell.getAttribute("data-month"));
      modal.querySelectorAll(".month-cell").forEach(c => {
		  c.style.background="Transparent";
			c.style.color = "#ffffff";
		
      });
      
      cell.style.background = "white";
		cell.style.color = "#000000";
    });
  });

  document.getElementById("submitMonthYear").onclick = () => {
    selectedYear = parseInt(document.getElementById("yearPicker").value);
    modal.remove();
    if (callback) callback(selectedMonth, selectedYear);
  };
}

