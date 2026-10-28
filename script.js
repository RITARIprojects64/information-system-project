document.addEventListener('DOMContentLoaded', () => {

    // 1. ПОШУК ТА ДИНАМІЧНА ФІЛЬТРАЦІЯ З ЛІЧИЛЬНИКОМ
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.getElementById('ordersTableBody');
    const filterToggleBtn = document.getElementById('filterToggleBtn');
    const filterMenu = document.getElementById('filterMenu');
    const filterOptions = document.querySelectorAll('.filter-option');
    const noResultsMsg = document.getElementById('noResultsMsg');
    const ordersCounter = document.getElementById('ordersCounter');

    let currentStatusFilter = 'all';

    // Функція інтерактивного оновлення таблиці
    function filterOrdersTable() {
        if (!tableBody) return;

        const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const rows = tableBody.getElementsByTagName('tr');
        let visibleCount = 0;

        Array.from(rows).forEach(row => {
            const rowText = row.textContent.toLowerCase();
            const statusCell = row.querySelector('.status-badge');
            const rowStatus = statusCell ? statusCell.textContent.trim() : '';

            const matchesSearch = rowText.includes(searchText);
            const matchesStatus = (currentStatusFilter === 'all') || (rowStatus === currentStatusFilter);

            if (matchesSearch && matchesStatus) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        // Реакція на порожні або відсутні результати
        if (visibleCount === 0) {
            if (noResultsMsg) noResultsMsg.style.display = 'block';
        } else {
            if (noResultsMsg) noResultsMsg.style.display = 'none';
        }

        // Оновлення динамічного лічильника записів
        if (ordersCounter) {
            ordersCounter.textContent = `Знайдено: ${visibleCount} замовлень`;
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterOrdersTable);
    }

    if (filterToggleBtn && filterMenu) {
        filterToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            filterMenu.classList.toggle('show');
        });

        filterOptions.forEach(option => {
            option.addEventListener('click', () => {
                filterOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');

                currentStatusFilter = option.getAttribute('data-status');
                filterMenu.classList.remove('show');
                
                filterOrdersTable();
            });
        });

        document.addEventListener('click', (e) => {
            if (!filterMenu.contains(e.target) && e.target !== filterToggleBtn) {
                filterMenu.classList.remove('show');
            }
        });
    }

    // 2. ВІКНО ПІДТВЕРДЖЕННЯ ТА ПОВНИЙ ВИХІД ІЗ САЙТУ
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutModal = document.getElementById('logoutModal');
    const cancelLogout = document.getElementById('cancelLogout');
    const confirmLogout = document.getElementById('confirmLogout');

    if (logoutBtn && logoutModal) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logoutModal.classList.add('show');
        });

        cancelLogout.addEventListener('click', () => {
            logoutModal.classList.remove('show');
        });

        confirmLogout.addEventListener('click', () => {
            window.close();
            window.location.href = 'about:blank';
        });

        logoutModal.addEventListener('click', (e) => {
            if (e.target === logoutModal) {
                logoutModal.classList.remove('show');
            }
        });
    }

});



