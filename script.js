/**
 * JavaScript logic for User Information Form
 * Handles validation, data extraction, and passing data to the display page.
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");

  // Input Elements
  const fullNameInput = document.getElementById("fullName");
  const mobileInput = document.getElementById("mobile");
  const emailInput = document.getElementById("email");
  const cityInput = document.getElementById("city");
  const stateInput = document.getElementById("state");
  const countryInput = document.getElementById("country");
  const genderInputs = document.querySelectorAll('input[name="gender"]');

  // Error Message Elements
  const nameError = document.getElementById("nameError");
  const genderError = document.getElementById("genderError");
  const mobileError = document.getElementById("mobileError");
  const emailError = document.getElementById("emailError");
  const cityError = document.getElementById("cityError");
  const stateError = document.getElementById("stateError");
  const countryError = document.getElementById("countryError");

  // Helper functions to show and hide errors
  function showError(inputElement, errorElement, customMessage) {
    if (customMessage) {
      errorElement.textContent = customMessage;
    }
    errorElement.style.display = "block";
    if (inputElement && inputElement.classList) {
      inputElement.classList.add("error");
    }
  }

  function clearError(inputElement, errorElement) {
    if (errorElement) {
      errorElement.style.display = "none";
    }
    if (inputElement && inputElement.classList) {
      inputElement.classList.remove("error");
    }
  }

  // Clear errors dynamically on input
  fullNameInput.addEventListener("input", () => clearError(fullNameInput, nameError));
  mobileInput.addEventListener("input", () => {
    // Only allow digits in mobile number field
    mobileInput.value = mobileInput.value.replace(/[^0-9]/g, "");
    clearError(mobileInput, mobileError);
  });
  emailInput.addEventListener("input", () => clearError(emailInput, emailError));
  cityInput.addEventListener("input", () => clearError(cityInput, cityError));
  stateInput.addEventListener("input", () => clearError(stateInput, stateError));
  countryInput.addEventListener("change", () => clearError(countryInput, countryError));
  genderInputs.forEach(radio => {
    radio.addEventListener("change", () => clearError(null, genderError));
  });

  // Form submit event handler
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent standard HTTP postback

    let isValid = true;

    // 1. Validate Full Name
    const nameVal = fullNameInput.value.trim();
    const nameRegex = /^[A-Za-z\s.]{2,50}$/;
    if (!nameVal) {
      showError(fullNameInput, nameError, "Full Name is required.");
      isValid = false;
    } else if (!nameRegex.test(nameVal)) {
      showError(fullNameInput, nameError, "Name should only contain letters and be at least 2 characters.");
      isValid = false;
    } else {
      clearError(fullNameInput, nameError);
    }

    // 2. Validate Gender
    let selectedGender = "";
    for (const radio of genderInputs) {
      if (radio.checked) {
        selectedGender = radio.value;
        break;
      }
    }
    if (!selectedGender) {
      showError(null, genderError, "Please select your gender.");
      isValid = false;
    } else {
      clearError(null, genderError);
    }

    // 3. Validate Mobile Number (10 digits)
    const mobileVal = mobileInput.value.trim();
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileVal) {
      showError(mobileInput, mobileError, "Mobile number is required.");
      isValid = false;
    } else if (!mobileRegex.test(mobileVal)) {
      showError(mobileInput, mobileError, "Please enter a valid 10-digit mobile number.");
      isValid = false;
    } else {
      clearError(mobileInput, mobileError);
    }

    // 4. Validate Email Address
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      showError(emailInput, emailError, "Email ID is required.");
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      showError(emailInput, emailError, "Please enter a valid email address (e.g. user@example.com).");
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // 5. Validate City
    const cityVal = cityInput.value.trim();
    if (!cityVal) {
      showError(cityInput, cityError, "City is required.");
      isValid = false;
    } else {
      clearError(cityInput, cityError);
    }

    // 6. Validate State
    const stateVal = stateInput.value.trim();
    if (!stateVal) {
      showError(stateInput, stateError, "State is required.");
      isValid = false;
    } else {
      clearError(stateInput, stateError);
    }

    // 7. Validate Country
    const countryVal = countryInput.value;
    if (!countryVal) {
      showError(countryInput, countryError, "Please select a country.");
      isValid = false;
    } else {
      clearError(countryInput, countryError);
    }

    // If validation fails, focus the first invalid input
    if (!isValid) {
      const firstError = document.querySelector(".form-control.error");
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    // Prepare user details object
    const userData = {
      fullName: nameVal,
      gender: selectedGender,
      mobile: mobileVal,
      email: emailVal,
      city: cityVal,
      state: stateVal,
      country: countryVal,
      submittedAt: new Date().toLocaleString()
    };

    try {
      // 1. Store into sessionStorage (available for the current browser session)
      sessionStorage.setItem("submittedUserData", JSON.stringify(userData));

      // 2. Also store into localStorage (persistent cross-tab storage)
      localStorage.setItem("submittedUserData", JSON.stringify(userData));
    } catch (e) {
      console.warn("Storage warning (running in restricted mode):", e);
    }

    // 3. Fallback & standard approach: Pass data via URL parameters as well
    const queryParams = new URLSearchParams(userData);

    // Redirect to the display page
    window.location.href = `display.html?${queryParams.toString()}`;
  });

  // Handle Form Reset
  form.addEventListener("reset", () => {
    // Clear all error messages and outlines
    [fullNameInput, mobileInput, emailInput, cityInput, stateInput, countryInput].forEach(el => {
      clearError(el, null);
    });
    [nameError, genderError, mobileError, emailError, cityError, stateError, countryError].forEach(el => {
      if (el) el.style.display = "none";
    });
  });
});
