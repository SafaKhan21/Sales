import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Users, FileText } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const salesTrendData = [
  { month: 'Jul', sales: 45000 },
  { month: 'Aug', sales: 52000 },
  { month: 'Sep', sales: 48000 },
  { month: 'Oct', sales: 61000 },
  { month: 'Nov', sales: 55000 },
  { month: 'Dec', sales: 67000 },
];

const revenueData = [
  { name: 'Electronics', value: 35, amount: 245000 },
  { name: 'Clothing', value: 25, amount: 175000 },
  { name: 'Home & Garden', value: 20, amount: 140000 },
  { name: 'Food & Beverage', value: 12, amount: 84000 },
  { name: 'Others', value: 8, amount: 56000 },
];

const topProductsData = [
  { product: 'Product A', sales: 8500 },
  { product: 'Product B', sales: 7200 },
  { product: 'Product C', sales: 6800 },
  { product: 'Product D', sales: 5900 },
  { product: 'Product E', sales: 4500 },
];

const COLORS = ['#2563EB', '#22C55E', '#F59E0B', '#8B5CF6', '#EC4899'];

export const Dashboard: React.FC = () => {
  const { t, language } = useApp();

  const statsCards = [
    {
      title: t('dashboard.totalSales'),
      value: '12,458',
      icon: TrendingUp,
      change: '+12.5%',
      changeType: 'positive' as const,
      gradient: 'from-primary/10 to-primary/20',
      iconBg: 'bg-primary',
    },
    {
      title: t('dashboard.totalRevenue'),
      value: '$700K',
      icon: DollarSign,
      change: '+8.2%',
      changeType: 'positive' as const,
      gradient: 'from-secondary/10 to-secondary/20',
      iconBg: 'bg-secondary',
    },
    {
      title: t('dashboard.activeUsers'),
      value: '245',
      icon: Users,
      change: '+5.1%',
      changeType: 'positive' as const,
      gradient: 'from-accent/10 to-accent/20',
      iconBg: 'bg-accent',
    },
    {
      title: t('dashboard.pendingInvoices'),
      value: '89',
      icon: FileText,
      change: '-2.4%',
      changeType: 'negative' as const,
      gradient: 'from-purple-500/10 to-purple-500/20',
      iconBg: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className="border-2 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className={`p-6 bg-gradient-to-br ${stat.gradient}`}>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className={`text-xs font-semibold ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`w-14 h-14 ${stat.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.salesTrend')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name={language === 'ar' ? 'المبيعات' : 'Sales'}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Category Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.revenueByCategory')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.topProducts')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProductsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="product" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }} 
                />
                <Bar 
                  dataKey="sales" 
                  fill="#8b5cf6" 
                  name={language === 'ar' ? 'المبيعات' : 'Sales'}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New invoice created', user: 'John Doe', time: '5 min ago' },
                { action: 'User permissions updated', user: 'Sarah Wilson', time: '15 min ago' },
                { action: 'Sales report exported', user: 'Mike Johnson', time: '1 hour ago' },
                { action: 'Product pricing updated', user: 'Emma Davis', time: '2 hours ago' },
                { action: 'New warehouse added', user: 'David Brown', time: '3 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};