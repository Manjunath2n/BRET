async function downloadReport() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 20;
  doc.setFontSize(22);

  let txt = String(document.getElementById("head").innerText);
  let pdf=txt;
  let x = (210 - doc.getTextWidth(txt))/2;
  doc.text(txt, x, y);
 
  
  doc.setFontSize(10);
  doc.text(`Generated on  ${new Date().toLocaleString()}`, 10, y+=8);
	
	txt = "Revenue : "+document.getElementById("prev").innerText.slice(1);
	 doc.setFontSize(18);
	doc.text(txt,10,y+=20);
	txt = "Expense : "+document.getElementById("pexp").innerText.slice(1);
	 doc.setFontSize(18);
	doc.text(txt,10,y+=8);
	txt = document.getElementById("lp").innerText+" : "+document.getElementById("lpamt").innerText.slice(1);
	doc.setFontSize(18);
	doc.text(txt,10,y+=8);


	
  doc.setFillColor(30,30,30);
  doc.rect(10,y+=8,80,55,"F")
  let chartCanvas = document.getElementById("incomeChart"); 
  let chartImage = chartCanvas.toDataURL("image/png", 1.0);
  doc.addImage(chartImage, "PNG", 10, y,75, 55); 
  doc.setFillColor(30,30,30);
  doc.rect((10+90),y,80,55,"F")
  let chartCanvas2 = document.getElementById("expenseChart"); 
  let chartImage2 = chartCanvas2.toDataURL("image/png", 1.0);
  doc.addImage(chartImage2, "PNG", (10+90), y, 75, 55); 
  
  doc.setFillColor(30,30,30);
  x = (210 - 150)/2;
  doc.rect(x,y+=65,150,75,"F")
  
  chartCanvas2 = document.getElementById("barChart"); 
  chartImage2 = chartCanvas2.toDataURL("image/png", 1.0);
  doc.addImage(chartImage2, "PNG", x, y, 150, 75); 
  
   doc.setFontSize(16);
  txt = "Revenue statement";
  x = (210 - doc.getTextWidth(txt))/2;
  doc.text(txt, x,y+=85);

  
  doc.autoTable({
    html: '#receiptTable', 
    startY: y+=10, 
    theme: 'grid',
    headStyles: { fillColor: [65, 105, 225] }, 
  });
  let fy = doc.lastAutoTable.finalY || 100 ;
  doc.setFontSize(16);
  txt = "Payment statement";
  x = (210 - doc.getTextWidth(txt))/2;
  doc.text(txt, x, fy+10);
  doc.autoTable({
    html: '#paymentTable', 
    startY: fy+15, 
    theme: 'grid',
    headStyles: { fillColor: [65, 105, 225] }, 
  });


  
  doc.save(pdf+".pdf");
}


