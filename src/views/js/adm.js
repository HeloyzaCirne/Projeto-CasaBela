document.addEventListener('DOMContentLoaded', () => {
    const navPills = document.querySelectorAll('.nav-pill');
    const mainSections = document.querySelectorAll('main');

    const activateSection = (sectionId) => {
        mainSections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    };

    navPills.forEach(pill => {
        pill.addEventListener('click', () => {
            navPills.forEach(p => {
                p.classList.remove('active');
                p.classList.add('inactive');
            });

            pill.classList.remove('inactive');
            pill.classList.add('active');

            const pillText = pill.textContent.trim();
            let targetSectionId;

            switch (pillText) {
                case 'Dashboard':
                    targetSectionId = 'dashboard';
                    break;
                case 'Produtos':
                    targetSectionId = 'product-management';
                    break;
                case 'Pedidos':
                    targetSectionId = 'orders-list';
                    break;
                default:
                    targetSectionId = 'dashboard'; // Fallback
            }
            activateSection(targetSectionId);
        });
    });

    // Initialize the view based on the active pill or default to Dashboard
    let initialActivePill = document.querySelector('.nav-pill.active');
    if (!initialActivePill) {
        // If no active pill is set by default, activate the Dashboard
        initialActivePill = document.querySelector('.nav-pill:first-child');
        if (initialActivePill) {
            initialActivePill.classList.remove('inactive');
            initialActivePill.classList.add('active');
        }
    }
    
    if (initialActivePill) {
        const initialPillText = initialActivePill.textContent.trim();
        let initialTargetSectionId;
        switch (initialPillText) {
            case 'Dashboard':
                initialTargetSectionId = 'dashboard';
                break;
            case 'Produtos':
                initialTargetSectionId = 'product-management';
                break;
            case 'Pedidos':
                initialTargetSectionId = 'orders-list';
                break;
            default:
                initialTargetSectionId = 'dashboard';
        }
        activateSection(initialTargetSectionId);
    } else {
        // Fallback if no pills are found (should not happen with current HTML)
        activateSection('dashboard');
    }

});
