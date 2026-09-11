import re

filepath = 'blog/quiz-musiker.html'
with open(filepath, 'r') as f:
    content = f.read()

# Fix the CSS block
old_css = r"""      /\* Blog Content Styling \*/
      #main p {
        line-height: 1.8;
        font-size: 1.05em;
        color: rgba\(255, 255, 255, 0.95\);
      }

      #main h2,
      #main h3,
      #main h4 {
        color: #667eea;
        margin-top: 1.5em;
        margin-bottom: 0.8em;
      }

      #main strong {
        color: #f0ad4e;
      }

      #main ul,
      #main ol {
        line-height: 1.9;
        font-size: 1.05em;
        color: rgba\(255, 255, 255, 0.9\);
      }

      #main li {
        margin-bottom: 0.8em;
      }"""

new_css = """      /* Blog Content Styling */
      .quiz-container p,
      .quiz-container h2,
      .quiz-container h3,
      .quiz-container h4,
      .quiz-container ul,
      .quiz-container ol,
      .quiz-container li {
        color: rgba(255, 255, 255, 0.95) !important;
      }

      .quiz-container h2,
      .quiz-container h3,
      .quiz-container h4 {
        margin-top: 1.5em;
        margin-bottom: 0.8em;
      }

      #main strong {
        color: #f0ad4e;
      }

      .quiz-container p {
        line-height: 1.8;
        font-size: 1.05em;
      }

      .quiz-container ul,
      .quiz-container ol {
        line-height: 1.9;
        font-size: 1.05em;
      }

      .quiz-container li {
        margin-bottom: 0.8em;
      }"""

content = re.sub(old_css, new_css, content)

# Also fix the inline style of the intro text just in case:
# <p style="margin-top: 0.25em; font-size: 0.98em; color: rgba(255, 255, 255, 0.9)">
content = content.replace(
    '<p style="margin-top: 0.25em; font-size: 0.98em; color: rgba(255, 255, 255, 0.9)">',
    '<p style="margin-top: 0.25em; font-size: 0.98em; color: rgba(26, 26, 26, 0.9)">'
)

with open(filepath, 'w') as f:
    f.write(content)
