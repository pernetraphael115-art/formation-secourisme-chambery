/* ========================================
   ALPES AGIR — Formation Secourisme Chambéry
   JavaScript — Interactions & Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ===== Header Scroll Effect =====
  const header = document.getElementById('header');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ===== Mobile Menu Toggle =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== Scroll Reveal Animations =====
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger').forEach(el => {
    revealObserver.observe(el);
  });

  // ===== Materiel Tabs =====
  const tabs = document.querySelectorAll('.materiel-tab');
  const contents = document.querySelectorAll('.materiel-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active content
      contents.forEach(c => {
        c.classList.remove('active');
        if (c.id === `tab-${target}`) {
          c.classList.add('active');
          // Re-trigger stagger animation
          c.classList.remove('visible');
          void c.offsetWidth; // Force reflow
          c.classList.add('visible');
        }
      });
    });
  });

  // ===== Formation Tabs (Présentiel / En ligne) =====
  const formationTabs = document.querySelectorAll('.formation-tab');
  const formationContents = document.querySelectorAll('.formation-tab-content');
  const conseilBox = document.getElementById('formation-conseil-enligne');

  formationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.formationTab;

      // Update active tab
      formationTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active content
      formationContents.forEach(c => {
        c.classList.remove('active');
        if (c.id === `tab-${target}`) {
          c.classList.add('active');
          // Re-trigger stagger animation
          c.classList.remove('visible');
          void c.offsetWidth;
          c.classList.add('visible');
        }
      });

      // Show/hide conseil box
      if (conseilBox) {
        conseilBox.style.display = target === 'enligne' ? 'block' : 'none';
      }
    });
  });

  // ===== FAQ Accordion =====
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ===== Contact Form Handler =====
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const nom = formData.get('nom');
      const email = formData.get('email');
      const telephone = formData.get('telephone') || 'Non renseigné';
      const entreprise = formData.get('entreprise') || 'Non renseignée';
      const formation = formData.get('formation');
      const message = formData.get('message');

      // Compose email body
      const body = `Nom : ${nom}%0D%0AEmail : ${email}%0D%0ATéléphone : ${telephone}%0D%0AEntreprise : ${entreprise}%0D%0AFormation souhaitée : ${formation}%0D%0A%0D%0AMessage :%0D%0A${message}`;
      const subject = `Demande de devis - ${formation} - ${nom}`;

      // Open mailto
      window.location.href = `mailto:alpes.agir@gmail.com?subject=${encodeURIComponent(subject)}&body=${body.replace(/ /g, '%20')}`;

      // Show success feedback
      const submitBtn = this.querySelector('.form-submit .btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '✓ Email ouvert — Merci !';
      submitBtn.style.background = 'linear-gradient(135deg, #2A9D8F, #1A7A6E)';
      submitBtn.style.boxShadow = '0 4px 16px rgba(42, 157, 143, 0.35)';

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.boxShadow = '';
      }, 3000);
    });
  }

  // ===== Active Nav Link Highlighting =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const highlightNav = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--clr-white)';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ===== Modal Devis =====
  const devisModal = document.getElementById('devisModal');
  const modalClose = document.getElementById('modalClose');
  const modalFormState = document.getElementById('modalFormState');
  const modalSuccessState = document.getElementById('modalSuccessState');
  const modalFormation = document.getElementById('modalFormation');
  const devisForm = document.getElementById('devisForm');
  const modalSuccessClose = document.getElementById('modalSuccessClose');

  // Open modal
  const openModal = (formationName) => {
    modalFormation.textContent = formationName;
    modalFormState.style.display = 'block';
    modalSuccessState.style.display = 'none';
    devisForm.reset();
    devisModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    devisModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Attach triggers to all devis-trigger links
  document.querySelectorAll('.devis-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      // Find formation name from closest card
      const card = trigger.closest('.formation-card');
      const formationName = card ? card.querySelector('h3').textContent : 'Formation';
      openModal(formationName);
    });
  });

  // Close button
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalSuccessClose) modalSuccessClose.addEventListener('click', closeModal);

  // Close on overlay click
  if (devisModal) {
    devisModal.addEventListener('click', (e) => {
      if (e.target === devisModal) closeModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && devisModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Form submission
  if (devisForm) {
    devisForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(devisForm);
      const nom = formData.get('nom');
      const email = formData.get('email');
      const telephone = formData.get('telephone') || 'Non renseigné';
      const entreprise = formData.get('entreprise') || 'Non renseignée';
      const participants = formData.get('participants') || 'Non précisé';
      const message = formData.get('message') || 'Aucun message';
      const formation = modalFormation.textContent;

      // Compose email
      const subject = `Demande de devis — ${formation} — ${nom}`;
      const body = [
        `Nom : ${nom}`,
        `Email : ${email}`,
        `Téléphone : ${telephone}`,
        `Entreprise : ${entreprise}`,
        `Formation souhaitée : ${formation}`,
        `Nombre de participants : ${participants}`,
        '',
        `Message :`,
        message
      ].join('%0D%0A');

      window.location.href = `mailto:alpes.agir@gmail.com?subject=${encodeURIComponent(subject)}&body=${body.replace(/ /g, '%20')}`;

      // Show success state
      modalFormState.style.display = 'none';
      modalSuccessState.style.display = 'block';
    });
  }

  // ===== Payment Modal (Demo) =====
  const paymentModal = document.getElementById('paymentModal');
  const paymentModalClose = document.getElementById('paymentModalClose');
  const paymentFormState = document.getElementById('paymentFormState');
  const paymentProcessingState = document.getElementById('paymentProcessingState');
  const paymentSuccessState = document.getElementById('paymentSuccessState');
  const paymentFormationName = document.getElementById('paymentFormationName');
  const paymentPrice = document.getElementById('paymentPrice');
  const paymentTotal = document.getElementById('paymentTotal');
  const paymentBtnAmount = document.getElementById('paymentBtnAmount');
  const paymentForm = document.getElementById('paymentForm');
  const paymentSuccessClose = document.getElementById('paymentSuccessClose');
  const paymentRef = document.getElementById('paymentRef');
  const paymentReceiptAmount = document.getElementById('paymentReceiptAmount');

  // Open payment modal
  const openPaymentModal = (formationName, price) => {
    paymentFormationName.textContent = formationName;
    const priceStr = price + ' €';
    paymentPrice.textContent = priceStr;
    paymentTotal.textContent = priceStr;
    paymentBtnAmount.textContent = priceStr;
    paymentReceiptAmount.textContent = priceStr;
    paymentFormState.style.display = 'block';
    paymentProcessingState.style.display = 'none';
    paymentSuccessState.style.display = 'none';
    paymentForm.reset();
    paymentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Close payment modal
  const closePaymentModal = () => {
    paymentModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Attach triggers
  document.querySelectorAll('.payment-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const card = trigger.closest('.formation-card');
      const formationName = card ? card.querySelector('h3').textContent : 'Formation';
      const price = trigger.dataset.price || '19,50';
      openPaymentModal(formationName, price);
    });
  });

  // Close buttons
  if (paymentModalClose) paymentModalClose.addEventListener('click', closePaymentModal);
  if (paymentSuccessClose) paymentSuccessClose.addEventListener('click', closePaymentModal);

  // Close on overlay click
  if (paymentModal) {
    paymentModal.addEventListener('click', (e) => {
      if (e.target === paymentModal) closePaymentModal();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && paymentModal.classList.contains('active')) {
      closePaymentModal();
    }
  });

  // Auto-format card number (XXXX XXXX XXXX XXXX)
  const cardInput = document.getElementById('pay-card');
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
      e.target.value = val;
    });
  }

  // Auto-format expiry (MM / AA)
  const expiryInput = document.getElementById('pay-expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 3) {
        val = val.substring(0, 2) + ' / ' + val.substring(2);
      }
      e.target.value = val;
    });
  }

  // Payment form submit (demo)
  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show processing
      paymentFormState.style.display = 'none';
      paymentProcessingState.style.display = 'block';

      // Generate fake reference
      const ref = 'ALG-2025-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      paymentRef.textContent = ref;

      // Simulate processing delay
      setTimeout(() => {
        paymentProcessingState.style.display = 'none';
        paymentSuccessState.style.display = 'block';
      }, 2000);
    });
  }
});
