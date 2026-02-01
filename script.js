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
    { prn: "240105131056", dob: "2005-09-30", pdf: "240105131056_result_9.pdf" }, //sau
    { prn: "240105131054", dob: "2006-04-21", pdf: "240105131054_result.pdf" },// jay
    { prn: "240105231042", dob: "2006-01-08", pdf: "result_alice.pdf" },//sat
    { prn: "240105131311", dob: "2005-11-09", pdf: "240105131311_result.pdf" }, //ayu
    { prn: "240105131065", dob: "2006-03-08", pdf: "240105131065_result.pdf" },//san
    { prn: "240105131134", dob: "2005-11-04", pdf: "240105131134_result.pdf" },//nak
    { prn: "240105131207", dob: "2005-12-30", pdf: "240105131207_result.pdf" },//ani
    { prn: "240105131212", dob: "2005-08-01", pdf: "240105131212_result.pdf" },//kun
    { prn: "240105131353", dob: "2006-11-22", pdf: "240105131353_result_2.pdf" },//han
    { prn: "240105231005", dob: "2006-09-12", pdf: "240105231005_result.pdf" },//dev
    { prn: "240105231293", dob: "2005-05-20", pdf: "240105231293_result_1.pdf" },//prem
    { prn: "placeholder_prn_4", dob: "2000-01-04", pdf: "placeholder_pdf_4.pdf" },
    { prn: "placeholder_prn_5", dob: "2000-01-05", pdf: "placeholder_pdf_5.pdf" },
    { prn: "placeholder_prn_6", dob: "2000-01-06", pdf: "placeholder_pdf_6.pdf" },
    { prn: "placeholder_prn_7", dob: "2000-01-07", pdf: "placeholder_pdf_7.pdf" }
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
    document.getElementById("backlog-message").classList.add("hidden");
    pdf.style.display = "block"; // Reset PDF display

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
                // Special case: Show withheld message box instead of PDF, no backlog message
                pdf.src = "";
                pdf.style.display = "none"; // Hide PDF embed
                downBtn.style.display = "none"; // Hide download button
                document.querySelector(".recheck-btn").style.display = "none"; // Hide recheck button
                document.getElementById("withheld-message").classList.remove("hidden");
                wrapper.classList.remove("hidden");
                wrapper.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Show the backlog message and result PDF for other valid results
                document.getElementById("backlog-message").classList.remove("hidden");

                pdf.src = matchedCredential.pdf;
                pdf.style.display = "block"; // Ensure PDF is visible
                wrapper.classList.remove("hidden");
                wrapper.scrollIntoView({ behavior: 'smooth' });
                downBtn.style.display = "block"; // Show download button
                document.querySelector(".recheck-btn").style.display = "block"; // Show recheck button

                downBtn.onclick = function() {
                    setTimeout(function() {
                        const link = document.createElement('a');
                        link.href = matchedCredential.pdf;
                        link.download = matchedCredential.pdf;
                        link.click();
                    }, 1500);
                };

                const recheckBtn = document.querySelector(".recheck-btn");
                recheckBtn.onclick = function() {
                    const popup = document.getElementById("popup");
                    popup.classList.remove("hidden");
                    setTimeout(function() {
                        popup.classList.add("hidden");
                    }, 7000);
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
