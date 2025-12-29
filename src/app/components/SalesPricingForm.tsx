import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { DollarSign, Tag, Percent } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface SalesPricingFormData {
  priceLevel1: string;
  priceLevel2: string;
  priceLevel3: string;
  purchasePrice: string;
  transferPrice: string;
  maxDiscount: string;
}

export const SalesPricingForm: React.FC = () => {
  const { t } = useApp();
  const { register } = useForm<SalesPricingFormData>({
    defaultValues: {
      priceLevel1: '100',
      priceLevel2: '95',
      priceLevel3: '90',
      purchasePrice: '75',
      transferPrice: '85',
      maxDiscount: '20',
    }
  });

  return (
    <div className="space-y-6">
      <Card className="border-2 border-accent/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl">{t('sales.title')}</CardTitle>
              <CardDescription>Configure pricing levels and discount permissions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Pricing Levels */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-accent" />
              <Label className="text-base">{t('sales.pricingLevels')}</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priceLevel1" className="text-sm font-normal text-muted-foreground">
                  {t('sales.priceLevel1')}
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="priceLevel1" 
                    type="number" 
                    {...register('priceLevel1')} 
                    className="pl-10"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceLevel2" className="text-sm font-normal text-muted-foreground">
                  {t('sales.priceLevel2')}
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="priceLevel2" 
                    type="number" 
                    {...register('priceLevel2')} 
                    className="pl-10"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceLevel3" className="text-sm font-normal text-muted-foreground">
                  {t('sales.priceLevel3')}
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="priceLevel3" 
                    type="number" 
                    {...register('priceLevel3')} 
                    className="pl-10"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Purchase & Transfer Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">{t('sales.purchasePrice')}</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="purchasePrice" 
                  type="number" 
                  {...register('purchasePrice')} 
                  className="pl-10"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transferPrice">{t('sales.transferPrice')}</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="transferPrice" 
                  type="number" 
                  {...register('transferPrice')} 
                  className="pl-10"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Discount Permissions */}
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-4">
              <Percent className="w-5 h-5 text-accent" />
              <Label className="text-base">{t('sales.discountPermissions')}</Label>
            </div>
            <div className="space-y-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="maxDiscount" className="cursor-help text-sm font-normal text-muted-foreground">
                      {t('sales.maxDiscount')}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('sales.discountHelper')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="relative max-w-xs">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="maxDiscount" 
                  type="number" 
                  {...register('maxDiscount')} 
                  className="pl-10"
                  placeholder="0"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> Price levels and discount limits are applied automatically 
              based on customer categories. These settings define the maximum values this user can access.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
