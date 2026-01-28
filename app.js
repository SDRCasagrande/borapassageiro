// Bora Passageiro - App JavaScript

// Show screen function
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    // Close sidebar if open
    closeSidebar();

    // Update sidebar active state
    updateSidebarActive(screenId);
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Close sidebar
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    sidebar.classList.remove('open');
    overlay.classList.remove('active');
}

// Update sidebar active link
function updateSidebarActive(screenId) {
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });

    // Map screens to sidebar links
    const screenToLink = {
        'nova-viagem': 'Nova Viagem',
        'historico': 'Histórico',
        'itens-perdidos': 'Itens Perdidos',
        'nova-entrega': 'Nova Entrega',
        'entregas': 'Meus Pedidos',
        'servicos': 'Produtos e Serviços',
        'parceiros': 'Parcerias Bora Passageiro',
        'carteira': 'Carteira',
        'perfil': 'Meus Dados',
        'configuracoes': 'Configurações'
    };

    if (screenToLink[screenId]) {
        document.querySelectorAll('.sidebar-link').forEach(link => {
            if (link.textContent.trim().includes(screenToLink[screenId])) {
                link.classList.add('active');
            }
        });
    }
}

// Tab functionality
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('tab')) {
        const tabs = e.target.parentElement.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
    }

    // Vehicle/Package card selection
    if (e.target.closest('.vehicle-card') || e.target.closest('.package-card')) {
        const card = e.target.closest('.vehicle-card') || e.target.closest('.package-card');
        const siblings = card.parentElement.querySelectorAll(card.classList.contains('vehicle-card') ? '.vehicle-card' : '.package-card');
        siblings.forEach(s => s.classList.remove('selected'));
        card.classList.add('selected');
    }

    // Toggle switch
    if (e.target.classList.contains('toggle')) {
        e.target.classList.toggle('active');
    }

    // Payment item selection
    if (e.target.closest('.payment-item')) {
        const item = e.target.closest('.payment-item');
        document.querySelectorAll('.payment-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
    }
});

// Update status bar time
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeElement = document.querySelector('.status-bar .time');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

// Init
updateTime();
setInterval(updateTime, 60000);

// Prevent zoom on double tap (mobile)
document.addEventListener('touchstart', function (e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Alias for navigateTo (backwards compatibility)
function navigateTo(screenId) {
    showScreen(screenId);
}

console.log('🚗 Bora Passageiro Premium - Loaded successfully!');
