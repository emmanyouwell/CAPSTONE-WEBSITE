export function initializeWaves() {
    if (typeof Waves !== 'undefined') {
        Waves.attach(
            ".btn[class*='btn-']:not(.position-relative):not([class*='btn-outline-']):not([class*='btn-label-'])",
            ['waves-light']
        );
        Waves.attach("[class*='btn-outline-']:not(.position-relative)");
        Waves.attach('.pagination .page-item .page-link');
        Waves.attach('.dropdown-menu .dropdown-item');
        Waves.attach('.light-style .list-group .list-group-item-action');
        Waves.attach('.dark-style .list-group .list-group-item-action', ['waves-light']);
        Waves.attach('.nav-tabs:not(.nav-tabs-widget) .nav-item .nav-link');
        Waves.attach('.nav-pills .nav-item .nav-link', ['waves-light']);
        Waves.attach('.menu-vertical .menu-item .menu-link.menu-toggle');
    }
}

export function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

export function initializeAccordion() {
    const accordionTriggerList = [].slice.call(document.querySelectorAll('.accordion'));
    accordionTriggerList.map(function (accordionTriggerEl) {
        accordionTriggerEl.addEventListener('show.bs.collapse', accordionActiveFunction);
        accordionTriggerEl.addEventListener('hide.bs.collapse', accordionActiveFunction);
    });

    function accordionActiveFunction(e) {
        if (e.type == 'show.bs.collapse') {
            e.target.closest('.accordion-item')?.classList.add('active');
            e.target.closest('.accordion-item')?.previousElementSibling?.classList.add('previous-active');
        } else {
            e.target.closest('.accordion-item')?.classList.remove('active');
            e.target.closest('.accordion-item')?.previousElementSibling?.classList.remove('previous-active');
        }
    }
}

export function initializeHelpers() {
    if (window.Helpers) {
        window.Helpers.initPasswordToggle();
        window.Helpers.initSpeechToText();
        window.Helpers.navTabsAnimation();
    }
}
export function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.classList.toggle('show');
            const menu = this.nextElementSibling;
            if (menu) {
                menu.classList.toggle('show');
            }
        });
    });
}

export function initializeTemplateScripts() {
    initializeWaves();
    initializeTooltips();
    initializeAccordion();
    initializeDropdowns();  // Add dropdown initialization here
    initializeHelpers();
    console.log("Template scripts initialized");
}
