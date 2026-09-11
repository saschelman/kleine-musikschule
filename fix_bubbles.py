import re

filepath = 'assets/js/faq-bubbles.js'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Inject CSS for realistic bubbles
css_injection = """
  // Inject realistic bubble styles
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes bubble-wobble {
      0%, 100% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
      33% { border-radius: 55% 45% 50% 50% / 50% 55% 45% 50%; }
      66% { border-radius: 45% 55% 45% 55% / 55% 45% 50% 50%; }
    }
    .faq-bubble {
      animation: bubble-wobble 4s ease-in-out infinite alternate;
      box-shadow: inset 0 0 20px rgba(255,255,255,0.5), inset 10px 0 40px rgba(255,255,255,0.4), inset -10px 0 30px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.1) !important;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid rgba(255,255,255,0.4) !important;
    }
    .faq-bubble::after {
      content: '';
      position: absolute;
      top: 15%;
      left: 20%;
      width: 25%;
      height: 15%;
      border-radius: 50%;
      background: radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%);
      transform: rotate(-45deg);
      pointer-events: none;
    }
    .faq-bubble.expanded {
      animation: none !important;
      border-radius: 24px !important;
      box-shadow: 0 15px 35px rgba(0,0,0,0.15) !important;
    }
    .faq-bubble.expanded::after {
      display: none;
    }
  `;
  document.head.appendChild(style);
"""

# Insert the CSS right after checking if faqGrid exists
content = re.sub(r'(if \(!faqGrid\) return;\n)', r'\1' + css_injection, content)

# 2. Modify the bubble element creation to ensure it gets the classes
# We don't need to change much, just ensure the expanded state updates the class correctly.
# d3.select(this).style("border-radius", "50%") is overriding the CSS class, so we should remove inline border-radius
content = content.replace('.style("border-radius", "50%")\n', '')
content = content.replace('.style("border-radius", "24px")\n', '')

with open(filepath, 'w') as f:
    f.write(content)
