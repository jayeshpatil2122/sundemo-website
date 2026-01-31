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
    { prn: "240105131058", dob: "2005-10-02", pdf: "result_alice.pdf" },
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

    msg.innerText = "Checking credentials...";
    msg.style.color = "blue";
    wrapper.classList.add("hidden");

    const matchedCredential = validCredentials.find(cred => cred.prn === prn && cred.dob === dob);

    if (matchedCredential) {
        pdf.src = matchedCredential.pdf;
        msg.innerText = "";
        wrapper.classList.remove("hidden");
        wrapper.scrollIntoView({ behavior: 'smooth' });

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
    } else {
        msg.style.color = "red";
        msg.innerText = "Invalid PRN or Date of Birth!";
        wrapper.classList.add("hidden");
    }
}