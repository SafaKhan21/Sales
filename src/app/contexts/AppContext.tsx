import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'app.title': 'Sales System',
    'app.subtitle': 'Enterprise Sales & Invoicing Platform',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.userManagement': 'User Management',
    'nav.settings': 'Settings',
    
    // Actions
    'action.save': 'Save Changes',
    'action.cancel': 'Cancel',
    'action.edit': 'Edit',
    'action.delete': 'Delete',
    'action.add': 'Add New User',
    'action.search': 'Search',
    'action.export': 'Export',
    'action.import': 'Import',
    'action.generate': 'Generate',
    
    // Dashboard
    'dashboard.title': 'Analytics Dashboard',
    'dashboard.totalSales': 'Total Sales',
    'dashboard.totalRevenue': 'Total Revenue',
    'dashboard.activeUsers': 'Active Users',
    'dashboard.pendingInvoices': 'Pending Invoices',
    'dashboard.salesTrend': 'Sales Trend (Last 6 Months)',
    'dashboard.revenueByCategory': 'Revenue by Category',
    'dashboard.topProducts': 'Top Products',
    'dashboard.recentActivity': 'Recent Activity',
    
    // Tabs
    'tabs.accountIdentity': 'Account & Identity',
    'tabs.roleAccess': 'Role & Access Level',
    'tabs.salesPricing': 'Sales & Pricing',
    'tabs.invoicesTaxCredit': 'Invoices, Tax & Credit',
    'tabs.companiesBranches': 'Companies, Branches & Warehouses',
    'tabs.advancedSettings': 'Advanced System Settings',
    
    // Account & Identity
    'account.title': 'Account & Identity',
    'account.operatorCode': 'Operator Code',
    'account.operatorCodeHelper': 'Auto-generated unique identifier',
    'account.username': 'Username',
    'account.usernameHelper': 'Used for system login',
    'account.password': 'Password',
    'account.confirmPassword': 'Confirm Password',
    'account.arabicName': 'Arabic Name',
    'account.englishName': 'English Name',
    'account.nameHelper': 'Full name as it appears in reports',
    
    // Role & Access Level
    'role.title': 'Role & Access Level',
    'role.jobRole': 'Job Role',
    'role.jobRoleHelper': 'Defines primary responsibilities',
    'role.accessLevel': 'Access Level',
    'role.accessLevelHelper': 'Controls system permissions',
    'role.salesRep': 'Sales Representative',
    'role.accountant': 'Accountant',
    'role.cashier': 'Cashier',
    'role.manager': 'Manager',
    'role.supervisor': 'Supervisor',
    'role.admin': 'Administrator',
    'role.user': 'User',
    'role.cashierSupervisor': 'Cashier Supervisor',
    'role.superAdmin': 'Super Admin',
    'role.defaultPermissions': 'Default Permissions',
    'role.permissionsHelper': 'Based on selected role (editable)',
    
    // Sales & Pricing
    'sales.title': 'Sales & Pricing',
    'sales.pricingLevels': 'Pricing Levels',
    'sales.priceLevel1': 'Price Level 1',
    'sales.priceLevel2': 'Price Level 2',
    'sales.priceLevel3': 'Price Level 3',
    'sales.purchasePrice': 'Purchase Price',
    'sales.transferPrice': 'Transfer Price',
    'sales.discountPermissions': 'Discount Permissions',
    'sales.maxDiscount': 'Maximum Allowed Discount (%)',
    'sales.discountHelper': 'Maximum discount this user can apply',
    
    // Invoices, Tax & Credit
    'invoice.title': 'Invoices, Tax & Credit',
    'invoice.taxSettings': 'Tax Settings',
    'invoice.vatPercentage': 'VAT Percentage',
    'invoice.vatHelper': 'Auto-filled from company settings',
    'invoice.taxHandling': 'Tax Handling Options',
    'invoice.applyTaxCustomer': 'Apply Tax to Customer',
    'invoice.applyTaxSupplier': 'Apply Tax to Supplier',
    'invoice.printingOptions': 'Invoice Printing Options',
    'invoice.enablePrinting': 'Enable Invoice Printing',
    'invoice.allowReprint': 'Allow Invoice Reprint',
    'invoice.viewSupplierPrices': 'View Supplier Prices',
    'invoice.preventSalesWithoutInvoice': 'Prevent Sales Without Invoice',
    'invoice.creditSettings': 'Credit Settings',
    'invoice.creditLimitOverride': 'Credit Limit Override',
    'invoice.creditPeriodOverride': 'Credit Period Override',
    'invoice.acceptShippingCost': 'Accept Shipping Cost',
    
    // Companies, Branches & Warehouses
    'branch.title': 'Companies, Branches & Warehouses',
    'branch.companySelection': 'Company Selection',
    'branch.selectCompanies': 'Select companies (multi-select with search)',
    'branch.accountingBranches': 'Accounting Branches',
    'branch.selectBranches': 'Select accounting branches',
    'branch.warehouseAccess': 'Warehouse Access',
    'branch.selectWarehouses': 'Select accessible warehouses',
    'branch.stockBalance': 'Show Stock Balance',
    'branch.stockBalanceHelper': 'Allow viewing inventory levels',
    
    // Advanced Settings
    'advanced.title': 'Advanced System Settings',
    'advanced.visibilityNote': 'Visible only to supervisors and administrators',
    'advanced.financialAccounts': 'Financial Accounts',
    'advanced.bankAccount': 'Bank Account',
    'advanced.cashAccount': 'Cash Account',
    'advanced.integrationPaths': 'Integration & Export Paths',
    'advanced.reportPath': 'Report Export Path',
    'advanced.excelPath': 'Excel Integration Path',
    'advanced.deviceSettings': 'Device & Printer Settings',
    'advanced.printerType': 'Printer Type',
    'advanced.emailSettings': 'Email Settings',
    'advanced.emailServer': 'Email Server',
    'advanced.emailHelper': 'SMTP configuration for notifications',
    
    // Printer Types
    'printer.laser': 'Laser Printer',
    'printer.inkjet': 'Inkjet Printer',
    'printer.thermal': 'Thermal Printer',
    'printer.dotMatrix': 'Dot Matrix Printer',
    
    // Months
    'month.jan': 'Jan',
    'month.feb': 'Feb',
    'month.mar': 'Mar',
    'month.apr': 'Apr',
    'month.may': 'May',
    'month.jun': 'Jun',
    'month.jul': 'Jul',
    'month.aug': 'Aug',
    'month.sep': 'Sep',
    'month.oct': 'Oct',
    'month.nov': 'Nov',
    'month.dec': 'Dec',
  },
  ar: {
    // Header
    'app.title': 'نظام المبيعات',
    'app.subtitle': 'منصة المبيعات والفواتير المؤسسية',
    
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.userManagement': 'إدارة المستخدمين',
    'nav.settings': 'الإعدادات',
    
    // Actions
    'action.save': 'حفظ التغييرات',
    'action.cancel': 'إلغاء',
    'action.edit': 'تعديل',
    'action.delete': 'حذف',
    'action.add': 'إضافة مستخدم جديد',
    'action.search': 'بحث',
    'action.export': 'تصدير',
    'action.import': 'استيراد',
    'action.generate': 'توليد',
    
    // Dashboard
    'dashboard.title': 'لوحة التحليلات',
    'dashboard.totalSales': 'إجمالي المبيعات',
    'dashboard.totalRevenue': 'إجمالي الإيرادات',
    'dashboard.activeUsers': 'المستخدمون النشطون',
    'dashboard.pendingInvoices': 'الفواتير المعلقة',
    'dashboard.salesTrend': 'اتجاه المبيعات (آخر 6 أشهر)',
    'dashboard.revenueByCategory': 'الإيرادات حسب الفئة',
    'dashboard.topProducts': 'المنتجات الأكثر مبيعاً',
    'dashboard.recentActivity': 'النشاط الأخير',
    
    // Tabs
    'tabs.accountIdentity': 'الحساب والهوية',
    'tabs.roleAccess': 'الدور ومستوى الوصول',
    'tabs.salesPricing': 'المبيعات والتسعير',
    'tabs.invoicesTaxCredit': 'الفواتير والضرائب والائتمان',
    'tabs.companiesBranches': 'الشركات والفروع والمستودعات',
    'tabs.advancedSettings': 'إعدادات النظام المتقدمة',
    
    // Account & Identity
    'account.title': 'الحساب والهوية',
    'account.operatorCode': 'كود المشغل',
    'account.operatorCodeHelper': 'معرف فريد يتم إنشاؤه تلقائياً',
    'account.username': 'اسم المستخدم',
    'account.usernameHelper': 'يستخدم لتسجيل الدخول للنظام',
    'account.password': 'كلمة المرور',
    'account.confirmPassword': 'تأكيد كلمة المرور',
    'account.arabicName': 'الاسم بالعربي',
    'account.englishName': 'الاسم بالإنجليزي',
    'account.nameHelper': 'الاسم الكامل كما يظهر في التقارير',
    
    // Role & Access Level
    'role.title': 'الدور ومستوى الوصول',
    'role.jobRole': 'الوظيفة',
    'role.jobRoleHelper': 'يحدد المسؤوليات الأساسية',
    'role.accessLevel': 'مستوى الوصول',
    'role.accessLevelHelper': 'يتحكم في صلاحيات النظام',
    'role.salesRep': 'مندوب مبيعات',
    'role.accountant': 'محاسب',
    'role.cashier': 'أمين صندوق',
    'role.manager': 'مدير',
    'role.supervisor': 'مشرف',
    'role.admin': 'مسؤول النظام',
    'role.user': 'مستخدم',
    'role.cashierSupervisor': 'مشرف الصندوق',
    'role.superAdmin': 'مسؤول رئيسي',
    'role.defaultPermissions': 'الصلاحيات الافتراضية',
    'role.permissionsHelper': 'بناءً على الدور المحدد (قابل للتعديل)',
    
    // Sales & Pricing
    'sales.title': 'المبيعات والتسعير',
    'sales.pricingLevels': 'مستويات التسعير',
    'sales.priceLevel1': 'مستوى السعر 1',
    'sales.priceLevel2': 'مستوى السعر 2',
    'sales.priceLevel3': 'مستوى السعر 3',
    'sales.purchasePrice': 'سعر الشراء',
    'sales.transferPrice': 'سعر التحويل',
    'sales.discountPermissions': 'صلاحيات الخصم',
    'sales.maxDiscount': 'الحد الأقصى للخصم المسموح (%)',
    'sales.discountHelper': 'الحد الأقصى للخصم الذي يمكن لهذا المستخدم تطبيقه',
    
    // Invoices, Tax & Credit
    'invoice.title': 'الفواتير والضرائب والائتمان',
    'invoice.taxSettings': 'إعدادات الضرائب',
    'invoice.vatPercentage': 'نسبة ضريبة القيمة المضافة',
    'invoice.vatHelper': 'يتم ملؤها تلقائياً من إعدادات الشركة',
    'invoice.taxHandling': 'خيارات معالجة الضرائب',
    'invoice.applyTaxCustomer': 'تطبيق الضريبة على العميل',
    'invoice.applyTaxSupplier': 'تطبيق الضريبة على المورد',
    'invoice.printingOptions': 'خيارات طباعة الفاتورة',
    'invoice.enablePrinting': 'تمكين طباعة الفاتورة',
    'invoice.allowReprint': 'السماح بإعادة طباعة الفاتورة',
    'invoice.viewSupplierPrices': 'عرض أسعار الموردين',
    'invoice.preventSalesWithoutInvoice': 'منع المبيعات بدون فاتورة',
    'invoice.creditSettings': 'إعدادات الائتمان',
    'invoice.creditLimitOverride': 'تجاوز حد الائتمان',
    'invoice.creditPeriodOverride': 'تجاوز فترة الائتمان',
    'invoice.acceptShippingCost': 'قبول تكلفة الشحن',
    
    // Companies, Branches & Warehouses
    'branch.title': 'الشركات والفروع والمستودعات',
    'branch.companySelection': 'اختيار الشركة',
    'branch.selectCompanies': 'اختر الشركات (اختيار متعدد مع بحث)',
    'branch.accountingBranches': 'الفروع المحاسبية',
    'branch.selectBranches': 'اختر الفروع المحاسبية',
    'branch.warehouseAccess': 'الوصول إلى المستودعات',
    'branch.selectWarehouses': 'اختر المستودعات المتاحة',
    'branch.stockBalance': 'إظهار رصيد المخزون',
    'branch.stockBalanceHelper': 'السماح بعرض مستويات المخزون',
    
    // Advanced Settings
    'advanced.title': 'إعدادات النظام المتقدمة',
    'advanced.visibilityNote': 'مرئية فقط للمشرفين والمسؤولين',
    'advanced.financialAccounts': 'الحسابات المالية',
    'advanced.bankAccount': 'الحساب البنكي',
    'advanced.cashAccount': 'الحساب النقدي',
    'advanced.integrationPaths': 'مسارات التكامل والتصدير',
    'advanced.reportPath': 'مسار تصدير التقارير',
    'advanced.excelPath': 'مسار تكامل Excel',
    'advanced.deviceSettings': 'إعدادات الجهاز والطابعة',
    'advanced.printerType': 'نوع الطابعة',
    'advanced.emailSettings': 'إعدادات البريد الإلكتروني',
    'advanced.emailServer': 'خادم البريد الإلكتروني',
    'advanced.emailHelper': 'تكوين SMTP للإشعارات',
    
    // Printer Types
    'printer.laser': 'طابعة ليزر',
    'printer.inkjet': 'طابعة نفث الحبر',
    'printer.thermal': 'طابعة حرارية',
    'printer.dotMatrix': 'طابعة نقطية',
    
    // Months
    'month.jan': 'يناير',
    'month.feb': 'فبراير',
    'month.mar': 'مارس',
    'month.apr': 'أبريل',
    'month.may': 'مايو',
    'month.jun': 'يونيو',
    'month.jul': 'يوليو',
    'month.aug': 'أغسطس',
    'month.sep': 'سبتمبر',
    'month.oct': 'أكتوبر',
    'month.nov': 'نوفمبر',
    'month.dec': 'ديسمبر',
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    // Apply RTL/LTR based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    // Apply theme
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
