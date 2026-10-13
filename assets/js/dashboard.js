/* ==========================================================================
   FIRST STEPS PEDIATRIC PORTAL — INTERACTIVE DASHBOARD CONTROLLERS
   Comprehensive client-side interactivity, state management, modal handlers,
   SVG growth charts, and workflow actions across all dashboard pages.
   ========================================================================== */

(function () {
  'use strict';

  // Only run on portal / dashboard pages
  if (!document.querySelector('.portal-layout')) return;

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboardInteractions);
  } else {
    initDashboardInteractions();
  }

  function initDashboardInteractions() {
    injectDashboardModals();
    bindCheckInWorkflow();
    bindProxyWorkflow();
    bindGrowthAndMeasurementWorkflow();
    bindPrescriptionAndRefillWorkflow();
    bindBillingAndPaymentWorkflow();
    bindVaccineFilterWorkflow();
    bindMilestonesWorkflow();
    bindMessagingWorkflow();
    bindSettingsWorkflow();
    bindDocumentDownloads();
    renderGrowthChart();
  }

  /* --------------------------------------------------------------------------
     1. INJECT REUSABLE MODALS
     -------------------------------------------------------------------------- */
  function injectDashboardModals() {
    const modalContainer = document.createElement('div');
    modalContainer.id = 'dynamicDashboardModals';

    modalContainer.innerHTML = `
      <!-- 1. Digital Check-In Modal -->
      <dialog class="custom-modal" id="checkInModal">
        <div class="modal-content-card">
          <button class="modal-close-btn" data-close-modal aria-label="Close dialog">✕</button>
          <div style="margin-bottom: 1.25rem;">
            <span class="child-friendly-badge" style="font-size: 0.75rem; padding: 0.2rem 0.65rem;">Digital Arrival Desk</span>
            <h3 style="font-size: 1.4rem; font-family: var(--font-heading); margin-top: 0.35rem; margin-bottom: 0.25rem; color: var(--text-main);">
              Patient Online Check-In
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
              Confirm arrival status and symptoms for Liam Carter (14 Months) with Dr. Maya Carter.
            </p>
          </div>
          <form id="checkInForm">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label" for="checkinArrivalStatus">Arrival Status</label>
              <select class="form-select" id="checkinArrivalStatus" required>
                <option value="lobby" selected>Arrived in Clinic Lobby (Waiting Room)</option>
                <option value="parking">Parked in Hospital Lot / Walking In</option>
                <option value="enroute">En Route (5–10 Minutes Away)</option>
              </select>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group">
                <label class="form-label" for="checkinWeight">Current Weight (kg)</label>
                <input type="text" class="form-input" id="checkinWeight" value="10.2 kg" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="checkinTemp">Body Temperature</label>
                <input type="text" class="form-input" id="checkinTemp" value="36.8 °C (Normal)" required>
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Any Acute Symptoms Today?</label>
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.35rem;">
                <label style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.82rem; background: var(--bg-primary); padding: 0.35rem 0.75rem; border-radius: var(--radius-pill); border: 1px solid var(--border-blush); cursor: pointer; color: var(--text-main);">
                  <input type="checkbox" name="symptom" value="none" checked style="accent-color: var(--brand-lavender);"> None (Routine Visit)
                </label>
                <label style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.82rem; background: var(--bg-primary); padding: 0.35rem 0.75rem; border-radius: var(--radius-pill); border: 1px solid var(--border-blush); cursor: pointer; color: var(--text-main);">
                  <input type="checkbox" name="symptom" value="fever" style="accent-color: var(--brand-lavender);"> Mild Fever
                </label>
                <label style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.82rem; background: var(--bg-primary); padding: 0.35rem 0.75rem; border-radius: var(--radius-pill); border: 1px solid var(--border-blush); cursor: pointer; color: var(--text-main);">
                  <input type="checkbox" name="symptom" value="cough" style="accent-color: var(--brand-lavender);"> Teething / Congestion
                </label>
                <label style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.82rem; background: var(--bg-primary); padding: 0.35rem 0.75rem; border-radius: var(--radius-pill); border: 1px solid var(--border-blush); cursor: pointer; color: var(--text-main);">
                  <input type="checkbox" name="symptom" value="rash" style="accent-color: var(--brand-lavender);"> Skin Rash / Spot
                </label>
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label class="form-label" for="checkinGuardian">Accompanying Guardian</label>
              <input type="text" class="form-input" id="checkinGuardian" value="Sarah Carter (Mother)" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Complete Digital Check-In →</button>
          </form>
        </div>
      </dialog>

      <!-- 2. Add Authorized Proxy Modal -->
      <dialog class="custom-modal" id="addProxyModal">
        <div class="modal-content-card">
          <button class="modal-close-btn" data-close-modal aria-label="Close dialog">✕</button>
          <div style="margin-bottom: 1.25rem;">
            <span class="child-friendly-badge" style="font-size: 0.75rem; padding: 0.2rem 0.65rem;">Caregiver Authorization</span>
            <h3 style="font-size: 1.4rem; font-family: var(--font-heading); margin-top: 0.35rem; margin-bottom: 0.25rem; color: var(--text-main);">
              Add Authorized Medical Proxy
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
              Authorize a trusted family member or caregiver to accompany Liam to appointments and receive clinical updates.
            </p>
          </div>
          <form id="addProxyForm">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label" for="proxyName">Proxy Full Name</label>
              <input type="text" class="form-input" id="proxyName" placeholder="e.g. Michael Carter" required>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group">
                <label class="form-label" for="proxyRelationship">Relationship to Liam</label>
                <select class="form-select" id="proxyRelationship" required>
                  <option value="Grandparent" selected>Grandparent</option>
                  <option value="Co-Parent / Father">Co-Parent / Father</option>
                  <option value="Legal Guardian">Legal Guardian</option>
                  <option value="Nanny / Caregiver">Nanny / Caregiver</option>
                  <option value="Aunt / Uncle">Aunt / Uncle</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="proxyPhone">Mobile Phone</label>
                <input type="tel" class="form-input" id="proxyPhone" placeholder="(555) 000-0000" required>
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label class="form-label">Permissions &amp; Authority</label>
              <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.35rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="permPickup" checked style="accent-color: var(--brand-lavender);"> Escort to Visits &amp; Authorized Clinic Pickup
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="permRecords" checked style="accent-color: var(--brand-lavender);"> View Vaccine &amp; Growth Records
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="permConsent" style="accent-color: var(--brand-lavender);"> Emergency Medical Treatment Consent
                </label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Authorize Caregiver Proxy →</button>
          </form>
        </div>
      </dialog>

      <!-- 3. Log Home Measurement Modal -->
      <dialog class="custom-modal" id="logMeasurementModal">
        <div class="modal-content-card">
          <button class="modal-close-btn" data-close-modal aria-label="Close dialog">✕</button>
          <div style="margin-bottom: 1.25rem;">
            <span class="child-friendly-badge" style="font-size: 0.75rem; padding: 0.2rem 0.65rem;">Growth Registry</span>
            <h3 style="font-size: 1.4rem; font-family: var(--font-heading); margin-top: 0.35rem; margin-bottom: 0.25rem; color: var(--text-main);">
              Log Home Measurement
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
              Record Liam's latest weight, height, and head circumference to plot on the CDC growth velocity curve.
            </p>
          </div>
          <form id="logMeasurementForm">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group">
                <label class="form-label" for="measureDate">Measurement Date</label>
                <input type="date" class="form-input" id="measureDate" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="measureAge">Child Age (Months)</label>
                <input type="text" class="form-input" id="measureAge" value="14 Months" required>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group">
                <label class="form-label" for="measureWeight">Weight (kg)</label>
                <input type="number" step="0.1" class="form-input" id="measureWeight" placeholder="e.g. 10.4" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="measureHeight">Height / Length (cm)</label>
                <input type="number" step="0.1" class="form-input" id="measureHeight" placeholder="e.g. 78.5" required>
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label" for="measureHead">Head Circumference (cm)</label>
              <input type="number" step="0.1" class="form-input" id="measureHead" value="46.5">
            </div>
            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label class="form-label" for="measureNotes">Measurement Location / Notes</label>
              <input type="text" class="form-input" id="measureNotes" value="Home Digital Scale - Morning Check">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Record &amp; Plot on CDC Curve →</button>
          </form>
        </div>
      </dialog>

      <!-- 4. Prescription Refill Modal -->
      <dialog class="custom-modal" id="refillModal">
        <div class="modal-content-card">
          <button class="modal-close-btn" data-close-modal aria-label="Close dialog">✕</button>
          <div style="margin-bottom: 1.25rem;">
            <span class="child-friendly-badge" style="font-size: 0.75rem; padding: 0.2rem 0.65rem;">Pediatric Pharmacy</span>
            <h3 style="font-size: 1.4rem; font-family: var(--font-heading); margin-top: 0.35rem; margin-bottom: 0.25rem; color: var(--text-main);">
              Request Prescription Refill
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
              Electronic refill transmission to your designated retail pharmacy.
            </p>
          </div>
          <form id="refillForm">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label" for="refillMed">Medication</label>
              <input type="text" class="form-input" id="refillMed" value="Vitamin D3 (Cholecalciferol Drops) — 400 IU/mL" readonly>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group">
                <label class="form-label" for="refillQty">Refill Quantity</label>
                <select class="form-select" id="refillQty">
                  <option value="90" selected>90-Day Supply (3 Bottles)</option>
                  <option value="30">30-Day Supply (1 Bottle)</option>
                  <option value="180">180-Day Supply (6 Bottles)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="refillPharmacy">Routing Pharmacy</label>
                <input type="text" class="form-input" id="refillPharmacy" value="Walgreens Pediatric #4810" readonly>
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label class="form-label" for="refillMethod">Delivery or Pickup Method</label>
              <select class="form-select" id="refillMethod">
                <option value="pickup" selected>Drive-thru Pickup (Ready in ~2h)</option>
                <option value="delivery">Free Courier Home Delivery (Next Morning)</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Dispatch Refill to Dr. Carter →</button>
          </form>
        </div>
      </dialog>

      <!-- 5. Change Preferred Pharmacy Modal -->
      <dialog class="custom-modal" id="changePharmacyModal">
        <div class="modal-content-card">
          <button class="modal-close-btn" data-close-modal aria-label="Close dialog">✕</button>
          <div style="margin-bottom: 1.25rem;">
            <span class="child-friendly-badge" style="font-size: 0.75rem; padding: 0.2rem 0.65rem;">Pharmacy Routing</span>
            <h3 style="font-size: 1.4rem; font-family: var(--font-heading); margin-top: 0.35rem; margin-bottom: 0.25rem; color: var(--text-main);">
              Change Preferred Pharmacy
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
              Select which retail or compounding pharmacy receives electronic orders for Liam.
            </p>
          </div>
          <form id="changePharmacyForm">
            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label class="form-label" for="pharmacyChoice">Select Pharmacy</label>
              <select class="form-select" id="pharmacyChoice" required>
                <option value="Walgreens Pediatric Specialty • 1024 Elmwood Ave (Open 24h)" selected>Walgreens Pediatric Specialty • 1024 Elmwood Ave (Open 24h)</option>
                <option value="CVS Pharmacy Children's Care • 450 Maple St (8 AM – 10 PM)">CVS Pharmacy Children's Care • 450 Maple St (8 AM – 10 PM)</option>
                <option value="Children's Hospital Outpatient Pharmacy • Main Campus Level 1">Children's Hospital Outpatient Pharmacy • Main Campus Level 1</option>
                <option value="Rite Aid Family Health • 880 Broadway Ave (9 AM – 9 PM)">Rite Aid Family Health • 880 Broadway Ave (9 AM – 9 PM)</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Save Preferred Pharmacy</button>
          </form>
        </div>
      </dialog>

      <!-- 6. Add Payment Method Modal -->
      <dialog class="custom-modal" id="addPaymentModal">
        <div class="modal-content-card">
          <button class="modal-close-btn" data-close-modal aria-label="Close dialog">✕</button>
          <div style="margin-bottom: 1.25rem;">
            <span class="child-friendly-badge" style="font-size: 0.75rem; padding: 0.2rem 0.65rem;">Billing &amp; Autopay</span>
            <h3 style="font-size: 1.4rem; font-family: var(--font-heading); margin-top: 0.35rem; margin-bottom: 0.25rem; color: var(--text-main);">
              Add Payment Method
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
              Add a credit card or HSA/FSA debit card for seamless copay settlement.
            </p>
          </div>
          <form id="addPaymentForm">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label" for="cardHolder">Name on Card</label>
              <input type="text" class="form-input" id="cardHolder" value="Sarah Carter" required>
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label" for="cardNumber">Card Number</label>
              <input type="text" class="form-input" id="cardNumber" placeholder="•••• •••• •••• 5678" maxlength="19" required>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem; margin-bottom: 1.25rem;">
              <div class="form-group">
                <label class="form-label" for="cardExp">Expires</label>
                <input type="text" class="form-input" id="cardExp" placeholder="MM/YY" maxlength="5" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="cardCvc">CVC</label>
                <input type="password" class="form-input" id="cardCvc" placeholder="•••" maxlength="4" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="cardZip">ZIP Code</label>
                <input type="text" class="form-input" id="cardZip" placeholder="90210" maxlength="5" required>
              </div>
            </div>
            <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; margin-bottom: 1.25rem; cursor: pointer; color: var(--text-main);">
              <input type="checkbox" id="cardDefault" checked style="accent-color: var(--brand-lavender);"> Set as primary payment method for upcoming checkups
            </label>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Securely Save Card →</button>
          </form>
        </div>
      </dialog>

      <!-- 7. Update Insurance Card Modal -->
      <dialog class="custom-modal" id="updateInsuranceModal">
        <div class="modal-content-card">
          <button class="modal-close-btn" data-close-modal aria-label="Close dialog">✕</button>
          <div style="margin-bottom: 1.25rem;">
            <span class="child-friendly-badge" style="font-size: 0.75rem; padding: 0.2rem 0.65rem;">Insurance Verification</span>
            <h3 style="font-size: 1.4rem; font-family: var(--font-heading); margin-top: 0.35rem; margin-bottom: 0.25rem; color: var(--text-main);">
              Update Insurance Card Details
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
              Update policy numbers or carrier changes for real-time pediatric claim settlement.
            </p>
          </div>
          <form id="updateInsuranceForm">
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label" for="insCarrier">Insurance Carrier</label>
              <select class="form-select" id="insCarrier" required>
                <option value="Blue Cross Blue Shield (BCBS PPO)" selected>Blue Cross Blue Shield (BCBS PPO)</option>
                <option value="Aetna Pediatric Select">Aetna Pediatric Select</option>
                <option value="Cigna Open Access Plus">Cigna Open Access Plus</option>
                <option value="UnitedHealthcare Choice Plus">UnitedHealthcare Choice Plus</option>
                <option value="Kaiser Permanente PPO">Kaiser Permanente PPO</option>
                <option value="State CHIP / Medicaid Plan">State CHIP / Medicaid Plan</option>
              </select>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group">
                <label class="form-label" for="insMemberId">Member / Policy ID</label>
                <input type="text" class="form-input" id="insMemberId" value="BCBS-89320194" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="insGroupId">Group Number</label>
                <input type="text" class="form-input" id="insGroupId" value="GRP-77401" required>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
              <div class="form-group">
                <label class="form-label" for="insSubscriber">Subscriber (Guardian)</label>
                <input type="text" class="form-input" id="insSubscriber" value="Sarah Carter" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="insCopay">Copay Amount ($)</label>
                <input type="text" class="form-input" id="insCopay" value="$0 Well-Child / $20 Specialist" required>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Verify &amp; Update Insurance Card →</button>
          </form>
        </div>
      </dialog>
    `;

    document.body.appendChild(modalContainer);

    // Setup close listeners for all dynamic modals
    modalContainer.querySelectorAll('dialog').forEach(modal => {
      const closeBtn = modal.querySelector('[data-close-modal]');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.close());
      }
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
      });
    });
  }

  /* Helper to open dialog cleanly */
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    try {
      if (typeof modal.showModal === 'function') {
        if (!modal.open) modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
    } catch (e) {
      modal.setAttribute('open', '');
    }
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    try {
      if (typeof modal.close === 'function') modal.close();
      else modal.removeAttribute('open');
    } catch (e) {
      modal.removeAttribute('open');
    }
  }

  /* --------------------------------------------------------------------------
     2. DIGITAL CHECK-IN WORKFLOW
     -------------------------------------------------------------------------- */
  function bindCheckInWorkflow() {
    // Intercept any check-in button
    document.querySelectorAll('button, a').forEach(el => {
      const text = (el.innerText || '').trim().toLowerCase();
      if (text.includes('check in online') || el.hasAttribute('data-action-checkin')) {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          openModal('checkInModal');
        });
      }
    });

    const form = document.getElementById('checkInForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('fs_checkin_done', 'true');
        closeModal('checkInModal');

        applyCheckInState();
        showToast('✓ Liam Carter is checked in! Exam Room 4 is preparing for Dr. Carter.');
      });
    }

    if (localStorage.getItem('fs_checkin_done') === 'true') {
      applyCheckInState();
    }
  }

  function applyCheckInState() {
    const banner = document.querySelector('.appointment-banner');
    if (banner) {
      const statusBadge = banner.querySelector('span[style*="uppercase"]');
      if (statusBadge) {
        statusBadge.innerText = '● Checked In • Room 4 Preparing';
        statusBadge.style.color = '#10B981';
        statusBadge.style.borderColor = '#10B981';
      }
      const checkinBtn = Array.from(banner.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('check in'));
      if (checkinBtn) {
        checkinBtn.innerText = '✓ Checked In';
        checkinBtn.classList.remove('btn-secondary');
        checkinBtn.classList.add('btn-primary');
        checkinBtn.style.background = '#10B981';
        checkinBtn.style.borderColor = '#10B981';
        checkinBtn.style.color = '#FFFFFF';
        checkinBtn.onclick = () => showToast('Liam Carter is already checked in. Proceed directly to Suite 3B / Room 4.');
      }
    }
  }

  /* --------------------------------------------------------------------------
     3. ADD AUTHORIZED PROXY WORKFLOW
     -------------------------------------------------------------------------- */
  function bindProxyWorkflow() {
    document.querySelectorAll('button, a').forEach(el => {
      const text = (el.innerText || '').trim();
      if (text.includes('Add Authorized Proxy')) {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          openModal('addProxyModal');
        });
      }
    });

    const form = document.getElementById('addProxyForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('proxyName').value.trim();
        const rel = document.getElementById('proxyRelationship').value;
        const phone = document.getElementById('proxyPhone').value.trim();

        if (!name) return;

        const proxyObj = { name, rel, phone, status: 'Active', timestamp: Date.now() };
        saveProxy(proxyObj);
        closeModal('addProxyModal');
        form.reset();

        showToast(`Caregiver ${name} (${rel}) successfully authorized as medical proxy.`);
      });
    }

    renderSavedProxies();
  }

  function saveProxy(proxy) {
    const list = JSON.parse(localStorage.getItem('fs_authorized_proxies') || '[]');
    list.push(proxy);
    localStorage.setItem('fs_authorized_proxies', JSON.stringify(list));
    renderSavedProxies();
  }

  function renderSavedProxies() {
    const list = JSON.parse(localStorage.getItem('fs_authorized_proxies') || '[]');
    if (!list.length) return;

    // Locate proxies container on dashboard-settings.html
    const proxyGrid = document.querySelector('.dash-card div[style*="grid-template-columns: repeat(auto-fit"]');
    if (!proxyGrid) return;

    // Check if custom elements already rendered
    list.forEach(p => {
      const exists = Array.from(proxyGrid.querySelectorAll('strong')).some(s => s.innerText.includes(p.name));
      if (!exists) {
        const item = document.createElement('div');
        item.style.cssText = 'background: var(--bg-primary); border: 1px solid var(--border-blush); border-radius: var(--radius-md); padding: 1rem; display: flex; justify-content: space-between; align-items: center;';
        item.innerHTML = `
          <div>
            <strong style="color: var(--text-main); font-size: 0.9rem; display: block;">${p.name} (${p.rel})</strong>
            <span style="font-size: 0.78rem; color: var(--text-muted);">${p.phone} • Authorized Escort &amp; Consent</span>
          </div>
          <span style="background: rgba(16, 185, 129, 0.15); color: #10B981; font-weight: 700; font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: var(--radius-pill);">Active</span>
        `;
        proxyGrid.appendChild(item);
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. GROWTH CHART & MEASUREMENT WORKFLOW
     -------------------------------------------------------------------------- */
  function bindGrowthAndMeasurementWorkflow() {
    // Intercept "+ Log Measurement"
    document.querySelectorAll('button, a').forEach(el => {
      const text = (el.innerText || '').trim();
      if (text.includes('Log Measurement')) {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          const dateInput = document.getElementById('measureDate');
          if (dateInput && !dateInput.value) {
            dateInput.value = new Date().toISOString().split('T')[0];
          }
          openModal('logMeasurementModal');
        });
      }
    });

    const form = document.getElementById('logMeasurementForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const dateVal = document.getElementById('measureDate').value;
        const ageVal = document.getElementById('measureAge').value;
        const weightVal = parseFloat(document.getElementById('measureWeight').value);
        const heightVal = parseFloat(document.getElementById('measureHeight').value);
        const headVal = parseFloat(document.getElementById('measureHead').value || '46.5');
        const notesVal = document.getElementById('measureNotes').value || 'Home Scale';

        if (!weightVal || !heightVal) return;

        const entry = {
          date: dateVal,
          age: ageVal,
          weight: weightVal,
          height: heightVal,
          head: headVal,
          notes: notesVal,
          percentile: '64th %'
        };

        const existing = JSON.parse(localStorage.getItem('fs_custom_measurements') || '[]');
        existing.unshift(entry);
        localStorage.setItem('fs_custom_measurements', JSON.stringify(existing));

        closeModal('logMeasurementModal');
        form.reset();

        appendMeasurementRow(entry);
        renderGrowthChart();
        showToast(`Logged measurement: ${weightVal} kg / ${heightVal} cm plotted on CDC curve.`);
      });
    }

    renderSavedMeasurementRows();
  }

  function appendMeasurementRow(entry) {
    const table = document.querySelector('table tbody');
    if (!table) return;

    const tr = document.createElement('tr');
    tr.style.cssText = 'border-bottom: 1px solid var(--border-blush); background: rgba(133, 92, 150, 0.08);';
    tr.innerHTML = `
      <td style="padding: 0.75rem 1rem; font-weight: 700;">${entry.age} <span style="font-size: 0.7rem; color: var(--brand-lavender);">(New)</span></td>
      <td style="padding: 0.75rem 1rem;">${entry.date}</td>
      <td style="padding: 0.75rem 1rem;">${entry.weight} kg</td>
      <td style="padding: 0.75rem 1rem;">${entry.height} cm</td>
      <td style="padding: 0.75rem 1rem;">${entry.head} cm</td>
      <td style="padding: 0.75rem 1rem;"><span style="color: #10B981; font-weight: 700;">${entry.percentile}</span></td>
      <td style="padding: 0.75rem 1rem;">${entry.notes}</td>
    `;
    table.insertBefore(tr, table.firstChild);
  }

  function renderSavedMeasurementRows() {
    const existing = JSON.parse(localStorage.getItem('fs_custom_measurements') || '[]');
    existing.forEach(appendMeasurementRow);
  }

  /* --------------------------------------------------------------------------
     5. DYNAMIC INTERACTIVE SVG GROWTH CHART
     -------------------------------------------------------------------------- */
  function renderGrowthChart() {
    const canvasContainers = document.querySelectorAll('#growthChartCanvas');
    if (!canvasContainers.length) return;

    let activeMetric = localStorage.getItem('fs_chart_metric') || 'both';

    // Metric Toggle Buttons
    document.querySelectorAll('[data-chart-metric]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-chart-metric') === activeMetric);
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('[data-chart-metric]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeMetric = btn.getAttribute('data-chart-metric');
        localStorage.setItem('fs_chart_metric', activeMetric);
        drawSVG();
      });
    });

    drawSVG();

    function drawSVG() {
      canvasContainers.forEach(container => {
        const width = 680;
        const height = 240;
        const padding = { top: 25, right: 30, bottom: 35, left: 45 };

        // Baseline Points (Liam Carter 14 Months)
        const points = [
          { month: 'Birth', ageNum: 0, weight: 3.4, height: 50.0, whoWeight: 3.3 },
          { month: '4 Mo', ageNum: 4, weight: 6.9, height: 64.0, whoWeight: 6.7 },
          { month: '6 Mo', ageNum: 6, weight: 8.1, height: 68.1, whoWeight: 7.9 },
          { month: '9 Mo', ageNum: 9, weight: 9.2, height: 72.3, whoWeight: 8.9 },
          { month: '12 Mo', ageNum: 12, weight: 9.8, height: 75.2, whoWeight: 9.6 },
          { month: '14 Mo', ageNum: 14, weight: 10.2, height: 76.8, whoWeight: 10.1 }
        ];

        // Include any custom logged measurement
        const custom = JSON.parse(localStorage.getItem('fs_custom_measurements') || '[]');
        if (custom.length) {
          const last = custom[0];
          points.push({
            month: last.age || 'Today',
            ageNum: 15,
            weight: last.weight,
            height: last.height,
            whoWeight: 10.3
          });
        }

        const plotW = width - padding.left - padding.right;
        const plotH = height - padding.top - padding.bottom;

        // Scale functions
        const getX = (i) => padding.left + (i / (points.length - 1)) * plotW;
        const getYWeight = (w) => padding.top + plotH - ((w - 2) / (12 - 2)) * plotH;
        const getYHeight = (h) => padding.top + plotH - ((h - 45) / (85 - 45)) * plotH;

        // Generate lines
        let weightPath = '';
        let heightPath = '';
        let whoBandPath = '';

        points.forEach((p, i) => {
          const x = getX(i);
          const yW = getYWeight(p.weight);
          const yH = getYHeight(p.height);

          weightPath += (i === 0 ? `M ${x} ${yW}` : ` L ${x} ${yW}`);
          heightPath += (i === 0 ? `M ${x} ${yH}` : ` L ${x} ${yH}`);
        });

        // Grid lines
        let gridLines = '';
        for (let g = 0; g <= 4; g++) {
          const y = padding.top + (plotH / 4) * g;
          gridLines += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="var(--border-blush)" stroke-dasharray="3,3" opacity="0.6"/>`;
        }

        // X Axis labels
        let xLabels = '';
        points.forEach((p, i) => {
          const x = getX(i);
          xLabels += `<text x="${x}" y="${height - 10}" fill="var(--text-muted)" font-size="11" text-anchor="middle" font-family="var(--font-sans)">${p.month}</text>`;
        });

        // Points
        let weightCircles = '';
        let heightCircles = '';

        points.forEach((p, i) => {
          const x = getX(i);
          const yW = getYWeight(p.weight);
          const yH = getYHeight(p.height);

          weightCircles += `
            <circle cx="${x}" cy="${yW}" r="5" fill="#10B981" stroke="#FFFFFF" stroke-width="2" class="chart-point" data-info="Weight: ${p.weight} kg (${p.month})"/>
            <text x="${x}" y="${yW - 9}" fill="#10B981" font-size="10" font-weight="700" text-anchor="middle">${p.weight}kg</text>
          `;
          heightCircles += `
            <circle cx="${x}" cy="${yH}" r="5" fill="#855C96" stroke="#FFFFFF" stroke-width="2" class="chart-point" data-info="Height: ${p.height} cm (${p.month})"/>
            <text x="${x}" y="${yH - 9}" fill="#855C96" font-size="10" font-weight="700" text-anchor="middle">${p.height}cm</text>
          `;
        });

        const showWeight = activeMetric === 'both' || activeMetric === 'weight';
        const showHeight = activeMetric === 'both' || activeMetric === 'height';

        container.innerHTML = `
          <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; overflow: visible;">
            <!-- Grid Lines -->
            ${gridLines}

            <!-- Y-Axis Labels -->
            <text x="${padding.left - 8}" y="${getYWeight(11)}" fill="#10B981" font-size="10" font-weight="700" text-anchor="end">11 kg</text>
            <text x="${padding.left - 8}" y="${getYWeight(7)}" fill="#10B981" font-size="10" font-weight="700" text-anchor="end">7 kg</text>
            <text x="${padding.left - 8}" y="${getYWeight(3)}" fill="#10B981" font-size="10" font-weight="700" text-anchor="end">3 kg</text>

            <!-- Lines -->
            ${showWeight ? `<path d="${weightPath}" fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>` : ''}
            ${showHeight ? `<path d="${heightPath}" fill="none" stroke="#855C96" stroke-width="3" stroke-linecap="round" stroke-dasharray="4,2"/>` : ''}

            <!-- Circles -->
            ${showWeight ? weightCircles : ''}
            ${showHeight ? heightCircles : ''}

            <!-- X Axis -->
            ${xLabels}
          </svg>
        `;
      });
    }
  }

  /* --------------------------------------------------------------------------
     6. PRESCRIPTIONS & REFILL WORKFLOW
     -------------------------------------------------------------------------- */
  function bindPrescriptionAndRefillWorkflow() {
    // Intercept refill buttons
    document.querySelectorAll('button, a').forEach(el => {
      const text = (el.innerText || '').trim();
      if (text.includes('Request Refill') || text.includes('Refill at Walgreens')) {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          openModal('refillModal');
        });
      }
      if (text === 'Change' && el.closest('.dash-card') && el.closest('.dash-card').innerText.includes('Pharmacy')) {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          openModal('changePharmacyModal');
        });
      }
      if (text.includes('View Instructions PDF')) {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          showToast('📥 Downloading Vitamin D3 Pediatric Administration Guide (PDF)...');
        });
      }
    });

    const refillForm = document.getElementById('refillForm');
    if (refillForm) {
      refillForm.addEventListener('submit', (e) => {
        e.preventDefault();
        closeModal('refillModal');

        // Update prescription badge
        const rxBadge = document.querySelector('.dash-card span[style*="Active"]');
        if (rxBadge) {
          rxBadge.innerText = 'Refill Queued (Dr. Carter Review)';
          rxBadge.style.background = 'rgba(245, 158, 11, 0.15)';
          rxBadge.style.color = '#D97706';
        }
        showToast('⚡ Refill request transmitted to Walgreens Pediatric #4810. Dr. Carter will review within 24h.');
      });
    }

    const pharmacyForm = document.getElementById('changePharmacyForm');
    if (pharmacyForm) {
      pharmacyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const choice = document.getElementById('pharmacyChoice').value;
        const namePart = choice.split('•')[0].trim();
        const addrPart = choice.split('•')[1] ? choice.split('•')[1].trim() : '';

        const pharmacyTitle = document.querySelector('.dash-card strong[style*="font-size: 0.9rem"]');
        if (pharmacyTitle) pharmacyTitle.innerText = namePart;
        const pharmacySub = document.querySelector('.dash-card p[style*="margin: 0.2rem"]');
        if (pharmacySub && addrPart) pharmacySub.innerText = addrPart;

        closeModal('changePharmacyModal');
        showToast(`Preferred pharmacy updated to ${namePart}.`);
      });
    }
  }

  /* --------------------------------------------------------------------------
     7. BILLING, CARDS & INSURANCE WORKFLOW
     -------------------------------------------------------------------------- */
  function bindBillingAndPaymentWorkflow() {
    document.querySelectorAll('button, a').forEach(el => {
      const text = (el.innerText || '').trim();
      if (text.includes('Add Payment Method')) {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          openModal('addPaymentModal');
        });
      }
      if (text.includes('Update Insurance Card')) {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          openModal('updateInsuranceModal');
        });
      }
      if (text === 'PDF' && el.closest('table')) {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          showToast('📥 Downloading itemized claim receipt PDF (#FS-REC-901)...');
        });
      }
    });

    const paymentForm = document.getElementById('addPaymentForm');
    if (paymentForm) {
      paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const num = document.getElementById('cardNumber').value.trim();
        const last4 = num.slice(-4) || '8812';
        closeModal('addPaymentModal');

        showToast(`Payment card ending in •••• ${last4} added and verified.`);
      });
    }

    const insForm = document.getElementById('updateInsuranceForm');
    if (insForm) {
      insForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const carrier = document.getElementById('insCarrier').value;
        const memberId = document.getElementById('insMemberId').value;

        const cardWidget = document.querySelector('.dash-card div[style*="linear-gradient(135deg"]');
        if (cardWidget) {
          const title = cardWidget.querySelector('h3');
          if (title) title.innerText = carrier.split('(')[0].trim();
          const p = cardWidget.querySelector('div strong');
          if (p) p.innerText = memberId;
        }

        closeModal('updateInsuranceModal');
        showToast(`Insurance carrier ${carrier.split('(')[0].trim()} updated and active.`);
      });
    }
  }

  /* --------------------------------------------------------------------------
     8. VACCINE TIMELINE FILTERS
     -------------------------------------------------------------------------- */
  function bindVaccineFilterWorkflow() {
    const filterButtons = document.querySelectorAll('[data-vaccine-filter]');
    const vaccineItems = document.querySelectorAll('.vaccine-item');

    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-vaccine-filter');
        vaccineItems.forEach(item => {
          const status = item.getAttribute('data-status') || '';
          if (filter === 'all') {
            item.style.display = 'flex';
          } else if (filter === 'completed') {
            item.style.display = (status === 'completed' || !status.includes('due')) ? 'flex' : 'none';
          } else if (filter === 'duesoon') {
            item.style.display = (status.includes('due') || status.includes('upcoming') || item.innerText.includes('Upcoming') || item.innerText.includes('Due Soon')) ? 'flex' : 'none';
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     9. MILESTONES PROGRESS CHECKLIST & SYNC
     -------------------------------------------------------------------------- */
  function bindMilestonesWorkflow() {
    // Intercept "Sync with Dr. Carter"
    document.querySelectorAll('button, a').forEach(el => {
      const text = (el.innerText || '').trim();
      if (text.includes('Sync with Dr. Carter')) {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          const orig = el.innerText;
          el.innerText = 'Syncing Chart...';
          el.disabled = true;

          setTimeout(() => {
            el.innerText = '✓ Synced with Dr. Carter';
            el.disabled = false;
            showToast('✓ 15-Month Milestone Questionnaire successfully synchronized to Dr. Maya Carter’s clinical EHR.');
          }, 600);
        });
      }
    });

    // Milestone Checkboxes
    const checkboxes = document.querySelectorAll('.dash-card input[type="checkbox"]');
    if (!checkboxes.length) return;

    checkboxes.forEach(cb => {
      cb.addEventListener('change', updateMilestoneScore);
    });

    function updateMilestoneScore() {
      const all = Array.from(checkboxes);
      const checkedCount = all.filter(c => c.checked).length;
      const total = all.length;
      const pct = Math.round((checkedCount / total) * 100);

      const headerText = document.querySelector('.dash-card strong[style*="Progress:"]');
      if (headerText) {
        headerText.innerText = `Liam's 14-Month Progress: ${checkedCount} of ${total} Mastered (${pct}%)`;
      }
      const progressBar = document.querySelector('.dash-card div[style*="linear-gradient(90deg"]');
      if (progressBar) {
        progressBar.style.width = `${pct}%`;
      }
    }
  }

  /* --------------------------------------------------------------------------
     10. MESSAGING COMPOSER & REAL-TIME INTERACTION
     -------------------------------------------------------------------------- */
  function bindMessagingWorkflow() {
    const composer = document.querySelector('.dash-card form textarea')?.closest('form');
    if (!composer) return;

    composer.removeAttribute('onsubmit');
    const msgStream = composer.previousElementSibling;

    composer.addEventListener('submit', (e) => {
      e.preventDefault();
      const textarea = composer.querySelector('textarea');
      const text = textarea ? textarea.value.trim() : '';
      if (!text) return;

      // Append parent bubble
      const parentBubble = document.createElement('div');
      parentBubble.style.cssText = 'align-self: flex-end; max-width: 80%; background: var(--brand-lavender); color: #FFFFFF; padding: 0.85rem 1.15rem; border-radius: 16px 16px 2px 16px; font-size: 0.9rem; line-height: 1.5; margin-top: 0.75rem;';
      parentBubble.innerHTML = `
        <div style="font-size: 0.7rem; color: rgba(255, 255, 255, 0.8); margin-bottom: 0.25rem;">Sarah Carter (Mother) • Just now</div>
        ${escapeHTML(text)}
      `;

      if (msgStream) {
        msgStream.appendChild(parentBubble);
        msgStream.scrollTop = msgStream.scrollHeight;
      }

      textarea.value = '';
      showToast('Message dispatched to Dr. Maya Carter. Clinic triage notified.');

      // Simulated automated clinical triage ack
      setTimeout(() => {
        const triageBubble = document.createElement('div');
        triageBubble.style.cssText = 'align-self: flex-start; max-width: 80%; background: var(--bg-primary); border: 1px solid var(--border-blush); padding: 0.85rem 1.15rem; border-radius: 16px 16px 16px 2px; font-size: 0.9rem; line-height: 1.5; color: var(--text-main); margin-top: 0.75rem;';
        triageBubble.innerHTML = `
          <div style="font-size: 0.7rem; color: var(--brand-lavender); font-weight: 700; margin-bottom: 0.25rem;">Dr. Carter's Pediatric Clinical Desk • Just now</div>
          Thank you Sarah! Your message and notes have been received by our triage team. Dr. Carter will review during her afternoon clinical rounds.
        `;
        if (msgStream) {
          msgStream.appendChild(triageBubble);
          msgStream.scrollTop = msgStream.scrollHeight;
        }
      }, 1500);
    });

    // Attach Photo Tool
    const attachBtn = composer.querySelector('button[type="button"]');
    if (attachBtn) {
      attachBtn.removeAttribute('onclick');
      attachBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = () => {
          if (fileInput.files.length) {
            showToast(`📷 Photo attached: ${fileInput.files[0].name}. Ready to send with message.`);
            attachBtn.innerText = `📷 Attached: ${fileInput.files[0].name.slice(0, 12)}...`;
          }
        };
        fileInput.click();
      });
    }
  }

  /* --------------------------------------------------------------------------
     11. SETTINGS PROFILE WORKFLOW
     -------------------------------------------------------------------------- */
  function bindSettingsWorkflow() {
    const profileForm = document.querySelector('.dash-card form[onsubmit*="Profile updates"]');
    if (profileForm) {
      profileForm.removeAttribute('onsubmit');
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = profileForm.querySelector('input[value*="Liam"]');
        const guardianInput = profileForm.querySelector('input[value*="Sarah"]');
        if (nameInput) localStorage.setItem('fs_child_name', nameInput.value.trim());
        if (guardianInput) localStorage.setItem('fs_guardian_name', guardianInput.value.trim());

        showToast('✓ Family profile changes saved and updated in electronic chart.');
      });
    }
  }

  /* --------------------------------------------------------------------------
     12. DOCUMENT DOWNLOAD WORKFLOWS (PDF PASSPORT & VIS PACKS)
     -------------------------------------------------------------------------- */
  function bindDocumentDownloads() {
    document.querySelectorAll('button, a').forEach(el => {
      const text = (el.innerText || '').trim();
      if (text.includes('Official Vaccine Passport (PDF)')) {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          showToast('📥 Generating official Daycare & School Vaccine Certificate (PDF)... Download started.');
        });
      }
      if (text.includes('Download Complete VIS Pack')) {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          showToast('📥 Downloading CDC Vaccine Information Statements (VIS Pack PDF)...');
        });
      }
      if (text.includes('Download Complete Records PDF')) {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          showToast('📥 Generating certified laboratory diagnostic report for Liam Carter (PDF)...');
        });
      }
    });
  }

  /* --------------------------------------------------------------------------
     13. TOAST NOTIFICATION UTILITY
     -------------------------------------------------------------------------- */
  function showToast(msg) {
    let container = document.getElementById('dashboardToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'dashboardToastContainer';
      container.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 9999999; display: flex; flex-direction: column; gap: 8px; pointer-events: none;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = 'background: #2D1D38; color: #FFFFFF; border: 1.5px solid #855C96; padding: 12px 20px; border-radius: 12px; font-size: 0.88rem; font-weight: 600; box-shadow: 0 10px 30px rgba(0,0,0,0.35); pointer-events: auto; animation: slideInUp 0.25s ease-out; display: flex; align-items: center; gap: 8px; max-width: 420px;';
    toast.innerHTML = msg;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4200);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

})();
