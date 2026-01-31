// Array of valid PRN, DOB, and corresponding PDF files (add your 7-8 entries here)
const validCredentials = [
    { prn: "240105131056", dob: "2005-09-30", pdf: "240105131056_Result.pdf" },
    { prn: "240105131054", dob: "2006-04-21", pdf: "marksheet_jay.pdf" },
    { prn: "240105131058", dob: "2005-10-02", pdf: "result_alice.pdf" },
    { prn: "240105131059", dob: "2005-10-03", pdf: "marksheet_bob.pdf" },
    { prn: "240105131060", dob: "2005-10-04", pdf: "result_charlie.pdf" },
    { prn: "240105131061", dob: "2005-10-05", pdf: "marksheet_diana.pdf" },
    { prn: "240105131062", dob: "2005-10-06", pdf: "result_eve.pdf" },
    { prn: "240105131063", dob: "2005-10-07", pdf: "marksheet_frank.pdf" }
    // Add more entries here as needed, e.g.:
    // { prn: "your_prn", dob: "yyyy-mm-dd", pdf: "your_pdf.pdf" }
];

function checkResult() {
    console.log("checkResult function called");
    const prn = document.getElementById("prn").value.trim();
    const dob = document.getElementById("dob").value;
    const wrapper = document.getElementById("result-wrapper");
    const pdf = document.getElementById("marksheet-pdf");
    const downBtn = document.querySelector(".down-btn");
    const msg = document.getElementById("msg");

    // 1. Reset the view every time button is clicked
    msg.innerText = "Checking credentials...";
    msg.style.color = "blue";
    wrapper.classList.add("hidden");

    // 2. Find matching credentials
    const matchedCredential = validCredentials.find(cred => cred.prn === prn && cred.dob === dob);

    if (matchedCredential) {
        // 3. SET THE PDF SOURCE
        pdf.src = matchedCredential.pdf;

        // 4. Show the wrapper immediately since embed loads differently
        msg.innerText = ""; // Clear the 'Checking...' message
        wrapper.classList.remove("hidden");
        wrapper.scrollIntoView({ behavior: 'smooth' });

        // 5. Set up download button
        downBtn.onclick = function() {
            const popup = document.getElementById("popup");
            popup.classList.remove("hidden");
            setTimeout(function() {
                popup.classList.add("hidden");
                const link = document.createElement('a');
                link.href = matchedCredential.pdf;
                link.download = matchedCredential.pdf;
                link.click();
            }, 5000); // 5 seconds
        };

        // Log request metadata (client-side equivalent)
        console.log(`Request received: GET ${window.location.pathname} for PRN: ${prn}`);

    } else {
        msg.style.color = "red";
        msg.innerText = "Invalid PRN or Date of Birth!";
        wrapper.classList.add("hidden");
    }
}


