import re

filepath = 'assets/js/faq-bubbles.js'
with open(filepath, 'r') as f:
    content = f.read()

# Replace the heavy CSS with simple CSS
old_style_block = r"""  const style = document.createElement\("style"\);
  style.innerHTML = `.*?`;
  document.head.appendChild\(style\);"""

new_style_block = """  const style = document.createElement("style");
  style.innerHTML = `
    .faq-bubble {
      border-radius: 50% !important;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
      border: 1px solid rgba(255,255,255,0.4) !important;
      transition: box-shadow 0.3s ease;
    }
    .faq-bubble:hover {
      box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
    }
    .faq-bubble.expanded {
      border-radius: 24px !important;
      box-shadow: 0 15px 35px rgba(0,0,0,0.15) !important;
    }
  `;
  document.head.appendChild(style);"""

content = re.sub(old_style_block, new_style_block, content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)
