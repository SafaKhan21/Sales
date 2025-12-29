import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { Building2, MapPin, Package, Search } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Badge } from './ui/badge';

interface CompaniesBranchesFormData {
  companies: string[];
  branches: string[];
  warehouses: string[];
  stockBalanceVisibility: boolean;
}

const companies = [
  { id: 'company1', name: 'ABC Corporation', location: 'Riyadh' },
  { id: 'company2', name: 'XYZ Trading LLC', location: 'Jeddah' },
  { id: 'company3', name: 'Global Imports Inc.', location: 'Dubai' },
  { id: 'company4', name: 'Local Distributors Co.', location: 'Cairo' },
];

const branches = [
  { id: 'branch1', name: 'Head Office', company: 'company1' },
  { id: 'branch2', name: 'Downtown Branch', company: 'company1' },
  { id: 'branch3', name: 'North Branch', company: 'company2' },
  { id: 'branch4', name: 'South Branch', company: 'company2' },
];

const warehouses = [
  { id: 'warehouse1', name: 'Central Warehouse', location: 'Riyadh' },
  { id: 'warehouse2', name: 'Warehouse A', location: 'Jeddah' },
  { id: 'warehouse3', name: 'Warehouse B', location: 'Dubai' },
  { id: 'warehouse4', name: 'Warehouse C', location: 'Cairo' },
];

export const CompaniesBranchesForm: React.FC = () => {
  const { t } = useApp();
  const { watch, setValue } = useForm<CompaniesBranchesFormData>({
    defaultValues: {
      companies: ['company1'],
      branches: ['branch1', 'branch2'],
      warehouses: ['warehouse1'],
      stockBalanceVisibility: true,
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const selectedCompanies = watch('companies');
  const selectedBranches = watch('branches');
  const selectedWarehouses = watch('warehouses');
  const stockBalanceVisibility = watch('stockBalanceVisibility');

  const toggleCompany = (companyId: string) => {
    const current = selectedCompanies || [];
    const updated = current.includes(companyId)
      ? current.filter(id => id !== companyId)
      : [...current, companyId];
    setValue('companies', updated);
  };

  const toggleBranch = (branchId: string) => {
    const current = selectedBranches || [];
    const updated = current.includes(branchId)
      ? current.filter(id => id !== branchId)
      : [...current, branchId];
    setValue('branches', updated);
  };

  const toggleWarehouse = (warehouseId: string) => {
    const current = selectedWarehouses || [];
    const updated = current.includes(warehouseId)
      ? current.filter(id => id !== warehouseId)
      : [...current, warehouseId];
    setValue('warehouses', updated);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Company Selection */}
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">{t('branch.companySelection')}</CardTitle>
              <CardDescription>{t('branch.selectCompanies')}</CardDescription>
            </div>
            <Badge variant="secondary">
              {selectedCompanies?.length || 0} selected
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Company List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedCompanies?.includes(company.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-accent/5'
                }`}
                onClick={() => toggleCompany(company.id)}
              >
                <Checkbox
                  checked={selectedCompanies?.includes(company.id)}
                  onCheckedChange={() => toggleCompany(company.id)}
                />
                <div className="flex-1">
                  <p className="font-medium">{company.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {company.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accounting Branches */}
      <Card className="border-2 border-secondary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-secondary/5 to-secondary/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <MapPin className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">{t('branch.accountingBranches')}</CardTitle>
              <CardDescription>{t('branch.selectBranches')}</CardDescription>
            </div>
            <Badge variant="secondary">
              {selectedBranches?.length || 0} selected
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedBranches?.includes(branch.id)
                    ? 'border-secondary bg-secondary/5'
                    : 'border-border hover:border-secondary/50 hover:bg-accent/5'
                }`}
                onClick={() => toggleBranch(branch.id)}
              >
                <Checkbox
                  checked={selectedBranches?.includes(branch.id)}
                  onCheckedChange={() => toggleBranch(branch.id)}
                />
                <div className="flex-1">
                  <p className="font-medium">{branch.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {companies.find(c => c.id === branch.company)?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Warehouse Access */}
      <Card className="border-2 border-accent/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Package className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">{t('branch.warehouseAccess')}</CardTitle>
              <CardDescription>{t('branch.selectWarehouses')}</CardDescription>
            </div>
            <Badge variant="secondary">
              {selectedWarehouses?.length || 0} selected
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {warehouses.map((warehouse) => (
              <div
                key={warehouse.id}
                className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedWarehouses?.includes(warehouse.id)
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50 hover:bg-accent/5'
                }`}
                onClick={() => toggleWarehouse(warehouse.id)}
              >
                <Checkbox
                  checked={selectedWarehouses?.includes(warehouse.id)}
                  onCheckedChange={() => toggleWarehouse(warehouse.id)}
                />
                <div className="flex-1">
                  <p className="font-medium">{warehouse.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {warehouse.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stock Balance Visibility */}
          <div className="pt-6 border-t">
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
              <div className="space-y-0.5">
                <Label className="cursor-pointer">{t('branch.stockBalance')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('branch.stockBalanceHelper')}
                </p>
              </div>
              <Switch 
                checked={stockBalanceVisibility}
                onCheckedChange={(checked) => setValue('stockBalanceVisibility', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
