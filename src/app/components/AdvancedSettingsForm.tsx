import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Database, FileOutput, Mail, Printer, AlertTriangle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Alert, AlertDescription } from './ui/alert';
import { Folder } from "lucide-react";

interface AdvancedSettingsFormData {
  bankAccount: string;
  cashAccount: string;
  reportPath: string;
  excelPath: string;
  printerType: string;
  emailServer: string;
}

export const AdvancedSettingsForm: React.FC = () => {
  const { t } = useApp();

  const { register, watch, setValue } = useForm<AdvancedSettingsFormData>({
    defaultValues: {
      bankAccount: '1234567890',
      cashAccount: '0987654321',
      reportPath: '/reports/output',
      excelPath: '/exports/excel',
      printerType: 'thermal',
      emailServer: 'smtp.company.com',
    },
  });

  const printerType = watch('printerType');

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      <Alert className="border-accent bg-accent/10">
        <AlertTriangle className="h-4 w-4 text-accent" />
        <AlertDescription className="text-sm">
          <strong>{t('advanced.visibilityNote')}</strong> – These settings require elevated permissions
          and may affect system-wide operations.
        </AlertDescription>
      </Alert>

      {/* Financial Accounts */}
      <Card className="border border-primary/20 rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>{t('advanced.financialAccounts')}</CardTitle>
              <CardDescription>Default accounting configuration</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>{t('advanced.bankAccount')}</Label>
            <Input {...register('bankAccount')} className="font-mono" />
          </div>
          <div>
            <Label>{t('advanced.cashAccount')}</Label>
            <Input {...register('cashAccount')} className="font-mono" />
          </div>
        </CardContent>
      </Card>

      {/* Integration & Export Paths (MODERNIZED, SAME CHOICES) */}
      <Card className="border border-secondary/30 rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-secondary/15 flex items-center justify-center">
              <FileOutput className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <CardTitle>Integration & Export Paths</CardTitle>
              <CardDescription>
                Configure directories used for report and Excel exports
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
  {/* Report Export Path */}
  <div className="space-y-1.5">
    <Label className="text-sm font-medium">Report Export Path</Label>
    <div className="flex items-center gap-2">
  <Input
    value={watch('reportPath')}
    readOnly
    placeholder="Choose folder..."
    className="font-mono text-sm"
  />
  <button
    type="button"
    onClick={async () => {
      try {
        const dirHandle = await (window as any).showDirectoryPicker();
        // هنا نضع "اسم المجلد + fake path" كمثال
        setValue('reportPath', `Selected: ${dirHandle.name}`);
      } catch (err) {
        console.log('Folder selection cancelled or unsupported', err);
      }
    }}
    className="p-2 bg-secondary/10 rounded hover:bg-secondary/20"
  >
    <Folder className="w-5 h-5" />
  </button>
</div>

    <p className="text-xs text-muted-foreground">
      Select the folder where reports will be stored
    </p>
  </div>

  {/* Excel Integration Path */}
  <div className="space-y-1.5">
    <Label className="text-sm font-medium">Excel Integration Path</Label>
    <div className="flex items-center gap-2">
      <Input
        value={watch('excelPath')}
        readOnly
        placeholder="Choose folder..."
        className="font-mono text-sm"
      />
      <button
        type="button"
        onClick={async () => {
          try {
            const dirHandle = await (window as any).showDirectoryPicker();
            setValue('excelPath', dirHandle.name);
          } catch (err) {
            console.log('Folder selection cancelled or unsupported', err);
          }
        }}
        className="p-2 bg-secondary/10 rounded hover:bg-secondary/20"
      >
        <Folder className="w-5 h-5" />
      </button>
    </div>
    <p className="text-xs text-muted-foreground">
      Select the folder where Excel exports will be saved
    </p>
  </div>

  {/* Note */}
  <div className="flex gap-3 rounded-xl border border-secondary/30 bg-secondary/10 p-4">
    <AlertTriangle className="h-4 w-4 mt-0.5 text-secondary" />
    <p className="text-sm text-muted-foreground leading-relaxed">
      <span className="font-medium text-foreground">Note:</span>{' '}
      Ensure these directories exist and have appropriate read/write permissions.
      Invalid paths may cause export failures.
    </p>
  </div>
</CardContent>

      </Card>

      {/* Printer Settings */}
      <Card className="border border-accent/30 rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
              <Printer className="w-5 h-5 text-accent" />
            </div>
            <div>
              <CardTitle>{t('advanced.deviceSettings')}</CardTitle>
              <CardDescription>Printer configuration</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label>{t('advanced.printerType')}</Label>
          <Select value={printerType} onValueChange={(v) => setValue('printerType', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thermal">Thermal</SelectItem>
              <SelectItem value="laser">Laser</SelectItem>
              <SelectItem value="inkjet">Inkjet</SelectItem>
              <SelectItem value="dotMatrix">Dot Matrix</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card className="border border-primary/30 rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>{t('advanced.emailSettings')}</CardTitle>
              <CardDescription>SMTP configuration</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Label>{t('advanced.emailServer')}</Label>
          <Input
            {...register('emailServer')}
            placeholder="smtp.server.com"
            className="font-mono text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
};
