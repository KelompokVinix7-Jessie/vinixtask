// Render halaman Team Space
function renderTeamPage(container) {
    container.innerHTML = `
        <h2 class="section-title">Team Members</h2>
        <div class="team-grid">
            ${appData.team.map(member => `
                <div class="team-card">
                    <div class="team-avatar">${member.name.split(' ').map(n => n[0]).join('')}</div>
                    <h4>${member.name}</h4>
                    <div class="team-role">${member.role}</div>
                    <div class="team-contact">
                        <div><i class="ri-phone-line"></i> ${member.phone}</div>
                        <div><i class="ri-mail-line"></i> ${member.email}</div>
                    </div>
                    <button class="btn btn-outline" onclick="window.open('${member.cvLink}', '_blank')">View CV</button>
                </div>
            `).join('')}
        </div>
    `;
}