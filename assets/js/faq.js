document.addEventListener("DOMContentLoaded", function () {
  const cards = Array.from(document.querySelectorAll(".faq-card"));
  const detailsList = cards
    .map(function (card) {
      return card.querySelector("details");
    })
    .filter(Boolean);

  detailsList.forEach(function (details) {
    const summary = details.querySelector("summary");

    if (!summary) {
      return;
    }

    summary.setAttribute(
      "aria-expanded",
      details.hasAttribute("open") ? "true" : "false",
    );

    summary.addEventListener("click", function (e) {
      e.preventDefault();
      const isOpen = details.hasAttribute("open");

      detailsList.forEach(function (item) {
        item.removeAttribute("open");
        const itemSummary = item.querySelector("summary");

        if (itemSummary) {
          itemSummary.setAttribute("aria-expanded", "false");
        }
      });

      if (!isOpen) {
        details.setAttribute("open", "");
        summary.setAttribute("aria-expanded", "true");
      }
    });
  });

  const searchInput = document.getElementById("faqSearch");
  const noResults = document.getElementById("faqNoResults");

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    cards.forEach(function (card) {
      const summaryText = (
        card.querySelector("summary") &&
        card.querySelector("summary").textContent
          ? card.querySelector("summary").textContent
          : ""
      ).toLowerCase();
      const answerText = (
        card.querySelector(".faq-content") &&
        card.querySelector(".faq-content").textContent
          ? card.querySelector(".faq-content").textContent
          : ""
      ).toLowerCase();

      const isMatch =
        query === "" ||
        summaryText.includes(query) ||
        answerText.includes(query);

      card.classList.toggle("is-hidden", !isMatch);

      if (isMatch) {
        visibleCount += 1;
      } else {
        const details = card.querySelector("details");
        if (details) {
          details.removeAttribute("open");
        }
      }
    });

    if (noResults) {
      noResults.classList.toggle("is-visible", visibleCount === 0);
    }
  });
});
