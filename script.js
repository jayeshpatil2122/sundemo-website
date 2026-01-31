// Hide all messages on page load
window.onload = function() {
    document.getElementById("error-msg").classList.add("hidden");
    document.getElementById("error-msg").innerHTML = "";
    document.getElementById("withheld-message").classList.add("hidden");
    document.getElementById("result-wrapper").classList.add("hidden");
    document.getElementById("msg").innerText = "";
    document.getElementById("prn").value = "";
    document.getElementById("dob").value = "";
};

// Side Menu Logic
document.getElementById("menuBtn").onclick = function() {
    document.getElementById("sideMenu").style.width = "280px";
};
document.getElementById("closeBtn").onclick = function() {
    document.getElementById("sideMenu").style.width = "0";
};

// Exam Selector Logic
function toggleExamOptions() {
    const options = document.getElementById("exam-options");
    options.classList.toggle("hidden");
}

function openExamLink(url) {
    window.open(url, '_blank');
}

// --- YOUR ORIGINAL RESULT LOGIC ---
const validCredentials = [
    { prn: "240105131056", dob: "2005-09-30", pdf: "240105131056_Result.pdf" },
    { prn: "240105131054", dob: "2006-04-21", pdf: "marksheet_jay.pdf" },
    { prn: "240105231042", dob: "2006-01-08", pdf: "result_alice.pdf" },
    { prn: "240105131059", dob: "2005-10-03", pdf: "marksheet_bob.pdf" },
    { prn: "240105131060", dob: "2005-10-04", pdf: "result_charlie.pdf" },
    { prn: "240105131061", dob: "2005-10-05", pdf: "marksheet_diana.pdf" },
    { prn: "240105131062", dob: "2005-10-06", pdf: "result_eve.pdf" },
    { prn: "240105131063", dob: "2005-10-07", pdf: "marksheet_frank.pdf" }
];

function checkResult() {
    const prn = document.getElementById("prn").value.trim();
    const dob = document.getElementById("dob").value;
    const wrapper = document.getElementById("result-wrapper");
    const pdf = document.getElementById("marksheet-pdf");
    const downBtn = document.querySelector(".down-btn");
    const msg = document.getElementById("msg");
    const errorMsg = document.getElementById("error-msg");

    // Clear previous messages
    msg.innerText = "";
    wrapper.classList.add("hidden");
    errorMsg.classList.add("hidden");
    errorMsg.innerHTML = "";
    document.getElementById("withheld-message").classList.add("hidden");

    // Debug: Log input values
    console.log("PRN:", prn, "DOB:", dob);

    // Require both PRN and DOB to be entered
    if (!prn && !dob) {
        errorMsg.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please enter both PRN and Date of Birth!';
        errorMsg.classList.remove("hidden");
        console.log("Showing both fields required error");
    } else if (!prn) {
        errorMsg.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please enter PRN!';
        errorMsg.classList.remove("hidden");
        console.log("Showing PRN required error");
    } else if (!dob) {
        errorMsg.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please enter Date of Birth!';
        errorMsg.classList.remove("hidden");
        console.log("Showing DOB required error");
    } else {
        // Both fields are filled, now validate
        const hasPrn = validCredentials.some(cred => cred.prn === prn);
        console.log("Has PRN:", hasPrn);
        if (!hasPrn) {
            errorMsg.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Invalid PRN!';
            errorMsg.classList.remove("hidden");
            console.log("Showing invalid PRN error");
        } else {
            const matchedCredential = validCredentials.find(cred => cred.prn === prn && cred.dob === dob);
            console.log("Matched credential:", matchedCredential);
            if (matchedCredential) {
                if (matchedCredential.prn === "240105231042" && matchedCredential.dob === "2006-01-08") {
                    // Special case: Show withheld message box instead of PDF
                    pdf.src = "";
                    pdf.style.display = "none"; // Hide PDF embed
                    downBtn.style.display = "none"; // Hide download button
                    document.getElementById("withheld-message").classList.remove("hidden");
                    wrapper.classList.remove("hidden");
                    wrapper.scrollIntoView({ behavior: 'smooth' });
                } else {
                    pdf.src = matchedCredential.pdf;
                    wrapper.classList.remove("hidden");
                    wrapper.scrollIntoView({ behavior: 'smooth' });
                    downBtn.style.display = "block"; // Show download button

                    downBtn.onclick = function() {
                        const popup = document.getElementById("popup");
                        popup.classList.remove("hidden");
                        setTimeout(function() {
                            popup.classList.add("hidden");
                            const link = document.createElement('a');
                            link.href = matchedCredential.pdf;
                            link.download = matchedCredential.pdf;
                            link.click();
                        }, 6000);
                    };
                }
            } else {
                errorMsg.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Invalid Date of Birth!';
                errorMsg.classList.remove("hidden");
                console.log("Showing invalid DOB error");
            }
        }
    }
}
