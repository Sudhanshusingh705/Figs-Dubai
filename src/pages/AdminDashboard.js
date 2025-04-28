import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  IconButton,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  useTheme,
  Tab,
  Tabs
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as OrdersIcon,
  Inventory as ProductsIcon,
  Category as CategoryIcon,
  Payment as PaymentIcon,
  Notifications as NotificationsIcon,
  AttachMoney as RevenueIcon,
  ShowChart as StatsIcon,
  MoreVert as MoreVertIcon,
  CalendarToday as CalendarIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  CheckCircle as CheckCircleIcon,
  LocalShipping as ShippingIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../styles/Dashboard.css';

// Mock api function - replace with actual API
const fetchDashboardData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data
  return {
    stats: {
      totalUsers: 1245,
      newUsers: 68,
      totalOrders: 892,
      pendingOrders: 42,
      totalProducts: 438,
      lowStockProducts: 15,
      totalRevenue: 125840.50,
      pendingApprovals: 8
    },
    recentOrders: [
      { id: 'ORD-2023-1004', customer: 'Global Trade Co.', amount: 4850.00, status: 'processing', date: '2023-05-15', items: 12 },
      { id: 'ORD-2023-1003', customer: 'Acme Supplies Ltd', amount: 2100.50, status: 'shipped', date: '2023-05-14', items: 5 },
      { id: 'ORD-2023-1002', customer: 'Pacific Imports Inc.', amount: 8920.00, status: 'delivered', date: '2023-05-12', items: 18 },
      { id: 'ORD-2023-1001', customer: 'European Exports GmbH', amount: 1450.75, status: 'pending', date: '2023-05-11', items: 3 },
      { id: 'ORD-2023-1000', customer: 'Dubai Trading LLC', amount: 6230.00, status: 'processing', date: '2023-05-10', items: 9 }
    ],
    alerts: [
      { id: 1, type: 'warning', message: 'Low stock alert for 15 products', time: '2 hours ago' },
      { id: 2, type: 'info', message: '8 new user registrations require approval', time: '3 hours ago' },
      { id: 3, type: 'success', message: 'Monthly sales target achieved', time: '1 day ago' },
      { id: 4, type: 'error', message: 'Payment gateway integration error', time: '2 days ago' }
    ],
    salesData: [
      { month: 'Jan', revenue: 45000, orders: 120 },
      { month: 'Feb', revenue: 52000, orders: 140 },
      { month: 'Mar', revenue: 48000, orders: 130 },
      { month: 'Apr', revenue: 61000, orders: 170 },
      { month: 'May', revenue: 55000, orders: 150 },
      { month: 'Jun', revenue: 67000, orders: 190 }
    ],
    orderStatusData: [
      { name: 'Processing', value: 42 },
      { name: 'Shipped', value: 28 },
      { name: 'Delivered', value: 95 },
      { name: 'Pending', value: 15 }
    ],
    topProducts: [
      { id: 1, name: 'Premium Tea Collection', sold: 145, revenue: 12500 },
      { id: 2, name: 'Organic Coffee Beans', sold: 120, revenue: 10800 },
      { id: 3, name: 'Luxury Textiles', sold: 85, revenue: 18700 },
      { id: 4, name: 'Handcrafted Ceramics', sold: 78, revenue: 8500 }
    ],
    recentUsers: [
      { id: 1, name: 'John Smith', email: 'john.smith@example.com', role: 'customer', joined: '2023-05-10', status: 'active' },
      { id: 2, name: 'Emily Johnson', email: 'emily.j@globalexports.com', role: 'merchant', joined: '2023-05-09', status: 'pending' },
      { id: 3, name: 'Michael Wong', email: 'm.wong@pacificimport.com', role: 'supplier', joined: '2023-05-08', status: 'active' }
    ]
  };
};

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Data loading
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);
  
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return '#FFA000';
      case 'processing': return '#1976D2';
      case 'shipped': return '#7B1FA2';
      case 'delivered': return '#43A047';
      case 'cancelled': return '#E53935';
      default: return '#757575';
    }
  };
  
  const getAlertIcon = (type) => {
    switch(type) {
      case 'warning': return <ErrorIcon style={{ color: '#FFA000' }} />;
      case 'info': return <NotificationsIcon style={{ color: '#1976D2' }} />;
      case 'success': return <CheckCircleIcon style={{ color: '#43A047' }} />;
      case 'error': return <ErrorIcon style={{ color: '#E53935' }} />;
      default: return <NotificationsIcon style={{ color: '#757575' }} />;
    }
  };
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg" className="dashboard-container">
        <LinearProgress sx={{ mt: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 3 }}>
          Loading Dashboard...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="dashboard-container">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Admin Dashboard
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<RefreshIcon />}
            onClick={() => window.location.reload()}
            sx={{ mr: 1 }}
          >
            Refresh
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/admin/reports"
          >
            Generate Reports
          </Button>
        </Box>
      </Box>
      
      {/* Stats Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ bgcolor: 'primary.light' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="overline" sx={{ color: 'white', opacity: 0.8 }}>
                    Total Users
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', my: 1 }}>
                    {dashboardData.stats.totalUsers.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                    +{dashboardData.stats.newUsers} new
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main', p: 1 }}>
                  <PeopleIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ bgcolor: 'success.light' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="overline" sx={{ color: 'white', opacity: 0.8 }}>
                    Total Orders
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', my: 1 }}>
                    {dashboardData.stats.totalOrders.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                    {dashboardData.stats.pendingOrders} pending
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main', p: 1 }}>
                  <OrdersIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ bgcolor: 'warning.light' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="overline" sx={{ color: 'white', opacity: 0.8 }}>
                    Total Products
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', my: 1 }}>
                    {dashboardData.stats.totalProducts.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                    {dashboardData.stats.lowStockProducts} low stock
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main', p: 1 }}>
                  <ProductsIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ bgcolor: 'secondary.light' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="overline" sx={{ color: 'white', opacity: 0.8 }}>
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', my: 1 }}>
                    {formatCurrency(dashboardData.stats.totalRevenue)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                    This month
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'secondary.main', p: 1 }}>
                  <RevenueIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Main Dashboard Content */}
      <Grid container spacing={3}>
        {/* Left column */}
        <Grid item xs={12} md={8}>
          {/* Chart section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2" fontWeight="bold">
                Sales Overview
              </Typography>
              <Box>
                <Button
                  size="small"
                  aria-controls="sales-menu"
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                  endIcon={<MoreVertIcon />}
                >
                  Last 6 Months
                </Button>
                <Menu
                  id="sales-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>Last 3 Months</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Last 6 Months</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Last Year</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Custom Range</MenuItem>
                </Menu>
              </Box>
            </Box>
            
            <Tabs 
              value={currentTab} 
              onChange={handleTabChange} 
              sx={{ mb: 2 }}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Revenue" />
              <Tab label="Orders" />
            </Tabs>
            
            <Box sx={{ height: 300, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dashboardData.salesData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => currentTab === 0 ? formatCurrency(value) : value}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey={currentTab === 0 ? "revenue" : "orders"} 
                    name={currentTab === 0 ? "Revenue" : "Orders"} 
                    fill={currentTab === 0 ? theme.palette.primary.main : theme.palette.secondary.main} 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
          
          {/* Recent Orders */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2" fontWeight="bold">
                Recent Orders
              </Typography>
              <Button 
                component={Link} 
                to="/admin/orders" 
                size="small" 
                color="primary"
              >
                View All
              </Button>
            </Box>
            
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Order ID</strong></TableCell>
                    <TableCell><strong>Customer</strong></TableCell>
                    <TableCell><strong>Items</strong></TableCell>
                    <TableCell><strong>Amount</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell align="right"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.recentOrders.map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell>
                        <Link to={`/admin/orders/${order.id}`} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                          {order.id}
                        </Link>
                      </TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>{formatCurrency(order.amount)}</TableCell>
                      <TableCell>{format(new Date(order.date), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <Chip 
                          label={order.status.charAt(0).toUpperCase() + order.status.slice(1)} 
                          size="small"
                          sx={{ 
                            bgcolor: `${getStatusColor(order.status)}20`, 
                            color: getStatusColor(order.status),
                            fontWeight: 'bold'
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          size="small" 
                          component={Link} 
                          to={`/admin/orders/${order.id}/edit`}
                          color="primary"
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          
          {/* Top Products */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2" fontWeight="bold">
                Top Products
              </Typography>
              <Button 
                component={Link} 
                to="/admin/products" 
                size="small" 
                color="primary"
              >
                View All
              </Button>
            </Box>
            
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Product Name</strong></TableCell>
                    <TableCell align="right"><strong>Units Sold</strong></TableCell>
                    <TableCell align="right"><strong>Revenue</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData.topProducts.map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell>
                        <Link to={`/admin/products/${product.id}`} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                          {product.name}
                        </Link>
                      </TableCell>
                      <TableCell align="right">{product.sold.toLocaleString()}</TableCell>
                      <TableCell align="right">{formatCurrency(product.revenue)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        
        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Order Status Chart */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
              Order Status
            </Typography>
            
            <Box sx={{ height: 250, width: '100%', display: 'flex', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardData.orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {dashboardData.orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Orders']} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              {dashboardData.orderStatusData.map((status, index) => (
                <Box key={status.name} sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="textSecondary">
                    {status.name}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: COLORS[index % COLORS.length] }}>
                    {status.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
          
          {/* Recent Users */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2" fontWeight="bold">
                Recent Users
              </Typography>
              <Button 
                component={Link} 
                to="/admin/users" 
                size="small" 
                color="primary"
              >
                View All
              </Button>
            </Box>
            
            <List disablePadding>
              {dashboardData.recentUsers.map((user) => (
                <React.Fragment key={user.id}>
                  <ListItem 
                    sx={{ py: 1.5 }}
                    secondaryAction={
                      <Chip 
                        label={user.status === 'active' ? 'Active' : 'Pending'} 
                        size="small"
                        sx={{ 
                          bgcolor: user.status === 'active' ? '#e8f5e9' : '#fff8e1', 
                          color: user.status === 'active' ? '#388e3c' : '#f57c00',
                          fontWeight: 'medium'
                        }}
                      />
                    }
                  >
                    <ListItemIcon>
                      <Avatar 
                        sx={{ 
                          bgcolor: user.role === 'customer' ? 'primary.main' : 
                                  user.role === 'merchant' ? 'secondary.main' : 
                                  'warning.main' 
                        }}
                      >
                        {user.name.charAt(0)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Link to={`/admin/users/${user.id}`} style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
                          {user.name}
                        </Link>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {user.email}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="text.secondary">
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} • Joined {format(new Date(user.joined), 'MMM d, yyyy')}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
          
          {/* Alerts and Notifications */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
              Alerts & Notifications
            </Typography>
            
            <List disablePadding>
              {dashboardData.alerts.map((alert) => (
                <React.Fragment key={alert.id}>
                  <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
                    <ListItemIcon>
                      {getAlertIcon(alert.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={alert.message}
                      secondary={alert.time}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Quick Action Buttons */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
          Quick Actions
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              component={Link}
              to="/admin/users"
              startIcon={<PeopleIcon />}
              sx={{ height: '100%', py: 1.5 }}
            >
              Manage Users
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              component={Link}
              to="/admin/products/new"
              startIcon={<ProductsIcon />}
              sx={{ height: '100%', py: 1.5 }}
            >
              Add New Product
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              component={Link}
              to="/admin/orders"
              startIcon={<OrdersIcon />}
              sx={{ height: '100%', py: 1.5 }}
            >
              Manage Orders
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              component={Link}
              to="/admin/reports"
              startIcon={<StatsIcon />}
              sx={{ height: '100%', py: 1.5 }}
            >
              Generate Reports
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminDashboard; 