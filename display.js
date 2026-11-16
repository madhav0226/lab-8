/**
 * JavaScript logic for User Information Display Page
 * Extracts and displays the captured information using JavaScript.
 */

document.addEventListener("DOMContentLoaded", () => {
  const dataContainer = document.getElementById("userDataContainer");
  const emptyContainer = document.getElementById("emptyContainer");

  const dispName = document.getElementById("dispName");
  const dispGender = document.getElementById("dispGender");
  const dispMobile = document.getElementById("dispMobile");
  const dispEmail = document.getElementById("dispEmail");
  const dispCity = document.getElementById("dispCity");
  const dispState = document.getElementById("dispState");
  const dispCountry = document.getElementById("dispCountry");
  const dispTime = document.getElementById("dispTime");

  let userData = null;

  // Method 1: Check sessionStorage first
  try {
    const sessionData = sessionStorage.getItem("submittedUserData");
    if (sessionData) {
      userData = JSON.parse(sessionData);
    }
  } catch (err) {
    console.warn("Unable to read from sessionStorage:", err);
  }

  // Method 2: If not in sessionStorage, check localStorage
  if (!userData) {
    try {
      const localData = localStorage.getItem("submittedUserData");
      if (localData) {
        userData = JSON.parse(localData);
      }
    } catch (err) {
      console.warn("Unable to read from localStorage:", err);
    }
  }

  // Method 3: Fallback to URL Query Parameters (URLSearchParams)
  if (!userData || !userData.fullName) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("fullName") && urlParams.get("fullName").trim() !== "") {
      userData = {
        fullName: urlParams.get("fullName"),
        gender: urlParams.get("gender") || "Not Specified",
        mobile: urlParams.get("mobile") || "Not Specified",
        email: urlParams.get("email") || "Not Specified",
        city: urlParams.get("city") || "Not Specified",
        state: urlParams.get("state") || "Not Specified",
        country: urlParams.get("country") || "Not Specified",
        submittedAt: urlParams.get("submittedAt") || new Date().toLocaleString()
      };
    }
  }

  // If valid user data was found, display it
  if (userData && userData.fullName) {
    dataContainer.style.display = "block";
    emptyContainer.style.display = "none";

    // Use textContent to ensure safe string rendering (prevents XSS vulnerabilities)
    dispName.textContent = userData.fullName;
    dispGender.textContent = userData.gender;
    dispMobile.textContent = userData.mobile;
    dispEmail.textContent = userData.email;
    dispCity.textContent = userData.city;
    dispState.textContent = userData.state;
    dispCountry.textContent = userData.country;
    dispTime.textContent = userData.submittedAt || new Date().toLocaleString();
  } else {
    // If no user information was found, show the empty state
    dataContainer.style.display = "none";
    emptyContainer.style.display = "block";
  }
});
