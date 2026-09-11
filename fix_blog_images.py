import re

filepath = 'assets/css/blog-post.css'
with open(filepath, 'r') as f:
    content = f.read()

# Replace the image styles
old_style = """.image.main img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  object-position: center 30%;
  display: block;
  transition: transform 0.8s ease;
}"""

new_style = """.image.main img {
  width: 100%;
  height: auto;
  max-height: 600px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.02);
  transition: transform 0.8s ease;
}"""

content = content.replace(old_style, new_style)

# Actually, wait. If object-fit: contain is used, we might have weird borders.
# Let's just remove max-height and object-fit entirely, so the image defines the height perfectly without letterboxing.
better_style = """.image.main img {
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  transition: transform 0.8s ease;
}"""

content = content.replace(new_style, better_style) # Just in case
content = content.replace(old_style, better_style)

with open(filepath, 'w') as f:
    f.write(content)
