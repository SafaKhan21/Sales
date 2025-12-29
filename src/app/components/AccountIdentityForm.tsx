import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { User, Lock, Globe, Sparkles } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface AccountIdentityFormData {
  operatorCode: string;
  username: string;
  password: string;
  confirmPassword: string;
  arabicName: string;
  englishName: string;
}

export const AccountIdentityForm: React.FC = () => {
  const { t } = useApp();
  const { register, handleSubmit, watch } = useForm<AccountIdentityFormData>({
    defaultValues: {
      operatorCode: 'OPR-2025-001',
      username: 'Safa007',
      arabicName: ' Safa Khan',
      englishName: 'SafaKhan',
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const generateOperatorCode = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const code = `OPR-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      setIsGenerating(false);
    }, 500);
  };

  const onSubmit = (data: AccountIdentityFormData) => {
    console.log('Account identity submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="border-2 border-primary/10 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl">{t('account.title')}</CardTitle>
              <CardDescription>{t('account.nameHelper')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Operator Code */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="operatorCode" className="flex items-center gap-2 cursor-help">
                      {t('account.operatorCode')}
                      <Sparkles className="w-4 h-4 text-accent" />
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('account.operatorCodeHelper')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateOperatorCode}
                disabled={isGenerating}
                className="h-7 text-xs"
              >
                {isGenerating ? 'Generating...' : t('action.generate')}
              </Button>
            </div>
            <Input 
              id="operatorCode" 
              {...register('operatorCode')} 
              readOnly
              className="bg-muted/50 font-mono text-primary"
            />
          </div>

          {/* Username */}
          <div className="space-y-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="username" className="cursor-help">
                    {t('account.username')}
                  </Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('account.usernameHelper')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                id="username" 
                {...register('username')} 
                className="pl-10"
                placeholder="Enter username"
              />
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">{t('account.password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  {...register('password')} 
                  className="pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('account.confirmPassword')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  {...register('confirmPassword')} 
                  className="pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="arabicName">{t('account.arabicName')}</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="arabicName" 
                  {...register('arabicName')} 
                  className="pl-10"
                  dir="rtl"
                  placeholder="الاسم الكامل"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="englishName">{t('account.englishName')}</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="englishName" 
                  {...register('englishName')} 
                  className="pl-10"
                  placeholder="Full Name"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
