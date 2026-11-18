// ==========================================
// 1. SELECTING HTML ELEMENTS
// ==========================================

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.querySelector(".nav-links");

const allNavLinks = document.querySelectorAll(".nav-link");


// ==========================================
// 2. MOBILE NAVIGATION MENU
// ==========================================

// Check whether the menu button and navigation menu exist.
if (menuToggle && navLinks) {

    // Listen for a click on the hamburger button.
    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        if (isOpen) {

            menuToggle.setAttribute("aria-expanded", "true");

            menuToggle.setAttribute("aria-label", "Close navigation menu");

        } else {

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation menu");

        }

    });


    // ==========================================
    // 3. CLOSING THE MENU WHEN A LINK IS CLICKED
    // ==========================================

    allNavLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation menu");

        });

    });

}


// ==========================================
// 4. FINDING THE CURRENT WEB PAGE
// ==========================================

const currentPage = window.location.pathname;


// ==========================================
// 5. HIGHLIGHTING THE CURRENT NAVIGATION LINK
// ==========================================

allNavLinks.forEach(function (link) {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage.substring(currentPage.lastIndexOf("/") + 1)) {

        link.classList.add("active");

    }

});


/* =========================
   CONTACT FORM SUBMISSION
========================= */

const contactForm = document.querySelector(".contact-form");

if (contactForm)
{
    const formStatus = document.querySelector("#form-status");

    const submitButton = contactForm.querySelector(".submit-button");

    contactForm.addEventListener("submit", async function(event)
    {
        // Stop the browser from redirecting to Formspree.
        event.preventDefault();

        // Show that the message is being sent.
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        formStatus.textContent = "";
        formStatus.className = "form-status";

        try
        {
            // Send the form information to Formspree.
            const response = await fetch(contactForm.action,
            {
                method: "POST",
                body: new FormData(contactForm),
                headers:
                {
                    Accept: "application/json"
                }
            });

            // Check whether Formspree accepted the message.
            if (response.ok)
            {
                formStatus.textContent =
                    "Your message has been sent successfully! I'll get back to you soon.";

                formStatus.classList.add("success");

                // Clear the form after successful submission.
                contactForm.reset();
            }
            else
            {
                formStatus.textContent =
                    "Sorry, your message could not be sent. Please try again.";

                formStatus.classList.add("error");
            }
        }
        catch (error)
        {
            // Handle network or connection problems.
            formStatus.textContent =
                "Connection error. Please check your internet and try again.";

            formStatus.classList.add("error");

            console.error("Contact form error:", error);
        }
        finally
        {
            // Make the button available again.
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        }
    });
}