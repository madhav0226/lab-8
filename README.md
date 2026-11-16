# Lab 8: User Information Form & Display Web Application

This project implements a web application to capture user details using HTML5 form elements and display them on a secondary page using JavaScript.

## 📁 File Structure

- **[index.html](file:///c:/Users/Acer/OneDrive/文档/web%20programming/lab8/index.html)**: The input form page containing all required fields and buttons.
- **[script.js](file:///c:/Users/Acer/OneDrive/文档/web%20programming/lab8/script.js)**: Form validation and data passing logic (`sessionStorage`, `localStorage`, and `URLSearchParams`).
- **[display.html](file:///c:/Users/Acer/OneDrive/文档/web%20programming/lab8/display.html)**: The results page that renders the captured user details.
- **[display.js](file:///c:/Users/Acer/OneDrive/文档/web%20programming/lab8/display.js)**: Script that extracts submitted data and safely populates the summary view.
- **[style.css](file:///c:/Users/Acer/OneDrive/文档/web%20programming/lab8/style.css)**: Shared stylesheet providing a modern, responsive design.

---

## 📋 Form Fields Captured

1. **Full Name**: Text input (`<input type="text">`)
2. **Gender**: Radio button group (`<input type="radio">`)
3. **Mobile Number**: Numeric/Telephone input with 10-digit validation (`<input type="tel">`)
4. **Mail ID**: Email format validation (`<input type="email">`)
5. **City**: Text input (`<input type="text">`)
6. **State**: Text input (`<input type="text">`)
7. **Country**: Dropdown selection (`<select>`)

---

## 🚀 How to Run

1. Open **[index.html](file:///c:/Users/Acer/OneDrive/文档/web%20programming/lab8/index.html)** in any modern web browser (Double-click or open directly).
2. Fill out all the form fields.
3. Click **"Submit Details"**.
4. You will be redirected to **[display.html](file:///c:/Users/Acer/OneDrive/文档/web%20programming/lab8/display.html)** where your entered information is displayed in a styled profile summary.
5. You can also print the summary or click **"Back to Form"** to enter new details.
