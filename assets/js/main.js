/**
 * FIRST STEPS — Pediatric Clinic & Child Wellness Brand
 * Main Interactive Logic & Client Behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
  try { initThemeToggle(); } catch (err) { console.error('Theme toggle error:', err); }
  try { initRtlToggle(); } catch (err) { console.error('RTL toggle error:', err); }
  try { initMobileNav(); } catch (err) { console.error('Mobile nav error:', err); }
  try { initAppointmentModal(); } catch (err) { console.error('Appointment modal error:', err); }
  try { initGrowthChart(); } catch (err) { console.error('Growth chart error:', err); }
  try { initVaccinationFilter(); } catch (err) { console.error('Vaccination filter error:', err); }
  try { initAuthTabs(); } catch (err) { console.error('Auth tabs error:', err); }
  try { initSymptomChecker(); } catch (err) { console.error('Symptom checker error:', err); }
  try { initBlogReader(); } catch (err) { console.error('Blog reader error:', err); }
  try { initBlogDetailsPage(); } catch (err) { console.error('Blog details error:', err); }
  try { initInsightsPage(); } catch (err) { console.error('Insights page error:', err); }
  try { initHeroCareCompass(); } catch (err) { console.error('Hero compass error:', err); }
  try { initPatientDepartureVideo(); } catch (err) { console.error('Video error:', err); }
  try { initFormSmartValidation(); } catch (err) { console.error('Form validation error:', err); }
  try { initDashboardAppointments(); } catch (err) { console.error('Dashboard appointments error:', err); }
});

/* ==========================================================================
   THEME TOGGLE (CALM EVENING DARK MODE)
   ========================================================================== */
function initThemeToggle() {
  const MOON_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  const SUN_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';

  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('fs-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  function updateThemeIcons(theme) {
    themeToggles.forEach(btn => {
      btn.innerHTML = theme === 'dark' ? SUN_ICON : MOON_ICON;
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to gentle light mode' : 'Switch to calm evening mode');
    });
  }

  updateThemeIcons(currentTheme);

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('fs-theme', nextTheme);
      updateThemeIcons(nextTheme);
    });
  });
}

/* ==========================================================================
   RTL TOGGLE (RIGHT-TO-LEFT LAYOUT TOGGLE)
   ========================================================================== */
function initRtlToggle() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  const storedDir = localStorage.getItem('fs-dir') || 'ltr';
  
  document.documentElement.setAttribute('dir', storedDir);
  updateRtlButtons(storedDir);

  rtlToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', nextDir);
      localStorage.setItem('fs-dir', nextDir);
      updateRtlButtons(nextDir);
    });
  });

  function updateRtlButtons(dir) {
    rtlToggles.forEach(btn => {
      if (dir === 'rtl') {
        btn.textContent = 'LTR';
        btn.setAttribute('aria-label', 'Switch to Left-to-Right layout');
        btn.classList.add('active');
      } else {
        btn.textContent = 'RTL';
        btn.setAttribute('aria-label', 'Switch to Right-to-Left layout');
        btn.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const MENU_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
  const CLOSE_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

  if (toggleBtn && navLinks) {
    toggleBtn.innerHTML = MENU_ICON;
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('show');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.innerHTML = isOpen ? CLOSE_ICON : MENU_ICON;
    });

    // Close when clicking an anchor
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        if (toggleBtn) {
          toggleBtn.setAttribute('aria-expanded', 'false');
          toggleBtn.innerHTML = MENU_ICON;
        }
      });
    });
  }
}

/* ==========================================================================
   APPOINTMENT MODAL & BOOKING FLOW
   ========================================================================== */
function initAppointmentModal() {
  const modal = document.getElementById('appointmentModal');
  const openButtons = document.querySelectorAll('[data-open-appointment]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  const bookingForm = document.getElementById('bookingModalForm');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const servicePreset = btn.getAttribute('data-service-preset');
      const doctorPreset = btn.getAttribute('data-doctor-preset');
      
      if (servicePreset && document.getElementById('modalServiceSelect')) {
        document.getElementById('modalServiceSelect').value = servicePreset;
      }
      if (doctorPreset && document.getElementById('modalDoctorSelect')) {
        document.getElementById('modalDoctorSelect').value = doctorPreset;
      }

      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
    });
  });

  // Light dismiss on backdrop click
  modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  });

    // Handle Booking submission with strict validation
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = bookingForm.querySelector('.name-input, input[name="childName"], input[id*="Child"], input[id*="Name"]');
      const phoneInput = bookingForm.querySelector('.phone-input, input[type="tel"], input[name="parentPhone"], input[id*="Phone"]');
      const dobInput = bookingForm.querySelector('.dob-input, input[name="childDOB"], input[id*="DOB"]');
      const ageInput = bookingForm.querySelector('.age-input, input[name="childAge"], input[id*="Age"]');

      let hasError = false;

      // 1. Validate Child Name (letters only, no numbers)
      if (nameInput) {
        const val = nameInput.value.trim();
        if (/[0-9]/.test(val)) {
          showFieldNotice(nameInput, 'Child name accepts letters only (no numbers).');
          nameInput.focus();
          hasError = true;
        } else if (val.length < 2) {
          showFieldNotice(nameInput, 'Please enter a valid child name.');
          nameInput.focus();
          hasError = true;
        }
      }

      // 2. Validate Contact Phone (digits only, no letters, at least 10 digits)
      if (phoneInput && !hasError) {
        const digits = phoneInput.value.replace(/\D/g, '');
        if (/[a-zA-Z]/.test(phoneInput.value)) {
          showFieldNotice(phoneInput, 'Phone number accepts digits only (no letters).');
          phoneInput.focus();
          hasError = true;
        } else if (digits.length < 10) {
          showFieldNotice(phoneInput, 'Please enter a valid 10-digit phone number.');
          phoneInput.focus();
          hasError = true;
        }
      }

      // 3. Validate Date of Birth (cannot be future)
      if (dobInput && !hasError) {
        if (!dobInput.value) {
          showFieldNotice(dobInput, 'Please select child’s date of birth.');
          dobInput.focus();
          hasError = true;
        } else {
          const pickedDate = new Date(dobInput.value + 'T00:00:00');
          const now = new Date();
          now.setHours(23, 59, 59, 999);
          if (pickedDate > now) {
            showFieldNotice(dobInput, 'Date of birth cannot be in the future.');
            dobInput.focus();
            hasError = true;
          }
        }
      }

      // 4. Validate Child Age (must include numeric units, e.g. 14 Months)
      if (ageInput && !hasError) {
        const val = ageInput.value.trim();
        if (!val || (!/\d/.test(val) && !/newborn/i.test(val))) {
          showFieldNotice(ageInput, 'Please enter a valid age (e.g. 14 Months, 2 Years).');
          ageInput.focus();
          hasError = true;
        }
      }

      if (hasError) return;

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      
      submitBtn.innerText = 'Confirming Appointment...';
      submitBtn.disabled = true;

      setTimeout(() => {
        const childNameVal = nameInput ? nameInput.value.trim() : 'Your Child';
        const docVal = bookingForm.querySelector('#modalDoctorSelect') ? bookingForm.querySelector('#modalDoctorSelect').value : 'Dr. Maya Carter, MD (Lead)';
        const dateVal = bookingForm.querySelector('input[type="date"]:not(.dob-input)') ? bookingForm.querySelector('input[type="date"]:not(.dob-input)').value : '2026-10-18';
        const phoneVal = phoneInput ? phoneInput.value.trim() : '';
        const dobVal = dobInput ? dobInput.value : '';
        const ageVal = ageInput ? ageInput.value.trim() : '';
        const serviceSelect = bookingForm.querySelector('#modalServiceSelect');
        const serviceText = serviceSelect && serviceSelect.selectedIndex >= 0 ? serviceSelect.options[serviceSelect.selectedIndex].text : 'Comprehensive Well-Child Visit';

        const apptObj = {
          id: 'FS-' + Math.floor(100000 + Math.random() * 900000),
          childName: childNameVal,
          parentPhone: phoneVal,
          dob: dobVal,
          age: ageVal,
          service: serviceText,
          doctor: docVal,
          date: dateVal,
          time: '10:30 AM',
          status: 'Confirmed',
          timestamp: Date.now()
        };
        saveBookedAppointment(apptObj);

        bookingForm.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem; color: var(--text-main);">
            <div style="width: 64px; height: 64px; background: var(--brand-lavender); color: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; font-size: 2rem;">✓</div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; font-family: var(--font-heading); color: var(--text-main);">Appointment Confirmed!</h3>
            <p style="color: var(--text-muted); margin-bottom: 1.5rem;">We have reserved a gentle consultation for <strong>${childNameVal}</strong>. A confirmation email and SMS reminder have been sent to your family.</p>
            <div class="booking-confirmed-details-card">
              <strong class="clinic-confirmed-title">First Steps Family Clinic</strong>
              <div class="clinic-confirmed-doc">${docVal} • Pediatric Wellness Center</div>
              <div class="clinic-confirmed-meta" style="margin-top: 0.35rem; font-size: 0.9rem;">Date: <strong>${dateVal}</strong> • Reference: <strong>#${apptObj.id}</strong></div>
              <div class="clinic-confirmed-arrival" style="margin-top: 0.35rem;">Arrival: 10 mins prior for gentle play check-in</div>
            </div>
            <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
              <a href="dashboard.html" class="btn btn-primary">View in Family Dashboard →</a>
              <button class="btn btn-secondary" onclick="document.getElementById('appointmentModal').close(); location.reload();">Done &amp; Return</button>
            </div>
          </div>
        `;
      }, 900);
    });
  }
}

/* ==========================================================================
   APPOINTMENT PERSISTENCE & DASHBOARD INTEGRATION
   ========================================================================== */
function saveBookedAppointment(appt) {
  try {
    const existing = JSON.parse(localStorage.getItem('fs_booked_appointments') || '[]');
    existing.unshift(appt);
    localStorage.setItem('fs_booked_appointments', JSON.stringify(existing));
    localStorage.setItem('fs_latest_appointment', JSON.stringify(appt));
  } catch (err) {
    console.error('Error saving appointment:', err);
  }
}

function getDoctorAvatar(doctorName) {
  if (!doctorName) return 'assets/images/avatar_dashboard_dr_carter.jpg';
  const name = doctorName.toLowerCase();
  if (name.includes('carter')) return 'assets/images/avatar_dashboard_dr_carter.jpg';
  if (name.includes('reed')) return 'assets/images/doc_julian_reed.jpg';
  if (name.includes('miller')) return 'assets/images/doc_ethan_miller.jpg';
  if (name.includes('sharma')) return 'assets/images/doc_ananya_sharma.jpg';
  if (name.includes('rostov')) return 'assets/images/doc_elena_rostova.jpg';
  if (name.includes('bennett')) return 'assets/images/doc_clara_bennett.jpg';
  if (name.includes('vance')) return 'assets/images/doc_marcus_vance.jpg';
  if (name.includes('laurent')) return 'assets/images/doc_chloe_laurent.jpg';
  return 'assets/images/avatar_dashboard_dr_carter.jpg';
}

function formatDateReadable(dateStr) {
  if (!dateStr) return 'Upcoming Opening';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    if (!isNaN(d.getTime())) {
      const day = d.getDate();
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return `${day} ${monthNames[d.getMonth()]}`;
    }
  }
  return dateStr;
}

function cancelBookedVisit(id) {
  if (!confirm('Are you sure you want to cancel this scheduled visit?')) return;
  let appointments = JSON.parse(localStorage.getItem('fs_booked_appointments') || '[]');
  appointments = appointments.filter(a => a.id !== id);
  localStorage.setItem('fs_booked_appointments', JSON.stringify(appointments));
  location.reload();
}

function initDashboardAppointments() {
  const overviewCol = document.getElementById('overview');
  if (!overviewCol) return; // Only execute on dashboard page

  const appointments = JSON.parse(localStorage.getItem('fs_booked_appointments') || '[]');
  if (!appointments || appointments.length === 0) return;

  const nextAppt = appointments[0]; // Most recent active appointment
  const banner = overviewCol.querySelector('.appointment-banner');
  if (banner) {
    const avatarImg = banner.querySelector('.appt-doctor-info img');
    if (avatarImg) {
      avatarImg.src = getDoctorAvatar(nextAppt.doctor);
      avatarImg.alt = nextAppt.doctor;
    }

    const details = banner.querySelector('.appt-details');
    if (details) {
      details.innerHTML = `
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <span style="background: var(--surface-white); border: 1.5px solid var(--border-blush); padding: 0.2rem 0.65rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; color: var(--brand-lavender-dark); text-transform: uppercase;">
            🟢 Confirmed Upcoming Visit
          </span>
          <span style="background: rgba(16, 185, 129, 0.12); color: #047857; border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.2rem 0.65rem; border-radius: 9999px; font-size: 0.72rem; font-weight: 700;">
            Booked Online • Ref #${nextAppt.id}
          </span>
        </div>
        <h3 style="margin-top: 0.4rem; color: var(--text-main);">NEXT APPOINTMENT</h3>
        <p>
          <strong>${nextAppt.doctor}</strong> • Pediatric Specialist<br>
          <span style="color: var(--text-main); font-weight: 600;">Patient:</span> ${nextAppt.childName} ${nextAppt.age ? '(' + nextAppt.age + ')' : ''} • 
          <span style="color: var(--text-muted);">${nextAppt.service || 'Comprehensive Well-Child Visit'}</span>
        </p>
      `;
    }

    const timeBadge = banner.querySelector('.appt-time-badge');
    if (timeBadge) {
      const dateEl = timeBadge.querySelector('.date');
      const timeEl = timeBadge.querySelector('.time');
      if (dateEl) dateEl.textContent = formatDateReadable(nextAppt.date);
      if (timeEl) timeEl.textContent = nextAppt.time || '10:30 AM';
    }
  }

  // Display structured list of all booked family visits
  let listContainer = document.getElementById('bookedAppointmentsContainer');
  if (!listContainer) {
    listContainer = document.createElement('div');
    listContainer.id = 'bookedAppointmentsContainer';
    listContainer.style.marginTop = '1.5rem';
    overviewCol.appendChild(listContainer);
  }

  listContainer.style.display = 'block';
  listContainer.innerHTML = `
    <div class="dash-card" style="border: 2px solid var(--brand-lavender); box-shadow: var(--shadow-sm);">
      <div class="dash-card-header" style="margin-bottom: 1rem;">
        <div>
          <h2 class="dash-card-title"><span>🗓️</span> Your Booked Clinic Visits (${appointments.length})</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.15rem;">Live scheduled visits synced across your family account.</p>
        </div>
        <button class="btn btn-secondary btn-sm" data-open-appointment>+ Book Another Visit</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.85rem;">
        ${appointments.map((appt, idx) => `
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem; background: var(--bg-primary); border-radius: var(--radius-md); border: 1.5px solid var(--border-blush); flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <img src="${getDoctorAvatar(appt.doctor)}" alt="${appt.doctor}" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid var(--surface-white); flex-shrink: 0;">
              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <strong style="color: var(--text-main); font-size: 0.95rem;">${appt.childName}</strong>
                  <span style="font-size: 0.75rem; background: var(--surface-white); padding: 0.15rem 0.5rem; border-radius: 999px; border: 1px solid var(--border-blush); color: var(--text-muted);">${appt.age || 'Child'}</span>
                  ${idx === 0 ? '<span style="font-size: 0.7rem; font-weight: 700; color: #047857; background: #E6F4EA; padding: 0.15rem 0.45rem; border-radius: 999px;">Next Visit</span>' : ''}
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
                  ${appt.doctor} • <span style="color: var(--brand-lavender-dark); font-weight: 600;">${appt.service || 'Pediatric Consultation'}</span>
                </div>
                <div style="font-size: 0.78rem; color: var(--text-light); margin-top: 0.15rem;">
                  Ref #${appt.id} • Parent Contact: ${appt.parentPhone || '(Verified)'}
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 1.25rem;">
              <div style="text-align: right;">
                <div style="font-weight: 800; color: var(--text-main); font-size: 0.95rem;">${formatDateReadable(appt.date)}</div>
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--brand-lavender-dark);">${appt.time || '10:30 AM'}</div>
              </div>
              <button class="btn btn-white btn-sm" onclick="cancelBookedVisit('${appt.id}')" style="color: #E11D48; border-color: rgba(225, 29, 72, 0.3);" title="Cancel this appointment">✕ Cancel</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ==========================================================================
   SMART CLINIC FORM VALIDATION (NAME LETTERS ONLY, PHONE DIGITS ONLY, DOB/AGE SYNC)
   ========================================================================== */
function calculatePediatricAge(birthDateStr) {
  if (!birthDateStr) return '';
  const parts = birthDateStr.split('-');
  if (parts.length !== 3) return '';
  const birthDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(birthDate.getTime()) || birthDate > today) return '';

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += prevMonthDays;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = today.getTime() - birthDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (years === 0 && months === 0) {
    if (diffDays <= 0) return 'Newborn (Today)';
    if (diffDays === 1) return '1 Day';
    if (diffDays < 7) return `${diffDays} Days`;
    const weeks = Math.floor(diffDays / 7);
    const remDays = diffDays % 7;
    return remDays > 0 ? `${weeks} Weeks, ${remDays} Days` : `${weeks} Weeks`;
  } else if (years === 0) {
    return months === 1 ? '1 Month' : `${months} Months`;
  } else if (years === 1) {
    const totalMonths = 12 + months;
    return `${totalMonths} Months`;
  } else if (years < 3) {
    return months > 0 ? `${years} Years, ${months} Mo` : `${years} Years`;
  } else {
    return `${years} Years`;
  }
}

function showFieldNotice(inputEl, msg) {
  if (!inputEl) return;
  const formGroup = inputEl.closest('.form-group') || inputEl.parentElement;
  if (!formGroup) return;
  let notice = formGroup.querySelector('.form-field-error');
  if (!notice) {
    notice = document.createElement('div');
    notice.className = 'form-field-error';
    formGroup.appendChild(notice);
  }
  notice.textContent = '⚠️ ' + msg;
  inputEl.classList.add('is-invalid');

  clearTimeout(inputEl._noticeTimer);
  inputEl._noticeTimer = setTimeout(() => {
    removeFieldNotice(inputEl);
  }, 4000);
}
window.showFieldNotice = showFieldNotice;

function removeFieldNotice(inputEl) {
  if (!inputEl) return;
  const formGroup = inputEl.closest('.form-group') || inputEl.parentElement;
  if (!formGroup) return;
  const notice = formGroup.querySelector('.form-field-error');
  if (notice) notice.remove();
  inputEl.classList.remove('is-invalid');
}
window.removeFieldNotice = removeFieldNotice;

// Helper detectors for form fields
function isNameField(el) {
  if (!el || el.tagName !== 'INPUT' || el.readOnly || el.disabled) return false;
  const type = (el.type || '').toLowerCase();
  if (['email', 'password', 'hidden', 'checkbox', 'radio', 'date', 'tel', 'number'].includes(type)) return false;
  const cls = (el.className || '').toLowerCase();
  const name = (el.name || '').toLowerCase();
  const id = (el.id || '').toLowerCase();
  const placeholder = (el.placeholder || '').toLowerCase();
  return cls.includes('name-input') ||
         name.includes('name') ||
         name.includes('parent') ||
         name.includes('child') ||
         name.includes('guardian') ||
         id.includes('name') ||
         id.includes('parent') ||
         id.includes('child') ||
         placeholder.includes('name') ||
         placeholder.includes('carter') ||
         placeholder.includes('miller');
}

function isDateField(el) {
  if (!el || el.tagName !== 'INPUT' || el.readOnly || el.disabled) return false;
  const type = (el.type || '').toLowerCase();
  if (type === 'date') return true;
  const cls = (el.className || '').toLowerCase();
  const name = (el.name || '').toLowerCase();
  const id = (el.id || '').toLowerCase();
  return cls.includes('dob-input') || name.includes('dob') || id.includes('dob') ||
         name.includes('date') || id.includes('date');
}

function isDOBField(el) {
  if (!el || el.tagName !== 'INPUT') return false;
  const cls = (el.className || '').toLowerCase();
  const name = (el.name || '').toLowerCase();
  const id = (el.id || '').toLowerCase();
  return cls.includes('dob-input') || name.includes('dob') || id.includes('dob') ||
         name.includes('birth') || id.includes('birth');
}

function isPhoneField(el) {
  if (!el || el.tagName !== 'INPUT' || el.readOnly || el.disabled) return false;
  const type = (el.type || '').toLowerCase();
  if (type === 'tel') return true;
  const cls = (el.className || '').toLowerCase();
  const name = (el.name || '').toLowerCase();
  const id = (el.id || '').toLowerCase();
  return cls.includes('phone-input') || name.includes('phone') || id.includes('phone') ||
         name.includes('mobile') || id.includes('mobile');
}

function isAgeField(el) {
  if (!el || el.tagName !== 'INPUT' || el.readOnly || el.disabled) return false;
  const cls = (el.className || '').toLowerCase();
  const name = (el.name || '').toLowerCase();
  const id = (el.id || '').toLowerCase();
  return cls.includes('age-input') || name.includes('age') || id.includes('age');
}

/* ==========================================================================
   SMART FORM VALIDATION & REAL-TIME GUARDS ACROSS ALL PAGES
   - Name fields strictly reject digits (real-time keydown, paste, and sanitizing)
   - Date fields strictly reject words/letters (real-time keydown, paste, and calendar picker)
   - Phone fields strictly reject letters
   - DOB fields auto-calculate child age and prevent future dates
   ========================================================================== */
function initFormSmartValidation() {
  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Enforce max date (cannot be future) on all DOB inputs
  document.querySelectorAll('input[type="date"], .dob-input, input[id*="DOB"], input[name*="DOB"]').forEach(dob => {
    if (isDOBField(dob)) {
      dob.setAttribute('max', todayStr);
    }
  });

  // 2. Global Real-time Keyboard Guard (keydown)
  document.addEventListener('keydown', (e) => {
    const el = e.target;
    if (!el || el.tagName !== 'INPUT') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return; // Allow keyboard shortcuts (Ctrl+A, Ctrl+C, etc.)

    // (A) NAME FIELDS: Strictly block number keys (0-9 on top row & numpad)
    if (isNameField(el)) {
      if ((e.key >= '0' && e.key <= '9') || (e.code && e.code.startsWith('Numpad') && /Numpad[0-9]/.test(e.code))) {
        e.preventDefault();
        showFieldNotice(el, 'Name fields accept letters only (no numbers).');
      }
    }

    // (B) DATE FIELDS: Strictly block alphabetic letters (no words like "today", "august")
    if (isDateField(el)) {
      if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        showFieldNotice(el, 'Date fields accept calendar dates only (no words or letters).');
      }
    }

    // (C) PHONE FIELDS: Strictly block letters
    if (isPhoneField(el)) {
      if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        showFieldNotice(el, 'Phone numbers accept digits only (no letters).');
      }
    }
  });

  // 3. Global beforeinput guard for mobile & IME
  document.addEventListener('beforeinput', (e) => {
    const el = e.target;
    if (!el || el.tagName !== 'INPUT' || !e.data) return;

    if (isNameField(el) && /[0-9]/.test(e.data)) {
      e.preventDefault();
      showFieldNotice(el, 'Name fields accept letters only (no numbers).');
    }

    if (isDateField(el) && /[a-zA-Z]/.test(e.data)) {
      e.preventDefault();
      showFieldNotice(el, 'Date fields accept calendar dates only (no words or letters).');
    }

    if (isPhoneField(el) && /[a-zA-Z]/.test(e.data)) {
      e.preventDefault();
      showFieldNotice(el, 'Phone numbers accept digits only (no letters).');
    }
  });

  // 4. Global paste guard
  document.addEventListener('paste', (e) => {
    const el = e.target;
    if (!el || el.tagName !== 'INPUT') return;
    const pastedText = (e.clipboardData || window.clipboardData)?.getData('text') || '';

    if (isNameField(el) && /[0-9]/.test(pastedText)) {
      e.preventDefault();
      const cleaned = pastedText.replace(/[0-9]/g, '');
      if (document.queryCommandSupported && document.queryCommandSupported('insertText')) {
        document.execCommand('insertText', false, cleaned);
      } else {
        el.value = (el.value || '') + cleaned;
      }
      showFieldNotice(el, 'Numbers removed from pasted name (letters only).');
    }

    if (isDateField(el) && /[a-zA-Z]/.test(pastedText)) {
      e.preventDefault();
      const cleaned = pastedText.replace(/[a-zA-Z]/g, '');
      if (cleaned) {
        if (document.queryCommandSupported && document.queryCommandSupported('insertText')) {
          document.execCommand('insertText', false, cleaned);
        } else {
          el.value = cleaned;
        }
      }
      showFieldNotice(el, 'Words removed from date (digits and calendar picker only).');
    }

    if (isPhoneField(el) && /[a-zA-Z]/.test(pastedText)) {
      e.preventDefault();
      const cleaned = pastedText.replace(/[a-zA-Z]/g, '');
      if (document.queryCommandSupported && document.queryCommandSupported('insertText')) {
        document.execCommand('insertText', false, cleaned);
      } else {
        el.value = (el.value || '') + cleaned;
      }
      showFieldNotice(el, 'Letters removed from phone number (digits only).');
    }
  });

  // 5. Global input sanitizer
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (!el || el.tagName !== 'INPUT') return;

    if (isNameField(el)) {
      const orig = el.value;
      const cleaned = orig.replace(/[0-9]/g, '');
      if (orig !== cleaned) {
        el.value = cleaned;
        showFieldNotice(el, 'Numbers removed from name (letters only).');
      } else if (cleaned.trim().length >= 2) {
        removeFieldNotice(el);
      }
    }

    if (isDateField(el)) {
      const orig = el.value;
      const cleaned = orig.replace(/[a-zA-Z]/g, '');
      if (orig !== cleaned) {
        el.value = cleaned;
        showFieldNotice(el, 'Words removed from date (digits and calendar only).');
      } else if (cleaned) {
        removeFieldNotice(el);
      }
    }

    if (isPhoneField(el)) {
      const orig = el.value;
      const cleaned = orig.replace(/[a-zA-Z]/g, '');
      if (orig !== cleaned) {
        el.value = cleaned;
        showFieldNotice(el, 'Letters removed from phone number (digits only).');
      } else {
        const digits = cleaned.replace(/\D/g, '');
        if (digits.length >= 10) {
          removeFieldNotice(el);
        }
      }
    }

    if (isAgeField(el)) {
      const val = el.value.trim();
      if (val.length > 0 && !/\d/.test(val) && !/newborn/i.test(val)) {
        showFieldNotice(el, 'Age must include numbers (e.g. 14 Months, 2 Years) or select DOB.');
      } else {
        removeFieldNotice(el);
      }
    }
  });

  // 6. Global DOB change listener to auto-calculate child age and validate date
  document.addEventListener('change', (e) => {
    const el = e.target;
    if (!el || el.tagName !== 'INPUT') return;

    if (isDOBField(el)) {
      const val = el.value;
      if (!val) return;

      const pickedDate = new Date(val + 'T00:00:00');
      const now = new Date();
      now.setHours(23, 59, 59, 999);

      if (pickedDate > now) {
        el.classList.add('is-invalid');
        showFieldNotice(el, 'Date of birth cannot be in the future.');
        return;
      }

      el.classList.remove('is-invalid');
      removeFieldNotice(el);

      const form = el.closest('form') || document;
      const ageInput = form.querySelector('.age-input, input[id*="Age" i], input[name*="Age" i]');
      if (ageInput) {
        const ageStr = calculatePediatricAge(val);
        if (ageStr) {
          ageInput.value = ageStr;
          ageInput.classList.remove('is-invalid');
          ageInput.classList.add('auto-calculated');
          removeFieldNotice(ageInput);
        }
      }
    }
  });

  // 7. Global Form Submit Guard (Ensures zero numbers in names, zero words in dates on submit)
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (!form || form.tagName !== 'FORM') return;

    const allInputs = form.querySelectorAll('input');
    for (const input of allInputs) {
      if (isNameField(input)) {
        const val = input.value.trim();
        if (/[0-9]/.test(val)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          showFieldNotice(input, 'Name accepts letters only (no numbers).');
          input.focus();
          return;
        }
        if (input.required && val.length < 2) {
          e.preventDefault();
          e.stopImmediatePropagation();
          showFieldNotice(input, 'Please enter a valid name (letters only).');
          input.focus();
          return;
        }
      }

      if (isDateField(input)) {
        const val = input.value.trim();
        if (/[a-zA-Z]/.test(val)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          showFieldNotice(input, 'Date cannot contain words or letters.');
          input.focus();
          return;
        }
        if (isDOBField(input) && val) {
          const picked = new Date(val + 'T00:00:00');
          const now = new Date();
          now.setHours(23, 59, 59, 999);
          if (picked > now) {
            e.preventDefault();
            e.stopImmediatePropagation();
            showFieldNotice(input, 'Date of birth cannot be in the future.');
            input.focus();
            return;
          }
        }
      }

      if (isPhoneField(input)) {
        const digits = input.value.replace(/\D/g, '');
        if (/[a-zA-Z]/.test(input.value)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          showFieldNotice(input, 'Phone number accepts digits only (no letters).');
          input.focus();
          return;
        }
        if (input.required && digits.length < 10) {
          e.preventDefault();
          e.stopImmediatePropagation();
          showFieldNotice(input, 'Please enter a valid 10-digit phone number.');
          input.focus();
          return;
        }
      }
    }
  }, true);
}

/* ==========================================================================
   CONTACT FORM SUBMISSION HANDLER (contact.html)
   ========================================================================== */
window.handleContactSubmit = function(form) {
  if (!form) return;
  const parentInput = form.querySelector('#contactParent, input[name="parentName"], .name-input');
  const childInput = form.querySelector('#contactChild, input[name="childName"]');
  const dobInput = form.querySelector('#contactChildDOB, input[name="childDOB"], .dob-input');
  const phoneInput = form.querySelector('#contactPhone, input[name="phone"], .phone-input');
  const emailInput = form.querySelector('#contactEmail, input[type="email"]');
  const messageInput = form.querySelector('#contactMessage, textarea');

  if (parentInput) {
    const val = parentInput.value.trim();
    if (/[0-9]/.test(val)) {
      showFieldNotice(parentInput, 'Parent name accepts letters only (no numbers).');
      parentInput.focus();
      return;
    }
    if (val.length < 2) {
      showFieldNotice(parentInput, 'Please enter a valid parent name (letters only).');
      parentInput.focus();
      return;
    }
  }

  if (childInput) {
    const val = childInput.value.trim();
    if (/[0-9]/.test(val)) {
      showFieldNotice(childInput, 'Child name accepts letters only (no numbers).');
      childInput.focus();
      return;
    }
    if (val.length < 2) {
      showFieldNotice(childInput, 'Please enter a valid child name (letters only).');
      childInput.focus();
      return;
    }
  }

  if (dobInput) {
    if (!dobInput.value) {
      showFieldNotice(dobInput, 'Please select child’s date of birth.');
      dobInput.focus();
      return;
    }
    const pickedDate = new Date(dobInput.value + 'T00:00:00');
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    if (pickedDate > now) {
      showFieldNotice(dobInput, 'Date of birth cannot be in the future.');
      dobInput.focus();
      return;
    }
  }

  if (phoneInput) {
    const digits = phoneInput.value.replace(/\D/g, '');
    if (/[a-zA-Z]/.test(phoneInput.value)) {
      showFieldNotice(phoneInput, 'Phone number accepts digits only (no letters).');
      phoneInput.focus();
      return;
    }
    if (digits.length < 10) {
      showFieldNotice(phoneInput, 'Please enter a valid 10-digit phone number.');
      phoneInput.focus();
      return;
    }
  }

  const pName = parentInput ? parentInput.value.trim() : 'Parent';
  const cName = childInput ? childInput.value.trim() : 'Child';
  const container = form.parentElement;

  container.innerHTML = `
    <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-main);">
      <div style="width: 64px; height: 64px; background: var(--brand-lavender); color: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; font-size: 2rem;">✓</div>
      <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem; font-family: var(--font-heading); color: var(--text-main);">Inquiry Received!</h3>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem; max-width: 520px; margin-left: auto; margin-right: auto; line-height: 1.6;">Thank you, <strong>${pName}</strong>. Our clinical pediatric team has received your message regarding <strong>${cName}</strong> and will follow up with your family within 24 hours.</p>
      <div class="booking-confirmed-details-card" style="margin: 0 auto 1.75rem; max-width: 480px; text-align: left;">
        <strong class="clinic-confirmed-title">First Steps Pediatric Family Center</strong>
        <div class="clinic-confirmed-doc">Lead Clinical Team • Direct Family Triage</div>
        <div class="clinic-confirmed-meta" style="margin-top: 0.35rem; font-size: 0.9rem;">Response Reference: <strong>#INQ-${Math.floor(100000 + Math.random() * 900000)}</strong></div>
      </div>
      <button class="btn btn-secondary" onclick="location.reload();">Send Another Message</button>
    </div>
  `;
};

/* ==========================================================================
   REGISTRATION FORM SUBMISSION HANDLER (login.html)
   ========================================================================== */
window.handleRegisterSubmit = function(form) {
  if (!form) return;
  const parentInput = form.querySelector('#regParentName, input[name="parentName"], .name-input');
  const childInput = form.querySelector('#regChildName, input[name="childName"]');
  const dobInput = form.querySelector('#regChildDOB, input[name="childDOB"], .dob-input');
  const emailInput = form.querySelector('#regEmail, input[type="email"]');
  const passInput = form.querySelector('#regPassword, input[type="password"]');

  if (parentInput) {
    const val = parentInput.value.trim();
    if (/[0-9]/.test(val)) {
      showFieldNotice(parentInput, 'Parent name accepts letters only (no numbers).');
      parentInput.focus();
      return;
    }
    if (val.length < 2) {
      showFieldNotice(parentInput, 'Please enter parent full name (letters only).');
      parentInput.focus();
      return;
    }
  }

  if (childInput) {
    const val = childInput.value.trim();
    if (/[0-9]/.test(val)) {
      showFieldNotice(childInput, 'Child name accepts letters only (no numbers).');
      childInput.focus();
      return;
    }
    if (val.length < 2) {
      showFieldNotice(childInput, 'Please enter child full name (letters only).');
      childInput.focus();
      return;
    }
  }

  if (dobInput) {
    if (!dobInput.value) {
      showFieldNotice(dobInput, 'Please select child’s date of birth.');
      dobInput.focus();
      return;
    }
    const pickedDate = new Date(dobInput.value + 'T00:00:00');
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    if (pickedDate > now) {
      showFieldNotice(dobInput, 'Date of birth cannot be in the future.');
      dobInput.focus();
      return;
    }
  }

  if (passInput && passInput.value.length < 8) {
    showFieldNotice(passInput, 'Password must be at least 8 characters.');
    passInput.focus();
    return;
  }

  const pName = parentInput ? parentInput.value.trim() : 'Sarah Carter';
  const cName = childInput ? childInput.value.trim() : 'Liam Carter';
  const cDOB = dobInput ? dobInput.value : '';
  const cAge = cDOB ? calculatePediatricAge(cDOB) : '14 Months';

  try {
    localStorage.setItem('fs_user_family', JSON.stringify({
      parentName: pName,
      childName: cName,
      childDOB: cDOB,
      childAge: cAge,
      registeredAt: Date.now()
    }));
  } catch (e) {}

  const btn = form.querySelector('button[type="submit"]');
  if (btn) {
    btn.disabled = true;
    btn.innerText = 'Creating Family Account...';
  }

  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 600);
};

window.handleLoginSubmit = function(form) {
  const emailInput = document.getElementById('loginEmail');
  const alertBox = document.getElementById('loginSuccessAlert');
  const alertTitle = document.getElementById('loginSuccessTitle');
  const alertMsg = document.getElementById('loginSuccessMsg');
  const submitBtn = document.getElementById('loginSubmitBtn');

  const emailVal = emailInput && emailInput.value ? emailInput.value.trim() : 'sarah.carter@example.com';
  const nameDisplay = emailVal.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());

  if (alertBox) {
    if (alertTitle) alertTitle.textContent = 'Login Successful!';
    if (alertMsg) alertMsg.innerHTML = `Welcome back, <strong>${nameDisplay}</strong>. Your session is active with HIPAA 256-bit encryption.`;
    alertBox.style.display = 'block';
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (submitBtn) {
    submitBtn.style.background = '#10B981';
    submitBtn.style.color = '#FFFFFF';
    submitBtn.style.borderColor = '#10B981';
    submitBtn.innerHTML = '✓ Signed In Successfully';
  }
};

window.handleSocialLogin = function(provider) {
  const alertBox = document.getElementById('loginSuccessAlert');
  const alertTitle = document.getElementById('loginSuccessTitle');
  const alertMsg = document.getElementById('loginSuccessMsg');
  const submitBtn = document.getElementById('loginSubmitBtn');

  if (alertBox) {
    if (alertTitle) alertTitle.textContent = `${provider} Authentication Successful!`;
    if (alertMsg) alertMsg.innerHTML = `Welcome back! You have securely authenticated via <strong>${provider}</strong>. Your session is now active.`;
    alertBox.style.display = 'block';
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (submitBtn) {
    submitBtn.style.background = '#10B981';
    submitBtn.style.color = '#FFFFFF';
    submitBtn.style.borderColor = '#10B981';
    submitBtn.innerHTML = `✓ Authenticated via ${provider}`;
  }
};

/* ==========================================================================
   GROWTH CHART (INTERACTIVE SVG CANVAS)
   ========================================================================== */
function initGrowthChart() {
  const chartWrapper = document.getElementById('growthChartCanvas');
  const metricToggles = document.querySelectorAll('[data-chart-metric]');
  if (!chartWrapper) return;

  const datasetWeight = [
    { month: '0m', val: 3.4, pct: '50th' },
    { month: '2m', val: 5.6, pct: '55th' },
    { month: '4m', val: 6.9, pct: '58th' },
    { month: '6m', val: 8.1, pct: '60th' },
    { month: '9m', val: 9.3, pct: '62nd' },
    { month: '12m', val: 10.2, pct: '64th' },
    { month: '15m', val: 11.1, pct: '65th' },
    { month: '18m', val: 11.9, pct: '66th' }
  ];

  const datasetHeight = [
    { month: '0m', val: 50.0, pct: '50th' },
    { month: '2m', val: 58.2, pct: '52nd' },
    { month: '4m', val: 64.0, pct: '55th' },
    { month: '6m', val: 68.1, pct: '57th' },
    { month: '9m', val: 72.5, pct: '60th' },
    { month: '12m', val: 76.8, pct: '62nd' },
    { month: '15m', val: 80.2, pct: '63rd' },
    { month: '18m', val: 83.5, pct: '65th' }
  ];

  let currentMetric = 'both';

  function renderChart() {
    const width = 640;
    const height = 260;
    const padding = { top: 30, right: 30, bottom: 40, left: 45 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    // Weight range: 2 to 14kg -> map to y
    // Height range: 45 to 90cm -> map to y
    const pointsWeight = datasetWeight.map((d, i) => {
      const x = padding.left + (i / (datasetWeight.length - 1)) * chartW;
      const y = padding.top + chartH - ((d.val - 2) / 12) * chartH;
      return { x, y, d };
    });

    const pointsHeight = datasetHeight.map((d, i) => {
      const x = padding.left + (i / (datasetHeight.length - 1)) * chartW;
      const y = padding.top + chartH - ((d.val - 45) / 45) * chartH;
      return { x, y, d };
    });

    const pathWeight = pointsWeight.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`, '');
    const pathHeight = pointsHeight.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`, '');

    // Area gradients
    const areaWeight = `${pathWeight} L ${pointsWeight[pointsWeight.length-1].x} ${padding.top + chartH} L ${pointsWeight[0].x} ${padding.top + chartH} Z`;

    let svg = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
        <defs>
          <linearGradient id="chartGradWeight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#855C96" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="#855C96" stop-opacity="0.02"/>
          </linearGradient>
        </defs>

        <!-- Grid Lines -->
        <line x1="${padding.left}" y1="${padding.top}" x2="${width - padding.right}" y2="${padding.top}" stroke="var(--border-blush)" stroke-dasharray="4" opacity="0.7"/>
        <line x1="${padding.left}" y1="${padding.top + chartH/2}" x2="${width - padding.right}" y2="${padding.top + chartH/2}" stroke="var(--border-blush)" stroke-dasharray="4" opacity="0.7"/>
        <line x1="${padding.left}" y1="${padding.top + chartH}" x2="${width - padding.right}" y2="${padding.top + chartH}" stroke="var(--border-blush)" opacity="0.9"/>

        <!-- X Axis labels -->
        ${datasetWeight.map((d, i) => {
          const x = padding.left + (i / (datasetWeight.length - 1)) * chartW;
          return `<text x="${x}" y="${height - 12}" fill="var(--text-muted)" font-size="11" text-anchor="middle" font-weight="600">${d.month}</text>`;
        }).join('')}

        <!-- Curves & Points -->
        ${(currentMetric === 'both' || currentMetric === 'weight') ? `
          <path d="${areaWeight}" fill="url(#chartGradWeight)" />
          <path d="${pathWeight}" fill="none" stroke="#855C96" stroke-width="3.5" stroke-linecap="round" />
          ${pointsWeight.map(p => `
            <circle cx="${p.x}" cy="${p.y}" r="5" fill="#FFFFFF" stroke="#855C96" stroke-width="3" style="cursor: pointer; transition: transform 0.2s;">
              <title>Weight: ${p.d.val} kg (${p.d.pct} percentile at ${p.d.month})</title>
            </circle>
          `).join('')}
        ` : ''}

        ${(currentMetric === 'both' || currentMetric === 'height') ? `
          <path d="${pathHeight}" fill="none" stroke="#F5CBCB" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="5 3"/>
          ${pointsHeight.map(p => `
            <circle cx="${p.x}" cy="${p.y}" r="4.5" fill="#FFFFFF" stroke="#F5CBCB" stroke-width="2.5" style="cursor: pointer;">
              <title>Height: ${p.d.val} cm (${p.d.pct} percentile at ${p.d.month})</title>
            </circle>
          `).join('')}
        ` : ''}
      </svg>
    `;

    chartWrapper.innerHTML = svg;
  }

  metricToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      metricToggles.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMetric = btn.getAttribute('data-chart-metric');
      renderChart();
    });
  });

  renderChart();
}

/* ==========================================================================
   VACCINATION UI FILTER
   ========================================================================== */
function initVaccinationFilter() {
  const filterButtons = document.querySelectorAll('[data-vaccine-filter]');
  const vaccineItems = document.querySelectorAll('.vaccine-item');

  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-vaccine-filter');

      vaccineItems.forEach(item => {
        const status = item.getAttribute('data-status');
        if (filter === 'all' || status === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   LOGIN / REGISTER TABS
   ========================================================================== */
function initAuthTabs() {
  const tabBtns = document.querySelectorAll('.auth-tab-btn');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (!tabBtns.length || !loginForm || !registerForm) return;

  function switchTab(target) {
    tabBtns.forEach(b => {
      if (b.getAttribute('data-tab') === target) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    if (target === 'login') {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    } else {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    }
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.getAttribute('data-tab'));
    });
  });

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam === 'register' || tabParam === 'login') {
      switchTab(tabParam);
    }
  } catch (e) {}
}

/* ==========================================================================
   HOME 2: INTERACTIVE SYMPTOM CHECKER & PEDIATRIC TRIAGE WIDGET
   ========================================================================== */
function initSymptomChecker() {
  const checkerForm = document.getElementById('symptomCheckerForm');
  const resultBox = document.getElementById('symptomResultBox');

  if (!checkerForm || !resultBox) return;

  checkerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const age = document.getElementById('symptomAge').value;
    const symptom = document.getElementById('symptomType').value;
    const duration = document.getElementById('symptomDuration').value;

    resultBox.style.display = 'block';
    resultBox.innerHTML = `
      <div style="background: var(--surface-white); border: 2px solid var(--brand-lavender); border-radius: 16px; padding: 1.5rem; margin-top: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
          <span style="background: var(--bg-secondary); color: var(--brand-lavender-dark); padding: 0.3rem 0.8rem; border-radius: 9999px; font-weight: 700; font-size: 0.8rem;">Clinical Guidance</span>
          <span style="font-size: 0.85rem; color: var(--text-muted);">Age Group: ${age}</span>
        </div>
        <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-main);">Recommended Next Step: Same-Day Clinic Assessment</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.25rem;">
          For a child presenting with <strong>${symptom}</strong> ongoing for <strong>${duration}</strong>, our pediatric clinical protocol recommends a gentle physical exam to rule out acute ear, respiratory, or viral causes. Ensure small sips of hydration.
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" data-open-appointment data-service-preset="pediatric-urgent">Book Same-Day Visit</button>
          <a href="tel:18005557837" class="btn btn-secondary btn-sm">Call Nurse Hotline (24/7)</a>
        </div>
      </div>
    `;

    // Re-bind modal opener for newly inserted button
    initAppointmentModal();
  });
}

/* ==========================================================================
   EVIDENCE-BASED ARTICLES DATABASE (Shared across Blog & Details Page)
   ========================================================================== */
const ARTICLES_DB = {
  'starting-solids': {
    title: "Starting Solids: A Gentle Guide to Baby-Led Weaning & Allergen Introduction",
    category: "Early Nutrition",
    readTime: "6 Min Read",
    date: "Updated October 2026",
    author: "Dr. Maya Carter, MD, FAAP",
    authorRole: "Senior Attending & Chief of Pediatrics",
    avatar: "MC",
    authorAvatar: "assets/images/avatar_author_maya_carter.jpg",
    image: "assets/images/blog_toddler_nutrition.jpg",
    body: `
      <p>Transitioning from exclusive milk feeding to table solids is one of the most exciting developmental passages of your baby's first year. While past generations were advised to begin with single-grain rice cereals at 4 months, current American Academy of Pediatrics (AAP) recommendations emphasize developmental readiness over a rigid calendar date—typically occurring around 6 months.</p>

      <h3>Signs Your Baby Is Developmentally Ready</h3>
      <ul>
        <li><strong>Independent Head &amp; Trunk Control:</strong> Baby can sit upright in a high chair with minimal assistance and hold their head steady.</li>
        <li><strong>Extrusion Reflex Has Diminished:</strong> When food is offered on a spoon or tongue, baby no longer automatically thrusts their tongue forward to push it out.</li>
        <li><strong>Active Hand-to-Mouth Grasp:</strong> Baby intently watches family meals, reaches for food items, and successfully guides objects to their mouth.</li>
      </ul>

      <div class="blog-reader-callout">
        <h4>💡 Dr. Maya's Safe Allergen Rule</h4>
        <p>Introduce top allergens (smooth peanut butter thinned in breast milk, baked egg, dairy, fish) one at a time during morning meals when you can observe your baby for 2 hours. Keep the allergen in regular dietary rotation once tolerated!</p>
      </div>

      <h3>Choking vs. Normal Gagging: What Every Parent Must Know</h3>
      <p>Gagging is a loud, active, and protective neurological reflex located toward the front of an infant's tongue. It looks alarming—red face, watery eyes, coughing—but it is your baby's tongue muscles successfully maneuvering food away from their airway. Choking, by contrast, is silent and requires immediate intervention. Always ensure your infant is seated completely upright, never reclining, during all meal sessions.</p>
    `
  },
  'sleep-regression': {
    title: "The 4-Month Sleep Regression: Normal Biology vs Sleep Training",
    category: "Infant Sleep",
    readTime: "5 Min Read",
    date: "Updated October 2026",
    author: "Dr. Julian Reed, MD, PhD",
    authorRole: "Senior Attending & Preventive Health Chair",
    avatar: "JR",
    authorAvatar: "assets/images/avatar_author_julian_reed.jpg",
    image: "assets/images/blog_sleep_routine.jpg",
    body: `
      <p>Around 14 to 18 weeks of age, countless parents experience a sudden disruption in their previously peaceful bedtime routines. What feels like a "regression" is biologically a massive neurological progression: your baby's brain has permanently transitioned from primitive newborn sleep into mature, adult-like circadian sleep architecture.</p>

      <h3>The Biology Behind the Shift</h3>
      <p>Newborns drift directly into deep REM sleep and wake easily. Around 4 months, the brain begins cycling through 4 distinct sleep phases (drowsiness, light sleep, deep restorative sleep, and REM dreaming). Every 45 to 60 minutes, your baby enters a brief partial arousal window between cycles. If they fell asleep in your arms or on a bottle, waking up in a dark, quiet crib alarms their sensory expectations.</p>

      <div class="blog-reader-callout">
        <h4>🌙 Gentle Bedtime Routine Steps</h4>
        <p>Begin a predictable 20-minute wind-down: warm sponge bath, dim peach lighting, gentle lavender moisturizer massage, and a consistent story or lullaby. Drowsy but awake placement teaches early self-soothing without distress.</p>
      </div>

      <h3>Protecting Daytime Wake Windows</h3>
      <p>At 4 months, babies can comfortably stay awake for approximately 90 to 120 minutes between naps. Over-tired infants accumulate elevated cortisol, which actually impairs night-time sleep depth. Tracking daytime nap intervals is often the quickest remedy for night waking.</p>
    `
  },
  'crawling-to-steps': {
    title: "From Crawling to First Steps: The Physical Journey",
    category: "Physical Milestones",
    readTime: "6 Min Read",
    date: "Updated October 2026",
    author: "Dr. Clara Bennett, MS, OTR/L",
    authorRole: "Clinical Associate in Pediatric Development",
    avatar: "CB",
    authorAvatar: "assets/images/doc_clara_bennett.jpg",
    image: "assets/images/developmental_play.jpg",
    body: `
      <p>The progression from rolling over to independent upright walking is one of the grandest physical engineering achievements in human biology. Between 9 and 15 months, your toddler's musculoskeletal balance and spatial perception undergo astonishing refinement.</p>

      <h3>The Stages of Gross Motor Evolution</h3>
      <ul>
        <li><strong>The Cross-Crawl Phase (7–10 Months):</strong> Alternating opposite arms and legs strengthens the corpus callosum—the neural bridge connecting both brain hemispheres.</li>
        <li><strong>Pulling to Stand (9–11 Months):</strong> Pulling up on sturdy coffee tables or play couches strengthens pelvic and quad stabilizers.</li>
        <li><strong>Cruising &amp; Side-Stepping (10–12 Months):</strong> Lateral movement shifts weight across the outer foot arches, building lateral hip balance.</li>
        <li><strong>First Independent Steps (11–15 Months):</strong> Arms held high in a "high-guard" position for balance, feet wide apart, and joyful forward momentum!</li>
      </ul>

      <div class="blog-reader-callout">
        <h4>🦶 Why Barefoot Is Best Indoors</h4>
        <p>Baby feet have thousands of sensory nerve endings. Walking barefoot indoors allows the small muscles of the arches to grip the floor, building balance and proprioception far faster than stiff-soled shoes.</p>
      </div>
    `
  },
  'who-percentiles': {
    title: "Demystifying WHO Percentiles: Why '50th' Is Not a Grade",
    category: "Growth Percentiles",
    readTime: "4 Min Read",
    date: "Updated October 2026",
    author: "Dr. Maya Carter, MD, FAAP",
    authorRole: "Senior Attending & Chief of Pediatrics",
    avatar: "MC",
    authorAvatar: "assets/images/avatar_author_maya_carter.jpg",
    image: "assets/images/growth_monitoring.jpg",
    body: `
      <p>In pediatric examination rooms across the world, no phrase causes more unnecessary parental anxiety than: <em>"Your child is in the 15th percentile for weight."</em> Too often, parents interpret percentiles like academic grades, assuming 90th percentile is an "A" and 15th percentile is failing. In pediatric science, this is completely false.</p>

      <h3>What Percentile Curves Actually Measure</h3>
      <p>World Health Organization (WHO) growth charts reflect healthy physiological diversity across thousands of infants raised in optimal conditions. A child on the 10th percentile curve who is meeting every developmental milestone, smiling, sleeping, and maintaining steady momentum along their personal curve is just as biologically thriving as a peer on the 85th percentile.</p>

      <div class="blog-reader-callout">
        <h4>📊 What Our Pediatricians Actually Look For</h4>
        <p>We look for smooth curve tracking over multiple checkups. A sharp drop across two or more major percentile channels warrants review—not the percentile number itself!</p>
      </div>

      <p>Genetics play a monumental role in child stature and body type. Celebrate your child's individual vitality rather than comparing with playground peers.</p>
    `
  },
  'fever-fears': {
    title: "Fever Fears Decoded: When to Treat & When to Call Your Doctor",
    category: "Urgent Guidance",
    readTime: "5 Min Read",
    date: "Updated October 2026",
    author: "Dr. Maya Carter, MD, FAAP",
    authorRole: "Senior Attending & Chief of Pediatrics",
    avatar: "MC",
    authorAvatar: "assets/images/avatar_author_maya_carter.jpg",
    image: "assets/images/blog_fever_thermometer.jpg",
    body: `
      <p>Few parenting experiences trigger visceral worry like a burning forehead in the middle of the night. Yet fever in and of itself is not an illness—it is the human immune system's finest biological defense weapon.</p>

      <h3>Why Fevers Happen</h3>
      <p>When white blood cells detect viral or bacterial invaders, the brain's hypothalamus raises the body's internal thermostat. This elevated temperature produces heat-shock proteins, speeds antibody replication, and inhibits viral growth. A fever of 101°F to 103°F in an older child is proof of a vigorous, functioning immune response.</p>

      <div class="blog-reader-callout">
        <h4>🚨 Red Flags: When to Call the Clinic Immediately</h4>
        <ul>
          <li><strong>Infant Under 3 Months:</strong> Any rectal temp of 100.4°F (38°C) or higher requires immediate same-day evaluation.</li>
          <li><strong>Lethargy / Inconsolability:</strong> Difficulty waking, glassy gaze, or inability to make eye contact.</li>
          <li><strong>Signs of Dehydration:</strong> No wet diapers in 8 hours, dry lips, no tears when crying.</li>
          <li><strong>Labored Breathing:</strong> Flaring nostrils, rapid chest retractions between the ribs.</li>
        </ul>
      </div>

      <h3>Treat the Child, Not the Thermometer</h3>
      <p>If your 18-month-old has a 102°F temperature but is sipping water, playing with blocks, and making eye contact, fever-reducing medications like acetaminophen or ibuprofen are optional for comfort—not mandatory to eliminate the temperature completely.</p>
    `
  },
  'speech-milestones': {
    title: "Speech & Language Milestones: First Words, Gestures & Bonding",
    category: "Communication",
    readTime: "6 Min Read",
    date: "Updated October 2026",
    author: "Dr. Julian Reed, MD, PhD",
    authorRole: "Senior Attending & Preventive Health Chair",
    avatar: "JR",
    authorAvatar: "assets/images/avatar_author_julian_reed.jpg",
    image: "assets/images/blog_speech_language.jpg",
    body: `
      <p>Before toddlers speak their first clear word, they build an intricate universe of non-verbal communication. Responsive parenting and conversational back-and-forth serve as the foundational scaffolding for language development.</p>

      <h3>Key Developmental Markers</h3>
      <ul>
        <li><strong>9 Months:</strong> Consonant babbling (ba-ba, ma-ma, da-da), responding to their own name, pointing toward interesting sights.</li>
        <li><strong>12 Months:</strong> 1 to 3 intentional words with specific meaning; waving "bye-bye" and following 1-step directions like "come here".</li>
        <li><strong>18 Months:</strong> 10 to 20 words; pointing to named body parts; mimicking adult words and inflections.</li>
        <li><strong>24 Months:</strong> 50+ words; linking 2 words together ("more milk", "big truck"); understanding 2-step requests.</li>
      </ul>

      <div class="blog-reader-callout">
        <h4>📖 Daily Conversational Routines</h4>
        <p>Narrate your daily life out loud: "Now we are cutting the yellow banana into three pieces!" Leave intentional 5-second pauses after asking questions so your toddler has time to formulate their response.</p>
      </div>
    `
  },
  'seasonal-immunity': {
    title: "Building Super-Immunity: Seasonal Protection & Daycare Wellness",
    category: "Immune Health",
    readTime: "4 Min Read",
    date: "Updated October 2026",
    author: "Chloe Laurent, RN, CPNP",
    authorRole: "Assistant Pediatric Wellness Practitioner",
    avatar: "CL",
    authorAvatar: "assets/images/doc_chloe_laurent.jpg",
    image: "assets/images/blog_seasonal_immunity.jpg",
    body: `
      <p>Entering daycare or preschool is often accompanied by an unwelcome parade of runny noses, coughs, and seasonal bugs. Pediatric studies show that healthy young children normally experience 6 to 10 viral infections during their first school year. While exhausting for parents, this is the essential "bootcamp" that programs lifetime immune memory.</p>

      <h3>Nutrition That Shields Little Bodies</h3>
      <p>Over 70% of human immune cells reside along the gastrointestinal tract. Nourishing your child's microbiome with prebiotic fibers (oatmeal, bananas, asparagus) and fermented foods (whole-milk plain yogurt, kefir) fortifies the intestinal mucosal barrier.</p>

      <div class="blog-reader-callout">
        <h4>🍎 The Daily Immunity Plate</h4>
        <p>Eat the rainbow: berries (rich in flavonoids), sweet potatoes (Vitamin A for respiratory membranes), citrus fruits (Vitamin C), and 15 minutes of outdoor sunlight daily for natural Vitamin D activation.</p>
      </div>

      <h3>The 20-Second Bubble Song</h3>
      <p>Hand washing remains the single most effective barrier against illness transmission. Teach toddlers to wash using bubbly soap while singing the alphabet song or "Twinkle, Twinkle Little Star" twice before rinsing clean.</p>
    `
  }
};

/* Optional modal reader fallback */
function initBlogReader() {
  const modal = document.getElementById('blogReaderModal');
  if (!modal) return;

  const openButtons = document.querySelectorAll('[data-open-blog]');
  const closeButtons = modal.querySelectorAll('[data-close-blog-reader]');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const slug = btn.getAttribute('data-open-blog');
      const article = ARTICLES_DB[slug];
      if (!article) return;

      document.getElementById('blogReaderTitle').textContent = article.title;
      document.getElementById('blogReaderCategory').textContent = article.category;
      document.getElementById('blogReaderReadTime').textContent = article.readTime;
      document.getElementById('blogReaderDate').textContent = article.date;
      document.getElementById('blogReaderAuthor').textContent = article.author;
      document.getElementById('blogReaderAuthorRole').textContent = article.authorRole;
      const readerAvatar = document.getElementById('blogReaderAvatar');
      if (readerAvatar) {
        if (article.authorAvatar) {
          readerAvatar.innerHTML = `<img src="${article.authorAvatar}" alt="${article.author}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block;">`;
        } else {
          readerAvatar.textContent = article.avatar;
        }
      }
      document.getElementById('blogReaderImg').src = article.image;
      document.getElementById('blogReaderImg').alt = article.title;
      document.getElementById('blogReaderBody').innerHTML = article.body;

      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof modal.close === 'function') modal.close();
      else modal.removeAttribute('open');
    });
  });
}

/* ==========================================================================
   STANDALONE BLOG DETAILS PAGE CONTROLLER (blog-details.html)
   ========================================================================== */
// Track clicked article for clean-URL redirects and session continuity
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="blog-details"]');
  if (link) {
    const href = link.getAttribute('href') || '';
    const match = href.match(/[?&]id=([^&]+)/);
    if (match && match[1]) {
      try { sessionStorage.setItem('fs-selected-article', match[1]); } catch (_) {}
    }
  }
});

function initBlogDetailsPage() {
  const bodyEl = document.getElementById('articleBodyContent');
  if (!bodyEl) return;

  const params = new URLSearchParams(window.location.search);
  let storedArticle = null;
  try { storedArticle = sessionStorage.getItem('fs-selected-article'); } catch (_) {}
  const id = params.get('id') || storedArticle || 'starting-solids';
  const article = ARTICLES_DB[id] || ARTICLES_DB['starting-solids'];

  // Update page title & description
  document.title = `${article.title} — FIRST STEPS`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${article.title} by ${article.author}. Pediatric insights at First Steps Clinic.`);
  }

  // Update breadcrumb & badges
  const breadcrumbCat = document.getElementById('breadcrumbCategory');
  if (breadcrumbCat) breadcrumbCat.textContent = article.category;

  const badgeEl = document.getElementById('articleCategoryBadge');
  if (badgeEl) badgeEl.textContent = article.category;

  const readTimeEl = document.getElementById('articleReadTime');
  if (readTimeEl) readTimeEl.textContent = article.readTime;

  const dateEl = document.getElementById('articleDate');
  if (dateEl) dateEl.textContent = article.date;

  const titleEl = document.getElementById('articleMainTitle');
  if (titleEl) titleEl.textContent = article.title;

  const excerptEl = document.getElementById('articleExcerpt');
  if (excerptEl) {
    excerptEl.textContent = `Evidence-based clinical guidance on ${article.category.toLowerCase()} curated by ${article.author} for growing families.`;
  }

  // Update Hero Image
  const heroImg = document.getElementById('articleHeroImg');
  if (heroImg) {
    heroImg.src = article.image;
    heroImg.alt = article.title;
  }

  // Update Author Info
  const authorAvatar = document.getElementById('articleAuthorAvatar');
  if (authorAvatar) {
    if (article.authorAvatar) {
      authorAvatar.innerHTML = `<img src="${article.authorAvatar}" alt="${article.author}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block;">`;
    } else {
      authorAvatar.textContent = article.avatar;
    }
  }

  const authorName = document.getElementById('articleAuthorName');
  if (authorName) authorName.textContent = article.author;

  const authorRole = document.getElementById('articleAuthorRole');
  if (authorRole) authorRole.textContent = article.authorRole;

  // Render article body
  bodyEl.innerHTML = article.body;

  // Sidebar Author
  const sideAvatar = document.getElementById('sidebarAuthorAvatar');
  if (sideAvatar) {
    if (article.authorAvatar) {
      sideAvatar.innerHTML = `<img src="${article.authorAvatar}" alt="${article.author}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block;">`;
    } else {
      sideAvatar.textContent = article.avatar;
    }
  }

  const sideName = document.getElementById('sidebarAuthorName');
  if (sideName) sideName.textContent = article.author;

  const sideCreds = document.getElementById('sidebarAuthorCredentials');
  if (sideCreds) sideCreds.textContent = article.authorRole;

  // Render Related Articles in Sidebar
  const relatedList = document.getElementById('sidebarRelatedList');
  if (relatedList) {
    const otherKeys = Object.keys(ARTICLES_DB).filter(k => k !== id);
    relatedList.innerHTML = otherKeys.slice(0, 3).map(k => {
      const other = ARTICLES_DB[k];
      return `
        <a href="blog-details.html?id=${k}" class="related-article-item">
          <img src="${other.image}" alt="${other.title}" class="related-article-thumb">
          <div class="related-article-info">
            <h5>${other.title}</h5>
            <span>${other.category} • ${other.readTime}</span>
          </div>
        </a>
      `;
    }).join('');
  }

  // Font Size Adjusters
  let currentFontSize = 1.05;
  const btnFontIncr = document.getElementById('btnFontIncr');
  const btnFontDecr = document.getElementById('btnFontDecr');
  if (btnFontIncr && btnFontDecr) {
    btnFontIncr.addEventListener('click', () => {
      if (currentFontSize < 1.35) {
        currentFontSize += 0.08;
        bodyEl.style.fontSize = `${currentFontSize}rem`;
      }
    });
    btnFontDecr.addEventListener('click', () => {
      if (currentFontSize > 0.9) {
        currentFontSize -= 0.08;
        bodyEl.style.fontSize = `${currentFontSize}rem`;
      }
    });
  }

  // Share button with clipboard copy
  const shareBtn = document.getElementById('btnShareArticle');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const original = shareBtn.innerHTML;
          shareBtn.textContent = 'Link Copied!';
          setTimeout(() => { shareBtn.innerHTML = original; }, 2000);
        });
      }
    });
  }
}

/* ==========================================================================
   INSIGHTS & MILESTONE RESEARCH PAGE INTERACTION
   ========================================================================== */
function initInsightsPage() {
  const filterBar = document.getElementById('insightsFilterBar');
  const searchInput = document.getElementById('insightsSearchInput');
  const cards = document.querySelectorAll('#insightsCardGrid .insights-card');
  const noResults = document.getElementById('insightsNoResults');
  const resetBtn = document.getElementById('btnResetFilters');

  if (!filterBar && !searchInput && !cards.length) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function filterGuides() {
    let visibleCount = 0;
    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardKeywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const cardText = (card.textContent || '').toLowerCase();

      const matchesCat = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = (!searchQuery || cardKeywords.includes(searchQuery) || cardText.includes(searchQuery));

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (filterBar) {
    const filterBtns = filterBar.querySelectorAll('.insights-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        activeCategory = btn.getAttribute('data-category') || 'all';
        filterGuides();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterGuides();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeCategory = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (filterBar) {
        const filterBtns = filterBar.querySelectorAll('.insights-filter-btn');
        filterBtns.forEach(b => {
          const isAll = b.getAttribute('data-category') === 'all';
          b.classList.toggle('active', isAll);
          b.setAttribute('aria-selected', isAll ? 'true' : 'false');
        });
      }
      filterGuides();
    });
  }

  // Interactive Clinical Matrix Tab Switching
  const matrixTabs = document.querySelectorAll('.matrix-stage-tab');
  const matrixPanels = document.querySelectorAll('.matrix-stage-panel');

  if (matrixTabs.length && matrixPanels.length) {
    matrixTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-matrix-tab');
        
        matrixTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        matrixPanels.forEach(p => {
          const isTarget = p.id === `panel-${targetId}`;
          p.classList.toggle('active', isTarget);
        });
      });
    });
  }

  // Interactive Checklist Progress Calculator
  const checklistWraps = document.querySelectorAll('.matrix-checklist-wrap');
  checklistWraps.forEach(wrap => {
    const checkboxes = wrap.querySelectorAll('.matrix-checkbox');
    const fill = wrap.querySelector('.matrix-progress-fill');
    const badge = wrap.querySelector('[data-progress-label]');

    function updateProgress() {
      if (!checkboxes.length) return;
      const total = checkboxes.length;
      let checked = 0;
      checkboxes.forEach(cb => {
        if (cb.checked) checked++;
      });
      const pct = Math.round((checked / total) * 100);
      if (fill) fill.style.width = `${pct}%`;
      if (badge) {
        if (checked === total) {
          badge.textContent = `✓ All ${total} Observed (100%)`;
          badge.style.background = 'rgba(16, 185, 129, 0.2)';
          badge.style.color = '#059669';
        } else {
          badge.textContent = `${checked} of ${total} Observed (${pct}%)`;
          badge.style.background = 'rgba(16, 185, 129, 0.12)';
          badge.style.color = '#10B981';
        }
      }
    }

    checkboxes.forEach(cb => {
      cb.addEventListener('change', updateProgress);
    });

    // Initial calculation on page load
    updateProgress();
  });
}

/* ==========================================================================
   INTERACTIVE CARE COMPASS CONTROLLER
   Handles instant tab switching across bespoke hero compass widgets
   ========================================================================== */
function initHeroCareCompass() {
  const compassWidgets = document.querySelectorAll('[data-compass]');
  compassWidgets.forEach(widget => {
    const tabs = widget.querySelectorAll('[data-compass-tab]');
    const panels = widget.querySelectorAll('[data-compass-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = tab.getAttribute('data-compass-tab');

        // Deactivate all sibling tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Toggle matching panel
        panels.forEach(p => {
          if (p.getAttribute('data-compass-panel') === targetId) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
      });
    });
  });
}

/* ==========================================================================
   PATIENT DEPARTURE VIDEO PLAYER
   Handles interactive play/pause, progress tracking, and volume toggle
   ========================================================================== */
function initPatientDepartureVideo() {
  const video = document.getElementById('hospitalDepartureVideo');
  if (!video) return;

  const playPauseBtn = document.getElementById('videoPlayPauseBtn');
  const playIcon = document.getElementById('videoPlayIcon');
  const pauseIcon = document.getElementById('videoPauseIcon');
  const progressBar = document.getElementById('videoProgressBar');
  const muteBtn = document.getElementById('videoMuteToggleBtn');
  const soundBanner = document.getElementById('videoSoundBannerBtn');
  const soundBannerIcon = document.getElementById('soundBannerIcon');
  const soundBannerText = document.getElementById('soundBannerText');

  // Explicitly ensure video never loops automatically (single-play)
  video.loop = false;

  function syncAudioUI() {
    if (video.muted) {
      if (muteBtn) muteBtn.textContent = 'Muted 🔇';
      if (soundBannerText) soundBannerText.textContent = 'Click for Sound';
      if (soundBannerIcon) soundBannerIcon.textContent = '🔇';
      if (soundBanner) soundBanner.style.background = 'rgba(133, 92, 150, 0.9)';
    } else {
      if (muteBtn) muteBtn.textContent = 'Sound On 🔊';
      if (soundBannerText) soundBannerText.textContent = 'Sound Playing 🎵';
      if (soundBannerIcon) soundBannerIcon.textContent = '🔊';
      if (soundBanner) soundBanner.style.background = 'rgba(16, 185, 129, 0.9)';
    }
  }

  function toggleAudio() {
    video.muted = !video.muted;
    if (!video.muted) {
      video.volume = 1.0;
      if (video.paused && !video.ended) {
        video.play().catch(() => {});
      }
    }
    syncAudioUI();
  }

  if (muteBtn) muteBtn.addEventListener('click', toggleAudio);
  if (soundBanner) soundBanner.addEventListener('click', toggleAudio);

  function updatePlayState() {
    if (video.paused || video.ended) {
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
      if (playPauseBtn) playPauseBtn.setAttribute('aria-label', video.ended ? 'Replay Video' : 'Play Video');
    } else {
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'block';
      if (playPauseBtn) playPauseBtn.setAttribute('aria-label', 'Pause Video');
    }
  }

  function handlePlayToggle() {
    if (video.ended) {
      // Replay only when user explicitly clicks play again
      video.currentTime = 0;
      video.play().catch(() => {});
    } else if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', handlePlayToggle);
  }

  video.addEventListener('click', handlePlayToggle);
  video.addEventListener('play', updatePlayState);
  video.addEventListener('pause', updatePlayState);

  // When video completes one full play: stop and stay paused until user clicks replay
  video.addEventListener('ended', () => {
    updatePlayState();
    if (progressBar) progressBar.style.width = '100%';
  });

  if (progressBar) {
    video.addEventListener('timeupdate', () => {
      if (video.duration && !video.ended) {
        const pct = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${pct}%`;
      }
    });
  }

  // Initial sync
  syncAudioUI();
  updatePlayState();
}
