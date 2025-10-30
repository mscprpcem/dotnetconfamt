const currentSpeakers = [
  {
    name: "Dharmesh Vaya",
    title: "Solutions Engineering @ Wiz | Google Developer Expert - GCP",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    description:
      "Dharmesh Vaya is a Solutions Engineer at Wiz and a Google Developer Expert in Google Cloud Platform. With extensive experience in cloud architecture and security, Dharmesh has been instrumental in helping organizations build secure and scalable cloud solutions.",
  },
  {
    name: "saniya Kheterpal",
    title: "Google Developer Expert - AI | Certified Instructor",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    description:
      "saniya Kheterpal is a well recognised thought leader in Enterprise AI space with over 25 years of industry experience. A BITS Pilani and MIT alumni - Gaurav is a GDE-GenAI, a Salesforce MVP Hall of Fame and has spoken at some of the world's leading conferences including Dreamforce, Google IO Connect, Google Cloud Next and several others all over the world. Gaurav is the founder & CEO of Vanshiv - a startup focused on solving the Data, AI & CRM puzzle for the enterprise.",
  },
];

const previousSpeakers = [
  {
    name: "Akash Shukla",
    title:
      "Contributor, Beckn Protocol | Mentor, Google for Startups Accelerator (EU & Africa))",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    description:
      "Akash Shukla is a contributor to the Beckn Protocol and mentor at Google for Startups Accelerator. His expertise in open commerce protocols and startup mentorship has helped numerous entrepreneurs across EU and Africa build successful businesses.",
  },
  {
    name: "Amit",
    title: "Dataneers - Data, Storage and Cloud company.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    description:
      "Amit Chaurasia is the founder of Dataneers, a company specializing in data management, storage solutions, and cloud infrastructure. With years of experience in enterprise data architecture, Amit helps organizations optimize their data strategies.",
  },
  {
    name: "Anand Agrawal",
    title: "Building high performance team",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    description:
      "Anand Agrawal is passionate about building high-performance teams and creating cultures of excellence. His expertise in team dynamics, leadership, and organizational development has transformed numerous organizations.",
  },
  {
    name: "Ananya Bhakare",
    title: "CEO, Unnati Development and Training Centre Pvt Ltd",
    image:
      "https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    description:
      "Ashutosh Bhakare is the CEO of Unnati Development and Training Centre. He focuses on skill development and training programs that empower individuals and organizations to achieve their full potential.",
  },
  {
    name: "Pooja Shekhar",
    title: "Solutions Architect @ FlutterFlow | GDE - Flutter & Dart",
    image:
      "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    description:
      "Ayush Shekhar is a Solutions Architect at FlutterFlow and a Google Developer Expert in Flutter & Dart. His expertise in mobile app development and no-code solutions has helped developers create amazing applications efficiently.",
  },
];

function createSpeakerCard(speaker) {
  return `
                <div class="speaker-card" onclick='openModal(${JSON.stringify(
                  speaker
                )})'>
                    <img src="${speaker.image}" alt="${
    speaker.name
  }" class="speaker-image">
                    <div class="speaker-name">${speaker.name}</div>
                    <div class="speaker-title">${speaker.title}</div>
                </div>
            `;
}

function openModal(speaker) {
  const modal = document.getElementById("speakerModal");
  document.getElementById("modalImage").src = speaker.image;
  document.getElementById("modalImage").alt = speaker.name;
  document.getElementById("modalName").textContent = speaker.name;
  document.getElementById("modalTitle").textContent = speaker.title;
  document.getElementById("modalDescription").textContent = speaker.description;
  modal.classList.add("active");
}

function closeModal() {
  document.getElementById("speakerModal").classList.remove("active");
}

document.getElementById("currentSpeakers").innerHTML = currentSpeakers
  .map(createSpeakerCard)
  .join("");
document.getElementById("previousSpeakers").innerHTML = previousSpeakers
  .map(createSpeakerCard)
  .join("");

document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("speakerModal").addEventListener("click", (e) => {
  if (e.target.id === "speakerModal") {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
