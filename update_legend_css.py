import re

filepath = 'assets/css/fretboard.css'
with open(filepath, 'r') as f:
    content = f.read()

# Replace .chord-tips with .legend-box styling
old_css = r"""      \.chord-tips \{.*?\}

      \.chord-tips h3 \{.*?\}

      \.chord-tips p \{.*?\}

      \.chord-tips ul \{.*?\}

      \.chord-tips li \{.*?\}

      \.chord-tips strong \{.*?\}

      \.chord-tips br \{.*?\}"""

new_css = """      .legend-box {
        background: #ffffff;
        border: 1px solid rgba(255, 159, 67, 0.2);
        border-radius: 12px;
        padding: 2em;
        margin-top: 3em;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      }

      .legend-box h3 {
        color: #ff9f43;
        margin-top: 0;
        margin-bottom: 1.5em;
        font-size: 1.4em;
        border-bottom: 1px solid rgba(255, 159, 67, 0.2);
        padding-bottom: 0.5em;
      }

      .legend-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .legend-list li {
        display: flex;
        align-items: center;
        margin-bottom: 1.2em;
        line-height: 1.6;
        color: #333;
      }

      .legend-list li:last-child {
        margin-bottom: 0;
      }

      .legend-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 15px;
        font-weight: bold;
        flex-shrink: 0;
      }

      .finger-icon {
        background: #ff9f43;
        color: white;
      }

      .open-icon {
        color: #4ade80;
        border: 2px solid #4ade80;
        background: rgba(74, 222, 128, 0.1);
      }

      .muted-icon {
        color: #ef4444;
        border: 2px solid #ef4444;
        background: rgba(239, 68, 68, 0.1);
      }

      .strings-icon {
        background: #a39171;
        color: white;
      }"""

content = re.sub(old_css, new_css, content, flags=re.DOTALL)

# Also remove the mobile overrides for .chord-tips
mobile_css = r"""        \.chord-tips \{.*?\}

        \.chord-tips h3 \{.*?\}

        \.chord-tips p,
        \.chord-tips ul \{.*?\}"""

new_mobile_css = """        .legend-box {
          padding: 1.5em;
        }

        .legend-list li {
          align-items: flex-start;
        }"""

content = re.sub(mobile_css, new_mobile_css, content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)
