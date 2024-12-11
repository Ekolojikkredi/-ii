// Ana Sayfa
document.getElementById("homeBtn").addEventListener("click", function() {
    showContent("homeContent");
});

// Kayıt Ol
document.getElementById("registerBtn").addEventListener("click", function() {
    showContent("registerContent");
});

// Veri Girişi
document.getElementById("dataEntryBtn").addEventListener("click", function() {
    showContent("dataEntryContent");
});

// Veri Görüntüle
document.getElementById("viewDataBtn").addEventListener("click", function() {
    showContent("studentDataContent");
    displayStudentData();
});

// Nedir?
document.getElementById("aboutBtn").addEventListener("click", function() {
    showContent("aboutContent");
});

// Bize Ulaşın
document.getElementById("contactBtn").addEventListener("click", function() {
    showContent("contactContent");
});

// Ana Sayfaya Dön
document.getElementById("backBtn").addEventListener("click", function() {
    showContent("homeContent");
});

// İçerik Geçişi
function showContent(contentId) {
    // Tüm içerikleri gizle
    const sections = document.querySelectorAll(".content-section");
    sections.forEach(section => {
        section.classList.add("hidden");
    });

    // Seçilen içeriği göster
    document.getElementById(contentId).classList.remove("hidden");
}

// Kayıt Formu - Öğrenci Kayıt
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const studentName = document.getElementById("studentName").value;
    const studentEmail = document.getElementById("studentEmail").value;
    const studentPhone = document.getElementById("studentPhone").value;
    const studentSchool = document.getElementById("studentSchool").value;

    // Öğrenci bilgilerini kaydet (localStorage)
    const studentData = {
        name: studentName,
        email: studentEmail,
        phone: studentPhone,
        school: studentSchool
    };
    localStorage.setItem("studentData", JSON.stringify(studentData));

    alert("Kayıt başarılı!");

    // Ana sayfaya dön
    showContent("homeContent");
});

// Veri Girişi Formu
document.getElementById("waste-entry-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const wasteType = document.getElementById("wasteType").value;
    const wasteAmount = document.getElementById("wasteAmount").value;

    // Puan hesaplama
    const points = calculatePoints(wasteType, wasteAmount);

    // Öğrenci verilerini güncelle (localStorage)
    const studentData = JSON.parse(localStorage.getItem("studentData")) || {};
    studentData.wasteAmount = wasteAmount;
    studentData.points = points;
    studentData.wasteType = wasteType;

    localStorage.setItem("studentData", JSON.stringify(studentData));

    alert("Veri kaydedildi!");

    // Ana sayfaya dön
    showContent("homeContent");
});

// Atık Puan Hesaplama
function calculatePoints(wasteType, wasteAmount) {
    let points = 0;

    switch (wasteType) {
        case "plastik":
            points = wasteAmount * 5;
            break;
        case "kağıt":
            points = wasteAmount * 4;
            break;
        case "cam":
            points = wasteAmount * 6;
            break;
        case "metal":
            points = wasteAmount * 7;
            break;
        case "elektronik":
            points = wasteAmount * 10;
            break;
        case "yağ":
            points = wasteAmount * 3;
            break;
        case "tekstil":
            points = wasteAmount * 2;
            break;
        case "pil":
            points = wasteAmount * 8;
            break;
        default:
            points = 0;
    }

    return points;
}

// Öğrenci Verilerini Görüntüle
function displayStudentData() {
    const studentData = JSON.parse(localStorage.getItem("studentData"));

    if (studentData) {
        document.getElementById("totalWaste").textContent = `Toplam Atık: ${studentData.wasteAmount} kg`;
        document.getElementById("totalPoints").textContent = `Toplam Puan: ${studentData.points}`;
        document.getElementById("wasteTypes").textContent = `Atık Türü: ${studentData.wasteType}`;
    }
}
