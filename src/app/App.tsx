import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Dashboard } from './components/Dashboard';
import { AccountIdentityForm } from './components/AccountIdentityForm';
import { RoleAccessForm } from './components/RoleAccessForm';
import { SalesPricingForm } from './components/SalesPricingForm';
import { InvoicesTaxCreditForm } from './components/InvoicesTaxCreditForm';
import { CompaniesBranchesForm } from './components/CompaniesBranchesForm';
import { AdvancedSettingsForm } from './components/AdvancedSettingsForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { 
  LayoutDashboard, 
  UserPlus,
  Moon, 
  Sun, 
  Globe,
  Menu,
  Save,
  CheckCircle2
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';

const AppContent: React.FC = () => {
  const { t, theme, setTheme, language, setLanguage } = useApp();
  const [activeView, setActiveView] = useState<'dashboard' | 'userManagement'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleSaveAll = () => {
    toast.success('Changes saved successfully!', {
      description: 'User settings have been updated.',
      icon: <CheckCircle2 className="w-4 h-4" />,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={language === 'ar' ? 'right' : 'left'} className="w-[280px]">
                <nav className="flex flex-col gap-2 mt-8">
                  <Button
                    variant={activeView === 'dashboard' ? 'default' : 'ghost'}
                    className="justify-start"
                    onClick={() => {
                      setActiveView('dashboard');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    {t('nav.dashboard')}
                  </Button>
                  <Button
                    variant={activeView === 'userManagement' ? 'default' : 'ghost'}
                    className="justify-start"
                    onClick={() => {
                      setActiveView('userManagement');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    {t('nav.userManagement')}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo & Title */}
          {/* Logo & Title */}
{/* Logo & Title */}
<div className="flex items-center gap-3">
  {/* Logo */}
<img
  src={theme === 'light' ? "/assets/logo-light.png" : "/assets/logo-dark.png"}
  alt="Sales Management Logo"
  className={theme === 'light' ? "h-13 w-auto" : "h-40 w-auto"}
/>

  {/* Title */}
  <div>
    <h2 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      {t('app.title')}
    </h2>
    <p className="text-xs text-muted-foreground hidden md:block">
      {t('app.subtitle')}
    </p>
  </div>
</div>


          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            <Button
              variant={activeView === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setActiveView('dashboard')}
              className="relative"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              {t('nav.dashboard')}
            </Button>
            <Button
              variant={activeView === 'userManagement' ? 'default' : 'ghost'}
              onClick={() => setActiveView('userManagement')}
              className="relative"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {t('nav.userManagement')}
              <Badge className="ml-2 bg-accent" variant="secondary">New</Badge>
            </Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLanguage} 
              title="Toggle Language"
              className="hover:bg-primary/10"
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              title="Toggle Theme"
              className="hover:bg-primary/10"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-8 max-w-7xl mx-auto">
        {activeView === 'dashboard' ? (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-semibold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t('dashboard.title')}
              </h2>
              <p className="text-muted-foreground text-lg">
                Monitor your sales performance and business metrics in real-time
              </p>
            </div>
            <Dashboard />
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-semibold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {t('nav.userManagement')}
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Configure user settings, permissions, and access controls
                  </p>
                </div>
                <Button 
                  onClick={handleSaveAll}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {t('action.save')}
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="accountIdentity" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto gap-2 bg-muted/50 p-2 rounded-xl">
                <TabsTrigger 
                  value="accountIdentity" 
                  className="text-xs md:text-sm whitespace-normal h-auto py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground rounded-lg"
                >
                  {t('tabs.accountIdentity')}
                </TabsTrigger>
                <TabsTrigger 
                  value="roleAccess" 
                  className="text-xs md:text-sm whitespace-normal h-auto py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-secondary/90 data-[state=active]:text-secondary-foreground rounded-lg"
                >
                  {t('tabs.roleAccess')}
                </TabsTrigger>
                <TabsTrigger 
                  value="salesPricing" 
                  className="text-xs md:text-sm whitespace-normal h-auto py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-accent/90 data-[state=active]:text-accent-foreground rounded-lg"
                >
                  {t('tabs.salesPricing')}
                </TabsTrigger>
                <TabsTrigger 
                  value="invoicesTaxCredit" 
                  className="text-xs md:text-sm whitespace-normal h-auto py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-primary-foreground rounded-lg"
                >
                  {t('tabs.invoicesTaxCredit')}
                </TabsTrigger>
                <TabsTrigger 
                  value="companiesBranches" 
                  className="text-xs md:text-sm whitespace-normal h-auto py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-secondary/90 data-[state=active]:text-secondary-foreground rounded-lg col-span-2 md:col-span-1"
                >
                  {t('tabs.companiesBranches')}
                </TabsTrigger>
                <TabsTrigger 
                  value="advancedSettings" 
                  className="text-xs md:text-sm whitespace-normal h-auto py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-accent/90 data-[state=active]:text-accent-foreground rounded-lg col-span-2 md:col-span-1"
                >
                  {t('tabs.advancedSettings')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="accountIdentity" className="space-y-6">
                <AccountIdentityForm />
              </TabsContent>

              <TabsContent value="roleAccess" className="space-y-6">
                <RoleAccessForm />
              </TabsContent>

              <TabsContent value="salesPricing" className="space-y-6">
                <SalesPricingForm />
              </TabsContent>

              <TabsContent value="invoicesTaxCredit" className="space-y-6">
                <InvoicesTaxCreditForm />
              </TabsContent>

              <TabsContent value="companiesBranches" className="space-y-6">
                <CompaniesBranchesForm />
              </TabsContent>

              <TabsContent value="advancedSettings" className="space-y-6">
                <AdvancedSettingsForm />
              </TabsContent>
            </Tabs>

            {/* Sticky Save Button for Mobile */}
            <div className="fixed bottom-6 right-6 md:hidden z-40">
              <Button 
                onClick={handleSaveAll}
                size="lg"
                className="rounded-full shadow-2xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 h-14 w-14 p-0"
              >
                <Save className="h-6 w-6" />
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 bg-card">
        <div className="container px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 Sales Management System. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
