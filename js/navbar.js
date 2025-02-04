document.addEventListener('DOMContentLoaded', () => {
  // Handle dropdown toggles
  const dropdownToggles = document.querySelectorAll('.nav-item .dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (event) {
      const currentDropdown = this.nextElementSibling;
      const collapseInstance = bootstrap.Collapse.getOrCreateInstance(currentDropdown);

      if (currentDropdown.classList.contains('show')) {
        collapseInstance.hide();
        event.preventDefault(); // Prevent default link behavior only if toggling the dropdown
      } else {
        const openDropdown = document.querySelector('.dropdown-menu.collapse.show');
        if (openDropdown && openDropdown !== currentDropdown) {
          const openCollapseInstance = bootstrap.Collapse.getInstance(openDropdown);
          openCollapseInstance.hide();
        }
        collapseInstance.show();
        event.preventDefault(); // Prevent default link behavior only if toggling the dropdown
      }
    });
  });

  // Handle navbar toggler
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarContent = document.querySelector('#navbarContent');
  navbarToggler.addEventListener('click', () => {
    if (navbarContent.classList.contains('show')) {
      const collapseInstance = bootstrap.Collapse.getInstance(navbarContent);
      collapseInstance.hide();
    } else {
      const collapseInstance = new bootstrap.Collapse(navbarContent);
      collapseInstance.show();
    }
  });

  // Close navbar when close button is clicked
  const closeNavbarButton = document.querySelector('#closeNavbar');
  if (closeNavbarButton) {
    closeNavbarButton.addEventListener('click', () => {
      const collapseInstance = bootstrap.Collapse.getInstance(navbarContent);
      collapseInstance.hide();
    });
  };

  // Toggle body class for navbar open state
  const navbarCollapse = document.querySelector('.navbar-collapse');
  navbarToggler.addEventListener('click', function() {
    document.body.classList.toggle('navbar-open');
  });

  navbarCollapse.addEventListener('hidden.bs.collapse', function() {
    document.body.classList.remove('navbar-open');
  });

  navbarCollapse.addEventListener('shown.bs.collapse', function() {
    document.body.classList.add('navbar-open');
  });

  // Close navbar when clicking outside
  document.body.addEventListener('click', function(event) {
    if (document.body.classList.contains('navbar-open') && !navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
      navbarCollapse.classList.remove('show');
      document.body.classList.remove('navbar-open');
    }
  });
});