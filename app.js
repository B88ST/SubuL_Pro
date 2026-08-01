/* =========================================================================
   منصة سُبل | نظام إدارة عيادات ومراكز طب الأسنان
   ملف التحكم والمنطق البرمجي (Core JS Controller - Graphic SVGs Update)
   ========================================================================= */

// =========================================================================
// 1. INITIAL SEED DATABASE (إعادة تهيئة وتصفير قاعدة البيانات طبقاً للقطات)
// =========================================================================
const defaultDatabase = {
    currentUser: {
        username: "محمد يوسف اسعد",
        role: "مشرف العيادة (Admin)",
        isAdmin: true,
        usernameKey: "MohaMMed.Y.A"
    },
    users: [
        { username: "MohaMMed.Y.A", password: "Alrawi2003M", clinicName: "منصة سبل", ownerName: "محمد يوسف اسعد", role: "OWNER" }
    ],
    isLocked: false,
    theme: 'dark',

    // Clinic General Settings (إعدادات العيادة للطباعة والشعار - مطابقة للصورة 3)
    settings: {
        clinicName: "منصة سبل",
        clinicNameEn: "SOBIL DENTAL CLINIC",
        clinicManager: "محمد يوسف اسعد",
        workingHours: "4:00 مساءً - 8:00 مساءً",
        address: "بغداد، الشعب، شارع عدن",
        clinicPhone: "07855906001",
        currency: "د.ع",
        taxPercent: 0,
        logo: "assets/logo.jpg"
    },

    // Staff List & Doctors (الكادر الوظيفي والأطباء المسجلين)
    staff: [
        { id: "STF-104", name: "محمد يوسف اسعد", role: "ADMIN", roleAr: "مشرف العيادة (Admin)", phone: "07855906001", salary: 1500000, hireDate: "2023-09-01", photo: "" }
    ],

    // Patients Directory (العمر فقط - إزالة حقل المواليد)
    patients: [],

    // Tooth states per patient (حالات الأسنان 1 إلى 32 لكل مريض)
    patientTeeth: {},

    // Educational Atlas Cards (شبكة الأطلس الطبي - مطابقة للقطة 5)
    atlasCards: [
        {
            id: "ATL-001",
            title: "التركيبات السنية وتيجان وجسور الأسنان",
            category: "تركيبات وتجميل",
            image: "assets/prosthodontics_bridge.jpg",
            desc: "التيجان (التلبيسات) تستخدم لتغليف وحماية الأسنان المتآكلة أو بعد علاج العصب، أما الجسور فتستخدم لتعويض سن مفقود أو أكثر عبر ربطها وتثبيتها بالأسنان السليمة المجاورة بعد نحتها."
        },
        {
            id: "ATL-002",
            title: "حشوة الجذر وعلاج العصب vs الحشوة التجميلية",
            category: "الحشوات والترميمات",
            image: "assets/treatments.jpg",
            desc: "علاج العصب (حشوة الجذر) يتم عند التهاب اللب، حيث تنظف القنوات وتحشى بمادة الكوتا بيركا وتغطى لحمايتها. بينما الحشوة البيضاء (الكومبوزيت) في حشوة ضوئية تجميلية تسد تسوس التاج الظاهري وتطابق لون السن تماماً."
        },
        {
            id: "ATL-003",
            title: "حالة بنية السن: سليم / متسوس / ملتهب",
            category: "حالة الأسنان والأعراض",
            image: "assets/tooth_conditions.jpg",
            desc: "السن السليم يمتلك مينا وعاج قويين مع عصب حي وخال من التسوس. يبدأ التسوس كفجوة داكنة في المينا وتتغلغل للداخل، بينما السن الملتهب يعني عصب مصاب بالبكتيريا مع انتفاخ شديد عند جذر السن وألم نابض."
        },
        {
            id: "ATL-004",
            title: "تشريح جذور الأسنان وعدد القنوات العصبية",
            category: "تشريح الأسنان وجذورها",
            image: "assets/roots_canals_anatomy.jpg",
            desc: "ينقسم السن تشريحياً إلى التاج والجذر. وتتفاوت الجذور وعدد قنواتها من سن لآخر؛ القواطع والأنياب تمتلك جذراً واحداً وقناة واحدة، بينما الطواحن تمتلك جذرين إلى ثلاثة وجذور متعددة قد تصل إلى 4 قنوات عصبية."
        },
        {
            id: "ATL-005",
            title: "أنواع وحالات تقويم الأسنان وأهدافه",
            category: "تقويم الأسنان",
            image: "assets/ortho_braces.jpg",
            desc: "ينقسم إلى التقويم المعدني التقليدي، السيراميك الشفاف الشبيه بلون السن، والتقويم الشفاف (المتحرك). ويهدف لعلاج تزاحم الأسنان، الفراغات، أو عدم تطابق الفكين التجميلي والوظيفي."
        },
        {
            id: "ATL-006",
            title: "أنواع تصميم الابتسامات والعدسات التجميلية",
            category: "تركيبات وتجميل",
            image: "assets/smiles.jpg",
            desc: "تصميم الابتسامة أو ابتسامة هوليود يتم باستخدام قشور الفينير أو اللومينير الرقيقة جداً من السيراميك اللاصقة بالسطح الأمامي للأسنان لتحسين لونها وشكلها وسد الفراغات بدون حفر جائر."
        },
        {
            id: "ATL-007",
            title: "قلع الأسنان البسيط والجراحي",
            category: "الجراحة والقلع",
            image: "assets/extraction_guide.jpg",
            desc: "يتم قلع السن عند استحالة إنقاذه بسبب تسوس شديد أو كسر، وينقسم إلى قلع بسيط باستخدام الكلابة للأسنان الظاهرة، أو قلع جراحي للأسنان المدفونة مثل ضرس العقل ويتطلب شق لثوي للوصول للسن."
        },
        {
            id: "ATL-008",
            title: "زراعة الأسنان وتثبيت الغرسات",
            category: "زراعة الأسنان",
            image: "assets/implant_guide.jpg",
            desc: "زراعة الأسنان هي الحل الأمثل لتعويض الأسنان المفقودة، حيث يتم غرس وتثبيت وتد من مادة التيتانيوم جراحياً في عظم الفك ليقوم مقام جذر السن، ثم يركب فوقه التاج التجميلي بعد التئام العظم."
        }
    ],

    // Appointments (جدول المواعيد)
    appointments: [],

    // Financial Invoices (الفواتير والمقبوضات)
    invoices: [],

    // Operating expenses (المصروفات)
    expenses: [],

    // Inventory items (المستلزمات الطبية)
    inventory: [],

    // Equipments (الأجهزة)
    equipments: [],

    // Clinics subscriber (عيادات المشتركين)
    clinics: [],

    // Audit logs (سجل العمليات والأمن)
    logs: [],

    // Database backups (النسخ الاحتياطية)
    backups: [],

    // Support tickets
    tickets: [],

    // Prescriptions (الوصفات الطبية)
    prescriptions: [],
    
    // Attendance logs
    attendance: [],

    // Patient Sessions (سجل الجلسات)
    sessions: []
};

// Application state variables
let DB = {};
let selectedToothNumber = null;
let currentCalendarView = 'daily';
let activeStaffSubTab = 'staff-list';
let currentDentalView = 'jaw';
let selectedDoctorPhotoData = "";

// =========================================================================
// 2. CORE DATABASE INITIALIZATION (تحميل وتخزين البيانات محلياً)
// =========================================================================
function loadSessionAndUsers() {
    // 1. Load shared users list
    const savedUsers = localStorage.getItem('sobil_dental_shared_users');
    if (savedUsers) {
        DB.users = JSON.parse(savedUsers);
        // Ensure default owner has clinicId: 'PLATFORM'
        const owner = DB.users.find(u => u.username === "MohaMMed.Y.A");
        if (owner && !owner.clinicId) {
            owner.clinicId = "PLATFORM";
        }
    } else {
        DB.users = [
            { username: "MohaMMed.Y.A", password: "Alrawi2003M", clinicName: "منصة سبل", ownerName: "محمد يوسف اسعد", role: "OWNER", clinicId: "PLATFORM" }
        ];
        localStorage.setItem('sobil_dental_shared_users', JSON.stringify(DB.users));
    }

    // 2. Load shared clinics list
    const savedClinics = localStorage.getItem('sobil_dental_shared_clinics');
    if (savedClinics) {
        DB.clinics = JSON.parse(savedClinics);
    } else {
        DB.clinics = [];
        localStorage.setItem('sobil_dental_shared_clinics', JSON.stringify(DB.clinics));
    }

    // 3. Load active session
    const activeSession = localStorage.getItem('sobil_dental_current_session');
    if (activeSession) {
        DB.currentUser = JSON.parse(activeSession);
    } else {
        DB.currentUser = null;
    }
}

function getActiveDatabaseKey() {
    if (!DB.currentUser) return 'sobil_dental_db_user_default';
    
    // If platform owner is viewing a subscriber's database
    if (DB.currentUser.activeViewingClinicId) {
        return 'sobil_dental_db_clinic_' + DB.currentUser.activeViewingClinicId.toLowerCase().replace(/[^a-z0-9]/g, '_');
    }
    
    // If user belongs to a subscriber clinic
    if (DB.currentUser.clinicId && DB.currentUser.clinicId !== 'PLATFORM') {
        return 'sobil_dental_db_clinic_' + DB.currentUser.clinicId.toLowerCase().replace(/[^a-z0-9]/g, '_');
    }
    
    const userSubkey = DB.currentUser.usernameKey.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const customActiveKey = localStorage.getItem('sobil_active_db_key_' + userSubkey);
    if (customActiveKey) {
        return customActiveKey;
    }
    return 'sobil_dental_db_user_' + userSubkey;
}

function getDatabasesList() {
    if (!DB.currentUser) return [];
    const userSubkey = DB.currentUser.usernameKey.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const listKey = 'sobil_databases_list_' + userSubkey;
    const saved = localStorage.getItem(listKey);
    if (saved) {
        return JSON.parse(saved);
    }
    
    const defaultKey = 'sobil_dental_db_user_' + userSubkey;
    const initialList = [
        { name: DB.currentUser.clinicName || "منصة سبل", key: defaultKey }
    ];
    localStorage.setItem(listKey, JSON.stringify(initialList));
    return initialList;
}

function renderCustomDatabasesTable() {
    const tbody = document.getElementById('customDatabasesTableBody');
    if (!tbody) return;
    tbody.innerHTML = "";
    
    const list = getDatabasesList();
    const activeKey = getActiveDatabaseKey();
    
    list.forEach(db => {
        const isActive = (db.key === activeKey);
        const statusText = isActive ? '<span class="status-badge status-paid">نشطة ومفعلة حالياً</span>' : '<span class="status-badge status-unpaid">غير نشطة</span>';
        
        tbody.innerHTML += `
            <tr>
                <td style="font-weight:700;">${db.name}</td>
                <td style="font-family:monospace; font-size:11.5px; color:var(--text-muted);">${db.key}</td>
                <td>${statusText}</td>
                <td style="text-align:center;">
                    ${isActive ? '' : `<button class="btn btn-emerald btn-sm" onclick="switchActiveDatabase('${db.key}')" style="padding: 4px 8px; margin-left: 5px; background: var(--grad-emerald);"><i class="fa-solid fa-play"></i> تشغيل</button>`}
                    ${isActive ? '<span style="font-size:11px; color:var(--text-muted);">قيد الاستخدام</span>' : `<button class="btn btn-danger btn-sm" onclick="deleteCustomDatabase('${db.key}')" style="padding: 4px 8px;"><i class="fa-solid fa-trash"></i> حذف</button>`}
                </td>
            </tr>
        `;
    });
}

function createNewCustomDatabase() {
    const nameInput = document.getElementById('newDbName');
    if (!nameInput) return;
    const name = nameInput.value.trim();
    if (!name) {
        alert("يرجى كتابة اسم لقاعدة البيانات الجديدة!");
        return;
    }
    
    const list = getDatabasesList();
    const userSubkey = DB.currentUser.usernameKey.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newKey = 'sobil_dental_db_custom_' + userSubkey + '_' + Date.now();
    
    list.push({ name: name, key: newKey });
    const listKey = 'sobil_databases_list_' + userSubkey;
    localStorage.setItem(listKey, JSON.stringify(list));
    
    // Initialize this database in localStorage with clean seed
    const newDb = JSON.parse(JSON.stringify(defaultDatabase));
    newDb.settings.clinicName = name;
    newDb.patients = [];
    newDb.appointments = [];
    newDb.invoices = [];
    newDb.expenses = [];
    newDb.inventory = [];
    newDb.equipments = [];
    newDb.sessions = [];
    newDb.staff = [
        { id: "STF-104", name: DB.currentUser.username, role: "ADMIN", roleAr: "مشرف العيادة (Admin)", phone: "07855906001", salary: 1500000, hireDate: "2023-09-01", photo: "" }
    ];
    newDb.logs = [
        { time: getTodayDateString() + " 12:00 م", user: DB.currentUser.usernameKey, role: "OWNER", text: "تم إنشاء قاعدة البيانات المخصصة الجديدة بنجاح", status: "success" }
    ];
    delete newDb.users;
    delete newDb.currentUser;
    
    localStorage.setItem(newKey, JSON.stringify(newDb));
    
    nameInput.value = "";
    renderCustomDatabasesTable();
    logActivity(DB.currentUser.usernameKey, "OWNER", `تم إنشاء قاعدة بيانات إخراجية مخصصة: ${name}`, "success");
    alert(`تم إنشاء قاعدة البيانات "${name}" بنجاح!`);
}

function switchActiveDatabase(key) {
    if (!DB.currentUser) return;
    const userSubkey = DB.currentUser.usernameKey.toLowerCase().replace(/[^a-z0-9]/g, '_');
    localStorage.setItem('sobil_active_db_key_' + userSubkey, key);
    
    // Reload and reinitialize database
    loadClinicDatabase();
    
    // Save to sync
    saveDatabase();
    
    // Refresh all UI elements
    applyClinicSettingsVisuals();
    renderCustomDatabasesTable();
    renderDashboardStats();
    renderPatientsTable();
    renderDailyCalendar();
    renderBillingLedger();
    renderInventoryScreen();
    renderStaffManagement();
    renderSupportCenterTable();
    renderAtlasGuideGrid();
    renderSupportChatLogs();
    
    alert("تم تحويل وتشغيل قاعدة البيانات المحددة بنجاح!");
}

function deleteCustomDatabase(key) {
    if (!confirm("هل أنت متأكد من حذف قاعدة البيانات المحددة بالكامل؟ سيتم مسح كافة سجلات المرضى والماليات بداخلها ولا يمكن التراجع!")) {
        return;
    }
    
    const userSubkey = DB.currentUser.usernameKey.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const listKey = 'sobil_databases_list_' + userSubkey;
    let list = getDatabasesList();
    list = list.filter(db => db.key !== key);
    localStorage.setItem(listKey, JSON.stringify(list));
    
    localStorage.removeItem(key);
    
    renderCustomDatabasesTable();
    alert("تم حذف قاعدة البيانات المحددة بشكل نهائي.");
}

function loadClinicDatabase() {
    if (!DB.currentUser) {
        const usersList = DB.users;
        const clinicsList = DB.clinics;
        DB = JSON.parse(JSON.stringify(defaultDatabase));
        DB.users = usersList;
        DB.clinics = clinicsList;
        DB.currentUser = null;
        return;
    }

    const activeKey = getActiveDatabaseKey();
    const savedData = localStorage.getItem(activeKey);

    const usersList = DB.users;
    const clinicsList = DB.clinics;
    const currentSession = DB.currentUser;

    if (savedData) {
        try {
            DB = JSON.parse(savedData);
            if (!DB.patients) DB.patients = [];
            if (!DB.appointments) DB.appointments = [];
            if (!DB.invoices) DB.invoices = [];
            if (!DB.expenses) DB.expenses = [];
            if (!DB.inventory) DB.inventory = [];
            if (!DB.equipments) DB.equipments = [];
            if (!DB.staff) DB.staff = [];
            if (!DB.attendance) DB.attendance = [];
            if (!DB.logs) DB.logs = [];
            if (!DB.tickets) DB.tickets = [];
            if (!DB.backups) DB.backups = [];
            if (!DB.notifications) DB.notifications = [];
            if (!DB.sessions) DB.sessions = [];
            if (!DB.settings) DB.settings = JSON.parse(JSON.stringify(defaultDatabase.settings));
            if (!DB.atlasCards) DB.atlasCards = JSON.parse(JSON.stringify(defaultDatabase.atlasCards));
            if (!DB.patientTeeth) DB.patientTeeth = {};
            
            // Force clinicName sync if currentSession has it and it is not a custom database
            if (DB.settings && currentSession && currentSession.clinicName) {
                if (!activeKey.startsWith('sobil_dental_db_custom_')) {
                    DB.settings.clinicName = currentSession.clinicName;
                    const cl = (DB.clinics || []).find(c => c.id === currentSession.clinicId);
                    if (cl) {
                        DB.settings.clinicNameEn = cl.nameEn || "";
                        DB.settings.clinicManager = cl.owner || "";
                        DB.settings.clinicPhone = cl.phone || "";
                    }
                }
            }
        } catch (e) {
            console.error("Failed to parse clinic database, resetting...", e);
            DB = JSON.parse(JSON.stringify(defaultDatabase));
        }
    } else {
        DB = JSON.parse(JSON.stringify(defaultDatabase));
        DB.settings.clinicName = DB.currentUser.clinicName || "منصة سبل";
        const cl = (DB.clinics || []).find(c => c.id === DB.currentUser.clinicId);
        if (cl) {
            DB.settings.clinicNameEn = cl.nameEn || "";
            DB.settings.clinicManager = cl.owner || "";
            DB.settings.clinicPhone = cl.phone || "";
        }
    }

    DB.users = usersList;
    DB.clinics = clinicsList;
    DB.currentUser = currentSession;
}

function initDatabase() {
    if (!localStorage.getItem('sobil_wiped_fresh_db_v4')) {
        localStorage.clear();
        localStorage.setItem('sobil_wiped_fresh_db_v4', 'true');
    }
    loadSessionAndUsers();
    loadClinicDatabase();

    // Migrate and fix atlas cards duplicate/placeholder images dynamically
    if (DB.atlasCards && DB.atlasCards.length > 0) {
        const correctImages = {
            "ATL-001": "assets/prosthodontics_bridge.jpg",
            "ATL-002": "assets/treatments.jpg",
            "ATL-003": "assets/tooth_conditions.jpg",
            "ATL-004": "assets/roots_canals_anatomy.jpg",
            "ATL-005": "assets/ortho_braces.jpg",
            "ATL-006": "assets/smiles.jpg"
        };
        DB.atlasCards.forEach(c => {
            if (correctImages[c.id]) {
                c.image = correctImages[c.id];
            }
        });
    }

    // Apply Settings visuals (Dynamic clinic styling in sidebar & header)
    applyClinicSettingsVisuals();

    // Initialize notification & reminders system
    initNotificationsSystem();

    // Check if session active
    if (DB.currentUser) {
        document.getElementById('loginOverlay').classList.add('hidden');
        document.getElementById('appContainer').classList.remove('hidden');
        document.getElementById('loggedUserName').innerText = DB.currentUser.username;
        document.getElementById('loggedUserRole').innerText = DB.currentUser.role;
        toggleOwnerSidebarAccess();
        updatePlatformOwnerViewBanner();
        if (!checkAndApplySubscriptionLock()) {
            switchTab('dashboard');
        }
        updateHeaderAppointmentAlert();
    }
    
    // Apply styling theme
    applyTheme(DB.theme || 'dark');
}

function resetToDefaultDatabase() {
    DB = JSON.parse(JSON.stringify(defaultDatabase));
    saveDatabase();
}

function saveDatabase() {
    // 1. Save shared users list
    localStorage.setItem('sobil_dental_shared_users', JSON.stringify(DB.users));

    // 2. Save shared clinics list
    localStorage.setItem('sobil_dental_shared_clinics', JSON.stringify(DB.clinics || []));

    // 3. Save active session
    if (DB.currentUser) {
        localStorage.setItem('sobil_dental_current_session', JSON.stringify(DB.currentUser));
        
        // 4. Save database under the active key
        const activeKey = getActiveDatabaseKey();
        const clinicData = JSON.parse(JSON.stringify(DB));
        delete clinicData.users;
        delete clinicData.currentUser;
        delete clinicData.clinics; // Save space by removing duplicate clinics list
        
        localStorage.setItem(activeKey, JSON.stringify(clinicData));
    } else {
        localStorage.removeItem('sobil_dental_current_session');
    }
    
    // Trigger Cloud Sync if enabled
    const syncEnabled = localStorage.getItem('subul_sync_enabled') === 'true';
    if (syncEnabled) {
        setTimeout(() => {
            triggerManualSyncUpload();
        }, 150);
    }
}

function applyClinicSettingsVisuals() {
    if (!DB.settings) return;
    const name = DB.settings.clinicName || "منصة سبل";
    const hours = DB.settings.workingHours || "4:00 مساءً - 8:00 مساءً";
    const address = DB.settings.address || "بغداد، الشعب، شارع عدن";
    const phone = DB.settings.clinicPhone || "07855906001";
    const logoSrc = DB.settings.logo || "assets/logo.jpg";

    // Sidebar titles
    const sidebarTitle = document.getElementById('sidebarClinicName');
    const sidebarTitleSub = document.getElementById('sidebarClinicNameSub');
    const sidebarLogo = document.getElementById('sidebarClinicLogo');
    
    if (sidebarTitle) sidebarTitle.innerText = name;
    if (sidebarTitleSub) sidebarTitleSub.innerText = "";
    if (sidebarLogo) sidebarLogo.src = logoSrc;

    // Active DB visual label matching clinic name/database name
    const activeDbNameEl = document.getElementById('activeDbName');
    if (activeDbNameEl) {
        const activeKey = getActiveDatabaseKey();
        let displayDbName = "منصة سبل";
        if (activeKey.startsWith('sobil_dental_db_custom_')) {
            const list = getDatabasesList();
            const found = list.find(d => d.key === activeKey);
            if (found) displayDbName = found.name;
        } else {
            displayDbName = DB.settings.clinicName || "منصة سبل";
        }
        activeDbNameEl.innerHTML = `(متزامن) ${displayDbName}`;
    }

    // Printed receipt preview details
    const printClinicName = document.getElementById('invoicePrintClinicName');
    const printClinicHours = document.getElementById('invoicePrintClinicHours');
    const printClinicAddress = document.getElementById('invoicePrintClinicAddress');
    const printClinicPhone = document.getElementById('invoicePrintClinicPhone');
    const printLogo = document.getElementById('invoicePrintLogo');

    if (printClinicName) printClinicName.innerText = name;
    if (printClinicHours) printClinicHours.innerText = "أوقات الدوام: " + hours;
    if (printClinicAddress) printClinicAddress.innerText = "العنوان: " + address;
    if (printClinicPhone) printClinicPhone.innerText = "هاتف: " + phone;
    if (printLogo) printLogo.src = logoSrc;

    // Load pre-populated settings page fields if on settings
    const setClinicName = document.getElementById('setClinicName');
    const setClinicHours = document.getElementById('setClinicHours');
    const setClinicAddress = document.getElementById('setClinicAddress');
    const setClinicPhone = document.getElementById('setClinicPhone');
    const setClinicCurrency = document.getElementById('setClinicCurrency');
    const setClinicTax = document.getElementById('setClinicTax');
    const clinicLogoPreviewImg = document.getElementById('clinicLogoPreviewImg');

    if (setClinicName) setClinicName.value = name;
    if (setClinicHours) setClinicHours.value = hours;
    if (setClinicAddress) setClinicAddress.value = address;
    if (setClinicPhone) setClinicPhone.value = phone;
    if (setClinicCurrency) setClinicCurrency.value = DB.settings.currency || "د.ع";
    if (setClinicTax) setClinicTax.value = DB.settings.taxPercent || 0;
    if (clinicLogoPreviewImg) clinicLogoPreviewImg.src = logoSrc;
    
    const setClinicNameEn = document.getElementById('setClinicNameEn');
    const setClinicManager = document.getElementById('setClinicManager');
    if (setClinicNameEn) setClinicNameEn.value = DB.settings.clinicNameEn || "";
    if (setClinicManager) setClinicManager.value = DB.settings.clinicManager || "";
}

// =========================================================================
// 3. AUTHENTICATION CONTROLLERS
// =========================================================================
function handleLoginSubmit() {
    const userVal = document.getElementById('loginUser').value.trim();
    const passVal = document.getElementById('loginPass').value.trim();
    const errorEl = document.getElementById('loginError');

    if (!DB.users) {
        DB.users = [
            { username: "MohaMMed.Y.A", password: "Alrawi2003M", clinicName: "منصة سبل", ownerName: "محمد يوسف اسعد", role: "OWNER" }
        ];
        saveDatabase();
    }

        const foundUser = DB.users.find(u => u.username.toLowerCase() === userVal.toLowerCase() && u.password === passVal);

    if (foundUser) {
        let displayRole = "موظف عادي";
        if (foundUser.role === "OWNER") {
            displayRole = "مشرف مالك";
        } else if (foundUser.role === "ADMIN") {
            displayRole = "مشرف عيادة";
        }

        DB.currentUser = {
            username: foundUser.username,
            usernameKey: foundUser.username,
            role: displayRole,
            roleKey: foundUser.role,
            clinicName: foundUser.clinicName,
            ownerName: foundUser.ownerName,
            clinicId: foundUser.clinicId || "PLATFORM"
        };

        // Cache the active viewing database switch if platform owner
        if (foundUser.usernameKey === "MohaMMed.Y.A") {
            DB.currentUser.activeViewingClinicId = null;
        }

        localStorage.setItem('sobil_dental_current_session', JSON.stringify(DB.currentUser));
        saveDatabase();

        // Load correct database key
        loadClinicDatabase();

        document.getElementById('loginOverlay').classList.add('hidden');
        document.getElementById('appContainer').classList.remove('hidden');
        
        document.getElementById('loggedUserName').innerText = DB.currentUser.username;
        document.getElementById('loggedUserRole').innerText = DB.currentUser.role;
        
        logActivity(foundUser.username, foundUser.role, "تم تسجيل دخول المستخدم بنجاح للمنصة", "success");
        saveDatabase();
        
        // Refresh UI views with newly loaded clinic database
        applyClinicSettingsVisuals();
        initNotificationsSystem();
        toggleOwnerSidebarAccess();

        renderDashboardStats();
        renderPatientsTable();
        renderDailyCalendar();
        renderBillingLedger();
        renderInventoryScreen();
        renderStaffManagement();
        renderSupportCenterTable();
        renderAtlasGuideGrid();
        renderSupportChatLogs();

        switchTab('dashboard');
        updateHeaderAppointmentAlert();
        
        document.getElementById('loginUser').value = "";
        document.getElementById('loginPass').value = "";
        
        stopLoginCanvasAnimation();
    } else {
        errorEl.classList.remove('hidden');
        logActivity("ضيف", "غير مسجل", `محاولة تسجيل دخول فاشلة للمستخدم: ${userVal}`, "danger");
    }
}

function handleLogout() {
    localStorage.removeItem('sobil_dental_current_session');
    DB.currentUser = null;
    if (document.getElementById('loginOverlay')) {
        document.getElementById('loginOverlay').classList.remove('hidden');
    }
    if (document.getElementById('appContainer')) {
        document.getElementById('appContainer').classList.add('hidden');
    }
    if (document.getElementById('blockedOverlay')) {
        document.getElementById('blockedOverlay').classList.add('hidden');
    }
    if (document.getElementById('loginUser')) {
        document.getElementById('loginUser').value = "";
    }
    if (document.getElementById('loginPass')) {
        document.getElementById('loginPass').value = "";
    }
    if (document.getElementById('loginError')) {
        document.getElementById('loginError').classList.add('hidden');
    }
    location.reload();
}

function togglePasswordVisibility() {
    const passInput = document.getElementById('loginPass');
    const eyeIcon = document.getElementById('eyeIcon');
    if (passInput.type === "password") {
        passInput.type = "text";
        eyeIcon.className = "fa-solid fa-eye-slash";
    } else {
        passInput.type = "password";
        eyeIcon.className = "fa-solid fa-eye";
    }
}

function checkIsPrimaryOwner() {
    if (!DB.currentUser || !DB.users || DB.users.length === 0) return false;
    const firstUser = DB.users[0];
    return DB.currentUser.usernameKey.toLowerCase() === firstUser.username.toLowerCase();
}

function toggleOwnerSidebarAccess() {
    const isPrimaryOwner = checkIsPrimaryOwner();
    const loggedUser = DB.currentUser ? DB.users.find(u => u.username.toLowerCase() === DB.currentUser.usernameKey.toLowerCase()) : null;
    
    const tabsToRestrict = [
        { key: 'dashboard', prop: 'restrictDashboard', featProp: 'featDashboard' },
        { key: 'patients', prop: 'restrictPatients', featProp: 'featPatients' },
        { key: 'medical-file', prop: 'restrictMedicalFile', featProp: 'featMedicalFile' },
        { key: 'appointments', prop: 'restrictAppointments', featProp: 'featAppointments' },
        { key: 'dental-chart', prop: 'restrictDentalChart', featProp: 'featDentalChart' },
        { key: 'billing', prop: 'restrictBilling', featProp: 'featBilling' },
        { key: 'financial-audit', prop: 'restrictAudit', featProp: 'featAudit' },
        { key: 'inventory', prop: 'restrictInventory', featProp: 'featInventory' },
        { key: 'staff', prop: 'restrictStaff', featProp: 'featStaff' },
        { key: 'settings', prop: 'restrictSettings', featProp: 'featSettings' },
        { key: 'subscriber-clinics', prop: 'restrictClinics', featProp: null },
        { key: 'database-manager', prop: 'restrictDb', featProp: null },
        { key: 'accounts-manager', prop: 'restrictAccountsManagerTab', featProp: null }
    ];
    
    let activeTabStillVisible = false;
    const activeTabPane = document.querySelector('.tab-pane.active');
    const activeTabKey = activeTabPane ? activeTabPane.id.replace('tab-', '') : 'dashboard';

    tabsToRestrict.forEach(tab => {
        let isRestricted = false;
        if (!isPrimaryOwner) {
            if (loggedUser) {
                const clinicId = loggedUser.clinicId;
                const clinic = (DB.clinics || []).find(c => c.id === clinicId);
                if (clinic && tab.featProp && clinic[tab.featProp] === false) {
                    isRestricted = true;
                } else {
                    isRestricted = loggedUser[tab.prop] === true;
                }
            } else {
                isRestricted = true;
            }
        }
        
        // Hide/Show sidebar nav item
        const navItem = document.querySelector(`.sidebar-nav li[data-tab="${tab.key}"]`);
        if (navItem) {
            if (isRestricted) {
                navItem.style.display = 'none';
            } else {
                navItem.style.display = '';
            }
        }
        
        // Deactivate tab pane if restricted
        const pane = document.getElementById(`tab-${tab.key}`);
        if (pane) {
            if (isRestricted) {
                pane.classList.remove('active');
            }
        }
        
        if (tab.key === activeTabKey && !isRestricted) {
            activeTabStillVisible = true;
        }
    });
    
    // Hide general "owner-only" elements for non-primary owners
    const generalOwnerButtons = document.querySelectorAll('button.owner-only, .btn.owner-only');
    generalOwnerButtons.forEach(btn => {
        if (isPrimaryOwner) {
            btn.style.display = '';
        } else {
            btn.style.display = 'none';
        }
    });

    // Disable new account creation form container if restricted
    const disableCreateAccount = !isPrimaryOwner && loggedUser && loggedUser.restrictCreateAccount === true;
    const regForm = document.querySelector('#newAccUser') ? document.querySelector('#newAccUser').closest('.edit-profile-form') : null;
    if (regForm) {
        if (disableCreateAccount) {
            regForm.style.opacity = "0.5";
            regForm.style.pointerEvents = "none";
        } else {
            regForm.style.opacity = "";
            regForm.style.pointerEvents = "";
        }
    }

    // Redirect if current tab is restricted
    if (!activeTabStillVisible && !isPrimaryOwner) {
        const firstVisibleTab = tabsToRestrict.find(tab => {
            if (!loggedUser) return false;
            if (loggedUser.role === 'STAFF' && ['financial-audit', 'subscriber-clinics', 'database-manager', 'accounts-manager'].includes(tab.key)) {
                return false;
            }
            return loggedUser[tab.prop] !== true;
        });
        
        if (firstVisibleTab) {
            switchTab(firstVisibleTab.key);
        } else {
            switchTab('profile'); // profile is always visible
        }
    }
}

// =========================================================================
// 4. NAVIGATION & TAB SWITCHER
// =========================================================================
document.querySelectorAll('.sidebar-nav li').forEach(item => {
    item.addEventListener('click', () => {
        const tab = item.getAttribute('data-tab');
        switchTab(tab);
    });
});

function switchTab(tabKey) {
    const isPrimaryOwner = checkIsPrimaryOwner();
    const loggedUser = DB.currentUser ? DB.users.find(u => u.username.toLowerCase() === DB.currentUser.usernameKey.toLowerCase()) : null;
    
    let block = false;
    if (!isPrimaryOwner) {
        const restrictionsMap = {
            'dashboard': 'restrictDashboard',
            'patients': 'restrictPatients',
            'medical-file': 'restrictMedicalFile',
            'appointments': 'restrictAppointments',
            'dental-chart': 'restrictDentalChart',
            'billing': 'restrictBilling',
            'financial-audit': 'restrictAudit',
            'inventory': 'restrictInventory',
            'staff': 'restrictStaff',
            'settings': 'restrictSettings',
            'subscriber-clinics': 'restrictClinics',
            'database-manager': 'restrictDb',
            'accounts-manager': 'restrictAccountsManagerTab'
        };
        
        const prop = restrictionsMap[tabKey];
        if (prop) {
            if (loggedUser) {
                if (loggedUser.role === 'STAFF' && ['financial-audit', 'subscriber-clinics', 'database-manager', 'accounts-manager'].includes(tabKey)) {
                    block = true;
                } else {
                    block = loggedUser[prop] === true;
                }
            } else {
                block = true;
            }
        }
    }
    
    if (block) {
        alert("عذراً، ليس لديك صلاحية كافية للدخول إلى هذه الصفحة!");
        return;
    }

    document.querySelectorAll('.sidebar-nav li').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
    
    const navItem = document.querySelector(`.sidebar-nav li[data-tab="${tabKey}"]`);
    const pane = document.getElementById(`tab-${tabKey}`);
    
    if (navItem) navItem.classList.add('active');
    if (pane) pane.classList.add('active');
    
    // Update Header title
    const titles = {
        'dashboard': 'لوحة التحكم والمؤشرات العامة',
        'patients': 'إدارة ملفات وسجلات المرضى',
        'medical-file': 'الملف الطبي الموحد للمريض',
        'appointments': 'جدول وحجوزات مواعيد الفحص والزيارات',
        'dental-chart': 'مخطط الأسنان وأأطلس المراجع الطبية للعيادة',
        'billing': 'الحسابات اليومية والتدفقات المالية للعيادة',
        'financial-audit': 'الجرد المالي السنوي والمراجعة الضريبية',
        'inventory': 'إدارة المخزن والأجهزة الطبية للعيادة',
        'staff': 'الموظفون وسجلات الحضور والورديات',
        'settings': 'إعدادات العيادة وإدارة المشرفين',
        'system-info': 'بيانات ومعلومات ترخيص منصة سبل',
        'subscriber-clinics': 'عيادات المشتركين النشطة والاشتراكات',
        'database-manager': 'مدير قواعد البيانات والنسخ الاحتياطية للعيادة',
        'accounts-manager': 'إدارة حسابات المنصة وصلاحيات الموظفين والكادر الكلي للمشرفين',
        'support': 'قنوات الدعم الفني وتذاكر المشاكل'
    };
    
    document.getElementById('currentPageTitle').innerText = titles[tabKey] || 'سُبل';
    
    renderTabPageData(tabKey);
}

function renderTabPageData(tabKey) {
    switch (tabKey) {
        case 'dashboard':
            renderDashboardStats();
            renderDashboardLogs();
            renderDashboardTodayAppointments();
            break;
        case 'profile':
            renderProfileTab();
            break;
        case 'patients':
            renderPatientsTable();
            break;
        case 'medical-file':
            initMedicalFileTab();
            break;
        case 'appointments':
            renderAppointmentsScheduler();
            break;
        case 'dental-chart':
            initDentalChartTab();
            break;
        case 'billing':
            renderBillingLedger();
            break;
        case 'support':
            renderSupportChatLogs();
            break;
        case 'financial-audit':
            renderFinancialAudit();
            break;
        case 'inventory':
            renderInventoryScreen();
            break;
        case 'staff':
            renderStaffManagement();
            break;
        case 'settings':
            initSettingsTab();
            break;
        case 'subscriber-clinics':
            renderSubscriberClinics();
            break;
        case 'database-manager':
            renderDatabaseManagerBackups();
            renderCustomDatabasesTable();
            break;
        case 'accounts-manager':
            renderActiveUsersTable();
            break;
    }
}

// =========================================================================
// 5. GENERAL UTILITIES (المساعدين وتسجيل العمليات)
// =========================================================================
function formatNumber(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function translateCondition(c) {
    const map = { 'HEALTHY': 'سليم', 'DECAYED': 'تسوس', 'MISSING': 'مفقود/قلع', 'IMPLANTED': 'زراعة', 'CROWNED': 'تلبيسة', 'ROOT_CANAL': 'علاج عصب' };
    return map[c] || c;
}

function logActivity(username, role, action, status = 'success') {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ":" + 
                  now.getMinutes().toString().padStart(2, '0') + ":" + 
                  now.getSeconds().toString().padStart(2, '0');
    
    DB.logs.push({
        timestamp: timeStr,
        username: username,
        role: role,
        action: action,
        status: status
    });
    saveDatabase();
    
    // Dynamically update live activity chat log if on page
    renderSupportChatLogs();
}

function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

let themeBtn = document.getElementById('themeToggleBtn');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const nextTheme = DB.theme === 'dark' ? 'light' : 'dark';
        DB.theme = nextTheme;
        saveDatabase();
        applyTheme(nextTheme);
    });
}

function applyTheme(theme) {
    const body = document.body;
    const themeBtnIcon = document.querySelector('#themeToggleBtn i');
    
    if (theme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (themeBtnIcon) themeBtnIcon.className = "fa-solid fa-sun";
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        if (themeBtnIcon) themeBtnIcon.className = "fa-solid fa-moon";
    }
}

// =========================================================================
// 6. TAB: DASHBOARD (لوحة التحكم والمؤشرات)
// =========================================================================
function renderDashboardStats() {
    document.getElementById('dash-total-patients').innerText = DB.patients.length;
    
    // Total financial received
    const totalRec = DB.invoices.reduce((acc, i) => acc + i.amountPaid, 0);
    document.getElementById('dash-total-received').innerText = formatNumber(totalRec) + " د.ع";
    
    // Today's bookings count
    const today = getTodayDateString();
    const todayApts = DB.appointments.filter(a => a.date === today && a.status !== 'مكتمل' && a.status !== 'ملغي').length;
    document.getElementById('dash-today-bookings').innerText = todayApts;

    // Low stock items
    const lowStockCount = DB.inventory.filter(i => i.qty <= i.minRequired).length;
    document.getElementById('dash-low-stock').innerText = lowStockCount;
}

function getTodayDateString() {
    const now = new Date();
    return now.getFullYear() + "-" + 
           ((now.getMonth() + 1).toString().padStart(2, '0')) + "-" + 
           (now.getDate().toString().padStart(2, '0'));
}

function formatArabicDate(dateStr) {
    if (!dateStr) return "غير محدد";
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        
        const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
        const dayName = days[date.getDay()];
        
        const months = [
            "كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران",
            "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
        ];
        const monthName = months[date.getMonth()];
        const dayNum = date.getDate();
        const year = date.getFullYear();
        
        return `${dayName}، ${dayNum} ${monthName} ${year}`;
    } catch(e) {
        return dateStr;
    }
}

function formatPhoneForWhatsApp(phone) {
    if (!phone) return "";
    let clean = phone.replace(/[^0-9]/g, '');
    // If it starts with 00964... -> make it 964...
    if (clean.startsWith('00964')) {
        clean = clean.substring(2);
    }
    // If it starts with 07... -> make it 9647...
    else if (clean.startsWith('07')) {
        clean = '964' + clean.substring(1);
    }
    // If it starts with 7... and is 10 digits -> make it 9647...
    else if (clean.startsWith('7') && clean.length === 10) {
        clean = '964' + clean;
    }
    return clean;
}

function getStatusCardStyles(status) {
    switch (status) {
        case 'مكتمل':
            return { border: 'border-right: 5px solid #10b981 !important;', bg: 'background: rgba(16, 185, 129, 0.02) !important;' };
        case 'مؤجل':
            return { border: 'border-right: 5px solid #8b5cf6 !important;', bg: 'background: rgba(139, 92, 246, 0.02) !important;' };
        case 'ملغي':
            return { border: 'border-right: 5px solid #ef4444 !important;', bg: 'background: rgba(239, 68, 68, 0.02) !important;' };
        case 'معلق':
        default:
            return { border: 'border-right: 5px solid #f59e0b !important;', bg: 'background: rgba(245, 158, 11, 0.02) !important;' };
    }
}

function showTopToastNotification(text, type = "success") {
    let toastContainer = document.getElementById('topToastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'topToastContainer';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 100000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 350px;
            max-width: 90%;
            pointer-events: none;
        `;
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    let bgColor = "var(--grad-emerald)";
    let icon = "fa-solid fa-circle-check";
    if (type === "warning") {
        bgColor = "var(--grad-primary)";
        icon = "fa-solid fa-triangle-exclamation";
    } else if (type === "danger") {
        bgColor = "var(--grad-red)";
        icon = "fa-solid fa-circle-xmark";
    }
    
    toast.style.cssText = `
        background: ${bgColor};
        color: #fff;
        padding: 12px 18px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        font-family: 'Cairo';
        font-size: 12px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
        direction: rtl;
        pointer-events: auto;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    
    toast.innerHTML = `<i class="${icon}" style="font-size: 16px;"></i> <span style="flex-grow:1;">${text}</span>`;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    }, 50);
    
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-20px)";
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
}

function updateHeaderAppointmentAlert() {
    const alertDiv = document.getElementById('headerAppointmentAlert');
    if (!alertDiv) return;
    
    if (!DB || !DB.appointments) {
        alertDiv.classList.add('hidden');
        return;
    }
    
    const today = getTodayDateString();
    const todayApts = DB.appointments.filter(a => a.date === today);
    
    if (todayApts.length === 0) {
        alertDiv.classList.add('hidden');
        alertDiv.innerHTML = "";
    } else {
        todayApts.sort((a, b) => a.time.localeCompare(b.time));
        
        // Find the most relevant appointment: non-completed/non-cancelled first.
        // If all are completed/cancelled, show the last one of the list.
        let activeApt = todayApts.find(a => a.status !== 'مكتمل' && a.status !== 'ملغي');
        if (!activeApt) {
            activeApt = todayApts[todayApts.length - 1];
        }
        
        // Check if this appointment is "now" (+/- 30 minutes from current local time)
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        let isNow = false;
        
        const matches = activeApt.time.match(/(\d+):(\d+)/);
        if (matches) {
            let aptHour = parseInt(matches[1]);
            const aptMinute = parseInt(matches[2]);
            const isPM = activeApt.time.includes("مساءً") || activeApt.time.toLowerCase().includes("pm");
            const isAM = activeApt.time.includes("صباحاً") || activeApt.time.toLowerCase().includes("am");
            
            if (isPM && aptHour < 12) aptHour += 12;
            if (isAM && aptHour === 12) aptHour = 0;
            
            const diff = (aptHour * 60 + aptMinute) - (currentHour * 60 + currentMinute);
            if (Math.abs(diff) <= 30) {
                isNow = true;
            }
        }
        
        // Determine theme variables based on status
        const statusText = activeApt.status || 'قيد الانتظار';
        let bg = 'rgba(245, 158, 11, 0.1)';
        let border = 'rgba(245, 158, 11, 0.35)';
        let color = '#f59e0b';
        let icon = 'fa-bell fa-shake';
        
        if (statusText === 'مكتمل') {
            bg = 'rgba(16, 185, 129, 0.12)';
            border = 'rgba(16, 185, 129, 0.45)';
            color = '#10b981';
            icon = 'fa-circle-check';
        } else if (statusText === 'ملغي') {
            bg = 'rgba(239, 68, 68, 0.12)';
            border = 'rgba(239, 68, 68, 0.45)';
            color = '#ef4444';
            icon = 'fa-circle-xmark';
        } else if (statusText === 'مؤجل') {
            bg = 'rgba(139, 92, 246, 0.12)';
            border = 'rgba(139, 92, 246, 0.45)';
            color = '#8b5cf6';
            icon = 'fa-clock';
        }
        
        alertDiv.style.setProperty('background', bg, 'important');
        alertDiv.style.setProperty('border-color', border, 'important');
        alertDiv.style.setProperty('color', color, 'important');
        
        let prefix = isNow ? "موعد الآن" : "موعد اليوم";
        alertDiv.innerHTML = `<i class="fa-solid ${icon}"></i> ${prefix} (${statusText}): <strong>${activeApt.patientName}</strong> الساعة <strong>${activeApt.time}</strong>`;
        alertDiv.classList.remove('hidden');
    }
}

function updateAppointmentStatus(aptId, newStatus) {
    const apt = DB.appointments.find(a => a.id === aptId);
    if (apt) {
        apt.status = newStatus;
        saveDatabase();
        logActivity("MohaMMed.Y", "ADMIN", `تحديث حالة موعد المريض (${apt.patientName}) إلى: ${newStatus}`, "success");
        renderAppointmentsScheduler();
        renderDashboardStats();
        renderDashboardTodayAppointments();
        
        // Update header appointment alert banner
        updateHeaderAppointmentAlert();
        
        // Show premium floating notification toast at top of screen
        showTopToastNotification(`تم تغيير حالة موعد المراجع (${apt.patientName}) إلى: ${newStatus}`, "success");
    }
}

// =========================================================================
// 6.2 DENTAL CHART SVG DRAWINGS FOR CONDITIONS (صور قلع، تسوس، زراعة، تلبيسة وعصب)
// =========================================================================
function getToothSvg(condition) {
    const strokeColor = "#ffffff";
    
    // Tooth Crown Outline Shape (Detailed graphical structure)
    const healthyPath = `<path d="M15,15 C20,5 30,10 40,10 C50,10 60,5 65,15 C75,25 75,45 68,55 C65,60 58,70 55,90 C54,95 48,95 47,90 C45,78 41,78 39,90 C38,95 32,95 31,90 C28,70 21,60 18,55 C11,45 10,25 15,15 Z" fill="#e5e7eb" stroke="#10b981" stroke-width="3" stroke-linejoin="round"/>`;
    
    switch (condition) {
        case 'DECAYED':
            // Red spot cavity in the center of the crown
            return `
            <svg viewBox="0 0 80 100" width="100%" height="100%">
                ${healthyPath}
                <circle cx="40" cy="25" r="8" fill="#ef4444" stroke="#7f1d1d" stroke-width="2"/>
                <circle cx="34" cy="22" r="3" fill="#b91c1c"/>
            </svg>`;
            
        case 'MISSING':
            // Extraction (قلع) represented as a faint dashed outline with a bold red "X"
            return `
            <svg viewBox="0 0 80 100" width="100%" height="100%">
                <path d="M15,15 C20,5 30,10 40,10 C50,10 60,5 65,15 C75,25 75,45 68,55 C65,60 58,70 55,90 C54,95 48,95 47,90 C45,78 41,78 39,90 C38,95 32,95 31,90 C28,70 21,60 18,55 C11,45 10,25 15,15 Z" fill="none" stroke="#4b5563" stroke-width="2" stroke-dasharray="3,3"/>
                <line x1="15" y1="15" x2="65" y2="85" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
                <line x1="65" y1="15" x2="15" y2="85" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>
            </svg>`;
            
        case 'IMPLANTED':
            // Dental implant: Gold crown and titanium screw anchor
            return `
            <svg viewBox="0 0 80 100" width="100%" height="100%">
                <!-- Gold Crown Cap -->
                <path d="M15,15 C20,5 30,10 40,10 C50,10 60,5 65,15 C75,25 75,45 68,50 L18,50 Z" fill="#fbbf24" stroke="#d97706" stroke-width="3" stroke-linejoin="round"/>
                <!-- Screw Thread Anchor -->
                <rect x="34" y="50" width="12" height="35" rx="2" fill="#9ca3af" stroke="#4b5563" stroke-width="2"/>
                <line x1="30" y1="58" x2="50" y2="58" stroke="#374151" stroke-width="2.5"/>
                <line x1="30" y1="66" x2="50" y2="66" stroke="#374151" stroke-width="2.5"/>
                <line x1="30" y1="74" x2="50" y2="74" stroke="#374151" stroke-width="2.5"/>
                <line x1="30" y1="82" x2="50" y2="82" stroke="#374151" stroke-width="2.5"/>
            </svg>`;
            
        case 'CROWNED':
            // Crowned: Beautiful blue prosthetic shell casing
            return `
            <svg viewBox="0 0 80 100" width="100%" height="100%">
                <path d="M15,15 C20,5 30,10 40,10 C50,10 60,5 65,15 C75,25 75,45 68,55 C65,60 58,70 55,90 C54,95 48,95 47,90 C45,78 41,78 39,90 C38,95 32,95 31,90 C28,70 21,60 18,55 C11,45 10,25 15,15 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3" stroke-linejoin="round"/>
                <!-- Shading bands -->
                <path d="M22,30 C30,25 40,25 58,30" fill="none" stroke="#60a5fa" stroke-width="2"/>
                <path d="M20,40 C30,35 40,35 60,40" fill="none" stroke="#60a5fa" stroke-width="2"/>
            </svg>`;
            
        case 'ROOT_CANAL':
            // Root canal: Healthy outline plus purple nerve channel files
            return `
            <svg viewBox="0 0 80 100" width="100%" height="100%">
                ${healthyPath}
                <!-- Purple Pulp Chamber and Nerve channels -->
                <path d="M40,25 L40,45" stroke="#8b5cf6" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                <path d="M40,45 C38,55 37,60 36,80" stroke="#a78bfa" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <path d="M40,45 C42,55 43,60 44,80" stroke="#a78bfa" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            </svg>`;
            
        case 'HEALTHY':
        default:
            return `
            <svg viewBox="0 0 80 100" width="100%" height="100%">
                ${healthyPath}
            </svg>`;
    }
}

function renderDashboardLogs() {
    const container = document.getElementById('dashLogsList');
    container.innerHTML = "";
    
    const latest = DB.logs.slice(-5).reverse();
    latest.forEach(log => {
        container.innerHTML += `
            <div class="log-item-block">
                <div class="log-text-content">
                    <span class="log-prefix-badge">${log.username} (${log.role})</span>
                    <span>${log.action}</span>
                </div>
                <span class="log-time">${log.timestamp}</span>
            </div>
        `;
    });
}

function renderDashboardTodayAppointments() {
    const container = document.getElementById('dashAppointmentsList');
    if (!container) return;
    container.innerHTML = "";
    
    const today = getTodayDateString();
    // Exclude completed or cancelled appointments from today's active/urgent dashboard list
    const list = DB.appointments.filter(a => a.date === today && a.status !== 'مكتمل' && a.status !== 'ملغي');
    
    if (list.length === 0) {
        container.innerHTML = `<div class="no-appointments-msg">لا توجد مواعيد عاجلة مسجلة لليوم.</div>`;
    } else {
        list.forEach(apt => {
            const styles = getStatusCardStyles(apt.status);
            container.innerHTML += `
                <div class="dash-apt-item" style="display:flex; flex-direction:column; gap:8px; padding:15px; border-bottom:1px solid var(--border-color); ${styles.border} ${styles.bg} border-radius:8px; margin-bottom:8px; text-align:right;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div class="details">
                            <h4 style="font-size:13.5px; font-weight:800; color:var(--text-color); margin:0 0 2px 0;">${apt.patientName}</h4>
                            <p style="font-size:10.5px; color:var(--text-muted); margin:0;">الإجراء: ${apt.treatmentType} | ${apt.doctorName}</p>
                        </div>
                        <span class="time-badge" style="background:var(--grad-primary); color:#fff; font-size:11px; padding:3px 8px; border-radius:5px; font-weight:800;">${apt.time}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px; flex-wrap:wrap; gap:5px;">
                        <span style="font-size:10.5px; color:var(--accent-cyan); font-weight:700;"><i class="fa-solid fa-calendar-day"></i> ${formatArabicDate(apt.date)}</span>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <div style="display:flex; gap:4px;">
                                <button class="btn btn-emerald btn-sm" onclick="updateAppointmentStatus('${apt.id}', 'مكتمل')" style="padding:2px 6px; font-size:9.5px; background:#10b981; border:none; color:#fff; font-weight:bold; cursor:pointer;" title="إتمام"><i class="fa-solid fa-check"></i> إتمام</button>
                                <button class="btn btn-danger btn-sm" onclick="updateAppointmentStatus('${apt.id}', 'ملغي')" style="padding:2px 6px; font-size:9.5px; background:#ef4444; border:none; color:#fff; font-weight:bold; cursor:pointer;" title="إلغاء"><i class="fa-solid fa-xmark"></i> إلغاء</button>
                            </div>
                            <span style="font-size:10px; color:var(--text-muted);">الحالة:</span>
                            <select onchange="updateAppointmentStatus('${apt.id}', this.value)" style="background: rgba(255,255,255,0.04); color: var(--text-color); border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 6px; font-size: 10px; font-family: 'Cairo'; cursor: pointer; outline:none;">
                                <option value="معلق" ${apt.status === 'معلق' || !apt.status ? 'selected' : ''}>قيد الانتظار</option>
                                <option value="مكتمل" ${apt.status === 'مكتمل' ? 'selected' : ''}>مكتمل (حضر)</option>
                                <option value="مؤجل" ${apt.status === 'مؤجل' ? 'selected' : ''}>مؤجل</option>
                                <option value="ملغي" ${apt.status === 'ملغي' ? 'selected' : ''}>ملغي</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
        });
    }
}

// =========================================================================
// 7. TAB: PATIENTS (إدارة المرضى - إضافة، تعديل، حذف، طباعة)
// =========================================================================
function renderPatientsTable() {
    const query = document.getElementById('patientSearchInput').value.toLowerCase().trim();
    const tbody = document.getElementById('patientsTableBody');
    tbody.innerHTML = "";
    
    const filtered = DB.patients.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.phone.includes(query) || 
        p.fileNumber.toLowerCase().includes(query)
    );
    
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" class="text-center" style="color:var(--text-muted)">لا توجد سجلات مطابقة للبحث</td></tr>`;
    } else {
        filtered.forEach(pat => {
            tbody.innerHTML += `
                <tr id="row-patient-${pat.id}">
                    <td><strong>${pat.name}</strong></td>
                    <td>${pat.fileNumber}</td>
                    <td>${pat.phone}</td>
                    <td>${pat.gender || "ذكر"}</td>
                    <td>${pat.age}</td>
                    <td>${pat.nationality}</td>
                    <td>${pat.doctor}</td>
                    <td>${pat.sessionsLeft} جلسات</td>
                    <td class="text-danger">${formatNumber(pat.amountRemaining)} د.ع</td>
                    <td>
                        <button class="btn btn-secondary btn-sm" onclick="showEditPatientModal('${pat.id}')"><i class="fa-solid fa-pencil"></i> تعديل</button>
                        <button class="btn btn-primary btn-sm" onclick="printPatientInvoiceReceipt('${pat.id}')" style="background:#10b981;"><i class="fa-solid fa-print"></i> طباعة فاتورة</button>
                        <button class="btn btn-danger btn-sm" onclick="deletePatientRecord('${pat.id}')"><i class="fa-solid fa-trash"></i> حذف</button>
                    </td>
                </tr>
            `;
        });
    }
}

const patSearch = document.getElementById('patientSearchInput');
if (patSearch) {
    patSearch.addEventListener('input', renderPatientsTable);
}

// Financials recalculation for modal
function recalculateModalFinancials() {
    const container = document.getElementById('patientTreatmentsContainer');
    if (!container) return;
    const rows = container.querySelectorAll('.treatment-row');
    let totalPrice = 0;
    let totalPaid = 0;
    rows.forEach(row => {
        totalPrice += parseFloat(row.querySelector('.pat-treat-price').value) || 0;
        totalPaid += parseFloat(row.querySelector('.pat-treat-paid').value) || 0;
    });
    
    const priceInput = document.getElementById('newPatGrandTotal');
    const paidInput = document.getElementById('newPatAmountPaid');
    if (priceInput && document.activeElement !== priceInput) {
        priceInput.value = totalPrice;
    }
    if (paidInput && document.activeElement !== paidInput) {
        paidInput.value = totalPaid;
    }
}

// Hook it up to container changes
window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('patientTreatmentsContainer');
    if (container) {
        container.addEventListener('input', recalculateModalFinancials);
    }
});

// Dynamic Treatment Rows Helper
function addTreatmentRowDynamic(type = 'حشوه جذر', price = 150000, paid = 0, sessions = 3) {
    const container = document.getElementById('patientTreatmentsContainer');
    if (!container) return;
    
    const row = document.createElement('div');
    row.className = 'treatment-row';
    row.style.cssText = 'display: grid; grid-template-columns: 2fr 1.2fr 1.2fr 0.7fr 40px; gap: 8px; align-items: center; margin-bottom: 6px; background: rgba(255,255,255,0.01); padding: 4px; border-radius: 6px;';
    row.innerHTML = `
        <input type="text" class="pat-treat-type" value="${type}" placeholder="نوع الإجراء..." style="padding: 8px; font-size: 12px; text-align: center; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; border-radius: 6px; width: 100%; box-sizing: border-box; font-family: 'Cairo', sans-serif;">
        <input type="text" class="pat-treat-price" value="${price}" placeholder="السعر..." style="padding: 8px; font-size: 12px; text-align: center; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; border-radius: 6px; width: 100%; box-sizing: border-box; font-family: 'Cairo', sans-serif;">
        <input type="text" class="pat-treat-paid" value="${paid}" placeholder="الواصل..." style="padding: 8px; font-size: 12px; text-align: center; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; border-radius: 6px; width: 100%; box-sizing: border-box; font-family: 'Cairo', sans-serif;">
        <input type="text" class="pat-treat-sessions" value="${sessions}" placeholder="الجلسات..." style="padding: 8px; font-size: 12px; text-align: center; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: #fff; border-radius: 6px; width: 100%; box-sizing: border-box; font-family: 'Cairo', sans-serif;">
        <button type="button" class="btn btn-danger btn-sm" style="height: 33px; width: 100%; padding: 0; background: var(--grad-red); display: flex; align-items: center; justify-content: center; border-radius: 6px; border: none; cursor: pointer;" onclick="this.closest('.treatment-row').remove()">
            <i class="fa-solid fa-trash-can" style="font-size:12px;"></i>
        </button>
    `;
    container.appendChild(row);
    recalculateModalFinancials();
}

function showAddPatientModal() {
    document.getElementById('patientModalTitle').innerText = "تسجيل ملف مريض جديد";
    document.getElementById('editPatientId').value = "";
    
    document.getElementById('newPatName').value = "";
    document.getElementById('newPatPhone').value = "";
    document.getElementById('newPatAge').value = "";
    document.getElementById('newPatNationality').value = "عراقي";
    document.getElementById('newPatAllergies').value = "لا";
    document.getElementById('newPatHistory').value = "لا";
    document.getElementById('newPatGender').value = "ذكر";
    document.getElementById('newPatNextSessionDate').value = "";
    document.getElementById('newPatNextSessionTime').value = "";
    document.getElementById('newPatAddress').value = "";
    document.getElementById('newPatWelcomeMsg').value = "thanks";
    document.getElementById('newPatPaymentMethod').value = "نقداً";
    document.getElementById('newPatPreviousDebt').value = "0";
    document.getElementById('newPatGrandTotal').value = "150000";
    document.getElementById('newPatAmountPaid').value = "0";
    
    // Prefill doctors selector
    const selectDoc = document.getElementById('newPatDoctor');
    selectDoc.innerHTML = "";
    DB.staff.filter(s => s.role === 'DOCTOR' || s.roleAr.includes('طبيب')).forEach(d => {
        selectDoc.innerHTML += `<option value="${d.name}">د. ${d.name}</option>`;
    });

    const container = document.getElementById('patientTreatmentsContainer');
    if (container) {
        container.innerHTML = "";
        addTreatmentRowDynamic('حشوه جذر', 150000, 0, 3);
    }

    showModal('addPatientModal');
}

function showEditPatientModal(id) {
    const pat = DB.patients.find(p => p.id === id);
    if (!pat) return;

    document.getElementById('patientModalTitle').innerText = "تعديل ملف المريض المفتوح";
    document.getElementById('editPatientId').value = pat.id;

    document.getElementById('newPatName').value = pat.name;
    document.getElementById('newPatPhone').value = pat.phone;
    document.getElementById('newPatAge').value = pat.age;
    document.getElementById('newPatNationality').value = pat.nationality;
    document.getElementById('newPatAllergies').value = pat.allergies;
    document.getElementById('newPatHistory').value = pat.chronicDiseases;
    document.getElementById('newPatGender').value = pat.gender || "ذكر";
    document.getElementById('newPatAddress').value = pat.address || "";
    document.getElementById('newPatPaymentMethod').value = pat.paymentMethod || "نقداً";
    document.getElementById('newPatPreviousDebt').value = pat.previousDebt || "0";
    document.getElementById('newPatGrandTotal').value = pat.treatmentPrice || "0";
    document.getElementById('newPatAmountPaid').value = Math.max(0, (pat.treatmentPrice || 0) - (pat.amountRemaining || 0));

    // Prefill the next session if any active one exists
    const apt = DB.appointments.find(a => a.patientId === id && a.status === 'معلق');
    if (apt) {
        document.getElementById('newPatNextSessionDate').value = apt.date;
        document.getElementById('newPatNextSessionTime').value = apt.time;
    } else {
        document.getElementById('newPatNextSessionDate').value = "";
        document.getElementById('newPatNextSessionTime').value = "";
    }

    const selectDoc = document.getElementById('newPatDoctor');
    selectDoc.innerHTML = "";
    DB.staff.filter(s => s.role === 'DOCTOR' || s.roleAr.includes('طبيب')).forEach(d => {
        const isSelected = pat.doctor === d.name ? "selected" : "";
        selectDoc.innerHTML += `<option value="${d.name}" ${isSelected}>د. ${d.name}</option>`;
    });

    const container = document.getElementById('patientTreatmentsContainer');
    if (container) {
        container.innerHTML = "";
        if (pat.treatments && pat.treatments.length > 0) {
            pat.treatments.forEach(t => {
                addTreatmentRowDynamic(t.type, t.price, t.paid, t.sessions);
            });
        } else {
            const fallbackPaid = Math.max(0, (pat.treatmentPrice || 150000) - (pat.amountRemaining || 0));
            addTreatmentRowDynamic(pat.treatmentType || 'حشوه جذر', pat.treatmentPrice || 150000, fallbackPaid, pat.sessionsLeft || 3);
        }
    }

    showModal('addPatientModal');
}

function submitAddPatient() {
    const id = document.getElementById('editPatientId').value;
    const name = document.getElementById('newPatName').value.trim();
    const phone = document.getElementById('newPatPhone').value.trim();
    
    if (!name || !phone) {
        alert("يرجى تعبئة اسم المريض ورقم الهاتف كشرط أساسي!");
        return;
    }

    // Parse dynamic treatments
    const rows = document.querySelectorAll('#patientTreatmentsContainer .treatment-row');
    const treatments = [];
    rows.forEach(row => {
        const type = row.querySelector('.pat-treat-type').value.trim();
        const price = parseFloat(row.querySelector('.pat-treat-price').value) || 0;
        const paid = parseFloat(row.querySelector('.pat-treat-paid').value) || 0;
        const sessions = parseInt(row.querySelector('.pat-treat-sessions').value) || 0;
        if (type) {
            treatments.push({ type, price, paid, sessions });
        }
    });

    if (treatments.length === 0) {
        treatments.push({ type: "حشوه جذر", price: 150000, paid: 0, sessions: 3 });
    }

    const totalSessions = treatments.reduce((acc, t) => acc + t.sessions, 0);

    const doctor = document.getElementById('newPatDoctor').value;
    const age = document.getElementById('newPatAge').value.trim();
    const nationality = document.getElementById('newPatNationality').value.trim();
    const allergies = document.getElementById('newPatAllergies').value.trim();
    const chronicDiseases = document.getElementById('newPatHistory').value.trim();
    const gender = document.getElementById('newPatGender').value;
    const address = document.getElementById('newPatAddress').value.trim();
    const welcomeMsg = document.getElementById('newPatWelcomeMsg').value;
    const paymentMethod = document.getElementById('newPatPaymentMethod').value;
    const previousDebt = parseFloat(document.getElementById('newPatPreviousDebt').value) || 0;
    const totalPrice = parseFloat(document.getElementById('newPatGrandTotal').value) || 0;
    const totalPaid = parseFloat(document.getElementById('newPatAmountPaid').value) || 0;
    const totalDebt = Math.max(0, totalPrice - totalPaid);

    let targetId = id;

    if (id) {
        // Edit existing patient profile
        const pat = DB.patients.find(p => p.id === id);
        if (pat) {
            pat.name = name;
            pat.phone = phone;
            pat.age = age;
            pat.nationality = nationality;
            pat.allergies = allergies;
            pat.chronicDiseases = chronicDiseases;
            pat.gender = gender;
            pat.address = address;
            pat.doctor = doctor;
            pat.treatments = treatments;
            pat.treatmentPrice = totalPrice;
            pat.amountRemaining = totalDebt;
            pat.sessionsLeft = totalSessions;
            pat.paymentMethod = paymentMethod;
            pat.previousDebt = previousDebt;
            
            logActivity("MohaMMed.Y", "ADMIN", "تعديل ملف مراجع: " + name, "success");
        }
    } else {
        // Register new patient
        const newId = "PAT-" + Date.now();
        targetId = newId;
        const fileNumber = "PAT-" + Math.floor(100000 + Math.random() * 900000);
        
        const newPat = {
            id: newId,
            name: name,
            phone: phone,
            fileNumber: fileNumber,
            age: age,
            nationality: nationality,
            allergies: allergies,
            chronicDiseases: chronicDiseases,
            gender: gender,
            address: address,
            doctor: doctor,
            treatments: treatments,
            treatmentPrice: totalPrice,
            amountRemaining: totalDebt,
            sessionsLeft: totalSessions,
            paymentMethod: paymentMethod,
            previousDebt: previousDebt,
            previousDebt: previousDebt,
            createdAt: new Date().toISOString()
        };
        DB.patients.push(newPat);
        logActivity("MohaMMed.Y", "ADMIN", "تسجيل مراجع جديد: " + name, "success");
    }

    // Sync invoice
    const hasInv = DB.invoices.some(i => i.patientId === targetId);
    if (!hasInv && totalPrice > 0) {
        const invId = "INV-" + Date.now();
        DB.invoices.push({
            id: invId,
            patientId: targetId,
            patientName: name,
            subtotal: totalPrice,
            discount: 0,
            tax: 0,
            grandTotal: totalPrice,
            amountPaid: totalPaid,
            debt: totalDebt,
            status: totalDebt === 0 ? "paid" : "partial",
            date: getTodayDateString(),
            paymentMethod: paymentMethod
        });
    } else if (hasInv) {
        const inv = DB.invoices.find(i => i.patientId === targetId);
        if (inv) {
            inv.patientName = name;
            inv.subtotal = totalPrice;
            inv.grandTotal = totalPrice;
            inv.amountPaid = totalPaid;
            inv.debt = totalDebt;
            inv.status = totalDebt === 0 ? "paid" : "partial";
            inv.paymentMethod = paymentMethod;
            inv.previousDebt = previousDebt;
        }
    }

    // Manage appointment scheduling
    const nextDate = document.getElementById('newPatNextSessionDate').value;
    const nextTime = document.getElementById('newPatNextSessionTime').value.trim();
    if (nextDate) {
        const apt = DB.appointments.find(a => a.patientId === targetId && a.status === 'معلق');
        if (apt) {
            apt.date = nextDate;
            apt.time = nextTime;
            apt.doctorName = doctor;
        } else {
            DB.appointments.push({
                id: "APT-" + Date.now(),
                patientId: targetId,
                patientName: name,
                doctorName: doctor,
                date: nextDate,
                time: nextTime,
                treatmentType: treatments[0].type,
                status: "معلق"
            });
        }
    }

    saveDatabase();
    closeModal('addPatientModal');
    renderPatientsTable();
    renderBillingLedger();
    renderDashboardStats();
    showTopToastNotification("تم حفظ ملف المراجع والخطط العلاجية بنجاح!", "success");
}

function deletePatientRecord(id) {
    const pat = DB.patients.find(p => p.id === id);
    if (!pat) return;

    if (confirm(`هل أنت متأكد من إزالة ملف المراجع (${pat.name}) بكافة سجلاته المالية والطبية؟`)) {
        DB.patients = DB.patients.filter(p => p.id !== id);
        if (DB.patientTeeth) delete DB.patientTeeth[id];
        
        logActivity("MohaMMed.Y", "ADMIN", `تم إزالة وإلغاء ملف المريض: ${pat.name}`, "warning");
        saveDatabase();
        renderPatientsTable();
        renderDashboardStats();
    }
}

function printPatientInvoiceReceipt(id) {
    const pat = DB.patients.find(p => p.id === id);
    if (!pat) return;

    const inv = DB.invoices.find(i => i.patientId === id) || {
        id: 'INV-' + pat.id,
        patientId: pat.id,
        patientName: pat.name,
        subtotal: pat.treatmentPrice || 150000,
        discount: 0,
        grandTotal: pat.treatmentPrice || 150000,
        amountPaid: Math.max(0, (pat.treatmentPrice || 150000) - (pat.amountRemaining || 0)),
        debt: pat.amountRemaining || 0,
        date: getTodayDateString(),
        status: (pat.amountRemaining || 0) === 0 ? 'paid' : 'partial'
    };

    const printContainer = document.getElementById('printWrapper');
    printContainer.innerHTML = getInvoicePrintHTML(inv);
    window.print();
}
// =========================================================================
// 8. TAB: MEDICAL FILE (الملف الطبي الموحد)
// =========================================================================
function initMedicalFileTab() {
    const selectEl = document.getElementById('medicalPatientSelect');
    selectEl.innerHTML = "";
    
    DB.patients.forEach(pat => {
        selectEl.innerHTML += `<option value="${pat.id}">${pat.name} (${pat.fileNumber})</option>`;
    });

    if (DB.patients.length > 0) {
        loadMedicalProfileData();
    }
}

function loadMedicalProfileData() {
    const patId = document.getElementById('medicalPatientSelect').value;
    const pat = DB.patients.find(p => p.id === patId);
    if (!pat) return;

    // Prefill view labels
    document.getElementById('med-card-name').innerText = pat.name;
    document.getElementById('med-card-age-nationality').innerText = `${pat.age} (${pat.nationality})`;
    document.getElementById('med-card-doctor').innerText = pat.doctor;
    document.getElementById('med-card-price').innerText = formatNumber(pat.treatmentPrice) + " د.ع";
    document.getElementById('med-card-type').innerText = pat.treatmentType;

    // Prefill form inputs
    document.getElementById('medInputChronic').value = pat.chronicDiseases || "لا";
    document.getElementById('medInputAllergies').value = pat.allergies || "لا";
    document.getElementById('medInputDone').value = pat.procedureDone || "";
    document.getElementById('medInputSessions').value = pat.sessionsLeft;
    document.getElementById('medInputDebt').value = pat.amountRemaining;

    // Load prescriptions and sessions
    renderPrescriptionsList(patId);
    renderPatientSessionsTable(patId);
}

function saveActiveMedicalProfile() {
    const patId = document.getElementById('medicalPatientSelect').value;
    const pat = DB.patients.find(p => p.id === patId);
    if (!pat) return;

    pat.chronicDiseases = document.getElementById('medInputChronic').value.trim();
    pat.allergies = document.getElementById('medInputAllergies').value.trim();
    pat.procedureDone = document.getElementById('medInputDone').value.trim();
    pat.sessionsLeft = parseInt(document.getElementById('medInputSessions').value) || 0;
    pat.amountRemaining = parseFloat(document.getElementById('medInputDebt').value) || 0;

    logActivity("MohaMMed.Y", "ADMIN", `تم تعديل بيانات ملف المريض: ${pat.name}`, "success");
    saveDatabase();
    
    loadMedicalProfileData();
    renderDashboardStats();
    alert("تم حفظ وتحديث بيانات الملف الطبي المفتوح بنجاح!");
}

function printActiveMedicalProfile() {
    const patId = document.getElementById('medicalPatientSelect').value;
    const pat = DB.patients.find(p => p.id === patId);
    if (!pat) return;

    const printContainer = document.getElementById('printWrapper');
    printContainer.innerHTML = `
        <div class="print-medical-profile">
            <h2>الملف الطبي الموحد للمريض - منصة سبل</h2>
            <div class="print-medical-grid">
                <div class="print-field">الاسم الكامل: <strong>${pat.name}</strong></div>
                <div class="print-field">رقم الملف: <strong>${pat.fileNumber}</strong></div>
                <div class="print-field">العمر والجنسية: <strong>${pat.age} (${pat.nationality})</strong></div>
                <div class="print-field">الطبيب المعالج: <strong>${pat.doctor}</strong></div>
                <div class="print-field">تاريخ التسجيل: <strong>${pat.regDate}</strong></div>
            </div>
            
            <div class="print-section-title">التاريخ المرضي العام</div>
            <div class="print-field">${pat.chronicDiseases || 'لا يوجد'}</div>
            
            <div class="print-section-title">الحساسية والموانع الطبية</div>
            <div class="print-field" style="color:red; font-weight:bold;">${pat.allergies || 'لا يوجد'}</div>
            
            <div class="print-section-title">آخر إجراء منجز بالعيادة</div>
            <div class="print-field">${pat.procedureDone || 'لم يسجل إجراء بعد'}</div>
            
            <div class="print-section-title">الوضعية المالية الحالية</div>
            <div class="print-field">المبلغ المتبقي كدين: <strong>${formatNumber(pat.amountRemaining)} د.ع</strong></div>
            <div class="print-field">الجلسات المتبقية للمريض بالخطة: <strong>${pat.sessionsLeft} جلسات</strong></div>
        </div>
    `;
    window.print();
}

function renderPrescriptionsList(patientId) {
    const container = document.getElementById('med-prescriptions-list');
    container.innerHTML = "";
    
    const list = DB.prescriptions.filter(pr => pr.patientId === patientId);
    
    if (list.length === 0) {
        container.innerHTML = `<div class="text-center py-4 text-muted" style="font-size:12px;">لا توجد وصفات طبية مسجلة لهذا المريض حالياً.</div>`;
    } else {
        list.forEach(pr => {
            container.innerHTML += `
                <div class="prescription-item-card">
                    <div class="presc-header">
                        <span>التاريخ: ${pr.date}</span>
                        <span>الطبيب: ${pr.doctor}</span>
                    </div>
                    <div class="presc-body">
                        ${pr.text}
                    </div>
                    <div class="presc-footer-actions">
                        <button class="btn btn-secondary btn-sm" onclick="showEditPrescriptionModal('${pr.id}')"><i class="fa-solid fa-pencil"></i> تعديل</button>
                        <button class="btn btn-danger btn-sm" onclick="deletePrescription('${pr.id}')"><i class="fa-solid fa-trash"></i> حذف</button>
                    </div>
                </div>
            `;
        });
    }
}

function showAddPrescriptionModal() {
    document.getElementById('prescriptionModalTitle').innerText = "إصدار وصفة طبية جديدة";
    document.getElementById('editPrescriptionId').value = "";
    document.getElementById('prescInputText').value = "";
    
    const selectDoc = document.getElementById('prescInputDoctor');
    selectDoc.innerHTML = "";
    DB.staff.filter(s => s.role === 'DOCTOR').forEach(d => {
        selectDoc.innerHTML += `<option value="${d.name}">${d.name}</option>`;
    });

    showModal('addPrescriptionModal');
}

function showEditPrescriptionModal(id) {
    const pr = DB.prescriptions.find(p => p.id === id);
    if (!pr) return;

    document.getElementById('prescriptionModalTitle').innerText = "تعديل الوصفة الطبية الصادرة";
    document.getElementById('editPrescriptionId').value = pr.id;
    document.getElementById('prescInputText').value = pr.text;
    
    const selectDoc = document.getElementById('prescInputDoctor');
    selectDoc.innerHTML = "";
    DB.staff.filter(s => s.role === 'DOCTOR').forEach(d => {
        const isSelected = pr.doctor === d.name ? "selected" : "";
        selectDoc.innerHTML += `<option value="${d.name}" ${isSelected}>${d.name}</option>`;
    });

    showModal('addPrescriptionModal');
}

function submitAddPrescription() {
    const id = document.getElementById('editPrescriptionId').value;
    const text = document.getElementById('prescInputText').value.trim();
    const doctor = document.getElementById('prescInputDoctor').value;
    const patId = document.getElementById('medicalPatientSelect').value;

    if (!text) {
        alert("يرجى كتابة نص الوصفة الطبية!");
        return;
    }

    if (id) {
        const pr = DB.prescriptions.find(p => p.id === id);
        if (pr) {
            pr.text = text;
            pr.doctor = doctor;
            logActivity("MohaMMed.Y", "ADMIN", `تعديل وصفة طبية صادرة للمريض`, "success");
        }
    } else {
        DB.prescriptions.push({
            id: "PRSC-" + Date.now(),
            patientId: patId,
            doctor: doctor,
            text: text,
            date: getTodayDateString()
        });
        logActivity("MohaMMed.Y", "ADMIN", `إصدار وصفة طبية جديدة للمريض بالعيادة`, "success");
    }

    saveDatabase();
    closeModal('addPrescriptionModal');
    renderPrescriptionsList(patId);
}

function deletePrescription(id) {
    if (confirm("هل أنت متأكد من حذف هذه الوصفة الطبية نهائياً؟")) {
        const patId = document.getElementById('medicalPatientSelect').value;
        DB.prescriptions = DB.prescriptions.filter(p => p.id !== id);
        saveDatabase();
        logActivity("MohaMMed.Y", "ADMIN", `حذف وصفة طبية صادرة للمريض`, "warning");
        renderPrescriptionsList(patId);
    }
}

// =========================================================================
// 9. TAB: DENTAL CHART (مخطط الأسنان وأطلس الأسنان)
// =========================================================================
function initDentalChartTab() {
    // Fill select in the chart side panel if needed or link to patient list
    const selectDoc = document.getElementById('toothDoctorSelect');
    selectDoc.innerHTML = "";
    DB.staff.filter(s => s.role === 'DOCTOR').forEach(d => {
        selectDoc.innerHTML += `<option value="${d.name}">${d.name}</option>`;
    });

    switchDentalView(currentDentalView);
    
    // Choose patient 1 initially
    if (DB.patients.length > 0) {
        renderJawToothGrid(DB.patients[0].id);
    } else {
        renderJawToothGrid(null);
    }
}

function switchDentalView(view) {
    currentDentalView = view;
    document.querySelectorAll('.btn-chart-switch').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.dental-view-pane').forEach(p => p.classList.remove('active'));
    
    if (view === 'jaw') {
        document.getElementById('btnSwitchJaw').classList.add('active');
        document.getElementById('dental-view-jaw').classList.add('active');
    } else {
        document.getElementById('btnSwitchAtlas').classList.add('active');
        document.getElementById('dental-view-atlas').classList.add('active');
        renderAtlasGuideGrid();
    }
}

function renderJawToothGrid(patientId) {
    const upperRow = document.getElementById('upperTeethRow');
    const lowerRow = document.getElementById('lowerTeethRow');
    upperRow.innerHTML = "";
    lowerRow.innerHTML = "";

    const upperTeeth = [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const lowerTeeth = [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17];
    
    const patStates = DB.patientTeeth[patientId] || {};

    upperTeeth.forEach(num => {
        const cond = patStates[num] ? patStates[num].condition : 'HEALTHY';
        upperRow.appendChild(createToothBoxElement(num, cond));
    });

    lowerTeeth.forEach(num => {
        const cond = patStates[num] ? patStates[num].condition : 'HEALTHY';
        lowerRow.appendChild(createToothBoxElement(num, cond));
    });
}

function createToothBoxElement(num, condition) {
    const col = document.createElement('div');
    col.className = 'tooth-wrapper-col';
    
    const node = document.createElement('div');
    node.className = `tooth-box-node ${condition}`;
    node.setAttribute('data-tooth-num', num);
    if (selectedToothNumber === num) node.classList.add('selected');

    // Render graphical tooth state representation using SVGs (قلع وحشوات وزراعة)
    node.innerHTML = getToothSvg(condition);
    node.addEventListener('click', () => {
        selectToothBox(num);
    });

    col.appendChild(node);
    
    const label = document.createElement('span');
    label.className = 'tooth-box-num-lbl';
    label.innerText = num;
    col.appendChild(label);
    
    return col;
}

function selectToothBox(num) {
    selectedToothNumber = num;
    const pat = DB.patients.length > 0 ? DB.patients[0] : null;
    const patId = pat ? pat.id : null;
    const pTeeth = patId ? (DB.patientTeeth[patId] || {}) : {};
    
    const defaultDoctorName = (DB.staff && DB.staff.length > 0) ? DB.staff[0].name : "";
    const toothData = pTeeth[num] || { condition: 'HEALTHY', plan: '', cost: 0, doctor: defaultDoctorName };

    document.getElementById('toothEditNoSelection').classList.add('hidden');
    document.getElementById('toothEditForm').classList.remove('hidden');
    document.getElementById('selectedToothTitle').innerText = `تعديل السن رقم: ${num}`;

    document.getElementById('toothTreatmentPlan').value = toothData.plan || "";
    document.getElementById('toothTreatmentCost').value = toothData.cost || 0;
    document.getElementById('toothPaidAmount').value = 0; // reset paid amount on new selection
    document.getElementById('toothDoctorSelect').value = toothData.doctor || defaultDoctorName;

    document.querySelectorAll('.btn-condition').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-condition') === toothData.condition) {
            btn.classList.add('active');
        }
    });

    document.querySelectorAll('.tooth-box-node').forEach(node => {
        node.classList.remove('selected');
        if (parseInt(node.getAttribute('data-tooth-num')) === num) {
            node.classList.add('selected');
        }
    });
}

function setToothCondition(cond) {
    document.querySelectorAll('.btn-condition').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-condition') === cond) {
            btn.classList.add('active');
        }
    });
}

function saveToothState() {
    if (!selectedToothNumber) return;
    
    const pat = DB.patients.length > 0 ? DB.patients[0] : null;
    if (!pat) {
        alert("يرجى إضافة مريض أولاً قبل تعديل حالة الأسنان!");
        return;
    }
    const patId = pat.id;
    
    const activeBtn = document.querySelector('.btn-condition.active');
    const condition = activeBtn ? activeBtn.getAttribute('data-condition') : 'HEALTHY';
    const plan = document.getElementById('toothTreatmentPlan').value.trim();
    const cost = parseFloat(document.getElementById('toothTreatmentCost').value) || 0;
    const paid = parseFloat(document.getElementById('toothPaidAmount').value) || 0;
    const doctor = document.getElementById('toothDoctorSelect').value;

    if (!DB.patientTeeth[patId]) {
        DB.patientTeeth[patId] = {};
    }

    DB.patientTeeth[patId][selectedToothNumber] = {
        condition: condition,
        plan: plan,
        cost: cost,
        doctor: doctor,
        invoiced: cost > 0
    };

    if (cost > 0) {
        const debt = Math.max(0, cost - paid);
        const invId = "INV-" + Date.now();
        
        DB.invoices.push({
            id: invId,
            patientId: patId,
            patientName: pat.name,
            subtotal: cost,
            discount: 0,
            tax: 0,
            grandTotal: cost,
            amountPaid: paid,
            debt: debt,
            status: debt === 0 ? "paid" : "partial",
            date: getTodayDateString()
        });

        pat.amountRemaining = (pat.amountRemaining || 0) + debt;
        logActivity("MohaMMed.Y", "ADMIN", `ترحيل تلقائي لفاتورة علاج السن رقم ${selectedToothNumber} للمريض ${pat.name} بقيمة ${cost} د.ع (واصل: ${paid} د.ع، متبقي: ${debt} د.ع)`, "success");
    } else {
        logActivity("MohaMMed.Y", "ADMIN", `تحديث حالة السن رقم ${selectedToothNumber} للمريض ${pat.name} إلى ${translateCondition(condition)}`, "success");
    }

    saveDatabase();
    
    renderJawToothGrid(patId);
    selectToothBox(selectedToothNumber);
    renderBillingLedger();
    renderDashboardStats();
}

function printDentalChart() {
    const patId = DB.patients[0].id;
    const pat = DB.patients.find(p => p.id === patId);
    if (!pat) return;

    const printContainer = document.getElementById('printWrapper');
    printContainer.innerHTML = `
        <div class="print-medical-profile">
            <h2>مخطط أسنان الفك التفاعلي للمريض: ${pat.name}</h2>
            <p>تاريخ إصدار التقرير: <strong>${getTodayDateString()}</strong> | الطبيب المشرف: <strong>${pat.doctor}</strong></p>
            
            <table class="print-table" style="margin-top:25px;">
                <thead>
                    <tr>
                        <th>رقم السن</th>
                        <th>الحالة التشخصية</th>
                        <th>الخطة العلاجية للسن</th>
                        <th>التكلفة المعتمدة</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.keys(DB.patientTeeth[patId] || {}).map(num => {
                        const item = DB.patientTeeth[patId][num];
                        return `
                            <tr>
                                <td>سن رقم ${num}</td>
                                <td>${translateCondition(item.condition)}</td>
                                <td>${item.plan || 'لم تسجل خطة'}</td>
                                <td>${formatNumber(item.cost)} د.ع</td>
                            </tr>
                        `;
                    }).join('') || '<tr><td colspan="4" style="text-align:center;">لا توجد إجراءات علاجية مسجلة على مخطط الأسنان للمريض</td></tr>'}
                </tbody>
            </table>
        </div>
    `;
    window.print();
}

// Educational Atlas grid (أطلس ودليل الأسنان - مطابقة للصورة 5)
function renderAtlasGuideGrid() {
    const grid = document.getElementById('atlasCardsGrid');
    grid.innerHTML = "";
    
    DB.atlasCards.forEach(card => {
        grid.innerHTML += `
            <div class="atlas-card glass-card">
                <img src="${card.image}" alt="${card.title}">
                <div class="atlas-card-body">
                    <span class="atlas-card-tag">${card.category}</span>
                    <h3>${card.title}</h3>
                    <p>${card.desc}</p>
                    <div class="atlas-card-actions">
                        <button class="btn btn-secondary btn-sm" onclick="showEditAtlasCardModal('${card.id}')"><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="deleteAtlasCard('${card.id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    });
}

let tempAtlasBase64 = "";

function readAtlasImageFile(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            tempAtlasBase64 = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function showAddAtlasCardModal() {
    document.getElementById('atlasModalTitle').innerText = "إضافة كارت / مرجع تعليمي جديد";
    document.getElementById('editAtlasCardId').value = "";
    
    document.getElementById('atlasCardTitle').value = "";
    document.getElementById('atlasCardCategory').value = "";
    document.getElementById('atlasCardDesc').value = "";
    document.getElementById('atlasCardImageSelect').value = "assets/prosthodontics_bridge.jpg";
    
    tempAtlasBase64 = "";
    document.getElementById('atlasCardCustomImage').value = "";
    document.getElementById('atlasCardCustomImageFile').value = "";
    document.getElementById('atlasCardCustomImageGroup').style.display = "none";

    showModal('addAtlasCardModal');
}

function showEditAtlasCardModal(id) {
    const card = DB.atlasCards.find(c => c.id === id);
    if (!card) return;

    document.getElementById('atlasModalTitle').innerText = "تعديل الكارت المرجعي التعليمي";
    document.getElementById('editAtlasCardId').value = card.id;

    document.getElementById('atlasCardTitle').value = card.title;
    document.getElementById('atlasCardCategory').value = card.category;
    document.getElementById('atlasCardDesc').value = card.desc;
    
    tempAtlasBase64 = "";
    document.getElementById('atlasCardCustomImageFile').value = "";
    
    const selectEl = document.getElementById('atlasCardImageSelect');
    const customGroup = document.getElementById('atlasCardCustomImageGroup');
    const customInput = document.getElementById('atlasCardCustomImage');
    
    let isPreset = false;
    for (let i = 0; i < selectEl.options.length; i++) {
        if (selectEl.options[i].value === card.image) {
            selectEl.value = card.image;
            isPreset = true;
            break;
        }
    }
    if (!isPreset) {
        selectEl.value = "custom";
        customGroup.style.display = "block";
        customInput.value = card.image;
    } else {
        customGroup.style.display = "none";
        customInput.value = "";
    }

    showModal('addAtlasCardModal');
}

function submitAddAtlasCard() {
    const id = document.getElementById('editAtlasCardId').value;
    const title = document.getElementById('atlasCardTitle').value.trim();
    const cat = document.getElementById('atlasCardCategory').value.trim();
    const desc = document.getElementById('atlasCardDesc').value.trim();
    let img = document.getElementById('atlasCardImageSelect').value;

    if (img === "custom") {
        if (tempAtlasBase64) {
            img = tempAtlasBase64;
        } else {
            img = document.getElementById('atlasCardCustomImage').value.trim() || "assets/logo.jpg";
        }
    }

    if (!title || !cat || !desc) {
        alert("يرجى ملء كافة تفاصيل الكارت التعليمي!");
        return;
    }

    if (id) {
        const card = DB.atlasCards.find(c => c.id === id);
        if (card) {
            card.title = title;
            card.category = cat;
            card.desc = desc;
            card.image = img;
            logActivity("MohaMMed.Y", "ADMIN", `تعديل الكارت التعليمي بالأطلس: ${title}`, "success");
        }
    } else {
        DB.atlasCards.push({
            id: "ATL-" + Date.now(),
            title: title,
            category: cat,
            image: img,
            desc: desc
        });
        logActivity("MohaMMed.Y", "ADMIN", `إضافة كارت تعليمي جديد للأطلس: ${title}`, "success");
    }

    saveDatabase();
    closeModal('addAtlasCardModal');
    renderAtlasGuideGrid();
}

function deleteAtlasCard(id) {
    const card = DB.atlasCards.find(c => c.id === id);
    if (!card) return;

    if (confirm(`هل أنت متأكد من حذف الكارت المرجعي التعليمي (${card.title})؟`)) {
        DB.atlasCards = DB.atlasCards.filter(c => c.id !== id);
        logActivity("MohaMMed.Y", "ADMIN", `حذف الكارت التعليمي بالأطلس: ${card.title}`, "warning");
        saveDatabase();
        renderAtlasGuideGrid();
    }
}

// =========================================================================
// 10. TAB: APPOINTMENTS
// =========================================================================
function renderAppointmentsScheduler() {
    document.querySelectorAll('.btn-switch').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.btn-switch[onclick="switchCalendarView('${currentCalendarView}')"]`);
    if (activeBtn) activeBtn.classList.add('active');

    document.querySelectorAll('.calendar-pane').forEach(p => p.classList.remove('active'));
    document.getElementById(`cal-view-${currentCalendarView}`).classList.add('active');

    if (currentCalendarView === 'daily') {
        renderDailyCalendar();
    } else if (currentCalendarView === 'weekly') {
        renderWeeklyCalendar();
    } else {
        renderMonthlyCalendar();
    }
}

function switchCalendarView(view) {
    currentCalendarView = view;
    renderAppointmentsScheduler();
}

function renderDailyCalendar() {
    const list = document.getElementById('dailyAptsList');
    list.innerHTML = "";
    
    const today = getTodayDateString();
    const active = DB.appointments.filter(a => a.date === today);
    
    if (active.length === 0) {
        list.innerHTML = `<div class="no-appointments-msg">لا توجد مواعيد عاجلة مسجلة لليوم.</div>`;
    } else {
        active.forEach(apt => {
            const styles = getStatusCardStyles(apt.status);
            list.innerHTML += `
                <div class="apt-card-item" style="display:flex; flex-direction:column; gap:10px; align-items:stretch; padding:15px; ${styles.border} ${styles.bg}">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div class="details" style="text-align:right;">
                            <h4 style="font-weight:800; margin:0 0 4px 0;">${apt.patientName}</h4>
                            <p style="font-size:11px; color:var(--text-muted); margin:0 0 6px 0;">الإجراء: ${apt.treatmentType} | ${apt.doctorName}</p>
                            <div style="display:flex; gap:5px; align-items:center; flex-wrap:wrap;">
                                <span style="font-size:10px; color:var(--accent-cyan); background:rgba(0,127,127,0.06); padding:3px 8px; border-radius:4px; font-weight:700;"><i class="fa-solid fa-calendar-day"></i> ${formatArabicDate(apt.date)}</span>
                                <span style="font-size:10px; color:var(--text-muted);">الحالة:</span>
                                <select onchange="updateAppointmentStatus('${apt.id}', this.value)" style="background: rgba(255,255,255,0.04); color: var(--text-color); border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 6px; font-size: 10px; font-family: 'Cairo'; cursor: pointer; outline:none;">
                                    <option value="معلق" ${apt.status === 'معلق' || !apt.status ? 'selected' : ''}>قيد الانتظار</option>
                                    <option value="مكتمل" ${apt.status === 'مكتمل' ? 'selected' : ''}>مكتمل (حضر)</option>
                                    <option value="مؤجل" ${apt.status === 'مؤجل' ? 'selected' : ''}>مؤجل</option>
                                    <option value="ملغي" ${apt.status === 'ملغي' ? 'selected' : ''}>ملغي</option>
                                </select>
                            </div>
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span class="time-badge">${apt.time}</span>
                                <button class="btn btn-secondary btn-sm" onclick="showEditAppointmentModal('${apt.id}')" title="تعديل" style="padding:4px 8px;"><i class="fa-solid fa-pencil"></i></button>
                                <button class="btn btn-emerald btn-sm" onclick="sendAppointmentReminder('${apt.id}', 'whatsapp')" style="background:var(--grad-emerald); padding:4px 8px;" title="تذكير واتساب"><i class="fa-brands fa-whatsapp"></i></button>
                                <button class="btn btn-primary btn-sm" onclick="sendAppointmentReminder('${apt.id}', 'sms')" style="background:var(--grad-primary); padding:4px 8px;" title="تذكير رسالة نصية"><i class="fa-solid fa-envelope"></i></button>
                                <button class="btn btn-danger btn-sm" onclick="deleteAppointment('${apt.id}')" style="padding:4px 8px;" title="حذف"><i class="fa-solid fa-trash"></i></button>
                            </div>
                            <div style="display:flex; gap:6px;">
                                <button class="btn btn-emerald btn-sm" onclick="updateAppointmentStatus('${apt.id}', 'مكتمل')" style="padding:3px 8px; font-size:10.5px; background:#10b981; border:none; color:#fff; font-weight:bold; cursor:pointer;" title="إتمام"><i class="fa-solid fa-check"></i> إتمام</button>
                                <button class="btn btn-danger btn-sm" onclick="updateAppointmentStatus('${apt.id}', 'ملغي')" style="padding:3px 8px; font-size:10.5px; background:#ef4444; border:none; color:#fff; font-weight:bold; cursor:pointer;" title="إلغاء"><i class="fa-solid fa-xmark"></i> إلغاء</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    const hourGrid = document.getElementById('dailyHoursGrid');
    hourGrid.innerHTML = "";
    
    const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
    hours.forEach(hr => {
        const busy = active.find(a => a.time === hr);
        if (busy) {
            hourGrid.innerHTML += `
                <div class="hour-row">
                    <span class="hour-status busy">الغرفة مشغولة: المريض ${busy.patientName} (${busy.treatmentType})</span>
                    <span class="time">${hr} م</span>
                </div>
            `;
        } else {
            hourGrid.innerHTML += `
                <div class="hour-row">
                    <span class="hour-status free">الوحدة السريرية شاغرة ومتاحة</span>
                    <span class="time">${hr} م</span>
                </div>
            `;
        }
    });
}
function sendAppointmentReminder(aptId, method) {
    const apt = DB.appointments.find(a => a.id === aptId);
    if (!apt) return;
    
    let phone = apt.phone || "";
    if (!phone && apt.patientId) {
        const pat = DB.patients.find(p => p.id === apt.patientId);
        if (pat) phone = pat.phone || "";
    }

    if (!phone) {
        alert("لا يوجد رقم هاتف مسجل لهذا الموعد!");
        return;
    }

    const clinicName = DB.settings.clinicName || "عيادتنا";
    const text = `مرحباً بك، نود تذكيرك بموعدك القادم في ${clinicName} بتاريخ ${apt.date} الساعة ${apt.time}. نسعد دائماً بخدمتك.`;
    const encodedText = encodeURIComponent(text);
    
    if (method === 'whatsapp') {
        window.open(`https://wa.me/${formatPhoneForWhatsApp(phone)}?text=${encodedText}`, '_blank');
    } else {
        window.open(`sms:${phone}?body=${encodedText}`, '_blank');
    }
    
    logActivity("MohaMMed.Y", "ADMIN", `إرسال رسالة تذكير موعد للمريض (${apt.patientName}) عبر ${method}`, "success");
}



function showAddAppointmentModal() {
    document.getElementById('appointmentModalTitle').innerText = "حجز موعد فحص جديد";
    document.getElementById('editAppointmentId').value = "";
    
    document.getElementById('aptDate').value = getTodayDateString();
    document.getElementById('aptTreatmentType').value = "";
    document.getElementById('aptNotes').value = "";
    document.getElementById('aptPhone').value = "";
    document.getElementById('aptPatientName').value = "";
    
    const suggestions = document.getElementById('aptPatientSuggestions');
    if (suggestions) suggestions.classList.add('hidden');

    const selectDoc = document.getElementById('aptDoctorSelect');
    selectDoc.innerHTML = "";
    DB.staff.filter(s => s.role === 'DOCTOR').forEach(d => {
        selectDoc.innerHTML += `<option value="${d.name}">${d.name}</option>`;
    });

    showModal('addAppointmentModal');
}

function showEditAppointmentModal(id) {
    const apt = DB.appointments.find(a => a.id === id);
    if (!apt) return;

    document.getElementById('appointmentModalTitle').innerText = "تعديل موعد الفحص المحجوز";
    document.getElementById('editAppointmentId').value = apt.id;
    
    document.getElementById('aptDate').value = apt.date;
    document.getElementById('aptTime').value = apt.time;
    document.getElementById('aptTreatmentType').value = apt.treatmentType;
    document.getElementById('aptNotes').value = apt.notes;
    document.getElementById('aptPhone').value = apt.phone || "";
    document.getElementById('aptPatientName').value = apt.patientName;
    
    const suggestions = document.getElementById('aptPatientSuggestions');
    if (suggestions) suggestions.classList.add('hidden');

    const selectDoc = document.getElementById('aptDoctorSelect');
    selectDoc.innerHTML = "";
    DB.staff.filter(s => s.role === 'DOCTOR').forEach(d => {
        const isSelected = apt.doctorName === d.name ? "selected" : "";
        selectDoc.innerHTML += `<option value="${d.name}" ${isSelected}>${d.name}</option>`;
    });

    showModal('addAppointmentModal');
}

function submitAddAppointment() {
    const id = document.getElementById('editAppointmentId').value;
    const patName = document.getElementById('aptPatientName').value.trim();
    const docName = document.getElementById('aptDoctorSelect').value;
    const date = document.getElementById('aptDate').value;
    const time = document.getElementById('aptTime').value;
    const type = document.getElementById('aptTreatmentType').value.trim() || "فحص أسنان";
    const phone = document.getElementById('aptPhone').value.trim();
    const notes = document.getElementById('aptNotes').value.trim();

    if (!patName || !date || !time) {
        alert("يرجى ملء الحقول المطلوبة (اسم المريض، التاريخ، التوقيت)!");
        return;
    }

    // Verify if patient exists or auto-add them
    let pat = DB.patients.find(p => p.name.trim().toLowerCase() === patName.toLowerCase());
    let patId = "";
    if (pat) {
        patId = pat.id;
        if (!pat.phone && phone) pat.phone = phone;
    } else {
        patId = "PAT-" + Date.now();
        pat = {
            id: patId,
            name: patName,
            phone: phone,
            age: "",
            gender: "ذكر",
            amountRemaining: 0,
            fileNumber: "F-" + (DB.patients.length + 101),
            doctor: docName || "غير محدد",
            notes: "تمت إضافته تلقائياً من حجز موعد"
        };
        DB.patients.push(pat);
        renderPatientsTable();
    }

    if (id) {
        const apt = DB.appointments.find(a => a.id === id);
        if (apt) {
            apt.patientId = patId;
            apt.patientName = pat.name;
            apt.doctorName = docName;
            apt.date = date;
            apt.time = time;
            apt.treatmentType = type;
            apt.phone = phone;
            apt.notes = notes;
            logActivity("MohaMMed.Y", "ADMIN", `تعديل حجز موعد المريض: ${pat.name}`, "success");
            showTopToastNotification(`تم تعديل موعد المراجع (${pat.name}) بنجاح`, "success");
        }
    } else {
        DB.appointments.push({
            id: "APT-" + Date.now(),
            patientId: patId,
            patientName: pat.name,
            doctorName: docName,
            date: date,
            time: time,
            treatmentType: type,
            phone: phone,
            notes: notes
        });
        
        if (!DB.notifications) DB.notifications = [];
        DB.notifications.unshift({
            id: "NOTI-" + Date.now(),
            text: `إشعار حجز: تم حجز موعد جديد للمراجع (${pat.name}) بتاريخ ${date} الساعة ${time} م`,
            date: getTodayDateString(),
            read: false
        });
        
        logActivity("MohaMMed.Y", "ADMIN", `حجز موعد جديد للمريض: ${pat.name} بتاريخ ${date}`, "success");
        showTopToastNotification(`تم حجز موعد جديد للمراجع (${pat.name}) بتاريخ ${formatArabicDate(date)} الساعة ${time}`, "success");
    }

    saveDatabase();
    closeModal('addAppointmentModal');
    renderAppointmentsScheduler();
    renderDashboardStats();
    renderDashboardTodayAppointments();
    updateHeaderAppointmentAlert();
}

function handleAptPatientNameInput() {
    const query = document.getElementById('aptPatientName').value.trim().toLowerCase();
    const suggestions = document.getElementById('aptPatientSuggestions');
    if (!suggestions) return;
    
    if (!query) {
        suggestions.classList.add('hidden');
        return;
    }
    
    const matches = DB.patients.filter(p => p.name.toLowerCase().includes(query));
    if (matches.length === 0) {
        suggestions.classList.add('hidden');
        return;
    }
    
    suggestions.innerHTML = "";
    matches.forEach(p => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.style.padding = '10px 15px';
        div.style.cursor = 'pointer';
        div.style.borderBottom = '1px solid var(--border-color)';
        div.style.fontSize = '12.5px';
        div.style.color = '#cbd5e1';
        div.style.transition = 'background 0.2s';
        
        div.onmouseover = () => { div.style.background = 'rgba(255, 255, 255, 0.05)'; };
        div.onmouseout = () => { div.style.background = 'transparent'; };
        
        div.innerText = `${p.name} (${p.phone || 'بدون هاتف'})`;
        div.onclick = () => {
            document.getElementById('aptPatientName').value = p.name;
            document.getElementById('aptPhone').value = p.phone || "";
            suggestions.classList.add('hidden');
        };
        suggestions.appendChild(div);
    });
    suggestions.classList.remove('hidden');
}

function autoFillAppointmentPhone() {
    // Kept for backward compatibility
}

function deleteAppointment(id) {
    const apt = DB.appointments.find(a => a.id === id);
    if (!apt) return;

    if (confirm(`هل أنت متأكد من إلغاء موعد المريض (${apt.patientName})؟`)) {
        DB.appointments = DB.appointments.filter(a => a.id !== id);
        logActivity("MohaMMed.Y", "ADMIN", `إلغاء حجز موعد المريض: ${apt.patientName}`, "warning");
        saveDatabase();
        renderAppointmentsScheduler();
        renderDashboardStats();
        renderDashboardTodayAppointments();
        updateHeaderAppointmentAlert();
        
        showTopToastNotification(`تم إلغاء وحذف موعد المراجع: ${apt.patientName}`, "warning");
    }
}

function printDailyAppointments() {
    const today = getTodayDateString();
    const list = DB.appointments.filter(a => a.date === today);

    const printContainer = document.getElementById('printWrapper');
    printContainer.innerHTML = `
        <div class="print-medical-profile">
            <h2>تقرير وجدول مواعيد زيارات اليوم: ${today}</h2>
            <table class="print-table">
                <thead>
                    <tr>
                        <th>التوقيت</th>
                        <th>اسم المريض</th>
                        <th>الطبيب المعالج</th>
                        <th>نوع الإجراء</th>
                        <th>ملاحظات</th>
                    </tr>
                </thead>
                <tbody>
                    ${list.map(apt => `
                        <tr>
                            <td>${apt.time} م</td>
                            <td><strong>${apt.patientName}</strong></td>
                            <td>${apt.doctorName}</td>
                            <td>${apt.treatmentType}</td>
                            <td>${apt.notes || '-'}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="5" style="text-align:center;">لا توجد مواعيد حجوزات مسجلة لليوم</td></tr>'}
                </tbody>
            </table>
        </div>
    `;
    window.print();
}

function getStartOfCurrentWeek(d) {
    const date = new Date(d);
    const day = date.getDay();
    const satOffset = (day + 1) % 7;
    date.setDate(date.getDate() - satOffset);
    return date;
}

function renderWeeklyCalendar() {
    const grid = document.getElementById('weeklyCalGrid');
    if (!grid) return;
    grid.innerHTML = "";
    
    const daysOfWeek = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];
    const startDate = getStartOfCurrentWeek(new Date());
    
    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startDate);
        currentDay.setDate(startDate.getDate() + i);
        
        const dateStr = currentDay.getFullYear() + "-" + 
                        String(currentDay.getMonth() + 1).padStart(2, '0') + "-" + 
                        String(currentDay.getDate()).padStart(2, '0');
        
        const dayApts = DB.appointments.filter(a => a.date === dateStr);
        
        let aptsHtml = "";
        if (dayApts.length === 0) {
            aptsHtml = `<span style="font-size:10px; color:var(--text-muted); display:block; padding:10px; text-align:center;">لا توجد حجوزات</span>`;
        } else {
            dayApts.forEach(apt => {
                let statusClass = "status-pending";
                if (apt.status === "مكتمل") statusClass = "status-completed";
                if (apt.status === "مؤجل") statusClass = "status-postponed";
                if (apt.status === "ملغي") statusClass = "status-cancelled";
                
                aptsHtml += `
                    <div class="weekly-apt-card ${statusClass}" onclick="showEditAppointmentModal('${apt.id}')" style="cursor:pointer; margin-bottom:6px; padding:6px 10px; border-radius:6px; background:rgba(255,255,255,0.03); border-right:3px solid var(--accent-blue); text-align:right;">
                        <div style="font-size:11px; font-weight:800; color:var(--text-color);">${apt.patientName}</div>
                        <div style="font-size:9.5px; color:var(--text-muted); display:flex; justify-content:space-between; margin-top:2px;">
                            <span>${apt.time} م</span>
                            <span>${apt.treatmentType}</span>
                        </div>
                    </div>
                `;
            });
        }
        
        const isTodayStr = dateStr === getTodayDateString() ? "border: 2px solid var(--accent-emerald);" : "";
        
        grid.innerHTML += `
            <div class="weekly-col" style="${isTodayStr} padding:10px; border-radius:10px; background:rgba(255,255,255,0.01); display:flex; flex-direction:column; gap:8px;">
                <div style="text-align:center; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
                    <h4 style="margin:0; font-size:13px; font-weight:800;">${daysOfWeek[i]}</h4>
                    <span style="font-size:10px; color:var(--text-muted);">${currentDay.getDate()} / ${currentDay.getMonth() + 1}</span>
                </div>
                <div class="weekly-apts" style="flex-grow:1; display:flex; flex-direction:column; overflow-y:auto; max-height:300px;">
                    ${aptsHtml}
                </div>
            </div>
        `;
    }
}

function renderMonthlyCalendar() {
    const grid = document.getElementById('monthlyCalGridDays');
    if (!grid) return;
    grid.innerHTML = "";
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const startDayOffset = firstDayOfMonth.getDay();
    
    const startDate = new Date(year, month, 1);
    startDate.setDate(startDate.getDate() - startDayOffset);
    
    for (let i = 0; i < 35; i++) {
        const currentDay = new Date(startDate);
        currentDay.setDate(startDate.getDate() + i);
        
        const dateStr = currentDay.getFullYear() + "-" + 
                        String(currentDay.getMonth() + 1).padStart(2, '0') + "-" + 
                        String(currentDay.getDate()).padStart(2, '0');
        
        const dayApts = DB.appointments.filter(a => a.date === dateStr);
        
        let dotsHtml = "";
        if (dayApts.length > 0) {
            dotsHtml = `<div style="display:flex; justify-content:center; gap:3px; margin-top:4px;">`;
            dayApts.slice(0, 3).forEach(apt => {
                let dotColor = "var(--accent-blue)";
                if (apt.status === "مكتمل") dotColor = "var(--accent-emerald)";
                if (apt.status === "مؤجل") dotColor = "var(--accent-orange)";
                if (apt.status === "ملغي") dotColor = "var(--accent-red)";
                
                dotsHtml += `<span style="width:5px; height:5px; border-radius:50%; background:${dotColor}; display:inline-block;"></span>`;
            });
            if (dayApts.length > 3) {
                dotsHtml += `<span style="font-size:8px; color:var(--text-muted); line-height:5px;">+</span>`;
            }
            dotsHtml += `</div>`;
        }
        
        const isTodayStr = dateStr === getTodayDateString() ? "background: rgba(16, 185, 129, 0.08); border: 1px solid var(--accent-emerald);" : "";
        const isOtherMonth = currentDay.getMonth() !== month ? "opacity: 0.35;" : "";
        
        grid.innerHTML += `
            <div class="monthly-day-cell" onclick="viewDateAppointments('${dateStr}')" style="min-height:75px; padding:6px; border-bottom:1px solid var(--border-color); border-left:1px solid var(--border-color); display:flex; flex-direction:column; justify-content:space-between; ${isTodayStr} ${isOtherMonth} cursor:pointer; transition:all 0.2s;">
                <span class="num" style="font-size:12px; font-weight:800; align-self:flex-end;">${currentDay.getDate()}</span>
                <div class="cell-content">
                    ${dayApts.length > 0 ? `<div style="font-size:9.5px; text-align:center; color:var(--accent-cyan); font-weight:700;">${dayApts.length} حجز</div>` : ''}
                    ${dotsHtml}
                </div>
            </div>
        `;
    }
}

function viewDateAppointments(dateStr) {
    const dayApts = DB.appointments.filter(a => a.date === dateStr);
    if (dayApts.length === 0) {
        alert(`لا توجد مواعيد حجوزات في تاريخ ${formatArabicDate(dateStr)}`);
        return;
    }
    
    let msg = `حجوزات يوم ${formatArabicDate(dateStr)}:\n\n`;
    dayApts.forEach((apt, idx) => {
        msg += `${idx + 1}. المريض: ${apt.patientName}\n   التوقيت: ${apt.time} م\n   الإجراء: ${apt.treatmentType}\n   الحالة: ${apt.status || "معلق"}\n\n`;
    });
    alert(msg);
}

// =========================================================================
// 11. TAB: BILLING & DAILY ACCOUNTS
// =========================================================================
function renderBillingLedger() {
    const revSum = DB.invoices.reduce((acc, i) => acc + i.grandTotal, 0);
    const recSum = DB.invoices.reduce((acc, i) => acc + i.amountPaid, 0);
    const debtSum = DB.invoices.reduce((acc, i) => acc + i.debt, 0);
    const expSum = DB.expenses.reduce((acc, e) => acc + e.amount, 0);

    document.getElementById('fin-revenue-total').innerText = formatNumber(revSum) + " " + DB.settings.currency;
    document.getElementById('fin-received-total').innerText = formatNumber(recSum) + " " + DB.settings.currency;
    document.getElementById('fin-debts-total').innerText = formatNumber(debtSum) + " " + DB.settings.currency;
    document.getElementById('fin-expenses-total').innerText = formatNumber(expSum) + " " + DB.settings.currency;

    const expBody = document.getElementById('expensesTableBody');
    expBody.innerHTML = "";
    DB.expenses.forEach(exp => {
        expBody.innerHTML += `
            <tr>
                <td><strong>${exp.title}</strong></td>
                <td>${exp.category}</td>
                <td class="text-danger">${formatNumber(exp.amount)} د.ع</td>
                <td>${exp.date}</td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="showEditExpenseModal('${exp.id}')"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="deleteExpense('${exp.id}')"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });

    const invBody = document.getElementById('invoicesTableBody');
    invBody.innerHTML = "";
    DB.invoices.forEach(inv => {
        invBody.innerHTML += `
            <tr>
                <td><strong>${inv.id}</strong></td>
                <td>${inv.patientName}</td>
                <td>${formatNumber(inv.grandTotal)} د.ع</td>
                <td class="text-emerald">${formatNumber(inv.amountPaid)} د.ع</td>
                <td class="text-warning">${formatNumber(inv.debt)} د.ع</td>
                <td><span class="status-indicator ${inv.status === 'paid' ? 'success' : 'warning'}">${inv.status === 'paid' ? 'مدفوعة بالكامل' : 'دفعة جزئية'}</span></td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="printInvoiceDocumentForInv('${inv.id}')"><i class="fa-solid fa-print"></i> طباعة</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteInvoice('${inv.id}')"><i class="fa-solid fa-trash"></i> حذف</button>
                </td>
            </tr>
        `;
    });
}

function showAddExpenseModal() {
    document.getElementById('expenseModalTitle').innerText = "تسجيل مصروف مالي تشغيلي";
    document.getElementById('editExpenseId').value = "";
    document.getElementById('newExpTitle').value = "";
    document.getElementById('newExpAmount').value = "";
    showModal('addExpenseModal');
}

function showEditExpenseModal(id) {
    const exp = DB.expenses.find(e => e.id === id);
    if (!exp) return;

    document.getElementById('expenseModalTitle').innerText = "تعديل المصروف المالي المسجل";
    document.getElementById('editExpenseId').value = exp.id;
    document.getElementById('newExpTitle').value = exp.title;
    document.getElementById('newExpCategory').value = exp.category;
    document.getElementById('newExpAmount').value = exp.amount;

    showModal('addExpenseModal');
}

function submitAddExpense() {
    const id = document.getElementById('editExpenseId').value;
    const title = document.getElementById('newExpTitle').value.trim();
    const category = document.getElementById('newExpCategory').value;
    const amount = parseFloat(document.getElementById('newExpAmount').value) || 0;

    if (!title || amount <= 0) {
        alert("يرجى كتابة عنوان المصروف والقيمة بشكل صحيح!");
        return;
    }

    if (id) {
        const exp = DB.expenses.find(e => e.id === id);
        if (exp) {
            exp.title = title;
            exp.category = category;
            exp.amount = amount;
            logActivity("MohaMMed.Y", "ADMIN", `تعديل مصروف تشغيلي: ${title}`, "success");
        }
    } else {
        DB.expenses.push({
            id: "EXP-" + Date.now(),
            title: title,
            category: category,
            amount: amount,
            date: getTodayDateString()
        });
        logActivity("MohaMMed.Y", "ADMIN", `تسجيل مصروف مالي جديد: ${title}`, "warning");
    }

    saveDatabase();
    closeModal('addExpenseModal');
    renderBillingLedger();
    renderDashboardStats();
}

function deleteExpense(id) {
    const exp = DB.expenses.find(e => e.id === id);
    if (!exp) return;
    if (confirm(`هل أنت متأكد من حذف مصروف (${exp.title})؟`)) {
        DB.expenses = DB.expenses.filter(e => e.id !== id);
        logActivity("MohaMMed.Y", "ADMIN", `حذف بند المصروف: ${exp.title}`, "warning");
        saveDatabase();
        renderBillingLedger();
        renderDashboardStats();
    }
}

function showCreateInvoiceModal() {
    document.getElementById('invoiceModalTitle').innerText = "إنشاء فاتورة جديدة وصرف سند";
    document.getElementById('editInvoiceId').value = "";
    
    document.getElementById('invDiscount').value = 0;
    document.getElementById('invTax').value = DB.settings.taxPercent || 0;
    document.getElementById('invAmountPaid').value = 0;

    const nextCode = "INV-" + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('print-inv-id').innerText = nextCode;
    document.getElementById('print-inv-date').innerText = getTodayDateString();

    const selectPat = document.getElementById('invPatientSelect');
    selectPat.innerHTML = "";
    DB.patients.forEach(p => {
        selectPat.innerHTML += `<option value="${p.id}">${p.name}</option>`;
    });

    calculateSuggestedInvoiceAmount();
    showModal('createInvoiceModal');
}

function calculateSuggestedInvoiceAmount() {
    const patId = document.getElementById('invPatientSelect').value;
    const pat = DB.patients.find(p => p.id === patId);
    
    const container = document.getElementById('invoiceTreatmentsList');
    container.innerHTML = "";

    const pTeeth = DB.patientTeeth[patId] || {};
    const teethKeys = Object.keys(pTeeth);
    let count = 0;

    teethKeys.forEach(tNum => {
        const item = pTeeth[tNum];
        if (!item.invoiced && item.cost > 0) {
            count++;
            container.innerHTML += `
                <div class="treatment-select-item">
                    <input type="checkbox" id="chk-tooth-${tNum}" value="${tNum}" checked onchange="recalculateInvoiceTotal()">
                    <label for="chk-tooth-${tNum}">سن رقم ${tNum}: ${translateCondition(item.condition)} (د. ${item.doctor}) - ${formatNumber(item.cost)} د.ع</label>
                </div>
            `;
        }
    });

    if (count === 0) {
        container.innerHTML = `
            <div class="treatment-select-item">
                <input type="checkbox" id="chk-default-treatment" value="default" checked onchange="recalculateInvoiceTotal()">
                <label for="chk-default-treatment">جلسات علاجية للأسنان - ${formatNumber(pat ? pat.treatmentPrice : 150000)} د.ع</label>
            </div>
        `;
    }

    document.getElementById('print-inv-patient').innerText = pat ? pat.name : "--";
    recalculateInvoiceTotal();
}

function recalculateInvoiceTotal() {
    const patId = document.getElementById('invPatientSelect').value;
    const pat = DB.patients.find(p => p.id === patId);
    const pTeeth = DB.patientTeeth[patId] || {};
    
    const tbody = document.getElementById('print-inv-items');
    tbody.innerHTML = "";
    
    let subtotal = 0;
    
    const checkboxes = document.querySelectorAll('#invoiceTreatmentsList input[type="checkbox"]');
    checkboxes.forEach(chk => {
        if (chk.checked) {
            if (chk.value === 'default') {
                const pr = pat ? pat.treatmentPrice : 150000;
                subtotal += pr;
                tbody.innerHTML += `
                    <tr>
                        <td style="text-align:right;">جلسات علاج أسنان (${pat ? pat.treatmentType : 'حشوه جذر'})</td>
                        <td style="text-align:left;">${formatNumber(pr)} د.ع</td>
                    </tr>
                `;
            } else {
                const tNum = chk.value;
                const item = pTeeth[tNum];
                if (item) {
                    subtotal += item.cost;
                    tbody.innerHTML += `
                        <tr>
                            <td style="text-align:right;">علاج السن رقم ${tNum} (${translateCondition(item.condition)}) - ${item.plan}</td>
                            <td style="text-align:left;">${formatNumber(item.cost)} د.ع</td>
                        </tr>
                    `;
                }
            }
        }
    });

    const discount = parseFloat(document.getElementById('invDiscount').value) || 0;
    const taxRate = parseFloat(document.getElementById('invTax').value) || 0;
    
    const taxedAmount = (subtotal - discount) * (taxRate / 100);
    const grandTotal = Math.max(0, (subtotal - discount) + taxedAmount);
    
    const paid = parseFloat(document.getElementById('invAmountPaid').value) || 0;
    const debt = Math.max(0, grandTotal - paid);

    document.getElementById('invAmountRemaining').value = formatNumber(debt) + " د.ع";
    
    document.getElementById('print-inv-subtotal').innerText = formatNumber(subtotal) + " د.ع";
    document.getElementById('print-inv-discount').innerText = formatNumber(discount) + " د.ع";
    document.getElementById('print-inv-tax').innerText = formatNumber(taxedAmount) + " د.ع";
    document.getElementById('print-inv-grandtotal').innerText = formatNumber(grandTotal) + " د.ع";
    document.getElementById('print-inv-paid').innerText = formatNumber(paid) + " د.ع";
    document.getElementById('print-inv-debt').innerText = formatNumber(debt) + " د.ع";
}

function submitCreateInvoice() {
    const patId = document.getElementById('invPatientSelect').value;
    const pat = DB.patients.find(p => p.id === patId);
    if (!pat) return;

    const grandText = document.getElementById('print-inv-grandtotal').innerText.replace(/,/g, '').replace(' د.ع', '');
    const paidText = document.getElementById('print-inv-paid').innerText.replace(/,/g, '').replace(' د.ع', '');
    const debtText = document.getElementById('print-inv-debt').innerText.replace(/,/g, '').replace(' د.ع', '');
    const subtotalText = document.getElementById('print-inv-subtotal').innerText.replace(/,/g, '').replace(' د.ع', '');
    const discountText = document.getElementById('print-inv-discount').innerText.replace(/,/g, '').replace(' د.ع', '');
    const taxText = document.getElementById('print-inv-tax').innerText.replace(/,/g, '').replace(' د.ع', '');

    const grandTotal = parseFloat(grandText);
    const paid = parseFloat(paidText);
    const debt = parseFloat(debtText);

    const nextCode = document.getElementById('print-inv-id').innerText;

    DB.invoices.push({
        id: nextCode,
        patientId: patId,
        patientName: pat.name,
        subtotal: parseFloat(subtotalText),
        discount: parseFloat(discountText),
        tax: parseFloat(taxText),
        grandTotal: grandTotal,
        amountPaid: paid,
        debt: debt,
        status: debt === 0 ? "paid" : "partial",
        date: getTodayDateString()
    });

    const checkboxes = document.querySelectorAll('#invoiceTreatmentsList input[type="checkbox"]');
    checkboxes.forEach(chk => {
        if (chk.checked && chk.value !== 'default') {
            const tNum = chk.value;
            if (DB.patientTeeth[patId] && DB.patientTeeth[patId][tNum]) {
                DB.patientTeeth[patId][tNum].invoiced = true;
            }
        }
    });

    // Update patientRemainingDebt
    pat.amountRemaining = debt;

    logActivity(DB.currentUser ? DB.currentUser.usernameKey : "المالك", "USER", `تم ترحيل الفاتورة ${nextCode} للمريض ${pat.name} بقيمة ${formatNumber(grandTotal)} د.ع`, "success");
    saveDatabase();
    closeModal('createInvoiceModal');
    renderBillingLedger();
    renderDashboardStats();
}

function deleteInvoice(id) {
    const inv = DB.invoices.find(i => i.id === id);
    if (!inv) return;
    if (confirm(`هل أنت متأكد من حذف وإلغاء الفاتورة المعتمدة (${inv.id})؟`)) {
        // If this invoice was auto-generated from a treatment or payment session, delete the session as well
        if (id.startsWith('INV-SES-')) {
            const sesId = id.substring(4); // Remove "INV-" prefix
            const ses = (DB.sessions || []).find(s => s.id === sesId);
            if (ses) {
                const pat = DB.patients.find(p => p.id === ses.patientId);
                const isPayment = ses.procedure.includes("دفعة نقدية واصل") || ses.procedure.includes("قسط");
                if (isPayment) {
                    if (pat) pat.amountRemaining = parseFloat(pat.amountRemaining) + ses.amountPaid;
                } else {
                    if (pat) pat.amountRemaining = Math.max(0, pat.amountRemaining - ses.amountRemaining);
                }
                DB.sessions = DB.sessions.filter(s => s.id !== sesId);
            }
        }

        DB.invoices = DB.invoices.filter(i => i.id !== id);
        logActivity(DB.currentUser ? DB.currentUser.usernameKey : "المالك", "USER", `حذف وإلغاء ترحيل الفاتورة: ${inv.id}`, "warning");
        saveDatabase();

        loadMedicalProfileData();
        renderPatientsTable();
        renderBillingLedger();
        renderDashboardStats();
    }
}

function getInvoicePrintHTML(inv) {
    const sesId = inv.id.startsWith('INV-SES-') ? inv.id.substring(4) : null;
    const ses = sesId ? (DB.sessions || []).find(s => s.id === sesId) : null;
    const procedureText = ses ? ses.procedure : "سند مالي مرحل لعلاجات أسنان متكاملة بالعيادة";
    const procedureNotes = ses ? (ses.doctorNotes || "جلسة معتادة") : "تم ترحيل الفاتورة بنجاح";
    
    // Find patient object
    const pat = (DB.patients || []).find(p => p.id === inv.patientId || p.name === inv.patientName);
    
    // Calculate accounting stubs
    const previousDebt = pat ? Math.max(0, (pat.amountRemaining || 0) - inv.debt) : 0;
    const totalAccount = previousDebt + inv.grandTotal;
    
    const doctorName = pat ? (pat.doctor || "طبيب العيادة المعتمد") : (ses ? (ses.doctor || "طبيب العيادة المعتمد") : "طبيب العيادة المعتمد");
    const managerName = DB.settings.clinicManager || DB.currentUser.ownerName || "المدير المسؤول";
    const cName = DB.settings.clinicName || "عيادة الأسنان التخصصية";
    const cNameEn = DB.settings.clinicNameEn || "DENTAL CLINIC";
    const logoSrc = DB.settings.logo || "assets/logo.jpg";
    const currentTime = new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' });

    // Generate dynamic table-free isolated cards for treatments
    const treatments = pat && pat.treatments && pat.treatments.length > 0 ? pat.treatments : [
        { type: procedureText, price: inv.subtotal, paid: inv.amountPaid, sessions: 1 }
    ];

    let rowsHtml = "";
    treatments.forEach((t, index) => {
        const tDebt = Math.max(0, t.price - t.paid);
        rowsHtml += " " +
            "<tr style='background: " + (index % 2 === 0 ? "#ffffff" : "#f8fafc") + ";'>" +
                "<td style='padding: 10px; border: 1.5px solid #cbd5e1; font-weight: bold; color: #64748b; text-align: center; font-size: 12.5px;'>" + (index + 1) + "</td>" +
                "<td contenteditable='true' style='padding: 10px; border: 1.5px solid #cbd5e1; text-align: right; font-weight: 800; color: #1e3a8a; font-size: 12.5px; outline: none;'>" + t.type + "</td>" +
                "<td contenteditable='true' style='padding: 10px; border: 1.5px solid #cbd5e1; text-align: center; font-weight: bold; color: #0284c7; font-size: 12.5px; outline: none;'>" + t.sessions + "</td>" +
                "<td contenteditable='true' style='padding: 10px; border: 1.5px solid #cbd5e1; text-align: center; font-weight: bold; color: #1e3a8a; font-size: 12.5px; outline: none;'>" + formatNumber(t.price) + " د.ع</td>" +
                "<td contenteditable='true' style='padding: 10px; border: 1.5px solid #cbd5e1; text-align: center; font-weight: bold; color: #10b981; font-size: 12.5px; outline: none;'>" + formatNumber(t.paid) + " د.ع</td>" +
                "<td contenteditable='true' style='padding: 10px; border: 1.5px solid #cbd5e1; text-align: center; font-weight: bold; color: #ef4444; font-size: 12.5px; outline: none;'>" + formatNumber(tDebt) + " د.ع</td>" +
            "</tr>";
    });

    const totalSessionsPrice = treatments.reduce((acc, t) => acc + t.price, 0);
    const totalSessionsPaid = treatments.reduce((acc, t) => acc + t.paid, 0);

    return `
        <style>
            @media print {
                @page {
                    size: A4 portrait;
                    margin: 15mm 15mm 15mm 15mm;
                }
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
                .invoice-print-preview {
                    border: none !important;
                    box-shadow: none !important;
                }
                [contenteditable="true"] {
                    outline: none !important;
                    border: none !important;
                    background: transparent !important;
                }
            }
            [contenteditable="true"]:hover {
                background: rgba(30, 58, 138, 0.05);
                cursor: pointer;
            }
            [contenteditable="true"]:focus {
                background: rgba(30, 58, 138, 0.08);
                box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.15);
                border-radius: 4px;
            }
        </style>
        <div class="invoice-print-preview" style="background:#fff !important; color:#0f172a !important; padding:35px; font-family:'Cairo', sans-serif; border: 3px solid #1e3a8a; border-radius:20px; direction: rtl; text-align: right; width: 100%; box-sizing: border-box; position: relative; overflow: hidden;">
            
            <!-- PAGE 1 -->
            
            <!-- Title Header -->
            <div style="text-align: center; margin-bottom: 25px; border-bottom: 3px double #1e3a8a; padding-bottom: 15px;">
                <h2 style="font-size: 24px; font-weight: 900; color: #1e3a8a; margin: 0 0 5px 0; font-family:'Cairo';">🦷 فاتــورة عيــادة أسنــان 🦷</h2>
                <div style="font-size: 15px; color: #1e3a8a; font-weight: 800; font-family:'Cairo';">${cName} / ${cNameEn}</div>
            </div>

            <!-- Invoice Metadata block -->
            <div style="display: flex; justify-content: space-between; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 15px; margin-bottom: 25px; font-size: 13px; color: #334155;">
                <div>رقم الفاتورة : <strong contenteditable="true" style="outline:none;">${inv.id}</strong></div>
                <div>التاريخ : <strong contenteditable="true" style="outline:none;">${inv.date}</strong></div>
                <div>الوقت : <strong contenteditable="true" style="outline:none;">${currentTime}</strong></div>
            </div>

            <!-- Top Grid: Patient Info & Clinic Info -->
            <div style="display: flex; gap: 20px; margin-bottom: 25px;">
                <!-- Patient Info Card -->
                <div style="flex: 1; border: 1.5px solid #1e3a8a; border-radius: 12px; padding: 18px; position: relative; background: #fff;">
                    <div style="position: absolute; top: -11px; right: 15px; background: #1e3a8a; color: #fff; padding: 2px 12px; border-radius: 99px; font-size: 11.5px; font-weight: bold;">📋 بيانات المراجع</div>
                    <div style="display: flex; flex-direction: column; gap: 10px; font-size: 13px; margin-top: 8px; color: #1e293b;">
                        <div>اسم المراجع : <strong contenteditable="true" style="outline:none;">${inv.patientName}</strong></div>
                        <div>العمر : <strong contenteditable="true" style="outline:none;">${pat ? pat.age : 'غير محدد'}</strong></div>
                        <div>الجنس : <strong contenteditable="true" style="outline:none;">${pat ? (pat.gender === 'male' ? 'ذكر' : (pat.gender === 'female' ? 'أنثى' : pat.gender)) : 'غير محدد'}</strong></div>
                        <div>العنوان : <strong contenteditable="true" style="outline:none;">${pat ? (pat.address || 'غير محدد') : 'غير محدد'}</strong></div>
                        <div>رقم الهاتف : <strong contenteditable="true" style="outline:none;">${pat ? pat.phone : 'غير محدد'}</strong></div>
                        <div>رقم الملف الطبي : <strong contenteditable="true" style="outline:none;">${inv.patientId || (pat ? pat.id : '-')}</strong></div>
                    </div>
                </div>

                <!-- Clinic Info Card -->
                <div style="flex: 1; border: 1.5px solid #1e3a8a; border-radius: 12px; padding: 18px; position: relative; background: #fff;">
                    <div style="position: absolute; top: -11px; right: 15px; background: #1e3a8a; color: #fff; padding: 2px 12px; border-radius: 99px; font-size: 11.5px; font-weight: bold;">🏥 بيانات العيادة</div>
                    <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px; margin-top: 15px; color: #1e293b;">
                        <div>اسم مدير العيادة : <strong contenteditable="true" style="outline:none;">${managerName}</strong></div>
                        <div>رقم العيادة : <strong contenteditable="true" style="outline:none;">${DB.settings.clinicPhone || '07855906001'}</strong></div>
                        <div>العنوان : <strong contenteditable="true" style="outline:none;">${DB.settings.address || 'غير محدد'}</strong></div>
                    </div>
                </div>
            </div>

            <!-- Treatment Details -->
            <div style="border: 1.5px solid #1e3a8a; border-radius: 12px; padding: 18px; position: relative; margin-bottom: 25px; background: #fff;">
                <div style="position: absolute; top: -11px; right: 15px; background: #1e3a8a; color: #fff; padding: 2px 12px; border-radius: 99px; font-size: 11.5px; font-weight: bold;">🦷 تفاصيل العلاج</div>
                <div style="margin-top: 10px;">
                    
                    <!-- Neat treatments list table -->
                    <table style="width: 100%; border-collapse: collapse; font-size: 12.5px; text-align: center; border-radius: 8px; overflow: hidden; border: 1.5px solid #cbd5e1;">
                        <thead>
                            <tr style="background: #1e3a8a; color: #fff; font-weight: 800; font-size: 12px;">
                                <th style="padding: 10px; border: 1.5px solid #cbd5e1; width: 40px;">#</th>
                                <th style="padding: 10px; border: 1.5px solid #cbd5e1; text-align: right;">نوع الإجراء / العلاج</th>
                                <th style="padding: 10px; border: 1.5px solid #cbd5e1; width: 90px;">الجلسات</th>
                                <th style="padding: 10px; border: 1.5px solid #cbd5e1; width: 110px;">السعر الكلي</th>
                                <th style="padding: 10px; border: 1.5px solid #cbd5e1; width: 110px;">الواصل</th>
                                <th style="padding: 10px; border: 1.5px solid #cbd5e1; width: 110px;">المتبقي</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHtml}
                        </tbody>
                    </table>

                    <!-- Combined Total of all sessions -->
                    <div style="display: flex; justify-content: space-between; font-size: 13px; background: #eff6ff; padding: 10px 15px; border-radius: 8px; border: 1.5px solid #bfdbfe; margin-top: 15px;">
                        <span>المبلغ الكلي لجميع الجلسات: <strong contenteditable="true" style="color: #1e3a8a; font-size: 14px; outline:none;">${formatNumber(totalSessionsPrice)} د.ع</strong></span>
                        <span>شكد واصل من المبلغ الكلي: <strong contenteditable="true" style="color: #10b981; font-size: 14px; outline:none;">${formatNumber(totalSessionsPaid)} د.ع</strong></span>
                    </div>

                    <!-- Treating Doctor details outside the table -->
                    <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #cbd5e1; padding-top: 12px; font-size: 13px;">
                        <span>اسم الطبيب المعالج: <strong contenteditable="true" style="color: #065f46; font-size: 14px; outline:none;">د. ${doctorName}</strong></span>
                        <span style="font-size: 11.5px; color: #64748b;">توقيع الطبيب المعالج: _____________________</span>
                    </div>

                    <div style="margin-top: 15px; border-top: 1px dashed #cbd5e1; padding-top: 10px;">
                        <strong style="color: #1e3a8a; display: block; margin-bottom: 4px; font-size: 12.5px;">ملاحظات الطبيب:</strong>
                        <div contenteditable="true" style="font-size: 12px; color: #475569; line-height: 1.6; background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 8px; outline:none;">
                            ${procedureNotes || 'تم ترحيل الفاتورة بنجاح.'}
                        </div>
                    </div>
                </div>
            </div>

            <!-- PAGE BREAK TO FORCE STARTING ON PAGE 2 CLEANLY -->
            <div style="page-break-before: always;"></div>

            <!-- PAGE 2 -->

            <!-- Financial details -->
            <div style="display: flex; gap: 20px; margin-bottom: 25px; margin-top: 20px;">
                <!-- Accounts Card -->
                <div style="flex: 1.5; border: 1.5px solid #1e3a8a; border-radius: 12px; padding: 18px; position: relative; background: #fff;">
                    <div style="position: absolute; top: -11px; right: 15px; background: #1e3a8a; color: #fff; padding: 2px 12px; border-radius: 99px; font-size: 11.5px; font-weight: bold;">💳 تفاصيل الحساب</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px; margin-top: 8px; color: #1e293b;">
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">
                            <span>الحساب السابق:</span>
                            <strong contenteditable="true" style="color: #ef4444; outline:none;">${formatNumber(previousDebt)} IQD</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">
                            <span>الحساب اليوم:</span>
                            <strong contenteditable="true" style="color: #1e3a8a; outline:none;">${formatNumber(inv.grandTotal)} IQD</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">
                            <span>الخصم المالي:</span>
                            <strong contenteditable="true" style="color: #ef4444; outline:none;">${formatNumber(inv.discount || 0)} IQD</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">
                            <span>الحساب الكامل:</span>
                            <strong contenteditable="true" style="color: #1e3a8a; outline:none;">${formatNumber(totalAccount)} IQD</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">
                            <span>المبلغ المدفوع:</span>
                            <strong contenteditable="true" style="color: #10b981; outline:none;">${formatNumber(inv.amountPaid)} IQD</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">
                            <span>الحساب المتبقي:</span>
                            <strong contenteditable="true" style="color: #ef4444; outline:none;">${formatNumber(Math.max(0, totalAccount - inv.amountPaid))} IQD</strong>
                        </div>
                    </div>
                </div>

                <!-- Payment Method Card -->
                <div style="flex: 1; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 18px; position: relative; background: #f8fafc; display: flex; flex-direction: column; justify-content: center;">
                    <div style="position: absolute; top: -11px; right: 15px; background: #64748b; color: #fff; padding: 2px 12px; border-radius: 99px; font-size: 11.5px; font-weight: bold;">طريقة الدفع</div>
                    <div style="display: flex; flex-direction: column; gap: 10px; font-size: 12.5px; color: #334155; margin-top: 8px;">
                        <label style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" ${(inv.paymentMethod || (pat ? pat.paymentMethod : 'نقداً')) === 'نقداً' ? 'checked' : ''}> نقداً</label>
                        <label style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" ${(inv.paymentMethod || (pat ? pat.paymentMethod : 'نقداً')) === 'زين كاش' ? 'checked' : ''}> زين كاش</label>
                        <label style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" ${(inv.paymentMethod || (pat ? pat.paymentMethod : 'نقداً')) === 'ماستر كارد' ? 'checked' : ''}> ماستر كارد</label>
                        <label style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" ${(inv.paymentMethod || (pat ? pat.paymentMethod : 'نقداً')) !== 'نقداً' && (inv.paymentMethod || (pat ? pat.paymentMethod : 'نقداً')) !== 'زين كاش' && (inv.paymentMethod || (pat ? pat.paymentMethod : 'نقداً')) !== 'ماستر كارد' ? 'checked' : ''}> أخرى: ____________</label>
                    </div>
                </div>
            </div>

            <!-- Signatures & Stamp -->
            <div style="display: flex; gap: 20px; margin-top: 30px;">
                <div style="flex: 1; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 15px; text-align: center;">
                    <span style="font-weight: 800; color: #1e3a8a; font-size: 12.5px; display: block; margin-bottom: 10px;">توقيع المراجع</span>
                    <div style="margin-top: 40px; border-top: 1px dashed #cbd5e1; width: 80%; margin-left: auto; margin-right: auto;"></div>
                </div>
                <div style="flex: 1; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 15px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80px;">
                    <span style="font-weight: 800; color: #1e3a8a; display: block; margin-bottom: 5px; font-size: 12.5px;">الختم الرسمي للعيادة</span>
                    <div style="width: 55px; height: 55px; border: 2px dashed #94a3b8; border-radius: 50%;"></div>
                </div>
            </div>

            <!-- Footer Banner -->
            <div style="text-align: center; margin-top: 30px; border-top: 1.5px dashed #cbd5e1; padding-top: 15px; font-size: 13px; color: #1e3a8a; font-weight: 800; font-family:'Cairo';">
                شكراً لثقتكم بنا، نتمنى لكم دوام الصحة والابتسامة الجميلة 🌷
            </div>
        </div>
    `;
}function printInvoiceDocumentForInv(id) {
    const inv = DB.invoices.find(i => i.id === id);
    if (!inv) return;

    const printContainer = document.getElementById('printWrapper');
    printContainer.innerHTML = getInvoicePrintHTML(inv);
    window.print();
}

function printInvoiceDocument() {
    const patId = document.getElementById('invPatientSelect').value;
    const pat = DB.patients.find(p => p.id === patId);
    if (!pat) return;

    const grandText = document.getElementById('print-inv-grandtotal').innerText.replace(/,/g, '').replace(' د.ع', '');
    const paidText = document.getElementById('print-inv-paid').innerText.replace(/,/g, '').replace(' د.ع', '');
    const debtText = document.getElementById('print-inv-debt').innerText.replace(/,/g, '').replace(' د.ع', '');
    const subtotalText = document.getElementById('print-inv-subtotal').innerText.replace(/,/g, '').replace(' د.ع', '');
    const discountText = document.getElementById('print-inv-discount').innerText.replace(/,/g, '').replace(' د.ع', '');
    const taxText = document.getElementById('print-inv-tax').innerText.replace(/,/g, '').replace(' د.ع', '');
    const nextCode = document.getElementById('print-inv-id').innerText;

    const dummyInv = {
        id: nextCode,
        patientName: pat.name,
        subtotal: parseFloat(subtotalText) || 0,
        discount: parseFloat(discountText) || 0,
        tax: parseFloat(taxText) || 0,
        grandTotal: parseFloat(grandText) || 0,
        amountPaid: parseFloat(paidText) || 0,
        debt: parseFloat(debtText) || 0,
        date: getTodayDateString()
    };

    const printContainer = document.getElementById('printWrapper');
    printContainer.innerHTML = getInvoicePrintHTML(dummyInv);
    window.print();
}

function printExpensesTable() {
    const printContainer = document.getElementById('printWrapper');
    printContainer.innerHTML = `
        <div class="print-medical-profile">
            <h2>سجل النفقات والمصروفات المالية التشغيلية للعيادة</h2>
            <table class="print-table">
                <thead>
                    <tr>
                        <th>اسم المصروف</th>
                        <th>الفئة</th>
                        <th>المبلغ (د.ع)</th>
                        <th>التاريخ</th>
                    </tr>
                </thead>
                <tbody>
                    ${DB.expenses.map(exp => `
                        <tr>
                            <td><strong>${exp.title}</strong></td>
                            <td>${exp.category}</td>
                            <td style="color:red;">${formatNumber(exp.amount)} د.ع</td>
                            <td>${exp.date}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    window.print();
}

function printInvoicesTable() {
    const printContainer = document.getElementById('printWrapper');
    printContainer.innerHTML = `
        <div class="print-medical-profile">
            <h2>سجل فواتير وسندات المقبوضات للمرضى</h2>
            <table class="print-table">
                <thead>
                    <tr>
                        <th>رقم الفاتورة</th>
                        <th>اسم المريض</th>
                        <th>صافي الفاتورة</th>
                        <th>المبلغ المقبوض</th>
                        <th>المبلغ المتبقي</th>
                        <th>التاريخ</th>
                    </tr>
                </thead>
                <tbody>
                    ${DB.invoices.map(inv => `
                        <tr>
                            <td>${inv.id}</td>
                            <td><strong>${inv.patientName}</strong></td>
                            <td>${formatNumber(inv.grandTotal)} د.ع</td>
                            <td>${formatNumber(inv.amountPaid)} د.ع</td>
                            <td>${formatNumber(inv.debt)} د.ع</td>
                            <td>${inv.date}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    window.print();
}

// =========================================================================
// 12. TAB: INVENTORY
// =========================================================================
function renderInventoryScreen() {
    const tbodyMat = document.getElementById('inventoryTableBody');
    tbodyMat.innerHTML = "";
    DB.inventory.forEach(mat => {
        tbodyMat.innerHTML += `
            <tr>
                <td><strong>${mat.name}</strong></td>
                <td>${mat.qty} وحدات</td>
                <td>${mat.minRequired} وحدات</td>
                <td>${mat.supplier}</td>
                <td>${mat.expiryDate}</td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="showEditMaterialModal('${mat.id}')"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="deleteMaterial('${mat.id}')"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });

    const tbodyEq = document.getElementById('equipmentTableBody');
    tbodyEq.innerHTML = "";
    DB.equipments.forEach(eq => {
        let stLabel = eq.status === 'OPERATIONAL' ? 'يعمل بكفاءة' : (eq.status === 'UNDER_MAINTENANCE' ? 'تحت الصيانة' : 'خارج الخدمة');
        tbodyEq.innerHTML += `
            <tr>
                <td><strong>${eq.name}</strong></td>
                <td>${eq.purchaseDate}</td>
                <td>${eq.warrantyExpiry}</td>
                <td><span class="status-indicator ${eq.status === 'OPERATIONAL' ? 'success' : 'warning'}">${stLabel}</span></td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="showEditEquipmentModal('${eq.id}')"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEquipment('${eq.id}')"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

function showAddMaterialModal() {
    document.getElementById('materialModalTitle').innerText = "إضافة مادة طبية للمخزن";
    document.getElementById('editMaterialId').value = "";
    
    document.getElementById('newMatName').value = "";
    document.getElementById('newMatQty').value = 10;
    document.getElementById('newMatMin').value = 5;
    document.getElementById('newMatSupplier').value = "";
    document.getElementById('newMatExpiry').value = "";

    showModal('addMaterialModal');
}

function showEditMaterialModal(id) {
    const mat = DB.inventory.find(m => m.id === id);
    if (!mat) return;

    document.getElementById('materialModalTitle').innerText = "تعديل تفاصيل المادة المستودعية";
    document.getElementById('editMaterialId').value = mat.id;
    
    document.getElementById('newMatName').value = mat.name;
    document.getElementById('newMatQty').value = mat.qty;
    document.getElementById('newMatMin').value = mat.minRequired;
    document.getElementById('newMatSupplier').value = mat.supplier;
    document.getElementById('newMatExpiry').value = mat.expiryDate;

    showModal('addMaterialModal');
}

function submitAddMaterial() {
    const id = document.getElementById('editMaterialId').value;
    const name = document.getElementById('newMatName').value.trim();
    const qty = parseInt(document.getElementById('newMatQty').value) || 0;
    const min = parseInt(document.getElementById('newMatMin').value) || 0;
    const supplier = document.getElementById('newMatSupplier').value.trim() || "غير محدد";
    const expiry = document.getElementById('newMatExpiry').value;

    if (!name || !expiry) {
        alert("يرجى ملء الحقول الضرورية!");
        return;
    }

    if (id) {
        const mat = DB.inventory.find(m => m.id === id);
        if (mat) {
            mat.name = name;
            mat.qty = qty;
            mat.minRequired = min;
            mat.supplier = supplier;
            mat.expiryDate = expiry;
            logActivity("MohaMMed.Y", "ADMIN", `تعديل المادة الطبية بالدليل: ${name}`, "success");
        }
    } else {
        DB.inventory.push({
            id: "MAT-" + Date.now(),
            name: name,
            qty: qty,
            minRequired: min,
            supplier: supplier,
            expiryDate: expiry
        });
        logActivity("MohaMMed.Y", "ADMIN", `إدخل مادة مخزنية جديدة: ${name}`, "success");
    }

    saveDatabase();
    closeModal('addMaterialModal');
    renderInventoryScreen();
    renderDashboardStats();
}

function deleteMaterial(id) {
    const mat = DB.inventory.find(m => m.id === id);
    if (!mat) return;
    if (confirm(`هل أنت متأكد من حذف المادة (${mat.name})؟`)) {
        DB.inventory = DB.inventory.filter(m => m.id !== id);
        logActivity("MohaMMed.Y", "ADMIN", `حذف المادة الطبية: ${mat.name}`, "warning");
        saveDatabase();
        renderInventoryScreen();
        renderDashboardStats();
    }
}

function showAddEquipmentModal() {
    document.getElementById('equipmentModalTitle').innerText = "تسجيل جهاز طبي جديد بالعيادة";
    document.getElementById('editEquipmentId').value = "";
    
    document.getElementById('newEqName').value = "";
    document.getElementById('newEqPurchase').value = getTodayDateString();
    document.getElementById('newEqWarranty').value = "";
    document.getElementById('newEqStatus').value = "OPERATIONAL";

    showModal('addEquipmentModal');
}

function showEditEquipmentModal(id) {
    const eq = DB.equipments.find(e => e.id === id);
    if (!eq) return;

    document.getElementById('equipmentModalTitle').innerText = "تعديل بيانات الضمان وصيانة الجهاز";
    document.getElementById('editEquipmentId').value = eq.id;

    document.getElementById('newEqName').value = eq.name;
    document.getElementById('newEqPurchase').value = eq.purchaseDate;
    document.getElementById('newEqWarranty').value = eq.warrantyExpiry;
    document.getElementById('newEqStatus').value = eq.status;

    showModal('addEquipmentModal');
}

function submitAddEquipment() {
    const id = document.getElementById('editEquipmentId').value;
    const name = document.getElementById('newEqName').value.trim();
    const purchase = document.getElementById('newEqPurchase').value;
    const warranty = document.getElementById('newEqWarranty').value;
    const status = document.getElementById('newEqStatus').value;

    if (!name || !purchase) {
        alert("يرجى كتابة اسم الجهاز!");
        return;
    }

    if (id) {
        const eq = DB.equipments.find(e => e.id === id);
        if (eq) {
            eq.name = name;
            eq.purchaseDate = purchase;
            eq.warrantyExpiry = warranty;
            eq.status = status;
            logActivity("MohaMMed.Y", "ADMIN", `تعديل بيانات الصيانة للجهاز: ${name}`, "success");
        }
    } else {
        DB.equipments.push({
            id: "EQ-" + Date.now(),
            name: name,
            purchaseDate: purchase,
            warrantyExpiry: warranty,
            status: status
        });
        logActivity("MohaMMed.Y", "ADMIN", `تسجيل جهاز طبي جديد بالمركز: ${name}`, "success");
    }

    saveDatabase();
    closeModal('addEquipmentModal');
    renderInventoryScreen();
}

function deleteEquipment(id) {
    const eq = DB.equipments.find(e => e.id === id);
    if (!eq) return;
    if (confirm(`هل أنت متأكد من حذف سجل الجهاز (${eq.name})؟`)) {
        DB.equipments = DB.equipments.filter(e => e.id !== id);
        logActivity("MohaMMed.Y", "ADMIN", `حذف جهاز طبي: ${eq.name}`, "warning");
        saveDatabase();
        renderInventoryScreen();
    }
}

function printInventoryTable() {
    const printContainer = document.getElementById('printWrapper');
    printContainer.innerHTML = `
        <div class="print-medical-profile">
            <h2>تقرير مخزون المواد واللوازم الطبية المستودعية</h2>
            <table class="print-table">
                <thead>
                    <tr>
                        <th>اسم المادة</th>
                        <th>الكمية المتوفرة</th>
                        <th>الحد الأدنى للتنبيه</th>
                        <th>الشركة الموردة</th>
                        <th>تاريخ الانتهاء</th>
                    </tr>
                </thead>
                <tbody>
                    ${DB.inventory.map(mat => `
                        <tr>
                            <td><strong>${mat.name}</strong></td>
                            <td>${mat.qty} وحدة</td>
                            <td>${mat.minRequired} وحدة</td>
                            <td>${mat.supplier}</td>
                            <td>${mat.expiryDate}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    window.print();
}

function printEquipmentTable() {
    const printContainer = document.getElementById('printWrapper');
    printContainer.innerHTML = `
        <div class="print-medical-profile">
            <h2>تقرير وجدول صيانة الأجهزة الطبية</h2>
            <table class="print-table">
                <thead>
                    <tr>
                        <th>اسم الجهاز / الوحدة</th>
                        <th>تاريخ الشراء</th>
                        <th>انتهاء الضمان الكلي</th>
                        <th>حالة التشغيلية</th>
                    </tr>
                </thead>
                <tbody>
                    ${DB.equipments.map(eq => `
                        <tr>
                            <td><strong>${eq.name}</strong></td>
                            <td>${eq.purchaseDate}</td>
                            <td>${eq.warrantyExpiry}</td>
                            <td>${eq.status === 'OPERATIONAL' ? 'يعمل بكفاءة' : 'تحت الصيانة'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    window.print();
}

// =========================================================================
// 13. TAB: STAFF & ATTENDANCE
// =========================================================================
function renderStaffManagement() {
    document.querySelectorAll('.btn-tab-switch').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.staff-sub-pane').forEach(p => p.classList.remove('active'));

    const activeBtn = document.querySelector(`.btn-tab-switch[onclick="switchStaffSubTab('${activeStaffSubTab}')"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    document.getElementById(`subtab-${activeStaffSubTab}`).classList.add('active');

    if (activeStaffSubTab === 'staff-list') {
        renderStaffGrid();
    } else {
        renderAttendanceSheet();
    }
}

function switchStaffSubTab(tab) {
    activeStaffSubTab = tab;
    renderStaffManagement();
}

function renderStaffGrid() {
    const grid = document.getElementById('staffMembersGrid');
    grid.innerHTML = "";
    
    DB.staff.forEach(s => {
        grid.innerHTML += `
            <div class="employee-card glass-card">
                <i class="fa-solid fa-user-doctor avatar-placeholder"></i>
                <h4>${s.name}</h4>
                <span class="role-title">${s.roleAr}</span>
                <div class="employee-meta-info">
                    <div><span>رقم الهاتف:</span><strong>${s.phone}</strong></div>
                    <div><span>الراتب الشهري:</span><strong class="text-emerald">${formatNumber(s.salary)} د.ع</strong></div>
                    <div><span>تاريخ المباشرة:</span><strong>${s.hireDate}</strong></div>
                </div>
                <div class="employee-card-actions">
                    <button class="btn btn-secondary btn-sm" onclick="showEditEmployeeModal('${s.id}')"><i class="fa-solid fa-pencil"></i> تعديل</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEmployee('${s.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    });
}

function showAddEmployeeModal() {
    document.getElementById('employeeModalTitle').innerText = "تعيين وإضافة كادر وظيفي جديد";
    document.getElementById('editEmployeeId').value = "";
    
    document.getElementById('newEmpName').value = "";
    document.getElementById('newEmpPhone').value = "";
    document.getElementById('newEmpSalary').value = 500000;
    document.getElementById('newEmpHireDate').value = getTodayDateString();

    showModal('addEmployeeModal');
}

function showEditEmployeeModal(id) {
    const s = DB.staff.find(x => x.id === id);
    if (!s) return;

    document.getElementById('employeeModalTitle').innerText = "تعديل صلاحيات وراتب الموظف";
    document.getElementById('editEmployeeId').value = s.id;
    
    document.getElementById('newEmpName').value = s.name;
    document.getElementById('newEmpPhone').value = s.phone;
    document.getElementById('newEmpSalary').value = s.salary;
    document.getElementById('newEmpHireDate').value = s.hireDate;
    document.getElementById('newEmpRole').value = s.role;

    showModal('addEmployeeModal');
}

function submitAddEmployee() {
    const id = document.getElementById('editEmployeeId').value;
    const name = document.getElementById('newEmpName').value.trim();
    const phone = document.getElementById('newEmpPhone').value.trim();
    const salary = parseFloat(document.getElementById('newEmpSalary').value) || 0;
    const hire = document.getElementById('newEmpHireDate').value;
    const role = document.getElementById('newEmpRole').value;

    if (!name || !phone) {
        alert("يرجى ملء الحقول الأساسية!");
        return;
    }

    const roleMap = { 'DOCTOR': 'طبيب أسنان جراح', 'RECEPTION': 'موظف استقبال', 'ACCOUNTANT': 'محاسب مالي', 'ASSISTANT': 'مساعد طبي بالعيادة', 'ADMIN': 'مشرف العيادة (Admin)' };

    if (id) {
        const s = DB.staff.find(x => x.id === id);
        if (s) {
            s.name = name;
            s.phone = phone;
            s.salary = salary;
            s.hireDate = hire;
            s.role = role;
            s.roleAr = roleMap[role] || "موظف";
            logActivity("MohaMMed.Y", "ADMIN", `تعديل الملف الوظيفي للموظف: ${name}`, "success");
        }
    } else {
        DB.staff.push({
            id: "STF-" + Date.now(),
            name: name,
            role: role,
            roleAr: roleMap[role] || "موظف",
            phone: phone,
            salary: salary,
            hireDate: hire
        });
        logActivity("MohaMMed.Y", "ADMIN", `تعيين وتوظيف كادر جديد بالمركز: ${name}`, "success");
    }

    saveDatabase();
    closeModal('addEmployeeModal');
    renderStaffManagement();
}

function deleteEmployee(id) {
    const s = DB.staff.find(x => x.id === id);
    if (!s) return;
    if (confirm(`هل أنت متأكد من فصل أو إلغاء ملف الموظف (${s.name})؟`)) {
        DB.staff = DB.staff.filter(x => x.id !== id);
        logActivity("MohaMMed.Y", "ADMIN", `إلغاء وفسخ عقد الموظف بالعيادة: ${s.name}`, "warning");
        saveDatabase();
        renderStaffManagement();
    }
}

function printStaffList() {
    const printContainer = document.getElementById('printWrapper');
    printContainer.innerHTML = `
        <div class="print-medical-profile">
            <h2>سجل الكادر الطبي والإداري المعتمد بالمركز</h2>
            <table class="print-table">
                <thead>
                    <tr>
                        <th>الاسم الكامل للموظف</th>
                        <th>الدور الوظيفي</th>
                        <th>رقم الهاتف</th>
                        <th>الراتب الأساسي</th>
                        <th>تاريخ التعيين</th>
                    </tr>
                </thead>
                <tbody>
                    ${DB.staff.map(s => `
                        <tr>
                            <td><strong>${s.name}</strong></td>
                            <td>${s.roleAr}</td>
                            <td>${s.phone}</td>
                            <td>${formatNumber(s.salary)} د.ع</td>
                            <td>${s.hireDate}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    window.print();
}

function renderAttendanceSheet() {
    const btnGrid = document.getElementById('quickAttendanceGrid');
    btnGrid.innerHTML = "";
    
    DB.staff.forEach(s => {
        const todayStr = getTodayDateString();
        const hasCheckedIn = DB.attendance.find(a => a.staffId === s.id && a.checkIn.startsWith(todayStr));
        const hasCheckedOut = hasCheckedIn && hasCheckedIn.checkOut !== "";
        
        let actButton = "";
        if (!hasCheckedIn) {
            actButton = `<button class="btn btn-primary btn-sm" onclick="performStaffCheck('${s.id}', 'in')">تسجيل حضور</button>`;
        } else if (hasCheckedIn && !hasCheckedOut) {
            actButton = `<button class="btn btn-danger btn-sm" onclick="performStaffCheck('${s.id}', 'out')">تسجيل مغادرة</button>`;
        } else {
            actButton = `<span class="status-indicator success">أتم الوردية اليوم</span>`;
        }

        btnGrid.innerHTML += `
            <div class="attendance-row-action glass-card">
                <div>
                    <h4>${s.name}</h4>
                    <span style="font-size:10px; color:var(--text-muted);">${s.roleAr}</span>
                </div>
                <div>
                    ${actButton}
                </div>
            </div>
        `;
    });

    const tbody = document.getElementById('attendanceTableBody');
    tbody.innerHTML = "";
    DB.attendance.forEach(att => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${att.name}</strong></td>
                <td>${att.role}</td>
                <td class="text-emerald">${att.checkIn}</td>
                <td class="text-danger">${att.checkOut || '--:--'}</td>
                <td>${att.hours ? att.hours + " ساعات" : 'قيد العمل'}</td>
            </tr>
        `;
    });
}

function performStaffCheck(id, type) {
    const s = DB.staff.find(x => x.id === id);
    if (!s) return;
    
    const now = new Date();
    const timestamp = now.getFullYear() + "-" + 
                      ((now.getMonth() + 1).toString().padStart(2, '0')) + "-" + 
                      (now.getDate().toString().padStart(2, '0')) + " " + 
                      (now.getHours().toString().padStart(2, '0')) + ":" + 
                      (now.getMinutes().toString().padStart(2, '0')) + ":" + 
                      (now.getSeconds().toString().padStart(2, '0'));

    if (type === 'in') {
        DB.attendance.push({
            staffId: id,
            name: s.name,
            role: s.roleAr,
            checkIn: timestamp,
            checkOut: "",
            hours: null
        });
        logActivity("MohaMMed.Y", "ADMIN", `تسجيل حضور الموظف اليوم: ${s.name}`, "success");
    } else {
        const item = DB.attendance.find(a => a.staffId === id && a.checkOut === "");
        if (item) {
            item.checkOut = timestamp;
            item.hours = 8;
        }
        logActivity("MohaMMed.Y", "ADMIN", `تسجيل مغادرة الموظف اليوم: ${s.name}`, "warning");
    }

    saveDatabase();
    renderAttendanceSheet();
}

function printAttendanceLogs() {
    const printContainer = document.getElementById('printWrapper');
    printContainer.innerHTML = `
        <div class="print-medical-profile">
            <h2>سجل الحضور والانصراف التفصيلي لموظفي العيادة</h2>
            <table class="print-table">
                <thead>
                    <tr>
                        <th>الموظف</th>
                        <th>الدور الوظيفي</th>
                        <th>وقت الدخول</th>
                        <th>وقت الانصراف</th>
                        <th>ساعات العمل</th>
                    </tr>
                </thead>
                <tbody>
                    ${DB.attendance.map(att => `
                        <tr>
                            <td><strong>${att.name}</strong></td>
                            <td>${att.role}</td>
                            <td>${att.checkIn}</td>
                            <td>${att.checkOut || '-'}</td>
                            <td>${att.hours ? att.hours + " ساعات" : 'قيد الدوام'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    window.print();
}

// =========================================================================
// 14. TAB: FINANCIAL AUDIT (الجرد المالي والسنوي)
// =========================================================================
function renderFinancialAudit() {
    const revSum = DB.invoices.reduce((acc, i) => acc + i.grandTotal, 0);
    const recSum = DB.invoices.reduce((acc, i) => acc + i.amountPaid, 0);
    const expSum = DB.expenses.reduce((acc, e) => acc + e.amount, 0);
    const netProfit = revSum - expSum;

    // Calculate Today, Weekly, Monthly net profits
    const todayStr = getTodayDateString();
    
    function parseDate(str) {
        if (!str) return new Date();
        const parts = str.split('-');
        if (parts.length === 3) {
            return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        }
        return new Date();
    }
    
    const todayDate = parseDate(todayStr);
    
    // Today's stats
    const todayInvoices = DB.invoices.filter(i => i.date === todayStr);
    const todayExpenses = DB.expenses.filter(e => e.date === todayStr);
    const todayRev = todayInvoices.reduce((acc, i) => acc + i.grandTotal, 0);
    const todayExp = todayExpenses.reduce((acc, e) => acc + e.amount, 0);
    const todayNet = todayRev - todayExp;
    
    // Weekly stats (last 7 days)
    const sevenDaysAgo = new Date(todayDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekInvoices = DB.invoices.filter(i => parseDate(i.date) >= sevenDaysAgo);
    const weekExpenses = DB.expenses.filter(e => parseDate(e.date) >= sevenDaysAgo);
    const weekRev = weekInvoices.reduce((acc, i) => acc + i.grandTotal, 0);
    const weekExp = weekExpenses.reduce((acc, e) => acc + e.amount, 0);
    const weekNet = weekRev - weekExp;
    
    // Monthly stats (current calendar month)
    const currentMonthNum = todayDate.getMonth();
    const currentYearNum = todayDate.getFullYear();
    const monthInvoices = DB.invoices.filter(i => {
        const d = parseDate(i.date);
        return d.getMonth() === currentMonthNum && d.getFullYear() === currentYearNum;
    });
    const monthExpenses = DB.expenses.filter(e => {
        const d = parseDate(e.date);
        return d.getMonth() === currentMonthNum && d.getFullYear() === currentYearNum;
    });
    const monthRev = monthInvoices.reduce((acc, i) => acc + i.grandTotal, 0);
    const monthExp = monthExpenses.reduce((acc, e) => acc + e.amount, 0);
    const monthNet = monthRev - monthExp;

    // Display summary metrics
    const revTodayEl = document.getElementById('audit-rev-today');
    const halfTodayEl = document.getElementById('audit-half-today');
    const revWeekEl = document.getElementById('audit-rev-week');
    const halfWeekEl = document.getElementById('audit-half-week');
    const revMonthEl = document.getElementById('audit-rev-month');
    const halfMonthEl = document.getElementById('audit-half-month');
    const netEl = document.getElementById('audit-net-profit');
    const halfTotalEl = document.getElementById('audit-half-total');
    
    if (revTodayEl) revTodayEl.innerText = formatNumber(todayRev) + " د.ع";
    if (halfTodayEl) halfTodayEl.innerText = formatNumber(todayRev / 2) + " د.ع";
    if (revWeekEl) revWeekEl.innerText = formatNumber(weekRev) + " د.ع";
    if (halfWeekEl) halfWeekEl.innerText = formatNumber(weekRev / 2) + " د.ع";
    if (revMonthEl) revMonthEl.innerText = formatNumber(monthRev) + " د.ع";
    if (halfMonthEl) halfMonthEl.innerText = formatNumber(monthRev / 2) + " د.ع";
    if (netEl) netEl.innerText = formatNumber(netProfit) + " د.ع";
    if (halfTotalEl) halfTotalEl.innerText = formatNumber(netProfit / 2) + " د.ع";

    // Set neon progress bars values
    const paidPct = revSum > 0 ? (recSum / revSum) * 100 : 0;
    const expPct = revSum > 0 ? (expSum / revSum) * 100 : 0;

    const prg1 = document.getElementById('progressPercent1');
    const fill1 = document.getElementById('barFill1');
    const prg2 = document.getElementById('progressPercent2');
    const fill2 = document.getElementById('barFill2');

    if (prg1) prg1.innerText = Math.round(paidPct) + "%";
    if (fill1) fill1.style.width = Math.round(paidPct) + "%";
    if (prg2) prg2.innerText = Math.round(expPct) + "%";
    if (fill2) fill2.style.width = Math.round(expPct) + "%";

    const tbody = document.getElementById('auditFinancialTableBody');
    tbody.innerHTML = "";

    // Group dynamically day-by-day (يوم بيومه)
    const dailyMap = {};

    DB.invoices.forEach(i => {
        if (!dailyMap[i.date]) {
            dailyMap[i.date] = { count: 0, rev: 0, rec: 0, exp: 0 };
        }
        dailyMap[i.date].count += 1;
        dailyMap[i.date].rev += i.grandTotal;
        dailyMap[i.date].rec += i.amountPaid;
    });

    DB.expenses.forEach(e => {
        if (!dailyMap[e.date]) {
            dailyMap[e.date] = { count: 0, rev: 0, rec: 0, exp: 0 };
        }
        dailyMap[e.date].exp += e.amount;
    });

    const sortedDates = Object.keys(dailyMap).sort((a, b) => parseDate(b) - parseDate(a));

    if (sortedDates.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;">لا توجد قيود مالية مسجلة بعد.</td></tr>`;
    } else {
        sortedDates.forEach(date => {
            const dayData = dailyMap[date];
            const dayNet = dayData.rev - dayData.exp;
            const balClass = dayNet < 0 ? 'text-danger' : (dayNet > 0 ? 'text-emerald' : '');
            tbody.innerHTML += `
                <tr>
                    <td><strong>${date}</strong></td>
                    <td>${dayData.count} فاتورة</td>
                    <td>${formatNumber(dayData.rev)} د.ع</td>
                    <td class="text-blue">${formatNumber(dayData.rec)} د.ع</td>
                    <td class="text-danger">${formatNumber(dayData.exp)} د.ع</td>
                    <td class="${balClass}"><strong>${formatNumber(dayNet)} د.ع</strong></td>
                    <td><span class="status-indicator ${dayNet >= 0 ? 'success' : 'danger'}">${dayNet >= 0 ? 'سليم تشغيلياً' : 'عجز يومي'}</span></td>
                </tr>
            `;
        });
    }
}

// =========================================================================
// 14.2 PRINT FINANCIAL REPORT
// =========================================================================
function printFinancialAuditReport() {
    const revSum = DB.invoices.reduce((acc, i) => acc + i.grandTotal, 0);
    const expSum = DB.expenses.reduce((acc, e) => acc + e.amount, 0);
    const net = revSum - expSum;

    // Daily mapping for print table
    const dailyMap = {};
    DB.invoices.forEach(i => {
        if (!dailyMap[i.date]) {
            dailyMap[i.date] = { count: 0, rev: 0, rec: 0, exp: 0 };
        }
        dailyMap[i.date].count += 1;
        dailyMap[i.date].rev += i.grandTotal;
        dailyMap[i.date].rec += i.amountPaid;
    });
    DB.expenses.forEach(e => {
        if (!dailyMap[e.date]) {
            dailyMap[e.date] = { count: 0, rev: 0, rec: 0, exp: 0 };
        }
        dailyMap[e.date].exp += e.amount;
    });

    const sortedDates = Object.keys(dailyMap).sort((a, b) => {
        const ad = a.split('-');
        const bd = b.split('-');
        return new Date(bd[0], bd[1]-1, bd[2]) - new Date(ad[0], ad[1]-1, ad[2]);
    });

    const printContainer = document.getElementById('printWrapper');
    printContainer.innerHTML = `
        <div class="print-medical-profile" style="direction:rtl; text-align:right; font-family:'Cairo'; padding:20px;">
            <h2 style="text-align:center; font-size:18px; margin-bottom:15px; border-bottom:2px solid #111; padding-bottom:8px;">تقرير الجرد المالي المحاسبي اليومي للعيادة (يوم بيومه)</h2>
            <p>تاريخ إصدار المستند: <strong>${getTodayDateString()}</strong> | العملة الرسمية: <strong>د.ع (دينار عراقي)</strong></p>
            <p>إجمالي الإيرادات: <strong>${formatNumber(revSum)} د.ع</strong> | إجمالي النفقات: <strong>${formatNumber(expSum)} د.ع</strong> | الصافي المالي العام: <strong style="color:${net >= 0 ? 'green' : 'red'};">${formatNumber(net)} د.ع</strong></p>
            
            <table class="print-table" style="margin-top:20px; width:100%; border-collapse:collapse;">
                <thead>
                    <tr style="background:#f3f4f6;">
                        <th style="border:1px solid #9ca3af; padding:8px;">التاريخ / اليوم</th>
                        <th style="border:1px solid #9ca3af; padding:8px;">عدد الفواتير</th>
                        <th style="border:1px solid #9ca3af; padding:8px;">صافي الإيرادات</th>
                        <th style="border:1px solid #9ca3af; padding:8px;">المقبوضات النقدية</th>
                        <th style="border:1px solid #9ca3af; padding:8px;">المصروفات والنفقات</th>
                        <th style="border:1px solid #9ca3af; padding:8px;">الصافي اليومي</th>
                    </tr>
                </thead>
                <tbody>
                    ${sortedDates.map(date => {
                        const dayData = dailyMap[date];
                        const dayNet = dayData.rev - dayData.exp;
                        return `
                            <tr>
                                <td style="border:1px solid #9ca3af; padding:8px;"><strong>${date}</strong></td>
                                <td style="border:1px solid #9ca3af; padding:8px; text-align:center;">${dayData.count}</td>
                                <td style="border:1px solid #9ca3af; padding:8px;">${formatNumber(dayData.rev)} د.ع</td>
                                <td style="border:1px solid #9ca3af; padding:8px; color:blue;">${formatNumber(dayData.rec)} د.ع</td>
                                <td style="border:1px solid #9ca3af; padding:8px; color:red;">${formatNumber(dayData.exp)} د.ع</td>
                                <td style="border:1px solid #9ca3af; padding:8px; font-weight:bold; color:${dayNet >= 0 ? 'green' : 'red'};">${formatNumber(dayNet)} د.ع</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    window.print();
}

// =========================================================================
// 15. TAB: GENERAL CLINIC CONFIGS (إعدادات العيادة - مطابقة كاملة للصورة 3)
// =========================================================================
function initSettingsTab() {
    applyClinicSettingsVisuals();
    renderSettingsDoctorsList();
}

// Inline doctor photo management removed in favor of clean text input

function submitAddDoctorInline() {
    const name = document.getElementById('newDocName').value.trim();
    if (!name) {
        alert("يرجى كتابة اسم الطبيب!");
        return;
    }

    const nextId = "STF-" + Date.now();
    DB.staff.push({
        id: nextId,
        name: name,
        role: "DOCTOR",
        roleAr: "طبيب أسنان جراح",
        phone: "07855906001",
        salary: 3000000,
        hireDate: getTodayDateString(),
        photo: "assets/logo.jpg"
    });

    logActivity("MohaMMed.Y", "ADMIN", `تم تسجيل الطبيب الجديد بالعيادة: ${name}`, "success");
    saveDatabase();
    
    // Clear inputs
    document.getElementById('newDocName').value = "";

    renderSettingsDoctorsList();
}

function renderSettingsDoctorsList() {
    const container = document.getElementById('settingsDoctorsList');
    container.innerHTML = "";

    const docs = DB.staff.filter(s => s.role === 'DOCTOR');
    docs.forEach(d => {
        container.innerHTML += `
            <div class="doctor-item-line">
                <div class="name">
                    <img src="${d.photo || 'assets/logo.jpg'}" alt="Doc">
                    <span>${d.name}</span>
                </div>
                <button class="footer-icon-btn text-danger" onclick="deleteDoctorInline('${d.id}')" style="width:30px; height:30px;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });
}

function deleteDoctorInline(id) {
    const s = DB.staff.find(x => x.id === id);
    if (!s) return;
    if (confirm(`هل أنت متأكد من مسح ملف الطبيب (${s.name}) من كادر العيادة؟`)) {
        DB.staff = DB.staff.filter(x => x.id !== id);
        logActivity("MohaMMed.Y", "ADMIN", `إلغاء ملف الطبيب: ${s.name}`, "warning");
        saveDatabase();
        renderSettingsDoctorsList();
    }
}

function previewClinicLogoSelected() {
    const file = document.getElementById('clinicLogoUpload').files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        DB.settings.logo = e.target.result;
        document.getElementById('clinicLogoPreviewImg').src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function saveGeneralSettings() {
    const name = document.getElementById('setClinicName').value.trim();
    const nameEn = document.getElementById('setClinicNameEn').value.trim();
    const manager = document.getElementById('setClinicManager').value.trim();
    const hours = document.getElementById('setClinicHours').value.trim();
    const address = document.getElementById('setClinicAddress').value.trim();
    const phone = document.getElementById('setClinicPhone').value.trim();
    const currency = document.getElementById('setClinicCurrency').value.trim() || "د.ع";
    const tax = parseFloat(document.getElementById('setClinicTax').value) || 0;

    if (!name || !hours || !address) {
        alert("يرجى ملء كافة تفاصيل ومعلومات العيادة للطباعة!");
        return;
    }

    DB.settings.clinicName = name;
    DB.settings.clinicNameEn = nameEn;
    DB.settings.clinicManager = manager;
    DB.settings.workingHours = hours;
    DB.settings.address = address;
    DB.settings.clinicPhone = phone;
    DB.settings.currency = currency;
    DB.settings.taxPercent = tax;

    // Sync active and default database names with the new clinic name
    if (DB.currentUser) {
        const userSubkey = DB.currentUser.usernameKey.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const listKey = 'sobil_databases_list_' + userSubkey;
        const saved = localStorage.getItem(listKey);
        if (saved) {
            try {
                const list = JSON.parse(saved);
                const activeKey = getActiveDatabaseKey();
                const activeDb = list.find(d => d.key === activeKey);
                if (activeDb) {
                    activeDb.name = name;
                }
                const defaultKey = 'sobil_dental_db_user_' + userSubkey;
                const defaultDb = list.find(d => d.key === defaultKey);
                if (defaultDb) {
                    defaultDb.name = name;
                }
                localStorage.setItem(listKey, JSON.stringify(list));
                renderCustomDatabasesTable();
            } catch(e) {
                console.error(e);
            }
        }
    }

    logActivity("MohaMMed.Y", "ADMIN", "تعديل وحفظ إعدادات العيادة العامة والتنسيق المالي", "success");
    saveDatabase();
    
    // Refresh visual bindings immediately
    applyClinicSettingsVisuals();
    alert("تم حفظ إعدادات العيادة العامة وتحديث قوالب الطباعة بنجاح!");
}

// =========================================================================
// 16. TAB: SUBSCRIBER CLINICS (خاص بالمالك)
// =========================================================================
let tempClinicPhotoBase64 = "";

function readClinicPhotoFile(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            tempClinicPhotoBase64 = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function handleClinicPlanChange() {
    const plan = document.getElementById('newClinicPlan').value;
    const now = new Date();
    
    // Set Start Date to today
    const startStr = getTodayDateString();
    document.getElementById('newClinicStartDate').value = startStr;
    
    // Set start time to current time and end time to 23:59
    const currentHours = now.getHours().toString().padStart(2, '0');
    const currentMinutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('newClinicStartTime').value = `${currentHours}:${currentMinutes}`;
    document.getElementById('newClinicEndTime').value = "23:59";
    
    if (plan === 'monthly') {
        const end = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.getElementById('newClinicEndDate').value = formatDateToISO(end);
        document.getElementById('newClinicPrice').value = 150000;
    } else if (plan === 'yearly') {
        const end = new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000));
        document.getElementById('newClinicEndDate').value = formatDateToISO(end);
        document.getElementById('newClinicPrice').value = 1500000;
    } else {
        document.getElementById('newClinicEndDate').value = startStr;
        document.getElementById('newClinicPrice').value = "";
    }
}

function formatDateToISO(date) {
    return date.getFullYear() + "-" + 
           ((date.getMonth() + 1).toString().padStart(2, '0')) + "-" + 
           (date.getDate().toString().padStart(2, '0'));
}

function renderSubscriberClinics() {
    const query = document.getElementById('clinicSearchInput').value.toLowerCase().trim();
    const container = document.getElementById('clinicsGridContainer');
    container.innerHTML = "";

    const filtered = DB.clinics.filter(c => 
        c.name.toLowerCase().includes(query) || 
        c.owner.toLowerCase().includes(query)
    );

    filtered.forEach(cl => {
        const dateEnd = new Date(cl.endDate + "T" + (cl.endTime || "23:59"));
        const dateNow = new Date();
        const diff = dateEnd.getTime() - dateNow.getTime();
        const daysLeft = Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
        const isExpired = dateEnd.getTime() < dateNow.getTime();
        
        const photoSrc = cl.photo || 'assets/logo.jpg';
        const priceText = cl.price ? formatNumber(cl.price) + " د.ع" : "مجاني";

        const activeFeatures = [];
        if (cl.featDashboard !== false) activeFeatures.push("الإحصائيات");
        if (cl.featPatients !== false) activeFeatures.push("المرضى");
        if (cl.featMedicalFile !== false) activeFeatures.push("الملف الطبي");
        if (cl.featAppointments !== false) activeFeatures.push("المواعيد");
        if (cl.featDentalChart !== false) activeFeatures.push("مخطط الأسنان");
        if (cl.featBilling !== false) activeFeatures.push("الحسابات");
        if (cl.featAudit !== false) activeFeatures.push("الجرد");
        if (cl.featInventory !== false) activeFeatures.push("المخزن");
        if (cl.featStaff !== false) activeFeatures.push("الموظفين");
        if (cl.featSettings !== false) activeFeatures.push("الإعدادات");
        if (cl.featClinics === true) activeFeatures.push("عيادات المشتركين");
        if (cl.featDb === true) activeFeatures.push("مدير قواعد البيانات");
        if (cl.featPlatformAccounts === true) activeFeatures.push("حسابات المنصة");
        if (cl.featSupport !== false) activeFeatures.push("الدعم الفني");
        if (cl.featProfile !== false) activeFeatures.push("الملف الشخصي");
        if (cl.featSystemInfo !== false) activeFeatures.push("معلومات النظام");
        
        const featuresHtml = activeFeatures.map(f => `<span style="background: rgba(16, 185, 129, 0.15); color: #10b981; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; margin-top:2px;">${f}</span>`).join(" ");

        container.innerHTML += `
            <div class="clinic-box glass-card" style="display: flex; flex-direction: column; gap: 15px; padding: 20px; border-radius: 12px; border: 1px solid var(--border-color); background: rgba(30, 41, 59, 0.4);">
                <div class="clinic-box-header" style="display: flex; gap: 15px; align-items: center;">
                    <img src="${photoSrc}" alt="Owner Photo" style="width: 55px; height: 55px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color);">
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 4px 0; font-size: 15px; font-weight: 800; color: #fff;">${cl.name}</h4>
                        <span style="font-size: 11px; color: var(--text-muted);">المعرف: ${cl.id}</span>
                    </div>
                </div>
                <div class="clinic-meta-rows" style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
                    <div style="display:flex; justify-content:space-between;"><span>المدير المسؤول:</span><strong style="color:#cbd5e1;">${cl.owner}</strong></div>
                    <div style="display:flex; justify-content:space-between;"><span>خطة الاشتراك:</span><strong style="color:#cbd5e1;">${cl.plan === 'yearly' ? 'سنوي' : cl.plan === 'monthly' ? 'شهري' : 'مخصص'}</strong></div>
                    <div style="display:flex; justify-content:space-between;"><span>قيمة الاشتراك:</span><strong style="color:var(--accent-emerald); font-weight:700;">${priceText}</strong></div>
                    <div style="display:flex; justify-content:space-between;"><span>حساب المدير/المشرف:</span><strong style="color:#a7f3d0; direction:ltr;">${cl.username} / ${cl.password}</strong></div>
                    <div style="display:flex; justify-content:space-between;"><span>نوع الحساب للمشترك:</span><strong style="color:#fbcfe8;">${cl.role === 'OWNER' ? 'مدير عيادة' : (cl.role === 'ADMIN' ? 'مشرف عيادة' : 'موظف عادي')}</strong></div>
                    <div style="display:flex; justify-content:space-between;"><span>تاريخ الاشتراك:</span><strong style="color:#cbd5e1; direction:ltr;">${cl.startDate} dots ${cl.endDate} dots</strong></div>
                    <div style="display:flex; justify-content:space-between;"><span>تاريخ الاشتراك:</span><strong style="color:#cbd5e1; direction:ltr;">${cl.startDate} ${cl.startTime || '12:00'} إلى ${cl.endDate} ${cl.endTime || '23:59'}</strong></div>
                    <div style="display:flex; justify-content:space-between;"><span>الأيام المتبقية:</span><strong class="${isExpired ? 'text-danger' : 'text-emerald'}">${isExpired ? 'منتهي' : daysLeft + " يوم"}</strong></div>
                    <div style="display:flex; justify-content:space-between;"><span>حالة الاشتراك:</span><span class="status-indicator ${cl.status === 'active' && !isExpired ? 'success' : 'danger'}">${cl.status === 'active' && !isExpired ? 'مفعل' : 'معطل'}</span></div>
                    <div style="display:flex; flex-direction:column; gap:4px; margin-top:4px; border-top:1px dashed rgba(255,255,255,0.05); padding-top:6px;">
                        <span style="color:var(--text-muted); font-size:11px;">ميزات وصلاحيات الاشتراك المفعلة:</span>
                        <div style="display:flex; flex-wrap:wrap; gap:4px;">
                            ${featuresHtml}
                        </div>
                    </div>
                </div>
                <hr style="border:0; border-top: 1px solid rgba(255,255,255,0.05); margin: 5px 0;">
                <div class="clinic-actions" style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between;">
                    <button class="btn btn-secondary btn-sm" style="flex:1; min-width: 80px; font-size:11px; padding: 6px;" onclick="toggleClinicStatus('${cl.id}')">
                        <i class="fa-solid fa-power-off"></i> ${cl.status === 'active' ? 'تعطيل' : 'تفعيل'}
                    </button>
                    <button class="btn btn-secondary btn-sm" style="flex:1; min-width: 80px; font-size:11px; padding: 6px;" onclick="showEditClinicModal('${cl.id}')">
                        <i class="fa-solid fa-pencil"></i> تعديل
                    </button>
                    <button class="btn btn-primary btn-sm" style="flex:2; min-width: 120px; font-size:11px; padding: 6px; background:#4f46e5; border-color:#4f46e5;" onclick="openClinicDatabase('${cl.id}')">
                        <i class="fa-solid fa-folder-open"></i> فتح قاعدة البيانات
                    </button>
                    <button class="btn btn-danger btn-sm" style="padding: 6px 10px;" onclick="deleteClinic('${cl.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
}
function showAddClinicModal() {
    document.getElementById('clinicModalTitle').innerText = "إضافة عيادة شريكة للمنصة";
    document.getElementById('editClinicId').value = "";
    
    document.getElementById('newClinicName').value = "";
    document.getElementById('newClinicOwner').value = "";
    document.getElementById('newClinicPrice').value = "";
    document.getElementById('newClinicStartDate').value = getTodayDateString();
    document.getElementById('newClinicStartTime').value = "12:00";
    document.getElementById('newClinicEndDate').value = "";
    document.getElementById('newClinicEndTime').value = "23:59";
    document.getElementById('newClinicUsername').value = "";
    document.getElementById('newClinicPassword').value = "";
    document.getElementById('newClinicAddress').value = "";
    document.getElementById('newClinicUserRole').value = "OWNER";
    
    const newClinicNameEn = document.getElementById('newClinicNameEn');
    const newClinicPhone = document.getElementById('newClinicPhone');
    if (newClinicNameEn) newClinicNameEn.value = "";
    if (newClinicPhone) newClinicPhone.value = "";
    
    // Reset permissions checkboxes to checked
    const features = [
        'featDashboard', 'featPatients', 'featMedicalFile', 'featAppointments', 'featDentalChart', 
        'featBilling', 'featAudit', 'featInventory', 'featStaff', 'featSettings',
        'featClinics', 'featDb', 'featPlatformAccounts', 'featSupport', 'featProfile', 'featSystemInfo'
    ];
    features.forEach(f => {
        const el = document.getElementById(f);
        if (el) {
            if (['featClinics', 'featDb', 'featPlatformAccounts'].includes(f)) {
                el.checked = false;
            } else {
                el.checked = true;
            }
        }
    });

    tempClinicPhotoBase64 = "";
    document.getElementById('newClinicPhoto').value = "";

    showModal('addClinicModal');
}

function showEditClinicModal(id) {
    const cl = DB.clinics.find(c => c.id === id);
    if (!cl) return;
    
    document.getElementById('clinicModalTitle').innerText = "تعديل بيانات العيادة والاشتراك";
    document.getElementById('editClinicId').value = cl.id;
    
    document.getElementById('newClinicName').value = cl.name;
    document.getElementById('newClinicOwner').value = cl.owner;
    document.getElementById('newClinicPlan').value = cl.plan;
    document.getElementById('newClinicPrice').value = cl.price || "";
    document.getElementById('newClinicStartDate').value = cl.startDate;
    document.getElementById('newClinicStartTime').value = cl.startTime || "12:00";
    document.getElementById('newClinicEndDate').value = cl.endDate;
    document.getElementById('newClinicEndTime').value = cl.endTime || "23:59";
    document.getElementById('newClinicUsername').value = cl.username || "";
    document.getElementById('newClinicPassword').value = cl.password || "";
    document.getElementById('newClinicAddress').value = cl.address || "";
    document.getElementById('newClinicUserRole').value = cl.role || "OWNER";
    
    const newClinicNameEn = document.getElementById('newClinicNameEn');
    const newClinicPhone = document.getElementById('newClinicPhone');
    if (newClinicNameEn) newClinicNameEn.value = cl.nameEn || "";
    if (newClinicPhone) newClinicPhone.value = cl.phone || "";
    
    // Set permissions checkboxes
    const features = [
        'featDashboard', 'featPatients', 'featMedicalFile', 'featAppointments', 'featDentalChart', 
        'featBilling', 'featAudit', 'featInventory', 'featStaff', 'featSettings',
        'featClinics', 'featDb', 'featPlatformAccounts', 'featSupport', 'featProfile', 'featSystemInfo'
    ];
    features.forEach(f => {
        const el = document.getElementById(f);
        if (el) {
            if (cl[f] !== undefined) {
                el.checked = cl[f] === true;
            } else {
                if (['featClinics', 'featDb', 'featPlatformAccounts'].includes(f)) {
                    el.checked = false;
                } else {
                    el.checked = true;
                }
            }
        }
    });
    
    tempClinicPhotoBase64 = cl.photo || "";
    document.getElementById('newClinicPhoto').value = "";
    
    showModal('addClinicModal');
}

function submitAddClinic() {
    const id = document.getElementById('editClinicId').value;
    const name = document.getElementById('newClinicName').value.trim();
    const owner = document.getElementById('newClinicOwner').value.trim();
    const plan = document.getElementById('newClinicPlan').value;
    const price = parseFloat(document.getElementById('newClinicPrice').value) || 0;
    const startDate = document.getElementById('newClinicStartDate').value;
    const startTime = document.getElementById('newClinicStartTime').value || "12:00";
    const endDate = document.getElementById('newClinicEndDate').value;
    const endTime = document.getElementById('newClinicEndTime').value || "23:59";
    const username = document.getElementById('newClinicUsername').value.trim();
    const password = document.getElementById('newClinicPassword').value.trim();
    const address = document.getElementById('newClinicAddress').value.trim() || "غير محدد";
    const role = document.getElementById('newClinicUserRole').value || "OWNER";
    const nameEn = document.getElementById('newClinicNameEn') ? document.getElementById('newClinicNameEn').value.trim() : "";
    const phone = document.getElementById('newClinicPhone') ? document.getElementById('newClinicPhone').value.trim() : "";
    
    // Read checkboxes
    const featDashboard = document.getElementById('featDashboard').checked;
    const featPatients = document.getElementById('featPatients').checked;
    const featMedicalFile = document.getElementById('featMedicalFile').checked;
    const featAppointments = document.getElementById('featAppointments').checked;
    const featDentalChart = document.getElementById('featDentalChart').checked;
    const featBilling = document.getElementById('featBilling').checked;
    const featAudit = document.getElementById('featAudit').checked;
    const featInventory = document.getElementById('featInventory').checked;
    const featStaff = document.getElementById('featStaff').checked;
    const featSettings = document.getElementById('featSettings').checked;
    const featClinics = document.getElementById('featClinics').checked;
    const featDb = document.getElementById('featDb').checked;
    const featPlatformAccounts = document.getElementById('featPlatformAccounts').checked;
    const featSupport = document.getElementById('featSupport').checked;
    const featProfile = document.getElementById('featProfile').checked;
    const featSystemInfo = document.getElementById('featSystemInfo').checked;

    if (!name || !owner || !startDate || !endDate || !username || !password) {
        alert("يرجى ملء كافة الحقول المطلوبة لتسجيل العيادة والاشتراك!");
        return;
    }

    const photo = tempClinicPhotoBase64 || "";

    if (id) {
        const cl = DB.clinics.find(c => c.id === id);
        if (cl) {
            cl.name = name;
            cl.owner = owner;
            cl.plan = plan;
            cl.price = price;
            cl.startDate = startDate;
            cl.startTime = startTime;
            cl.endDate = endDate;
            cl.endTime = endTime;
            cl.username = username;
            cl.password = password;
            if (photo) cl.photo = photo;
            cl.address = address;
            cl.role = role;
            cl.nameEn = nameEn;
            cl.phone = phone;
            
            // Save features
            cl.featDashboard = featDashboard;
            cl.featPatients = featPatients;
            cl.featMedicalFile = featMedicalFile;
            cl.featAppointments = featAppointments;
            cl.featDentalChart = featDentalChart;
            cl.featBilling = featBilling;
            cl.featAudit = featAudit;
            cl.featInventory = featInventory;
            cl.featStaff = featStaff;
            cl.featSettings = featSettings;
            cl.featClinics = featClinics;
            cl.featDb = featDb;
            cl.featPlatformAccounts = featPlatformAccounts;
            cl.featSupport = featSupport;
            cl.featProfile = featProfile;
            cl.featSystemInfo = featSystemInfo;

            // Sync user login record
            const u = DB.users.find(user => user.clinicId === id && (user.role === "OWNER" || user.role === "ADMIN" || user.role === "STAFF"));
            if (u) {
                u.username = username;
                u.password = password;
                u.clinicName = name;
                u.ownerName = owner;
                u.role = role;
                u.restrictDashboard = !featDashboard;
                u.restrictPatients = !featPatients;
                u.restrictMedicalFile = !featMedicalFile;
                u.restrictAppointments = !featAppointments;
                u.restrictDentalChart = !featDentalChart;
                u.restrictBilling = !featBilling;
                u.restrictAudit = !featAudit;
                u.restrictInventory = !featInventory;
                u.restrictStaff = !featStaff;
                u.restrictSettings = !featSettings;
                u.restrictClinics = !featClinics;
                u.restrictDb = !featDb;
                u.restrictAccountsManagerTab = !featPlatformAccounts;
                u.restrictSupport = !featSupport;
                u.restrictProfile = !featProfile;
                u.restrictSystemInfo = !featSystemInfo;
            } else {
                DB.users.push({
                    username: username,
                    password: password,
                    clinicName: name,
                    ownerName: owner,
                    role: role,
                    clinicId: id,
                    restrictDashboard: !featDashboard,
                    restrictPatients: !featPatients,
                    restrictMedicalFile: !featMedicalFile,
                    restrictAppointments: !featAppointments,
                    restrictDentalChart: !featDentalChart,
                    restrictBilling: !featBilling,
                    restrictAudit: !featAudit,
                    restrictInventory: !featInventory,
                    restrictStaff: !featStaff,
                    restrictSettings: !featSettings,
                    restrictClinics: !featClinics,
                    restrictDb: !featDb,
                    restrictAccountsManagerTab: !featPlatformAccounts,
                    restrictSupport: !featSupport,
                    restrictProfile: !featProfile,
                    restrictSystemInfo: !featSystemInfo
                });
            }
            logActivity("MohaMMed.Y", "ADMIN", `تعديل ترخيص العيادة: ${name}`, "success");
        }
    } else {
        const nextId = "CLN-" + (DB.clinics.length + 101);
        DB.clinics.push({
            id: nextId,
            name: name,
            owner: owner,
            plan: plan,
            price: price,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            status: "active",
            username: username,
            password: password,
            photo: photo,
            address: address,
            role: role,
            nameEn: nameEn,
            phone: phone,
            featDashboard: featDashboard,
            featPatients: featPatients,
            featMedicalFile: featMedicalFile,
            featAppointments: featAppointments,
            featDentalChart: featDentalChart,
            featBilling: featBilling,
            featAudit: featAudit,
            featInventory: featInventory,
            featStaff: featStaff,
            featSettings: featSettings,
            featClinics: featClinics,
            featDb: featDb,
            featPlatformAccounts: featPlatformAccounts,
            featSupport: featSupport,
            featProfile: featProfile,
            featSystemInfo: featSystemInfo
        });

        // Register user login record
        DB.users.push({
            username: username,
            password: password,
            clinicName: name,
            ownerName: owner,
            role: role,
            clinicId: nextId,
            restrictDashboard: !featDashboard,
            restrictPatients: !featPatients,
            restrictMedicalFile: !featMedicalFile,
            restrictAppointments: !featAppointments,
            restrictDentalChart: !featDentalChart,
            restrictBilling: !featBilling,
            restrictAudit: !featAudit,
            restrictInventory: !featInventory,
            restrictStaff: !featStaff,
            restrictSettings: !featSettings,
            restrictClinics: !featClinics,
            restrictDb: !featDb,
            restrictAccountsManagerTab: !featPlatformAccounts,
            restrictSupport: !featSupport,
            restrictProfile: !featProfile,
            restrictSystemInfo: !featSystemInfo
        });

        logActivity("MohaMMed.Y", "ADMIN", `إضافة وتفعيل ترخيص عيادة جديدة: ${name}`, "success");
    }

    tempClinicPhotoBase64 = "";
    document.getElementById('newClinicPhoto').value = "";

    saveDatabase();
    closeModal('addClinicModal');
    renderSubscriberClinics();
}

function toggleClinicStatus(id) {
    const cl = DB.clinics.find(c => c.id === id);
    if (!cl) return;
    cl.status = cl.status === 'active' ? 'disabled' : 'active';
    logActivity("MohaMMed.Y", "ADMIN", `تغيير ترخيص العيادة ${cl.name} إلى ${cl.status}`, "warning");
    saveDatabase();
    renderSubscriberClinics();
}

function deleteClinic(id) {
    const cl = DB.clinics.find(c => c.id === id);
    if (!cl) return;
    if (confirm(`هل أنت متأكد من حذف العيادة (${cl.name}) نهائياً؟ سيؤدي ذلك لمسح كافة التراخيص والحسابات المرتبطة بها!`)) {
        DB.clinics = DB.clinics.filter(c => c.id !== id);
        // Also remove user login records associated with this clinic
        DB.users = DB.users.filter(u => u.clinicId !== id);
        logActivity("MohaMMed.Y", "ADMIN", `إلغاء وحذف اشتراك العيادة: ${cl.name}`, "danger");
        saveDatabase();
        renderSubscriberClinics();
    }
}

function openClinicDatabase(clinicId) {
    if (!DB.currentUser || DB.currentUser.usernameKey !== "MohaMMed.Y.A") {
        alert("خطأ: لا تمتلك صلاحيات مالك المنصة لفتح قواعد بيانات المشتركين!");
        return;
    }
    
    const clinic = (DB.clinics || []).find(c => c.id === clinicId);
    if (!clinic) {
        alert("خطأ: لم يتم العثور على العيادة المطلوبة!");
        return;
    }
    
    if (confirm(`هل أنت متأكد من فتح وقراءة قاعدة بيانات العيادة المشتركة (${clinic.name})؟`)) {
        DB.currentUser.activeViewingClinicId = clinicId;
        localStorage.setItem('sobil_dental_current_session', JSON.stringify(DB.currentUser));
        window.location.reload();
    }
}

function returnToPrimaryDatabase() {
    if (!DB.currentUser) return;
    DB.currentUser.activeViewingClinicId = null;
    localStorage.setItem('sobil_dental_current_session', JSON.stringify(DB.currentUser));
    window.location.reload();
}

function updatePlatformOwnerViewBanner() {
    const banner = document.getElementById('platformOwnerViewBanner');
    if (!banner) return;
    
    if (DB.currentUser && DB.currentUser.usernameKey === "MohaMMed.Y.A" && DB.currentUser.activeViewingClinicId) {
        const clinicId = DB.currentUser.activeViewingClinicId;
        const clinic = (DB.clinics || []).find(c => c.id === clinicId);
        const name = clinic ? clinic.name : clinicId;
        document.getElementById('activeViewClinicName').innerText = name;
        banner.classList.remove('hidden');
    } else {
        banner.classList.add('hidden');
    }
}

function checkAndApplySubscriptionLock() {
    const overlay = document.getElementById('subscriptionExpiredOverlay');
    if (!overlay) return false;
    
    if (!DB.currentUser) {
        overlay.classList.add('hidden');
        return false;
    }
    
    // Platform Owner bypasses subscription expiry
    if (DB.currentUser.usernameKey === "MohaMMed.Y.A") {
        overlay.classList.add('hidden');
        return false;
    }
    
    const clinicId = DB.currentUser.clinicId;
    if (!clinicId || clinicId === "PLATFORM") {
        overlay.classList.add('hidden');
        return false;
    }
    
    const clinic = (DB.clinics || []).find(c => c.id === clinicId);
    if (!clinic) {
        overlay.classList.add('hidden');
        return false;
    }
    
    const dateEnd = new Date(clinic.endDate + "T" + (clinic.endTime || "23:59"));
    const dateNow = new Date();
    const isExpired = dateEnd.getTime() < dateNow.getTime();
    const isInactive = clinic.status !== 'active';
    
    if (isExpired || isInactive) {
        document.getElementById('lockClinicCode').innerText = clinic.id;
        document.getElementById('lockClinicEndDate').innerText = clinic.endDate + " " + (clinic.endTime || "23:59") + (isExpired ? " (منتهي)" : "");
        document.getElementById('lockClinicOwner').innerText = clinic.owner;
        overlay.classList.remove('hidden');
        
        // Hide standard Sobil appContainer to prevent clicks or view bypass
        const container = document.getElementById('appContainer');
        if (container) container.classList.add('hidden');
        return true;
    } else {
        overlay.classList.add('hidden');
        const container = document.getElementById('appContainer');
        if (container) container.classList.remove('hidden');
        return false;
    }
}

function contactSupportForSubscription() {
    window.open("https://wa.me/9647855906001", "_blank");
}

// =========================================================================
// 17. DATABASE CONTROLS (إنشاء، اختيار، تصدير)
// =========================================================================
function createNewDatabaseSimulated() {
    if (confirm("تحذير: هل أنت متأكد من رغبتك في تصفير النظام بالكامل والبدء بقاعدة بيانات جديدة فارغة؟ \n(سيتم حفظ النسخة الحالية تلقائياً في المستندات المحلية)")) {
        simulateDatabaseBackupAction();
        resetToDefaultDatabase();
        alert("تم إنشاء قاعدة بيانات جديدة فارغة وتصفير كافة المؤشرات بنجاح!");
        location.reload();
    }
}

function triggerDatabaseImportSelect() {
    const input = document.getElementById('dbImportFileInput');
    if (input) input.click();
}

function handleDatabaseImport(input) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            
            if (!imported.settings || !imported.patients) {
                alert("خطأ: الملف المختار لا يمثل قاعدة بيانات صحيحة لمنصة سبل!");
                return;
            }
            
            const usersList = DB.users;
            const clinicsList = DB.clinics;
            const currentSession = DB.currentUser;
            
            DB = imported;
            DB.users = usersList;
            DB.clinics = clinicsList;
            DB.currentUser = currentSession;
            
            saveDatabase();
            alert("تم استيراد وتفعيل قاعدة البيانات بنجاح!");
            location.reload();
        } catch (err) {
            alert("فشل قراءة الملف: تأكد من أن الملف بصيغة JSON صحيحة.");
            console.error(err);
        }
    };
    reader.readAsText(file);
}

function exportDatabaseSimulated() {
    const content = JSON.stringify(DB, null, 4);
    const blob = new Blob([content], { type: "application/json;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const clinicName = DB.settings.clinicName || "منصة سبل";
    link.download = `${clinicName}_${getTodayDateString()}.json`;
    link.click();
    
    logActivity(DB.currentUser ? DB.currentUser.usernameKey : "المالك", "OWNER", "تصدير قاعدة بيانات النظام بالكامل بصيغة JSON", "success");
    alert(`تمت العملية بنجاح! تم تحميل ملف النسخة الاحتياطية للعيادة (${clinicName}) بصيغة JSON.`);
}

function simulateDatabaseBackupAction() {
    const now = new Date();
    const dateStr = now.getFullYear() + "_" + 
                  ((now.getMonth() + 1).toString().padStart(2, '0')) + "_" + 
                  (now.getDate().toString().padStart(2, '0'));
    
    const filename = `sobil_backup_${dateStr}_auto.sql`;
    const timestamp = now.getFullYear() + "-" + 
                      ((now.getMonth() + 1).toString().padStart(2, '0')) + "-" + 
                      (now.getDate().toString().padStart(2, '0')) + " " + 
                      (now.getHours().toString().padStart(2, '0')) + ":" + 
                      (now.getMinutes().toString().padStart(2, '0')) + ":" + 
                      (now.getSeconds().toString().padStart(2, '0'));

    DB.backups.push({
        filename: filename,
        date: timestamp,
        size: "4.82 MB",
        type: "تلقائي قبل التصفير"
    });
    saveDatabase();
}

// =========================================================================
// 18. TECHNICAL SUPPORT & LIVE CHAT SIMULATION
// =========================================================================
function sendSupportChatMessage() {
    const input = document.getElementById('chatInputMessage');
    const msg = input.value.trim();
    if (!msg) return;

    const chatBody = document.getElementById('supportChatBody');
    chatBody.innerHTML += `<div class="chat-message user">${msg}</div>`;
    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        let reply = "أهلاً بك. تم استلام رسالتك بنجاح وسيقوم مهندس الدعم الفني بالرد عليك مباشرة عبر تليجرام أو واتساب.";
        if (msg.includes("مرحبا") || msg.includes("السلام")) {
            reply = "وعليكم السلام ورحمة الله وبركاته، أهلاً بك يا فندم في الدعم الفني لمنصة سُبل. كيف يمكننا مساعدتك اليوم؟";
        }
        chatBody.innerHTML += `<div class="chat-message system">${reply}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1500);
}

function createSupportTicketSubmit() {
    const subject = document.getElementById('ticketSubject').value.trim();
    const category = document.getElementById('ticketCategory').value;
    const prioritySelect = document.getElementById('ticketPriority');
    const priority = prioritySelect.options[prioritySelect.selectedIndex].text;
    const desc = document.getElementById('ticketDescription').value.trim();

    if (!subject || !desc) {
        alert("يرجى ملء الحقول الأساسية للتذكرة!");
        return;
    }

    const nextCode = "TCK-" + Math.floor(4000 + Math.random() * 2000);
    DB.tickets.push({
        code: nextCode,
        subject: subject,
        category: category,
        priority: priority,
        status: "pending"
    });

    saveDatabase();
    logActivity("MohaMMed.Y", "ADMIN", `تقديم تذكرة دعم فني جديدة برمز ${nextCode}`, "success");
    
    document.getElementById('ticketSubject').value = "";
    document.getElementById('ticketDescription').value = "";
    
    alert(`تم إرسال تذكرة الدعم بنجاح! كود التذكرة: ${nextCode}`);
    renderSupportCenterTable();
}

function renderSupportCenterTable() {
    const tbody = document.getElementById('ticketsTableBody');
    tbody.innerHTML = "";
    
    DB.tickets.forEach(tk => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${tk.code}</strong></td>
                <td>${tk.subject}</td>
                <td>${tk.category}</td>
                <td>${tk.priority}</td>
                <td><span class="status-indicator ${tk.status === 'resolved' ? 'success' : 'warning'}">${tk.status === 'resolved' ? 'محلولة' : 'قيد المراجعة'}</span></td>
            </tr>
        `;
    });
}

// =========================================================================
// 18.2 PATIENT SESSIONS LEDGER & TRANSACTION LOGS
// =========================================================================
function renderPatientSessionsTable(patientId) {
    const tbody = document.getElementById('patientSessionsTableBody');
    if (!tbody) return;
    tbody.innerHTML = "";

    const list = (DB.sessions || []).filter(s => s.patientId === patientId);

    if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center" style="color:var(--text-muted); font-size:12px; padding:20px 0;">لا توجد جلسات أو دفعات مسجلة للمريض حالياً.</td></tr>`;
        return;
    }

    list.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(s => {
        const isPayment = s.procedure.includes("دفعة نقدية واصل") || s.procedure.includes("قسط");
        const costText = isPayment ? "--" : formatNumber(s.totalCost) + " د.ع";
        const paidText = formatNumber(s.amountPaid) + " د.ع";
        const remainingText = isPayment ? "--" : formatNumber(s.amountRemaining) + " د.ع";
        
        tbody.innerHTML += `
            <tr>
                <td><strong>${s.date}</strong></td>
                <td>
                    <span class="status-indicator ${isPayment ? 'success' : 'blue'}" style="font-size:11.5px; font-weight:700;">
                        <i class="fa-solid ${isPayment ? 'fa-wallet' : 'fa-hand-holding-medical'}"></i> ${s.procedure}
                    </span>
                </td>
                <td>${costText}</td>
                <td class="text-emerald"><strong>${paidText}</strong></td>
                <td class="text-danger">${remainingText}</td>
                <td><span style="font-size:11.5px; color:var(--text-muted);">${s.doctorNotes || 'لا يوجد'}</span></td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteSession('${s.id}')" title="حذف القيد"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

function showAddPaymentModal(payFullRemaining = false) {
    const patId = document.getElementById('medicalPatientSelect').value;
    const pat = DB.patients.find(p => p.id === patId);
    if (!pat) return;

    const patSessions = (DB.sessions || []).filter(s => s.patientId === pat.id);
    const totalCost = patSessions.reduce((sum, s) => sum + (s.totalCost || 0), 0);
    const totalPaid = patSessions.reduce((sum, s) => sum + (s.amountPaid || 0), 0);
    const totalDebt = pat.amountRemaining;

    document.getElementById('payment-prev-total').innerText = formatNumber(totalCost) + " د.ع";
    document.getElementById('payment-prev-paid').innerText = formatNumber(totalPaid) + " د.ع";
    document.getElementById('payment-prev-debt').innerText = formatNumber(totalDebt) + " د.ع";

    document.getElementById('paymentDate').value = getTodayDateString();
    
    if (payFullRemaining) {
        document.getElementById('paymentAmount').value = totalDebt;
        document.getElementById('paymentNotes').value = "تسديد كامل المبلغ المتبقي";
    } else {
        document.getElementById('paymentAmount').value = 50000;
        document.getElementById('paymentNotes').value = "دفعة نقدية واصل";
    }
    
    showModal('addPaymentModal');
}

function submitAddPayment() {
    const patId = document.getElementById('medicalPatientSelect').value;
    const pat = DB.patients.find(p => p.id === patId);
    if (!pat) return;

    const date = document.getElementById('paymentDate').value;
    const amount = parseFloat(document.getElementById('paymentAmount').value) || 0;
    const notes = document.getElementById('paymentNotes').value.trim() || "دفعة نقدية واصل";

    if (amount <= 0) {
        alert("يرجى إدخال قيمة الدفعة بشكل صحيح!");
        return;
    }

    const nextId = "SES-" + Date.now();
    if (!DB.sessions) DB.sessions = [];

    DB.sessions.push({
        id: nextId,
        patientId: patId,
        date: date,
        procedure: notes,
        totalCost: 0,
        amountPaid: amount,
        amountRemaining: 0,
        doctorNotes: "تم استلام القسط النقدي"
    });

    // Auto-generate invoice for billing/jard
    if (!DB.invoices) DB.invoices = [];
    DB.invoices.push({
        id: "INV-" + nextId,
        patientId: patId,
        patientName: pat.name,
        subtotal: 0,
        discount: 0,
        tax: 0,
        grandTotal: 0,
        amountPaid: amount,
        debt: -amount,
        status: "paid",
        date: date
    });

    // Update patient total debt
    pat.amountRemaining = Math.max(0, pat.amountRemaining - amount);
    
    // Also save in activity logs
    logActivity("MohaMMed.Y", "ADMIN", `تسجيل دفعة نقدية واصل بقيمة ${formatNumber(amount)} د.ع للمريض: ${pat.name}`, "success");
    saveDatabase();
    closeModal('addPaymentModal');

    // Reload
    loadMedicalProfileData();
    renderPatientsTable();
    renderDashboardStats();
    renderBillingLedger();
}

function showAddTreatmentSessionModal() {
    const patId = document.getElementById('medicalPatientSelect').value;
    const pat = DB.patients.find(p => p.id === patId);
    if (!pat) return;

    const patSessions = (DB.sessions || []).filter(s => s.patientId === pat.id);
    const totalCost = patSessions.reduce((sum, s) => sum + (s.totalCost || 0), 0);
    const totalPaid = patSessions.reduce((sum, s) => sum + (s.amountPaid || 0), 0);
    const totalDebt = pat.amountRemaining;

    document.getElementById('session-prev-total').innerText = formatNumber(totalCost) + " د.ع";
    document.getElementById('session-prev-paid').innerText = formatNumber(totalPaid) + " د.ع";
    document.getElementById('session-prev-debt').innerText = formatNumber(totalDebt) + " د.ع";

    document.getElementById('sessionDate').value = getTodayDateString();
    document.getElementById('sessionProcedure').value = pat.treatmentType || "جلسة علاج أسنان";
    document.getElementById('sessionCost').value = pat.treatmentPrice || 150000;
    document.getElementById('sessionPaid').value = 0;
    document.getElementById('sessionNotes').value = "";
    
    // Reset next session inputs
    const hasNextChk = document.getElementById('sessionHasNext');
    if (hasNextChk) hasNextChk.checked = false;
    const nextGrid = document.getElementById('sessionNextDetailsGrid');
    if (nextGrid) nextGrid.style.display = 'none';
    const nextDate = document.getElementById('sessionNextDate');
    if (nextDate) nextDate.value = "";
    const nextTime = document.getElementById('sessionNextTime');
    if (nextTime) nextTime.value = "";

    showModal('addTreatmentSessionModal');
}

function submitAddTreatmentSession() {
    const patId = document.getElementById('medicalPatientSelect').value;
    const pat = DB.patients.find(p => p.id === patId);
    if (!pat) return;

    const date = document.getElementById('sessionDate').value;
    const procedure = document.getElementById('sessionProcedure').value.trim() || "جلسة علاج أسنان";
    const cost = parseFloat(document.getElementById('sessionCost').value) || 0;
    const paid = parseFloat(document.getElementById('sessionPaid').value) || 0;
    const notes = document.getElementById('sessionNotes').value.trim() || "جلسة معتادة";

    if (cost <= 0) {
        alert("يرجى إدخال تكلفة الجلسة العلاجية!");
        return;
    }

    const remaining = Math.max(0, cost - paid);
    const nextId = "SES-" + Date.now();
    if (!DB.sessions) DB.sessions = [];

    DB.sessions.push({
        id: nextId,
        patientId: patId,
        date: date,
        procedure: procedure,
        totalCost: cost,
        amountPaid: paid,
        amountRemaining: remaining,
        doctorNotes: notes
    });

    // Auto-generate invoice for billing/jard
    if (!DB.invoices) DB.invoices = [];
    DB.invoices.push({
        id: "INV-" + nextId,
        patientId: patId,
        patientName: pat.name,
        subtotal: cost,
        discount: 0,
        tax: 0,
        grandTotal: cost,
        amountPaid: paid,
        debt: remaining,
        status: remaining === 0 ? "paid" : "partial",
        date: date
    });

    // Update patient remaining debt
    pat.amountRemaining = parseFloat(pat.amountRemaining) + remaining;

    logActivity("MohaMMed.Y", "ADMIN", `تسجيل جلسة علاجية جديدة (${procedure}) للمريض ${pat.name} بتكلفة ${formatNumber(cost)} د.ع`, "success");

    // Check if next session is booked
    const hasNext = document.getElementById('sessionHasNext').checked;
    const nextDate = document.getElementById('sessionNextDate').value;
    const nextTime = document.getElementById('sessionNextTime').value.trim();

    if (hasNext && nextDate && nextTime) {
        if (!DB.appointments) DB.appointments = [];
        const newAptId = "APT-" + Date.now();
        
        DB.appointments.push({
            id: newAptId,
            patientId: patId,
            patientName: pat.name,
            phone: pat.phone || "",
            doctorName: pat.doctor || "غير محدد",
            date: nextDate,
            time: nextTime,
            treatmentType: procedure,
            notes: "جلسة علاج تكميلية ومتابعة"
        });

        // Add notification
        if (!DB.notifications) DB.notifications = [];
        DB.notifications.unshift({
            id: "NOTI-" + Date.now(),
            text: `إشعار حجز: تم تحديد موعد لجلسة ثانية للمراجع (${pat.name}) بتاريخ ${nextDate} الساعة ${nextTime}`,
            date: getTodayDateString(),
            isRead: false
        });

        // WhatsApp Reminder text
        const clinicName = DB.settings.clinicName || "عيادتنا";
        const reminderText = `نود تذكيرك بموعد جلسة العلاج القادمة (الجلسة الثانية) للمراجع ${pat.name} في ${clinicName} بتاريخ ${nextDate} الساعة ${nextTime}. نتمنى لك دوام الصحة والعافية.`;
        const encodedText = encodeURIComponent(reminderText);
        const phoneNo = pat.phone || "";
        
        if (phoneNo) {
            setTimeout(() => {
                window.open(`https://wa.me/${formatPhoneForWhatsApp(phoneNo)}?text=${encodedText}`, '_blank');
            }, 500);
        }
    }

    saveDatabase();
    closeModal('addTreatmentSessionModal');

    loadMedicalProfileData();
    renderPatientsTable();
    renderDashboardStats();
    renderBillingLedger();
}

function deleteSession(id) {
    if (!confirm("هل أنت متأكد من حذف هذا القيد من سجل الجلسات المالي والطبي؟")) return;

    const patId = document.getElementById('medicalPatientSelect').value;
    const pat = DB.patients.find(p => p.id === patId);
    
    const ses = (DB.sessions || []).find(s => s.id === id);
    if (!ses) return;

    const isPayment = ses.procedure.includes("دفعة نقدية واصل") || ses.procedure.includes("قسط");
    
    if (isPayment) {
        // Revert debt deduction
        if (pat) pat.amountRemaining = parseFloat(pat.amountRemaining) + ses.amountPaid;
    } else {
        // Revert session debt addition
        if (pat) pat.amountRemaining = Math.max(0, pat.amountRemaining - ses.amountRemaining);
    }

    DB.sessions = DB.sessions.filter(s => s.id !== id);

    // Auto-remove corresponding invoice from billing
    if (DB.invoices) {
        DB.invoices = DB.invoices.filter(i => i.id !== "INV-" + id);
    }

    logActivity("MohaMMed.Y", "ADMIN", `حذف قيد جلسة علاجية/قسط للمريض ${pat ? pat.name : '--'}`, "warning");
    saveDatabase();

    loadMedicalProfileData();
    renderPatientsTable();
    renderDashboardStats();
    renderBillingLedger();
}

function printComprehensiveLedger() {
    const patId = document.getElementById('medicalPatientSelect').value;
    const pat = DB.patients.find(p => p.id === patId);
    if (!pat) return;

    const list = (DB.sessions || []).filter(s => s.patientId === patId);

    let totalCharged = 0;
    let totalReceived = 0;

    const printContainer = document.getElementById('printWrapper');
    printContainer.innerHTML = `
        <div class="print-medical-profile" style="background:#fff !important; color:#111 !important; padding:30px; font-family:'Cairo';">
            <div class="preview-header" style="display:flex; justify-content:space-between; border-bottom:3px solid #111; padding-bottom:15px; margin-bottom:20px;">
                <img src="${DB.settings.logo || 'assets/logo.jpg'}" alt="Logo" class="invoice-logo" style="width:70px; height:70px; border-radius:50%;">
                <div class="clinic-info" style="text-align:right;">
                    <h3 style="font-size:16px; font-weight:800; color:#111 !important;">${DB.settings.clinicName}</h3>
                    <span style="display:block; font-size:11px; color:#4b5563;">أوقات الدوام: ${DB.settings.workingHours}</span>
                    <span style="display:block; font-size:11px; color:#4b5563;">العنوان: ${DB.settings.address}</span>
                    <span style="display:block; font-size:11px; color:#4b5563;">هاتف الدعم الموحد: 07855906001</span>
                </div>
            </div>
            
            <h2 style="margin-top:20px; text-align:center; font-size:18px; font-weight:900; color:#111 !important;">كشف حساب وجلسات المراجع الشامل</h2>
            <div class="print-medical-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin:20px 0; background:#f9fafb; padding:12px; border:1px solid #e5e7eb; border-radius:6px; font-size:12px;">
                <div>اسم المراجع الكريم: <strong>${pat.name}</strong></div>
                <div>رقم الملف الموحد: <strong>${pat.fileNumber}</strong></div>
                <div>تاريخ طباعة التقرير: <strong>${getTodayDateString()}</strong></div>
                <div>المديونية المتبقية حالياً: <strong style="color:red;">${formatNumber(pat.amountRemaining)} د.ع</strong></div>
            </div>
            
            <table class="print-table" style="width:100%; border-collapse:collapse; margin-top:20px;">
                <thead>
                    <tr style="background:#f3f4f6;">
                        <th style="border:1px solid #9ca3af; padding:10px; font-size:12px; text-align:right;">التاريخ</th>
                        <th style="border:1px solid #9ca3af; padding:10px; font-size:12px; text-align:right;">الإجراء الطبي / المستند المالي</th>
                        <th style="border:1px solid #9ca3af; padding:10px; font-size:12px; text-align:left;">التكلفة الكلية</th>
                        <th style="border:1px solid #9ca3af; padding:10px; font-size:12px; text-align:left;">الواصل نقداً</th>
                        <th style="border:1px solid #9ca3af; padding:10px; font-size:12px; text-align:left;">المتبقي عليه</th>
                        <th style="border:1px solid #9ca3af; padding:10px; font-size:12px; text-align:right;">ملاحظات الطبيب</th>
                    </tr>
                </thead>
                <tbody>
                    ${list.map(s => {
                        const isPayment = s.procedure.includes("دفعة نقدية واصل") || s.procedure.includes("قسط");
                        totalCharged += s.totalCost;
                        totalReceived += s.amountPaid;
                        return `
                            <tr>
                                <td style="border:1px solid #9ca3af; padding:10px; font-size:11.5px;">${s.date}</td>
                                <td style="border:1px solid #9ca3af; padding:10px; font-size:11.5px; font-weight:700;">${s.procedure}</td>
                                <td style="border:1px solid #9ca3af; padding:10px; font-size:11.5px; text-align:left;">${isPayment ? '--' : formatNumber(s.totalCost) + ' د.ع'}</td>
                                <td style="border:1px solid #9ca3af; padding:10px; font-size:11.5px; text-align:left; color:#059669; font-weight:bold;">${formatNumber(s.amountPaid)} د.ع</td>
                                <td style="border:1px solid #9ca3af; padding:10px; font-size:11.5px; text-align:left; color:red;">${isPayment ? '--' : formatNumber(s.amountRemaining) + ' د.ع'}</td>
                                <td style="border:1px solid #9ca3af; padding:10px; font-size:11.5px;">${s.doctorNotes || '--'}</td>
                            </tr>
                        `;
                    }).join('') || '<tr><td colspan="6" style="text-align:center; padding:15px;">لا توجد قيود مسجلة لهذا المراجع</td></tr>'}
                </tbody>
            </table>
            
            <div class="preview-totals" style="display:flex; flex-direction:column; align-items:flex-end; gap:5px; margin-top:20px; font-size:12.5px;">
                <div class="total-row" style="display:flex; justify-content:space-between; width:300px;"><span>إجمالي التكلفة المفروضة:</span><strong>${formatNumber(totalCharged)} د.ع</strong></div>
                <div class="total-row" style="display:flex; justify-content:space-between; width:300px;"><span>إجمالي الواصل نقداً:</span><strong style="color:#059669;">${formatNumber(totalReceived)} د.ع</strong></div>
                <div style="border-top:1px solid #d1d5db; width:300px; margin:5px 0;"></div>
                <div class="total-row" style="display:flex; justify-content:space-between; width:300px; font-size:14px; font-weight:800;"><span>صافي المطلوب ذمة المراجع:</span><strong style="color:red;">${formatNumber(pat.amountRemaining)} د.ع</strong></div>
            </div>
            
            <div class="preview-signature-area" style="display:flex; justify-content:space-between; margin-top:40px; width:100%;">
                <div class="sig-block" style="text-align:center;">
                    <p style="font-size:11px; font-weight:bold;">الختم الرسمي للعيادة</p>
                    <div class="stamp-box-dashed" style="width:80px; height:80px; border:2px dashed #9ca3af; border-radius:6px; margin:10px auto;"></div>
                </div>
                <div class="sig-block" style="text-align:center;">
                    <p style="font-size:11px; font-weight:bold;">توقيع الحسابات والمشرف</p>
                    <div class="sig-line" style="margin-top:50px; font-weight:800;">________________</div>
                </div>
            </div>
        </div>
    `;
    window.print();
}

function renderDatabaseManagerBackups() {
    const tbody = document.getElementById('databaseBackupsTableBody');
    if (!tbody) return;
    tbody.innerHTML = "";

    DB.backups.forEach(bk => {
        tbody.innerHTML += `
            <tr>
                <td><i class="fa-solid fa-file-shield" style="color:var(--accent-blue); margin-left:8px;"></i><strong>${bk.filename}</strong></td>
                <td>${bk.date}</td>
                <td>${bk.size}</td>
                <td><span class="status-indicator success">${bk.type}</span></td>
            </tr>
        `;
    });
}

// =========================================================================
// 19. CANVAS BACKGROUND ANIMATION FOR LOGIN (جزيئات شاشة الدخول)
// =========================================================================
let loginCanvasInterval = null;
function startLoginCanvasAnimation() {
    const canvas = document.getElementById('loginCanvasBg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 40;
    
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.5 + 1,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            alpha: Math.random() * 0.4 + 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`; // blue tint
            ctx.fill();
        });
        loginCanvasInterval = requestAnimationFrame(animate);
    }
    
    animate();
}

function stopLoginCanvasAnimation() {
    if (loginCanvasInterval) {
        cancelAnimationFrame(loginCanvasInterval);
    }
}

// =========================================================================
// 19.2 "حذف الكل" SECTIONS DATA CLEARERS (تصفير الأقسام المتعددة)
// =========================================================================
function clearAllPatients() {
    if (confirm("هل أنت متأكد من مسح جميع المرضى المسجلين نهائياً؟ لا يمكن التراجع!")) {
        DB.patients = [];
        logActivity("MohaMMed.Y", "ADMIN", "تفريغ ومسح كافة ملفات المرضى المسجلين", "danger");
        saveDatabase();
        renderPatientsTable();
        renderDashboardStats();
        alert("تم مسح كافة سجلات المرضى بنجاح.");
    }
}

function clearAllAppointments() {
    if (confirm("هل أنت متأكد من إلغاء وحذف جميع المواعيد المحجوزة نهائياً؟")) {
        DB.appointments = [];
        logActivity("MohaMMed.Y", "ADMIN", "تفريغ وإلغاء كافة حجوزات المواعيد", "danger");
        saveDatabase();
        renderAppointmentsScheduler();
        renderDashboardStats();
        alert("تم تفريغ كافة الحجوزات بنجاح.");
    }
}

function clearAllSessions() {
    const patSelect = document.getElementById('medicalPatientSelect');
    if (!patSelect || patSelect.value === "") {
        alert("لا يوجد مريض محدد لمسح جلساته!");
        return;
    }
    const patId = patSelect.value;
    const pat = DB.patients.find(p => p.id === patId);
    if (!pat) return;

    if (confirm(`هل أنت متأكد من حذف كافة الجلسات والدفعات للمريض (${pat.name})؟`)) {
        DB.sessions = (DB.sessions || []).filter(s => s.patientId !== patId);
        pat.amountRemaining = 0;
        logActivity("MohaMMed.Y", "ADMIN", `مسح وتفريغ سجل جلسات المريض: ${pat.name}`, "danger");
        saveDatabase();
        loadMedicalProfileData();
        renderPatientsTable();
        renderDashboardStats();
        alert("تم مسح جميع الجلسات وتصفير مديونية المريض.");
    }
}

function clearAllExpenses() {
    if (confirm("هل أنت متأكد من مسح وتفريغ سجل المصروفات والمدفوعات التشغيلية؟")) {
        DB.expenses = [];
        logActivity("MohaMMed.Y", "ADMIN", "تفريغ ومسح كافة سجلات المصروفات التشغيلية", "danger");
        saveDatabase();
        renderBillingLedger();
        renderDashboardStats();
        alert("تم مسح سجل المصروفات.");
    }
}

function clearAllInvoices() {
    if (confirm("هل أنت متأكد من إلغاء ومسح جميع فواتير وسندات المرضى المعتمدة؟")) {
        DB.invoices = [];
        logActivity("MohaMMed.Y", "ADMIN", "مسح جميع فواتير وسندات القبض المالية للمرضى", "danger");
        saveDatabase();
        renderBillingLedger();
        renderDashboardStats();
        alert("تم مسح جميع الفواتير الصادرة.");
    }
}

function clearAllInventory() {
    if (confirm("هل أنت متأكد من تفريغ مخزن المواد الطبية بالكامل؟")) {
        DB.inventory = [];
        logActivity("MohaMMed.Y", "ADMIN", "تفريغ ومسح كافة مخزون المواد الطبية المستودعية", "danger");
        saveDatabase();
        renderInventoryScreen();
        renderDashboardStats();
        alert("تم تفريغ المخزن بنجاح.");
    }
}

function clearAllEquipments() {
    if (confirm("هل أنت متأكد من مسح جميع سجلات صيانة الأجهزة الطبية؟")) {
        DB.equipments = [];
        logActivity("MohaMMed.Y", "ADMIN", "تفريغ ومسح سجلات صيانة الأجهزة الطبية بالكامل", "danger");
        saveDatabase();
        renderInventoryScreen();
        alert("تم تفريغ سجل الأجهزة.");
    }
}

function clearAllStaff() {
    if (confirm("هل أنت متأكد من مسح جميع الكادر والملفات الوظيفية؟ (سيتم الاحتفاظ بملف المالك لتفادي القفل)")) {
        DB.staff = DB.staff.filter(s => s.role === 'ADMIN');
        logActivity("MohaMMed.Y", "ADMIN", "تفريغ ومسح الكادر الوظيفي النشط باستثناء المالك", "danger");
        saveDatabase();
        renderStaffManagement();
        alert("تم حذف سجل الموظفين بنجاح.");
    }
}

function clearAllTickets() {
    if (confirm("هل أنت متأكد من مسح جميع تذاكر الدعم الفني الحالية؟")) {
        DB.tickets = [];
        logActivity("MohaMMed.Y", "ADMIN", "مسح وتفريغ سجل تذاكر الدعم الفني بالمنصة", "danger");
        saveDatabase();
        renderSupportCenterTable();
        alert("تم تفريغ سجل التذاكر.");
    }
}

function clearAllAtlasCards() {
    if (confirm("هل أنت متأكد من مسح جميع كروت الأطلس والدليل التعليمي؟")) {
        DB.atlasCards = [];
        logActivity("MohaMMed.Y", "ADMIN", "تفريغ ومسح كروت ودليل الأسنان التعليمي المعتمد", "danger");
        saveDatabase();
        renderAtlasGuideGrid();
        alert("تم تفريغ دليل الأطلس بنجاح.");
    }
}

// =========================================================================
// 19.2 PERSONAL PROFILE & USER MANAGEMENT (الملف الشخصي وإدارة الحسابات)
// =========================================================================
function renderProfileTab() {
    if (!DB.users) {
        DB.users = [
            { username: "MohaMMed.Y.A", password: "Alrawi2003M", clinicName: "منصة سبل", ownerName: "محمد يوسف اسعد", role: "OWNER" }
        ];
        saveDatabase();
    }

    const isPrimaryOwner = checkIsPrimaryOwner();
    const foundUser = DB.currentUser ? DB.users.find(u => u.username.toLowerCase() === DB.currentUser.usernameKey.toLowerCase()) : null;

    const ownerNameHeader = document.getElementById('profile-lbl-owner-name-header');
    const roleBadge = document.getElementById('profile-lbl-role-badge');
    const clinicBadge = document.getElementById('profile-lbl-clinic-badge');

    if (foundUser) {
        if (ownerNameHeader) ownerNameHeader.innerText = foundUser.ownerName;
        if (roleBadge) roleBadge.innerText = foundUser.role;
        if (clinicBadge) clinicBadge.innerText = foundUser.clinicName || 'بدون عيادة مخصصة';

        document.getElementById('profile-lbl-user').innerText = foundUser.username;
        document.getElementById('profile-lbl-role').innerText = foundUser.role;
        document.getElementById('profile-lbl-owner').innerText = foundUser.ownerName;
        document.getElementById('profile-lbl-clinic').innerText = foundUser.clinicName || '--';
        
        const licenseType = foundUser.licenseType || "مدى الحياة (أوفلاين للفرع الحالي)";
        const licenseDate = foundUser.licenseDate || "2026-07-21";
        
        const lblType = document.getElementById('profile-lbl-license-type');
        const lblDate = document.getElementById('profile-lbl-license-date');
        if (lblType) lblType.innerText = licenseType;
        if (lblDate) lblDate.innerText = licenseDate;
    } else {
        const fallbackName = DB.currentUser ? (DB.currentUser.usernameKey || DB.currentUser.username) : '--';
        const fallbackRole = DB.currentUser ? DB.currentUser.role : '--';
        const fallbackClinic = DB.currentUser ? (DB.currentUser.clinicName || '--') : '--';

        if (ownerNameHeader) ownerNameHeader.innerText = fallbackName;
        if (roleBadge) roleBadge.innerText = fallbackRole;
        if (clinicBadge) clinicBadge.innerText = fallbackClinic;

        document.getElementById('profile-lbl-user').innerText = fallbackName;
        document.getElementById('profile-lbl-role').innerText = fallbackRole;
        document.getElementById('profile-lbl-owner').innerText = fallbackName;
        document.getElementById('profile-lbl-clinic').innerText = fallbackClinic;
    }

    const password = foundUser ? foundUser.password : "------";
    const passEl = document.getElementById('profile-lbl-pass');
    if (passEl) {
        passEl.innerText = password;
        passEl.style.webkitTextSecurity = "disc";
        passEl.style.textSecurity = "disc";
    }
    const eyeIcon = document.getElementById('profilePassEyeIcon');
    if (eyeIcon) {
        eyeIcon.className = "fa-solid fa-eye";
    }
    
    // Show/hide edit button controls based on primary owner status
    const editControls = document.getElementById('profile-edit-controls');
    if (editControls) {
        editControls.style.display = isPrimaryOwner ? "flex" : "none";
    }

    disableProfileEditMode();
}

function submitCreateUserAccount() {
    const isPrimaryOwner = DB.currentUser && DB.currentUser.usernameKey === "MohaMMed.Y.A";
    const loggedUser = DB.currentUser ? DB.users.find(u => u.username.toLowerCase() === DB.currentUser.usernameKey.toLowerCase()) : null;
    
    if (!isPrimaryOwner && (!loggedUser || loggedUser.restrictAccountsManagerTab || loggedUser.restrictCreateAccount)) {
        alert("عذراً، ليس لديك صلاحية لإنشاء حسابات جديدة!");
        return;
    }

    const user = document.getElementById('newAccUser').value.trim();
    const pass = document.getElementById('newAccPass').value.trim();
    
    const parentClinicId = DB.currentUser.clinicId || "PLATFORM";
    // If platform owner is creating, get clinic name from input. Otherwise use active clinic's name.
    const clinic = parentClinicId === "PLATFORM" ? document.getElementById('newAccClinic').value.trim() : DB.settings.clinicName;
    const owner = document.getElementById('newAccOwnerName').value.trim();
    const role = document.getElementById('newAccRole').value;
    
    if (!user || !pass || !clinic || !owner) {
        alert("يرجى ملء جميع حقول إنشاء الحساب!");
        return;
    }
    
    const exists = DB.users.some(u => u.username.toLowerCase() === user.toLowerCase());
    if (exists) {
        alert("اسم المستخدم هذا مسجل مسبقاً!");
        return;
    }
    
    const restrictDashboard = document.getElementById('restrictDashboard').checked;
    const restrictPatients = document.getElementById('restrictPatients').checked;
    const restrictMedicalFile = document.getElementById('restrictMedicalFile').checked;
    const restrictAppointments = document.getElementById('restrictAppointments').checked;
    const restrictDentalChart = document.getElementById('restrictDentalChart').checked;
    const restrictBilling = document.getElementById('restrictBilling').checked;
    const restrictAudit = document.getElementById('restrictAudit').checked;
    const restrictInventory = document.getElementById('restrictInventory').checked;
    const restrictStaff = document.getElementById('restrictStaff').checked;
    const restrictSettings = document.getElementById('restrictSettings').checked;
    const restrictClinics = document.getElementById('restrictClinics').checked;
    const restrictDb = document.getElementById('restrictDb').checked;
    const restrictAccountsManagerTab = document.getElementById('restrictAccountsManagerTab').checked;
    const restrictCreateAccount = document.getElementById('restrictCreateAccount').checked;

    DB.users.push({
        username: user,
        password: pass,
        clinicName: clinic,
        ownerName: owner,
        role: role,
        clinicId: parentClinicId,
        restrictDashboard: restrictDashboard,
        restrictPatients: restrictPatients,
        restrictMedicalFile: restrictMedicalFile,
        restrictAppointments: restrictAppointments,
        restrictDentalChart: restrictDentalChart,
        restrictBilling: restrictBilling,
        restrictAudit: restrictAudit,
        restrictInventory: restrictInventory,
        restrictStaff: restrictStaff,
        restrictSettings: restrictSettings,
        restrictClinics: restrictClinics,
        restrictDb: restrictDb,
        restrictAccountsManagerTab: restrictAccountsManagerTab,
        restrictCreateAccount: restrictCreateAccount
    });
    
    // Only initialize new database if this is a platform-level user
    if (parentClinicId === "PLATFORM") {
        const newUserSubkey = user.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const newDbKey = 'sobil_dental_db_user_' + newUserSubkey;
        
        if (!localStorage.getItem(newDbKey)) {
            const newDb = JSON.parse(JSON.stringify(defaultDatabase));
            newDb.settings.clinicName = clinic;
            newDb.patients = [];
            newDb.appointments = [];
            newDb.invoices = [];
            newDb.expenses = [];
            newDb.inventory = [];
            newDb.equipments = [];
            newDb.sessions = [];
            newDb.staff = [
                { id: "STF-" + Math.floor(100 + Math.random() * 900), name: owner, role: role, roleAr: role === 'OWNER' ? 'مشرف مالك' : (role === 'ADMIN' ? 'مشرف عيادة' : 'موظف عادي'), phone: "", salary: 0, hireDate: getTodayDateString(), photo: "" }
            ];
            newDb.logs = [
                { timestamp: "12:00:00", username: user, role: role, action: "تم تهيئة قاعدة بيانات الحساب والعيادة الجديدة بنجاح", status: "success" }
            ];
            delete newDb.users;
            delete newDb.currentUser;
            
            localStorage.setItem(newDbKey, JSON.stringify(newDb));
        }
        
        const listKey = 'sobil_databases_list_' + newUserSubkey;
        if (!localStorage.getItem(listKey)) {
            const initialList = [
                { name: clinic, key: newDbKey }
            ];
            localStorage.setItem(listKey, JSON.stringify(initialList));
        }
    }

    logActivity(DB.currentUser ? DB.currentUser.usernameKey : "المالك", "OWNER", `إنشاء وتفعيل حساب مستخدم جديد: ${user} بصلاحية ${role}`, "success");
    saveDatabase();
    alert("تم إنشاء حساب الموظف بنجاح.");
    
    document.getElementById('newAccUser').value = "";
    document.getElementById('newAccPass').value = "";
    document.getElementById('newAccOwnerName').value = "";
    
    // Reset all checkboxes
    document.getElementById('restrictDashboard').checked = false;
    document.getElementById('restrictPatients').checked = false;
    document.getElementById('restrictMedicalFile').checked = false;
    document.getElementById('restrictAppointments').checked = false;
    document.getElementById('restrictDentalChart').checked = false;
    document.getElementById('restrictBilling').checked = false;
    document.getElementById('restrictAudit').checked = false;
    document.getElementById('restrictInventory').checked = false;
    document.getElementById('restrictStaff').checked = false;
    document.getElementById('restrictSettings').checked = false;
    document.getElementById('restrictClinics').checked = false;
    document.getElementById('restrictDb').checked = false;
    document.getElementById('restrictAccountsManagerTab').checked = false;
    document.getElementById('restrictCreateAccount').checked = false;

    renderActiveUsersTable();
}

function renderActiveUsersTable() {
    const tbody = document.getElementById('activeUsersTableBody');
    if (!tbody) return;
    tbody.innerHTML = "";
    
    const activeClinicId = DB.currentUser.activeViewingClinicId || DB.currentUser.clinicId;
    const filteredUsers = DB.users.filter(u => {
        // Platform owner viewing their own database
        if (DB.currentUser.usernameKey === "MohaMMed.Y.A" && !DB.currentUser.activeViewingClinicId) {
            return true;
        }
        return u.clinicId === activeClinicId;
    });

    filteredUsers.forEach(u => {
        const isOwnerAccount = u.username.toLowerCase() === "mohammed.y.a";
        
        let roleName = "موظف عادي";
        let indicatorClass = "warning";
        if (u.role === 'OWNER') {
            roleName = "مشرف مالك";
            indicatorClass = "success";
        } else if (u.role === 'ADMIN') {
            roleName = "مشرف عيادة";
            indicatorClass = "info";
        }
        
        const tabsMap = {
            restrictDashboard: "التحكم",
            restrictPatients: "المرضى",
            restrictMedicalFile: "الملف الطبي",
            restrictAppointments: "المواعيد",
            restrictDentalChart: "المخطط",
            restrictBilling: "الأقساط",
            restrictAudit: "الجرد المالي",
            restrictInventory: "المخزن",
            restrictStaff: "الصلاحيات",
            restrictSettings: "الإعدادات",
            restrictClinics: "المشتركين",
            restrictDb: "قواعد البيانات",
            restrictAccountsManagerTab: "إدارة الحسابات",
            restrictCreateAccount: "إنشاء الحسابات"
        };
        
        let restrictionLabel = "";
        const restricted = [];
        const allowed = [];
        
        for (const [prop, label] of Object.entries(tabsMap)) {
            if (u[prop] === true) {
                restricted.push(label);
            } else {
                allowed.push(label);
            }
        }
        
        if (isOwnerAccount) {
            restrictionLabel = `<span style="font-size:10.5px; color:#10b981; font-weight:700; background:rgba(16,185,129,0.12); padding:2px 8px; border-radius:10px; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-crown"></i> مالك المنصة الأساسي (كامل الصلاحيات)</span>`;
        } else {
            let restrictedHtml = "";
            let allowedHtml = "";
            
            if (restricted.length > 0) {
                restrictedHtml = `<div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:5px; align-items:center;"><span style="font-size:9.5px; color:#ef4444; font-weight:700;">محظور: </span>` + restricted.map(r => `<span style="font-size:9px; background:rgba(239,68,68,0.12); color:#ef4444; padding:1px 5px; border-radius:4px; font-weight:700; border:1px solid rgba(239,68,68,0.25);">${r}</span>`).join('') + `</div>`;
            }
            if (allowed.length > 0) {
                allowedHtml = `<div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:2px; align-items:center;"><span style="font-size:9.5px; color:#10b981; font-weight:700;">مسموح: </span>` + allowed.map(a => `<span style="font-size:9px; background:rgba(16,185,129,0.15); color:#10b981; padding:1px 5px; border-radius:4px; font-weight:700; border:1px solid rgba(16,185,129,0.3);">${a}</span>`).join('') + `</div>`;
            }
            restrictionLabel = allowedHtml + restrictedHtml;
        }
        
        tbody.innerHTML += `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px 8px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div style="width:36px; height:36px; border-radius:50%; background:${u.role === 'OWNER' ? 'var(--grad-red)' : (u.role === 'ADMIN' ? 'var(--grad-primary)' : 'rgba(255,255,255,0.05)')}; display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px;">
                            <i class="fa-solid ${u.role === 'OWNER' ? 'fa-crown' : (u.role === 'ADMIN' ? 'fa-user-shield' : 'fa-user')}"></i>
                        </div>
                        <div style="display:flex; flex-direction:column;">
                            <strong style="font-size:13px; color:#f3f4f6;">${u.username}</strong>
                            <span style="font-size:10px; color:var(--text-muted);">${u.ownerName}</span>
                        </div>
                    </div>
                </td>
                <td style="padding: 12px 8px; font-size:12px; color:var(--text-muted);">${u.clinicName}</td>
                <td style="padding: 12px 8px;">
                    <span class="status-indicator ${indicatorClass}" style="font-size:10.5px; padding:2px 8px; border-radius:12px; font-weight:700;">${roleName}</span>
                </td>
                <td style="padding: 12px 8px; max-width:320px;">
                    ${restrictionLabel}
                </td>
                <td style="padding: 12px 8px; text-align:center;">
                    ${isOwnerAccount ? '<span style="font-size:11px; color:#10b981; font-weight:700;"><i class="fa-solid fa-lock"></i> محمي</span>' : `<button class="btn btn-danger btn-sm" onclick="deleteUserAccount('${u.username}')" style="padding: 4px 8px; font-size:10px; border-radius:6px;"><i class="fa-solid fa-trash"></i> حذف</button>`}
                </td>
            </tr>
        `;
    });
}

function deleteUserAccount(username) {
    if (!DB.currentUser) return;
    
    const targetUser = DB.users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!targetUser) return;
    
    if (username.toLowerCase() === "mohammed.y.a") {
        alert("لا يمكن حذف حساب مالك المنصة الأساسي!");
        return;
    }

    if (username.toLowerCase() === DB.currentUser.usernameKey.toLowerCase()) {
        alert("لا يمكنك حذف حسابك الشخصي أثناء تسجيل الدخول!");
        return;
    }
    
    const isPlatformOwner = DB.currentUser.usernameKey === "MohaMMed.Y.A";
    const isClinicOwner = DB.currentUser.role === "OWNER" && targetUser.clinicId === DB.currentUser.clinicId;
    
    if (!isPlatformOwner && !isClinicOwner) {
        alert("عذراً، لا تمتلك الصلاحية لحذف هذا الحساب!");
        return;
    }

    if (confirm(`هل أنت متأكد من حذف حساب المستخدم (${username})؟`)) {
        DB.users = DB.users.filter(u => u.username.toLowerCase() !== username.toLowerCase());
        logActivity(DB.currentUser ? DB.currentUser.usernameKey : "المالك", "OWNER", `حذف وإلغاء حساب مستخدم: ${username}`, "warning");
        saveDatabase();
        renderActiveUsersTable();
    }
}
function savePersonalProfileInfo() {
    const isPrimaryOwner = checkIsPrimaryOwner();
    if (!isPrimaryOwner) {
        alert("عذراً، فقط مالك المنصة الأساسي يمكنه تعديل الملف الشخصي!");
        return;
    }

    const fullName = document.getElementById('editProfileFullName').value.trim();
    const username = document.getElementById('editProfileUsername').value.trim();
    const password = document.getElementById('editProfilePassword').value.trim();

    if (!fullName || !username) {
        alert("يرجى ملء الاسم الكامل واسم المستخدم للملف الشخصي!");
        return;
    }

    const foundUser = DB.users.find(u => u.username.toLowerCase() === DB.currentUser.usernameKey.toLowerCase());
    if (!foundUser) {
        alert("حدث خطأ أثناء العثور على الحساب!");
        return;
    }

    if (foundUser.role !== 'OWNER') {
        alert("عذراً، التعديل على الملف الشخصي والبيانات مسموح به فقط لمالك المنصة!");
        return;
    }

    if (username.toLowerCase() !== foundUser.username.toLowerCase()) {
        const exists = DB.users.some(u => u.username.toLowerCase() === username.toLowerCase());
        if (exists) {
            alert("اسم المستخدم الجديد مسجل مسبقاً لحساب آخر!");
            return;
        }
    }

    const oldUsername = foundUser.username;
    const oldUserSubkey = oldUsername.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newUserSubkey = username.toLowerCase().replace(/[^a-z0-9]/g, '_');

    if (oldUserSubkey !== newUserSubkey) {
        const oldDbKey = 'sobil_dental_db_user_' + oldUserSubkey;
        const newDbKey = 'sobil_dental_db_user_' + newUserSubkey;
        const oldListKey = 'sobil_databases_list_' + oldUserSubkey;
        const newListKey = 'sobil_databases_list_' + newUserSubkey;

        const mainDbData = localStorage.getItem(oldDbKey);
        if (mainDbData) {
            localStorage.setItem(newDbKey, mainDbData);
            localStorage.removeItem(oldDbKey);
        }

        const oldActiveKeySetting = localStorage.getItem('sobil_active_db_key_' + oldUserSubkey);
        if (oldActiveKeySetting) {
            const newActiveKeySetting = oldActiveKeySetting.replace('sobil_dental_db_custom_' + oldUserSubkey + '_', 'sobil_dental_db_custom_' + newUserSubkey + '_');
            localStorage.setItem('sobil_active_db_key_' + newUserSubkey, newActiveKeySetting);
            localStorage.removeItem('sobil_active_db_key_' + oldUserSubkey);
        }

        const listData = localStorage.getItem(oldListKey);
        if (listData) {
            localStorage.setItem(newListKey, listData);
            localStorage.removeItem(oldListKey);
            
            try {
                const list = JSON.parse(listData);
                list.forEach(db => {
                    const oldCustomKey = db.key;
                    const newCustomKey = db.key.replace('sobil_dental_db_custom_' + oldUserSubkey + '_', 'sobil_dental_db_custom_' + newUserSubkey + '_');
                    
                    const customData = localStorage.getItem(oldCustomKey);
                    if (customData) {
                        localStorage.setItem(newCustomKey, customData);
                        localStorage.removeItem(oldCustomKey);
                    }
                    db.key = newCustomKey;
                });
                localStorage.setItem(newListKey, JSON.stringify(list));
            } catch(e) {
                console.error("Error migrating custom databases", e);
            }
        }
    }

    foundUser.ownerName = fullName;
    foundUser.username = username;
    
    if (password !== "") {
        foundUser.password = password;
    }

    // Save advanced owner details if role is OWNER
    if (foundUser.role === 'OWNER') {
        const editClinic = document.getElementById('editProfileClinicName');
        const editRole = document.getElementById('editProfileRole');
        const editLicType = document.getElementById('editProfileLicenseType');
        const editLicDate = document.getElementById('editProfileLicenseDate');
        
        if (editClinic) {
            const clinicVal = editClinic.value.trim();
            foundUser.clinicName = clinicVal;
            DB.settings.clinicName = clinicVal; // Also sync to general print settings
            
            // Sync active and default database names with the new clinic name
            const userSubkey = username.toLowerCase().replace(/[^a-z0-9]/g, '_');
            const listKey = 'sobil_databases_list_' + userSubkey;
            const saved = localStorage.getItem(listKey);
            if (saved) {
                try {
                    const list = JSON.parse(saved);
                    const activeKey = getActiveDatabaseKey();
                    const activeDb = list.find(d => d.key === activeKey);
                    if (activeDb) {
                        activeDb.name = clinicVal;
                    }
                    const defaultKey = 'sobil_dental_db_user_' + userSubkey;
                    const defaultDb = list.find(d => d.key === defaultKey);
                    if (defaultDb) {
                        defaultDb.name = clinicVal;
                    }
                    localStorage.setItem(listKey, JSON.stringify(list));
                    renderCustomDatabasesTable();
                } catch(e) {
                    console.error(e);
                }
            }
        }
        if (editRole) {
            foundUser.role = editRole.value;
        }
        if (editLicType) {
            foundUser.licenseType = editLicType.value.trim();
        }
        if (editLicDate) {
            foundUser.licenseDate = editLicDate.value;
        }
    }

    DB.currentUser.username = fullName;
    DB.currentUser.usernameKey = username;
    DB.currentUser.role = foundUser.role; // Keep current user role in sync
    DB.currentUser.clinicName = foundUser.clinicName; // Sync clinic name to current session state

    logActivity(username, foundUser.role, "تم تعديل البيانات الشخصية وتفاصيل الدخول للحساب بنجاح", "success");
    saveDatabase();
    
    // Refresh visual settings and sidebars
    applyClinicSettingsVisuals();

    // Refresh UI values
    document.getElementById('loggedUserName').innerText = DB.currentUser.username;
    
    alert("تم حفظ وتحديث بياناتك الشخصية بنجاح!");
    disableProfileEditMode();
    renderProfileTab();
}

function toggleProfilePasswordVisibility() {
    const passEl = document.getElementById('profile-lbl-pass');
    const eyeIcon = document.getElementById('profilePassEyeIcon');
    if (!passEl || !eyeIcon) return;
    if (passEl.style.textSecurity === "none" || passEl.style.webkitTextSecurity === "none") {
        passEl.style.webkitTextSecurity = "disc";
        passEl.style.textSecurity = "disc";
        eyeIcon.className = "fa-solid fa-eye";
    } else {
        passEl.style.webkitTextSecurity = "none";
        passEl.style.textSecurity = "none";
        eyeIcon.className = "fa-solid fa-eye-slash";
    }
}

function enableProfileEditMode() {
    const foundUser = DB.currentUser ? DB.users.find(u => u.username.toLowerCase() === DB.currentUser.usernameKey.toLowerCase()) : null;
    if (foundUser) {
        document.getElementById('editProfileUsername').value = foundUser.username;
        document.getElementById('editProfileFullName').value = foundUser.ownerName;
        document.getElementById('editProfileClinicName').value = foundUser.clinicName || "";
        document.getElementById('editProfilePassword').value = ""; // keep password blank to keep current
        document.getElementById('editProfileRole').value = foundUser.role || "OWNER";
        document.getElementById('editProfileLicenseType').value = foundUser.licenseType || "مدى الحياة (أوفلاين للفرع الحالي)";
        document.getElementById('editProfileLicenseDate').value = foundUser.licenseDate || "2026-07-21";
    }

    document.querySelectorAll('.profile-view-mode').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.profile-edit-mode').forEach(el => el.classList.remove('hidden'));

    const btnEdit = document.getElementById('btn-edit-profile');
    if (btnEdit) btnEdit.style.display = 'none';
    const btnSaveCancel = document.getElementById('profile-save-cancel-btns');
    if (btnSaveCancel) btnSaveCancel.style.display = 'flex';
}

function disableProfileEditMode() {
    document.querySelectorAll('.profile-view-mode').forEach(el => el.classList.remove('hidden'));
    document.querySelectorAll('.profile-edit-mode').forEach(el => el.classList.add('hidden'));

    const btnEdit = document.getElementById('btn-edit-profile');
    if (btnEdit) btnEdit.style.display = 'flex';
    const btnSaveCancel = document.getElementById('profile-save-cancel-btns');
    if (btnSaveCancel) btnSaveCancel.style.display = 'none';
}

// =========================================================================
// 19.25 LIVE ACTIVITY LOG CHAT (شات العمليات المباشر)
// =========================================================================
function renderSupportChatLogs() {
    const chatBody = document.getElementById('supportChatBody');
    if (!chatBody) return;
    chatBody.innerHTML = "";
    
    const logs = DB.logs || [];
    logs.forEach(log => {
        let iconClass = "fa-circle-info";
        let color = "var(--accent-blue)";
        if (log.status === "danger") {
            iconClass = "fa-triangle-exclamation";
            color = "var(--accent-red)";
        } else if (log.status === "warning") {
            iconClass = "fa-circle-exclamation";
            color = "var(--accent-orange)";
        } else if (log.status === "success") {
            iconClass = "fa-circle-check";
            color = "var(--accent-emerald)";
        }
        
        chatBody.innerHTML += `
            <div class="chat-message-item" style="display: flex; gap: 10px; margin-bottom: 12px; align-items: flex-start; direction: rtl; text-align: right;">
                <div class="chat-avatar" style="width: 32px; height: 32px; border-radius: 50%; background: ${color}; display: flex; align-items: center; justify-content: center; color: #fff;">
                    <i class="fa-solid ${iconClass}" style="font-size: 14px;"></i>
                </div>
                <div class="chat-bubble" style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); border-radius: 12px; padding: 8px 12px; flex: 1;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <span style="font-size: 11px; font-weight: bold; color: #fff;">${log.username} (${log.role})</span>
                        <span style="font-size: 9px; color: var(--text-muted);">${log.timestamp}</span>
                    </div>
                    <p style="font-size: 11.5px; color: #cbd5e1; line-height: 1.4; margin: 0;">${log.action}</p>
                </div>
            </div>
        `;
    });
    
    chatBody.scrollTop = chatBody.scrollHeight;
}

function sendSupportChatMessage() {
    const input = document.getElementById('chatInputMessage');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    
    logActivity(
        DB.currentUser ? DB.currentUser.usernameKey : "ضيف",
        DB.currentUser ? (DB.currentUser.isAdmin ? "OWNER" : "STAFF") : "مجهول",
        `رسالة تدوين: ${text}`,
        "success"
    );
    
    input.value = "";
    renderSupportChatLogs();
}

// =========================================================================
// 19.3 NOTIFICATION & REMINDER MANAGEMENT (إدارة الإشعارات وتذكير المواعيد)
// =========================================================================
function initNotificationsSystem() {
    if (!DB.notifications) {
        const isPrimary = DB.currentUser && DB.currentUser.usernameKey && DB.currentUser.usernameKey.toLowerCase() === "mohammed.y.a";
        if (isPrimary) {
            DB.notifications = [
                { id: 1, text: "تذكير: موعد المراجع محمد يوسف اسعد اليوم الساعة 04:00 مساءً", date: getTodayDateString(), read: false },
                { id: 2, text: "إشعار: تم حجز موعد جديد للمريض علي كريم غداً الساعة 05:00 مساءً", date: getTodayDateString(), read: false },
                { id: 3, text: "تنبيه: مادة Lidocaine 2% شارفت على الانتهاء بالمخزن!", date: getTodayDateString(), read: false }
            ];
        } else {
            DB.notifications = [];
        }
        saveDatabase();
    }

    const notiBtn = document.getElementById('notiBtn');
    const notiDropdown = document.getElementById('notiDropdown');
    if (notiBtn && notiDropdown) {
        notiBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notiDropdown.classList.toggle('hidden');
            renderNotificationsList();
        });
        
        document.addEventListener('click', (e) => {
            if (!notiDropdown.contains(e.target) && e.target !== notiBtn) {
                notiDropdown.classList.add('hidden');
            }
        });
    }

    checkAndGenerateAppointmentReminders();
    renderNotificationsList();
}

function checkAndGenerateAppointmentReminders() {
    const today = getTodayDateString();
    const todayApts = DB.appointments.filter(a => a.date === today);
    
    todayApts.forEach(apt => {
        const text = `تذكير موعد اليوم: ${apt.patientName} الساعة ${apt.time} م مع الطبيب ${apt.doctorName} لعمل ${apt.treatmentType}`;
        const exists = DB.notifications.some(n => n.text === text && n.date === today);
        if (!exists) {
            DB.notifications.unshift({
                id: "NOTI-" + Date.now() + Math.random(),
                text: text,
                date: today,
                read: false
            });
        }
    });
    saveDatabase();
}

function renderNotificationsList() {
    const listContainer = document.getElementById('notiList');
    const badge = document.getElementById('notiBadgeCount');
    if (!listContainer) return;

    listContainer.innerHTML = "";
    const list = DB.notifications || [];
    const unread = list.filter(n => !n.read).length;

    if (badge) {
        badge.innerText = unread;
        if (unread === 0) {
            badge.classList.add('hidden');
        } else {
            badge.classList.remove('hidden');
        }
    }

    if (list.length === 0) {
        listContainer.innerHTML = `<div style="text-align:center; padding:15px; color:var(--text-muted); font-size:11.5px;">لا توجد إشعارات حالياً.</div>`;
        return;
    }

    list.forEach(n => {
        listContainer.innerHTML += `
            <div class="noti-item ${n.read ? 'read' : 'unread'}" onclick="markNotiAsRead('${n.id}')" style="padding: 10px; border-bottom: 1px solid var(--border-color); cursor: pointer; display: flex; align-items: flex-start; gap: 10px; transition: background 0.2s;">
                <i class="fa-solid fa-circle-info noti-icon" style="color: var(--accent-blue); margin-top: 3px; font-size: 13px;"></i>
                <div class="noti-content" style="flex: 1; text-align: right;">
                    <p class="noti-text" style="font-size: 11.5px; color: #fff; line-height: 1.4; font-weight: ${n.read ? 'normal' : 'bold'};">${n.text}</p>
                    <span class="noti-date" style="font-size: 9px; color: var(--text-muted); display: block; margin-top: 4px;">${n.date}</span>
                </div>
            </div>
        `;
    });
}

function markNotiAsRead(id) {
    const noti = DB.notifications.find(n => n.id == id || n.id === id);
    if (noti) {
        noti.read = true;
        saveDatabase();
        renderNotificationsList();
    }
}

function clearAllNotifications() {
    DB.notifications = [];
    saveDatabase();
    renderNotificationsList();
}

// =========================================================================
// 20. APP STARTUP LOADERS
// =========================================================================
window.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    startLoginCanvasAnimation();
    
    // Initialize Cloud Sync settings and automatic polling
    if (typeof loadSyncSettings === 'function') {
        loadSyncSettings();
        const syncEnabled = localStorage.getItem('subul_sync_enabled') === 'true';
        if (syncEnabled) {
            triggerManualSyncDownload();
            // Poll for cloud updates every 30 seconds
            setInterval(() => {
                triggerManualSyncDownload();
            }, 30000);
        }
    }
});
