import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { FileText, Percent as PercentIcon, CreditCard, Printer } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Badge } from './ui/badge';

interface InvoicesTaxCreditFormData {
  vatPercentage: string;
  applyTaxCustomer: boolean;
  applyTaxSupplier: boolean;
  enablePrinting: boolean;
  allowReprint: boolean;
  viewSupplierPrices: boolean;
  preventSalesWithoutInvoice: boolean;
  creditLimitOverride: boolean;
  creditPeriodOverride: boolean;
  acceptShippingCost: boolean;
}

export const InvoicesTaxCreditForm: React.FC = () => {
  const { t } = useApp();
  const { register, watch, setValue } = useForm<InvoicesTaxCreditFormData>({
    defaultValues: {
      vatPercentage: '15',
      applyTaxCustomer: true,
      applyTaxSupplier: false,
      enablePrinting: true,
      allowReprint: true,
      viewSupplierPrices: false,
      preventSalesWithoutInvoice: true,
      creditLimitOverride: false,
      creditPeriodOverride: false,
      acceptShippingCost: true,
    }
  });

  const applyTaxCustomer = watch('applyTaxCustomer');
  const applyTaxSupplier = watch('applyTaxSupplier');
  const enablePrinting = watch('enablePrinting');
  const allowReprint = watch('allowReprint');
  const viewSupplierPrices = watch('viewSupplierPrices');
  const preventSalesWithoutInvoice = watch('preventSalesWithoutInvoice');
  const creditLimitOverride = watch('creditLimitOverride');
  const creditPeriodOverride = watch('creditPeriodOverride');
  const acceptShippingCost = watch('acceptShippingCost');

  return (
    <div className="space-y-6">
      {/* Tax Settings */}
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <PercentIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl">{t('invoice.taxSettings')}</CardTitle>
              <CardDescription>Configure VAT and tax handling options</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* VAT Percentage */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="vatPercentage">{t('invoice.vatPercentage')}</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge variant="secondary" className="text-xs">
                      Auto
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('invoice.vatHelper')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative max-w-xs">
              <PercentIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                id="vatPercentage" 
                type="number" 
                {...register('vatPercentage')} 
                className="pl-10 bg-muted/50"
                readOnly
              />
            </div>
          </div>

          {/* Tax Handling */}
          <div className="space-y-4 pt-4 border-t">
            <Label className="text-base">{t('invoice.taxHandling')}</Label>
            
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
              <div className="space-y-0.5">
                <Label className="cursor-pointer">{t('invoice.applyTaxCustomer')}</Label>
                <p className="text-sm text-muted-foreground">
                  Add VAT to customer invoices
                </p>
              </div>
              <Switch 
                checked={applyTaxCustomer}
                onCheckedChange={(checked) => setValue('applyTaxCustomer', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
              <div className="space-y-0.5">
                <Label className="cursor-pointer">{t('invoice.applyTaxSupplier')}</Label>
                <p className="text-sm text-muted-foreground">
                  Calculate VAT on supplier purchases
                </p>
              </div>
              <Switch 
                checked={applyTaxSupplier}
                onCheckedChange={(checked) => setValue('applyTaxSupplier', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Printing Options */}
      <Card className="border-2 border-accent/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Printer className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl">{t('invoice.printingOptions')}</CardTitle>
              <CardDescription>Control invoice printing and display settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
            <div className="space-y-0.5">
              <Label className="cursor-pointer">{t('invoice.enablePrinting')}</Label>
              <p className="text-sm text-muted-foreground">
                Allow invoice printing functionality
              </p>
            </div>
            <Switch 
              checked={enablePrinting}
              onCheckedChange={(checked) => setValue('enablePrinting', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
            <div className="space-y-0.5">
              <Label className="cursor-pointer">{t('invoice.allowReprint')}</Label>
              <p className="text-sm text-muted-foreground">
                Enable reprinting of existing invoices
              </p>
            </div>
            <Switch 
              checked={allowReprint}
              onCheckedChange={(checked) => setValue('allowReprint', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
            <div className="space-y-0.5">
              <Label className="cursor-pointer">{t('invoice.viewSupplierPrices')}</Label>
              <p className="text-sm text-muted-foreground">
                Display supplier pricing information
              </p>
            </div>
            <Switch 
              checked={viewSupplierPrices}
              onCheckedChange={(checked) => setValue('viewSupplierPrices', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
            <div className="space-y-0.5">
              <Label className="cursor-pointer">{t('invoice.preventSalesWithoutInvoice')}</Label>
              <p className="text-sm text-muted-foreground">
                Require invoice generation for all sales
              </p>
            </div>
            <Switch 
              checked={preventSalesWithoutInvoice}
              onCheckedChange={(checked) => setValue('preventSalesWithoutInvoice', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
            <div className="space-y-0.5">
              <Label className="cursor-pointer">{t('invoice.acceptShippingCost')}</Label>
              <p className="text-sm text-muted-foreground">
                Include shipping charges in invoices
              </p>
            </div>
            <Switch 
              checked={acceptShippingCost}
              onCheckedChange={(checked) => setValue('acceptShippingCost', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Credit Settings */}
      <Card className="border-2 border-secondary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-secondary/5 to-secondary/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl">{t('invoice.creditSettings')}</CardTitle>
              <CardDescription>Configure credit limit and payment period overrides</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
            <div className="space-y-0.5">
              <Label className="cursor-pointer">{t('invoice.creditLimitOverride')}</Label>
              <p className="text-sm text-muted-foreground">
                Allow user to override customer credit limits
              </p>
            </div>
            <Switch 
              checked={creditLimitOverride}
              onCheckedChange={(checked) => setValue('creditLimitOverride', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
            <div className="space-y-0.5">
              <Label className="cursor-pointer">{t('invoice.creditPeriodOverride')}</Label>
              <p className="text-sm text-muted-foreground">
                Allow user to override payment period terms
              </p>
            </div>
            <Switch 
              checked={creditPeriodOverride}
              onCheckedChange={(checked) => setValue('creditPeriodOverride', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
