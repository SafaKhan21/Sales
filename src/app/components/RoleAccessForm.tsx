import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Shield, UserCog, CheckCircle2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface RoleAccessFormData {
  jobRole: string;
  accessLevel: string;
}

const rolePermissions: Record<string, string[]> = {
  salesRep: ['View Products', 'Create Invoices', 'View Customers'],
  accountant: ['View Financial Reports', 'Manage Accounts', 'Export Data'],
  cashier: ['Process Payments', 'Print Receipts', 'Daily Reconciliation'],
  manager: ['View All Reports', 'Manage Staff', 'Approve Discounts'],
  supervisor: ['All Manager Permissions', 'System Configuration', 'User Management'],
  admin: ['Full System Access', 'Security Settings', 'Audit Logs'],
};

export const RoleAccessForm: React.FC = () => {
  const { t } = useApp();
  const { watch, setValue } = useForm<RoleAccessFormData>({
    defaultValues: {
      jobRole: 'salesRep',
      accessLevel: 'user',
    }
  });

  const jobRole = watch('jobRole');
  const accessLevel = watch('accessLevel');
  const permissions = rolePermissions[jobRole] || [];

  // Auto-set access level based on role
  useEffect(() => {
    if (jobRole === 'admin' || jobRole === 'supervisor') {
      setValue('accessLevel', 'superAdmin');
    } else if (jobRole === 'manager') {
      setValue('accessLevel', 'supervisor');
    } else if (jobRole === 'cashier') {
      setValue('accessLevel', 'cashierSupervisor');
    } else {
      setValue('accessLevel', 'user');
    }
  }, [jobRole, setValue]);

  return (
    <div className="space-y-6">
      <Card className="border-2 border-secondary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-secondary/5 to-secondary/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Shield className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl">{t('role.title')}</CardTitle>
              <CardDescription>Define user responsibilities and system access</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Role */}
            <div className="space-y-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="jobRole" className="flex items-center gap-2 cursor-help">
                      <UserCog className="w-4 h-4 text-secondary" />
                      {t('role.jobRole')}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('role.jobRoleHelper')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Select value={jobRole} onValueChange={(value) => setValue('jobRole', value)}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salesRep">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      {t('role.salesRep')}
                    </div>
                  </SelectItem>
                  <SelectItem value="accountant">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      {t('role.accountant')}
                    </div>
                  </SelectItem>
                  <SelectItem value="cashier">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      {t('role.cashier')}
                    </div>
                  </SelectItem>
                  <SelectItem value="manager">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      {t('role.manager')}
                    </div>
                  </SelectItem>
                  <SelectItem value="supervisor">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                      {t('role.supervisor')}
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      {t('role.admin')}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Access Level */}
            <div className="space-y-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="accessLevel" className="flex items-center gap-2 cursor-help">
                      <Shield className="w-4 h-4 text-accent" />
                      {t('role.accessLevel')}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('role.accessLevelHelper')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Select value={accessLevel} onValueChange={(value) => setValue('accessLevel', value)}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">{t('role.user')}</SelectItem>
                  <SelectItem value="supervisor">{t('role.supervisor')}</SelectItem>
                  <SelectItem value="cashierSupervisor">{t('role.cashierSupervisor')}</SelectItem>
                  <SelectItem value="superAdmin">{t('role.superAdmin')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Default Permissions Preview */}
          <div className="pt-6 border-t">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-secondary" />
              <Label className="text-base">{t('role.defaultPermissions')}</Label>
              <Badge variant="outline" className="ml-auto">
                {t('role.permissionsHelper')}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {permissions.map((permission, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-secondary/10 border border-secondary/20 hover:bg-secondary/20 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="text-sm">{permission}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
