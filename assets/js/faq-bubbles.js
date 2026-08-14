document.addEventListener("DOMContentLoaded", () => {
  // Only run on desktop
  if (window.innerWidth <= 768) return;

  const faqGrid = document.querySelector(".faq-grid");
  const faqTools = document.querySelector(".faq-tools");
  if (!faqGrid) return;

  // Hide original elements
  faqGrid.style.display = "none";
  if (faqTools) faqTools.style.display = "none";

  // Create container
  const container = document.createElement("div");
  container.id = "faq-bubble-container";
  container.style.position = "relative";
  container.style.width = "100%";
  container.style.height = "750px";
  container.style.overflow = "hidden";
  container.style.margin = "2rem 0";
  container.style.background = "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)";
  container.style.borderRadius = "24px";
  container.style.border = "1px solid rgba(255,255,255,0.1)";
  
  faqGrid.parentNode.insertBefore(container, faqGrid);

  // Extract data from DOM
  const cards = Array.from(faqGrid.querySelectorAll(".faq-card"));
  const nodes = cards.map((card, i) => {
    const summary = card.querySelector("summary").textContent.trim();
    const contentHtml = card.querySelector(".faq-content").innerHTML;
    // Extract color class
    const colorClass = Array.from(card.classList).find(c => c.startsWith("faq-card--")) || "faq-card--blue";
    
    // Map to a hex color for background (glassmorphism style)
    const colors = {
      "faq-card--blue": "rgba(96, 165, 250, 0.75)",
      "faq-card--purple": "rgba(167, 139, 250, 0.75)",
      "faq-card--salmon": "rgba(251, 113, 133, 0.75)",
      "faq-card--sand": "rgba(251, 191, 36, 0.75)",
      "faq-card--indigo": "rgba(129, 140, 248, 0.75)",
      "faq-card--green": "rgba(52, 211, 153, 0.75)"
    };
    
    // Some questions have longer answers, give them a slightly larger base radius based on text length
    const baseR = 95; 
    
    return {
      id: i,
      question: summary,
      answerHtml: contentHtml,
      color: colors[colorClass] || colors["faq-card--blue"],
      r: baseR,
      baseR: baseR,
      expandedR: 210,
      expanded: false
    };
  });

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Setup D3 Simulation
  const simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(15)) // Slight repulsion to keep them spread
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(d => d.r + 5).iterations(4))
    .force("x", d3.forceX(width / 2).strength(0.015))
    .force("y", d3.forceY(height / 2).strength(0.015));

  // Create DOM elements for bubbles
  const bubbleSelection = d3.select(container)
    .selectAll(".faq-bubble")
    .data(nodes)
    .enter()
    .append("div")
    .attr("class", "faq-bubble")
    .style("background", d => d.color)
    .style("width", d => `${d.r * 2}px`)
    .style("height", d => `${d.r * 2}px`)
    .style("border-radius", "50%")
    .style("position", "absolute")
    .style("display", "flex")
    .style("align-items", "center")
    .style("justify-content", "center")
    .style("cursor", "pointer")
    .style("transform", "translate(-50%, -50%)") // center positioning on x/y
    .html(d => `
      <div class="bubble-content">
        <div class="bubble-q">${d.question}</div>
        <div class="bubble-a">${d.answerHtml}</div>
      </div>
    `)
    .on("click", function(event, d) {
      // Toggle expanded state
      d.expanded = !d.expanded;
      
      // Update radius
      d.r = d.expanded ? d.expandedR : d.baseR;
      
      // Update DOM element size & border radius
      d3.select(this)
        .classed("expanded", d.expanded)
        .transition().duration(500)
        .style("width", `${d.r * 2}px`)
        .style("height", `${d.r * 2}px`)
        .style("min-height", `${d.r * 2}px`)
        .style("border-radius", "50%")
        .style("z-index", d.expanded ? 10 : 1)
        .style("background", d.expanded ? d.color.replace('0.75', '0.95') : d.color);
        
      // Re-heat simulation
      simulation.force("collide", d3.forceCollide().radius(n => n.r + 8).iterations(4));
      simulation.alpha(0.5).restart();
    })
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
    d3.select(this).style("transform", "translate(-50%, -50%) scale(1.05)");
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
    d3.select(this).style("transform", "translate(-50%, -50%) scale(1)");
  }

  simulation.on("tick", () => {
    // Keep within bounds
    nodes.forEach(d => {
      d.x = Math.max(d.r, Math.min(width - d.r, d.x));
      d.y = Math.max(d.r, Math.min(height - d.r, d.y));
    });

    bubbleSelection
      .style("left", d => `${d.x}px`)
      .style("top", d => `${d.y}px`);
  });
  
  // Resize handler
  window.addEventListener("resize", () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
    simulation.force("x", d3.forceX(newWidth / 2).strength(0.015));
    simulation.force("y", d3.forceY(newHeight / 2).strength(0.015));
    simulation.alpha(0.3).restart();
  });
});
