// Render halaman Upgrade VIP
function renderUpgradePage(container) {
    container.innerHTML = `
        <div class="upgrade-steps">
            <div class="step active" data-step="1">
                <div class="step-circle">1</div>
                <div class="step-label">Select Plan</div>
            </div>
            <div class="step" data-step="2">
                <div class="step-circle">2</div>
                <div class="step-label">Payment Method</div>
            </div>
            <div class="step" data-step="3">
                <div class="step-circle">3</div>
                <div class="step-label">Payment Details</div>
            </div>
            <div class="step" data-step="4">
                <div class="step-circle">4</div>
                <div class="step-label">Confirmation</div>
            </div>
        </div>
        
        <div class="step-content active" data-step="1">
            <h2 class="section-title">Select Your Plan</h2>
            <div class="plans-grid">
                <div class="plan-card" data-plan="monthly">
                    <h3>Monthly Plan</h3>
                    <div class="plan-price">Rp 50.000</div>
                    <div class="plan-period">per month</div>
                    <ul style="text-align: left; margin-bottom: 20px;">
                        <li>All PRO features</li>
                        <li>Priority support</li>
                        <li>Cancel anytime</li>
                    </ul>
                    <button class="btn btn-outline select-plan">Select Plan</button>
                </div>
                <div class="plan-card" data-plan="quarterly">
                    <h3>Quarterly Plan</h3>
                    <div class="plan-price">Rp 125.000</div>
                    <div class="plan-period">for 3 months</div>
                    <ul style="text-align: left; margin-bottom: 20px;">
                        <li>All PRO features</li>
                        <li>Priority support</li>
                        <li>Save 17%</li>
                    </ul>
                    <button class="btn btn-outline select-plan">Select Plan</button>
                </div>
            </div>
        </div>
        
        <div class="step-content" data-step="2">
            <h2 class="section-title">Select Payment Method</h2>
            <div class="payment-methods">
                <div class="payment-method" data-bank="bca">
                    <div class="payment-logo">BCA</div>
                    <div>
                        <h4>Bank Central Asia</h4>
                        <p>Transfer Bank</p>
                    </div>
                </div>
                <div class="payment-method" data-bank="mandiri">
                    <div class="payment-logo">MANDIRI</div>
                    <div>
                        <h4>Bank Mandiri</h4>
                        <p>Transfer Bank</p>
                    </div>
                </div>
                <div class="payment-method" data-bank="bri">
                    <div class="payment-logo">BRI</div>
                    <div>
                        <h4>Bank Rakyat Indonesia</h4>
                        <p>Transfer Bank</p>
                    </div>
                </div>
            </div>
            
            <div class="payment-actions">
                <button class="btn btn-outline prev-step">Previous</button>
                <button class="btn btn-primary next-step">Next</button>
            </div>
        </div>
        
        <div class="step-content" data-step="3">
            <div class="account-info">
                <h3>Payment Instructions</h3>
                <p>Please transfer the exact amount to the following account:</p>
                <div style="background: var(--light); padding: 16px; border-radius: var(--radius-sm); margin: 16px 0;">
                    <p><strong>Bank:</strong> <span id="bank-name">BCA</span></p>
                    <p><strong>Account Number:</strong> <span id="account-number">1234-5678-9012</span></p>
                    <p><strong>Account Holder:</strong> <span id="account-holder">PT. Vinix7 Indonesia</span></p>
                    <p><strong>Amount:</strong> <span id="payment-amount">Rp 50.000</span></p>
                </div>
                <p>After making the payment, please fill in the details below:</p>
            </div>
            
            <div class="form-group">
                <label class="form-label" for="sender-account">Your Account Number</label>
                <input type="text" id="sender-account" class="form-input" placeholder="Enter your account number">
            </div>
            
            <div class="form-group">
                <label class="form-label" for="sender-name">Account Holder Name</label>
                <input type="text" id="sender-name" class="form-input" placeholder="Enter account holder name">
            </div>
            
            <div class="form-group">
                <label class="form-label">Proof of Payment</label>
                <div class="file-upload" id="payment-proof-dropzone">
                    <i class="ri-upload-cloud-2-line"></i>
                    <p>Click to upload or drag and drop</p>
                    <p>PDF, JPG, PNG (Max. 5MB)</p>
                </div>
                <input type="file" id="payment-proof" style="display: none;" accept=".pdf,.jpg,.jpeg,.png">
            </div>
            
            <div id="payment-preview"></div>
            
            <div class="payment-actions">
                <button class="btn btn-outline prev-step">Previous</button>
                <button class="btn btn-primary" id="confirm-payment">Confirm Payment</button>
            </div>
        </div>
        
        <div class="step-content" data-step="4">
            <div class="success-screen">
                <div class="success-icon">
                    <i class="ri-check-line"></i>
                </div>
                <h2>Payment Successful!</h2>
                <p>Your PRO membership has been activated. You now have access to all premium features.</p>
                <button class="btn btn-primary" id="go-to-home">Go to Dashboard</button>
            </div>
        </div>
    `;
    
    // Setup step navigation
    setupUpgradeSteps();
}

// Setup navigasi untuk halaman upgrade
function setupUpgradeSteps() {
    let currentStep = 1;
    let selectedPlan = null;
    let selectedBank = null;
    let paymentFile = null;
    
    // Pilih plan
    document.querySelectorAll('.select-plan').forEach(btn => {
        btn.addEventListener('click', function() {
            const planCard = this.closest('.plan-card');
            selectedPlan = planCard.getAttribute('data-plan');
            
            // Update UI
            document.querySelectorAll('.plan-card').forEach(card => card.classList.remove('selected'));
            planCard.classList.add('selected');
            
            // Update jumlah pembayaran
            const amount = selectedPlan === 'monthly' ? 'Rp 50.000' : 'Rp 125.000';
            document.getElementById('payment-amount').textContent = amount;
            
            // Lanjut ke step berikutnya
            navigateToStep(2);
        });
    });
    
    // Pilih bank
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function() {
            selectedBank = this.getAttribute('data-bank');
            
            // Update UI
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
            
            // Update informasi bank
            const bankInfo = {
                bca: { name: 'BCA', number: '1234-5678-9012' },
                mandiri: { name: 'Mandiri', number: '9876-5432-1010' },
                bri: { name: 'BRI', number: '5678-1234-9012' }
            };
            
            document.getElementById('bank-name').textContent = bankInfo[selectedBank].name;
            document.getElementById('account-number').textContent = bankInfo[selectedBank].number;
        });
    });
    
    // Navigasi next step
    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', function() {
            if (currentStep === 2 && !selectedBank) {
                alert('Please select a payment method');
                return;
            }
            
            navigateToStep(currentStep + 1);
        });
    });
    
    // Navigasi previous step
    document.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', function() {
            navigateToStep(currentStep - 1);
        });
    });
    
    // Upload bukti pembayaran
    document.getElementById('payment-proof-dropzone').addEventListener('click', function() {
        document.getElementById('payment-proof').click();
    });
    
    document.getElementById('payment-proof').addEventListener('change', function(e) {
        if (e.target.files.length) {
            paymentFile = e.target.files[0];
            
            // Validasi file
            const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5MB
            
            if (!validTypes.includes(paymentFile.type)) {
                alert('Please upload a PDF, JPG, or PNG file.');
                return;
            }
            
            if (paymentFile.size > maxSize) {
                alert('File size exceeds 5MB limit.');
                return;
            }
            
            // Tampilkan preview
            const previewContainer = document.getElementById('payment-preview');
            if (paymentFile.type === 'application/pdf') {
                previewContainer.innerHTML = `
                    <div class="file-item">
                        <div class="file-info">
                            <i class="ri-file-pdf-line file-icon"></i>
                            <span>${paymentFile.name}</span>
                        </div>
                        <span>PDF File</span>
                    </div>
                `;
            } else {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewContainer.innerHTML = `
                        <div class="file-item">
                            <div class="file-info">
                                <i class="ri-image-line file-icon"></i>
                                <span>${paymentFile.name}</span>
                            </div>
                            <img src="${e.target.result}" alt="Preview" style="max-width: 100px; max-height: 100px; border-radius: var(--radius-sm);">
                        </div>
                    `;
                };
                reader.readAsDataURL(paymentFile);
            }
        }
    });
    
    // Konfirmasi pembayaran
    document.getElementById('confirm-payment').addEventListener('click', function() {
        const senderAccount = document.getElementById('sender-account').value;
        const senderName = document.getElementById('sender-name').value;
        
        if (!senderAccount || !senderName || !paymentFile) {
            alert('Please fill in all payment details');
            return;
        }
        
        // Tampilkan loading
        this.innerHTML = '<div class="loading"></div> Processing...';
        this.disabled = true;
        
        // Simulasi proses pembayaran
        setTimeout(() => {
            // Update status user menjadi VIP
            appData.user.isVIP = true;
            localStorage.setItem('isVIP', 'true');
            localStorage.setItem('app_user', JSON.stringify(appData.user));
            
            // Simpan transaksi
            const transaction = {
                date: new Date().toLocaleDateString(),
                description: 'PRO Membership - ' + (selectedPlan === 'monthly' ? 'Monthly' : '3 Months'),
                amount: selectedPlan === 'monthly' ? 'Rp 50.000' : 'Rp 125.000',
                status: 'Completed'
            };
            
            appData.transactions.push(transaction);
            localStorage.setItem('app_transactions', JSON.stringify(appData.transactions));
            
            // Lanjut ke step terakhir
            navigateToStep(4);
        }, 2000);
    });
    
    // Tombol kembali ke home setelah pembayaran berhasil
    document.getElementById('go-to-home').addEventListener('click', function() {
        window.location.hash = 'home';
    });
    
    // Fungsi navigasi step
    function navigateToStep(step) {
        // Validasi step
        if (step < 1 || step > 4) return;
        
        // Update current step
        currentStep = step;
        
        // Update UI steps
        document.querySelectorAll('.step').forEach(s => {
            const stepNum = parseInt(s.getAttribute('data-step'));
            s.classList.remove('active', 'completed');
            
            if (stepNum === currentStep) {
                s.classList.add('active');
            } else if (stepNum < currentStep) {
                s.classList.add('completed');
            }
        });
        
        // Update konten step
        document.querySelectorAll('.step-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelector(`.step-content[data-step="${currentStep}"]`).classList.add('active');
    }
}