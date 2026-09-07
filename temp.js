
    function showFormPopup(title, message, type) {
      const overlay = document.createElement("div");
      overlay.className = "form-popup-overlay";

      const popup = document.createElement("div");
      popup.className = `form-popup ${type}`;
      popup.setAttribute("role", "dialog");
      popup.setAttribute("aria-modal", "true");

      const successIcon = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      const errorIcon = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
      const icon = type === 'success' ? `<div class="form-popup-icon">${successIcon}</div>` : `<div class="form-popup-icon error">${errorIcon}</div>`;

      popup.innerHTML = `
          ${ icon }
          <h3>${title}</h3>
          <p>${message}</p>
          <div class="form-popup-actions">
            <button type="button" class="button primary">Schließen</button>
          </div>
        `;

      const closePopup = () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
      };

      popup.querySelector("button").addEventListener("click", closePopup);
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closePopup();
      });

      overlay.appendChild(popup);
      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        popup.style.transform = 'translateY(0) scale(1)';
      });
    }

    const registrationForm = document.getElementById("registrationForm");



    registrationForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const form = e.target;
      const submitButton = form.querySelector('input[type="submit"]');
      const originalButtonValue = submitButton.value;

      submitButton.disabled = true;
      submitButton.value = "Wird gesendet...";

      try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Checkboxes in FormData only appear if checked (usually with value "on")
        // We explicitly set the boolean values for the backend to be safe
        data["Medien Erlaubnis"] = form.elements["medien_erlaubnis"].checked;
        data["AGB akzeptiert"] = form.elements["agb"].checked;
        data["Datenschutz akzeptiert"] = form.elements["datenschutz"].checked;

        const response = await fetch(form.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          showFormPopup(
            "Erfolgreich angemeldet!",
            "Vielen Dank! Die Anmeldung wurde erfolgreich gesendet.",
            "success",
          );
          form.reset();
        } else {
          showFormPopup(
            "Senden fehlgeschlagen",
            "Fehler beim Senden. Bitte erneut versuchen.",
            "error",
          );
        }
      } catch (error) {
        showFormPopup(
          "Senden fehlgeschlagen",
          "Fehler beim Senden. Bitte erneut versuchen.",
          "error",
        );
      }

      submitButton.disabled = false;
      submitButton.value = originalButtonValue;
    });
  